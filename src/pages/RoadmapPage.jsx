import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { usePageSetup, sanitizeSafeUrl } from "../utils/emstrapLifecycle";

const PAGE_CSS = " .page-scope-roadmappage {\n            background-color: #050B14;\n            font-family: 'Inter', sans-serif;\n            overflow-x: clip;\n            background-image: \n                radial-gradient(circle at 10% 20%, rgba(44, 100, 161, 0.05) 0%, transparent 40%),\n                radial-gradient(circle at 90% 80%, rgba(34, 197, 94, 0.04) 0%, transparent 40%);\n            background-attachment: fixed;\n        }\n\n        @media (max-width: 1024px) {\n            .page-scope-roadmappage {\n                background-attachment: scroll;\n            }\n        }\n\n        .font-display {\n            font-family: 'Outfit', sans-serif;\n        }\n\n        .glass-panel {\n            background: linear-gradient(135deg, rgba(25, 35, 55, 0.85) 0%, rgba(18, 25, 40, 0.9) 100%);\n            backdrop-filter: blur(30px) saturate(130%);\n            -webkit-backdrop-filter: blur(30px) saturate(130%);\n            border: 1px solid rgba(255, 255, 255, 0.12);\n            box-shadow: \n                0 12px 40px rgba(0, 0, 0, 0.6),\n                inset 0 1px 0px rgba(255, 255, 255, 0.1);\n        }\n\n        .shadow-glow-blue {\n            box-shadow: 0 0 15px rgba(44, 100, 161, 0.3);\n        }\n        \n        .shadow-glow-accent {\n            box-shadow: 0 0 15px rgba(34, 197, 94, 0.2);\n        }\n\n        /* =====================================================================\n           Staggered scroll-reveal cards\n           ===================================================================== */\n        .wave-card-node {\n            opacity: 0;\n            transform: translateY(70px) rotateX(-10deg);\n            will-change: transform, opacity;\n        }\n\n        .wave-card-node.wave-animate {\n            animation: cardWaveRipple 3s cubic-bezier(0.22, 1, 0.36, 1) forwards;\n        }\n\n        @keyframes cardWaveRipple {\n            0% {\n                opacity: 0;\n                transform: translateY(80px) scale(0.94) rotateX(-12deg) rotateY(-3deg);\n            }\n            55% {\n                opacity: 0.85;\n                transform: translateY(-6px) scale(1.008) rotateX(2deg) rotateY(1deg);\n            }\n            78% {\n                transform: translateY(2px) scale(0.998) rotateX(-1deg);\n            }\n            100% {\n                opacity: 1;\n                transform: translateY(0) scale(1) rotateX(0) rotateY(0);\n            }\n        }";

