import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export function sanitizeSafeUrl(rawUrl) {
  if (typeof rawUrl !== "string") return null;
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return trimmed;
  }
  try {
    const parsed = new URL(trimmed, typeof window !== "undefined" ? window.location.origin : "https://emstrap.local");
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.href;
    }
  } catch {
    return null;
  }
  return null;
}

export function initWaveObserver(container = document) {
  try {
    const nodes = container.querySelectorAll(".wave-card-node");
    if (!nodes.length) return () => {};

    ScrollTrigger.getAll().forEach((trigger) => {
      if (
        trigger?.trigger &&
        trigger.trigger.classList &&
        trigger.trigger.classList.contains("wave-card-node")
      ) {
        trigger.kill();
      }
    });

    const tweens = [];
    nodes.forEach((card) => {
      gsap.set(card, {
        opacity: 0,
        y: 70,
        transformPerspective: 1000,
        rotateX: -10,
      });
      const tween = gsap.to(card, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 95%",
          end: "bottom 15%",
          scrub: 0.8,
          toggleActions: "play none none none",
        },
      });
      tweens.push(tween);
    });

    const rafId = requestAnimationFrame(() => {
      try {
        ScrollTrigger.refresh();
      } catch {
        // Ignore ScrollTrigger refresh errors on unmounted nodes
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      tweens.forEach((t) => {
        try {
          if (t.scrollTrigger) t.scrollTrigger.kill();
          t.kill();
        } catch {
          // Ignore cleanup errors
        }
      });
    };
  } catch {
    return () => {};
  }
}

export function trackScrollHeaderAmbulance() {
  const ambulance = document.getElementById("headerAmbulance");
  const shield = document.getElementById("headerShieldReaction");
  if (!ambulance) return;
  const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? Math.max(0, Math.min(100, (scrollTop / docHeight) * 100)) : 0;

  ambulance.style.left = `calc(${scrollPercent}% - ${56 * (scrollPercent / 100)}px)`;

  if (shield) {
    if (scrollPercent >= 98) {
      shield.classList.add("scale-110", "opacity-100", "translate-y-0");
      shield.classList.remove("scale-0", "opacity-0", "translate-y-2");
    } else {
      shield.classList.remove("scale-110", "opacity-100", "translate-y-0");
      shield.classList.add("scale-0", "opacity-0", "translate-y-2");
    }
  }
}

export function showEmstrapAlert(message) {
  if (typeof document === "undefined" || !document.body) return;
  const existing = document.getElementById("emstrapNoticeOverlay");
  if (existing && existing.parentNode) {
    existing.parentNode.removeChild(existing);
  }

  const overlay = document.createElement("div");
  overlay.id = "emstrapNoticeOverlay";
  overlay.className =
    "fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm";

  const card = document.createElement("div");
  card.className =
    "bg-white text-slate-900 border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-scale-in";

  const headerRow = document.createElement("div");
  headerRow.className = "flex items-center gap-3";

  const iconWrap = document.createElement("div");
  iconWrap.className =
    "w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0";
  const checkIcon = document.createElement("i");
  checkIcon.className = "fa-solid fa-circle-check text-base";
  iconWrap.appendChild(checkIcon);

  const titleEl = document.createElement("h4");
  titleEl.className = "text-base font-bold font-display text-slate-900";
  titleEl.textContent = "EMSTRAP Notification";

  headerRow.appendChild(iconWrap);
  headerRow.appendChild(titleEl);

  const msgEl = document.createElement("p");
  msgEl.className = "text-sm text-slate-600 leading-relaxed";
  msgEl.textContent = String(message ?? "");

  const btnRow = document.createElement("div");
  btnRow.className = "flex justify-end pt-2";

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className =
    "px-6 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer";
  closeBtn.textContent = "OK";

  const dismiss = () => {
    document.removeEventListener("keydown", onEsc);
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
  };
  const onEsc = (e) => {
    if (e.key === "Escape") dismiss();
  };

  closeBtn.addEventListener("click", dismiss);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) dismiss();
  });
  document.addEventListener("keydown", onEsc);

  btnRow.appendChild(closeBtn);
  card.appendChild(headerRow);
  card.appendChild(msgEl);
  card.appendChild(btnRow);
  overlay.appendChild(card);
  document.body.appendChild(overlay);
}

