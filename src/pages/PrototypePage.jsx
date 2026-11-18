import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { usePageSetup, sanitizeSafeUrl } from "../utils/emstrapLifecycle";

const PAGE_CSS = "*:focus, *:active, button:focus, div:focus, a:focus, [role=\"button\"]:focus {\n            outline: none !important;\n            box-shadow: none !important;\n        } .page-scope-prototypepage {\n            background-color: #050B14;\n            font-family: 'Inter', sans-serif;\n            overflow-x: clip;\n            background-image: \n                radial-gradient(circle at 10% 20%, rgba(44, 100, 161, 0.05) 0%, transparent 40%),\n                radial-gradient(circle at 90% 80%, rgba(34, 197, 94, 0.04) 0%, transparent 40%);\n            background-attachment: fixed;\n        }\n\n        @media (max-width: 1024px) {\n            .page-scope-prototypepage {\n                background-attachment: scroll;\n            }\n        }\n\n        .font-display {\n            font-family: 'Outfit', sans-serif;\n        }\n\n        /* =====================================================================\n           Staggered scroll-reveal cards\n           ===================================================================== */\n        .wave-card-node {\n            opacity: 0;\n            transform: translateY(70px) rotateX(-10deg);\n            will-change: transform, opacity;\n        }\n\n        .wave-card-node.wave-animate {\n            animation: cardWaveRipple 3s cubic-bezier(0.22, 1, 0.36, 1) forwards;\n        }\n\n        @keyframes cardWaveRipple {\n            0% {\n                opacity: 0;\n                transform: translateY(80px) scale(0.94) rotateX(-12deg) rotateY(-3deg);\n            }\n            55% {\n                opacity: 0.85;\n                transform: translateY(-6px) scale(1.008) rotateX(2deg) rotateY(1deg);\n            }\n            78% {\n                transform: translateY(2px) scale(0.998) rotateX(-1deg);\n            }\n            100% {\n                opacity: 1;\n                transform: translateY(0) scale(1) rotateX(0) rotateY(0);\n            }\n        }";

