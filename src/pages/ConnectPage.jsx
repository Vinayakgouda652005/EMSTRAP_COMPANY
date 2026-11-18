import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageSetup, submitEmstrapModalRequest } from "../utils/emstrapLifecycle";

const PAGE_CSS = ".node-pulse {\n            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7);\n            animation: pulseBlue 2s infinite cubic-bezier(0.66, 0, 0, 1);\n        }\n        @keyframes pulseBlue {\n            to {\n                box-shadow: 0 0 0 16px rgba(37, 99, 235, 0);\n            }\n        }\n        @keyframes radarSweep {\n            0% { transform: rotate(0deg); }\n            100% { transform: rotate(360deg); }\n        }\n        .radar-beam {\n            animation: radarSweep 4s linear infinite;\n        }\n        @keyframes aiWave {\n            0%, 100% { height: 10px; }\n            50% { height: 36px; }\n        }\n        .wave-bar {\n            animation: aiWave 1.4s ease-in-out infinite;\n        }\n        .wave-bar:nth-child(2) { animation-delay: 0.15s; }\n        .wave-bar:nth-child(3) { animation-delay: 0.3s; }\n        .wave-bar:nth-child(4) { animation-delay: 0.45s; }\n        .wave-bar:nth-child(5) { animation-delay: 0.6s; }\n        .wave-bar:nth-child(6) { animation-delay: 0.75s; }\n        .wave-bar:nth-child(7) { animation-delay: 0.9s; }\n        .wave-bar:nth-child(8) { animation-delay: 1.05s; }\n\n        /* Hero Network Heartbeat & Turn-wise Animations */\n        @keyframes heartbeat {\n            0% { transform: scale(1); }\n            12% { transform: scale(1.08); }\n            22% { transform: scale(1.02); }\n            34% { transform: scale(1.14); }\n            52% { transform: scale(1); }\n            100% { transform: scale(1); }\n        }\n        .heartbeat-center {\n            animation: heartbeat 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;\n            transform-origin: center center;\n        }\n        @keyframes heartbeatPing {\n            0% { transform: scale(0.85); opacity: 0.9; }\n            45% { opacity: 0.35; }\n            100% { transform: scale(2.4); opacity: 0; }\n        }\n        .heartbeat-ring-1 {\n            animation: heartbeatPing 2.2s cubic-bezier(0.1, 0.7, 0.3, 1) infinite;\n        }\n        .heartbeat-ring-2 {\n            animation: heartbeatPing 2.2s cubic-bezier(0.1, 0.7, 0.3, 1) infinite 0.7s;\n        }\n\n        /* Clockwise Radar Sweep */\n        @keyframes radarTurnwise {\n            from { transform: rotate(0deg); }\n            to { transform: rotate(360deg); }\n        }\n        .radar-sweep-turnwise {\n            transform-origin: 200px 200px;\n            animation: radarTurnwise 6s linear infinite;\n        }\n\n        /* Connecting Radial Beams (6s cycle, 1s per node in clockwise order) */\n        @keyframes beamTravel {\n            0% { stroke-dashoffset: 160; opacity: 0; }\n            4% { opacity: 1; }\n            14% { stroke-dashoffset: 0; opacity: 1; }\n            19% { stroke-dashoffset: -30; opacity: 0; }\n            100% { stroke-dashoffset: -30; opacity: 0; }\n        }\n        .beam-turn-1 { animation: beamTravel 6s linear infinite 0s; }\n        .beam-turn-2 { animation: beamTravel 6s linear infinite 1s; }\n        .beam-turn-3 { animation: beamTravel 6s linear infinite 2s; }\n        .beam-turn-4 { animation: beamTravel 6s linear infinite 3s; }\n        .beam-turn-5 { animation: beamTravel 6s linear infinite 4s; }\n        .beam-turn-6 { animation: beamTravel 6s linear infinite 5s; }\n\n        /* Outer Hexagon / Perimeter Thread Animated Flow */\n        @keyframes perimeterFlow {\n            from { stroke-dashoffset: 0; }\n            to { stroke-dashoffset: -860; }\n        }\n        .thread-pulse {\n            stroke-dasharray: 45 860;\n            animation: perimeterFlow 6s linear infinite;\n        }\n\n        /* Turn-wise Satellite Node Activation Glow */\n        @keyframes nodeTurnwiseGlow {\n            0%, 100% {\n                transform: scale(1);\n                box-shadow: 0 4px 10px rgba(15, 23, 42, 0.12);\n                filter: brightness(1);\n            }\n            8% {\n                transform: scale(1);\n            }\n            13% {\n                transform: scale(1.22);\n                box-shadow: 0 0 24px rgba(37, 99, 235, 0.65);\n                filter: brightness(1.25);\n            }\n            18% {\n                transform: scale(1.14);\n                box-shadow: 0 0 16px rgba(37, 99, 235, 0.4);\n            }\n            24% {\n                transform: scale(1);\n                box-shadow: 0 4px 10px rgba(15, 23, 42, 0.12);\n                filter: brightness(1);\n            }\n        }\n        .node-turn-1 { animation: nodeTurnwiseGlow 6s ease-in-out infinite 0s; }\n        .node-turn-2 { animation: nodeTurnwiseGlow 6s ease-in-out infinite 1s; }\n        .node-turn-3 { animation: nodeTurnwiseGlow 6s ease-in-out infinite 2s; }\n        .node-turn-4 { animation: nodeTurnwiseGlow 6s ease-in-out infinite 3s; }\n        .node-turn-5 { animation: nodeTurnwiseGlow 6s ease-in-out infinite 4s; }\n        .node-turn-6 { animation: nodeTurnwiseGlow 6s ease-in-out infinite 5s; }\n\n        /* Turn-wise Outer Glow Ping */\n        @keyframes ringTurnwisePing {\n            0%, 100% { transform: scale(0.9); opacity: 0; }\n            11% { opacity: 0.9; }\n            22% { transform: scale(1.75); opacity: 0; }\n        }\n        .ring-turn-1 { animation: ringTurnwisePing 6s cubic-bezier(0.2, 0.8, 0.2, 1) infinite 0s; }\n        .ring-turn-2 { animation: ringTurnwisePing 6s cubic-bezier(0.2, 0.8, 0.2, 1) infinite 1s; }\n        .ring-turn-3 { animation: ringTurnwisePing 6s cubic-bezier(0.2, 0.8, 0.2, 1) infinite 2s; }\n        .ring-turn-4 { animation: ringTurnwisePing 6s cubic-bezier(0.2, 0.8, 0.2, 1) infinite 3s; }\n        .ring-turn-5 { animation: ringTurnwisePing 6s cubic-bezier(0.2, 0.8, 0.2, 1) infinite 4s; }\n        .ring-turn-6 { animation: ringTurnwisePing 6s cubic-bezier(0.2, 0.8, 0.2, 1) infinite 5s; }\n\n        /* Duplicate Detection Converge Pulse */\n        @keyframes convergePulseFlow {\n            0% { stroke-dashoffset: 220; opacity: 0; }\n            8% { opacity: 1; }\n            85% { stroke-dashoffset: 0; opacity: 1; }\n            100% { stroke-dashoffset: -30; opacity: 0; }\n        }\n        .converge-pulse-1 { animation: convergePulseFlow 2.8s ease-in-out infinite 0s; }\n        .converge-pulse-2 { animation: convergePulseFlow 2.8s ease-in-out infinite 0.2s; }\n        .converge-pulse-3 { animation: convergePulseFlow 2.8s ease-in-out infinite 0.4s; }\n        .converge-pulse-4 { animation: convergePulseFlow 2.8s ease-in-out infinite 0.6s; }\n        .converge-pulse-5 { animation: convergePulseFlow 2.8s ease-in-out infinite 0.8s; }\n\n        /* Report Info Section (Image 4): Heartbeat & 4-Turn Animations */\n        @keyframes incidentHeartbeat {\n            0% { transform: scale(1); }\n            14% { transform: scale(1.08); }\n            26% { transform: scale(1.02); }\n            40% { transform: scale(1.14); }\n            58% { transform: scale(1); }\n            100% { transform: scale(1); }\n        }\n        .incident-heartbeat {\n            animation: incidentHeartbeat 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;\n            transform-origin: center center;\n        }\n        @keyframes incidentRipple {\n            0% { transform: scale(0.9); opacity: 0.8; }\n            50% { opacity: 0.35; }\n            100% { transform: scale(2.2); opacity: 0; }\n        }\n        .incident-ripple-1 {\n            animation: incidentRipple 2s cubic-bezier(0.2, 0.8, 0.3, 1) infinite;\n        }\n        .incident-ripple-2 {\n            animation: incidentRipple 2s cubic-bezier(0.2, 0.8, 0.3, 1) infinite 0.7s;\n        }\n\n        /* 4-Turn Radial Beam Pulse (4s cycle, 1s per turn in clockwise order) */\n        @keyframes beamTravel4 {\n            0% { stroke-dashoffset: 220; opacity: 0; }\n            5% { opacity: 1; }\n            18% { stroke-dashoffset: 0; opacity: 1; }\n            24% { stroke-dashoffset: -30; opacity: 0; }\n            100% { stroke-dashoffset: -30; opacity: 0; }\n        }\n        .beam-4turn-1 { animation: beamTravel4 4s linear infinite 0s; }\n        .beam-4turn-2 { animation: beamTravel4 4s linear infinite 1s; }\n        .beam-4turn-3 { animation: beamTravel4 4s linear infinite 2s; }\n        .beam-4turn-4 { animation: beamTravel4 4s linear infinite 3s; }\n\n        /* 4-Turn Card Highlight (Clockwise sequence matching beams) */\n        @keyframes card4TurnGlow {\n            0%, 100% {\n                transform: scale(1);\n                box-shadow: 0 1px 3px rgba(0,0,0,0.06);\n                border-color: #e2e8f0;\n            }\n            10% {\n                transform: scale(1.08);\n                box-shadow: 0 0 24px rgba(37,99,235,0.45);\n                border-color: #2563eb;\n            }\n            20% {\n                transform: scale(1.04);\n                box-shadow: 0 0 14px rgba(37,99,235,0.25);\n            }\n            30% {\n                transform: scale(1);\n                box-shadow: 0 1px 3px rgba(0,0,0,0.06);\n                border-color: #e2e8f0;\n            }\n        }\n        .card-4turn-1 { animation: card4TurnGlow 4s ease-in-out infinite 0s; }\n        .card-4turn-2 { animation: card4TurnGlow 4s ease-in-out infinite 1s; }\n        .card-4turn-3 { animation: card4TurnGlow 4s ease-in-out infinite 2s; }\n        .card-4turn-4 { animation: card4TurnGlow 4s ease-in-out infinite 3s; }\n\n        /* Outer Loop Thread Flow connecting 4 cards */\n        @keyframes threadFlow4 {\n            from { stroke-dashoffset: 0; }\n            to { stroke-dashoffset: -1200; }\n        }\n        .thread-flow-4 {\n            stroke-dasharray: 45 1200;\n            animation: threadFlow4 4s linear infinite;\n        }";

