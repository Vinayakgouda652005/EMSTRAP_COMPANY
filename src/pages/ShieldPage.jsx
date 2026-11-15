import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageSetup, submitEmstrapModalRequest } from "../utils/emstrapLifecycle";

const PAGE_CSS = "/* Pulse & Heartbeat Animation for Shield Ecosystem */\n        @keyframes heartbeatPulse {\n            0%, 100% {\n                transform: scale(1);\n                filter: drop-shadow(0 0 4px rgba(220, 38, 38, 0.4));\n            }\n            15% {\n                transform: scale(1.08);\n                filter: drop-shadow(0 0 16px rgba(220, 38, 38, 0.7));\n            }\n            30% {\n                transform: scale(1.02);\n            }\n            45% {\n                transform: scale(1.12);\n                filter: drop-shadow(0 0 20px rgba(220, 38, 38, 0.8));\n            }\n            60% {\n                transform: scale(1);\n            }\n        }\n        .animate-heartbeat {\n            animation: heartbeatPulse 1.8s infinite ease-in-out;\n        }\n\n        @keyframes radarRipple {\n            0% {\n                transform: scale(0.85);\n                opacity: 0.85;\n            }\n            100% {\n                transform: scale(1.75);\n                opacity: 0;\n            }\n        }\n        .animate-radar-ring {\n            animation: radarRipple 2.2s cubic-bezier(0.1, 0.5, 0.2, 1) infinite;\n        }\n        .animate-radar-ring-delayed {\n            animation: radarRipple 2.2s cubic-bezier(0.1, 0.5, 0.2, 1) infinite;\n            animation-delay: 1.1s;\n        }\n\n        /* Flowing connecting lines animation */\n        @keyframes beamFlowLine {\n            from {\n                stroke-dashoffset: 24;\n            }\n            to {\n                stroke-dashoffset: 0;\n            }\n        }\n        .animate-beam-flow {\n            stroke-dasharray: 6 6;\n            animation: beamFlowLine 1.4s linear infinite;\n        }\n        .animate-beam-flow-rev {\n            stroke-dasharray: 6 6;\n            animation: beamFlowLine 1.4s linear infinite reverse;\n        }";

