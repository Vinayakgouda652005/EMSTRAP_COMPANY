import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageSetup, showEmstrapAlert } from "../utils/emstrapLifecycle";

const PAGE_CSS = " .page-scope-contactpage {\n            background-color: #FFFFFF;\n            color: #0F172A;\n            font-family: 'Inter', sans-serif;\n            overflow-x: clip;\n        }\n        .font-display { font-family: 'Sora', sans-serif; }\n        .font-mono { font-family: 'JetBrains Mono', monospace; }";

export default function ContactPage() {
  usePageSetup({
    title: "Contact EMSTRAP | Corporate & Emergency Solutions",
    bodyClass: "bg-white text-slate-900 min-h-screen flex flex-col justify-between selection:bg-slate-800 selection:text-white",
    customCss: PAGE_CSS,
    enableWave: false,
    enableHeaderAmbulance: false,
  });

  const closeSuccessModal = () => {
    const sm = document.getElementById("successModal");
    if (sm) {
      sm.classList.add("hidden");
      sm.classList.remove("flex");
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = document.getElementById("contactForm");
    const submitButton = document.getElementById("submitBtn");
    if (!form || !submitButton) return;

    const fullName = form.querySelector("#fullName")?.value.trim() || "";
    const organization = form.querySelector("#organization")?.value.trim() || "";
    const email = form.querySelector("#email")?.value.trim() || "";
    const phone = form.querySelector("#phone")?.value.trim() || "";
    const message = form.querySelector("#message")?.value.trim() || "";

    if (!fullName || !organization || !email || !phone || !message) {
      showEmstrapAlert("Please fill all fields.");
      return;
    }

    submitButton.disabled = true;
    const spanEl = submitButton.querySelector("span");
    const originalText = spanEl ? spanEl.textContent : submitButton.textContent;
    if (spanEl) spanEl.textContent = "Sending...";
    else submitButton.textContent = "Sending...";

    const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    const abortTimer = controller ? setTimeout(() => controller.abort(), 10000) : null;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.slice(0, 200),
          organization: organization.slice(0, 200),
          email: email.slice(0, 254),
          phone: phone.slice(0, 50),
          message: message.slice(0, 4000),
        }),
        signal: controller?.signal,
      });
      const contentType = response.headers.get("content-type") || "";
      const result = contentType.includes("application/json") ? await response.json() : null;
      if (response.ok && result?.success) {
        document.getElementById("successModal")?.classList.remove("hidden");
        document.getElementById("successModal")?.classList.add("flex");
        form.reset();
      } else if (response.status >= 400 && response.status < 500) {
        showEmstrapAlert(result?.message || "Please check your inputs and try again.");
      } else {
        showEmstrapAlert(result?.message || "Unable to send message right now. Please try again.");
      }
    } catch {
      showEmstrapAlert("Network error while sending message. Please try again.");
    } finally {
      if (abortTimer) clearTimeout(abortTimer);
      submitButton.disabled = false;
      if (spanEl) spanEl.textContent = originalText || "Send Message";
      else submitButton.textContent = originalText || "Send Message";
    }
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeSuccessModal();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="page-scope-contactpage min-h-screen flex flex-col justify-between">
      

    {/* Top Glow Line */}
    <div className="h-1 w-full bg-gradient-to-r from-slate-700 via-slate-900 to-slate-700"></div>

    {/* Persistent Navigation Header */}
    <header className="py-5 px-6 md:px-12 border-b border-neutral-800/80 bg-black/95 backdrop-blur-md sticky top-0 z-50" id="mainHeader">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 group">
                <div className="h-10 flex items-center transition-transform duration-300 group-hover:scale-105">
                    <img src="/images/logo.png" alt="EMSTRAP Logo" className="h-full w-auto object-contain" />
                </div>
            </Link>
            
            <div className="flex items-center space-x-6 lg:space-x-8">
                <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
                    <Link to="/about" className="text-xs lg:text-sm font-semibold text-neutral-300 hover:text-white transition-colors">About</Link>
                    <Link to="/#page-services" className="text-xs lg:text-sm font-semibold text-neutral-300 hover:text-white transition-colors">Services</Link>
                    <Link to="/careers" target="_blank" rel="noopener noreferrer" className="text-xs lg:text-sm font-semibold text-neutral-300 hover:text-white transition-colors">Careers</Link>
                    <Link to="/contact" className="text-xs lg:text-sm font-semibold text-white transition-colors">Contact</Link>
                </nav>
                <div className="flex items-center gap-2 pl-3 border-l border-neutral-800">
                    <a href="https://www.linkedin.com/company/emstrap/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-all text-xs" title="LinkedIn">
                        <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                    <a href="https://www.instagram.com/emstrap_official?stkn=bjN6eXU2cHc5cHJ4" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-all text-xs" title="Instagram">
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                </div>
            </div>
        </div>
    </header>

    {/* Main Content Area */}
    <main className="flex-grow py-16 md:py-24 px-6 md:px-12 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto">
            {/* Header Block */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 block mb-2">GET IN TOUCH</span>
                <h1 className="text-4xl sm:text-5xl font-black font-display text-slate-900 tracking-tight">Contact Us</h1>
                <p className="text-base text-slate-600 mt-3 font-normal max-w-2xl mx-auto">
                    Connect with our corporate team for partnerships, enterprise emergency solutions, government briefings, and platform inquiries.
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Contact Info Column */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white p-8 border border-slate-200 shadow-sm rounded-2xl">
                        <h2 className="text-lg font-bold font-display text-slate-900 mb-6">Contact Details</h2>
                        <div className="space-y-6 text-sm text-slate-600">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-800 shrink-0 shadow-sm">
                                    <i className="fa-solid fa-envelope"></i>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Email Address</p>
                                    <a href="mailto:contact@emstrap.com" className="text-slate-900 hover:text-slate-700 font-semibold transition-all">contact@emstrap.com</a>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-800 shrink-0 shadow-sm">
                                    <i className="fa-solid fa-phone"></i>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Phone Number</p>
                                    <a href="tel:9880882476" className="text-slate-900 hover:text-slate-700 font-semibold transition-all">9880882476</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-800 shrink-0 shadow-sm">
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Headquarters</p>
                                    <span className="text-slate-900 font-semibold">Bengaluru, Karnataka, India</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white p-8 border border-slate-200 shadow-sm rounded-2xl">
                        <h2 className="text-lg font-bold font-display text-slate-900 mb-3">Professional Networks</h2>
                        <p className="text-xs text-slate-600 mb-5 font-normal">Follow EMSTRAP on LinkedIn and Instagram for official updates and company announcements.</p>
                        <div className="flex items-center gap-3">
                            <a href="https://www.linkedin.com/company/emstrap/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white hover:bg-slate-900 hover:text-white border border-slate-200 flex items-center justify-center text-slate-700 transition-all duration-200 shadow-sm" title="LinkedIn" aria-label="Official EMSTRAP LinkedIn">
                                <i className="fa-brands fa-linkedin-in text-sm"></i>
                            </a>
                            <a href="https://www.instagram.com/emstrap_official?stkn=bjN6eXU2cHc5cHJ4" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white hover:bg-slate-900 hover:text-white border border-slate-200 flex items-center justify-center text-slate-700 transition-all duration-200 shadow-sm" title="Instagram" aria-label="Official EMSTRAP Instagram">
                                <i className="fa-brands fa-instagram text-sm"></i>
                            </a>
                        </div>
                    </div>
                </div>
                
                {/* Contact Form Column */}
                <div className="lg:col-span-7 bg-white p-8 md:p-10 border border-slate-200 shadow-sm rounded-2xl">
                    <h2 className="text-xl font-bold font-display text-slate-900 mb-6">Send a Corporate Message</h2>
                    <form id="contactForm" onSubmit={handleFormSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-2 font-mono">Full Name *</label>
                                <input className="w-full bg-white border border-slate-300 focus:border-slate-800 focus:bg-white focus:outline-none rounded-xl px-4 py-3 text-sm text-slate-900 transition-all shadow-sm" placeholder="Enter your full name" required type="text" id="fullName" name="fullName" />
                            </div>
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-2 font-mono">Organization *</label>
                                <input className="w-full bg-white border border-slate-300 focus:border-slate-800 focus:bg-white focus:outline-none rounded-xl px-4 py-3 text-sm text-slate-900 transition-all shadow-sm" placeholder="Enter your organization" required type="text" id="organization" name="organization" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-2 font-mono">Email Address *</label>
                                <input className="w-full bg-white border border-slate-300 focus:border-slate-800 focus:bg-white focus:outline-none rounded-xl px-4 py-3 text-sm text-slate-900 transition-all shadow-sm" placeholder="Enter your email" required type="email" id="email" name="email" />
                            </div>
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-2 font-mono">Phone Number *</label>
                                <input className="w-full bg-white border border-slate-300 focus:border-slate-800 focus:bg-white focus:outline-none rounded-xl px-4 py-3 text-sm text-slate-900 transition-all shadow-sm" placeholder="Enter your phone number" required type="tel" id="phone" name="phone" />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-2 font-mono">Your Message *</label>
                            <textarea className="w-full bg-white border border-slate-300 focus:border-slate-800 focus:bg-white focus:outline-none rounded-xl px-4 py-3 text-sm text-slate-900 transition-all shadow-sm" placeholder="How can EMSTRAP technology support your emergency initiatives?" required rows={5} id="message" name="message"></textarea>
                        </div>
                        <button id="submitBtn" className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold tracking-wider text-xs uppercase transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer font-display" type="submit">
                            <span>Send Message</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </main>

    {/* Success Modal */}
    <div className="hidden fixed inset-0 z-50 items-center justify-center p-6 bg-black/80 backdrop-blur-md" id="successModal" onClick={(e) => { if (e.target === e.currentTarget) closeSuccessModal(); }}>
        <div className="bg-slate-900 p-8 rounded-3xl max-w-md w-full border border-slate-800 text-center animate-scale-in text-white shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-5 text-emerald-400 text-2xl">
                <i className="fa-solid fa-check"></i>
            </div>
            <h3 className="text-2xl font-bold font-display text-white mb-3">Message Sent!</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-7 font-light">
                Your message has been received. The EMSTRAP team will review your enquiry and get back to you shortly.
            </p>
            <button className="w-full py-3 rounded-xl bg-white hover:bg-slate-200 text-black font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2" onClick={closeSuccessModal}>
                <span>Close</span>
            </button>
        </div>
    </div>

    {/* Persistent Global Footer */}
    <footer className="relative z-10 bg-[#050B14] border-t border-white/5 py-12 px-6 md:px-12 text-xs text-neutral-500" id="mainFooter">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 p-0.5 flex items-center justify-center">
                    <img src="/images/logo1.jpeg" alt="EMSTRAP Logo" className="max-w-full max-h-full object-contain" />
                </div>
                <span className="text-sm font-bold font-display tracking-wider text-white">EMSTRAP Pvt Ltd</span>
            </div>
            <div className="flex items-center space-x-6 text-neutral-400">
                <Link to="/about" className="hover:text-white transition-colors">About</Link>
                <Link to="/#page-services" className="hover:text-white transition-colors">Services</Link>
                <Link to="/careers" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Careers</Link>
                <Link to="/contact" className="text-white transition-colors">Contact</Link>
            </div>
            <div className="flex items-center gap-3">
                <a href="https://www.linkedin.com/company/emstrap/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-600 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-200" title="LinkedIn">
                    <i className="fa-brands fa-linkedin-in text-sm"></i>
                </a>
                <a href="https://www.instagram.com/emstrap_official?stkn=bjN6eXU2cHc5cHJ4" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-600 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-200" title="Instagram">
                    <i className="fa-brands fa-instagram text-sm"></i>
                </a>
            </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/5 mt-8 pt-6 text-center text-slate-500 font-mono text-[11px]">
            &copy; 2026 EMSTRAP Pvt Ltd. All rights reserved.
        </div>
    </footer>

    

    </div>
  );
}
