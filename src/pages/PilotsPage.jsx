import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { usePageSetup, sanitizeSafeUrl } from "../utils/emstrapLifecycle";

const PAGE_CSS = "*:focus, *:active, button:focus, div:focus, a:focus, [role=\"button\"]:focus {\n            outline: none !important;\n            box-shadow: none !important;\n        } .page-scope-pilotspage {\n            background-color: #050B14;\n            font-family: 'Inter', sans-serif;\n            overflow-x: clip;\n            background-image: \n                radial-gradient(circle at 10% 20%, rgba(44, 100, 161, 0.05) 0%, transparent 40%),\n                radial-gradient(circle at 90% 80%, rgba(34, 197, 94, 0.04) 0%, transparent 40%);\n            background-attachment: fixed;\n        }\n\n        @media (max-width: 1024px) {\n            .page-scope-pilotspage {\n                background-attachment: scroll;\n            }\n        }\n\n        .font-display {\n            font-family: 'Outfit', sans-serif;\n        }\n\n        /* =====================================================================\n           Staggered scroll-reveal cards\n           ===================================================================== */\n        .wave-card-node {\n            opacity: 0;\n            transform: translateY(70px) rotateX(-10deg);\n            will-change: transform, opacity;\n        }\n\n        .wave-card-node.wave-animate {\n            animation: cardWaveRipple 3s cubic-bezier(0.22, 1, 0.36, 1) forwards;\n        }\n\n        @keyframes cardWaveRipple {\n            0% {\n                opacity: 0;\n                transform: translateY(80px) scale(0.94) rotateX(-12deg) rotateY(-3deg);\n            }\n            55% {\n                opacity: 0.85;\n                transform: translateY(-6px) scale(1.008) rotateX(2deg) rotateY(1deg);\n            }\n            78% {\n                transform: translateY(2px) scale(0.998) rotateX(-1deg);\n            }\n            100% {\n                opacity: 1;\n                transform: translateY(0) scale(1) rotateX(0) rotateY(0);\n            }\n        }";