export default function ShieldPage() {
  usePageSetup({
    title: "EMSTRAP Shield | Workplace Safety, Employee SOS & Family Protection",
    bodyClass: "bg-[#F8FAFC] text-slate-900 font-sans min-h-screen flex flex-col justify-between selection:bg-emergencyRed selection:text-white antialiased",
    themeClass: "theme-solutions",
    customCss: PAGE_CSS,
    enableWave: false,
    enableHeaderAmbulance: false,
  });

  const openEcosystemModal = () => {
    const m = document.getElementById("ecosystemModal");
    if (m) {
      m.classList.remove("hidden");
      m.classList.add("flex");
    }
  };
  const closeEcosystemModal = () => {
    const m = document.getElementById("ecosystemModal");
    if (m) {
      m.classList.add("hidden");
      m.classList.remove("flex");
    }
  };
  const openShieldDemoModal = () => {
    const m = document.getElementById("shieldDemoModal");
    if (m) {
      m.classList.remove("hidden");
      m.classList.add("flex");
    }
  };
  const closeShieldDemoModal = () => {
    const m = document.getElementById("shieldDemoModal");
    if (m) {
      m.classList.add("hidden");
      m.classList.remove("flex");
    }
  };
  const handleShieldDemoSubmit = (e) =>
    submitEmstrapModalRequest({
      event: e,
      requestType: "EMSTRAP Shield Corporate Demo Request",
      successMessage:
        "Thank you. The EMSTRAP Corporate Safety Desk has received your request and will schedule a demo.",
      onSuccess: closeShieldDemoModal,
    });

  
useEffect(() => {
  const btn = document.getElementById("shieldMobileMenuBtn");
  const menu = document.getElementById("shieldMobileMenu");

  const toggleMobile = () => {
    if (!menu) return;

    const isHidden = menu.classList.toggle("hidden");
    btn?.setAttribute("aria-expanded", String(!isHidden));
  };

  const closeMobile = () => {
    menu?.classList.add("hidden");
    btn?.setAttribute("aria-expanded", "false");
  };

  btn?.addEventListener("click", toggleMobile);

  menu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobile);
  });

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      closeEcosystemModal();
      closeShieldDemoModal();
      closeMobile();
    }
  };

  document.addEventListener("keydown", onKeyDown);

  return () => {
    btn?.removeEventListener("click", toggleMobile);

    menu?.querySelectorAll("a").forEach((link) => {
      link.removeEventListener("click", closeMobile);
    });

    document.removeEventListener("keydown", onKeyDown);
  };
}, []);


  return (
    <div className="page-scope-shieldpage theme-solutions min-h-screen flex flex-col justify-between">
      

{/* SHIELD NAVBAR */}
<nav
  id="shieldNavbar"
  className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
>
  <div className="max-w-7xl mx-auto px-5 lg:px-8">
    <div className="min-h-20 flex items-center justify-between gap-4">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 shrink-0">
        <img
          src="/images/logo.png"
          alt="EMSTRAP Logo"
          className="h-11 w-auto object-contain"
        />
        <div className="flex flex-col leading-tight">
          <span className="text-xl font-extrabold tracking-wide text-slate-900">
            EMSTRAP SHIELD
          </span>
          
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden xl:flex items-center gap-6">

        <a
          href="#section-01-hero"
          className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
        >
          Home
        </a>

        <a
          href="#section-02-middle"
          className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
        >
          Problem
        </a>

        <a
          href="#section-03-covered"
          className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
        >
          Solutions
        </a>

        <a
          href="#corporate-plans"
          className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
        >
          Plans
        </a>

        <a
          href="#section-shield-ecosystem"
          className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
        >
          Ecosystem
        </a>

        <Link
          to="/"
          className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors whitespace-nowrap"
        >
          Main Website
        </Link>

        
      </div>

      {/* Mobile Menu Button */}
      <button
        id="shieldMobileMenuBtn"
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded="false"
        className="xl:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-slate-800 hover:bg-slate-100 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    {/* Mobile / Tablet Navigation */}
    <div
      id="shieldMobileMenu"
      className="hidden xl:hidden pb-5 pt-3 border-t border-slate-100"
    >
      <div className="flex flex-col gap-1">

        <a href="#section-01-hero" className="text-sm font-semibold text-red-600 py-3">
          Home
        </a>

        <a href="#section-02-middle" className="text-sm font-medium text-slate-700 py-3 hover:text-red-600">
          Problem
        </a>

        <a href="#section-03-covered" className="text-sm font-medium text-slate-700 py-3 hover:text-red-600">
          Solutions
        </a>

        <a href="#corporate-plans" className="text-sm font-medium text-slate-700 py-3 hover:text-red-600">
          Plans
        </a>

        <a href="#section-shield-ecosystem" className="text-sm font-medium text-slate-700 py-3 hover:text-red-600">
          Ecosystem
        </a>

        <Link to="/" className="text-sm font-medium text-slate-700 py-3 hover:text-red-600">
          Main Website
        </Link>

        
      </div>
    </div>
  </div>
</nav>


    <main className="flex-grow space-y-16 md:space-y-20 pb-20">

      
{/* ===================================================================== */}
{/* 01. HERO SECTION — FULL IMAGE BACKGROUND */}
{/* ===================================================================== */}

<section
    className="relative min-h-[540px] sm:min-h-[650px] lg:min-h-[720px] flex items-center overflow-hidden border-b border-slate-200"
    id="section-01-hero"
>
    {/* Background image */}
    <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
            backgroundImage: "url('/images/shield-hero-campus-clean.jpg')"
        }}
    />

    {/* Soft bright overlay - keeps background visible */}
    <div className="absolute inset-0 z-[1] pointer-events-none
        bg-gradient-to-r
        from-white/60
        via-white/50
        via-[45%]
        to-white/10"
    />

    {/* Subtle bottom gradient */}
    <div className="absolute inset-0 z-[1] pointer-events-none
        bg-gradient-to-t
        from-white/20
        via-transparent
        to-white/10"
    />

    {/* Hero content */}
    <div className="max-w-7xl w-full mx-auto px-6 md:px-12
        py-20 md:py-28 relative z-10">

        <div className="max-w-xl space-y-6 text-left">

            {/* Eyebrow */}
            <div>
                <span className="text-xs font-extrabold tracking-[0.2em]
                    text-red-600 uppercase block mb-4">
                    EMSTRAP SHIELD
                </span>

                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl
                    font-black font-display text-slate-950
                    tracking-tight leading-[1.08]">
                    Your People.<br />
                    Your Workplace.<br />
                    One <span className="text-red-600">Safety Shield.</span>
                </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-800
                font-medium leading-relaxed max-w-lg">
                Complete safety and emergency protection for your
                organization. Employee emergencies, ambulance assistance,
                workplace safety, emergency drills and family protection
                — all in one platform.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">

                <a
                    href="#corporate-plans"
                    className="px-8 py-4 rounded-full bg-red-600
                    hover:bg-red-700 text-white font-bold
                    text-xs uppercase tracking-wider
                    transition-all duration-300 shadow-lg
                    hover:shadow-red-900/20 hover:-translate-y-1
                    inline-flex items-center gap-3"
                >
                    Explore Plans
                    <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </a>

                <button
                    onClick={openShieldDemoModal}
                    className="px-7 py-4 rounded-full
                    bg-white/80 hover:bg-white
                    text-slate-900 font-bold text-xs uppercase
                    tracking-wider transition-all duration-300
                    border border-slate-400/70
                    backdrop-blur-sm hover:-translate-y-1"
                >
                    Request a Corporate Demo
                </button>

            </div>

            {/* Capability bar */}
            <div className="pt-5 border-t border-slate-400/50
                flex flex-wrap items-center gap-x-3 gap-y-2
                text-xs font-semibold text-slate-800">

                <span>Employee Emergency</span>
                <span className="text-slate-400">|</span>
                <span>SOS</span>
                <span className="text-slate-400">|</span>
                <span>Ambulance Coverage</span>
                <span className="text-slate-400">|</span>
                <span>Workplace Safety</span>
                <span className="text-slate-400">|</span>
                <span>Emergency Drills</span>
                <span className="text-slate-400">|</span>
                <span>Family Protection</span>

            </div>

        </div>
    </div>
