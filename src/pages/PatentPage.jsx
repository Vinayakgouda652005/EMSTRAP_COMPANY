import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { usePageSetup, sanitizeSafeUrl } from "../utils/emstrapLifecycle";

const PAGE_CSS = "*:focus, *:active, button:focus, div:focus, a:focus, [role=\"button\"]:focus {\n            outline: none !important;\n            box-shadow: none !important;\n        } .page-scope-patentpage {\n            background-color: #050B14;\n            font-family: 'Inter', sans-serif;\n            overflow-x: clip;\n            background-image: \n                radial-gradient(circle at 10% 20%, rgba(44, 100, 161, 0.05) 0%, transparent 40%),\n                radial-gradient(circle at 90% 80%, rgba(34, 197, 94, 0.04) 0%, transparent 40%);\n            background-attachment: fixed;\n        }\n\n        @media (max-width: 1024px) {\n            .page-scope-patentpage {\n                background-attachment: scroll;\n            }\n        }\n\n        .font-display {\n            font-family: 'Outfit', sans-serif;\n        }\n\n        /* =====================================================================\n           Staggered scroll-reveal cards\n           ===================================================================== */\n        .wave-card-node {\n            opacity: 0;\n            transform: translateY(70px) rotateX(-10deg);\n            will-change: transform, opacity;\n        }\n\n        .wave-card-node.wave-animate {\n            animation: cardWaveRipple 3s cubic-bezier(0.22, 1, 0.36, 1) forwards;\n        }\n\n        @keyframes cardWaveRipple {\n            0% {\n                opacity: 0;\n                transform: translateY(80px) scale(0.94) rotateX(-12deg) rotateY(-3deg);\n            }\n            55% {\n                opacity: 0.85;\n                transform: translateY(-6px) scale(1.008) rotateX(2deg) rotateY(1deg);\n            }\n            78% {\n                transform: translateY(2px) scale(0.998) rotateX(-1deg);\n            }\n            100% {\n                opacity: 1;\n                transform: translateY(0) scale(1) rotateX(0) rotateY(0);\n            }\n        }";