export default function PilotsPage() {
  usePageSetup({
    title: "EMSTRAP - Pilot Programs & Strategic Collaborations",
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
    <div className="page-scope-pilotspage theme-milestone min-h-screen flex flex-col justify-between">
      

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
            <span className="text-xs font-bold uppercase text-brandBlue tracking-wider font-display font-mono">Stakeholder Engagement</span>
            <h1 className="text-4xl md:text-5xl font-black font-display text-white mt-3 leading-tight">Pilot Programs &amp; Strategic Collaborations</h1>
            <p className="text-slate-400 mt-4 text-base font-light leading-relaxed">
                Validating Innovation Through Real-World Partnerships. With the successful development of a functional prototype, EMSTRAP entered the phase of engaging with government agencies, healthcare institutions, emergency providers, and industry partners.
            </p>
        </div>

        {/* Section 1: Objectives & Collaboration Vision */}
        <div className="space-y-12 wave-card-node">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3">Objective</h2>
                <p className="text-sm text-slate-350 leading-relaxed font-light font-light">
                    The objective of this phase is to transition from a working prototype to real-world implementation by collaborating with organizations that play a critical role in emergency response.
                </p>
                <p className="text-sm text-slate-350 leading-relaxed font-light font-light">
                    Through these partnerships, EMSTRAP aims to validate its technology, refine workflows, and ensure the platform addresses operational requirements before large-scale deployment.
                </p>
            </div>

            {/* Vision */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3">Collaboration Vision</h2>
                <p className="text-sm text-slate-350 leading-relaxed font-light mb-4 font-light">
                    EMSTRAP is designed to work alongside the existing emergency ecosystem—not replace it. Our strategy focuses on bringing together:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-semibold text-slate-200">
                    <div className="flex items-center gap-2.5">
                        <i className="fa-solid fa-car-burst text-brandBlue"></i>
                        <span>Police Departments</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <i className="fa-solid fa-truck-medical text-brandBlue"></i>
                        <span>Ambulance Operators</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <i className="fa-solid fa-hospital text-brandBlue"></i>
                        <span>Hospitals &amp; ERs</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <i className="fa-solid fa-traffic-light text-brandBlue"></i>
                        <span>Traffic Authorities</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Section 2: Strategic Engagements */}
        <div className="space-y-6 wave-card-node">
            <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3">Strategic Engagements</h2>
            <p className="text-sm text-slate-350 leading-relaxed font-light">
                Our pilot program strategy relies on close collaboration with key emergency stakeholders. We work directly with traffic management authorities to integrate smart traffic priority signaling and clear vital transit corridors. In parallel, our partnerships with regional hospitals and healthcare facilities enable automated pre-arrival alerts to improve ER emergency preparedness. We actively cooperate with local ambulance service providers to refine intelligent dispatch routing, and align with police departments to streamline multi-agency accident response coordination. By connecting these critical partners onto a single unified platform, EMSTRAP ensures a seamless flow of real-time communication that significantly reduces emergency response times.
            </p>
        </div>

        {/* Section 3: Pilot Objectives & Expected Impact */}
        <div className="space-y-12">
            {/* Pilot Objectives */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3">Pilot Objectives</h2>
                <p className="text-sm text-slate-300 leading-relaxed font-light mb-4">
                    The pilot phase is designed to evaluate the platform under real operational conditions.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm font-semibold text-slate-200">
                    <div className="flex items-center gap-2"><i className="fa-solid fa-check text-brandBlue text-sm"></i> Validate usability</div>
                    <div className="flex items-center gap-2"><i className="fa-solid fa-check text-brandBlue text-sm"></i> Collect feedback</div>
                    <div className="flex items-center gap-2"><i className="fa-solid fa-check text-brandBlue text-sm"></i> Improve workflows</div>
                    <div className="flex items-center gap-2"><i className="fa-solid fa-check text-brandBlue text-sm"></i> Measure efficiency</div>
                </div>
            </div>

            {/* Expected Impact */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3">Expected Impact</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <h4 className="font-bold text-white text-base font-display flex items-center gap-2"><i className="fa-solid fa-circle-nodes text-brandBlue"></i> Improved Coordination</h4>
                        <p className="text-xs text-slate-400 font-light leading-relaxed">Connecting emergency stakeholders through a unified platform.</p>
                    </div>
                    <div className="space-y-1">
                        <h4 className="font-bold text-white text-base font-display flex items-center gap-2"><i className="fa-solid fa-bolt text-brandBlue"></i> Faster Information Flow</h4>
                        <p className="text-xs text-slate-400 font-light leading-relaxed">Reducing communication delays during critical moments.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Section 4: Current Progress Timeline */}
        <div className="space-y-6">
            <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3">Current Progress</h2>
            <div className="relative pl-6 space-y-6 max-w-xl">
                <div className="relative">
                    <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-brandBlue border-4 border-brandDark"></span>
                    <span className="text-[10px] text-brandBlue font-mono font-bold uppercase tracking-wider block">Completed</span>
                    <h4 className="text-sm font-bold text-white font-display">Research Completed</h4>
                </div>
                <div className="relative">
                    <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-brandBlue border-4 border-brandDark"></span>
                    <span className="text-[10px] text-brandBlue font-mono font-bold uppercase tracking-wider block">Completed</span>
                    <h4 className="text-sm font-bold text-white font-display">Patent Filed &amp; Published</h4>
                </div>
                <div className="relative">
                    <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-brandBlue border-4 border-brandDark"></span>
                    <span className="text-[10px] text-brandBlue font-mono font-bold uppercase tracking-wider block">Completed</span>
                    <h4 className="text-sm font-bold text-white font-display">Functional Prototype Developed</h4>
                </div>
                <div className="relative">
                    <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-brandBlue border-4 border-brandDark"></span>
                    <span className="text-[10px] text-brandBlue font-mono font-bold uppercase tracking-wider block">Active</span>
                    <h4 className="text-sm font-bold text-white font-display">Strategic Collaborations</h4>
                </div>
                <div className="relative">
                    <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-slate-800 border-4 border-brandDark"></span>
                    <span className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider block">Upcoming</span>
                    <h4 className="text-sm font-bold text-slate-400 font-display">Pilot Deployments</h4>
                </div>
                <div className="relative">
                    <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-slate-800 border-4 border-brandDark"></span>
                    <span className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider block">Upcoming</span>
                    <h4 className="text-sm font-bold text-slate-400 font-display">Commercial Launch</h4>
                </div>
            </div>
        </div>



        {/* Looking Ahead / Takeaway Block */}
        <div className="max-w-3xl mx-auto text-center border-t border-white/5 pt-12 space-y-4">
            <h4 className="text-base font-bold text-white font-display">Looking Ahead</h4>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
                The partnerships established during this phase will play an important role in refining EMSTRAP and preparing the platform for broader implementation. Feedback from pilot collaborations will guide future enhancements and help ensure that the solution meets the practical needs of emergency response organisations.
            </p>
            <p className="text-sm text-slate-400 italic leading-relaxed font-light pt-4 border-t border-white/5 max-w-2xl mx-auto">
                "Innovation creates possibilities, but collaboration creates impact. By working alongside hospitals, emergency responders, government agencies, and industry partners, EMSTRAP aims to transform validated ideas into real-world solutions that strengthen emergency response."
            </p>
        </div>
    </main>

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