export async function submitEmstrapModalRequest({
  event,
  requestType,
  successMessage,
  onSuccess,
}) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const controls = Array.from(form.querySelectorAll("input, select, textarea"));

  let fullName = "";
  let organization = "";
  let email = "";
  let phone = "";
  let hasEmailInput = false;
  const detailLines = [];

  for (const el of controls) {
    const type = (el.getAttribute("type") || el.tagName).toLowerCase();
    const rawVal = typeof el.value === "string" ? el.value.trim() : "";
    const wrapper = el.closest("div");
    const labelText = wrapper?.querySelector("label")?.textContent?.trim() || el.getAttribute("placeholder") || "Field";

    if (type === "email") {
      hasEmailInput = true;
      email = rawVal;
    } else if (type === "tel") {
      phone = rawVal;
    } else if (/your name|official name/i.test(labelText)) {
      fullName = rawVal;
    } else if (
      /organisation|organization|company|institution|hospital|department|pickup location/i.test(labelText) &&
      !organization
    ) {
      organization = rawVal;
    }

    if (rawVal) {
      detailLines.push(`${labelText}: ${rawVal}`);
    }
  }

  if (!fullName && organization) {
    fullName = organization;
  }
  if (!organization && fullName) {
    organization = fullName;
  }

  const message = detailLines.join("\n").slice(0, 4000);
  if (!phone || (!fullName && !organization) || (hasEmailInput && !email) || !message) {
    showEmstrapAlert("Please fill all required fields.");
    return;
  }

  const originalLabel = submitButton ? submitButton.textContent : "";
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
  }

  const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
  const abortTimer = controller ? setTimeout(() => controller.abort(), 10000) : null;

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestType: String(requestType || "Demo Request").slice(0, 100),
        sourcePage: typeof window !== "undefined" ? window.location.pathname : "/",
        requiresEmail: hasEmailInput,
        fullName: fullName.slice(0, 120),
        organization: organization.slice(0, 160),
        email: email.slice(0, 254),
        phone: phone.slice(0, 25),
        message,
      }),
      signal: controller?.signal,
    });

    const contentType = response.headers.get("content-type") || "";
    const result = contentType.includes("application/json") ? await response.json() : null;

    if (response.ok && result?.success) {
      form.reset();
      if (typeof onSuccess === "function") onSuccess();
      showEmstrapAlert(successMessage);
    } else {
      showEmstrapAlert(
        result?.message || "Unable to submit your request right now. Please verify your details and try again."
      );
    }
  } catch (err) {
    if (err?.name === "AbortError") {
      showEmstrapAlert("Request timed out. Please check your connection and try again.");
    } else {
      showEmstrapAlert("Network error while submitting your request. Please try again shortly.");
    }
  } finally {
    if (abortTimer) clearTimeout(abortTimer);
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalLabel || "Submit Request";
    }
  }
}

export function usePageSetup({
  title,
  bodyClass = "bg-white text-slate-900 font-sans antialiased",
  themeClass = "",
  customCss = "",
  enableWave = true,
  enableHeaderAmbulance = true,
}) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
    document.body.className = [bodyClass, themeClass].filter(Boolean).join(" ");

    let styleEl = null;
    if (customCss) {
      styleEl = document.createElement("style");
      styleEl.setAttribute("data-emstrap-page-style", "true");
      styleEl.textContent = customCss;
      document.head.appendChild(styleEl);
    }

    const cleanupWave = enableWave ? initWaveObserver() : () => {};

    if (enableHeaderAmbulance) {
      trackScrollHeaderAmbulance();
      window.addEventListener("scroll", trackScrollHeaderAmbulance, { passive: true });
      window.addEventListener("resize", trackScrollHeaderAmbulance, { passive: true });
    }

    return () => {
      cleanupWave();
      if (enableHeaderAmbulance) {
        window.removeEventListener("scroll", trackScrollHeaderAmbulance);
        window.removeEventListener("resize", trackScrollHeaderAmbulance);
      }
      if (styleEl && styleEl.parentNode) {
        styleEl.parentNode.removeChild(styleEl);
      }
      document.body.style.overflow = "";
    };
  }, [title, bodyClass, themeClass, customCss, enableWave, enableHeaderAmbulance]);
}
