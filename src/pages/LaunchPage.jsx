import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { usePageSetup, sanitizeSafeUrl } from "../utils/emstrapLifecycle";

const PAGE_CSS = "*:focus, *:active, button:focus, div:focus, a:focus, [role=\"button\"]:focus {\n            outline: none !important;\n            box-shadow: none !important;\n        } .page-scope-launchpage {\n            background-color: #050B14;\n            font-family: 'Inter', sans-serif;\n            overflow-x: clip;\n            background-image: \n                radial-gradient(circle at 10% 20%, rgba(44, 100, 161, 0.05) 0%, transparent 40%),\n                radial-gradient(circle at 90% 80%, rgba(34, 197, 94, 0.04) 0%, transparent 40%);\n            background-attachment: fixed;\n        }\n\n        @media (max-width: 1024px) {\n            .page-scope-launchpage {\n                background-attachment: scroll;\n            }\n        }\n\n        .font-display {\n            font-family: 'Outfit', sans-serif;\n        }\n\n        /* =====================================================================\n           Staggered scroll-reveal cards\n           ===================================================================== */\n        .wave-card-node {\n            opacity: 0;\n            transform: translateY(70px) rotateX(-10deg);\n            will-change: transform, opacity;\n        }\n\n        .wave-card-node.wave-animate {\n            animation: cardWaveRipple 3s cubic-bezier(0.22, 1, 0.36, 1) forwards;\n        }\n\n        @keyframes cardWaveRipple {\n            0% {\n                opacity: 0;\n                transform: translateY(80px) scale(0.94) rotateX(-12deg) rotateY(-3deg);\n            }\n            55% {\n                opacity: 0.85;\n                transform: translateY(-6px) scale(1.008) rotateX(2deg) rotateY(1deg);\n            }\n            78% {\n                transform: translateY(2px) scale(0.998) rotateX(-1deg);\n            }\n            100% {\n                opacity: 1;\n                transform: translateY(0) scale(1) rotateX(0) rotateY(0);\n            }\n        }";