export default function RoadmapPage() {
  usePageSetup({
    title: "EMSTRAP - Purpose & Path Roadmap",
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
    <div className="page-scope-roadmappage theme-milestone min-h-screen flex flex-col justify-between">
      

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
    <main className="flex-grow py-16 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16 wave-card-node">
            <span className="text-xs font-bold uppercase text-brandAccent tracking-wider font-display">Execution Path</span>
            <h1 className="text-4xl md:text-6xl font-black font-display text-white mt-3 leading-tight">EMSTRAP Roadmap</h1>
            <p className="text-slate-400 mt-4 text-base md:text-lg font-light leading-relaxed">
                The detailed implementation roadmap showing our phased expansion, AI capabilities, government integration protocols, and long-term 2030 safety vision.
            </p>
        </div>

        {/* Four Roadmap Pillars */}
        <div className="space-y-20">

            {/* Pillar 1: Phased Deployment Strategy */}
            <section className="space-y-8 wave-card-node">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brandBlue/10 border border-brandBlue/30 flex items-center justify-center text-brandBlue">
                        <i className="fa-solid fa-layer-group text-xl"></i>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold font-display text-white">1. Deployment Strategy</h2>
                        <p className="text-xs text-slate-400 font-light mt-0.5">Phased execution scaling from district pilot programs to nationwide coverage.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
                        <span className="text-[10px] font-bold font-mono text-brandBlue bg-brandBlue/10 px-2.5 py-1 rounded-full uppercase tracking-wider">Phase 1</span>
                        <h3 className="text-lg font-bold text-white">District Pilot</h3>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">Onboarding hospitals, local ambulance operators, police dispatchers, and testing initial system integrations in a single pilot district.</p>
                    </div>
                    
                    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
                        <span className="text-[10px] font-bold font-mono text-brandAccent bg-brandAccent/10 px-2.5 py-1 rounded-full uppercase tracking-wider">Phase 2</span>
                        <h3 className="text-lg font-bold text-white">State Deployment</h3>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">Expanding our B2G SaaS coordination layer across multiple districts, building training systems, and refining dispatcher workflows.</p>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
                        <span className="text-[10px] font-bold font-mono text-emergencyRed bg-emergencyRed/10 px-2.5 py-1 rounded-full uppercase tracking-wider">Phase 3</span>
                        <h3 className="text-lg font-bold text-white">Statewide Expansion</h3>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">Deeper municipal integrations with state health departments, police routing systems, and establishing city-wide green light corridors.</p>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
                        <span className="text-[10px] font-bold font-mono text-warmAmber bg-warmAmber/10 px-2.5 py-1 rounded-full uppercase tracking-wider">Phase 4</span>
                        <h3 className="text-lg font-bold text-white">National Rollout</h3>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">Full-scale integration with the national 112 ERSS, Ayushman Bharat Digital Mission (ABDM), and establishing multi-state emergency commands.</p>
                    </div>
                </div>
            </section>

            {/* Pillar 2: Artificial Intelligence Roadmap */}
            <section className="space-y-8 wave-card-node">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brandAccent/10 border border-brandAccent/30 flex items-center justify-center text-brandAccent">
                        <i className="fa-solid fa-brain text-xl"></i>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold font-display text-white">2. Artificial Intelligence Roadmap</h2>
                        <p className="text-xs text-slate-400 font-light mt-0.5">Implementing AI modules to increase response speed and operational accuracy.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-3">
                        <div className="flex items-center gap-3">
                            <i className="fa-solid fa-fire text-emergencyRed text-lg"></i>
                            <h4 className="text-sm font-bold text-white">Fire &amp; Smoke Detection</h4>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">Automatically identifying active fire outbreaks and smoke dispersion coordinates using municipal CCTV streams and drone video feeds.</p>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-3">
                        <div className="flex items-center gap-3">
                            <i className="fa-solid fa-car-burst text-warmAmber text-lg"></i>
                            <h4 className="text-sm font-bold text-white">Road Accident Identification</h4>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">Employing computer vision algorithms on highway cameras to immediately flag traffic collision incidents, reducing reporting time.</p>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-3">
                        <div className="flex items-center gap-3">
                            <i className="fa-solid fa-truck-medical text-brandBlue text-lg"></i>
                            <h4 className="text-sm font-bold text-white">Smart Resource Allocation</h4>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">AI models recommending the optimal fleet mix (BLS vs. ICU ambulances, fire engines, police units) based on emergency severity.</p>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-3">
                        <div className="flex items-center gap-3">
                            <i className="fa-solid fa-route text-brandAccent text-lg"></i>
                            <h4 className="text-sm font-bold text-white">Predictive Demand &amp; Transit</h4>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">Forecasting high-risk incident clusters using historical traffic trends, weather indices, and recommending standby ambulance coordinates.</p>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-3">
                        <div className="flex items-center gap-3">
                            <i className="fa-solid fa-clipboard-list text-slate-300 text-lg"></i>
                            <h4 className="text-sm font-bold text-white">AI Incident Summary</h4>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">Auto-generating structured post-incident reports and logs from dispatcher audio and system telemetry for audit logs.</p>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-3">
                        <div className="flex items-center gap-3">
                            <i className="fa-solid fa-shield-halved text-brandBlue text-lg"></i>
                            <h4 className="text-sm font-bold text-white">Severity Classification</h4>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">Categorizing emergency reports automatically into Low, Medium, High, or Critical severity parameters using natural language models.</p>
                    </div>
                </div>
            </section>

            {/* Pillar 3: Government Integration Roadmap */}
            <section className="space-y-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-warmAmber/10 border border-warmAmber/30 flex items-center justify-center text-warmAmber">
                        <i className="fa-solid fa-building-flag text-xl"></i>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold font-display text-white">3. Government Integration</h2>
                        <p className="text-xs text-slate-400 font-light mt-0.5">Connecting with municipal authorities and national health frameworks.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Integrations List */}
                    <div className="space-y-4">
                        <div className="glass-panel p-5 rounded-2xl border border-white/5 flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-xl bg-brandBlue/10 flex items-center justify-center text-brandBlue shrink-0"><i className="fa-solid fa-phone"></i></div>
                            <div>
                                <h4 className="text-sm font-bold text-white">National 112 ERSS Interface</h4>
                                <p className="text-xs text-slate-400 mt-1 font-light">Syncing and relaying critical incident parameters from municipal 112 call systems directly to nearby ambulance responders.</p>
                            </div>
                        </div>

                        <div className="glass-panel p-5 rounded-2xl border border-white/5 flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-xl bg-brandAccent/10 flex items-center justify-center text-brandAccent shrink-0"><i className="fa-solid fa-route"></i></div>
                            <div>
                                <h4 className="text-sm font-bold text-white">Traffic Control Corridors</h4>
                                <p className="text-xs text-slate-400 mt-1 font-light">Interfacing with municipal traffic management centers to clear congestion pathways dynamically using automatic GPS corridors.</p>
                            </div>
                        </div>

                        <div className="glass-panel p-5 rounded-2xl border border-white/5 flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-xl bg-emergencyRed/10 flex items-center justify-center text-emergencyRed shrink-0"><i className="fa-solid fa-network-wired"></i></div>
                            <div>
                                <h4 className="text-sm font-bold text-white">Ayushman Bharat Mission Sync</h4>
                                <p className="text-xs text-slate-400 mt-1 font-light">Establishing ABDM integrations for secure, consent-based retrieval of patient health IDs during transit.</p>
                            </div>
                        </div>
                    </div>

                    {/* Integration Overview */}
                    <div className="glass-panel p-8 rounded-3xl border border-white/5 space-y-4 flex flex-col justify-between">
                        <div>
                            <h4 className="text-base font-bold font-display text-white mb-2">Collaboration &amp; Compliance</h4>
                            <p className="text-xs text-slate-400 leading-relaxed font-light">
                                EMSTRAP is designed to align with government objectives under the **Smart Cities Mission**, **Digital India initiative**, and state health mission programs. 
                                <br /><br />
                                Our integrations are planned in phases to adapt to each participating state agency's specific data security, routing constraints, and fleet setups without requiring capital-heavy hardware replacements.
                            </p>
                        </div>
                        <div className="bg-brandDark p-4 rounded-xl border border-white/5 flex gap-3 items-center">
                            <i className="fa-solid fa-shield text-brandAccent"></i>
                            <span className="text-[10px] text-slate-300 font-mono">100% HIPAA and Digital Personal Data Protection (DPDP) compliant.</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pillar 4: Future Vision (2030 Roadmap) */}
            <section className="space-y-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emergencyRed/10 border border-emergencyRed/30 flex items-center justify-center text-emergencyRed">
                        <i className="fa-solid fa-eye text-xl"></i>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold font-display text-white">4. Future Vision — 2030 Roadmap</h2>
                        <p className="text-xs text-slate-400 font-light mt-0.5">The long-term vision building a national emergency intelligence network.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-2">
                        <h4 className="text-sm font-bold text-white">Drone-Assisted Assessments</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">Deploying autonomous drone units to incident scenes ahead of responders to provide live video assessments and emergency triage insights.</p>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-2">
                        <h4 className="text-sm font-bold text-white">IoT Telemetry Streaming</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">Equipping ambulances with smart wearable sensors to stream critical patient vitals directly to receiving hospitals in real-time.</p>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-2">
                        <h4 className="text-sm font-bold text-white">AI-Powered Command Centers</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">Expanding command centers with automated, predictive decision-support dashboards to handle city-wide disaster response operations.</p>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-2">
                        <h4 className="text-sm font-bold text-white">Autonomous Signal Preemption</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">Smart cities intersection controllers automatically clearing transit intersections as emergency vehicles approach.</p>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-2">
                        <h4 className="text-sm font-bold text-white">Wearable SOS Ecosystem</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">Providing wearable emergency alert devices with GPS transmitters for at-risk individuals and elderly patients.</p>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-2">
                        <h4 className="text-sm font-bold text-white">National Intelligence Network</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-light">Unifying all state emergency response deployments into one national command layer for coordinated disaster defense.</p>
                    </div>
                </div>
            </section>

        </div>
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
