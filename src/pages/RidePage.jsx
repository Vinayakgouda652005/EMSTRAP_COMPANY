import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageSetup, submitEmstrapModalRequest } from "../utils/emstrapLifecycle";

const PAGE_CSS = "/* Stepper connector lines */\n        .step-line-h {\n            position: absolute;\n            top: 24px;\n            left: 50%;\n            width: 100%;\n            height: 2px;\n            border-top: 2px dashed #93C5FD;\n            z-index: 0;\n        }\n        .step-arrow-h {\n            position: absolute;\n            top: 17px;\n            right: -6px;\n            color: #2563EB;\n            font-size: 11px;\n            z-index: 1;\n        }\n        /* Pulse ring */\n        @keyframes pulse-ring {\n            0% { transform: scale(0.95); opacity: 0.8; }\n            50% { transform: scale(1.25); opacity: 0.2; }\n            100% { transform: scale(0.95); opacity: 0.8; }\n        }\n        .pulse-effect {\n            animation: pulse-ring 2s infinite ease-in-out;\n        }\n        /* Moving Belt Animation for Audience Cards */\n        .ride-belt-container {\n            overflow: hidden;\n            position: relative;\n            width: 100%;\n            padding: 0.75rem 0;\n            mask-image: linear-gradient(to right, transparent, black 3%, black 97%, transparent);\n            -webkit-mask-image: linear-gradient(to right, transparent, black 3%, black 97%, transparent);\n        }\n        .ride-belt-track {\n            display: flex;\n            gap: 1.25rem;\n            width: max-content;\n            animation: rideBeltScroll 28s linear infinite;\n            will-change: transform;\n        }\n        .ride-belt-track:hover {\n            animation-play-state: paused;\n        }\n        @keyframes rideBeltScroll {\n            0% { transform: translateX(0); }\n            100% { transform: translateX(-50%); }\n        }\n        @media (prefers-reduced-motion: reduce) {\n            .ride-belt-track {\n                animation: none;\n                overflow-x: auto;\n            }\n        }\n        /* Continuous Connected Thread for 9-Step Process */\n        .stepper-thread-line {\n            background: linear-gradient(90deg, #EF4444 0%, #3B82F6 40%, #2563EB 75%, #10B981 100%);\n            box-shadow: 0 0 10px rgba(37, 99, 235, 0.35);\n        }\n        @keyframes threadGlowPulse {\n            0% { opacity: 0.6; }\n            50% { opacity: 1; filter: drop-shadow(0 0 6px rgba(37, 99, 235, 0.7)); }\n            100% { opacity: 0.6; }\n        }\n        .animate-thread-glow {\n            animation: threadGlowPulse 2s ease-in-out infinite;\n        }";

