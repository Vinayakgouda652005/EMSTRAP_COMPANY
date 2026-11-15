import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === "production";

const emailRegex = /^[^\s@\r\n]+@[^\s@\r\n]+\.[^\s@\r\n]{2,}$/;
const phoneRegex = /^[0-9+\-\s()]{7,25}$/;

function sanitizeHeaderField(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n\u0000-\u001F\u007F]+/g, " ").trim().slice(0, maxLen);
}

function sanitizeTextBody(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, maxLen);
}

function isValidHttpUrl(raw: string): boolean {
  try {
    const parsed = new URL(raw);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

// Lightweight per-IP sliding-window rate limiter for form submissions
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 15;
const MAX_TRACKED_IPS = 5000;
const rateBuckets = new Map<string, number[]>();

const cleanupTimer = setInterval(() => {
  const cutoff = Date.now() - RATE_WINDOW_MS;
  for (const [ip, timestamps] of rateBuckets.entries()) {
    const active = timestamps.filter((t) => t > cutoff);
    if (active.length === 0) {
      rateBuckets.delete(ip);
    } else {
      rateBuckets.set(ip, active);
    }
  }
}, 5 * 60 * 1000);
cleanupTimer.unref();

function apiRateLimiter(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const cutoff = now - RATE_WINDOW_MS;
  const recent = (rateBuckets.get(ip) || []).filter((t) => t > cutoff);

  if (recent.length >= RATE_MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      message: "Too many requests. Please wait a few minutes and try again.",
    });
  }

  recent.push(now);
  if (!rateBuckets.has(ip) && rateBuckets.size >= MAX_TRACKED_IPS) {
    const oldestKey = rateBuckets.keys().next().value;
    if (oldestKey !== undefined) rateBuckets.delete(oldestKey);
  }
  rateBuckets.set(ip, recent);
  return next();
}

function createTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER.trim(),
      pass: process.env.SMTP_PASS.trim(),
    },
    tls: {
      rejectUnauthorized: process.env.SMTP_ALLOW_SELF_SIGNED !== "true",
    },
  });
}

const CONTACT_RECIPIENT_EMAIL = "contact@emstrap.com";
const transporter = createTransporter();
const senderEmail = sanitizeHeaderField(process.env.MAIL_FROM || process.env.SMTP_USER || "", 254);
const senderName = sanitizeHeaderField(process.env.MAIL_FROM_NAME || "EMSTRAP Contact Form", 120);