export default function PrototypePage() {
  usePageSetup({
    title: "EMSTRAP - Functional Prototype",
    bodyClass: "text-slate-100 min-h-screen flex flex-col justify-between",
    themeClass: "theme-milestone",
    customCss: PAGE_CSS,
    enableWave: true,
    enableHeaderAmbulance: true,
  });

  const zoomTimersRef = useRef([]);

  const openZoomModal = (imgSrc) => {
    const safeUrl = sanitizeSafeUrl(imgSrc);
    const modal = document.getElementById("imageZoomModal");
    const img = document.getElementById("zoomedImage");
    if (modal && img && safeUrl) {
      zoomTimersRef.current.forEach((t) => clearTimeout(t));
      zoomTimersRef.current = [];
      img.src = safeUrl;
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      const id = setTimeout(() => {
        img.classList.remove("scale-95");
        img.classList.add("scale-100");
      }, 10);
      zoomTimersRef.current.push(id);
    }
  };

  const closeZoomModal = () => {
    const modal = document.getElementById("imageZoomModal");
    const img = document.getElementById("zoomedImage");
    if (modal && img) {
      zoomTimersRef.current.forEach((t) => clearTimeout(t));
      zoomTimersRef.current = [];
      img.classList.remove("scale-100");
      img.classList.add("scale-95");
      const id = setTimeout(() => {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        img.removeAttribute("src");
      }, 150);
      zoomTimersRef.current.push(id);
    }
  };

  useEffect(() => {
    const images = document.querySelectorAll(".zoomable-img");
    const handlers = [];
    images.forEach((img) => {
      img.classList.add("cursor-zoom-in");
      const handler = (e) => openZoomModal(e.currentTarget.src);
      img.addEventListener("click", handler);
      handlers.push([img, handler]);
    });
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeZoomModal();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      handlers.forEach(([img, h]) => img.removeEventListener("click", h));
      document.removeEventListener("keydown", onKeyDown);
      zoomTimersRef.current.forEach((t) => clearTimeout(t));
      zoomTimersRef.current = [];
    };
  }, []);

  return (
    <div className="page-scope-prototypepage theme-milestone min-h-screen flex flex-col justify-between">
      

    {/* Top Glow Line */}
    <div className="h-1.5 w-full bg-gradient-to-r from-brandBlue via-brandAccent to-brandBlue"></div>

    {/* Header / Navigation */}
    <header className="py-6 px-6 md:px-12 border-b border-white/5 bg-brandDark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 group">
                <div className="h-10 flex items-center transition-transform duration-300 group-hover:scale-105">
                    <img src="/images/logo.png" alt="EMSTRAP Logo" className="h-full w-auto object-contain" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xl font-bold font-display tracking-wider text-white">EMSTRAP</span>
                </div>
            </Link>
            
            <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-xs tracking-wide transition-all duration-300 border border-white/10">
                <i className="fa-solid fa-arrow-left"></i> Back to Home
            </Link>
        </div>
    
            {/* Scroll Progress Ambulance Track */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10">
                <div id="headerAmbulance" className="absolute bottom-0 w-8 h-6 transition-all duration-75 ease-out" style={{"left":"0px","zIndex":"50","marginBottom":"1px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-full h-full" style={{"filter":"drop-shadow(0 0 6px #C9302C)"}}>
                        <path fill="#C9302C" d="M128 32C92.7 32 64 60.7 64 96V352h48c0 26.5 21.5 48 48 48s48-21.5 48-48H384c0 26.5 21.5 48 48 48s48-21.5 48-48h48c35.3 0 64-28.7 64-64V256h-8V224H520c-13.3 0-24-10.7-24-24V144c0-8.8-7.2-16-16-16H384V96c0-35.3-28.7-64-64-64H128zM192 128H288v48H192V128zm0 96H288v48H192V224zM536 256H592c4.4 0 8 3.6 8 8V352c0 8.8-7.2 16-16 16H536V256zM160 384c8.8 0 16 7.2 16 16s-7.2 16-16 16s-16-7.2-16-16s7.2-16 16-16zm272 0c8.8 0 16 7.2 16 16s-7.2 16-16 16s-16-7.2-16-16s7.2-16 16-16z" />
                        <circle cx="320" cy="20" r="28" className="siren-flash" />
                    </svg>
                </div>
                <div id="headerShieldReaction" className="absolute bottom-6 right-8 w-5 h-5 flex items-center justify-center bg-[#2C64A1] rounded-full border border-white/20 p-1 transition-all duration-300 scale-0 opacity-0 translate-y-2 z-55 shadow-[0_0_10px_rgba(44,100,161,0.6)]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-full h-full">
                        <path fill="#ffffff" d="M256 0c4.6 0 9.2 1 13.4 2.9L452.9 82.8c22 9.3 35.1 31.7 35.1 55.4l0 102.5c0 141.8-84.4 269-218.1 328.3c-8.9 3.9-19 3.9-27.9 0C108.4 509.8 24 382.5 24 240.7l0-102.5c0-23.7 13.1-46.1 35.1-55.4L242.6 2.9C246.8 1 251.4 0 256 0z" />
                    </svg>
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-5 flex items-center justify-center" style={{"zIndex":"45","marginBottom":"1px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-full h-full" style={{"filter":"drop-shadow(0 0 4px #C9302C)"}}>
                        <path fill="#C9302C" d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h74.7c58.9 0 106.7 47.8 106.7 106.7V384c0 17.7-14.3 32-32 32h-32v64c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32V416H96c-17.7 0-32-14.3-32-32V298.7zm426.7-106.7c58.9 0 106.7 47.8 106.7 106.7V384c0 17.7-14.3 32-32 32h-32v64c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32V416H416c-17.7 0-32-14.3-32-32V298.7c0-58.9 47.8-106.7 106.7-106.7z" />
                    </svg>
                </div>
            </div>
        </header>

    {/* Main Content Container */}
    <main className="flex-grow py-16 px-6 md:px-12 max-w-4xl mx-auto w-full space-y-20">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto animate-fade-up-1 wave-card-node">
            <span className="text-xs font-bold uppercase text-brandBlue tracking-wider font-display font-mono">Proof of Concept</span>
            <h1 className="text-4xl md:text-5xl font-black font-display text-white mt-3 leading-tight">Functional Prototype</h1>
            <p className="text-slate-400 mt-4 text-base font-light leading-relaxed">
                From Concept to a Working Prototype. The functional prototype successfully validated the core concept behind EMSTRAP by integrating emergency reporting, stakeholder communication, location intelligence, and real-time coordination into a unified digital platform.
            </p>
        </div>

        {/* Section 1: Development Objectives & Capabilities */}
        <div className="space-y-12 wave-card-node">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3">Development Objectives</h2>
                <p className="text-sm text-slate-300 leading-relaxed font-light mb-4">
                    The primary objective of the prototype was to verify that technology could simplify and strengthen emergency response operations by enabling seamless communication between all stakeholders involved in an emergency.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2.5">
                        <i className="fa-solid fa-circle-check text-brandBlue text-sm"></i>
                        <span className="text-slate-200 text-sm">Validate the feasibility of the EMSTRAP concept.</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <i className="fa-solid fa-circle-check text-brandBlue text-sm"></i>
                        <span className="text-slate-200 text-sm">Demonstrate real-time emergency reporting.</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <i className="fa-solid fa-circle-check text-brandBlue text-sm"></i>
                        <span className="text-slate-200 text-sm">Improve communication between emergency stakeholders.</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <i className="fa-solid fa-circle-check text-brandBlue text-sm"></i>
                        <span className="text-slate-200 text-sm">Enable intelligent incident management.</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <i className="fa-solid fa-circle-check text-brandBlue text-sm"></i>
                        <span className="text-slate-200 text-sm">Provide real-time situational awareness.</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <i className="fa-solid fa-circle-check text-brandBlue text-sm"></i>
                        <span className="text-slate-200 text-sm">Create a scalable foundation for future deployment.</span>
                    </div>
                </div>
            </div>

            {/* Capabilities */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3">Prototype Capabilities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    <div className="flex items-start gap-3">
                        <i className="fa-solid fa-triangle-exclamation text-brandBlue mt-1 text-lg shrink-0"></i>
                        <div>
                            <h4 className="font-bold text-white font-display">Smart Reporting</h4>
                            <p className="text-xs text-slate-400 font-light mt-0.5">Quick SOS triggers transmitting exact coordinates and scene descriptions.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <i className="fa-solid fa-location-crosshairs text-brandBlue mt-1 text-lg shrink-0"></i>
                        <div>
                            <h4 className="font-bold text-white font-display">Location Intelligence</h4>
                            <p className="text-xs text-slate-400 font-light mt-0.5">Live GPS tracking of emergency vehicles and responders on active routes.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <i className="fa-solid fa-hospital text-brandBlue mt-1 text-lg shrink-0"></i>
                        <div>
                            <h4 className="font-bold text-white font-display">Hospital Pre-Alerts</h4>
                            <p className="text-xs text-slate-400 font-light mt-0.5">Direct alerts with pre-arrival telemetry sent to triage staff.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <i className="fa-solid fa-route text-brandBlue mt-1 text-lg shrink-0"></i>
                        <div>
                            <h4 className="font-bold text-white font-display">AI-Assisted Decisions</h4>
                            <p className="text-xs text-slate-400 font-light mt-0.5">Smart vehicle allocation and standby placement recommendations.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Section 2: Interactive Workflow Illustration (Formatted like index.html How It Works) */}
        <div className="space-y-8 wave-card-node">
            <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3">Prototype Workflow</h2>
            
            <div className="relative">
                <div className="hidden lg:block absolute top-[40px] left-[8%] right-[8%] h-[2px] bg-brandBlue/20 z-0"></div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 text-center relative z-10">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center group">
                        <div className="w-20 h-20 rounded-2xl bg-[#050B14] border-2 border-brandBlue shadow-[0_0_15px_rgba(0,82,255,0.2)] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                            <i className="fa-solid fa-phone-volume text-2xl text-brandBlue"></i>
                        </div>
                        <span className="text-[10px] font-bold text-brandBlue uppercase tracking-widest mb-1">Step 1</span>
                        <h4 className="text-base font-bold text-white mb-2 font-display">Emergency Report</h4>
                        <p className="text-xs text-slate-400 leading-relaxed px-1">Citizen submits emergency incident report via mobile app</p>
                    </div>
                    {/* Step 2 */}
                    <div className="flex flex-col items-center group">
                        <div className="w-20 h-20 rounded-2xl bg-[#050B14] border-2 border-brandBlue shadow-[0_0_15px_rgba(0,82,255,0.2)] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                            <i className="fa-solid fa-location-dot text-2xl text-brandBlue"></i>
                        </div>
                        <span className="text-[10px] font-bold text-brandBlue uppercase tracking-widest mb-1">Step 2</span>
                        <h4 className="text-base font-bold text-white mb-2 font-display">Location Captured</h4>
                        <p className="text-xs text-slate-400 leading-relaxed px-1">System automatically captures exact GPS coordinates</p>
                    </div>
                    {/* Step 3 */}
                    <div className="flex flex-col items-center group">
                        <div className="w-20 h-20 rounded-2xl bg-[#050B14] border-2 border-brandBlue shadow-[0_0_15px_rgba(0,82,255,0.2)] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                            <i className="fa-solid fa-brain text-2xl text-brandBlue"></i>
                        </div>
                        <span className="text-[10px] font-bold text-brandBlue uppercase tracking-widest mb-1">Step 3</span>
                        <h4 className="text-base font-bold text-white mb-2 font-display">AI Analysis</h4>
                        <p className="text-xs text-slate-400 leading-relaxed px-1">AI triage filters incident severity and recommends dispatch</p>
                    </div>
                    {/* Step 4 */}
                    <div className="flex flex-col items-center group">
                        <div className="w-20 h-20 rounded-2xl bg-[#050B14] border-2 border-brandBlue shadow-[0_0_15px_rgba(0,82,255,0.2)] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                            <i className="fa-solid fa-bell text-2xl text-brandBlue"></i>
                        </div>
                        <span className="text-[10px] font-bold text-brandBlue uppercase tracking-widest mb-1">Step 4</span>
                        <h4 className="text-base font-bold text-white mb-2 font-display">Alert Generated</h4>
                        <p className="text-xs text-slate-400 leading-relaxed px-1">Instant high-priority dispatch notice broadcasted</p>
                    </div>
                    {/* Step 5 */}
                    <div className="flex flex-col items-center group">
                        <div className="w-20 h-20 rounded-2xl bg-[#050B14] border-2 border-brandBlue shadow-[0_0_15px_rgba(0,82,255,0.2)] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                            <i className="fa-solid fa-network-wired text-2xl text-brandBlue"></i>
                        </div>
                        <span className="text-[10px] font-bold text-brandBlue uppercase tracking-widest mb-1">Step 5</span>
                        <h4 className="text-base font-bold text-white mb-2 font-display">Stakeholder Sync</h4>
                        <p className="text-xs text-slate-400 leading-relaxed px-1">Emergency responders, ER triage, and police synchronized</p>
                    </div>
                    {/* Step 6 */}
                    <div className="flex flex-col items-center group">
                        <div className="w-20 h-20 rounded-2xl bg-[#050B14] border-2 border-brandBlue shadow-[0_0_15px_rgba(0,82,255,0.2)] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                            <i className="fa-solid fa-display text-2xl text-brandBlue"></i>
                        </div>
                        <span className="text-[10px] font-bold text-brandBlue uppercase tracking-widest mb-1">Step 6</span>
                        <h4 className="text-base font-bold text-white mb-2 font-display">Real-Time Monitor</h4>
                        <p className="text-xs text-slate-400 leading-relaxed px-1">Continuous live route telemetry tracked in control room</p>
                    </div>
                    {/* Step 7 */}
                    <div className="flex flex-col items-center group">
                        <div className="w-20 h-20 rounded-2xl bg-[#050B14] border-2 border-brandBlue shadow-[0_0_15px_rgba(0,82,255,0.2)] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                            <i className="fa-solid fa-truck-medical text-2xl text-brandBlue"></i>
                        </div>
                        <span className="text-[10px] font-bold text-brandBlue uppercase tracking-widest mb-1">Step 7</span>
                        <h4 className="text-base font-bold text-white mb-2 font-display">Emergency Response</h4>
                        <p className="text-xs text-slate-400 leading-relaxed px-1">Ambulance lands at site for critical medical transport</p>
                </div>
            </div>
            
        </div>

        {/* Section 3: Architecture & Key Features Demonstrated */}
        <div className="space-y-12">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3">Prototype Architecture</h2>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                    The functional prototype was designed using a modular and scalable architecture capable of supporting future expansion and integration with additional emergency response systems.
                </p>
                <div className="flex gap-6 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5"><i className="fa-solid fa-circle text-[6px] text-brandBlue"></i> Scalability</span>
                    <span className="flex items-center gap-1.5"><i className="fa-solid fa-circle text-[6px] text-brandBlue"></i> Reliability</span>
                    <span className="flex items-center gap-1.5"><i className="fa-solid fa-circle text-[6px] text-brandBlue"></i> Security</span>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3">Key Features Demonstrated</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-semibold text-slate-300">
                    <div className="flex items-center gap-2.5"><i className="fa-solid fa-circle-check text-brandBlue text-sm"></i> Live GPS Tracking</div>
                    <div className="flex items-center gap-2.5"><i className="fa-solid fa-circle-check text-brandBlue text-sm"></i> Real-Time Incident Alerts</div>
                    <div className="flex items-center gap-2.5"><i className="fa-solid fa-circle-check text-brandBlue text-sm"></i> AI-assisted Emergency Triage</div>
                    <div className="flex items-center gap-2.5"><i className="fa-solid fa-circle-check text-brandBlue text-sm"></i> Centralized Command View</div>
                </div>
            </div>
        </div>

        {/* Section 4: Highlights Cards */}
        <div className="space-y-6">
            <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3">Development Highlights</h2>
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="text-brandBlue shrink-0 pt-1 text-xl w-6 flex items-center justify-center">
                        <i className="fa-solid fa-vial"></i>
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-white font-display">Proof of Concept</h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-light mt-1">Successfully transformed the initial concept into a fully functional prototype.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="text-brandBlue shrink-0 pt-1 text-xl w-6 flex items-center justify-center">
                        <i className="fa-solid fa-cubes"></i>
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-white font-display">Integrated Platform</h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-light mt-1">Demonstrated seamless interaction between multiple emergency response processes.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="text-brandBlue shrink-0 pt-1 text-xl w-6 flex items-center justify-center">
                        <i className="fa-solid fa-check-double"></i>
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-white font-display">Technology Validation</h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-light mt-1">Verified that the proposed architecture can effectively support active workflows.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="text-brandBlue shrink-0 pt-1 text-xl w-6 flex items-center justify-center">
                        <i className="fa-solid fa-bolt"></i>
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-white font-display">Future Ready</h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-light mt-1">Established a scalable technical foundation for pilot deployments and partnerships.</p>
                    </div>
                </div>
            </div>
        </div>



        {/* Takeaway / Quote Block */}
        <div className="max-w-3xl mx-auto text-center border-t border-white/5 pt-12 space-y-4">
            <h4 className="text-base font-bold text-white font-display">From Concept to WORKING Prototype</h4>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
                The successful development of the functional prototype marked a significant milestone in EMSTRAP's journey. It demonstrated that the concepts validated during field research could be translated into a practical and scalable technology platform.
            </p>
            <p className="text-sm text-slate-400 italic leading-relaxed font-light pt-4 border-t border-white/5 max-w-2xl mx-auto">
                "Innovation becomes impactful when ideas are transformed into working solutions. The EMSTRAP functional prototype demonstrates our commitment to building technology that addresses real-world emergency response challenges through intelligent coordination and digital innovation."
            </p>
        </div>
    </div></main>

    {/* Image Zoom Modal */}
    <div id="imageZoomModal" className="fixed inset-0 z-[100] hidden bg-slate-950/95 backdrop-blur-md items-center justify-center p-4 cursor-zoom-out" onClick={closeZoomModal}>
        <button className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl font-display transition-all" onClick={closeZoomModal}>
            <i className="fa-solid fa-xmark"></i>
        </button>
        <img id="zoomedImage" src={null} alt="Full Screen Preview" className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl transition-transform duration-300 scale-95" onClick={(e) => e.stopPropagation()} />
    </div>

    {/* Footer */}
    <footer className="py-8 px-6 md:px-12 border-t border-white/5 bg-brandDark text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500 font-light">&copy; 2026 EMSTRAP Pvt. Ltd. All Rights Reserved.</span>
            <div className="flex items-center space-x-6 text-xs text-slate-500">
                <Link to="/#page-landing" className="hover:text-white transition-colors">Home</Link>
                <span>&bull;</span>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            </div>
        </div>
    </footer>

    


    </div>
  );
}