export default function ConnectPage() {
  usePageSetup({
    title: "EMSTRAP Connect | One Connected Network for Every Emergency",
    bodyClass: "bg-white text-slate-900 font-sans selection:bg-brandBlue selection:text-white antialiased",
    themeClass: "theme-solutions",
    customCss: PAGE_CSS,
    enableWave: false,
    enableHeaderAmbulance: false,
  });

  const openDemoModal = () => {
    const m = document.getElementById("demoModal");
    if (m) {
      m.classList.remove("hidden");
      m.classList.add("flex");
    }
  };
  const closeDemoModal = () => {
    const m = document.getElementById("demoModal");
    if (m) {
      m.classList.add("hidden");
      m.classList.remove("flex");
    }
  };
  const handleDemoSubmit = (e) =>
    submitEmstrapModalRequest({
      event: e,
      requestType: "EMSTRAP Connect Government Demo Request",
      successMessage:
        "Thank you. The EMSTRAP Government Advisory Team has received your briefing request and will reach out within 24 business hours.",
      onSuccess: closeDemoModal,
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
        closeDemoModal();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      if (btn) btn.removeEventListener("click", toggleMobile);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="page-scope-connectpage theme-solutions min-h-screen flex flex-col justify-between">
      
    
{/* EMSTRAP CONNECT PAGE NAVBAR */}
<nav className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
    <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">

        {/* BRAND */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
                src="/images/logo.png"
                alt="EMSTRAP"
                className="h-10 w-auto object-contain"
            />
            <div className="border-l border-slate-200 pl-3">
                <span className="block text-lg font-black tracking-tight text-slate-900">
                    EMSTRAP CONNECT
                </span>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-slate-500 font-semibold">
                    Public Safety Infrastructure
                </span>
            </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden lg:flex items-center gap-7 text-[11px] font-bold uppercase tracking-wider text-slate-600">

            <a href="#section-01-hero" className="hover:text-blue-600 transition-colors">
                Home
            </a>

            <a href="#section-03-the-problem" className="hover:text-blue-600 transition-colors">
                Challenges
            </a>

            <a href="#section-04-solution" className="hover:text-blue-600 transition-colors">
                Solutions
            </a>

            <a href="#section-08-engine" className="hover:text-blue-600 transition-colors">
                How It Works
            </a>

           

        </div>

        {/* RIGHT ACTIONS */}
        <div className="hidden md:flex items-center gap-4">
            <Link
                to="/"
                className="text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
            >
                Main Website
            </Link>

            
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
            id="connectMobileMenuBtn"
            className="md:hidden w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-800"
            aria-label="Toggle navigation"
            aria-expanded="false"
        >
            <i className="fa-solid fa-bars"></i>
        </button>
    </div>

    {/* MOBILE MENU */}
    <div id="connectMobileMenu" className="hidden md:hidden bg-white border-t border-slate-100 px-6 py-5 space-y-4">

        <a href="#section-01-hero" className="block text-sm font-semibold text-slate-700">Home</a>
        <a href="#section-03-the-problem" className="block text-sm font-semibold text-slate-700">Challenges</a>
        <a href="#section-04-solution" className="block text-sm font-semibold text-slate-700">Solutions</a>
        <a href="#section-08-engine" className="block text-sm font-semibold text-slate-700">How It Works</a>
        

    
    </div>
</nav>


    <main>
        {/* ===================================================================== */}
        {/* 01. HERO SECTION (Matching Design Board 01) */}
        {/* ===================================================================== */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-gradient-to-b from-slate-50 via-white to-white relative overflow-hidden" id="section-01-hero">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    
                    {/* Left Hero Text */}
                    <div className="lg:col-span-6 space-y-6 text-left">

                        <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black font-display text-slate-900 tracking-tight leading-[1.08]">
                            One Connected Network for Every Emergency
                        </h1>

                        <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
                            A B2G emergency communication and incident-reporting platform connecting citizens, authorities, emergency responders and control rooms.
                        </p>

                        <div className="pt-2 flex flex-wrap items-center gap-4">
                            <button onClick={openDemoModal} className="px-8 py-3.5 rounded-full bg-brandBlue hover:bg-brandBlueDark text-white font-bold tracking-wider text-xs uppercase transition-all shadow-lg hover:shadow-xl font-display hover:scale-105 active:scale-95 inline-flex items-center gap-2">
                                <span>Request a Government Demo</span>
                                <i className="fa-solid fa-arrow-right text-[10px]"></i>
                            </button>
                            <a href="#section-08-engine" className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 font-bold tracking-wider text-xs uppercase transition-all border border-slate-300 font-display hover:border-slate-400">
                                Explore How It Works
                            </a>
                        </div>

                        <div className="pt-2 flex items-center gap-2 text-xs font-mono font-medium text-slate-500">
                            <span className="text-brandBlue font-bold">&bull;</span>
                            <span>Report. Connect. Coordinate. Respond.</span>
                        </div>
                    </div>

                    {/* Right Hero Visual: Connected Network Diagram (Clean Animated Heartbeat & Turn-wise Sync) */}
                    <div className="lg:col-span-6 relative flex items-center justify-center">
                        <div className="relative w-full max-w-[520px] aspect-square p-2 sm:p-4 text-slate-900 overflow-hidden flex items-center justify-center">
                            {/* Clean Technical Grid & Radar Concentric Guides (No Background Photo) */}
                            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:22px_22px] opacity-60 pointer-events-none"></div>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-[370px] h-[370px] rounded-full border border-slate-200/70"></div>
                                <div className="w-[270px] h-[270px] rounded-full border border-slate-200/60"></div>
                                <div className="w-[170px] h-[170px] rounded-full border border-blue-200/60"></div>
                            </div>

                            {/* Central EMSTRAP CONNECT Node (Heartbeat Effect) */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                                {/* Heartbeat expanding ripple rings */}
                                <div className="absolute inset-0 -m-4 rounded-full border-2 border-brandBlue/30 heartbeat-ring-1 pointer-events-none"></div>
                                <div className="absolute inset-0 -m-8 rounded-full border-2 border-brandBlue/20 heartbeat-ring-2 pointer-events-none"></div>

                                <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-brandBlue/15 border-2 border-brandBlue flex items-center justify-center p-1.5 sm:p-2.5 shadow-2xl backdrop-blur-md heartbeat-center">
                                    <div className="w-full h-full rounded-full bg-[#1E3A8A] flex flex-col items-center justify-center text-center p-1 sm:p-2 shadow-inner text-white">
                                        <i className="fa-solid fa-tower-broadcast text-sm sm:text-xl md:text-2xl mb-0.5 text-blue-200"></i>
                                        <span className="text-[8px] sm:text-[10px] md:text-[11px] font-black font-display uppercase tracking-wider leading-tight">EMSTRAP<br />CONNECT</span>
                                    </div>
                                </div>
                                <span className="inline-flex items-center gap-1 text-[8px] sm:text-[9px] font-mono font-bold text-blue-700 bg-white/95 px-2 sm:px-2.5 py-0.5 rounded-full border border-blue-200 shadow-sm mt-1 sm:mt-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    LIVE SYNC
                                </span>
                            </div>

                            {/* SVG Radial Connecting Lines & Thread Loops */}
                            <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 400 400">
                                <defs>
                                    <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                                        <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.8" />
                                    </linearGradient>
                                    <linearGradient id="sweepGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />
                                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0.5" />
                                    </linearGradient>
                                </defs>

                                {/* Rotating Radar Sweep Beam (Turn-wise 6s cycle) */}
                                <g className="radar-sweep-turnwise">
                                    <path d="M 200 200 L 200 40 A 160 160 0 0 1 245 46 Z" fill="url(#sweepGrad)" opacity="0.25" />
                                    <line x1="200" y1="200" x2="200" y2="40" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.7" />
                                </g>

                                {/* Outer Perimeter Thread connecting all 6 nodes in a loop */}
                                <polygon points="200,56 325,105 325,295 200,344 75,295 75,105" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3" />
                                <polygon points="200,56 325,105 325,295 200,344 75,295 75,105" fill="none" stroke="#2563eb" strokeWidth="2.5" className="thread-pulse" opacity="0.9" />

                                {/* Static Guide Dashed Lines from Center to Each Node */}
                                <line x1="200" y1="200" x2="200" y2="56" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6" />
                                <line x1="200" y1="200" x2="325" y2="105" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6" />
                                <line x1="200" y1="200" x2="325" y2="295" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6" />
                                <line x1="200" y1="200" x2="200" y2="344" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6" />
                                <line x1="200" y1="200" x2="75" y2="295" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6" />
                                <line x1="200" y1="200" x2="75" y2="105" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6" />

                                {/* Dynamic Clockwise Turn-Wise Beams (1 -> 2 -> 3 -> 4 -> 5 -> 6) */}
                                <line x1="200" y1="200" x2="200" y2="56" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeDasharray="32 160" className="beam-turn-1" />
                                <line x1="200" y1="200" x2="325" y2="105" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeDasharray="32 160" className="beam-turn-2" />
                                <line x1="200" y1="200" x2="325" y2="295" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeDasharray="32 160" className="beam-turn-3" />
                                <line x1="200" y1="200" x2="200" y2="344" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" strokeDasharray="32 160" className="beam-turn-4" />
                                <line x1="200" y1="200" x2="75" y2="295" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeDasharray="32 160" className="beam-turn-5" />
                                <line x1="200" y1="200" x2="75" y2="105" stroke="#1e3a8a" strokeWidth="3" strokeLinecap="round" strokeDasharray="32 160" className="beam-turn-6" />
                            </svg>

                            {/* Satellite Nodes (Arranged Clockwise with Responsive Scale for Mobile/Tablet/Windows) */}
                            {/* 01. Citizens (Top - 12 o'clock) */}
                            <div className="absolute top-3 sm:top-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                                <div className="relative flex items-center justify-center">
                                    <span className="absolute inset-0 rounded-xl sm:rounded-2xl bg-blue-500/40 ring-turn-1 pointer-events-none"></span>
                                    <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md sm:shadow-lg node-turn-1 relative transition-transform">
                                        <i className="fa-solid fa-users text-sm sm:text-base md:text-lg"></i>
                                    </div>
                                </div>
                                <span className="text-[8px] sm:text-[10px] font-mono font-bold text-slate-800 mt-1 sm:mt-1.5 bg-white/95 px-1.5 sm:px-2.5 py-0.5 rounded shadow-xs border border-slate-200 whitespace-nowrap">Citizens</span>
                            </div>

                            {/* 02. Hospitals (Top Right - 2 o'clock) */}
                            <div className="absolute top-8 sm:top-14 md:top-16 right-3 sm:right-6 md:right-7 z-20 flex flex-col items-center">
                                <div className="relative flex items-center justify-center">
                                    <span className="absolute inset-0 rounded-xl sm:rounded-2xl bg-emerald-500/40 ring-turn-2 pointer-events-none"></span>
                                    <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md sm:shadow-lg node-turn-2 relative transition-transform">
                                        <i className="fa-solid fa-hospital text-sm sm:text-base md:text-lg"></i>
                                    </div>
                                </div>
                                <span className="text-[8px] sm:text-[10px] font-mono font-bold text-slate-800 mt-1 sm:mt-1.5 bg-white/95 px-1.5 sm:px-2.5 py-0.5 rounded shadow-xs border border-slate-200 whitespace-nowrap">Hospitals</span>
                            </div>

                            {/* 03. Government (Bottom Right - 4 o'clock) */}
                            <div className="absolute bottom-8 sm:bottom-14 md:bottom-16 right-3 sm:right-6 md:right-7 z-20 flex flex-col items-center">
                                <div className="relative flex items-center justify-center">
                                    <span className="absolute inset-0 rounded-xl sm:rounded-2xl bg-indigo-500/40 ring-turn-3 pointer-events-none"></span>
                                    <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md sm:shadow-lg node-turn-3 relative transition-transform">
                                        <i className="fa-solid fa-landmark text-sm sm:text-base md:text-lg"></i>
                                    </div>
                                </div>
                                <span className="text-[8px] sm:text-[10px] font-mono font-bold text-slate-800 mt-1 sm:mt-1.5 bg-white/95 px-1.5 sm:px-2.5 py-0.5 rounded shadow-xs border border-slate-200 whitespace-nowrap">Government</span>
                            </div>

                            {/* 04. Control Room (Bottom Center - 6 o'clock) */}
                            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                                <div className="relative flex items-center justify-center">
                                    <span className="absolute inset-0 rounded-xl sm:rounded-2xl bg-slate-700/40 ring-turn-4 pointer-events-none"></span>
                                    <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md sm:shadow-lg node-turn-4 relative transition-transform">
                                        <i className="fa-solid fa-desktop text-sm sm:text-base md:text-lg"></i>
                                    </div>
                                </div>
                                <span className="text-[8px] sm:text-[10px] font-mono font-bold text-slate-800 mt-1 sm:mt-1.5 bg-white/95 px-1.5 sm:px-2.5 py-0.5 rounded shadow-xs border border-slate-200 whitespace-nowrap">Control Room</span>
                            </div>

                            {/* 05. Ambulance (Bottom Left - 8 o'clock) */}
                            <div className="absolute bottom-8 sm:bottom-14 md:bottom-16 left-3 sm:left-6 md:left-7 z-20 flex flex-col items-center">
                                <div className="relative flex items-center justify-center">
                                    <span className="absolute inset-0 rounded-xl sm:rounded-2xl bg-red-500/40 ring-turn-5 pointer-events-none"></span>
                                    <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-md sm:shadow-lg node-turn-5 relative transition-transform">
                                        <i className="fa-solid fa-truck-medical text-sm sm:text-base md:text-lg"></i>
                                    </div>
                                </div>
                                <span className="text-[8px] sm:text-[10px] font-mono font-bold text-slate-800 mt-1 sm:mt-1.5 bg-white/95 px-1.5 sm:px-2.5 py-0.5 rounded shadow-xs border border-slate-200 whitespace-nowrap">Ambulance</span>
                            </div>

                            {/* 06. Police (Top Left - 10 o'clock) */}
                            <div className="absolute top-8 sm:top-14 md:top-16 left-3 sm:left-6 md:left-7 z-20 flex flex-col items-center">
                                <div className="relative flex items-center justify-center">
                                    <span className="absolute inset-0 rounded-xl sm:rounded-2xl bg-blue-900/40 ring-turn-6 pointer-events-none"></span>
                                    <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-[#1E3A8A] text-white flex items-center justify-center shadow-md sm:shadow-lg node-turn-6 relative transition-transform">
                                        <i className="fa-solid fa-shield-halved text-sm sm:text-base md:text-lg"></i>
                                    </div>
                                </div>
                                <span className="text-[8px] sm:text-[10px] font-mono font-bold text-slate-800 mt-1 sm:mt-1.5 bg-white/95 px-1.5 sm:px-2.5 py-0.5 rounded shadow-xs border border-slate-200 whitespace-nowrap">Police</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* 02. REPORT. CONNECT. COORDINATE. RESPOND. (White Background Modern Cards) */}
        {/* ===================================================================== */}
        <section className="py-16 md:py-20 px-6 md:px-12 bg-white text-slate-900 border-b border-slate-100" id="section-02-animated-sequence">
            <div className="max-w-7xl mx-auto space-y-8">
                
                <div className="text-left max-w-3xl">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-brandBlue block mb-2">SYNCHRONIZED PHASES</span>
                    <h2 className="text-2xl sm:text-4xl font-black font-display text-slate-900 tracking-tight">
                        Report. Connect. Coordinate. Respond.
                    </h2>
                </div>

                {/* 4 Step Image Cards Matching Clean Light Design */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    
                    {/* 01 REPORT */}
                    <div className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/90 shadow-sm flex flex-col justify-between group hover:border-red-500/60 hover:shadow-xl transition-all duration-300">
                        <div className="p-6 space-y-2 text-left">
                            <div className="flex items-center gap-2.5">
                                <span className="w-6 h-6 rounded-full bg-red-600 text-white font-mono text-xs font-bold flex items-center justify-center shadow-xs">01</span>
                                <h3 className="text-lg font-bold font-display tracking-wider text-slate-900">REPORT</h3>
                            </div>
                            <p className="text-xs text-slate-600 font-normal leading-relaxed">
                                Citizens report emergencies with real-time information.
                            </p>
                        </div>
                        <div className="h-48 w-full bg-slate-100 overflow-hidden relative border-t border-slate-100">
                            <img src="/images/connect-step-01-report.png" alt="Report Emergency on Mobile" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                    </div>

                    {/* 02 CONNECT */}
                    <div className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/90 shadow-sm flex flex-col justify-between group hover:border-brandBlue/60 hover:shadow-xl transition-all duration-300">
                        <div className="p-6 space-y-2 text-left">
                            <div className="flex items-center gap-2.5">
                                <span className="w-6 h-6 rounded-full bg-brandBlue text-white font-mono text-xs font-bold flex items-center justify-center shadow-xs">02</span>
                                <h3 className="text-lg font-bold font-display tracking-wider text-slate-900">CONNECT</h3>
                            </div>
                            <p className="text-xs text-slate-600 font-normal leading-relaxed">
                                Information reaches the right authorities instantly.
                            </p>
                        </div>
                        <div className="h-48 w-full bg-slate-100 overflow-hidden relative border-t border-slate-100">
                            <img src="/images/connect-step-02-connect.png" alt="Control Room Connectivity" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                    </div>

                    {/* 03 COORDINATE */}
                    <div className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/90 shadow-sm flex flex-col justify-between group hover:border-indigo-500/60 hover:shadow-xl transition-all duration-300">
                        <div className="p-6 space-y-2 text-left">
                            <div className="flex items-center gap-2.5">
                                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center shadow-xs">03</span>
                                <h3 className="text-lg font-bold font-display tracking-wider text-slate-900">COORDINATE</h3>
                            </div>
                            <p className="text-xs text-slate-600 font-normal leading-relaxed">
                                Departments work together on a unified incident.
                            </p>
                        </div>
                        <div className="h-48 w-full bg-slate-100 overflow-hidden relative border-t border-slate-100">
                            <img src="/images/connect-step-03-coordinate.png" alt="Multi-Agency Collaboration" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                    </div>

                    {/* 04 RESPOND */}
                    <div className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/90 shadow-sm flex flex-col justify-between group hover:border-emerald-500/60 hover:shadow-xl transition-all duration-300">
                        <div className="p-6 space-y-2 text-left">
                            <div className="flex items-center gap-2.5">
                                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-mono text-xs font-bold flex items-center justify-center shadow-xs">04</span>
                                <h3 className="text-lg font-bold font-display tracking-wider text-slate-900">RESPOND</h3>
                            </div>
                            <p className="text-xs text-slate-600 font-normal leading-relaxed">
                                Faster, more efficient emergency response.
                            </p>
                        </div>
                        <div className="h-48 w-full bg-slate-100 overflow-hidden relative border-t border-slate-100">
                            <img src="/images/connect-step-04-respond.png" alt="Ambulance Rapid Response" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* 03. THE PROBLEM (DISCONNECTED) (Matching Design Board 03) */}
        {/* ===================================================================== */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-slate-900 text-white relative overflow-hidden" id="section-03-the-problem">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    
                    {/* Left: Problem Description & 7 Red X Points */}
                    <div className="lg:col-span-6 space-y-6 text-left">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400 block">
                            The Problem
                        </span>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
                            Emergency response is often disconnected.
                        </h2>

                        <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                            Information comes from multiple sources, leading to delays, duplicate reports and communication gaps between departments.
                        </p>

                        {/* 7 Bullet Points with Red (X) Matching Attachment 03 */}
                        <div className="space-y-2.5 pt-2">
                            <div className="flex items-center gap-3">
                                <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">&#10005;</span>
                                <span className="text-xs sm:text-sm text-slate-200">Multiple reports about the same incident</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">&#10005;</span>
                                <span className="text-xs sm:text-sm text-slate-200">Incomplete or unclear information</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">&#10005;</span>
                                <span className="text-xs sm:text-sm text-slate-200">Delays in sharing incident details</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">&#10005;</span>
                                <span className="text-xs sm:text-sm text-slate-200">Difficulty identifying exact location</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">&#10005;</span>
                                <span className="text-xs sm:text-sm text-slate-200">Communication gaps between departments</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">&#10005;</span>
                                <span className="text-xs sm:text-sm text-slate-200">Difficulty prioritizing multiple emergencies</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">&#10005;</span>
                                <span className="text-xs sm:text-sm text-slate-200">Limited visibility into ongoing incidents</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Disconnected Photographic Collage (Matching Design 03) */}
                    <div className="lg:col-span-6 relative flex items-center justify-center">
                        <div className="w-full rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative bg-slate-950">
                            <img src="/images/connect-problem-collage.png" alt="Disconnected Emergency Response Collage" loading="lazy" decoding="async" className="w-full h-auto object-cover filter contrast-105" />
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* 04. ONE CONNECTED ECOSYSTEM (SOLUTION) (Matching Design Board 04) */}
        {/* ===================================================================== */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-white border-b border-slate-100" id="section-04-solution">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    
                    {/* Left: Text */}
                    <div className="lg:col-span-5 space-y-4 text-left">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-brandBlue block">
                            The Solution
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-slate-900 tracking-tight leading-tight">
                            From fragmented information to one connected incident.
                        </h2>
                        <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                            EMSTRAP Connect brings all emergency reports into a unified ecosystem, helping authorities respond faster and more effectively.
                        </p>
                    </div>

                    {/* Right: Circular Ecosystem Solution Diagram Matching Design 04 */}
                    <div className="lg:col-span-7 flex items-center justify-center">
                        <div className="relative w-full max-w-[460px] aspect-square rounded-3xl bg-slate-50 border border-slate-200 p-3 sm:p-8 flex items-center justify-center shadow-lg">
                            
                            {/* Central Hub */}
                            <div className="relative z-20 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-[#1E3A8A] text-white flex flex-col items-center justify-center p-2 sm:p-3 text-center node-pulse shadow-xl">
                                <span className="text-[9px] sm:text-[11px] font-black font-display uppercase tracking-wider leading-tight">EMSTRAP<br />CONNECT</span>
                            </div>

                            {/* SVG Radial Lines */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
                                <line x1="200" y1="200" x2="200" y2="60" stroke="#93c5fd" strokeWidth="2" strokeDasharray="3,3" />
                                <line x1="200" y1="200" x2="320" y2="120" stroke="#93c5fd" strokeWidth="2" strokeDasharray="3,3" />
                                <line x1="200" y1="200" x2="320" y2="280" stroke="#93c5fd" strokeWidth="2" strokeDasharray="3,3" />
                                <line x1="200" y1="200" x2="200" y2="340" stroke="#93c5fd" strokeWidth="2" strokeDasharray="3,3" />
                                <line x1="200" y1="200" x2="80" y2="280" stroke="#93c5fd" strokeWidth="2" strokeDasharray="3,3" />
                                <line x1="200" y1="200" x2="80" y2="120" stroke="#93c5fd" strokeWidth="2" strokeDasharray="3,3" />
                            </svg>

                            {/* 6 Satellite Nodes (Citizens, Government, Hospitals, Municipal, Ambulance, Police) */}
                            {/* Citizens (Top) */}
                            <div className="absolute top-3 sm:top-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow">
                                    <i className="fa-solid fa-user text-xs sm:text-sm"></i>
                                </div>
                                <span className="text-[9px] sm:text-[10px] font-bold text-slate-800 mt-1">Citizens</span>
                            </div>

                            {/* Government (Top Right) */}
                            <div className="absolute top-12 sm:top-16 right-3 sm:right-10 z-20 flex flex-col items-center">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-800 text-white flex items-center justify-center shadow">
                                    <i className="fa-solid fa-landmark text-xs sm:text-sm"></i>
                                </div>
                                <span className="text-[9px] sm:text-[10px] font-bold text-slate-800 mt-1">Government</span>
                            </div>

                            {/* Hospitals (Bottom Right) */}
                            <div className="absolute bottom-12 sm:bottom-16 right-3 sm:right-10 z-20 flex flex-col items-center">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow">
                                    <i className="fa-solid fa-hospital text-xs sm:text-sm"></i>
                                </div>
                                <span className="text-[9px] sm:text-[10px] font-bold text-slate-800 mt-1">Hospitals</span>
                            </div>

                            {/* Municipal (Bottom Center) */}
                            <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-teal-600 text-white flex items-center justify-center shadow">
                                    <i className="fa-solid fa-building text-xs sm:text-sm"></i>
                                </div>
                                <span className="text-[9px] sm:text-[10px] font-bold text-slate-800 mt-1">Municipal</span>
                            </div>

                            {/* Ambulance (Bottom Left) */}
                            <div className="absolute bottom-12 sm:bottom-16 left-3 sm:left-10 z-20 flex flex-col items-center">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow">
                                    <i className="fa-solid fa-truck-medical text-xs sm:text-sm"></i>
                                </div>
                                <span className="text-[9px] sm:text-[10px] font-bold text-slate-800 mt-1">Ambulance</span>
                            </div>

                            {/* Police (Top Left) */}
                            <div className="absolute top-12 sm:top-16 left-3 sm:left-10 z-20 flex flex-col items-center">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-900 text-white flex items-center justify-center shadow">
                                    <i className="fa-solid fa-shield text-xs sm:text-sm"></i>
                                </div>
                                <span className="text-[9px] sm:text-[10px] font-bold text-slate-800 mt-1">Police</span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* 05. WHAT IS EMSTRAP CONNECT? (Matching Design Board 05) */}
        {/* ===================================================================== */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-slate-50 border-b border-slate-100" id="section-05-what-is-connect">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    
                    {/* Left: Product Overview */}
                    <div className="lg:col-span-5 space-y-4 text-left">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-brandBlue block">
                            Product Overview
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 tracking-tight leading-tight">
                            A digital communication bridge between citizens and government emergency-response systems.
                        </h2>
                        <p className="text-sm text-slate-600 font-normal leading-relaxed">
                            A citizen can report an emergency with location, description, image and incident details. EMSTRAP Connect processes the report and connects it with the appropriate emergency-response workflow.
                        </p>
                    </div>

                    {/* Right: Mobile App Mockup with 5 Callouts Matching Design 05 */}
                    <div className="lg:col-span-7 flex items-center justify-center">
                        <div className="relative flex flex-col sm:flex-row items-center gap-6 sm:gap-8 max-w-lg w-full">
                            {/* Full Screen Phone Mockup Container */}
                            <div className="w-full max-w-[270px] sm:w-72 rounded-[38px] bg-slate-950 p-3 shadow-2xl border-4 border-slate-800 shrink-0 text-left">
                                <div className="bg-white rounded-[28px] p-4 space-y-3.5 text-slate-900 overflow-hidden shadow-inner">
                                    {/* Mobile Status Bar */}
                                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-900 px-1 pt-0.5">
                                        <span>10:54</span>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-700">
                                            <i className="fa-solid fa-signal"></i>
                                            <i className="fa-solid fa-wifi"></i>
                                            <i className="fa-solid fa-battery-full"></i>
                                        </div>
                                    </div>

                                    {/* Screen Header */}
                                    <div className="flex items-center gap-2 pt-1 border-b border-slate-100 pb-2">
                                        <i className="fa-solid fa-chevron-left text-xs text-brandBlue"></i>
                                        <span className="text-sm font-bold font-display text-slate-900">New Emergency</span>
                                    </div>

                                    {/* 1. Emergency Type Field */}
                                    <div>
                                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">Emergency Type</label>
                                        <div className="px-3 py-2 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-emergencyRed flex items-center justify-between">
                                            <span className="flex items-center gap-2">
                                                <i className="fa-solid fa-car-burst text-xs"></i>
                                                <span>Road Accident</span>
                                            </span>
                                            <i className="fa-solid fa-chevron-down text-[10px] text-red-400"></i>
                                        </div>
                                    </div>

                                    {/* 2. Description Field */}
                                    <div>
                                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">Description</label>
                                        <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium leading-relaxed">
                                            Multiple people injured, need immediate ambulance...
                                        </div>
                                    </div>

                                    {/* 3. Location Field */}
                                    <div>
                                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">Location</label>
                                        <div className="px-3 py-2 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-brandBlue font-mono flex items-center justify-between">
                                            <span className="truncate">12.9716° N, 77.5946° E</span>
                                            <i className="fa-solid fa-location-crosshairs text-xs text-brandBlue"></i>
                                        </div>
                                    </div>

                                    {/* 4. Image Field with preview */}
                                    <div>
                                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">Incident Image</label>
                                        <div className="w-full h-16 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden relative">
                                            <img src="/images/home-police.jpg" alt="Incident preview" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                                            <div className="absolute bottom-1 right-1.5 px-1.5 py-0.5 rounded bg-black/70 text-white font-mono text-[9px]">
                                                Attached
                                            </div>
                                        </div>
                                    </div>

                                    {/* Send Report CTA Button */}
                                    <button className="w-full py-2.5 rounded-xl bg-brandBlue hover:bg-brandBlueDark text-white font-bold text-xs uppercase tracking-wider font-display shadow-md transition-all flex items-center justify-center gap-2">
                                        <span>Send Report</span>
                                        <i className="fa-solid fa-paper-plane text-[10px]"></i>
                                    </button>
                                </div>
                            </div>

                            {/* 5 Callout Badges on Right */}
                            <div className="space-y-3.5 text-left w-full">
                                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                                    <span className="w-6 h-6 rounded-lg bg-blue-50 text-brandBlue flex items-center justify-center text-xs">
                                        <i className="fa-solid fa-list-check"></i>
                                    </span>
                                    <span className="text-xs font-bold text-slate-800">Emergency Type</span>
                                </div>

                                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                                    <span className="w-6 h-6 rounded-lg bg-blue-50 text-brandBlue flex items-center justify-center text-xs">
                                        <i className="fa-solid fa-align-left"></i>
                                    </span>
                                    <span className="text-xs font-bold text-slate-800">Description</span>
                                </div>

                                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                                    <span className="w-6 h-6 rounded-lg bg-blue-50 text-brandBlue flex items-center justify-center text-xs">
                                        <i className="fa-solid fa-location-dot"></i>
                                    </span>
                                    <span className="text-xs font-bold text-slate-800">Location</span>
                                </div>

                                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                                    <span className="w-6 h-6 rounded-lg bg-blue-50 text-brandBlue flex items-center justify-center text-xs">
                                        <i className="fa-solid fa-image"></i>
                                    </span>
                                    <span className="text-xs font-bold text-slate-800">Image</span>
                                </div>

                                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                                    <span className="w-6 h-6 rounded-lg bg-blue-50 text-brandBlue flex items-center justify-center text-xs">
                                        <i className="fa-solid fa-circle-info"></i>
                                    </span>
                                    <span className="text-xs font-bold text-slate-800">Incident Details</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* 06. LOCATION + DESCRIPTION + IMAGE + INCIDENT DETAILS (Design 06) */}
        {/* ===================================================================== */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-white border-b border-slate-100" id="section-06-report-info">
            <div className="max-w-7xl mx-auto space-y-10">
                <div className="text-center max-w-3xl mx-auto">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 block mb-1">Report Information</span>
                    <h2 className="text-3xl md:text-4xl font-black font-display text-slate-900 tracking-tight">
                        Every report adds to a clearer picture.
                    </h2>
                    <p className="text-sm text-slate-600 mt-2 font-normal">
                        Citizens can share key information that helps authorities understand and respond to the incident.
                    </p>
                </div>

                {/* 4 Radiating Cards around central INCIDENT circle (Responsive Across Phone, Tablet, Windows) */}
                <div className="relative w-full max-w-3xl mx-auto p-2 sm:p-4 md:p-6 flex items-center justify-center min-h-[350px] sm:min-h-[390px] md:min-h-[420px] overflow-hidden">
                    {/* Technical Grid & Concentric Guide Rings */}
                    <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-50 pointer-events-none"></div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[240px] sm:w-[320px] h-[240px] sm:h-[320px] rounded-full border border-slate-200/60"></div>
                        <div className="w-[150px] sm:w-[200px] h-[150px] sm:h-[200px] rounded-full border border-blue-200/50"></div>
                    </div>

                    {/* Central Incident Circle (Heartbeat Pulse Effect) */}
                    <div className="relative z-20 flex flex-col items-center justify-center">
                        {/* Heartbeat Expanding Sonar Rings */}
                        <div className="absolute inset-0 -m-3 sm:-m-4 rounded-full border-2 border-brandBlue/35 incident-ripple-1 pointer-events-none"></div>
                        <div className="absolute inset-0 -m-6 sm:-m-8 rounded-full border-2 border-brandBlue/20 incident-ripple-2 pointer-events-none"></div>

                        <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-[#1E3A8A] text-white flex flex-col items-center justify-center text-center p-1 sm:p-2 shadow-2xl border-2 sm:border-4 border-white incident-heartbeat">
                            <i className="fa-solid fa-tower-broadcast text-sm sm:text-lg md:text-xl text-blue-300 mb-0.5 sm:mb-1"></i>
                            <span className="text-[9px] sm:text-xs md:text-sm font-black font-display uppercase tracking-wider">INCIDENT</span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[8px] sm:text-[9px] font-mono font-bold text-blue-700 bg-white/95 px-2 sm:px-2.5 py-0.5 rounded-full border border-blue-200 shadow-sm mt-1 sm:mt-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            ACTIVE FEED
                        </span>
                    </div>

                    {/* SVG Lines & Turn-Wise Beams (preserveAspectRatio none for true responsive coordinate pinning) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 600 400" preserveAspectRatio="none">
                        {/* Perimeter Thread linking all 4 cards in a loop */}
                        <polygon points="135,70 465,70 465,330 135,330" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4,4" />
                        <polygon points="135,70 465,70 465,330 135,330" fill="none" stroke="#2563eb" strokeWidth="2.5" className="thread-flow-4" opacity="0.8" />

                        {/* Static Dashed Trajectories from Center to 4 Nodes */}
                        <line x1="300" y1="200" x2="135" y2="70" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6" />
                        <line x1="300" y1="200" x2="465" y2="70" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6" />
                        <line x1="300" y1="200" x2="465" y2="330" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6" />
                        <line x1="300" y1="200" x2="135" y2="330" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6" />

                        {/* Dynamic Clockwise Turn-Wise Beams (1: Location -> 2: Description -> 3: Details -> 4: Image) */}
                        <line x1="300" y1="200" x2="135" y2="70" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeDasharray="35 220" className="beam-4turn-1" />
                        <line x1="300" y1="200" x2="465" y2="70" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeDasharray="35 220" className="beam-4turn-2" />
                        <line x1="300" y1="200" x2="465" y2="330" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeDasharray="35 220" className="beam-4turn-3" />
                        <line x1="300" y1="200" x2="135" y2="330" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeDasharray="35 220" className="beam-4turn-4" />
                    </svg>

                    {/* Card 1: Location (Top Left - Turn 1) */}
                    <div className="absolute top-2.5 sm:top-5 left-2 sm:left-6 md:left-10 w-[112px] min-[380px]:w-[132px] sm:w-[180px] md:w-[210px] p-2.5 sm:p-3.5 md:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200 shadow-sm text-left z-20 card-4turn-1 transition-transform">
                        <div className="text-brandBlue font-bold text-[11px] sm:text-xs flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-blue-50 flex items-center justify-center text-brandBlue shrink-0">
                                <i className="fa-solid fa-location-dot text-[10px] sm:text-xs"></i>
                            </span>
                            <span className="font-display truncate">Location</span>
                        </div>
                        <p className="text-[9px] sm:text-[11px] text-slate-500 font-medium leading-tight">Lat &amp; Longitude</p>
                    </div>

                    {/* Card 2: Description (Top Right - Turn 2) */}
                    <div className="absolute top-2.5 sm:top-5 right-2 sm:right-6 md:right-10 w-[112px] min-[380px]:w-[132px] sm:w-[180px] md:w-[210px] p-2.5 sm:p-3.5 md:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200 shadow-sm text-left z-20 card-4turn-2 transition-transform">
                        <div className="text-brandBlue font-bold text-[11px] sm:text-xs flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-blue-50 flex items-center justify-center text-brandBlue shrink-0">
                                <i className="fa-solid fa-file-lines text-[10px] sm:text-xs"></i>
                            </span>
                            <span className="font-display truncate">Description</span>
                        </div>
                        <p className="text-[9px] sm:text-[11px] text-slate-500 font-medium leading-tight">Incident details</p>
                    </div>

                    {/* Card 4: Image (Bottom Left - Turn 4) */}
                    <div className="absolute bottom-2.5 sm:bottom-5 left-2 sm:left-6 md:left-10 w-[112px] min-[380px]:w-[132px] sm:w-[180px] md:w-[210px] p-2.5 sm:p-3.5 md:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200 shadow-sm text-left z-20 card-4turn-4 transition-transform">
                        <div className="text-brandBlue font-bold text-[11px] sm:text-xs flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-blue-50 flex items-center justify-center text-brandBlue shrink-0">
                                <i className="fa-solid fa-image text-[10px] sm:text-xs"></i>
                            </span>
                            <span className="font-display truncate">Image</span>
                        </div>
                        <p className="text-[9px] sm:text-[11px] text-slate-500 font-medium leading-tight">Photos from scene</p>
                    </div>

                    {/* Card 3: Incident Details (Bottom Right - Turn 3) */}
                    <div className="absolute bottom-2.5 sm:bottom-5 right-2 sm:right-6 md:right-10 w-[112px] min-[380px]:w-[132px] sm:w-[180px] md:w-[210px] p-2.5 sm:p-3.5 md:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200 shadow-sm text-left z-20 card-4turn-3 transition-transform">
                        <div className="text-brandBlue font-bold text-[11px] sm:text-xs flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-blue-50 flex items-center justify-center text-brandBlue shrink-0">
                                <i className="fa-solid fa-list text-[10px] sm:text-xs"></i>
                            </span>
                            <span className="font-display truncate">Details</span>
                        </div>
                        <p className="text-[9px] sm:text-[11px] text-slate-500 font-medium leading-tight">Time, type, etc.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* 07. ONE INCIDENT, MULTIPLE REPORTS (Matching Design Board 07) */}
        {/* ===================================================================== */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-slate-50 border-b border-slate-100" id="section-07-duplicate-detection">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    
                    {/* Left: Duplicate Detection */}
                    <div className="lg:col-span-5 space-y-4 text-left">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-brandBlue block">
                            Duplicate Detection
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 tracking-tight leading-tight">
                            One Incident.<br />Multiple Reports.
                        </h2>
                        <p className="text-sm text-slate-600 font-normal leading-relaxed">
                            When multiple people report the same incident, EMSTRAP can identify reports from the same location and associate them with a single incident.
                        </p>
                    </div>

                    {/* Right: 5 Reports Converging Into 1 Incident (Taken Out of Card, Elongated Connecting Flow) */}
                    <div className="lg:col-span-7 w-full flex items-center justify-center">
                        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
                            
                            {/* 5 Stacked Citizen Report Pills */}
                            <div className="space-y-2.5 w-full sm:w-48 shrink-0">
                                <div className="p-2.5 px-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs text-xs font-semibold text-slate-800 flex items-center gap-2.5 hover:border-brandBlue hover:shadow-sm transition-all">
                                    <span className="w-6 h-6 rounded-lg bg-blue-50 text-brandBlue flex items-center justify-center text-xs">
                                        <i className="fa-solid fa-user text-[11px]"></i>
                                    </span>
                                    <span>Citizen 1 Report</span>
                                </div>
                                <div className="p-2.5 px-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs text-xs font-semibold text-slate-800 flex items-center gap-2.5 hover:border-brandBlue hover:shadow-sm transition-all">
                                    <span className="w-6 h-6 rounded-lg bg-blue-50 text-brandBlue flex items-center justify-center text-xs">
                                        <i className="fa-solid fa-user text-[11px]"></i>
                                    </span>
                                    <span>Citizen 2 Report</span>
                                </div>
                                <div className="p-2.5 px-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs text-xs font-semibold text-slate-800 flex items-center gap-2.5 hover:border-brandBlue hover:shadow-sm transition-all">
                                    <span className="w-6 h-6 rounded-lg bg-blue-50 text-brandBlue flex items-center justify-center text-xs">
                                        <i className="fa-solid fa-user text-[11px]"></i>
                                    </span>
                                    <span>Citizen 3 Report</span>
                                </div>
                                <div className="p-2.5 px-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs text-xs font-semibold text-slate-800 flex items-center gap-2.5 hover:border-brandBlue hover:shadow-sm transition-all">
                                    <span className="w-6 h-6 rounded-lg bg-blue-50 text-brandBlue flex items-center justify-center text-xs">
                                        <i className="fa-solid fa-user text-[11px]"></i>
                                    </span>
                                    <span>Citizen 4 Report</span>
                                </div>
                                <div className="p-2.5 px-3.5 rounded-xl bg-white border border-slate-200/90 shadow-xs text-xs font-semibold text-slate-800 flex items-center gap-2.5 hover:border-brandBlue hover:shadow-sm transition-all">
                                    <span className="w-6 h-6 rounded-lg bg-blue-50 text-brandBlue flex items-center justify-center text-xs">
                                        <i className="fa-solid fa-user text-[11px]"></i>
                                    </span>
                                    <span>Citizen 5 Report</span>
                                </div>
                            </div>

                            {/* Mobile Vertical Funnel Connector (Visible only on phone screens) */}
                            <div className="flex sm:hidden flex-col items-center justify-center py-2 text-brandBlue w-full">
                                <svg className="w-28 h-12" viewBox="0 0 100 40" fill="none">
                                    <path d="M 10 0 C 10 20, 50 20, 50 40" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3" />
                                    <path d="M 30 0 C 30 20, 50 20, 50 40" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3" />
                                    <path d="M 50 0 L 50 40" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3" />
                                    <path d="M 70 0 C 70 20, 50 20, 50 40" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3" />
                                    <path d="M 90 0 C 90 20, 50 20, 50 40" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3" />
                                    {/* Animated flowing pulse downward */}
                                    <path d="M 50 0 L 50 40" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeDasharray="16 50" className="converge-pulse-1" />
                                </svg>
                                <span className="text-[9px] font-mono text-brandBlue font-bold uppercase tracking-wider mt-0.5">Merging Reports</span>
                            </div>

                            {/* Elongated Connecting Bracket & Animated Signal Funnel (Tablet / Windows Desktop) */}
                            <div className="hidden sm:flex flex-1 items-center justify-center px-2 py-4">
                                <svg className="w-full max-w-[220px] h-[200px]" viewBox="0 0 200 200" fill="none">
                                    {/* Static Dashed Trajectory Lines */}
                                    <path d="M 0 20 C 100 20, 110 100, 200 100" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4,4" />
                                    <path d="M 0 60 C 100 60, 110 100, 200 100" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4,4" />
                                    <path d="M 0 100 L 200 100" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4,4" />
                                    <path d="M 0 140 C 100 140, 110 100, 200 100" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4,4" />
                                    <path d="M 0 180 C 100 180, 110 100, 200 100" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4,4" />

                                    {/* Animated Flowing Pulses converging into 1 Incident */}
                                    <path d="M 0 20 C 100 20, 110 100, 200 100" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="28 200" className="converge-pulse-1" />
                                    <path d="M 0 60 C 100 60, 110 100, 200 100" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="28 200" className="converge-pulse-2" />
                                    <path d="M 0 100 L 200 100" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="28 200" className="converge-pulse-3" />
                                    <path d="M 0 140 C 100 140, 110 100, 200 100" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="28 200" className="converge-pulse-4" />
                                    <path d="M 0 180 C 100 180, 110 100, 200 100" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="28 200" className="converge-pulse-5" />
                                </svg>
                            </div>

                            {/* Target Single Incident Output Card (Enterprise CAD Design) */}
                            <div className="w-full sm:w-64 p-5 rounded-2xl bg-white border border-slate-200 shadow-md text-left space-y-3 relative shrink-0 hover:shadow-lg transition-all">
                                <div className="border-b border-slate-100 pb-2.5">
                                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">INCIDENT #8492</span>
                                </div>

                                <div>
                                    <h4 className="text-base font-bold font-display text-slate-900 tracking-tight">Consolidated Incident</h4>
                                    <p className="text-xs text-slate-500 mt-0.5 font-normal">Geo-anchored &amp; unified response docket</p>
                                </div>

                                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                                    <div className="flex items-center justify-between text-[11px]">
                                        <span className="text-slate-500 font-mono">Merged Reports</span>
                                        <span className="font-bold font-mono text-slate-900">5 Citizen Feeds</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[11px]">
                                        <span className="text-slate-500 font-mono">Location Radius</span>
                                        <span className="font-semibold text-slate-800">45m Accuracy</span>
                                    </div>
                                </div>

                                <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-400">
                                    <span>Single Dispatch Feed</span>
                                    <i className="fa-solid fa-arrow-right text-brandBlue text-[10px]"></i>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* 08. 8-STEP EMSTRAP CONNECT ENGINE (Matching Design Board 08) */}
        {/* ===================================================================== */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-white border-b border-slate-100" id="section-08-engine">
            <div className="max-w-7xl mx-auto space-y-10">
                <div className="text-center max-w-3xl mx-auto">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 block mb-1">How It Works</span>
                    <h2 className="text-3xl md:text-4xl font-black font-display text-slate-900 tracking-tight">
                        From report to resolution.
                    </h2>
                    <p className="text-sm text-slate-600 mt-2 font-normal">
                        A structured 8-step process to ensure faster, smarter and more coordinated emergency response.
                    </p>
                </div>

                {/* 8-Step Stepper Bar Matching Design 08 */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 pt-4">
                    {/* 01 */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2 hover:border-brandBlue transition-all">
                        <div className="w-8 h-8 rounded-full bg-brandBlue text-white font-bold text-xs flex items-center justify-center mx-auto">
                            <i className="fa-solid fa-file-lines text-xs"></i>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 block">01</span>
                        <h4 className="text-xs font-bold font-display text-slate-900">Report</h4>
                    </div>
                    {/* 02 */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2 hover:border-brandBlue transition-all">
                        <div className="w-8 h-8 rounded-full bg-brandBlue text-white font-bold text-xs flex items-center justify-center mx-auto">
                            <i className="fa-solid fa-location-dot text-xs"></i>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 block">02</span>
                        <h4 className="text-xs font-bold font-display text-slate-900">Locate</h4>
                    </div>
                    {/* 03 */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2 hover:border-brandBlue transition-all">
                        <div className="w-8 h-8 rounded-full bg-brandBlue text-white font-bold text-xs flex items-center justify-center mx-auto">
                            <i className="fa-solid fa-fingerprint text-xs"></i>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 block">03</span>
                        <h4 className="text-xs font-bold font-display text-slate-900">Identify</h4>
                    </div>
                    {/* 04 */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2 hover:border-brandBlue transition-all">
                        <div className="w-8 h-8 rounded-full bg-brandBlue text-white font-bold text-xs flex items-center justify-center mx-auto">
                            <i className="fa-solid fa-chart-simple text-xs"></i>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 block">04</span>
                        <h4 className="text-xs font-bold font-display text-slate-900">Analyze</h4>
                    </div>
                    {/* 05 */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2 hover:border-brandBlue transition-all">
                        <div className="w-8 h-8 rounded-full bg-brandBlue text-white font-bold text-xs flex items-center justify-center mx-auto">
                            <i className="fa-solid fa-arrow-down-wide-short text-xs"></i>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 block">05</span>
                        <h4 className="text-xs font-bold font-display text-slate-900">Prioritize</h4>
                    </div>
                    {/* 06 */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2 hover:border-brandBlue transition-all">
                        <div className="w-8 h-8 rounded-full bg-brandBlue text-white font-bold text-xs flex items-center justify-center mx-auto">
                            <i className="fa-solid fa-link text-xs"></i>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 block">06</span>
                        <h4 className="text-xs font-bold font-display text-slate-900">Connect</h4>
                    </div>
                    {/* 07 */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2 hover:border-brandBlue transition-all">
                        <div className="w-8 h-8 rounded-full bg-brandBlue text-white font-bold text-xs flex items-center justify-center mx-auto">
                            <i className="fa-solid fa-arrows-split-up-and-left text-xs"></i>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 block">07</span>
                        <h4 className="text-xs font-bold font-display text-slate-900">Coordinate</h4>
                    </div>
                    {/* 08 */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2 hover:border-brandBlue transition-all">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mx-auto">
                            <i className="fa-solid fa-check text-xs"></i>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 block">08</span>
                        <h4 className="text-xs font-bold font-display text-slate-900">Resolve</h4>
                    </div>
                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* 09. LOCATION INTELLIGENCE (Matching Design Board 09) */}
        {/* ===================================================================== */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-slate-900 text-white relative overflow-hidden" id="section-09-location-intelligence">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    
                    {/* Left: Capabilities & Checkmarks */}
                    <div className="lg:col-span-5 space-y-6 text-left">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400 block">
                            Location Intelligence
                        </span>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
                            Know where the emergency is happening.
                        </h2>

                        <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                            EMSTRAP Connect uses latitude and longitude from emergency reports to identify, organize and visualize incidents geographically.
                        </p>

                        <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-3">
                                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-brandBlue flex items-center justify-center text-xs font-bold">&#10003;</span>
                                <span className="text-sm text-slate-200">Identify incident locations</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-brandBlue flex items-center justify-center text-xs font-bold">&#10003;</span>
                                <span className="text-sm text-slate-200">Detect nearby active incidents</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-brandBlue flex items-center justify-center text-xs font-bold">&#10003;</span>
                                <span className="text-sm text-slate-200">Understand incident patterns</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-brandBlue flex items-center justify-center text-xs font-bold">&#10003;</span>
                                <span className="text-sm text-slate-200">Monitor real-time activity</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Radar Console Visual with Active Incident Card (Design 09) */}
                    <div className="lg:col-span-7 flex items-center justify-center">
                        <div className="w-full rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative bg-slate-950">
                            <img src="/images/connect-location-radar.png" alt="Location Intelligence Radar Display" loading="lazy" decoding="async" className="w-full h-auto object-cover filter contrast-105" />
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* 10. AI-ASSISTED INCIDENT UNDERSTANDING (Matching Design Board 10) */}
        {/* ===================================================================== */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-slate-950 text-white" id="section-10-ai-understanding">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="text-left max-w-3xl">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400 block mb-1">INCIDENT INTELLIGENCE</span>
                    <h2 className="text-2xl sm:text-4xl font-black font-display text-white tracking-tight">
                        Turn emergency reports into actionable information.
                    </h2>
                    <p className="text-sm text-slate-400 mt-2 font-normal">
                        Automated triage and data parsing translates emergency reports into structured operational data for emergency responders.
                    </p>
                </div>

                {/* 3-Part Direct Pipeline (Taken Out of Cards, Steady Permanent Layout) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-4">
                    
                    {/* 1. Raw Report (Direct Content, No Enclosing Card) */}
                    <div className="lg:col-span-4 space-y-3 text-left">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">RAW CITIZEN REPORT</span>
                        </div>
                        <div className="border-l-2 border-blue-500/70 pl-4 py-1">
                            <p className="text-sm sm:text-base text-slate-200 font-light leading-relaxed italic">
                                &ldquo;There has been a road accident. Two people appear injured and one person is unconscious.&rdquo;
                            </p>
                            <span className="text-[11px] font-mono text-slate-500 block mt-2">Source: Mobile SOS &bull; GPS Verified</span>
                        </div>
                    </div>

                    {/* 2. AI Analysis Pipeline (Direct Visual, Stays Permanent) */}
                    <div className="lg:col-span-4 flex flex-col items-center justify-center text-center space-y-4 py-4 lg:py-0">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400 block">AI INGESTION &amp; PARSING</span>
                        <div className="flex items-center justify-center gap-2 h-14">
                            <span className="w-1.5 bg-blue-500 rounded-full wave-bar"></span>
                            <span className="w-1.5 bg-blue-400 rounded-full wave-bar"></span>
                            <span className="w-1.5 bg-indigo-500 rounded-full wave-bar"></span>
                            <span className="w-1.5 bg-blue-400 rounded-full wave-bar"></span>
                            <span className="w-1.5 bg-blue-500 rounded-full wave-bar"></span>
                            <span className="w-1.5 bg-indigo-400 rounded-full wave-bar"></span>
                            <span className="w-1.5 bg-blue-400 rounded-full wave-bar"></span>
                            <span className="w-1.5 bg-blue-500 rounded-full wave-bar"></span>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 font-mono text-[11px] font-semibold">
                            
                            
                        </div>
                    </div>

                    {/* 3. System Understanding (Direct Structured Rows, No Nested Cards) */}
                    <div className="lg:col-span-4 space-y-3 text-left">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">STRUCTURED OUTPUT</span>
                        </div>
                        <div className="divide-y divide-slate-800/80 text-sm">
                            <div className="py-2.5 flex justify-between items-center">
                                <span className="text-xs font-mono text-slate-400">Incident Type</span>
                                <span className="font-bold text-white font-display">Road Accident</span>
                            </div>
                            <div className="py-2.5 flex justify-between items-center">
                                <span className="text-xs font-mono text-slate-400">Severity</span>
                                <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white font-mono font-bold text-[10px] tracking-wide">CRITICAL</span>
                            </div>
                            <div className="py-2.5 flex justify-between items-center">
                                <span className="text-xs font-mono text-slate-400">Assistance</span>
                                <span className="font-semibold text-slate-200">Medical Response Required</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* 11. FINAL CITY (SMART CITIES) (Matching Design Board 11) */}
        {/* ===================================================================== */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-slate-50 border-b border-slate-100" id="section-11-smart-cities">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    
                    {/* Left: Smart City Capabilities */}
                    <div className="lg:col-span-5 space-y-6 text-left">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-brandBlue block">
                            Smart Cities
                        </span>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-slate-900 tracking-tight leading-tight">
                            A connected emergency layer for the city.
                        </h2>

                        <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                            EMSTRAP Connect can become part of a city's broader digital public-safety ecosystem.
                        </p>

                        <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-3">
                                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">&#10003;</span>
                                <span className="text-sm text-slate-700">Receive citizen emergency reports</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">&#10003;</span>
                                <span className="text-sm text-slate-700">Monitor incidents across the city</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">&#10003;</span>
                                <span className="text-sm text-slate-700">Coordinate with departments</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">&#10003;</span>
                                <span className="text-sm text-slate-700">Centralized view of emergency activity</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Smart City Visual with Connected Nodes (Design 11) */}
                    <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-2xl relative bg-slate-950">
                        <img src="/images/connect-smartcity-network.png" alt="Connected Smart City Layer" loading="lazy" decoding="async" className="w-full h-auto object-cover" />
                    </div>

                </div>
            </div>
        </section>

        {/* ============================================================= */}
{/* 12. POLICE DEPARTMENT */}
{/* ============================================================= */}
<section className="py-16 md:py-24 px-6 md:px-12 bg-white border-b border-slate-100"
    id="section-12-police">

    <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            {/* LEFT: POLICE DEPARTMENT CONTENT */}
            <div className="lg:col-span-5 space-y-6 text-left">

                <span className="text-xs font-mono font-bold uppercase tracking-widest text-brandBlue block">
                    Police Departments
                </span>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-slate-900 tracking-tight leading-tight">
                    From citizen report to coordinated response.
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    An additional digital channel for receiving and managing emergency reports.
                </p>

                <div className="space-y-3 pt-2">

                    <div className="flex items-center gap-2.5 text-sm text-slate-700">
                        <span className="w-4 h-4 rounded-full bg-blue-100 text-brandBlue flex items-center justify-center text-[10px]">&#10003;</span>
                        Citizen reporting
                    </div>

                    <div className="flex items-center gap-2.5 text-sm text-slate-700">
                        <span className="w-4 h-4 rounded-full bg-blue-100 text-brandBlue flex items-center justify-center text-[10px]">&#10003;</span>
                        Location-based incidents
                    </div>

                    <div className="flex items-center gap-2.5 text-sm text-slate-700">
                        <span className="w-4 h-4 rounded-full bg-blue-100 text-brandBlue flex items-center justify-center text-[10px]">&#10003;</span>
                        Incident prioritization
                    </div>

                    <div className="flex items-center gap-2.5 text-sm text-slate-700">
                        <span className="w-4 h-4 rounded-full bg-blue-100 text-brandBlue flex items-center justify-center text-[10px]">&#10003;</span>
                        Communication with response teams
                    </div>

                    <div className="flex items-center gap-2.5 text-sm text-slate-700">
                        <span className="w-4 h-4 rounded-full bg-blue-100 text-brandBlue flex items-center justify-center text-[10px]">&#10003;</span>
                        Incident tracking
                    </div>

                    <div className="flex items-center gap-2.5 text-sm text-slate-700">
                        <span className="w-4 h-4 rounded-full bg-blue-100 text-brandBlue flex items-center justify-center text-[10px]">&#10003;</span>
                        Emergency records and reporting
                    </div>

                </div>
            </div>

            {/* RIGHT: SINGLE LARGE IMAGE */}
            <div className="lg:col-span-7">

                <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[470px]\n                            rounded-2xl overflow-hidden shadow-xl\n                            bg-slate-100 group">

                    <img src="/images/connect-police-operator.png" alt="Police officers coordinating emergency incidents in a command centre" className="w-full h-full object-cover object-center\n                               transition-transform duration-700 ease-out\n                               group-hover:scale-[1.03]" loading="lazy" />

                    {/* Subtle image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t\n                                from-slate-950/30 via-transparent to-transparent">
                    </div>

                    {/* Image caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                        <p className="text-white text-xs uppercase tracking-[0.2em] font-semibold mb-2">
                            EMSTRAP CONNECT
                        </p>

                        <h3 className="text-white text-xl sm:text-2xl font-bold">
                            One Connected Emergency Response Network
                        </h3>
                    </div>

                </div>

            </div>

        </div>
    </div>
</section>

        {/* ===================================================================== */}
        {/* 13. MULTI-AGENCY COMMAND (Matching Design Board 13) */}
        {/* ===================================================================== */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-slate-50 border-b border-slate-100" id="section-13-multi-agency">
            <div className="max-w-7xl mx-auto space-y-10">
                <div className="text-center max-w-3xl mx-auto">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 block mb-1">Multiple Government Agencies</span>
                    <h2 className="text-3xl md:text-4xl font-black font-display text-slate-900 tracking-tight">
                        One Incident. Every Relevant Agency.
                    </h2>
                    <p className="text-sm text-slate-600 mt-2 font-normal">
                        EMSTRAP Connect enables collaboration between different departments around a shared incident.
                    </p>
                </div>

                {/* Multi-Agency Radial Layout Matching Design 13 */}
                <div className="relative w-full max-w-2xl mx-auto min-h-[300px] sm:min-h-0 aspect-[16/10] sm:aspect-[16/9] p-3 sm:p-8 flex items-center justify-center">
                    {/* Central Hub: Emergency Control Center / EMSTRAP CONNECT */}
                    <div className="relative z-20 w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-white text-slate-900 border-4 border-brandBlue flex flex-col items-center justify-center p-2 sm:p-3 text-center node-pulse shadow-2xl">
                        <div className="flex items-center justify-center gap-1 sm:gap-1.5">
                            <img src="/images/logo.png" alt="EMSTRAP Logo" className="h-4 sm:h-6 md:h-7 w-auto object-contain" />
                            <span className="text-xs sm:text-base md:text-lg font-black font-display text-brandBlue lowercase tracking-tight">connect</span>
                        </div>
                        <span className="text-[7px] sm:text-[9px] uppercase tracking-wider text-slate-400 font-mono mt-0.5 sm:mt-1 font-semibold">Control Center</span>
                    </div>

                    {/* SVG Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 300">
                        <line x1="250" y1="150" x2="250" y2="40" stroke="#93c5fd" strokeWidth="2" strokeDasharray="3,3" />
                        <line x1="250" y1="150" x2="420" y2="150" stroke="#93c5fd" strokeWidth="2" strokeDasharray="3,3" />
                        <line x1="250" y1="150" x2="80" y2="150" stroke="#93c5fd" strokeWidth="2" strokeDasharray="3,3" />
                        <line x1="250" y1="150" x2="130" y2="250" stroke="#93c5fd" strokeWidth="2" strokeDasharray="3,3" />
                        <line x1="250" y1="150" x2="370" y2="250" stroke="#93c5fd" strokeWidth="2" strokeDasharray="3,3" />
                    </svg>

                    {/* Spokes Matching Design 13 */}
                    {/* Ambulance (Top) */}
                    <div className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow">
                            <i className="fa-solid fa-truck-medical text-xs sm:text-sm"></i>
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-bold text-slate-800 mt-1">Ambulance</span>
                    </div>

                    {/* Police (Left) */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-6 z-20 flex flex-col items-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-900 text-white flex items-center justify-center shadow">
                            <i className="fa-solid fa-shield text-xs sm:text-sm"></i>
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-bold text-slate-800 mt-1">Police</span>
                    </div>

                    {/* Fire & Rescue (Right) */}
                    <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-6 z-20 flex flex-col items-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-600 text-white flex items-center justify-center shadow">
                            <i className="fa-solid fa-fire-extinguisher text-xs sm:text-sm"></i>
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-bold text-slate-800 mt-1 whitespace-nowrap">Fire &amp; Rescue</span>
                    </div>

                    {/* Municipal Authority (Bottom Left) */}
                    <div className="absolute bottom-2 sm:bottom-4 left-3 min-[420px]:left-10 sm:left-20 z-20 flex flex-col items-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-teal-600 text-white flex items-center justify-center shadow">
                            <i className="fa-solid fa-building text-xs sm:text-sm"></i>
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-bold text-slate-800 mt-1">Municipal Authority</span>
                    </div>

                    {/* Other Agencies (Bottom Right) */}
                    <div className="absolute bottom-2 sm:bottom-4 right-3 min-[420px]:right-10 sm:right-20 z-20 flex flex-col items-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow">
                            <i className="fa-solid fa-network-wired text-xs sm:text-sm"></i>
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-bold text-slate-800 mt-1">Other Agencies</span>
                    </div>
                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* 14. KEY BENEFITS (Matching Design Board 14) */}
        {/* ===================================================================== */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-white border-b border-slate-100" id="section-14-key-benefits">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    
                    {/* Left: 7 Numbered Key Benefits */}
                    <div className="lg:col-span-6 space-y-6 text-left">
                        <div>
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brandBlue block mb-1">Key Benefits</span>
                            <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 tracking-tight leading-tight">
                                A stronger, more coordinated emergency response.
                            </h2>
                        </div>

                        <div className="space-y-2.5 pt-2">
                            <div className="flex items-center gap-3">
                                <span className="font-mono font-bold text-slate-400 text-xs w-6">01</span>
                                <span className="text-xs sm:text-sm font-semibold text-slate-800">Faster Information Flow</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-mono font-bold text-slate-400 text-xs w-6">02</span>
                                <span className="text-xs sm:text-sm font-semibold text-slate-800">Better Incident Visibility</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-mono font-bold text-slate-400 text-xs w-6">03</span>
                                <span className="text-xs sm:text-sm font-semibold text-slate-800">Reduced Duplicate Reporting</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-mono font-bold text-slate-400 text-xs w-6">04</span>
                                <span className="text-xs sm:text-sm font-semibold text-slate-800">Location-Based Awareness</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-mono font-bold text-slate-400 text-xs w-6">05</span>
                                <span className="text-xs sm:text-sm font-semibold text-slate-800">Structured Emergency Information</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-mono font-bold text-slate-400 text-xs w-6">06</span>
                                <span className="text-xs sm:text-sm font-semibold text-slate-800">Better Coordination</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-mono font-bold text-slate-400 text-xs w-6">07</span>
                                <span className="text-xs sm:text-sm font-semibold text-slate-800">Scalable for Cities</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Sunset City Backdrop Matching Design 14 */}
                    <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-2xl relative h-[380px] bg-slate-950">
                        <img src="/images/connect-benefits-sunset.png" alt="City Aerial at Sunset" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                    </div>

                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* 15. WHO CAN USE (Matching Design Board 15) */}
        {/* ===================================================================== */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-slate-50 border-b border-slate-100" id="section-15-who-can-use">
            <div className="max-w-7xl mx-auto space-y-10">
                <div className="text-center max-w-3xl mx-auto">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 block mb-1">Who Can Use EMSTRAP Connect?</span>
                    <h2 className="text-3xl md:text-4xl font-black font-display text-slate-900 tracking-tight">
                        Government &amp; Public-Safety Organizations.
                    </h2>
                </div>

                {/* Hub and Spoke for Who Can Use Matching Design 15 (No Card + Added Animated Effects) */}
                <div className="relative w-full max-w-xl mx-auto min-h-[320px] sm:min-h-0 aspect-square p-3 sm:p-8 flex items-center justify-center overflow-hidden">
                    {/* Subtle Technical Radar & Concentric Guide Rings */}
                    <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none"></div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[240px] sm:w-[320px] h-[240px] sm:h-[320px] rounded-full border border-slate-200/60"></div>
                        <div className="w-[150px] sm:w-[200px] h-[150px] sm:h-[200px] rounded-full border border-blue-200/50"></div>
                    </div>

                    {/* Center Hub with Heartbeat Pulsing Rings */}
                    <div className="relative z-20 flex flex-col items-center justify-center">
                        <div className="absolute inset-0 -m-3 sm:-m-4 rounded-full border-2 border-brandBlue/30 heartbeat-ring-1 pointer-events-none"></div>
                        <div className="absolute inset-0 -m-6 sm:-m-8 rounded-full border-2 border-brandBlue/15 heartbeat-ring-2 pointer-events-none"></div>
                        <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-white text-slate-900 flex flex-col items-center justify-center p-2 text-center shadow-2xl border-4 border-brandBlue heartbeat-center">
                            <img src="/images/logo.png" alt="EMSTRAP Logo" className="w-11 sm:w-16 h-auto object-contain" />
                            <span className="text-[7px] sm:text-[9px] font-black font-display uppercase tracking-wider text-brandBlue mt-0.5 leading-none">CONNECT</span>
                        </div>
                    </div>

                    {/* SVG Animated Rays & Flowing Beams */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 400 400">
                        {/* Static Dashed Trajectories */}
                        <line x1="200" y1="200" x2="200" y2="70" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.7" />
                        <line x1="200" y1="200" x2="330" y2="150" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.7" />
                        <line x1="200" y1="200" x2="290" y2="310" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.7" />
                        <line x1="200" y1="200" x2="110" y2="310" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.7" />
                        <line x1="200" y1="200" x2="70" y2="150" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.7" />

                        {/* Dynamic Flowing Beams (Clockwise) */}
                        <line x1="200" y1="200" x2="200" y2="70" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="25 150" className="beam-4turn-1" />
                        <line x1="200" y1="200" x2="330" y2="150" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="25 150" className="beam-4turn-2" />
                        <line x1="200" y1="200" x2="290" y2="310" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="25 150" className="beam-4turn-3" />
                        <line x1="200" y1="200" x2="110" y2="310" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="25 150" className="beam-4turn-4" />
                        <line x1="200" y1="200" x2="70" y2="150" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="25 150" className="beam-4turn-1" />
                    </svg>

                    {/* 5 Spokes */}
                    {/* Smart City Missions (Top) */}
                    <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-20 text-center">
                        <span className="text-[9px] sm:text-[11px] font-bold text-slate-800 bg-slate-50 border border-slate-200 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-sm whitespace-nowrap">Smart City Missions</span>
                    </div>

                    {/* Police Departments (Right) */}
                    <div className="absolute top-1/3 right-1 sm:right-4 z-20 text-center">
                        <span className="text-[9px] sm:text-[11px] font-bold text-slate-800 bg-slate-50 border border-slate-200 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-sm whitespace-nowrap">Police Departments</span>
                    </div>

                    {/* Emergency Control Rooms (Bottom Right) */}
                    <div className="absolute bottom-6 sm:bottom-10 right-2 sm:right-10 z-20 text-center">
                        <span className="text-[9px] sm:text-[11px] font-bold text-slate-800 bg-slate-50 border border-slate-200 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-sm whitespace-nowrap">Emergency Control Rooms</span>
                    </div>

                    {/* Public-Safety Authorities (Bottom Left) */}
                    <div className="absolute bottom-6 sm:bottom-10 left-2 sm:left-10 z-20 text-center">
                        <span className="text-[9px] sm:text-[11px] font-bold text-slate-800 bg-slate-50 border border-slate-200 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-sm whitespace-nowrap">Public-Safety Authorities</span>
                    </div>

                    {/* Government Institutions (Left) */}
                    <div className="absolute top-1/3 left-1 sm:left-4 z-20 text-center">
                        <span className="text-[9px] sm:text-[11px] font-bold text-slate-800 bg-slate-50 border border-slate-200 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-sm whitespace-nowrap">Government Institutions</span>
                    </div>
                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* 16. TRADITIONAL VS EMSTRAP (Matching Design Board 16) */}
        {/* ===================================================================== */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-white" id="section-16-comparison">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center max-w-3xl mx-auto">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 block mb-1">A Connected Approach</span>
                    <h2 className="text-3xl md:text-4xl font-black font-display text-slate-900 tracking-tight">
                        A simpler, more connected flow.
                    </h2>
                </div>

                {/* 2 Side-by-Side Vertical Flows Matching Design 16 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    
                    {/* Left: Traditional Response */}
                    <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 text-left">
                        <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-slate-500">Traditional Response</h3>
                        
                        <div className="space-y-3 font-mono text-xs text-slate-700">
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full border-2 border-slate-400"></span>
                                <span>Citizen</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full border-2 border-slate-400"></span>
                                <span>Phone Call</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full border-2 border-slate-400"></span>
                                <span>Operator</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full border-2 border-slate-400"></span>
                                <span>Department</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full border-2 border-slate-400"></span>
                                <span>Response Team</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: With EMSTRAP Connect */}
                    <div className="p-8 rounded-3xl bg-blue-50/70 border border-blue-200 space-y-4 text-left">
                        <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-brandBlue">With EMSTRAP Connect</h3>
                        
                        <div className="space-y-3 font-mono text-xs text-slate-900 font-semibold">
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full bg-brandBlue"></span>
                                <span>Citizen</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full bg-brandBlue"></span>
                                <span>EMSTRAP Connect</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full bg-brandBlue"></span>
                                <span>Incident</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full bg-brandBlue"></span>
                                <span>Authority</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full bg-brandBlue"></span>
                                <span>Response</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Call to Action Banner */}
                <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-slate-950 text-white text-center space-y-6 shadow-2xl border border-slate-800">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400 block">GOVERNMENT BRIEFING</span>
                    <h3 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white">
                        Connect Your City to a Smarter Emergency Response
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
                        Ready to integrate EMSTRAP Connect into your police command, smart city operations, or public safety infrastructure? Schedule an executive briefing.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                        <button onClick={openDemoModal} className="px-8 py-3.5 rounded-full bg-brandBlue hover:bg-brandBlueDark text-white font-bold tracking-wider text-xs uppercase transition-all shadow-lg hover:shadow-xl font-display hover:scale-105 active:scale-95">
                            Request a Government Demo
                        </button>
                        <Link to="/#page-contact" className="px-8 py-3.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold tracking-wider text-xs uppercase transition-all border border-slate-700 font-display">
                            Contact Public-Safety Team
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    </main>

    {/* ===================================================================== */}
    {/* GLOBAL FOOTER */}
    {/* ===================================================================== */}
    <footer className="bg-[#050505] border-t border-neutral-900 py-10 px-6 md:px-12 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
                <span className="uppercase font-mono tracking-wider text-neutral-400 block mb-1">EMSTRAP CONNECT &bull; PUBLIC SAFETY INFRASTRUCTURE</span>
                <span>&copy; 2026 EMSTRAP Pvt. Ltd. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-6 text-neutral-400">
                <Link to="/#page-about" className="hover:text-white transition-colors">About</Link>
                <Link to="/#page-services" className="hover:text-white transition-colors">Services</Link>
                <Link to="/careers" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Careers</Link>
                <Link to="/#page-contact" className="hover:text-white transition-colors">Contact</Link>
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

    {/* ===================================================================== */}
    {/* GOVERNMENT DEMO REQUEST MODAL */}
    {/* ===================================================================== */}
    <div id="demoModal" className="hidden fixed inset-0 z-50 items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={(e) => { if (e.target === e.currentTarget) closeDemoModal(); }}>
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-6 text-slate-900 shadow-2xl relative">
            <button onClick={closeDemoModal} className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 text-xl">
                <i className="fa-solid fa-xmark"></i>
            </button>
            <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-brandBlue">GOVERNMENT BRIEFING</span>
                <h3 className="text-2xl font-bold font-display text-slate-900 mt-1">Request a Government Demo</h3>
                <p className="text-xs text-slate-500 font-normal mt-1">For Smart City Missions, Police Headquarters, and Municipal Authorities.</p>
            </div>
            <form onSubmit={handleDemoSubmit} className="space-y-4">
                <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Official Name</label>
                    <input type="text" required className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brandBlue" placeholder="Officer / Director Name" />
                </div>
                <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Department / Organization</label>
                    <input type="text" required className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brandBlue" placeholder="e.g. Police Department / Smart City Mission" />
                </div>
                <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Official Email Address</label>
                    <input type="email" required className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brandBlue" placeholder="official@gov.in" />
                </div>
                <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Contact Phone</label>
                    <input type="tel" required className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brandBlue" placeholder="+91 XXXXX XXXXX" />
                </div>
                <button type="submit" className="w-full py-3.5 rounded-full bg-brandBlue hover:bg-brandBlueDark text-white font-bold text-xs uppercase tracking-wider transition-all font-display shadow-md">
                    Submit Government Briefing Request
                </button>
            </form>
        </div>
    </div>

    {/* Scripts */}
    

    </div>
  );
}