async function startServer() {
  const app = express();
  app.disable("x-powered-by");
  app.set("trust proxy", 1);

  // Security headers (preserving iframe preview + camera/geolocation for self)
  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(self), geolocation=(self), microphone=()");
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    res.setHeader("X-XSS-Protection", "0");
    if (isProduction) {
      res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    }
    next();
  });

  const configuredAppHost = (() => {
    if (!process.env.APP_URL) return null;
    try {
      return new URL(process.env.APP_URL).host;
    } catch {
      return null;
    }
  })();

  app.use(
    cors((req, callback) => {
      const origin = req.header("Origin");
      if (!origin) {
        return callback(null, { origin: false });
      }
      try {
        const originUrl = new URL(origin);
        const reqHost = req.get("host");
        const isLocal = originUrl.hostname === "localhost" || originUrl.hostname === "127.0.0.1";
        const matchesHost = Boolean(reqHost && originUrl.host === reqHost);
        const matchesAppUrl = Boolean(configuredAppHost && originUrl.host === configuredAppHost);
        if (isLocal || matchesHost || matchesAppUrl) {
          return callback(null, { origin: true, methods: ["GET", "POST"] });
        }
      } catch {
        // Malformed origin rejected below
      }
      return callback(null, { origin: false });
    })
  );

  app.use(express.json({ limit: "32kb" }));
  app.use(express.urlencoded({ extended: true, limit: "32kb" }));

  app.post("/api/contact", apiRateLimiter, async (req, res) => {
    try {
      const body = req.body && typeof req.body === "object" ? req.body : {};
      const requestType = sanitizeHeaderField(body.requestType, 100) || "Contact Form";
      const sourcePage = sanitizeHeaderField(body.sourcePage, 120) || "/";
      const isStandardContact = requestType === "Contact Form";

      const fullName = sanitizeHeaderField(body.fullName, 120);
      const organization = sanitizeHeaderField(body.organization, 160);
      const email = sanitizeHeaderField(body.email, 254);
      const phone = sanitizeHeaderField(body.phone, 25);
      const message = sanitizeTextBody(body.message, 4000);
      const requiresEmail = isStandardContact || body.requiresEmail === true || email.length > 0;

      if (isStandardContact) {
        if (fullName.length < 2 || organization.length < 2 || !email || !phone || message.length < 2) {
          return res.status(400).json({ success: false, message: "All fields are required." });
        }
      } else {
        if ((fullName.length < 2 && organization.length < 2) || !phone || message.length < 2 || (requiresEmail && !email)) {
          return res.status(400).json({ success: false, message: "Please fill all required fields." });
        }
      }

      if (email && !emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email address." });
      }
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({ success: false, message: "Invalid phone number." });
      }

      const displaySender = fullName || organization || "EMSTRAP Visitor";
      const emailSubject = isStandardContact
        ? `New Partner Inquiry from ${organization}`
        : `[${requestType}] Request from ${organization || fullName}`;

      if (transporter && senderEmail) {
        await transporter.sendMail({
          from: {
            name: email ? `${displaySender} (${email})` : displaySender,
            address: senderEmail,
          },
          to: CONTACT_RECIPIENT_EMAIL,
          ...(email ? { replyTo: { name: displaySender || senderName, address: email } } : {}),
          subject: emailSubject,
          text: [
            `Request Type: ${requestType}`,
            `Source Page: ${sourcePage}`,
            fullName ? `Name: ${fullName}` : "",
            organization ? `Organization / Details: ${organization}` : "",
            email ? `Email: ${email}` : "",
            `Phone: ${phone}`,
            "",
            "Details / Message:",
            message,
          ]
            .filter((line, idx, arr) => !(line === "" && arr[idx - 1] === ""))
            .join("\n"),
        });
      }

      return res.status(200).json({
        success: true,
        recipient: CONTACT_RECIPIENT_EMAIL,
        message: "Request sent successfully to contact@emstrap.com.",
      });
    } catch (err) {
      console.error("Contact route error:", err);
      return res.status(500).json({ success: false, message: "Unable to send message." });
    }
  });

  app.post("/api/careers", apiRateLimiter, async (req, res) => {
    try {
      const body = req.body && typeof req.body === "object" ? req.body : {};
      const fullName = sanitizeHeaderField(body.fullName, 120);
      const email = sanitizeHeaderField(body.email, 254);
      const phone = sanitizeHeaderField(body.phone, 25);
      const position = sanitizeHeaderField(body.position, 120);
      const resumeLink = sanitizeHeaderField(body.resumeLink, 500);
      const message = sanitizeTextBody(body.message, 4000);

      if (fullName.length < 2 || !email || !phone || position.length < 2 || !resumeLink) {
        return res.status(400).json({ success: false, message: "Please fill all required fields." });
      }
      if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email address." });
      }
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({ success: false, message: "Invalid phone number." });
      }
      if (!isValidHttpUrl(resumeLink)) {
        return res.status(400).json({ success: false, message: "Resume link must be a valid HTTP or HTTPS URL." });
      }

      if (transporter && senderEmail) {
        await transporter.sendMail({
          from: { name: `${fullName} (${email})`, address: senderEmail },
          to: CONTACT_RECIPIENT_EMAIL,
          replyTo: { name: fullName, address: email },
          subject: `EMSTRAP Career Application: ${position} - ${fullName}`,
          text: `Position: ${position}\nCandidate: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nResume: ${resumeLink}\n\nCover Letter:\n${message}`,
        });
      }

      return res.status(200).json({
        success: true,
        recipient: CONTACT_RECIPIENT_EMAIL,
        message: "Application submitted successfully.",
      });
    } catch (err) {
      console.error("Careers route error:", err);
      return res.status(500).json({ success: false, message: "Unable to submit application." });
    }
  });

  // Return clean JSON error on malformed JSON payloads instead of crashing or leaking stack traces
  app.use((err: Error & { status?: number; type?: string }, _req: Request, res: Response, next: NextFunction) => {
    if (err && (err.type === "entity.parse.failed" || err.type === "entity.too.large")) {
      return res.status(err.status || 400).json({ success: false, message: "Invalid request payload." });
    }
    return next(err);
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.join(__dirname, "dist");
    app.use(
      express.static(distDir, {
        maxAge: "7d",
        setHeaders(res, filePath) {
          if (filePath.endsWith(".html")) {
            res.setHeader("Cache-Control", "no-cache");
          }
        },
      })
    );
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distDir, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`EMSTRAP React server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