</section>


        {/* ===================================================================== */}
        {/* 02. MIDDLE ROW (Tier 2: Why Shield + Safety Dashboard + The Problem) */}
        {/* ===================================================================== */}
        <section className="max-w-7xl mx-auto px-6 md:px-12" id="section-02-middle">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                
                {/* Left: Why EMSTRAP Shield? */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6 text-left flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="space-y-2">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-emergencyRed block">PREVENTION &amp; READINESS</span>
                        <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900 tracking-tight">
                            Why EMSTRAP Shield?
                        </h2>
                        <p className="text-sm text-slate-600 font-normal leading-relaxed">
                            Workplace safety doesn't begin when an emergency happens. A truly safe organization needs comprehensive protection:
                        </p>
                    </div>

                    {/* 3 Stacked Cards: Prepare, Respond, Learn */}
                    <div className="space-y-3.5">
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-4 hover:border-emergencyRed/40 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-red-100 text-emergencyRed flex items-center justify-center text-sm font-bold shrink-0">
                                <i className="fa-solid fa-clipboard-check"></i>
                            </div>
                            <div>
                                <strong className="text-sm font-bold font-display text-slate-900 block">Prepare</strong>
                                <span className="text-xs text-slate-500 font-normal">Conduct drills, risk assessments, and first-aid readiness before an emergency.</span>
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-4 hover:border-brandBlue/40 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 text-brandBlue flex items-center justify-center text-sm font-bold shrink-0">
                                <i className="fa-solid fa-tower-broadcast"></i>
                            </div>
                            <div>
                                <strong className="text-sm font-bold font-display text-slate-900 block">Respond</strong>
                                <span className="text-xs text-slate-500 font-normal">Immediate SOS dispatch, rapid ambulance coordination, and hospital pre-alerts.</span>
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-4 hover:border-emerald-500/40 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold shrink-0">
                                <i className="fa-solid fa-chart-line"></i>
                            </div>
                            <div>
                                <strong className="text-sm font-bold font-display text-slate-900 block">Learn</strong>
                                <span className="text-xs text-slate-500 font-normal">Post-incident audit logs, response time telemetry, and protocol compliance reports.</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: The Problem with Ambulance Photo */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-5 text-left flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="space-y-3">
                        <div>
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">THE PROBLEM</span>
                            <h3 className="text-2xl font-black font-display text-slate-900 tracking-tight leading-tight mt-1">
                                Finding an ambulance shouldn't become another emergency.
                            </h3>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 font-normal">
                            When an emergency strikes in an enterprise or campus, staff often face critical delays:
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium pt-1">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-3 bg-emergencyRed rounded-full shrink-0"></span>
                                <span>Searching for nearby ambulances</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-3 bg-emergencyRed rounded-full shrink-0"></span>
                                <span>Making multiple phone calls</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-3 bg-emergencyRed rounded-full shrink-0"></span>
                                <span>Checking fleet availability</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-3 bg-emergencyRed rounded-full shrink-0"></span>
                                <span>Repeating patient condition</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-3 bg-emergencyRed rounded-full shrink-0"></span>
                                <span>Waiting endlessly for confirmation</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-3 bg-emergencyRed rounded-full shrink-0"></span>
                                <span>Manual campus gate coordination</span>
                            </div>
                        </div>

                        <p className="text-xs text-slate-500 font-normal pt-1">
                            During high-stress corporate emergencies, every lost minute risks employee lives and business continuity.
                        </p>
                    </div>

                    {/* Ambulance in Front of Hospital Photo */}
                    <div className="h-44 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80">
                        <img src="/images/shield-problem-ambulance.png" alt="Ambulance unit" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                    </div>
                </div>

            </div>
        </section>

        {/* ===================================================================== */}
        {/* 03. EVERYTHING YOUR ORGANIZATION IS COVERED FOR (Safety Ecosystem) */}
        {/* ===================================================================== */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16" id="section-03-covered">
            
            {/* Section Header & Top Categories Bar matching Slide */}
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-10">
                <div className="space-y-3 max-w-2xl">
                    <div className="flex items-center gap-2">
                        <span className="w-6 h-[2px] bg-emergencyRed"></span>
                        <span className="text-xs font-mono font-bold tracking-widest text-emergencyRed uppercase">
                            EMSTRAP SHIELD
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight leading-[1.15]">
                        Everything Your Organization Is <span className="text-emergencyRed">Covered For.</span>
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                        A complete safety and emergency ecosystem for your employees, workplace and their families.
                    </p>
                </div>

                {/* 8 Categories Quick Icons Pill Bar */}
                <div className="grid grid-cols-2 min-[380px]:grid-cols-4 sm:grid-cols-8 gap-2 bg-slate-50 border border-slate-200/80 p-2.5 rounded-2xl">
                    <div className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-white transition-all text-center group cursor-pointer" title="Ambulance Assistance">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 text-brandBlue flex items-center justify-center text-xs mb-1 group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-truck-medical"></i>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-700 leading-tight">Ambulance<br />Assistance</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-white transition-all text-center group cursor-pointer" title="Fire Safety">
                        <div className="w-7 h-7 rounded-lg bg-red-50 text-emergencyRed flex items-center justify-center text-xs mb-1 group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-fire-extinguisher"></i>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-700 leading-tight">Fire<br />Safety</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-white transition-all text-center group cursor-pointer" title="Medical Kits">
                        <div className="w-7 h-7 rounded-lg bg-red-50 text-rose-500 flex items-center justify-center text-xs mb-1 group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-kit-medical"></i>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-700 leading-tight">Medical<br />Kits</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-white transition-all text-center group cursor-pointer" title="Training & Drills">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 text-brandBlue flex items-center justify-center text-xs mb-1 group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-users"></i>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-700 leading-tight">Training<br />&amp; Drills</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-white transition-all text-center group cursor-pointer" title="Employee SOS">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 text-brandBlue flex items-center justify-center text-xs mb-1 group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-shield-halved"></i>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-700 leading-tight">Employee<br />SOS</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-white transition-all text-center group cursor-pointer" title="Family Protection">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 text-brandBlue flex items-center justify-center text-xs mb-1 group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-people-group"></i>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-700 leading-tight">Family<br />Protection</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-white transition-all text-center group cursor-pointer" title="Company Dashboard">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 text-brandBlue flex items-center justify-center text-xs mb-1 group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-chart-column"></i>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-700 leading-tight">Company<br />Dashboard</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-white transition-all text-center group cursor-pointer" title="Reports & Insights">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 text-brandBlue flex items-center justify-center text-xs mb-1 group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-file-contract"></i>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-700 leading-tight">Reports<br />&amp; Insights</span>
                    </div>
                </div>
            </div>

            {/* 8 Wide Cards in 2-Column Grid (Matching Slide Layout) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Card 01 Employee SOS & Emergency Response */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 justify-between">
                    <div className="sm:w-[58%] flex flex-col justify-between space-y-3">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl font-black font-display text-slate-300">01</span>
                                <div className="w-7 h-7 rounded-lg bg-red-50 text-emergencyRed flex items-center justify-center text-xs">
                                    <i className="fa-solid fa-shield-halved"></i>
                                </div>
                                <h3 className="text-base font-bold font-display text-slate-900 leading-snug">
                                    Employee SOS &amp; Emergency Response
                                </h3>
                            </div>
                            <p className="text-xs text-slate-600 font-normal leading-relaxed">
                                Employees can raise an SOS alert during medical emergencies, accidents or safety incidents.
                            </p>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-emergencyRed text-[11px] shrink-0"></i>
                                <span>Instant SOS alerts</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-emergencyRed text-[11px] shrink-0"></i>
                                <span>Company notifications</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-emergencyRed text-[11px] shrink-0"></i>
                                <span>Ambulance coordination</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-emergencyRed text-[11px] shrink-0"></i>
                                <span>Real-time incident tracking</span>
                            </li>
                        </ul>
                    </div>
                    <div className="sm:w-[42%] shrink-0 rounded-xl overflow-hidden border border-slate-200/80 bg-slate-100 h-44 sm:h-auto min-h-[160px]">
                        <img src="/images/shield_covered/c01_sos.jpg" alt="Employee SOS Alert Screen" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                </div>

                {/* Card 02 Ambulance Assistance */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 justify-between">
                    <div className="sm:w-[58%] flex flex-col justify-between space-y-3">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl font-black font-display text-slate-300">02</span>
                                <div className="w-7 h-7 rounded-lg bg-blue-50 text-brandBlue flex items-center justify-center text-xs">
                                    <i className="fa-solid fa-truck-medical"></i>
                                </div>
                                <h3 className="text-base font-bold font-display text-slate-900 leading-snug">
                                    Ambulance Assistance
                                </h3>
                            </div>
                            <p className="text-xs text-slate-600 font-normal leading-relaxed">
                                EMSTRAP coordinates eligible ambulance services for employees as per your selected plan.
                            </p>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-brandBlue text-[11px] shrink-0"></i>
                                <span>Eligible ambulance coordination</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-brandBlue text-[11px] shrink-0"></i>
                                <span>Nearest ambulance assignment</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-brandBlue text-[11px] shrink-0"></i>
                                <span>Real-time tracking and ETA</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-brandBlue text-[11px] shrink-0"></i>
                                <span>Support with professional ambulance partners</span>
                            </li>
                        </ul>
                    </div>
                    <div className="sm:w-[42%] shrink-0 rounded-xl overflow-hidden border border-slate-200/80 bg-slate-100 h-44 sm:h-auto min-h-[160px]">
                        <img src="/images/shield_covered/c02_ambulance.jpg" alt="Ambulance Assistance at Office" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                </div>

                {/* Card 03 Fire Safety & Evacuation */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 justify-between">
                    <div className="sm:w-[58%] flex flex-col justify-between space-y-3">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl font-black font-display text-slate-300">03</span>
                                <div className="w-7 h-7 rounded-lg bg-red-50 text-emergencyRed flex items-center justify-center text-xs">
                                    <i className="fa-solid fa-fire-extinguisher"></i>
                                </div>
                                <h3 className="text-base font-bold font-display text-slate-900 leading-snug">
                                    Fire Safety &amp; Evacuation
                                </h3>
                            </div>
                            <p className="text-xs text-slate-600 font-normal leading-relaxed">
                                Help your organization stay prepared for fire emergencies with proper equipment, regular inspections and evacuation planning.
                            </p>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-emergencyRed text-[11px] shrink-0"></i>
                                <span>Fire equipment records</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-emergencyRed text-[11px] shrink-0"></i>
                                <span>Emergency exit information</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-emergencyRed text-[11px] shrink-0"></i>
                                <span>Regular inspection tracking</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-emergencyRed text-[11px] shrink-0"></i>
                                <span>Evacuation planning and drill records</span>
                            </li>
                        </ul>
                    </div>
                    <div className="sm:w-[42%] shrink-0 rounded-xl overflow-hidden border border-slate-200/80 bg-slate-100 h-44 sm:h-auto min-h-[160px]">
                        <img src="/images/shield_covered/c03_fire.jpg" alt="Fire Safety Hose and Exit" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                </div>

                {/* Card 04 First-Aid & Medical Kits */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 justify-between">
                    <div className="sm:w-[58%] flex flex-col justify-between space-y-3">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl font-black font-display text-slate-300">04</span>
                                <div className="w-7 h-7 rounded-lg bg-blue-50 text-brandBlue flex items-center justify-center text-xs">
                                    <i className="fa-solid fa-kit-medical"></i>
                                </div>
                                <h3 className="text-base font-bold font-display text-slate-900 leading-snug">
                                    First-Aid &amp; Medical Kits
                                </h3>
                            </div>
                            <p className="text-xs text-slate-600 font-normal leading-relaxed">
                                Maintain first-aid readiness across your workplaces with proper kit availability, location tracking and inspection management.
                            </p>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-brandBlue text-[11px] shrink-0"></i>
                                <span>First-aid stations and kit locations</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-brandBlue text-[11px] shrink-0"></i>
                                <span>Kit availability and status</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-brandBlue text-[11px] shrink-0"></i>
                                <span>Inspection and expiry tracking</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-brandBlue text-[11px] shrink-0"></i>
                                <span>Replenishment management</span>
                            </li>
                        </ul>
                    </div>
                    <div className="sm:w-[42%] shrink-0 rounded-xl overflow-hidden border border-slate-200/80 bg-slate-100 h-44 sm:h-auto min-h-[160px]">
                        <img src="/images/shield_covered/c04_medical_kit.jpg" alt="First-Aid & Medical Supplies Cabinet" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                </div>

                {/* Card 05 Employee Safety Training & Mock Drills */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 justify-between">
                    <div className="sm:w-[58%] flex flex-col justify-between space-y-3">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl font-black font-display text-slate-300">05</span>
                                <div className="w-7 h-7 rounded-lg bg-red-50 text-emergencyRed flex items-center justify-center text-xs">
                                    <i className="fa-solid fa-users"></i>
                                </div>
                                <h3 className="text-base font-bold font-display text-slate-900 leading-snug">
                                    Employee Safety Training &amp; Mock Drills
                                </h3>
                            </div>
                            <p className="text-xs text-slate-600 font-normal leading-relaxed">
                                Conduct regular training and drills to build a safer and more prepared workforce.
                            </p>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-emergencyRed text-[11px] shrink-0"></i>
                                <span>First-aid and CPR awareness</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-emergencyRed text-[11px] shrink-0"></i>
                                <span>Fire extinguisher training</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-emergencyRed text-[11px] shrink-0"></i>
                                <span>Evacuation drills</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-emergencyRed text-[11px] shrink-0"></i>
                                <span>Training schedules and attendance</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-emergencyRed text-[11px] shrink-0"></i>
                                <span>Training records and reports</span>
                            </li>
                        </ul>
                    </div>
                    <div className="sm:w-[42%] shrink-0 rounded-xl overflow-hidden border border-slate-200/80 bg-slate-100 h-44 sm:h-auto min-h-[160px]">
                        <img src="/images/shield_covered/c05_cpr_training.jpg" alt="Employee CPR & Safety Training" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                </div>

                {/* Card 06 Company Safety Dashboard */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 justify-between">
                    <div className="sm:w-[58%] flex flex-col justify-between space-y-3">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl font-black font-display text-slate-300">06</span>
                                <div className="w-7 h-7 rounded-lg bg-blue-50 text-brandBlue flex items-center justify-center text-xs">
                                    <i className="fa-solid fa-chart-column"></i>
                                </div>
                                <h3 className="text-base font-bold font-display text-slate-900 leading-snug">
                                    Company Safety Dashboard
                                </h3>
                            </div>
                            <p className="text-xs text-slate-600 font-normal leading-relaxed">
                                Get a centralized view of all safety and emergency activities across your organization.
                            </p>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-brandBlue text-[11px] shrink-0"></i>
                                <span>Employees and safety status</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-brandBlue text-[11px] shrink-0"></i>
                                <span>Emergency incidents</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-brandBlue text-[11px] shrink-0"></i>
                                <span>Ambulance activity</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-brandBlue text-[11px] shrink-0"></i>
                                <span>Inspections and equipment</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-brandBlue text-[11px] shrink-0"></i>
                                <span>Training and drills</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-brandBlue text-[11px] shrink-0"></i>
                                <span>Reports and analytics</span>
                            </li>
                        </ul>
                    </div>
                    <div className="sm:w-[42%] shrink-0 rounded-xl overflow-hidden border border-slate-200/80 bg-slate-100 h-44 sm:h-auto min-h-[160px]">
                        <img src="/images/shield_covered/c06_dashboard.jpg" alt="Company Safety Dashboard Display" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                </div>

                {/* Card 07 Family Protection */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 justify-between">
                    <div className="sm:w-[58%] flex flex-col justify-between space-y-3">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl font-black font-display text-slate-300">07</span>
                                <div className="w-7 h-7 rounded-lg bg-red-50 text-emergencyRed flex items-center justify-center text-xs">
                                    <i className="fa-solid fa-people-group"></i>
                                </div>
                                <h3 className="text-base font-bold font-display text-slate-900 leading-snug">
                                    Family Protection
                                </h3>
                            </div>
                            <p className="text-xs text-slate-600 font-normal leading-relaxed">
                                Because employee safety doesn't stop at the office. The Complete plan extends eligible emergency service access to up to four registered family members per employee.
                            </p>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-emergencyRed text-[11px] shrink-0"></i>
                                <span>Spouse, children and parents</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-emergencyRed text-[11px] shrink-0"></i>
                                <span>Emergency support</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-emergencyRed text-[11px] shrink-0"></i>
                                <span>Ambulance coordination (as per plan)</span>
                            </li>
                        </ul>
                    </div>
                    <div className="sm:w-[42%] shrink-0 rounded-xl overflow-hidden border border-slate-200/80 bg-slate-100 h-44 sm:h-auto min-h-[160px]">
                        <img src="/images/shield_covered/c07_family.jpg" alt="Employee Family Protection" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                </div>

                {/* Card 08 Safety Reports & Insights */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 justify-between">
                    <div className="sm:w-[58%] flex flex-col justify-between space-y-3">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl font-black font-display text-slate-300">08</span>
                                <div className="w-7 h-7 rounded-lg bg-blue-50 text-brandBlue flex items-center justify-center text-xs">
                                    <i className="fa-solid fa-file-contract"></i>
                                </div>
                                <h3 className="text-base font-bold font-display text-slate-900 leading-snug">
                                    Safety Reports &amp; Insights
                                </h3>
                            </div>
                            <p className="text-xs text-slate-600 font-normal leading-relaxed">
                                Track incidents, identify trends and take corrective actions with detailed reports and insights.
                            </p>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-brandBlue text-[11px] shrink-0"></i>
                                <span>Incident history and records</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-brandBlue text-[11px] shrink-0"></i>
                                <span>Corrective actions</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-brandBlue text-[11px] shrink-0"></i>
                                <span>Safety trend analysis</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-brandBlue text-[11px] shrink-0"></i>
                                <span>Inspection and drill reports</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fa-solid fa-circle-check text-brandBlue text-[11px] shrink-0"></i>
                                <span>Export and share reports</span>
                            </li>
                        </ul>
                    </div>
                    <div className="sm:w-[42%] shrink-0 rounded-xl overflow-hidden border border-slate-200/80 bg-slate-100 h-44 sm:h-auto min-h-[160px]">
                        <img src="/images/shield_covered/c08_reports.jpg" alt="Safety Reports and Compliance Analytics" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                </div>

            </div>
        </section>

       
        

        {/* ===================================================================== */}
        {/* 04. CORPORATE PLANS (Dedicated Section - Matching Client Slide) */}
        {/* ===================================================================== */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16" id="corporate-plans">
            <div className="text-left space-y-4 mb-10">
                <span className="text-xs font-mono font-bold tracking-widest text-slate-900 uppercase block">
                    EMSTRAP SHIELD
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight leading-[1.15]">
                    Three Safety Plans: The Right Level of Support
                </h2>
                <p className="text-base sm:text-lg text-slate-600 font-normal max-w-3xl leading-relaxed">
                    Choose the safety and emergency plan that fits your organization's workforce, facilities, and risk profile.
                </p>
            </div>

            {/* 3 Plans Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

                {/* Plan 1: SILVER SHIELD */}
                <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-8">
                    <div className="space-y-6">
                        {/* Header with Silver Circle */}
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center shrink-0 shadow-inner">
                                <i className="fa-solid fa-shield text-slate-600 text-lg"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-black font-display uppercase tracking-wide text-slate-900">
                                    SILVER SHIELD
                                </h3>
                                <p className="text-xs font-mono text-slate-500 font-medium">Essential Safety</p>
                            </div>
                        </div>

                        {/* Bullets */}
                        <ul className="space-y-3.5 text-sm text-slate-700">
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></span>
                                <span>Employee SOS</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></span>
                                <span>Ambulance service</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></span>
                                <span>First-aid support</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></span>
                                <span>Company dashboard</span>
                            </li>
                            
                        </ul>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-slate-100">
                        <p className="text-xs font-semibold text-emergencyRed">
                            Ideal for: <span className="text-slate-600 font-normal">Startups, small offices, professional firms</span>
                        </p>
                        <button onClick={openShieldDemoModal} className="w-full py-3 rounded-full bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs uppercase tracking-wider font-display border border-slate-300 shadow-xs transition-all hover:border-slate-400">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Plan 2: GOLD SHIELD (Featured Dark Navy Card) */}
                <div className="p-8 rounded-3xl bg-[#0F1E36] text-white border-2 border-amber-500/50 shadow-2xl relative flex flex-col justify-between space-y-8 transform lg:-translate-y-2">
                    <div className="absolute -top-3 right-8 bg-amber-500 text-slate-950 text-[10px] font-mono font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                        Enhanced Protection
                    </div>

                    <div className="space-y-6">
                        {/* Header with Gold Circle */}
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-amber-400 border border-amber-300 flex items-center justify-center shrink-0 shadow-md">
                                <i className="fa-solid fa-shield text-slate-900 text-lg"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-black font-display uppercase tracking-wide text-white">
                                    GOLD SHIELD
                                </h3>
                                <p className="text-xs font-mono text-amber-200/90 font-medium">Enhanced Protection</p>
                            </div>
                        </div>

                        {/* Bullets */}
                        <ul className="space-y-3.5 text-sm text-slate-200">
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                                <span>Everything in Silver</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                                <span>Company dashboard</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                                <span>Fire extinguishers</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                                <span>Safety drills</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                                <span>Training</span>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-slate-800">
                        <p className="text-xs font-semibold text-amber-400">
                            Ideal for: <span className="text-slate-300 font-normal">Growing companies, warehouses, multi-department</span>
                        </p>
                        <button onClick={openShieldDemoModal} className="w-full py-3 rounded-full bg-emergencyRed hover:bg-emergencyRedDark text-white font-bold text-xs uppercase tracking-wider font-display shadow-lg transition-all hover:scale-105 active:scale-95">
                            Request Demo
                        </button>
                    </div>
                </div>

                {/* Plan 3: DIAMOND SHIELD */}
                <div className="p-8 rounded-3xl bg-white border border-blue-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-8">
                    <div className="space-y-6">
                        {/* Header with Soft Blue Circle */}
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-sky-300 border border-sky-400/40 flex items-center justify-center shrink-0 shadow-inner">
                                <i className="fa-solid fa-shield text-sky-900 text-lg"></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-black font-display uppercase tracking-wide text-slate-900">
                                    DIAMOND SHIELD
                                </h3>
                                <p className="text-xs font-mono text-brandBlue font-medium">Comprehensive Solutions</p>
                            </div>
                        </div>

                        {/* Bullets */}
                        <ul className="space-y-3.5 text-sm text-slate-700">
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-brandBlue shrink-0"></span>
                                <span>Everything in Gold</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-brandBlue shrink-0"></span>
                                <span>Customized Safety Plans</span>
                            </li>
                            
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-brandBlue shrink-0"></span>
                                <span>Dedicated ambulance</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-brandBlue shrink-0"></span>
                                <span>Covers 4 family members (including the employee)</span>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-slate-100">
                        <p className="text-xs font-semibold text-emergencyRed">
                            Ideal for: <span className="text-slate-600 font-normal">Enterprises, manufacturing, healthcare, multi-site</span>
                        </p>
                        <button onClick={openShieldDemoModal} className="w-full py-3 rounded-full bg-white hover:bg-slate-50 text-brandBlue font-bold text-xs uppercase tracking-wider font-display border border-brandBlue shadow-xs transition-all hover:bg-blue-50">
                            Learn More
                        </button>
                    </div>
                </div>

            </div>
        </section>

        {/* ===================================================================== */}
        {/* 05. EMSTRAP SHIELD ECOSYSTEM & FINAL CTA (Dedicated Section) */}
        {/* ===================================================================== */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16" id="section-shield-ecosystem">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">

                {/* Left: EMSTRAP Shield Ecosystem (7 cols) */}
                <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-6 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                                CONNECTED SAFETY NETWORK
                            </span>
                            
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black font-display text-slate-900 tracking-tight">
                            EMSTRAP Shield Ecosystem
                        </h3>
                        <p className="text-sm text-slate-600 font-normal mt-1">
                            A connected safety ecosystem for your organization.
                        </p>
                    </div>

                    {/* Interactive Animated Hub and Spoke Diagram with Beating Center & Connecting Beams */}
                    <div className="p-3 sm:p-8 bg-gradient-to-b from-slate-50 to-slate-100/80 rounded-2xl border border-slate-200/80 relative overflow-hidden flex flex-col items-center justify-between min-h-[340px] shadow-inner select-none">
                        
                        {/* SVG Connecting Beams (Positioned Behind Nodes) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 400 320" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="beamGradRed" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#DC2626" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#EF4444" stopOpacity="0.2" />
                                </linearGradient>
                                <linearGradient id="beamGradBlue" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
                                </linearGradient>
                                <linearGradient id="beamGradEmerald" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
                                </linearGradient>
                            </defs>

                            {/* Static Connection Threads */}
                            <line x1="200" y1="46" x2="200" y2="115" stroke="#93C5FD" strokeWidth="2" strokeDasharray="3 3" />
                            <line x1="200" y1="205" x2="200" y2="274" stroke="#6EE7B7" strokeWidth="2" strokeDasharray="3 3" />
                            <line x1="90" y1="160" x2="150" y2="160" stroke="#FCA5A5" strokeWidth="2" strokeDasharray="3 3" />
                            <line x1="250" y1="160" x2="310" y2="160" stroke="#FDE68A" strokeWidth="2" strokeDasharray="3 3" />

                            {/* Animated Flowing Pulses (Connecting Effect) */}
                            <line x1="200" y1="46" x2="200" y2="115" stroke="#2563EB" strokeWidth="2.5" className="animate-beam-flow" />
                            <line x1="200" y1="205" x2="200" y2="274" stroke="#10B981" strokeWidth="2.5" className="animate-beam-flow-rev" />
                            <line x1="90" y1="160" x2="150" y2="160" stroke="#DC2626" strokeWidth="2.5" className="animate-beam-flow" />
                            <line x1="250" y1="160" x2="310" y2="160" stroke="#F59E0B" strokeWidth="2.5" className="animate-beam-flow-rev" />
                        </svg>

                        {/* Top Node: Company Dashboard */}
                        <div className="relative z-10 px-4 py-2 rounded-xl bg-white border border-blue-200 shadow-sm flex items-center gap-2 hover:border-brandBlue hover:shadow-md transition-all">
                            <i className="fa-solid fa-desktop text-brandBlue text-xs"></i>
                            <span className="text-xs text-slate-800 font-bold font-mono">Company Dashboard</span>
                        </div>

                        {/* Mid Row: Left Node + Center Beating Hub + Right Node */}
                        <div className="flex items-center justify-between w-full relative z-10 px-0 sm:px-6 gap-1.5 sm:gap-4 my-4">
                            {/* Left Node: Employees & Ambulances */}
                            <div className="p-2 sm:p-3 rounded-xl bg-white border border-red-200/90 shadow-sm text-center hover:border-emergencyRed hover:shadow-md transition-all min-w-0 w-[86px] min-[400px]:w-auto min-[400px]:min-w-[105px]">
                                <span className="font-bold text-slate-900 block text-[11px] sm:text-xs font-mono leading-tight">Employees</span>
                                <i className="fa-solid fa-arrow-down text-[9px] text-emergencyRed my-1 block"></i>
                                <span className="font-bold text-emergencyRed block text-[9px] sm:text-[10px] font-mono leading-tight">Ambulances</span>
                            </div>

                            {/* Center Beating Hub (Image 4: Logo below add text "Shield") */}
                            <div className="relative flex items-center justify-center shrink-0">
                                {/* Concentric Radar Pulse Rings */}
                                <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-red-400 pointer-events-none animate-radar-ring"></div>
                                <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-red-300 pointer-events-none animate-radar-ring-delayed"></div>

                                {/* Center Badge: EMSTRAP Logo + text "Shield" below */}
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white text-slate-900 flex flex-col items-center justify-center p-2 sm:p-2.5 shadow-2xl border-4 border-emergencyRed relative z-20 animate-heartbeat cursor-pointer">
                                    <img src="/images/logo.png" alt="EMSTRAP Logo" className="h-5 sm:h-7 w-auto object-contain" />
                                    <span className="text-[11px] sm:text-sm font-black font-display text-emergencyRed uppercase tracking-wider mt-1">Shield</span>
                                </div>
                            </div>

                            {/* Right Node: Families & Safety Mgmt */}
                            <div className="p-2 sm:p-3 rounded-xl bg-white border border-amber-200/90 shadow-sm text-center hover:border-amber-500 hover:shadow-md transition-all min-w-0 w-[86px] min-[400px]:w-auto min-[400px]:min-w-[105px]">
                                <span className="font-bold text-slate-900 block text-[11px] sm:text-xs font-mono leading-tight">Families</span>
                                <i className="fa-solid fa-arrow-down text-[9px] text-amber-500 my-1 block"></i>
                                <span className="font-bold text-amber-600 block text-[9px] sm:text-[10px] font-mono leading-tight">Safety Mgmt</span>
                            </div>
                        </div>

                        {/* Bottom Node: Hospitals */}
                        <div className="relative z-10 px-4 py-2 rounded-xl bg-white border border-emerald-200 shadow-sm flex items-center gap-2 hover:border-emerald-500 hover:shadow-md transition-all">
                            <i className="fa-solid fa-hospital text-emerald-600 text-xs"></i>
                            <span className="font-bold text-slate-800 text-xs font-mono">Hospitals</span>
                        </div>
                    </div>
                </div>

                {/* Right: Final CTA Banner (5 cols) */}
                <div className="lg:col-span-5 rounded-3xl overflow-hidden relative border border-slate-800 bg-[#0B132B] text-white shadow-xl p-8 flex flex-col justify-between">
                    {/* Evening building background image with dark overlay */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-50 bg-right bg-cover bg-no-repeat" style={{"backgroundImage":"url('/images/shield-cta-building.png')"}}></div>
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0B132B] via-[#0B132B]/90 to-transparent"></div>

                    <div className="relative z-10 space-y-4">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                            EMSTRAP SHIELD
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight leading-tight">
                            Complete Safety &amp; Emergency Protection for Your Organization.
                        </h3>
                        <p className="text-sm text-slate-300 font-normal leading-relaxed">
                            Protect your employees, prepare your workplaces and support their families with EMSTRAP Shield.
                        </p>
                    </div>

                    <div className="relative z-10 space-y-3 pt-8">
                        <a href="#corporate-plans" className="w-full py-3.5 rounded-full bg-emergencyRed hover:bg-emergencyRedDark text-white font-bold text-xs uppercase tracking-wider font-display shadow-md inline-flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95">
                            <span>Explore Plans</span>
                            <i className="fa-solid fa-chevron-right text-[10px]"></i>
                        </a>
                        <button onClick={openShieldDemoModal} className="w-full py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider font-display shadow-sm transition-all hover:scale-105 active:scale-95">
                            Request a Corporate Demo
                        </button>
                    </div>
                </div>

            </div>
        </section>

    </main>

    {/* Footer */}
    <footer className="bg-[#050505] border-t border-neutral-900 py-10 px-6 md:px-12 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
                <span className="uppercase font-mono tracking-wider text-neutral-400 block mb-1">EMSTRAP SHIELD &bull; CORPORATE EMERGENCY &amp; WORKPLACE SAFETY</span>
                <span>&copy; 2026 EMSTRAP Pvt. Ltd. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-6 text-neutral-400">
                <Link to="/about" className="hover:text-white transition-colors">About</Link>
                <Link to="/#page-who-we-serve" className="hover:text-white transition-colors">Services</Link>
                <Link to="/careers" className="hover:text-white transition-colors">Careers</Link>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
            <div className="flex items-center gap-3">
                <a href="https://www.linkedin.com/company/emstrap/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-200" title="LinkedIn">
                    <i className="fa-brands fa-linkedin-in text-sm"></i>
                </a>
                <a href="https://www.instagram.com/emstrap_official?stkn=bjN6eXU2cHc5cHJ4" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-200" title="Instagram">
                    <i className="fa-brands fa-instagram text-sm"></i>
                </a>
            </div>
        </div>
    </footer>

    {/* Corporate Demo Request Modal */}
    <div id="shieldDemoModal" className="hidden fixed inset-0 z-50 items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={(e) => { if (e.target === e.currentTarget) closeShieldDemoModal(); }}>
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-6 text-slate-900 shadow-2xl relative">
            <button onClick={closeShieldDemoModal} className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 text-xl">
                <i className="fa-solid fa-xmark"></i>
            </button>
            <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-emergencyRed">CORPORATE SAFETY</span>
                <h3 className="text-2xl font-bold font-display text-slate-900 mt-1">Request a Corporate Demo</h3>
                <p className="text-xs text-slate-500 font-normal mt-1">Protect your employees, offices, and industrial facilities.</p>
            </div>
            <form onSubmit={handleShieldDemoSubmit} className="space-y-4">
                <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Company / Enterprise Name</label>
                    <input type="text" required className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brandBlue" placeholder="e.g. Infosys / Tata Consultancy" />
                </div>
                <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Total Employee Count</label>
                    <select className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brandBlue">
                        <option>10 - 100 Employees</option>
                        <option>100 - 500 Employees</option>
                        <option>500 - 2,500 Employees</option>
                        <option>2,500+ Enterprise Employees</option>
                    </select>
                </div>
                <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Corporate Work Email</label>
                    <input type="email" required className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brandBlue" placeholder="hr@company.com" />
                </div>
                <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Contact Phone</label>
                    <input type="tel" required className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brandBlue" placeholder="+91 XXXXX XXXXX" />
                </div>
                <button type="submit" className="w-full py-3.5 rounded-full bg-emergencyRed hover:bg-emergencyRedDark text-white font-bold text-xs uppercase tracking-wider transition-all font-display shadow-lg">
                    Schedule Enterprise Consultation
                </button>
            </form>
        </div>
    </div>

    

    </div>
  );
}
