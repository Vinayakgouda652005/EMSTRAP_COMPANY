import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageSetup, submitEmstrapModalRequest } from "../utils/emstrapLifecycle";

const PAGE_CSS = ".radar-pulse {\n            animation: radarPing 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;\n        }\n        @keyframes radarPing {\n            0% { transform: scale(0.95); opacity: 0.8; }\n            70% { transform: scale(2.2); opacity: 0; }\n            100% { transform: scale(2.4); opacity: 0; }\n        }\n        .custom-scrollbar::-webkit-scrollbar {\n            width: 5px;\n        }\n        .custom-scrollbar::-webkit-scrollbar-track {\n            background: rgba(15, 23, 42, 0.6);\n        }\n        .custom-scrollbar::-webkit-scrollbar-thumb {\n            background: #334155;\n            border-radius: 4px;\n        }\n        .custom-scrollbar::-webkit-scrollbar-thumb:hover {\n            background: #475569;\n        }\n        /* Moving Touchpoints Marquee Rows (Left-to-Right & Right-to-Left) */\n        .touchpoints-row-container {\n            overflow: hidden;\n            width: 100%;\n            position: relative;\n            padding: 0.35rem 0;\n            mask-image: linear-gradient(to right, transparent, black 3%, black 97%, transparent);\n            -webkit-mask-image: linear-gradient(to right, transparent, black 3%, black 97%, transparent);\n        }\n        .touchpoints-track-ltr {\n            display: flex;\n            gap: 0.85rem;\n            width: max-content;\n            animation: touchpointsScrollLTR 22s linear infinite;\n            will-change: transform;\n        }\n        .touchpoints-track-rtl {\n            display: flex;\n            gap: 0.85rem;\n            width: max-content;\n            animation: touchpointsScrollRTL 22s linear infinite;\n            will-change: transform;\n        }\n        .touchpoints-track-ltr:hover,\n        .touchpoints-track-rtl:hover {\n            animation-play-state: paused;\n        }\n        @keyframes touchpointsScrollLTR {\n            0% { transform: translateX(-50%); }\n            100% { transform: translateX(0%); }\n        }\n        @keyframes touchpointsScrollRTL {\n            0% { transform: translateX(0%); }\n            100% { transform: translateX(-50%); }\n        }\n        @media (prefers-reduced-motion: reduce) {\n            .touchpoints-track-ltr,\n            .touchpoints-track-rtl {\n                animation: none;\n                overflow-x: auto;\n            }\n        }";