export default function RidePage() {
  usePageSetup({
    title: "EMSTRAP Ride | Reliable Ambulance Transportation When You Need It",
    bodyClass: "bg-[#F8FAFC] text-slate-900 font-sans min-h-screen flex flex-col justify-between selection:bg-brandBlue selection:text-white antialiased",
    themeClass: "theme-solutions",
    customCss: PAGE_CSS,
    enableWave: false,
    enableHeaderAmbulance: false,
  });

  const openBookingModal = () => {
    const m = document.getElementById("bookingModal");
    if (m) {
      m.classList.remove("hidden");
      m.classList.add("flex");
    }
  };
  const closeBookingModal = () => {
    const m = document.getElementById("bookingModal");
    if (m) {
      m.classList.add("hidden");
      m.classList.remove("flex");
    }
  };
  const handleBookingSubmit = (e) =>
    submitEmstrapModalRequest({
      event: e,
      requestType: "EMSTRAP Ride Ambulance Booking Request",
      successMessage: "Your ambulance request has been submitted. The nearest available unit is being matched.",
      onSuccess: closeBookingModal,
    });
  const openProviderModal = () => {
    const m = document.getElementById("providerModal");
    if (m) {
      m.classList.remove("hidden");
      m.classList.add("flex");
    }
  };
  const closeProviderModal = () => {
    const m = document.getElementById("providerModal");
    if (m) {
      m.classList.add("hidden");
      m.classList.remove("flex");
    }
  };
  const handleProviderSubmit = (e) =>
    submitEmstrapModalRequest({
      event: e,
      requestType: "EMSTRAP Ride Fleet Partnership Request",
      successMessage:
        "Thank you for partnering with EMSTRAP Ride. Our fleet operations team will contact you shortly.",
      onSuccess: closeProviderModal,
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
        closeBookingModal(); closeProviderModal();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      if (btn) btn.removeEventListener("click", toggleMobile);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="page-scope-ridepage theme-solutions min-h-screen flex flex-col justify-between">
      

    {/* Global Persistent Navigation Header */}
    
{/* RIDE NAVBAR */}
<nav
  id="rideNavbar"
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
            EMSTRAP RIDE
          </span>
          
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden xl:flex items-center gap-6">

        <a href="#section-01-hero" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          Home
        </a>

        <a href="#section-03-problem" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
          Problem
        </a>

        <a href="#section-04-overview" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
          Product Overview
        </a>

        <a href="#section-05-audiences" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
          Who Can Use
        </a>

        <a href="#section-06-how-it-works" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
          Process
        </a>

        <Link to="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
          Main Website
        </Link>

    
      </div>

      {/* Mobile / Tablet Menu Button */}
      <button
        id="rideMobileMenuBtn"
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
      id="rideMobileMenu"
      className="hidden xl:hidden pb-5 pt-3 border-t border-slate-100"
    >
      <div className="flex flex-col gap-1">

        <a href="#section-01-hero" className="text-sm font-semibold text-blue-600 py-3">
          Home
        </a>

        <a href="#section-03-problem" className="text-sm font-medium text-slate-700 py-3 hover:text-blue-600">
          Problem
        </a>

        <a href="#section-04-overview" className="text-sm font-medium text-slate-700 py-3 hover:text-blue-600">
          Product Overview
        </a>

        <a href="#section-05-audiences" className="text-sm font-medium text-slate-700 py-3 hover:text-blue-600">
          Who Can Use
        </a>

        <a href="#section-06-how-it-works" className="text-sm font-medium text-slate-700 py-3 hover:text-blue-600">
          Process
        </a>

        <Link to="/" className="text-sm font-medium text-slate-700 py-3 hover:text-blue-600">
          Main Website
        </Link>



      </div>
    </div>
  </div>
</nav>


    <main className="flex-grow space-y-20 md:space-y-24 pb-20">

        {/* ===================================================================== */}
        {/* 01. HERO SECTION */}
        {/* ===================================================================== */}
        <section className="pt-12 md:pt-16 px-6 md:px-12 bg-white relative overflow-hidden" id="section-01-hero">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                
                {/* Left Hero Content */}
                <div className="lg:col-span-6 space-y-6 text-left">
                    <div>
                        <span className="text-xs font-mono font-bold tracking-wider text-brandBlue uppercase block mb-2">
                            EMSTRAP RIDE
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-slate-900 tracking-tight leading-[1.1]">
                            Your Patient<br />Needs a <span className="text-emergencyRed">Ride.</span><br />We'll Help You Find One.
                        </h1>
                    </div>

                    <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
                        Book an ambulance for patient transportation, hospital transfers, medical appointments and other healthcare journeys through EMSTRAP Ride.
                    </p>

                    <div className="text-xs font-medium text-slate-500 pt-1">
                        For Patients &bull; Families &bull; Hospitals &bull; Ambulance Providers
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                        <button onClick={openBookingModal} className="px-8 py-3.5 rounded-full bg-emergencyRed hover:bg-emergencyRedDark text-white font-bold tracking-wider text-xs uppercase transition-all shadow-lg hover:shadow-xl font-display hover:scale-105 active:scale-95 inline-flex items-center gap-2">
                            <span>Book an Ambulance</span>
                            <i className="fa-solid fa-arrow-right text-[11px]"></i>
                        </button>
                        <button onClick={openProviderModal} className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-brandBlue font-bold tracking-wider text-xs uppercase transition-all border border-brandBlue shadow-sm font-display hover:scale-105 active:scale-95">
                            Partner as an Ambulance Provider
                        </button>
                    </div>
                </div>

                {/* Right Hero Visual: Ambulance with Live Route & Tracking Card */}
                <div className="lg:col-span-6 relative flex items-center justify-center">
                    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 bg-slate-100 group">
                        <img src="/ambulance.jpg" alt="EMSTRAP Ride Ambulance" decoding="async" className="w-full h-80 sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105" />
                            </div>
                        </div>
                    </div></section>
                

            
        

        {/* ===================================================================== */}
        {/* 02. SHORT SERVICE CARD */}
        {/* ===================================================================== */}
        <section className="max-w-4xl mx-auto px-6 md:px-8 -mt-6 md:-mt-10 relative z-20" id="section-02-service-card">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xl space-y-6 text-left">
                <div className="flex items-center gap-3">
                    <img src="/images/logo.png" alt="Logo" className="h-8 w-auto" />
                    <span className="text-sm font-black font-display tracking-widest text-slate-900 uppercase">EMSTRAP</span>
                </div>
                
                <div className="space-y-2">
                    <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 tracking-tight leading-tight">
                        Move Patients.<br />With Care.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl">
                        Book an ambulance for patient transportation and connect with available ambulance services for journeys between home, hospitals and healthcare facilities.
                    </p>
                </div>

                {/* 4-Step Pipeline Flow matching Section 02 */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 max-w-xl">
                    {/* Book */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-red-100 text-emergencyRed flex items-center justify-center text-xs shrink-0">
                            <i className="fa-solid fa-location-dot"></i>
                        </div>
                        <span className="text-xs font-bold text-slate-900 font-display">Book</span>
                    </div>

                    <i className="fa-solid fa-arrow-right text-brandBlue text-xs"></i>

                    {/* Match */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-brandBlue flex items-center justify-center text-xs shrink-0">
                            <i className="fa-solid fa-truck-medical"></i>
                        </div>
                        <span className="text-xs font-bold text-slate-900 font-display">Match</span>
                    </div>

                    <i className="fa-solid fa-arrow-right text-brandBlue text-xs"></i>

                    {/* Pickup */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-brandBlue flex items-center justify-center text-xs shrink-0">
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <span className="text-xs font-bold text-slate-900 font-display">Pickup</span>
                    </div>

                    <i className="fa-solid fa-arrow-right text-brandBlue text-xs"></i>

                    {/* Transport */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-brandBlue text-white flex items-center justify-center text-xs shrink-0">
                            <i className="fa-solid fa-check"></i>
                        </div>
                        <span className="text-xs font-bold text-slate-900 font-display">Transport</span>
                    </div>
                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* 03. THE PROBLEM */}
        {/* ===================================================================== */}
        <section className="max-w-7xl mx-auto px-6 md:px-12" id="section-03-problem">
            <div className="rounded-3xl overflow-hidden relative border border-slate-800 bg-[#0A0F1D] text-white shadow-2xl p-8 sm:p-12 lg:p-16">
                {/* Emergency man background on the right side */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-40 lg:opacity-60 mix-blend-luminosity lg:mix-blend-normal bg-right bg-no-repeat bg-cover" style={{"backgroundImage":"url('/images/ride-emergency-man.png')"}}></div>
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0A0F1D] via-[#0A0F1D]/90 to-transparent lg:w-3/4"></div>

                {/* Problem Content on the Left */}
                <div className="relative z-10 max-w-2xl space-y-6 text-left">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 block">
                        The Problem
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight leading-tight">
                        Finding an ambulance shouldn't become another emergency.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                        When a patient needs transportation, families often have to:
                    </p>

                    <div className="space-y-3 font-medium text-xs sm:text-sm text-slate-200">
                        <div className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-md bg-emergencyRed text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">&times;</span>
                            <span>Search for nearby ambulances</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-md bg-emergencyRed text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">&times;</span>
                            <span>Make multiple phone calls</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-md bg-emergencyRed text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">&times;</span>
                            <span>Check availability</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-md bg-emergencyRed text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">&times;</span>
                            <span>Explain the patient's requirements repeatedly</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-md bg-emergencyRed text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">&times;</span>
                            <span>Wait for confirmation</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-md bg-emergencyRed text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">&times;</span>
                            <span>Coordinate pickup and destination manually</span>
                        </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-400 font-normal pt-2">
                        During a stressful situation, this process can be difficult.
                    </p>
                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* 04. WHAT IS EMSTRAP RIDE? */}
        {/* ===================================================================== */}
        <section className="max-w-7xl mx-auto px-6 md:px-12" id="section-04-overview">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Overview Content */}
                <div className="lg:col-span-6 space-y-6 text-left">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-brandBlue block">
                        Product Overview
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 tracking-tight leading-tight">
                        A digital ambulance booking and patient transportation platform.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                        EMSTRAP Ride allows the general public to book an ambulance for patient transportation through a simple digital process.
                    </p>

                    <div className="space-y-4 pt-2">
                        <span className="text-xs font-bold font-display text-slate-900 uppercase tracking-wider block">A user can provide:</span>
                        <div className="space-y-2.5 text-sm text-slate-800 font-medium">
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-check-double text-brandBlue text-xs"></i>
                                <span>Pickup location</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-check-double text-brandBlue text-xs"></i>
                                <span>Destination</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-check-double text-brandBlue text-xs"></i>
                                <span>Patient transportation requirements</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-check-double text-brandBlue text-xs"></i>
                                <span>Preferred ambulance type</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-check-double text-brandBlue text-xs"></i>
                                <span>Contact information</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-check-double text-brandBlue text-xs"></i>
                                <span>Additional trip details</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Exact Mobile Booking Mockup from Design */}
                <div className="lg:col-span-6 flex justify-center">
                    <div className="w-full max-w-[340px] rounded-[42px] bg-slate-950 p-3.5 shadow-2xl border-4 border-slate-800 text-left">
                        <div className="bg-white rounded-[32px] p-5 space-y-4 text-slate-900">
                            {/* iPhone Status Bar */}
                            <div className="flex items-center justify-between text-[11px] font-bold text-slate-900 px-1 pt-1">
                                <span>9:41</span>
                                <div className="flex items-center gap-1.5 text-xs">
                                    <i className="fa-solid fa-signal"></i>
                                    <i className="fa-solid fa-wifi"></i>
                                    <i className="fa-solid fa-battery-full"></i>
                                </div>
                            </div>

                            {/* Screen Header */}
                            <div className="flex items-center gap-2 pt-1 pb-2">
                                <i className="fa-solid fa-chevron-left text-xs text-emergencyRed"></i>
                                <span className="text-sm font-bold font-display text-slate-900">Book an Ambulance</span>
                            </div>

                            {/* Pickup Location Input */}
                            <div>
                                <label className="text-[10px] font-medium text-slate-500 block mb-1">Pickup Location</label>
                                <div className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800">
                                    Home - Koramangala, Bengaluru
                                </div>
                            </div>

                            {/* Destination Input */}
                            <div>
                                <label className="text-[10px] font-medium text-slate-500 block mb-1">Destination</label>
                                <div className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800">
                                    Manipal Hospital, Old Airport Road
                                </div>
                            </div>

                            {/* Ambulance Type Selector */}
                            <div>
                                <label className="text-[10px] font-medium text-slate-500 block mb-1.5">Ambulance Type</label>
                                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium flex flex-col items-center gap-1">
                                        <i className="fa-solid fa-truck-medical text-slate-400 text-sm"></i>
                                        <span className="text-[10px]">Normal</span>
                                    </div>
                                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-medium flex flex-col items-center gap-1">
                                        <i className="fa-solid fa-lungs text-slate-400 text-sm"></i>
                                        <span className="text-[10px]">Oxygen</span>
                                    </div>
                                    <div className="p-2.5 rounded-xl bg-red-50 border border-emergencyRed text-emergencyRed font-bold flex flex-col items-center gap-1">
                                        <i className="fa-solid fa-heart-pulse text-sm"></i>
                                        <span className="text-[10px]">ICU</span>
                                    </div>
                                </div>
                            </div>

                            {/* Patient Details Field */}
                            <div>
                                <label className="text-[10px] font-medium text-slate-500 block mb-1">Patient Details</label>
                                <div className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
                                    <span>Elderly patient</span>
                                    <i className="fa-solid fa-chevron-down text-[10px] text-slate-400"></i>
                                </div>
                            </div>

                            {/* Red CTA Button */}
                            <button onClick={openBookingModal} className="w-full py-3 rounded-full bg-emergencyRed hover:bg-emergencyRedDark text-white font-bold text-xs uppercase tracking-wider font-display shadow-md transition-all">
                                Find Available Ambulance
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        {/* ===================================================================== */}
        {/* 05. WHO CAN USE EMSTRAP RIDE? (Moving Animated Format) */}
        {/* ===================================================================== */}
        <section className="max-w-7xl mx-auto px-6 md:px-12" id="section-05-audiences">
            <div className="space-y-6 text-left">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-brandBlue block mb-2">WHO CAN USE</span>
                        <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 tracking-tight">
                            EMSTRAP Ride.
                        </h2>
                        <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-2 max-w-2xl">
                            Anyone who needs ambulance transportation for a patient can use EMSTRAP Ride.
                        </p>
                    </div>
                    <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-brandBlue text-xs font-mono font-medium shrink-0 self-start md:self-auto">
                        <span className="w-2 h-2 rounded-full bg-brandBlue animate-pulse"></span>
                        <span>LIVE ON-DEMAND FLEET</span>
                    </div>
                </div>

                {/* Continuous Moving Cards Marquee Viewport with animation */}
                <div className="ride-belt-container w-full py-2">
                    <div className="ride-belt-track" id="rideAudiencesBeltTrack">
                        {/* Card 1: Family Members */}
                        <div className="w-[275px] sm:w-[320px] md:w-[350px] shrink-0 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-brandBlue/40 transition-all duration-300 flex flex-col justify-between group text-left">
                            <div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100 shadow-sm">
                                        <img src="/images/ride-audience-family.png" alt="Family Members" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold font-display text-slate-900 group-hover:text-brandBlue transition-colors">Family Members</h3>
                                        <p className="text-xs text-slate-600 leading-relaxed font-normal mt-1">Book an ambulance for a loved one.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-end text-xs">
                                <span className="text-[10px] font-mono text-slate-400">Doorstep Pickup</span>
                            </div>
                        </div>

                        {/* Card 2: Patients */}
                        <div className="w-[275px] sm:w-[320px] md:w-[350px] shrink-0 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-brandBlue/40 transition-all duration-300 flex flex-col justify-between group text-left">
                            <div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100 shadow-sm">
                                        <img src="/images/ride-audience-caregiver.png" alt="Patients" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold font-display text-slate-900 group-hover:text-brandBlue transition-colors">Patients</h3>
                                        <p className="text-xs text-slate-600 leading-relaxed font-normal mt-1">Arrange transportation between medical facilities.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-end text-xs">
                                <span className="text-[10px] font-mono text-slate-400">Facility Transfer</span>
                            </div>
                        </div>

                        {/* Card 3: Caregivers */}
                        <div className="w-[275px] sm:w-[320px] md:w-[350px] shrink-0 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-brandBlue/40 transition-all duration-300 flex flex-col justify-between group text-left">
                            <div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100 shadow-sm">
                                        <img src="/images/ride-audience-caregiver.png" alt="Caregivers" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold font-display text-slate-900 group-hover:text-brandBlue transition-colors">Caregivers</h3>
                                        <p className="text-xs text-slate-600 leading-relaxed font-normal mt-1">Organize patient transportation easily.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-end text-xs">
                                <span className="text-[10px] font-mono text-slate-400">Assisted Transit</span>
                            </div>
                        </div>

                        {/* Card 4: Hospitals */}
                        <div className="w-[275px] sm:w-[320px] md:w-[350px] shrink-0 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-brandBlue/40 transition-all duration-300 flex flex-col justify-between group text-left">
                            <div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100 shadow-sm">
                                        <img src="/images/ride-audience-hospital.png" alt="Hospitals" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold font-display text-slate-900 group-hover:text-brandBlue transition-colors">Hospitals</h3>
                                        <p className="text-xs text-slate-600 leading-relaxed font-normal mt-1">Arrange transportation for patients.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-end text-xs">
                                <span className="text-[10px] font-mono text-slate-400">Inter-Hospital</span>
                            </div>
                        </div>

                        {/* Card 5: Healthcare Facilities */}
                        <div className="w-[275px] sm:w-[320px] md:w-[350px] shrink-0 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-brandBlue/40 transition-all duration-300 flex flex-col justify-between group text-left">
                            <div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100 shadow-sm">
                                        <img src="/images/ride-audience-facility.png" alt="Healthcare Facilities" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold font-display text-slate-900 group-hover:text-brandBlue transition-colors">Healthcare Facilities</h3>
                                        <p className="text-xs text-slate-600 leading-relaxed font-normal mt-1">Coordinate patient transfers and transportation requirements.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-end text-xs">
                                <span className="text-[10px] font-mono text-slate-400">Fleet Dispatch</span>
                            </div>
                        </div>

                        {/* Cloned set for continuous seamless loop */}
                        <div aria-hidden="true" className="w-[275px] sm:w-[320px] md:w-[350px] shrink-0 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-brandBlue/40 transition-all duration-300 flex flex-col justify-between group text-left">
                            <div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100 shadow-sm">
                                        <img src="/images/ride-audience-family.png" alt="Family Members" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold font-display text-slate-900 group-hover:text-brandBlue transition-colors">Family Members</h3>
                                        <p className="text-xs text-slate-600 leading-relaxed font-normal mt-1">Book an ambulance for a loved one.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-end text-xs">
                                <span className="text-[10px] font-mono text-slate-400">Doorstep Pickup</span>
                            </div>
                        </div>

                        <div aria-hidden="true" className="w-[275px] sm:w-[320px] md:w-[350px] shrink-0 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-brandBlue/40 transition-all duration-300 flex flex-col justify-between group text-left">
                            <div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100 shadow-sm">
                                        <img src="/images/ride-audience-patient.png" alt="Patients" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold font-display text-slate-900 group-hover:text-brandBlue transition-colors">Patients</h3>
                                        <p className="text-xs text-slate-600 leading-relaxed font-normal mt-1">Arrange transportation between medical facilities.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-end text-xs">
                                <span className="text-[10px] font-mono text-slate-400">Facility Transfer</span>
                            </div>
                        </div>

                        <div aria-hidden="true" className="w-[275px] sm:w-[320px] md:w-[350px] shrink-0 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-brandBlue/40 transition-all duration-300 flex flex-col justify-between group text-left">
                            <div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100 shadow-sm">
                                        <img src="/images/ride-audience-caregiver.png" alt="Caregivers" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold font-display text-slate-900 group-hover:text-brandBlue transition-colors">Caregivers</h3>
                                        <p className="text-xs text-slate-600 leading-relaxed font-normal mt-1">Organize patient transportation easily.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-end text-xs">
                                <span className="text-[10px] font-mono text-slate-400">Assisted Transit</span>
                            </div>
                        </div>

                        <div aria-hidden="true" className="w-[275px] sm:w-[320px] md:w-[350px] shrink-0 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-brandBlue/40 transition-all duration-300 flex flex-col justify-between group text-left">
                            <div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100 shadow-sm">
                                        <img src="/images/ride-audience-hospital.png" alt="Hospitals" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold font-display text-slate-900 group-hover:text-brandBlue transition-colors">Hospitals</h3>
                                        <p className="text-xs text-slate-600 leading-relaxed font-normal mt-1">Arrange transportation for patients.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-end text-xs">
                                <span className="text-[10px] font-mono text-slate-400">Inter-Hospital</span>
                            </div>
                        </div>

                        <div aria-hidden="true" className="w-[275px] sm:w-[320px] md:w-[350px] shrink-0 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-brandBlue/40 transition-all duration-300 flex flex-col justify-between group text-left">
                            <div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100 shadow-sm">
                                        <img src="/images/ride-audience-facility.png" alt="Healthcare Facilities" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold font-display text-slate-900 group-hover:text-brandBlue transition-colors">Healthcare Facilities</h3>
                                        <p className="text-xs text-slate-600 leading-relaxed font-normal mt-1">Coordinate patient transfers and transportation requirements.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-end text-xs">
                                <span className="text-[10px] font-mono text-slate-400">Fleet Dispatch</span>
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>
        </section>

        {/* ===================================================================== */}
        {/* 06. HOW EMSTRAP RIDE WORKS? (A Simple 9-Step Process with Connected Thread) */}
        {/* ===================================================================== */}
        <section className="max-w-7xl mx-auto px-6 md:px-12" id="section-06-how-it-works">
            <div className="space-y-10 text-left">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="space-y-2">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-brandBlue block">A Simple 9-Step Process</span>
                        <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 tracking-tight">
                            How EMSTRAP Ride Works?
                        </h2>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-brandBlue text-xs font-mono font-bold self-start sm:self-auto">
                        <i className="fa-solid fa-route text-xs"></i>
                        <span>CONNECTED JOURNEY THREAD</span>
                    </div>
                </div>

                {/* Horizontal Stepper Row 1: Steps 01 to 06 with Continuous Connecting Thread */}
                <div className="relative">
                    {/* Base Continuous Connecting Thread (Row 1) */}
                    <div className="hidden lg:block absolute top-[24px] left-[8.33%] right-[8.33%] h-[3px] stepper-thread-line rounded-full z-0 animate-thread-glow"></div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 relative text-center z-10">
                        {/* Step 01 */}
                        <div className="relative space-y-2 flex flex-col items-center group">
                            <div className="w-12 h-12 rounded-full bg-white border-2 border-red-500 shadow-sm flex items-center justify-center text-emergencyRed text-base relative z-10 group-hover:scale-110 group-hover:shadow-md transition-all">
                                <i className="fa-solid fa-location-dot"></i>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-red-500 block">01</span>
                            <h4 className="text-xs font-bold font-display text-slate-900 leading-snug">Enter Pickup Location</h4>
                            <p className="text-[11px] text-slate-500 font-normal leading-relaxed">Provide where the patient needs to be picked up.</p>
                        </div>

                        {/* Step 02 */}
                        <div className="relative space-y-2 flex flex-col items-center group">
                            <div className="w-12 h-12 rounded-full bg-white border-2 border-blue-400 shadow-sm flex items-center justify-center text-brandBlue text-base relative z-10 group-hover:scale-110 group-hover:shadow-md transition-all">
                                <i className="fa-solid fa-flag"></i>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-slate-400 block">02</span>
                            <h4 className="text-xs font-bold font-display text-slate-900 leading-snug">Enter Destination</h4>
                            <p className="text-[11px] text-slate-500 font-normal leading-relaxed">Provide the destination or another facility.</p>
                        </div>

                        {/* Step 03 */}
                        <div className="relative space-y-2 flex flex-col items-center group">
                            <div className="w-12 h-12 rounded-full bg-white border-2 border-blue-400 shadow-sm flex items-center justify-center text-brandBlue text-base relative z-10 group-hover:scale-110 group-hover:shadow-md transition-all">
                                <i className="fa-solid fa-truck-medical"></i>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-slate-400 block">03</span>
                            <h4 className="text-xs font-bold font-display text-slate-900 leading-snug">Select Ambulance Requirement</h4>
                            <p className="text-[11px] text-slate-500 font-normal leading-relaxed">Choose the appropriate ambulance type based on patient needs.</p>
                        </div>

                        {/* Step 04 */}
                        <div className="relative space-y-2 flex flex-col items-center group">
                            <div className="w-12 h-12 rounded-full bg-white border-2 border-blue-400 shadow-sm flex items-center justify-center text-brandBlue text-base relative z-10 group-hover:scale-110 group-hover:shadow-md transition-all">
                                <i className="fa-solid fa-file-lines"></i>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-slate-400 block">04</span>
                            <h4 className="text-xs font-bold font-display text-slate-900 leading-snug">Request an Ambulance</h4>
                            <p className="text-[11px] text-slate-500 font-normal leading-relaxed">Submit the booking request.</p>
                        </div>

                        {/* Step 05 */}
                        <div className="relative space-y-2 flex flex-col items-center group">
                            <div className="w-12 h-12 rounded-full bg-white border-2 border-blue-400 shadow-sm flex items-center justify-center text-brandBlue text-base relative z-10 group-hover:scale-110 group-hover:shadow-md transition-all">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-slate-400 block">05</span>
                            <h4 className="text-xs font-bold font-display text-slate-900 leading-snug">Ambulance Matching</h4>
                            <p className="text-[11px] text-slate-500 font-normal leading-relaxed">Find an available ambulance.</p>
                        </div>

                        {/* Step 06 */}
                        <div className="relative space-y-2 flex flex-col items-center group">
                            <div className="w-12 h-12 rounded-full bg-white border-2 border-blue-500 shadow-sm flex items-center justify-center text-brandBlue text-base relative z-10 group-hover:scale-110 group-hover:shadow-md transition-all">
                                <i className="fa-solid fa-circle-check"></i>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-brandBlue block">06</span>
                            <h4 className="text-xs font-bold font-display text-slate-900 leading-snug">Booking Confirmation</h4>
                            <p className="text-[11px] text-slate-500 font-normal leading-relaxed">Receive trip and ambulance details.</p>
                        </div>
                    </div>
                </div>

                {/* Connecting Thread Conduit between Row 1 and Row 2 */}
                <div className="hidden lg:flex items-center justify-between max-w-5xl mx-auto py-1 px-4 relative">
                    <div className="h-[2px] bg-slate-200 flex-grow mr-4"></div>
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-50 border border-blue-200 text-brandBlue text-[11px] font-mono font-bold shadow-sm">
                        <span>Dispatch &amp; Transit Flow</span>
                        <i className="fa-solid fa-arrow-down text-[10px] animate-bounce"></i>
                    </div>
                    <div className="h-[2px] bg-slate-200 flex-grow ml-4"></div>
                </div>

                {/* Horizontal Stepper Row 2: Steps 07 to 09 with Continuous Connecting Thread */}
                <div className="max-w-3xl mx-auto relative pt-2">
                    {/* Base Continuous Connecting Thread (Row 2) */}
                    <div className="hidden sm:block absolute top-[32px] left-[16.66%] right-[16.66%] h-[3px] bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 rounded-full z-0 animate-thread-glow"></div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center relative z-10">
                        {/* Step 07 */}
                        <div className="space-y-2 flex flex-col items-center group">
                            <div className="w-12 h-12 rounded-full bg-white border-2 border-blue-500 shadow-sm flex items-center justify-center text-brandBlue text-base group-hover:scale-110 group-hover:shadow-md transition-all">
                                <i className="fa-solid fa-truck-ramp-box"></i>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-slate-400 block">07</span>
                            <h4 className="text-xs font-bold font-display text-slate-900 leading-snug">Pickup</h4>
                            <p className="text-[11px] text-slate-500 font-normal leading-relaxed">Ambulance arrives at the pickup location.</p>
                        </div>

                        {/* Step 08 */}
                        <div className="space-y-2 flex flex-col items-center group">
                            <div className="w-12 h-12 rounded-full bg-white border-2 border-teal-500 shadow-sm flex items-center justify-center text-teal-600 text-base group-hover:scale-110 group-hover:shadow-md transition-all">
                                <i className="fa-solid fa-route"></i>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-slate-400 block">08</span>
                            <h4 className="text-xs font-bold font-display text-slate-900 leading-snug">Patient Transportation</h4>
                            <p className="text-[11px] text-slate-500 font-normal leading-relaxed">Patient is transported to the selected destination.</p>
                        </div>

                        {/* Step 09 */}
                        <div className="space-y-2 flex flex-col items-center group">
                            <div className="w-12 h-12 rounded-full bg-white border-2 border-emerald-500 shadow-sm flex items-center justify-center text-emerald-600 text-base group-hover:scale-110 group-hover:shadow-md transition-all">
                                <i className="fa-solid fa-flag-checkered"></i>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-emerald-600 block">09</span>
                            <h4 className="text-xs font-bold font-display text-slate-900 leading-snug">Trip Completion</h4>
                            <p className="text-[11px] text-slate-500 font-normal leading-relaxed">Trip is marked as completed.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* 07. EMERGENCY & NON-EMERGENCY TRANSPORTATION */}
        {/* ===================================================================== */}
        <section className="max-w-7xl mx-auto px-6 md:px-12" id="section-07-types">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
                
                {/* Left: Emergency Transportation Card (Red styled) */}
                <div className="rounded-3xl border border-red-200 bg-white p-6 sm:p-8 shadow-sm space-y-5 flex flex-col justify-between">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-red-100 text-emergencyRed flex items-center justify-center text-base shrink-0">
                                <i className="fa-solid fa-lightbulb"></i>
                            </div>
                            <h3 className="text-xl font-bold font-display text-slate-900">Emergency Transportation</h3>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                            For situations where immediate medical transportation is required, users can request an ambulance through the platform.
                        </p>
                        <div className="h-44 sm:h-52 rounded-2xl overflow-hidden bg-slate-100">
                            <img src="/images/ride-emerg-ambulance.png" alt="Emergency Transportation" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* Red Warning Banner */}
                    <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-emergencyRed font-medium flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-emergencyRed text-white flex items-center justify-center text-xs font-black shrink-0">!</span>
                        <span>For life-threatening emergencies, contact the appropriate emergency number immediately.</span>
                    </div>
                </div>

                {/* Right: Non-Emergency Patient Transport Card (Blue styled) */}
                <div className="rounded-3xl border border-blue-200 bg-white p-6 sm:p-8 shadow-sm space-y-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-brandBlue flex items-center justify-center text-base shrink-0">
                            <i className="fa-solid fa-calendar-days"></i>
                        </div>
                        <h3 className="text-xl font-bold font-display text-slate-900">Non-Emergency Patient Transport</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        Useful when a patient needs transportation but is not experiencing an immediate life-threatening emergency.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center pt-2">
                        {/* Checklist (Left sub-col) */}
                        <div className="sm:col-span-7 space-y-2.5 text-xs text-slate-700 font-medium">
                            <div className="flex items-center gap-2.5">
                                <i className="fa-solid fa-check text-brandBlue text-xs"></i>
                                <span>Hospital discharge</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <i className="fa-solid fa-check text-brandBlue text-xs"></i>
                                <span>Hospital-to-hospital transfer</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <i className="fa-solid fa-check text-brandBlue text-xs"></i>
                                <span>Home-to-hospital transportation</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <i className="fa-solid fa-check text-brandBlue text-xs"></i>
                                <span>Medical appointments</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <i className="fa-solid fa-check text-brandBlue text-xs"></i>
                                <span>Follow-up visits</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <i className="fa-solid fa-check text-brandBlue text-xs"></i>
                                <span>Patient relocation</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <i className="fa-solid fa-check text-brandBlue text-xs"></i>
                                <span>Elderly or mobility-limited transport</span>
                            </div>
                        </div>

                        {/* Wheelchair Patient Photo (Right sub-col) */}
                        <div className="sm:col-span-5 h-44 sm:h-52 rounded-2xl overflow-hidden bg-slate-100">
                            <img src="/images/ride-wheelchair-transport.png" alt="Wheelchair transport" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

            </div>
        </section>

        {/* ===================================================================== */}
        {/* 08. SMART AMBULANCE BOOKING */}
        {/* ===================================================================== */}
        <section className="max-w-4xl mx-auto px-6 md:px-8" id="section-08-smart-booking">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-8 text-left">
                <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900 tracking-tight">
                        Find the right ride for the patient.
                    </h2>
                    <p className="text-sm text-slate-600 font-normal leading-relaxed">
                        An ambulance is not simply another vehicle.<br />Different patients may have different transportation requirements.
                    </p>
                    <p className="text-xs font-bold font-display text-slate-800 pt-1">
                        The matching process can consider:
                    </p>
                </div>

                {/* 5 Criteria Stack matching Design 08 */}
                <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center gap-4">
                        <div className="w-9 h-9 rounded-full bg-red-100 text-emergencyRed flex items-center justify-center text-sm shrink-0">
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold font-display text-slate-900">Patient Requirement</h4>
                            <p className="text-[11px] text-slate-500 font-normal">What type of transportation is needed?</p>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center gap-4">
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-brandBlue flex items-center justify-center text-sm shrink-0">
                            <i className="fa-solid fa-location-dot"></i>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold font-display text-slate-900">Location</h4>
                            <p className="text-[11px] text-slate-500 font-normal">Where is the patient?</p>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center gap-4">
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-brandBlue flex items-center justify-center text-sm shrink-0">
                            <i className="fa-solid fa-flag"></i>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold font-display text-slate-900">Destination</h4>
                            <p className="text-[11px] text-slate-500 font-normal">Where does the patient need to go?</p>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center gap-4">
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-brandBlue flex items-center justify-center text-sm shrink-0">
                            <i className="fa-solid fa-clock"></i>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold font-display text-slate-900">Availability</h4>
                            <p className="text-[11px] text-slate-500 font-normal">Which suitable ambulance is available?</p>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center gap-4">
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-brandBlue flex items-center justify-center text-sm shrink-0">
                            <i className="fa-solid fa-route"></i>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold font-display text-slate-900">Distance</h4>
                            <p className="text-[11px] text-slate-500 font-normal">Which available option can serve the request?</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* 09. REAL-TIME BOOKING INFORMATION */}
        {/* ===================================================================== */}
        <section className="max-w-7xl mx-auto px-6 md:px-12" id="section-09-tracking">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
                
                {/* Left Phone Mockup: Trip in Progress */}
                <div className="lg:col-span-6 flex justify-center">
                    <div className="w-full max-w-[340px] rounded-[42px] bg-slate-950 p-3.5 shadow-2xl border-4 border-slate-800">
                        <div className="bg-white rounded-[32px] overflow-hidden text-slate-900 flex flex-col justify-between h-[480px]">
                            {/* Header Bar */}
                            <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-arrow-left text-brandBlue text-xs"></i>
                                    <span className="text-xs font-bold font-display">Trip in Progress</span>
                                </div>
                                <i className="fa-solid fa-chevron-down text-[10px] text-slate-400"></i>
                            </div>

                            {/* Map Area with Real Map & Route Graphics */}
                            <div className="relative flex-grow min-h-[220px] bg-slate-900 overflow-hidden flex items-center justify-center">
                                {/* Real Map Image Background */}
                                <img src="/images/cards/traffic-live-map.jpg" alt="Live Route Navigation Map" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover opacity-85 filter contrast-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/30"></div>

                                {/* Route Polyline SVG overlay */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 300 220" fill="none">
                                    {/* Road backdrop line */}
                                    <path d="M 50 160 Q 120 130 150 110 T 230 50" stroke="#1E40AF" strokeWidth="8" strokeLinecap="round" opacity="0.5" />
                                    {/* Glowing Active GPS Route */}
                                    <path d="M 50 160 Q 120 130 150 110 T 230 50" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" strokeDasharray="6,4" />
                                    {/* Animated Pulse on route */}
                                    <circle cx="150" cy="110" r="4" fill="#60A5FA" className="animate-ping" />
                                </svg>
                                
                                {/* Ambulance marker on route */}
                                <div className="absolute left-4 sm:left-10 top-36 z-20 flex items-center gap-1.5">
                                    <div className="w-8 h-8 rounded-full bg-emergencyRed text-white flex items-center justify-center text-xs shadow-xl ring-4 ring-white/80 animate-pulse">
                                        <i className="fa-solid fa-truck-medical"></i>
                                    </div>
                                    <span className="px-2 py-0.5 rounded bg-slate-900/90 text-[9px] font-mono font-bold text-white shadow">KA 01 AB 1234</span>
                                </div>

                                {/* Destination marker */}
                                <div className="absolute right-12 top-8 z-20 flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shadow-xl ring-4 ring-white/80">
                                        <i className="fa-solid fa-location-dot"></i>
                                    </div>
                                    <span className="px-2 py-0.5 rounded bg-emerald-900/90 text-[8px] font-bold text-emerald-100 shadow mt-0.5 whitespace-nowrap">Manipal ER</span>
                                </div>

                                {/* Arriving in 8 min floating pill */}
                                <div className="absolute right-4 top-24 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg border border-slate-200/90 flex items-center gap-2">
                                    <i className="fa-solid fa-clock text-brandBlue text-xs"></i>
                                    <div className="text-left leading-tight">
                                        <span className="text-[9px] text-slate-400 block font-mono">Arriving In</span>
                                        <span className="text-xs font-bold text-slate-900">8 min (2.4 km)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Driver Info Sheet at Bottom */}
                            <div className="p-4 bg-white border-t border-slate-100 space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 overflow-hidden shrink-0 flex items-center justify-center text-brandBlue shadow-xs">
                                        <i className="fa-solid fa-user-doctor text-base"></i>
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-slate-400 block font-mono uppercase">Driver</span>
                                        <strong className="text-xs font-bold text-slate-900 block font-display">Ramesh Kumar</strong>
                                        <span className="text-[10px] text-amber-500 font-semibold"><i className="fa-solid fa-star text-[9px]"></i> 4.6</span>
                                    </div>
                                </div>
                                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900 text-white text-[10px] font-mono font-bold">
                                    <span>KA 01 AB 1234</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Feature List Stack */}
                <div className="lg:col-span-6 space-y-3">
                    <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-brandBlue flex items-center justify-center text-base shrink-0">
                            <i className="fa-solid fa-truck-medical"></i>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold font-display text-slate-900">Ambulance Details</h4>
                            <p className="text-xs text-slate-600 font-normal mt-0.5">Information about the assigned ambulance.</p>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-brandBlue flex items-center justify-center text-base shrink-0">
                            <i className="fa-solid fa-location-dot"></i>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold font-display text-slate-900">Pickup Location</h4>
                            <p className="text-xs text-slate-600 font-normal mt-0.5">Where the patient will be collected.</p>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-brandBlue flex items-center justify-center text-base shrink-0">
                            <i className="fa-solid fa-flag"></i>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold font-display text-slate-900">Destination</h4>
                            <p className="text-xs text-slate-600 font-normal mt-0.5">Where the patient is being transported.</p>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-brandBlue flex items-center justify-center text-base shrink-0">
                            <i className="fa-solid fa-route"></i>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold font-display text-slate-900">Trip Status</h4>
                            <p className="text-xs text-slate-600 font-normal mt-0.5">Follow the progress of the booking.</p>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-brandBlue flex items-center justify-center text-base shrink-0">
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold font-display text-slate-900">Driver / Crew Information</h4>
                            <p className="text-xs text-slate-600 font-normal mt-0.5">Where applicable.</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        {/* ===================================================================== */}
        {/* 10. FOR AMBULANCE SERVICE PROVIDERS */}
        {/* ===================================================================== */}
        <section className="max-w-7xl mx-auto px-6 md:px-12" id="section-10-providers">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
                
                {/* Left Checklist Content */}
                <div className="lg:col-span-6 space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 tracking-tight leading-tight">
                            Receive and manage transportation requests.
                        </h2>
                        <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                            EMSTRAP Ride can help ambulance operators and service providers manage their services digitally.
                        </p>
                    </div>

                    <div className="space-y-2.5 text-sm text-slate-800 font-medium">
                        <div className="flex items-center gap-3">
                            <i className="fa-solid fa-check-double text-brandBlue text-xs"></i>
                            <span>Receive booking requests</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <i className="fa-solid fa-check-double text-brandBlue text-xs"></i>
                            <span>Manage ambulance availability</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <i className="fa-solid fa-check-double text-brandBlue text-xs"></i>
                            <span>Accept or reject requests</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <i className="fa-solid fa-check-double text-brandBlue text-xs"></i>
                            <span>View pickup and destination</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <i className="fa-solid fa-check-double text-brandBlue text-xs"></i>
                            <span>Manage active trips</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <i className="fa-solid fa-check-double text-brandBlue text-xs"></i>
                            <span>Update trip status</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <i className="fa-solid fa-check-double text-brandBlue text-xs"></i>
                            <span>Manage ambulance information</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <i className="fa-solid fa-check-double text-brandBlue text-xs"></i>
                            <span>Track completed bookings</span>
                        </div>
                    </div>
                </div>

                {/* Right: Provider Dashboard UI Mockup (Dark UI) */}
                <div className="lg:col-span-6">
                    <div className="rounded-3xl bg-[#0B132B] border border-slate-800 p-6 text-white shadow-2xl space-y-5">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                            <span className="text-xs font-mono font-bold uppercase text-slate-300">Provider Dashboard</span>
                            <i className="fa-solid fa-chevron-down text-xs text-slate-500"></i>
                        </div>

                        {/* 3 Stat Metric Counters */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="p-3.5 rounded-2xl bg-[#050B14] border border-slate-800/80">
                                <span className="text-xl font-black font-display text-white block">12</span>
                                <span className="text-[10px] font-mono text-slate-400 block mt-0.5">New Requests</span>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-[#050B14] border border-slate-800/80">
                                <span className="text-xl font-black font-display text-white block">8</span>
                                <span className="text-[10px] font-mono text-slate-400 block mt-0.5">Active Trips</span>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-[#050B14] border border-slate-800/80">
                                <span className="text-xl font-black font-display text-white block">25</span>
                                <span className="text-[10px] font-mono text-slate-400 block mt-0.5">Completed</span>
                            </div>
                        </div>

                        {/* 3 Tabs */}
                        <div className="flex items-center gap-2 pt-1">
                            <button className="px-4 py-1.5 rounded-xl bg-brandBlue text-white text-xs font-bold shadow-md">New Requests</button>
                            <button className="px-4 py-1.5 rounded-xl bg-slate-900/80 text-slate-400 text-xs font-medium hover:text-white">Active Trips</button>
                            <button className="px-4 py-1.5 rounded-xl bg-slate-900/80 text-slate-400 text-xs font-medium hover:text-white">Completed</button>
                        </div>

                        {/* 3 Request Items */}
                        <div className="space-y-2.5">
                            {/* Item 1: ICU */}
                            <div className="p-3.5 rounded-2xl bg-white text-slate-900 flex items-center justify-between gap-3 shadow-md">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-red-100 text-emergencyRed flex items-center justify-center text-xs shrink-0">
                                        <i className="fa-solid fa-hospital"></i>
                                    </div>
                                    <div className="leading-tight">
                                        <div className="text-xs font-bold text-slate-900 font-display">Home - Indiranagar</div>
                                        <div className="text-[11px] text-slate-500">Manipal Hospital</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded-md border border-red-200 text-emergencyRed text-[10px] font-bold">ICU</span>
                                    <button className="px-3 py-1.5 rounded-lg bg-brandBlue hover:bg-brandBlueDark text-white text-xs font-bold">Accept</button>
                                </div>
                            </div>

                            {/* Item 2: Normal */}
                            <div className="p-3.5 rounded-2xl bg-white text-slate-900 flex items-center justify-between gap-3 shadow-md">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs shrink-0">
                                        <i className="fa-solid fa-truck-medical"></i>
                                    </div>
                                    <div className="leading-tight">
                                        <div className="text-xs font-bold text-slate-900 font-display">Hospital - Home</div>
                                        <div className="text-[11px] text-slate-500">Koramangala</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded-md border border-emerald-300 text-emerald-600 text-[10px] font-bold">Normal</span>
                                    <button className="px-3 py-1.5 rounded-lg bg-brandBlue hover:bg-brandBlueDark text-white text-xs font-bold">Accept</button>
                                </div>
                            </div>

                            {/* Item 3: Oxygen */}
                            <div className="p-3.5 rounded-2xl bg-white text-slate-900 flex items-center justify-between gap-3 shadow-md">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center text-xs shrink-0">
                                        <i className="fa-solid fa-user-doctor"></i>
                                    </div>
                                    <div className="leading-tight">
                                        <div className="text-xs font-bold text-slate-900 font-display">Care Facility - Hospital</div>
                                        <div className="text-[11px] text-slate-500">Victoria Hospital</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded-md border border-purple-200 text-purple-600 text-[10px] font-bold">Oxygen</span>
                                    <button className="px-3 py-1.5 rounded-lg bg-brandBlue hover:bg-brandBlueDark text-white text-xs font-bold">Accept</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        {/* ===================================================================== */}
        {/* 11. FOR HOSPITALS */}
        {/* ===================================================================== */}
        <section className="max-w-7xl mx-auto px-6 md:px-12" id="section-11-hospitals">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
                
                {/* Left Hospital Flow Diagram */}
                <div className="lg:col-span-6 space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 tracking-tight leading-tight">
                            Simplify patient-transfer coordination.
                        </h2>
                        <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                            Hospitals can manage patient transportation requests through EMSTRAP Ride.
                        </p>
                    </div>

                    {/* Flow Card Stack matching Design 11 */}
                    <div className="space-y-2 max-w-lg">
                        {/* Step 1: Hospital A */}
                        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 text-brandBlue flex items-center justify-center text-base shrink-0">
                                <i className="fa-solid fa-hospital"></i>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold font-display text-slate-900">Hospital A</h4>
                                <p className="text-xs text-slate-500 font-normal">Patient Transfer Request</p>
                            </div>
                        </div>

                        {/* Arrow Down */}
                        <div className="flex justify-center py-1">
                            <i className="fa-solid fa-arrow-down text-brandBlue text-xs"></i>
                        </div>

                        {/* Step 2: EMSTRAP RIDE */}
                        <div className="p-4 rounded-2xl bg-white border-2 border-brandBlue/30 shadow-md flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-red-100 text-emergencyRed flex items-center justify-center text-base shrink-0 font-bold font-display">
                                G
                            </div>
                            <div>
                                <h4 className="text-sm font-black font-display text-brandBlue">EMSTRAP RIDE</h4>
                                <p className="text-xs text-slate-600 font-normal">Finds an Available Ambulance</p>
                            </div>
                        </div>

                        {/* Arrow Down */}
                        <div className="flex justify-center py-1">
                            <i className="fa-solid fa-arrow-down text-brandBlue text-xs"></i>
                        </div>

                        {/* Step 3: Hospital B */}
                        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 text-brandBlue flex items-center justify-center text-base shrink-0">
                                <i className="fa-solid fa-hospital"></i>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold font-display text-slate-900">Hospital B</h4>
                                <p className="text-xs text-slate-500 font-normal">Patient Transfer Completed</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Hospital Photo with Ambulance */}
                <div className="lg:col-span-6">
                    <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 h-80 sm:h-96">
                        <img src="/hospital.jpg" alt="Hospital ambulance coordination" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                    </div>
                </div>

            </div>
        </section>

        {/* ===================================================================== */}
        {/* 12. TRADITIONAL VS EMSTRAP RIDE */}
        {/* ===================================================================== */}
        <section className="max-w-4xl mx-auto px-6 md:px-8" id="section-12-comparison">
            <div className="space-y-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 tracking-tight">
                    Traditional vs EMSTRAP Ride
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    {/* Column 1: Traditional Process */}
                    <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
                        <div className="py-3 px-6 bg-[#64748B] text-white font-bold text-center text-sm font-display">
                            Traditional Process
                        </div>
                        <div className="p-6 space-y-3.5 text-xs sm:text-sm font-medium text-slate-600">
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-phone text-slate-400 text-xs"></i>
                                <span>Need ambulance</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-magnifying-glass text-slate-400 text-xs"></i>
                                <span>Search numbers</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-phone-volume text-slate-400 text-xs"></i>
                                <span>Call provider 1</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-ban text-slate-400 text-xs"></i>
                                <span>Not available</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-phone-volume text-slate-400 text-xs"></i>
                                <span>Call provider 2</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-comment-dots text-slate-400 text-xs"></i>
                                <span>Explain details</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-hourglass-half text-slate-400 text-xs"></i>
                                <span>Wait for confirmation</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: With EMSTRAP Ride */}
                    <div className="rounded-3xl bg-white border-2 border-brandBlue shadow-md overflow-hidden">
                        <div className="py-3 px-6 bg-brandBlue text-white font-bold text-center text-sm font-display">
                            With EMSTRAP Ride
                        </div>
                        <div className="p-6 space-y-3.5 text-xs sm:text-sm font-medium text-slate-800">
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-truck-medical text-brandBlue text-xs"></i>
                                <span>Need ambulance</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-location-dot text-brandBlue text-xs"></i>
                                <span>Enter pickup &amp; destination</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-sliders text-brandBlue text-xs"></i>
                                <span>Select requirements</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-paper-plane text-brandBlue text-xs"></i>
                                <span>Request ambulance</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-magnifying-glass-location text-brandBlue text-xs"></i>
                                <span>Find available option</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-circle-check text-brandBlue text-xs"></i>
                                <span>Confirm booking</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-shield-heart text-brandBlue text-xs"></i>
                                <span>Patient transport</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Banner */}
                <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 text-center text-xs font-bold text-brandBlue font-display">
                    Less searching. Less calling. A more organized booking experience.
                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* 13. BUILT FOR A CONNECTED HEALTHCARE ECOSYSTEM */}
        {/* ===================================================================== */}
        <section className="max-w-5xl mx-auto px-6 md:px-8" id="section-13-ecosystem">
            <div className="p-5 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-10 text-left">
                <div className="space-y-2">
                    <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 tracking-tight">
                        Connecting everyone in the patient journey.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                        EMSTRAP Ride can connect multiple participants in the healthcare ecosystem.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Hub and Spoke Diagram on Left (8 cols) with Live Connectivity */}
                    <div className="lg:col-span-8 relative flex items-center justify-center p-4 sm:p-8 bg-slate-50/90 rounded-3xl border border-slate-200/80 overflow-hidden min-h-[360px]">
                        {/* Subtle Technical Radar & Guide Grid */}
                        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none"></div>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-[240px] sm:w-[280px] h-[240px] sm:h-[280px] rounded-full border border-slate-200/60"></div>
                            <div className="w-[150px] sm:w-[180px] h-[150px] sm:h-[180px] rounded-full border border-blue-200/50"></div>
                        </div>

                        {/* SVG Live Connectivity Lines & Animated Trajectories */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 500 360" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="connGradRed" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9" />
                                </linearGradient>
                            </defs>
                            {/* Line 1: Center (250, 180) to Public (100, 75) */}
                            <line x1="250" y1="180" x2="100" y2="75" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.7" />
                            <line x1="250" y1="180" x2="100" y2="75" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="25 150" className="beam-4turn-1" />

                            {/* Line 2: Center (250, 180) to Hospitals (400, 75) */}
                            <line x1="250" y1="180" x2="400" y2="75" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.7" />
                            <line x1="250" y1="180" x2="400" y2="75" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="25 150" className="beam-4turn-2" />

                            {/* Line 3: Center (250, 180) to Ambulance Providers (250, 305) */}
                            <line x1="250" y1="180" x2="250" y2="305" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.7" />
                            <line x1="250" y1="180" x2="250" y2="305" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="25 150" className="beam-4turn-3" />
                        </svg>

                        {/* Top Left Node: Public */}
                        <div className="absolute top-5 left-3 sm:left-12 z-20 flex flex-col items-center text-center space-y-1">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border-2 border-blue-200 text-brandBlue flex items-center justify-center text-base sm:text-lg shadow-md hover:scale-105 transition-transform">
                                <i className="fa-solid fa-users"></i>
                            </div>
                            <span className="text-xs font-bold text-slate-900 block font-display">Public</span>
                            <span className="text-[10px] text-slate-500 font-mono">Patients &amp; Families</span>
                        </div>

                        {/* Top Right Node: Hospitals */}
                        <div className="absolute top-5 right-3 sm:right-12 z-20 flex flex-col items-center text-center space-y-1">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border-2 border-blue-200 text-brandBlue flex items-center justify-center text-base sm:text-lg shadow-md hover:scale-105 transition-transform">
                                <i className="fa-solid fa-hospital"></i>
                            </div>
                            <span className="text-xs font-bold text-slate-900 block font-display">Hospitals</span>
                            <span className="text-[10px] text-slate-500 font-mono">Healthcare Facilities</span>
                        </div>

                        {/* Center Hub: EMSTRAP RIDE with Heartbeat Pulsing Rings */}
                        <div className="relative z-20 flex flex-col items-center justify-center">
                            {/* Sonar pulse ripples */}
                            <div className="absolute inset-0 -m-3 sm:-m-4 rounded-full border-2 border-red-500/30 heartbeat-ring-1 pointer-events-none"></div>
                            <div className="absolute inset-0 -m-6 sm:-m-8 rounded-full border-2 border-red-500/15 heartbeat-ring-2 pointer-events-none"></div>

                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white text-slate-900 flex flex-col items-center justify-center text-center p-2 shadow-2xl border-4 border-emergencyRed heartbeat-center">
                                <img src="/images/logo.png" alt="EMSTRAP Logo" className="h-6 sm:h-7 w-auto object-contain" />
                                <span className="text-xs sm:text-sm font-black font-display text-emergencyRed uppercase tracking-wider mt-1">Ride</span>
                            </div>
                            <span className="inline-flex items-center gap-1 text-[8px] sm:text-[9px] font-mono font-bold text-red-700 bg-white/95 px-2.5 py-0.5 rounded-full border border-red-200 shadow-sm mt-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                CONNECTED
                            </span>
                        </div>

                        {/* Bottom Center Node: Ambulance Providers */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-center space-y-1">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border-2 border-red-200 text-emergencyRed flex items-center justify-center text-base sm:text-lg shadow-md hover:scale-105 transition-transform">
                                <i className="fa-solid fa-truck-medical"></i>
                            </div>
                            <span className="text-xs font-bold text-slate-900 block font-display whitespace-nowrap">Ambulance Providers</span>
                            <span className="text-[10px] text-slate-500 font-mono whitespace-nowrap">Service Operators</span>
                        </div>
                    </div>

                    {/* Vertical Pipeline on Right (4 cols) */}
                    <div className="lg:col-span-4 space-y-5 border-t-2 lg:border-t-0 lg:border-l-2 border-slate-100 pt-6 lg:pt-0 lg:pl-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-100 text-emergencyRed flex items-center justify-center text-xs shrink-0">
                                <i className="fa-solid fa-truck-medical"></i>
                            </div>
                            <span className="text-xs font-bold text-slate-800">Ambulance Booking</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-100 text-emergencyRed flex items-center justify-center text-xs shrink-0">
                                <i className="fa-solid fa-user-check"></i>
                            </div>
                            <span className="text-xs font-bold text-slate-800">Patient Pickup</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-100 text-emergencyRed flex items-center justify-center text-xs shrink-0">
                                <i className="fa-solid fa-route"></i>
                            </div>
                            <span className="text-xs font-bold text-slate-800">Patient Transport</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-100 text-emergencyRed flex items-center justify-center text-xs shrink-0">
                                <i className="fa-solid fa-location-dot"></i>
                            </div>
                            <span className="text-xs font-bold text-slate-800">Destination</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* 14. KEY BENEFITS */}
        {/* ===================================================================== */}
        <section className="max-w-7xl mx-auto px-6 md:px-12" id="section-14-benefits">
            <div className="space-y-8 text-left">
                <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 tracking-tight">
                    Key Benefits
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* 1. For the Public */}
                    <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-brandBlue flex items-center justify-center text-base shrink-0">
                            <i className="fa-solid fa-users"></i>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold font-display text-slate-900">For the Public</h4>
                            <p className="text-xs text-slate-600 font-normal mt-1 leading-relaxed">Book ambulance transportation easily.</p>
                        </div>
                    </div>

                    {/* 2. For Patients */}
                    <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-brandBlue flex items-center justify-center text-base shrink-0">
                            <i className="fa-solid fa-bed"></i>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold font-display text-slate-900">For Patients</h4>
                            <p className="text-xs text-slate-600 font-normal mt-1 leading-relaxed">Make transportation more organized.</p>
                        </div>
                    </div>

                    {/* 3. For Families */}
                    <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-red-100 text-emergencyRed flex items-center justify-center text-base shrink-0">
                            <i className="fa-solid fa-people-roof"></i>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold font-display text-slate-900">For Families</h4>
                            <p className="text-xs text-slate-600 font-normal mt-1 leading-relaxed">Reduce the stress of arranging transport.</p>
                        </div>
                    </div>

                    {/* 4. For Hospitals */}
                    <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-brandBlue flex items-center justify-center text-base shrink-0">
                            <i className="fa-solid fa-hospital"></i>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold font-display text-slate-900">For Hospitals</h4>
                            <p className="text-xs text-slate-600 font-normal mt-1 leading-relaxed">Simplify patient-transfer coordination.</p>
                        </div>
                    </div>

                    {/* 5. For Ambulance Providers */}
                    <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-brandBlue flex items-center justify-center text-base shrink-0">
                            <i className="fa-solid fa-truck-medical"></i>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold font-display text-slate-900">For Ambulance Providers</h4>
                            <p className="text-xs text-slate-600 font-normal mt-1 leading-relaxed">Get structured requests and manage trips digitally.</p>
                        </div>
                    </div>

                    {/* 6. For Cities */}
                    <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-brandBlue flex items-center justify-center text-base shrink-0">
                            <i className="fa-solid fa-city"></i>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold font-display text-slate-900">For Cities</h4>
                            <p className="text-xs text-slate-600 font-normal mt-1 leading-relaxed">Create a more connected ambulance ecosystem.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* 15. FINAL CTA SECTION */}
        {/* ===================================================================== */}
        <section className="max-w-7xl mx-auto px-6 md:px-12" id="section-15-cta">
            <div className="rounded-3xl overflow-hidden relative border border-slate-800 bg-[#0A0F1D] text-white shadow-2xl p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
                {/* Ambulance on the right side */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-40 lg:opacity-75 bg-right bg-no-repeat bg-cover" style={{"backgroundImage":"url('/ambulance.jpg')"}}></div>
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0A0F1D] via-[#0A0F1D]/90 to-transparent lg:w-2/3"></div>

                <div className="relative z-10 max-w-xl space-y-6 text-left">
                    <div className="flex items-center gap-2">
                        <img src="/images/logo.png" alt="EMSTRAP Logo" className="h-6 w-auto" />
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-300">EMSTRAP RIDE</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight leading-tight">
                        Reliable Ambulance Transportation, When You Need It.
                    </h2>

                    <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                        Book an ambulance for patient transportation, hospital transfers, medical appointments and other healthcare journeys through EMSTRAP Ride.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                        <button onClick={openProviderModal} className="px-7 py-3.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white font-bold tracking-wider text-xs uppercase transition-all border border-slate-700 font-display hover:scale-105 active:scale-95">
                            Partner as an Ambulance Provider
                        </button>
                    </div>

                    <div className="text-[11px] font-medium text-slate-400 pt-2">
                        For Patients &bull; Families &bull; Hospitals &bull; Ambulance Providers
                    </div>
                </div>
            </div>
        </section>

    

    {/* Footer */}
    <footer className="bg-[#050505] border-t border-neutral-900 py-10 px-6 md:px-12 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
                <span className="uppercase font-mono tracking-wider text-neutral-400 block mb-1">EMSTRAP RIDE &bull; AMBULANCE TRANSPORTATION PLATFORM</span>
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

    {/* Booking Modal */}
    <div id="bookingModal" className="hidden fixed inset-0 z-50 items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={(e) => { if (e.target === e.currentTarget) closeBookingModal(); }}>
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-6 text-slate-900 shadow-2xl relative">
            <button onClick={closeBookingModal} className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 text-xl">
                <i className="fa-solid fa-xmark"></i>
            </button>
            <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-emergencyRed">PATIENT DISPATCH</span>
                <h3 className="text-2xl font-bold font-display text-slate-900 mt-1">Book an Ambulance</h3>
                <p className="text-xs text-slate-500 font-normal mt-1">Emergency &amp; Non-Emergency Transportation Service.</p>
            </div>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Pickup Location</label>
                    <input type="text" required className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brandBlue" placeholder="Enter pickup address or landmark" />
                </div>
                <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Destination Facility</label>
                    <input type="text" required className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brandBlue" placeholder="Hospital or destination address" />
                </div>
                <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Ambulance Type</label>
                    <select className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brandBlue">
                        <option>Normal (Basic Life Support / Non-Emergency)</option>
                        <option>Oxygen Supported Ambulance</option>
                        <option>ICU / Advance Cardiac Life Support (ACLS)</option>
                    </select>
                </div>
                <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Contact Phone</label>
                    <input type="tel" required className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brandBlue" placeholder="+91 XXXXX XXXXX" />
                </div>
                <button type="submit" className="w-full py-3.5 rounded-full bg-emergencyRed hover:bg-emergencyRedDark text-white font-bold text-xs uppercase tracking-wider transition-all font-display shadow-lg">
                    Confirm Dispatch Request
                </button>
            </form>
        </div>
    </div>

    {/* Provider Partner Modal */}
    <div id="providerModal" className="hidden fixed inset-0 z-50 items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={(e) => { if (e.target === e.currentTarget) closeProviderModal(); }}>
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-6 text-slate-900 shadow-2xl relative">
            <button onClick={closeProviderModal} className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 text-xl">
                <i className="fa-solid fa-xmark"></i>
            </button>
            <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-brandBlue">FLEET ONBOARDING</span>
                <h3 className="text-2xl font-bold font-display text-slate-900 mt-1">Partner as an Ambulance Provider</h3>
                <p className="text-xs text-slate-500 font-normal mt-1">Connect your fleet to the EMSTRAP digital dispatch network.</p>
            </div>
            <form onSubmit={handleProviderSubmit} className="space-y-4">
                <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Company / Operator Name</label>
                    <input type="text" required className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brandBlue" placeholder="e.g. LifeCare Ambulance Fleet" />
                </div>
                <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Fleet Size (Number of Ambulances)</label>
                    <input type="number" min="1" required className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brandBlue" placeholder="e.g. 10" />
                </div>
                <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">City / Region of Operation</label>
                    <input type="text" required className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brandBlue" placeholder="e.g. Bengaluru, Karnataka" />
                </div>
                <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Contact Phone</label>
                    <input type="tel" required className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brandBlue" placeholder="+91 XXXXX XXXXX" />
                </div>
                <button type="submit" className="w-full py-3.5 rounded-full bg-brandBlue hover:bg-brandBlueDark text-white font-bold text-xs uppercase tracking-wider transition-all font-display shadow-lg">
                    Submit Partnership Request
                </button>
            </form>
        </div></div></main>
    </div>
  );
}