export default function PatentPage() {
  usePageSetup({
    title: "EMSTRAP - Patent Filing & Publication",
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
    <div className="page-scope-patentpage theme-milestone min-h-screen flex flex-col justify-between">
      

    {/* Top Glow Line */}
    <div className="h-1.5 w-full bg-gradient-to-r from-brandBlue via-brandAccent to-brandBlue"></div>

    {/* Header / Navigation */}
    <header className="py-6 px-6 md:px-12 border-b border-white/5 bg-brandDark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 group">
                <div className="h-10 flex items-center transition-transform duration-300 group-hover:scale-105">
                    <img src="/logo.png" alt="EMSTRAP Logo" className="h-full w-auto object-contain" />
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
            <span className="text-xs font-bold uppercase text-brandBlue tracking-wider font-display font-mono">Intellectual Property</span>
            <h1 className="text-4xl md:text-5xl font-black font-display text-white mt-3 leading-tight">Patent Filing &amp; Publication</h1>
            <p className="text-slate-400 mt-4 text-base font-light leading-relaxed">
                Innovation is meaningful only when it is protected. As EMSTRAP evolved from research into a practical solution, we took an important step towards safeguarding our innovation by filing a patent for our unique emergency response methodology and system.
            </p>
        </div>

        {/* Section 1: Why We Filed & Innovation */}
        <div className="space-y-12 wave-card-node">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3">Why We Filed a Patent</h2>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                    During our field research, we identified several operational challenges within the emergency response ecosystem, including delayed communication, fragmented coordination, and the lack of real-time incident information.
                </p>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                    To address these challenges, our team developed a unique approach that combines intelligent emergency reporting, AI-assisted decision support, and real-time coordination between multiple emergency stakeholders.
                </p>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                    Recognising the originality of this approach, we initiated the patent process to protect our innovation and support its future development.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3">Innovation Behind the Patent</h2>
                <p className="text-sm text-slate-300 leading-relaxed font-light mb-4">
                    Our patent focuses on improving emergency response by enabling intelligent coordination between emergency stakeholders through an integrated digital platform.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-semibold text-white">
                    <div className="flex items-start gap-2.5">
                        <i className="fa-solid fa-brain text-brandBlue mt-1"></i>
                        <div>
                            <h4 className="text-slate-200">AI Response Workflows</h4>
                            <p className="text-xs text-slate-400 font-light mt-0.5">Intelligent routing triggers and triage automation.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                        <i className="fa-solid fa-file-invoice text-brandBlue mt-1"></i>
                        <div>
                            <h4 className="text-slate-200">Incident Reporting</h4>
                            <p className="text-xs text-slate-400 font-light mt-0.5">Smart incident registration and GPS coordinate mapping.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                        <i className="fa-solid fa-users-viewfinder text-brandBlue mt-1"></i>
                        <div>
                            <h4 className="text-slate-200">Stakeholder Sync</h4>
                            <p className="text-xs text-slate-400 font-light mt-0.5">Real-time coordination hubs for dispatchers, hospital ERs, and drivers.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                        <i className="fa-solid fa-route text-brandBlue mt-1"></i>
                        <div>
                            <h4 className="text-slate-200">Smart Routing Loops</h4>
                            <p className="text-xs text-slate-400 font-light mt-0.5">Preemptive traffic corridor signal management.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Section 2: Patent Journey Timeline */}
        <div className="space-y-6 wave-card-node">
            <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3">Patent Journey</h2>
            <div className="relative pl-6 space-y-8 max-w-2xl">
                <div className="relative">
                    <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-brandBlue border-4 border-brandDark"></span>
                    <h4 className="text-sm font-bold text-white font-display">1. Problem Identification</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Field research helped identify critical gaps in emergency response operations, communication protocols, and hospital alert deficiencies.</p>
                </div>
                <div className="relative">
                    <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-brandBlue border-4 border-brandDark"></span>
                    <h4 className="text-sm font-bold text-white font-display">2. Solution Development</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">Our team conceptualised an integrated emergency response ecosystem capable of improving communication and dispatch coordination.</p>
                </div>
                <div className="relative">
                    <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-brandBlue border-4 border-brandDark"></span>
                    <h4 className="text-sm font-bold text-white font-display">3. Innovation Documentation</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">The detailed technical concept, claims structures, database configurations, and supporting documents were prepared for formal patent submission.</p>
                </div>
                <div className="relative">
                    <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-brandBlue border-4 border-brandDark"></span>
                    <h4 className="text-sm font-bold text-white font-display">4. Patent Filing</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">The innovation was formally submitted for intellectual property protection under Application No. 202541077796 A on August 14, 2025.</p>
                </div>
                <div className="relative">
                    <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-brandBlue border-4 border-brandDark"></span>
                    <h4 className="text-sm font-bold text-white font-display">5. Patent Publication</h4>
                    <p className="text-xs text-slate-400 font-light mt-1">The patent application was officially published in the Patent Office Journal on August 29, 2025, marking a critical milestone in protecting EMSTRAP's innovation.</p>
                    <div className="max-w-md overflow-hidden rounded-xl transition-all group cursor-zoom-in mt-4">
                        <img
                            src="/patent-publication.png"
                            loading="lazy"
                            decoding="async"
                            alt="EMSTRAP Patent Application Publication"
                            className="zoomable-img w-full h-auto object-contain rounded-lg transition-transform duration-500"
                            onError={(e) => {
                                if (e.currentTarget.parentElement) {
                                    e.currentTarget.parentElement.style.display = "none";
                                }
                            }}
                        />
                        <div className="p-3 bg-slate-950/40 border-t border-white/5">
                            <p className="text-[11px] font-semibold text-slate-400">Patent Office Official Journal Excerpt</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Section 3: Patent Highlights */}
        <div className="space-y-6">
            <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3">Patent Highlights</h2>
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="text-brandBlue shrink-0 pt-1 text-xl w-6 flex items-center justify-center">
                        <i className="fa-solid fa-scroll"></i>
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-white font-display">Original Innovation</h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-light mt-1">Developed through extensive field research and problem validation directly with operators.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="text-brandBlue shrink-0 pt-1 text-xl w-6 flex items-center justify-center">
                        <i className="fa-solid fa-lightbulb"></i>
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-white font-display">Technology Driven</h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-light mt-1">Focused on improving emergency coordination using intelligent digital solutions.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="text-brandBlue shrink-0 pt-1 text-xl w-6 flex items-center justify-center">
                        <i className="fa-solid fa-lock"></i>
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-white font-display">Intellectual Property Protection</h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-light mt-1">Innovation protected through Indian Patent laws and formal registration frameworks.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="text-brandBlue shrink-0 pt-1 text-xl w-6 flex items-center justify-center">
                        <i className="fa-solid fa-rocket"></i>
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-white font-display">Foundation for Growth</h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-light mt-1">Supports continuous advancement of the EMSTRAP ecosystem and state collaborations.</p>
                    </div>
                </div>
            </div>
        </div>



        {/* Takeaway / Quote Block */}
        <div className="max-w-3xl mx-auto text-center border-t border-white/5 pt-12 space-y-4">
            <h4 className="text-base font-bold text-white font-display">From Research to Protection</h4>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
                The patent represents the transition from research into protected innovation. The knowledge gathered through discussions with hospitals, police departments, traffic authorities, and emergency service providers was transformed into an original technological concept designed to improve emergency response coordination.
            </p>
            <p className="text-sm text-slate-400 italic leading-relaxed font-light pt-4 border-t border-white/5 max-w-2xl mx-auto">
                "Innovation is not just about creating something new—it is about creating something meaningful and protecting it for the future. Our patent represents EMSTRAP's commitment to developing original technology that has the potential to transform emergency response."
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