export default function LaunchPage() {
  usePageSetup({
    title: "EMSTRAP - Launch & Market Expansion",
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
    <div className="page-scope-launchpage theme-milestone min-h-screen flex flex-col justify-between">
      

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
        <div className="text-center max-w-3xl mx-auto wave-card-node">
            <span className="text-xs font-bold uppercase text-brandBlue tracking-wider font-display font-mono">Market Rollout</span>
            <h1 className="text-4xl md:text-5xl font-black font-display text-white mt-3 leading-tight">Launch &amp; Market Expansion</h1>
            <p className="text-slate-400 mt-4 text-base font-light leading-relaxed">
                Transforming Innovation into Real-World Impact. Following successful prototype validation and strategic collaborations, EMSTRAP enters its next phase—bringing its emergency response platform to organisations that need it most.
            </p>
        </div>

        {/* Section 1: Our Mission & Launch Strategy */}
        <div className="space-y-12 wave-card-node">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3">Our Mission</h2>
                <p className="text-sm text-slate-350 leading-relaxed font-light mb-4 font-light">
                    EMSTRAP was created with a clear mission:
                </p>
                <p className="text-sm text-slate-300 font-medium italic border-l-2 border-brandBlue pl-4 mb-4">
                    "To improve emergency response by enabling faster communication, better coordination, and intelligent decision-making through technology."
                </p>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                    Every deployment represents another step toward making emergency services more efficient and accessible nationwide.
                </p>
            </div>

            {/* Launch Strategy Phases */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3">Launch Strategy</h2>
                <div className="space-y-6 text-sm">
                    <div className="flex gap-4">
                        <span className="text-brandBlue font-bold font-mono uppercase text-[10px] w-16 shrink-0 pt-1">Phase 1</span>
                        <div>
                            <h4 className="font-bold text-white text-base font-display">Bengaluru Pilot Deployments</h4>
                            <p className="text-slate-400 mt-0.5 font-light">Initial implementation with selected partners (GVK EMRI, hospital networks, traffic control) to validate real-world platform performance.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-brandBlue font-bold font-mono uppercase text-[10px] w-16 shrink-0 pt-1">Phase 2</span>
                        <div>
                            <h4 className="font-bold text-white text-base font-display">Market Launch</h4>
                            <p className="text-slate-400 mt-0.5 font-light">Initial commercial launch across private and public sectors, deploying EMSTRAP modules to active responder fleets and enterprise partners.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Section 2: Market Focus */}
        <div className="space-y-6 wave-card-node">
            <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3">Market Focus</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <div className="flex items-start gap-3">
                    <span className="text-lg text-brandBlue shrink-0 mt-0.5"><i className="fa-solid fa-hospital"></i></span>
                    <div>
                        <h4 className="text-sm font-bold text-white font-display">Hospitals</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-light mt-0.5">Improving emergency preparedness and patient coordination.</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <span className="text-lg text-brandBlue shrink-0 mt-0.5"><i className="fa-solid fa-truck-medical"></i></span>
                    <div>
                        <h4 className="text-sm font-bold text-white font-display">Ambulance Providers</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-light mt-0.5">Enhancing dispatch efficiency and operational visibility.</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <span className="text-lg text-brandBlue shrink-0 mt-0.5"><i className="fa-solid fa-building-shield"></i></span>
                    <div>
                        <h4 className="text-sm font-bold text-white font-display">Public Safety</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-light mt-0.5">Supporting faster communication and coordinated emergency management.</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <span className="text-lg text-brandBlue shrink-0 mt-0.5"><i className="fa-solid fa-building"></i></span>
                    <div>
                        <h4 className="text-sm font-bold text-white font-display">Enterprises</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-light mt-0.5">Strengthening workplace emergency preparedness and employee safety.</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <span className="text-lg text-brandBlue shrink-0 mt-0.5"><i className="fa-solid fa-landmark"></i></span>
                    <div>
                        <h4 className="text-sm font-bold text-white font-display">Government</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-light mt-0.5">Providing scalable technology to support emergency response initiatives.</p>
                    </div>
                </div>

            </div>
        </div>

        {/* Section 3: Growth Roadmap (Timeline) */}
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3">Growth Roadmap</h2>
                <p className="text-xs text-slate-400 mt-1 font-light">The strategic execution stages of the EMSTRAP emergency ecosystem.</p>
            </div>
            
            <div className="space-y-8 py-2">
                {/* Phase 1: Research */}
                <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-x-2.5">
                        <span className="text-xs font-bold font-mono text-brandBlue tracking-wider">PHASE 1</span>
                        <span className="text-slate-600 text-xs font-mono">•</span>
                        <h4 className="text-base font-bold text-white font-display">Research &amp; Validation</h4>
                        <span className="text-slate-500 text-xs font-mono font-medium">(Q3 2024 - Q1 2025)</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed font-light max-w-3xl">Thorough field research, consultations, and survey sessions with traffic operators, ambulance networks, and emergency medical specialists to diagnose coordination delays.</p>
                </div>

                {/* Phase 2: Patent */}
                <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-x-2.5">
                        <span className="text-xs font-bold font-mono text-brandBlue tracking-wider">PHASE 2</span>
                        <span className="text-slate-600 text-xs font-mono">•</span>
                        <h4 className="text-base font-bold text-white font-display">Patent &amp; IP Protection</h4>
                        <span className="text-slate-500 text-xs font-mono font-medium">(Q2 2025 - Q3 2025)</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed font-light max-w-3xl">Officially filed and published EMSTRAP's core emergency transit coordination methods and routing automation under Indian Patent Application No. 202541077796 A.</p>
                </div>

                {/* Phase 3: Prototype */}
                <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-x-2.5">
                        <span className="text-xs font-bold font-mono text-brandBlue tracking-wider">PHASE 3</span>
                        <span className="text-slate-600 text-xs font-mono">•</span>
                        <h4 className="text-base font-bold text-white font-display">Prototype Development</h4>
                        <span className="text-slate-500 text-xs font-mono font-medium">(Q3 2025 - Q4 2025)</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed font-light max-w-3xl">Assembled working prototypes for real-time SOS logging, dispatcher command dashboards, live GPS routing trackers, and hospital notification services.</p>
                </div>

                {/* Phase 4: Pilots */}
                <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-x-2.5">
                        <span className="text-xs font-bold font-mono text-brandBlue tracking-wider">PHASE 4</span>
                        <span className="text-slate-600 text-xs font-mono">•</span>
                        <h4 className="text-base font-bold text-white font-display">Stakeholder Pilots</h4>
                        <span className="text-slate-500 text-xs font-mono font-medium">(Q1 2026 - Q2 2026)</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed font-light max-w-3xl">Conducted validation programs with GVK EMRI, hospital ER staff, and district police to test live ambulance booking simulation and route tracking reliability.</p>
                </div>

                {/* Phase 5: Launch */}
                <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-x-2.5">
                        <span className="text-xs font-bold font-mono text-brandBlue tracking-wider">PHASE 5</span>
                        <span className="text-slate-600 text-xs font-mono">•</span>
                        <h4 className="text-base font-bold text-white font-display">Market Launch</h4>
                        <span className="text-slate-500 text-xs font-mono font-medium">(Q3 2026 onwards)</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed font-light max-w-3xl">Official rollout of the EMSTRAP system in Bengaluru, establishing local medical transport and hospital channels, and onboarding enterprise client groups.</p>
                </div>
            </div>
        </div>

        {/* Section 4: Expansion Priorities */}
        <div className="space-y-6">
            <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3">Expansion Priorities</h2>
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="text-brandBlue shrink-0 pt-1 text-xl w-6 flex items-center justify-center">
                        <i className="fa-solid fa-handshake"></i>
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-white font-display">Strategic Partnerships</h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-light mt-1">Building long-term collaborations across the emergency response ecosystem.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="text-brandBlue shrink-0 pt-1 text-xl w-6 flex items-center justify-center">
                        <i className="fa-solid fa-download"></i>
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-white font-display">Platform Adoption</h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-light mt-1">Supporting organisations in adopting digital emergency management solutions.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="text-brandBlue shrink-0 pt-1 text-xl w-6 flex items-center justify-center">
                        <i className="fa-solid fa-rotate"></i>
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-white font-display">Continuous Innovation</h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-light mt-1">Enhancing the platform through stakeholder feedback and emerging technologies.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="text-brandBlue shrink-0 pt-1 text-xl w-6 flex items-center justify-center">
                        <i className="fa-solid fa-server"></i>
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-white font-display">Scalable Infrastructure</h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-light mt-1">Developing a secure and reliable platform capable of supporting large-scale deployments.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Section 5: Long-Term Vision */}
        <div className="space-y-6">
            <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3 text-left font-display">Our Long-Term Vision</h2>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
                We envision a future where emergency response is no longer fragmented but connected through intelligent technology. Our goal is to enable every emergency stakeholder—from hospitals and ambulance providers to enterprises and government agencies—to collaborate seamlessly through a unified digital ecosystem.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
                By continuously innovating and expanding our partnerships, EMSTRAP aims to contribute to safer communities, faster emergency response, and improved public safety.
        </p></div>
    </main>

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