export default function CommandPage() {
  usePageSetup({
    title: "EMSTRAP Command | One Command Center for Ambulances & Hospitals",
    bodyClass: "bg-white text-slate-900 font-sans min-h-screen flex flex-col justify-between selection:bg-brandBlue selection:text-white antialiased",
    customCss: PAGE_CSS,
    enableWave: false,
    enableHeaderAmbulance: false,
  });

  const openCommandDemoModal = () => {
    const m = document.getElementById("commandDemoModal");
    if (m) {
      m.classList.remove("hidden");
      m.classList.add("flex");
    }
  };
  const closeCommandDemoModal = () => {
    const m = document.getElementById("commandDemoModal");
    if (m) {
      m.classList.add("hidden");
      m.classList.remove("flex");
    }
  };
  const handleCommandDemoSubmit = (e) =>
    submitEmstrapModalRequest({
      event: e,
      requestType: "EMSTRAP Command Demo Request",
      successMessage:
        "Thank you. The EMSTRAP Healthcare Operations Desk has received your request and will schedule a live demonstration.",
      onSuccess: closeCommandDemoModal,
    });

  useEffect(() => {
    const btn = document.getElementById("mobileMenuBtn");
    const menu = document.getElementById("mobileMenu");
    const toggleMobile = () => {
      if (menu) menu.classList.toggle("hidden");
    };
    if (btn) btn.addEventListener("click", toggleMobile);
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        closeCommandDemoModal();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      if (btn) btn.removeEventListener("click", toggleMobile);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="page-scope-commandpage min-h-screen flex flex-col justify-between">
      

    
{/* EMSTRAP COMMAND NAVBAR */}
<header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
    <div className="max-w-7xl mx-auto px-6 md:px-12 h-[80px] flex items-center gap-4">

        {/* EMSTRAP Logo */}
        <Link to="/" className="flex items-center shrink-0">
            <img
                src="/images/logo.png"
                alt="EMSTRAP Logo"
                className="h-11 w-auto object-contain"
            />
        </Link>

        {/* Divider */}
        <div className="h-9 w-px bg-slate-300"></div>

        {/* Product Heading */}
        <div>
            <h1 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 font-display">
                EMSTRAP <span className="text-blue-700">COMMAND</span>
            </h1>
            <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] text-slate-500 uppercase">
                Healthcare & Fleet Operations
            </p>
        </div>

    </div>
</header>


    <main className="flex-grow">
        {/* ===================================================================== */}
        {/* TIER 1: HERO SECTION (Matching Design Board 100%) */}
        {/* Cinematic Control Room Photograph + Left Dark Gradient Overlay */}
        {/* ===================================================================== */}
        <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center bg-slate-950 text-white overflow-hidden border-b border-slate-800">
            {/* Full Width Background Photograph */}
            <div className="absolute inset-0 z-0">
                <img src="/images/command-hero-controlroom.png" alt="EMSTRAP Medical Operations Command Center" className="w-full h-full object-cover object-center lg:object-right filter brightness-90 contrast-105" />
                {/* Dark Gradient Overlay (Solid black on left fading to transparent on right) */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#050B14] via-[#050B14]/90 sm:via-[#050B14]/80 to-transparent z-10"></div>
                {/* Subtle Radial Glow */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none z-10"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 sm:py-24 relative z-20 w-full">
                <div className="max-w-2xl text-left space-y-6">

                    {/* Main Headline */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-black font-display text-white tracking-tight leading-[1.12]">
                        The Command Center Behind Every Connected Journey
                    </h1>

                    {/* Subtitle */}
                    <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-xl">
                        Manage ambulances, bookings, patient transportation and hospital coordination from one centralized platform.
                    </p>

                    {/* Target Audience Row */}
                    <div className="text-xs sm:text-sm font-mono text-slate-300 font-medium flex flex-wrap items-center gap-2">
                        <span>For Ambulance Providers</span>
                        <span className="text-slate-500">&bull;</span>
                        <span>Hospitals</span>
                        <span className="text-slate-500">&bull;</span>
                        <span>Healthcare Networks</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                        <button onClick={openCommandDemoModal} className="px-8 py-3.5 rounded-full bg-emergencyRed hover:bg-emergencyRedDark text-white font-bold tracking-wider text-xs uppercase transition-all shadow-xl font-display hover:scale-105 active:scale-95">
                            Partner With EMSTRAP
                        </button>
                        <button onClick={openCommandDemoModal} className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold tracking-wider text-xs uppercase transition-all border border-white/25 backdrop-blur-md shadow-sm font-display hover:scale-105 active:scale-95">
                            Request a Demo
                        </button>
                    </div>

                </div>
            </div>
        </section>

        

        {/* ===================================================================== */}
        {/* TIER 3: WHY EMSTRAP COMMAND? (Left Explanatory + Right 10 Thumbnails) */}
        {/* Matching Attachment Design Board Tier 3 Exactly */}
        {/* ===================================================================== */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-slate-50/80 border-b border-slate-100">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    
                    {/* Left Column: Copy & Narrative */}
                    <div className="lg:col-span-5 space-y-6 text-left">
                        <div>
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brandBlue block mb-2">
                                CENTRALISED COORDINATION
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 tracking-tight leading-tight">
                                Why EMSTRAP Command?
                            </h2>
                        </div>

                        <p className="text-base font-bold text-slate-800 leading-snug">
                            Emergency services cannot depend on disconnected phone calls.
                        </p>

                        <p className="text-sm text-slate-600 font-normal leading-relaxed">
                            Ambulance operators and hospitals often have to manage multiple calls, availability, coordination, bookings, trip status and records. When this information is scattered, managing multiple emergencies becomes difficult.
                        </p>

                        <p className="text-sm font-semibold text-brandBlue leading-relaxed">
                            EMSTRAP Command brings these operations into one centralized platform.
                        </p>

                        <div className="pt-2">
                            <button onClick={openCommandDemoModal} className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md font-display">
                                Explore Command Live
                            </button>
                        </div>
                    </div>

                    {/* Right Column: 10 Operations Cards Strip (Using the 10 Cropped Image Assets) */}
                    <div className="lg:col-span-7">
                        <div className="mb-3 flex items-center justify-between text-left">
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                                10 COORDINATED TOUCHPOINTS
                            </span>
                            
                        </div>

                        {/* 10 Coordinated Touchpoints Moving Marquee Rows (Row 1: LTR, Row 2: RTL) */}
                        <div className="space-y-3">
                            
                            {/* Row 1: Left to Right Marquee */}
                            <div className="touchpoints-row-container">
                                <div className="touchpoints-track-ltr">
                                    {/* Card 1 */}
                                    <div className="w-[140px] sm:w-[155px] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-2.5 shadow-sm hover:shadow-md hover:border-brandBlue transition-all flex flex-col items-center text-center group cursor-pointer">
                                        <div className="w-full h-20 rounded-xl overflow-hidden mb-2 bg-slate-100">
                                            <img src="/images/command-thumb-1.png" alt="Multiple incoming calls" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <span className="text-[11px] font-semibold text-slate-800 leading-tight">Multiple incoming calls</span>
                                    </div>
                                    {/* Card 2 */}
                                    <div className="w-[140px] sm:w-[155px] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-2.5 shadow-sm hover:shadow-md hover:border-brandBlue transition-all flex flex-col items-center text-center group cursor-pointer">
                                        <div className="w-full h-20 rounded-xl overflow-hidden mb-2 bg-slate-100">
                                            <img src="/images/command-thumb-2.png" alt="Ambulance availability" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <span className="text-[11px] font-semibold text-slate-800 leading-tight">Ambulance availability</span>
                                    </div>
                                    {/* Card 3 */}
                                    
                                    {/* Card 4 */}
                                    <div className="w-[140px] sm:w-[155px] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-2.5 shadow-sm hover:shadow-md hover:border-brandBlue transition-all flex flex-col items-center text-center group cursor-pointer">
                                        <div className="w-full h-20 rounded-xl overflow-hidden mb-2 bg-slate-100">
                                            <img src="/images/command-thumb-4.png" alt="Pickup locations" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <span className="text-[11px] font-semibold text-slate-800 leading-tight">Pickup locations</span>
                                    </div>
                                    {/* Card 5 */}
                                    <div className="w-[140px] sm:w-[155px] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-2.5 shadow-sm hover:shadow-md hover:border-brandBlue transition-all flex flex-col items-center text-center group cursor-pointer">
                                        <div className="w-full h-20 rounded-xl overflow-hidden mb-2 bg-slate-100">
                                            <img src="/images/command-thumb-3.png" alt="Patient transportation" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <span className="text-[11px] font-semibold text-slate-800 leading-tight">Patient transportation</span>
                                    </div>

                                    {/* Clone for Seamless Left-to-Right Loop */}
                                    <div aria-hidden="true" className="w-[140px] sm:w-[155px] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-2.5 shadow-sm hover:shadow-md hover:border-brandBlue transition-all flex flex-col items-center text-center group cursor-pointer">
                                        <div className="w-full h-20 rounded-xl overflow-hidden mb-2 bg-slate-100">
                                            <img src="/images/command-thumb-11.png" alt="Multiple incoming calls" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <span className="text-[11px] font-semibold text-slate-800 leading-tight">Multiple incoming calls</span>
                                    </div>
                                    <div aria-hidden="true" className="w-[140px] sm:w-[155px] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-2.5 shadow-sm hover:shadow-md hover:border-brandBlue transition-all flex flex-col items-center text-center group cursor-pointer">
                                        <div className="w-full h-20 rounded-xl overflow-hidden mb-2 bg-slate-100">
                                            <img src="/images/command-thumb-2.png" alt="Ambulance availability" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <span className="text-[11px] font-semibold text-slate-800 leading-tight">Ambulance availability</span>
                                    </div>
                                    
                                    <div aria-hidden="true" className="w-[140px] sm:w-[155px] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-2.5 shadow-sm hover:shadow-md hover:border-brandBlue transition-all flex flex-col items-center text-center group cursor-pointer">
                                        <div className="w-full h-20 rounded-xl overflow-hidden mb-2 bg-slate-100">
                                            <img src="/images/command-thumb-4.png" alt="Pickup locations" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <span className="text-[11px] font-semibold text-slate-800 leading-tight">Pickup locations</span>
                                    </div>
                                    <div aria-hidden="true" className="w-[140px] sm:w-[155px] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-2.5 shadow-sm hover:shadow-md hover:border-brandBlue transition-all flex flex-col items-center text-center group cursor-pointer">
                                        <div className="w-full h-20 rounded-xl overflow-hidden mb-2 bg-slate-100">
                                            <img src="/images/command-thumb-5.png" alt="Patient transportation" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <span className="text-[11px] font-semibold text-slate-800 leading-tight">Patient transportation</span>
                                    </div>
                                </div>
                            </div>

                            {/* Row 2: Right to Left Marquee */}
                            <div className="touchpoints-row-container">
                                <div className="touchpoints-track-rtl">
                                    {/* Card 6 */}
                                    <div className="w-[140px] sm:w-[155px] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-2.5 shadow-sm hover:shadow-md hover:border-brandBlue transition-all flex flex-col items-center text-center group cursor-pointer">
                                        <div className="w-full h-20 rounded-xl overflow-hidden mb-2 bg-slate-100">
                                            <img src="/images/command-thumb-6.png" alt="Hospital destinations" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <span className="text-[11px] font-semibold text-slate-800 leading-tight">Hospital destinations</span>
                                    </div>
                                    {/* Card 7 */}
                                    <div className="w-[140px] sm:w-[155px] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-2.5 shadow-sm hover:shadow-md hover:border-brandBlue transition-all flex flex-col items-center text-center group cursor-pointer">
                                        <div className="w-full h-20 rounded-xl overflow-hidden mb-2 bg-slate-100">
                                            <img src="/images/command-thumb-7.png" alt="Booking confirmations" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <span className="text-[11px] font-semibold text-slate-800 leading-tight">Booking confirmations</span>
                                    </div>
                                    {/* Card 8 */}
                                    <div className="w-[140px] sm:w-[155px] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-2.5 shadow-sm hover:shadow-md hover:border-brandBlue transition-all flex flex-col items-center text-center group cursor-pointer">
                                        <div className="w-full h-20 rounded-xl overflow-hidden mb-2 bg-slate-100">
                                            <img src="/images/command-thumb-8.png" alt="Trip status" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <span className="text-[11px] font-semibold text-slate-800 leading-tight">Trip status</span>
                                    </div>
                                    {/* Card 9 */}
                                    <div className="w-[140px] sm:w-[155px] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-2.5 shadow-sm hover:shadow-md hover:border-brandBlue transition-all flex flex-col items-center text-center group cursor-pointer">
                                        <div className="w-full h-20 rounded-xl overflow-hidden mb-2 bg-slate-100">
                                            <img src="/images/command-thumb-9.png" alt="Hospital coordination" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <span className="text-[11px] font-semibold text-slate-800 leading-tight">Hospital coordination</span>
                                    </div>
                                    {/* Card 10 */}
                                    <div className="w-[140px] sm:w-[155px] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-2.5 shadow-sm hover:shadow-md hover:border-brandBlue transition-all flex flex-col items-center text-center group cursor-pointer">
                                        <div className="w-full h-20 rounded-xl overflow-hidden mb-2 bg-slate-100">
                                            <img src="/images/command-thumb-10.png" alt="Records and reports" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <span className="text-[11px] font-semibold text-slate-800 leading-tight">Records and reports</span>
                                    </div>

                                    {/* Clone for Seamless Right-to-Left Loop */}
                                    <div aria-hidden="true" className="w-[140px] sm:w-[155px] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-2.5 shadow-sm hover:shadow-md hover:border-brandBlue transition-all flex flex-col items-center text-center group cursor-pointer">
                                        <div className="w-full h-20 rounded-xl overflow-hidden mb-2 bg-slate-100">
                                            <img src="/images/command-thumb-6.png" alt="Hospital destinations" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <span className="text-[11px] font-semibold text-slate-800 leading-tight">Hospital destinations</span>
                                    </div>
                                    <div aria-hidden="true" className="w-[140px] sm:w-[155px] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-2.5 shadow-sm hover:shadow-md hover:border-brandBlue transition-all flex flex-col items-center text-center group cursor-pointer">
                                        <div className="w-full h-20 rounded-xl overflow-hidden mb-2 bg-slate-100">
                                            <img src="/images/command-thumb-7.png" alt="Booking confirmations" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <span className="text-[11px] font-semibold text-slate-800 leading-tight">Booking confirmations</span>
                                    </div>
                                    <div aria-hidden="true" className="w-[140px] sm:w-[155px] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-2.5 shadow-sm hover:shadow-md hover:border-brandBlue transition-all flex flex-col items-center text-center group cursor-pointer">
                                        <div className="w-full h-20 rounded-xl overflow-hidden mb-2 bg-slate-100">
                                            <img src="/images/command-thumb-8.png" alt="Trip status" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <span className="text-[11px] font-semibold text-slate-800 leading-tight">Trip status</span>
                                    </div>
                                    <div aria-hidden="true" className="w-[140px] sm:w-[155px] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-2.5 shadow-sm hover:shadow-md hover:border-brandBlue transition-all flex flex-col items-center text-center group cursor-pointer">
                                        <div className="w-full h-20 rounded-xl overflow-hidden mb-2 bg-slate-100">
                                            <img src="/images/command-thumb-9.png" alt="Hospital coordination" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <span className="text-[11px] font-semibold text-slate-800 leading-tight">Hospital coordination</span>
                                    </div>
                                    <div aria-hidden="true" className="w-[140px] sm:w-[155px] shrink-0 bg-white rounded-2xl border border-slate-200/90 p-2.5 shadow-sm hover:shadow-md hover:border-brandBlue transition-all flex flex-col items-center text-center group cursor-pointer">
                                        <div className="w-full h-20 rounded-xl overflow-hidden mb-2 bg-slate-100">
                                            <img src="/images/command-thumb-10.png" alt="Records and reports" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <span className="text-[11px] font-semibold text-slate-800 leading-tight">Records and reports</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* TIER 4: FOR PROVIDERS & FOR HOSPITALS (Two Split Cards Side-by-Side) */}
        {/* Matching Attachment Design Board Tier 4 Exactly */}
        {/* ===================================================================== */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto space-y-12">
                
                {/* Section Header */}
                <div className="max-w-3xl text-left space-y-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 block">
                        PARTNER WORKFLOWS
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 tracking-tight">
                        Built for the Pillars of Emergency Care
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                        Whether you operate an ambulance fleet or manage trauma admissions at a multi-specialty hospital, EMSTRAP Command delivers the operational tools to succeed.
                    </p>
                </div>

                {/* 2 Side-by-Side Split Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* CARD 1: FOR AMBULANCE PROVIDERS */}
                    <div className="rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all overflow-hidden bg-white grid grid-cols-1 sm:grid-cols-12 group">
                        {/* Left Photo Column (command-provider-ambulance.jpg) */}
                        <div className="sm:col-span-5 relative h-56 sm:h-auto min-h-[240px] bg-slate-950 overflow-hidden">
                            <img src="/images/command-provider-ambulance.png" alt="Ambulance Fleet in Motion" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:hidden"></div>
                            <span className="absolute bottom-3 left-3 sm:hidden px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-white font-semibold">
                                FLEET DISPATCH
                            </span>
                        </div>
                        
                        {/* Right Content Column */}
                        <div className="sm:col-span-7 p-6 sm:p-8 space-y-4 text-left flex flex-col justify-between">
                            <div className="space-y-3">
                                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brandBlue block">
                                    FOR AMBULANCE PROVIDERS
                                </span>
                                <h3 className="text-xl sm:text-2xl font-black font-display text-slate-900 tracking-tight leading-snug">
                                    Turn ambulance operations into a connected workflow.
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                                    Receive bookings, manage ambulances, coordinate trips, monitor availability and track operations from a single platform.
                                </p>
                                
                                <div className="pt-1">
                                    <button onClick={openCommandDemoModal} className="px-5 py-2.5 rounded-full bg-brandBlue hover:bg-brandBlueDark text-white font-bold text-xs uppercase tracking-wider transition-all font-display shadow-sm hover:shadow-md">
                                        Learn More
                                    </button>
                                </div>
                            </div>

                            {/* 5-Item Checklist with Blue Dashes */}
                            <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-700 font-medium">
                                <div className="flex items-center gap-3">
                                    <span className="w-4 h-0.5 bg-brandBlue shrink-0"></span>
                                    <span>Receive ambulance bookings</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-4 h-0.5 bg-brandBlue shrink-0"></span>
                                    <span>Manage ambulance availability</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-4 h-0.5 bg-brandBlue shrink-0"></span>
                                    <span>Track trips in real time</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-4 h-0.5 bg-brandBlue shrink-0"></span>
                                    <span>Manage drivers and crew</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-4 h-0.5 bg-brandBlue shrink-0"></span>
                                    <span>Maintain trip records and reports</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CARD 2: FOR HOSPITALS */}
                    <div className="rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all overflow-hidden bg-white grid grid-cols-1 sm:grid-cols-12 group">
                        {/* Left Photo Column (command-hospital-emergency.jpg) */}
                        <div className="sm:col-span-5 relative h-56 sm:h-auto min-h-[240px] bg-slate-950 overflow-hidden">
                            <img src="/images/command-hospital-emergency.png" alt="Hospital Emergency Admissions" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:hidden"></div>
                            <span className="absolute bottom-3 left-3 sm:hidden px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-white font-semibold">
                                EMERGENCY DEPT
                            </span>
                        </div>
                        
                        {/* Right Content Column */}
                        <div className="sm:col-span-7 p-6 sm:p-8 space-y-4 text-left flex flex-col justify-between">
                            <div className="space-y-3">
                                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emergencyRed block">
                                    FOR HOSPITALS
                                </span>
                                <h3 className="text-xl sm:text-2xl font-black font-display text-slate-900 tracking-tight leading-snug">
                                    Prepare for the patient before arrival.
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                                    Receive incoming patient information, manage ambulance requests and coordinate patient transfers from one centralized platform.
                                </p>
                                
                                <div className="pt-1">
                                    <button onClick={openCommandDemoModal} className="px-5 py-2.5 rounded-full bg-emergencyRed hover:bg-emergencyRedDark text-white font-bold text-xs uppercase tracking-wider transition-all font-display shadow-sm hover:shadow-md">
                                        Learn More
                                    </button>
                                </div>
                            </div>

                            {/* 5-Item Checklist with Red Dashes */}
                            <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-700 font-medium">
                                <div className="flex items-center gap-3">
                                    <span className="w-4 h-0.5 bg-emergencyRed shrink-0"></span>
                                    <span>View incoming ambulances</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-4 h-0.5 bg-emergencyRed shrink-0"></span>
                                    <span>Manage patient transport requests</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-4 h-0.5 bg-emergencyRed shrink-0"></span>
                                    <span>Coordinate hospital-to-hospital transfers</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-4 h-0.5 bg-emergencyRed shrink-0"></span>
                                    <span>Track expected arrivals</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-4 h-0.5 bg-emergencyRed shrink-0"></span>
                                    <span>Maintain records and reports</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* 05. DETAILED OPERATIONAL CAPABILITIES (Grid of 3 Architectural Features) */}
        {/* ===================================================================== */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-slate-50 border-b border-slate-100">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="max-w-3xl text-left space-y-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-brandBlue block">CENTRALIZED CONTROL</span>
                    <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 tracking-tight">
                        Unified Operating Architecture
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                        Engineered for zero latency between dispatch call centers, ambulance fleets, and hospital emergency trauma units.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    {/* Feature 1 */}
                    <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-brandBlue flex items-center justify-center text-xl">
                            <i className="fa-solid fa-satellite-dish"></i>
                        </div>
                        <h3 className="text-lg font-bold font-display text-slate-900">Real-Time Fleet Telemetry</h3>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                            Monitor GPS coordinates, vehicle speed, oxygen equipment readiness, driver duty cycles, and real-time transit status in a single pane of glass.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center text-xl">
                            <i className="fa-solid fa-bed-pulse"></i>
                        </div>
                        <h3 className="text-lg font-bold font-display text-slate-900">Hospital Bed &amp; ER Sync</h3>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                            Transmits vital patient triage data to receiving emergency rooms in advance, ensuring critical trauma bays and surgical teams are prepped prior to arrival.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center text-xl">
                            <i className="fa-solid fa-file-shield"></i>
                        </div>
                        <h3 className="text-lg font-bold font-display text-slate-900">Audit-Ready Incident Records</h3>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                            Automatically compiles tamper-proof trip records, timestamps, voice recordings, and handover signatures for clinical audits and regulatory compliance.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* 06. FINAL CTA BANNER (Cinematic Dark Control Center Theme) */}
        {/* ===================================================================== */}
        <section className="py-24 md:py-32 px-6 md:px-12 relative overflow-hidden text-white bg-slate-950">
            {/* Full Command Center Background Image */}
            <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none" style={{"backgroundImage":"url('/images/tmc-control-room.jpg')"}}></div>
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#050B14]/85 via-[#050B14]/75 to-[#050B14]/90 backdrop-blur-[0.5px]"></div>
            
            <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400 block">JOIN THE HEALTHCARE NETWORK</span>
                <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
                    The Command Center Behind Every Connected Journey
                </h2>
                
                <div className="pt-4 flex flex-wrap justify-center gap-4">
                    <button onClick={openCommandDemoModal} className="px-8 py-3.5 rounded-full bg-emergencyRed hover:bg-emergencyRedDark text-white font-bold tracking-wider text-xs uppercase transition-all shadow-xl font-display hover:scale-105 active:scale-95">
                        Partner With EMSTRAP
                    </button>
                    <button onClick={openCommandDemoModal} className="px-8 py-3.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold tracking-wider text-xs uppercase transition-all border border-slate-700 font-display hover:scale-105 active:scale-95">
                        Request a Demo
                    </button>
                </div>
            </div>
        </section>
    </main>

   
{/* ===================================================================== */}
{/* EMSTRAP COMMAND FOOTER */}
{/* ===================================================================== */}

<footer className="bg-[#050505] border-t border-neutral-900 py-10 px-6 md:px-12 text-xs text-neutral-500">

    <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            {/* Company Information */}
            <div className="text-center md:text-left">
                <span className="uppercase font-mono tracking-wider text-neutral-300 block mb-2">
                    EMSTRAP COMMAND • HEALTHCARE & FLEET OPERATIONS
                </span>

                <span>
                    © {new Date().getFullYear()} EMSTRAP Pvt. Ltd. All rights reserved.
                </span>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 text-neutral-400">

                <Link to="/" className="hover:text-white transition-colors">
                    Home
                </Link>

                <Link to="/about" className="hover:text-white transition-colors">
                    About
                </Link>

                <Link to="/services" className="hover:text-white transition-colors">
                    Services
                </Link>

                <Link to="/careers" className="hover:text-white transition-colors">
                    Careers
                </Link>

                <Link to="/contact" className="hover:text-white transition-colors">
                    Contact
                </Link>

            </div>

            {/* Social Media */}
            <div className="flex items-center gap-3">

                <a
                    href="https://www.linkedin.com/company/emstrap/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="EMSTRAP LinkedIn"
                    className="w-10 h-10 rounded-lg bg-neutral-900 hover:bg-blue-700 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-200"
                >
                    <i className="fa-brands fa-linkedin-in text-sm"></i>
                </a>

                <a
                    href="https://www.instagram.com/emstrap_official?stkn=bjN6eXU2cHc5cHJ4"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="EMSTRAP Instagram"
                    className="w-10 h-10 rounded-lg bg-neutral-900 hover:bg-pink-700 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-200"
                >
                    <i className="fa-brands fa-instagram text-sm"></i>
                </a>

            </div>

        </div>

        {/* Bottom Divider */}
        <div className="border-t border-neutral-900 mt-8 pt-5 flex flex-col sm:flex-row justify-between items-center gap-3">

            <span className="text-neutral-600">
                Powered by EMSTRAP
            </span>

            <span className="text-neutral-600">
                Building a connected emergency response ecosystem.
            </span>

        </div>

    </div>
</footer>

    {/* ===================================================================== */}
    {/* B2B DEMO REQUEST MODAL */}
    {/* ===================================================================== */}
    <div id="commandDemoModal" className="hidden fixed inset-0 z-50 items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={(e) => { if (e.target === e.currentTarget) closeCommandDemoModal(); }}>
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-6 text-slate-900 shadow-2xl relative">
            <button onClick={closeCommandDemoModal} className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 text-xl">
                <i className="fa-solid fa-xmark"></i>
            </button>
            <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">B2B HEALTHCARE ONBOARDING</span>
                <h3 className="text-2xl font-bold font-display text-slate-900 mt-1">Deploy EMSTRAP Command</h3>
                <p className="text-xs text-slate-500 font-normal mt-1">For Ambulance Operators, Hospitals, and Healthcare Networks.</p>
            </div>
            <form onSubmit={handleCommandDemoSubmit} className="space-y-4">
                <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Organization Name</label>
                    <input type="text" required className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brandBlue" placeholder="e.g. Apollo Hospital / LifeLine Ambulance" />
                </div>
                <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Organization Type</label>
                    <select className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brandBlue">
                        <option>Hospital / Emergency Department</option>
                        <option>Ambulance Service Provider (Fleet)</option>
                        <option>Healthcare Network (Multi-Facility)</option>
                        <option>Government Emergency Agency</option>
                    </select>
                </div>
                <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Official Work Email</label>
                    <input type="email" required className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brandBlue" placeholder="operations@organization.com" />
                </div>
                <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Contact Phone</label>
                    <input type="tel" required className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brandBlue" placeholder="+91 XXXXX XXXXX" />
                </div>
                <button type="submit" className="w-full py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all font-display shadow-lg">
                    Schedule Command Center Demo
                </button>
            </form>
        </div>
    </div>

    {/* Scripts */}
    

    </div>
  );
}
