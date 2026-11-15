import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { usePageSetup, sanitizeSafeUrl } from "../utils/emstrapLifecycle";

const PAGE_CSS = "*:focus, *:active, button:focus, div:focus, a:focus, [role=\"button\"]:focus {\n            outline: none !important;\n            box-shadow: none !important;\n        } .page-scope-researchpage {\n            background-color: #050B14;\n            font-family: 'Inter', sans-serif;\n            overflow-x: clip;\n            background-image: \n                radial-gradient(circle at 10% 20%, rgba(44, 100, 161, 0.05) 0%, transparent 40%),\n                radial-gradient(circle at 90% 80%, rgba(34, 197, 94, 0.04) 0%, transparent 40%);\n            background-attachment: fixed;\n        }\n\n        @media (max-width: 1024px) {\n            .page-scope-researchpage {\n                background-attachment: scroll;\n            }\n        }\n\n        .font-display {\n            font-family: 'Outfit', sans-serif;\n        }\n\n        /* =====================================================================\n           Staggered scroll-reveal cards\n           ===================================================================== */\n        .wave-card-node {\n            opacity: 0;\n            transform: translateY(70px) rotateX(-10deg);\n            will-change: transform, opacity;\n        }\n\n        .wave-card-node.wave-animate {\n            animation: cardWaveRipple 3s cubic-bezier(0.22, 1, 0.36, 1) forwards;\n        }\n\n        @keyframes cardWaveRipple {\n            0% {\n                opacity: 0;\n                transform: translateY(80px) scale(0.94) rotateX(-12deg) rotateY(-3deg);\n            }\n            55% {\n                opacity: 0.85;\n                transform: translateY(-6px) scale(1.008) rotateX(2deg) rotateY(1deg);\n            }\n            78% {\n                transform: translateY(2px) scale(0.998) rotateX(-1deg);\n            }\n            100% {\n                opacity: 1;\n                transform: translateY(0) scale(1) rotateX(0) rotateY(0);\n            }\n        }";

export default function ResearchPage() {
  usePageSetup({
    title: "EMSTRAP - Concept & Field Research",
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
    <div className="page-scope-researchpage theme-milestone min-h-screen flex flex-col justify-between">
      

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
            <span className="text-xs font-bold uppercase text-brandBlue tracking-wider font-display font-mono">Concept &amp; Research</span>
            <h1 className="text-4xl md:text-5xl font-black font-display text-white mt-3 leading-tight">Understanding Real-World Challenges</h1>
            <p className="text-slate-400 mt-4 text-base font-light leading-relaxed">
                Every meaningful innovation begins with listening. Before developing EMSTRAP, our team conducted extensive field research by visiting emergency service stakeholders, observing operational workflows, and engaging directly with professionals.
            </p>
        </div>

        {/* Section 1: Why We Started & Methodology */}
        <div className="space-y-12 wave-card-node">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3">Why We Started</h2>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                    Emergency response involves multiple organizations working together under time-critical conditions. While each stakeholder performs an essential role, our objective was to understand how communication, coordination, and operational processes function collectively during emergencies.
                </p>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                    Rather than relying solely on online research or assumptions, we conducted field visits and interacted directly with professionals working in emergency response. These conversations helped us validate real-world challenges and identify opportunities where technology could improve emergency coordination.
                </p>
                <p className="text-sm font-semibold text-brandBlue">
                    This research became the starting point of EMSTRAP.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3">Research Methodology</h2>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                    We followed a field-first research approach to understand the complete emergency response ecosystem. This includes:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                    <div className="flex items-center gap-2.5">
                        <i className="fa-solid fa-circle-check text-brandBlue"></i>
                        <span className="text-sm text-slate-200">Field Visits</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <i className="fa-solid fa-circle-check text-brandBlue"></i>
                        <span className="text-sm text-slate-200">Stakeholder Discussions</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <i className="fa-solid fa-circle-check text-brandBlue"></i>
                        <span className="text-sm text-slate-200">Workflow Observation</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <i className="fa-solid fa-circle-check text-brandBlue"></i>
                        <span className="text-sm text-slate-200">Problem Validation</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <i className="fa-solid fa-circle-check text-brandBlue"></i>
                        <span className="text-sm text-slate-200">Operational Analysis</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <i className="fa-solid fa-circle-check text-brandBlue"></i>
                        <span className="text-sm text-slate-200">Solution Ideation</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Section 2: Research Overview Table & Statistics */}
        <div className="space-y-6 wave-card-node">
            <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3">Research Overview</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                        <tr className="border-b border-white/10 text-brandBlue font-mono uppercase tracking-wider">
                            <th className="pb-3 font-semibold">Research Period</th>
                            <th className="pb-3 font-semibold">Stakeholders Visited</th>
                            <th className="pb-3 font-semibold">Research Objective</th>
                            <th className="pb-3 font-semibold">Outcome</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300 font-light">
                        <tr>
                            <td className="py-4 font-semibold text-white">Initial Research Phase</td>
                            <td className="py-4">Police, Hospitals, Traffic Management Centre, EMRI Green Health Services (108)</td>
                            <td className="py-4">Understand emergency response challenges and operational workflows</td>
                            <td className="py-4 font-semibold text-brandBlue">EMSTRAP Concept &amp; Platform Architecture Finalized</td>
                        </tr>
                    </tbody>
                </table>
            </div>


        </div>

        {/* Section 3: Field Research Journey (Strict Ordered List) */}
        <div className="space-y-12">
            <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3 text-left">Field Research Journey</h2>
            
            {/* Timeline Journey */}
            <div className="space-y-12 relative pl-6 md:pl-8 ml-4">
                {/* 1. Police Station */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-brandBlue flex items-center justify-center text-white font-bold font-mono text-xs">1</span>
                        <h3 className="text-xl font-bold font-display text-white">Police Department Visit</h3>
                    </div>
                    <span className="inline-block text-[10px] font-mono text-brandBlue bg-brandBlue/10 px-2.5 py-1 rounded-full uppercase tracking-wider"><i className="fa-solid fa-location-dot"></i> Bengaluru</span>
                    <div className="space-y-2 text-sm text-slate-300 leading-relaxed font-light">
                        <p><strong>Objective:</strong> To understand how law enforcement manages accidents and emergency incidents.</p>
                        <p><strong>Areas of Discussion:</strong> Accident reporting, incident response procedures, police coordination, emergency communication, and public safety operations.</p>
                    </div>
                    <div className="p-4 bg-brandBlue/5 border border-brandBlue/20 rounded-xl max-w-xl">
                        <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wider mb-1">Key Insight</h5>
                        <p className="text-xs text-slate-300 font-light">Efficient communication between emergency stakeholders is essential for coordinated incident management.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mt-4">
                        <div className="p-2.5 rounded-xl bg-slate-950/40 aspect-[4/3] flex flex-col justify-between overflow-hidden group cursor-zoom-in">
                            <div className="flex-grow flex items-center justify-center overflow-hidden">
                                <img src="/images/police-visit.jpg" loading="lazy" decoding="async" alt="Police Department visit consultation 1" className="zoomable-img max-w-full max-h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-[1.02]" />
                            </div>
                            <div className="p-2 bg-slate-950/20 border-t border-white/5 mt-2 text-center shrink-0">
                                <p className="text-xs font-semibold text-slate-400">Police Department Consultation (Lady Officer &amp; Pink Stakeholder)</p>
                            </div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-950/40 aspect-[4/3] flex flex-col justify-between overflow-hidden group cursor-zoom-in">
                            <div className="flex-grow flex items-center justify-center overflow-hidden">
                                <img src="/images/police-lady-officer.jpg" loading="lazy" decoding="async" alt="Police Department visit consultation 2" className="zoomable-img max-w-full max-h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-[1.02]" />
                            </div>
                            <div className="p-2 bg-slate-950/20 border-t border-white/5 mt-2 text-center shrink-0">
                                <p className="text-xs font-semibold text-slate-400">Police Department Consultation (Lady Officer &amp; White Stakeholder)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. EMRI Green */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-brandBlue flex items-center justify-center text-white font-bold font-mono text-xs">2</span>
                        <h3 className="text-xl font-bold font-display text-white">EMRI Green Health Services (108)</h3>
                    </div>
                    <div className="space-y-2 text-sm text-slate-300 leading-relaxed font-light">
                        <p><strong>Objective:</strong> To study ambulance dispatch operations and understand the emergency medical response workflow.</p>
                        <p><strong>Areas of Discussion:</strong> Emergency call handling, ambulance dispatch process, resource allocation, response time challenges, communication with hospitals, and operational workflow.</p>
                    </div>
                    <div className="p-4 bg-brandBlue/5 border border-brandBlue/20 rounded-xl max-w-xl">
                        <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wider mb-1">Key Insight</h5>
                        <p className="text-xs text-slate-300 font-light">Timely information and effective coordination between emergency responders and healthcare facilities play an important role in improving emergency response efficiency.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mt-4">
                        <div className="p-2.5 rounded-xl bg-slate-950/40 aspect-[4/3] flex flex-col justify-between overflow-hidden group cursor-zoom-in">
                            <div className="flex-grow flex items-center justify-center overflow-hidden">
                                <img src="/images/emri-108-dispatch.jpeg" loading="lazy" decoding="async" alt="EMRI 108 Operations Brochure" className="zoomable-img max-w-full max-h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-[1.02]" onClick={(e) => e.stopPropagation()} />
                            </div>
                            <div className="p-2 bg-slate-950/20 border-t border-white/5 mt-2 text-center shrink-0">
                                <p className="text-xs font-semibold text-slate-400">EMRI 108 Dispatch Operations &amp; Strategy</p>
                            </div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-950/40 aspect-[4/3] flex flex-col justify-between overflow-hidden group cursor-zoom-in">
                            <div className="flex-grow flex items-center justify-center overflow-hidden">
                                <img src="/images/emri-case-types.jpeg" loading="lazy" decoding="async" alt="Emergency Response Case Types Distribution" className="zoomable-img max-w-full max-h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-[1.02]" onClick={(e) => e.stopPropagation()} />
                            </div>
                            <div className="p-2 bg-slate-950/20 border-t border-white/5 mt-2 text-center shrink-0">
                                <p className="text-xs font-semibold text-slate-400">Emergency Response Case Types Distribution</p>
                            </div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-950/40 aspect-[4/3] flex flex-col justify-between overflow-hidden group cursor-zoom-in">
                            <div className="flex-grow flex items-center justify-center overflow-hidden">
                                <img src="/images/emri-office-door.jpg" loading="lazy" decoding="async" alt="EMRI Green Office Door Consultation Visit" className="zoomable-img max-w-full max-h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-[1.02]" onClick={(e) => e.stopPropagation()} />
                            </div>
                            <div className="p-2 bg-slate-950/20 border-t border-white/5 mt-2 text-center shrink-0">
                                <p className="text-xs font-semibold text-slate-400">EMRI Green Stakeholder Office Door Consultation Visit</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. TMC */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-brandBlue flex items-center justify-center text-white font-bold font-mono text-xs">3</span>
                        <h3 className="text-xl font-bold font-display text-white">Traffic Management Centre (TMC)</h3>
                    </div>
                    <div className="space-y-2 text-sm text-slate-300 leading-relaxed font-light">
                        <p><strong>Objective:</strong> To understand how traffic management systems influence emergency vehicle movement and identify opportunities to improve emergency mobility.</p>
                        <p><strong>Areas of Discussion:</strong> Emergency vehicle movement, traffic congestion during emergencies, signal management, incident monitoring, and coordination with emergency responders.</p>
                    </div>
                    <div className="p-4 bg-brandBlue/5 border border-brandBlue/20 rounded-xl max-w-xl">
                        <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wider mb-1">Key Insight</h5>
                        <p className="text-xs text-slate-300 font-light">Traffic conditions significantly influence emergency response time. Better coordination between traffic authorities and emergency responders can improve ambulance mobility during critical situations.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mt-4">
                        <div className="p-2.5 rounded-xl bg-slate-950/40 aspect-[4/3] flex flex-col justify-between overflow-hidden group cursor-zoom-in">
                            <div className="flex-grow flex items-center justify-center overflow-hidden">
                                <img src="/images/research-tmc-team.png" loading="lazy" decoding="async" alt="Team meeting with traffic officers at TMC" className="zoomable-img max-w-full max-h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-[1.02]" onClick={(e) => e.stopPropagation()} />
                            </div>
                            <div className="p-2 bg-slate-950/20 border-t border-white/5 mt-2 text-center shrink-0">
                                <p className="text-xs font-semibold text-slate-400">TMC Control Room Sync</p>
                            </div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-950/40 aspect-[4/3] flex flex-col justify-between overflow-hidden group cursor-zoom-in">
                            <div className="flex-grow flex items-center justify-center overflow-hidden">
                                <img src="/images/tmc-wall-dashboard.jpg" loading="lazy" decoding="async" alt="Traffic Congestion Analytics Wall Dashboard" className="zoomable-img max-w-full max-h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-[1.02]" onClick={(e) => e.stopPropagation()} />
                            </div>
                            <div className="p-2 bg-slate-950/20 border-t border-white/5 mt-2 text-center shrink-0">
                                <p className="text-xs font-semibold text-slate-400">TMC Wall Monitoring Dashboard</p>
                            </div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-950/40 aspect-[4/3] flex flex-col justify-between overflow-hidden group cursor-zoom-in">
                            <div className="flex-grow flex items-center justify-center overflow-hidden">
                                <img src="/research-tmc-visit.jpg" loading="lazy" decoding="async" alt="Infantry Road Traffic Police Consultation Sync" className="zoomable-img max-w-full max-h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-[1.02]" onClick={(e) => e.stopPropagation()} />
                            </div>
                            <div className="p-2 bg-slate-950/20 border-t border-white/5 mt-2 text-center shrink-0">
                                <p className="text-xs font-semibold text-slate-400">Infantry Road Traffic Police Consultation Sync</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Hospital */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-brandBlue flex items-center justify-center text-white font-bold font-mono text-xs">4</span>
                        <h3 className="text-xl font-bold font-display text-white">Hospital Research</h3>
                    </div>
                    <div className="space-y-2 text-sm text-slate-300 leading-relaxed font-light">
                        <p><strong>Objective:</strong> To understand emergency department preparedness and patient handover processes.</p>
                        <p><strong>Areas of Discussion:</strong> Emergency room readiness, patient information before arrival, resource preparedness, ambulance-to-hospital communication, and clinical coordination.</p>
                    </div>
                    <div className="p-4 bg-brandBlue/5 border border-brandBlue/20 rounded-xl max-w-xl">
                        <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wider mb-1">Key Insight</h5>
                        <p className="text-xs text-slate-300 font-light">Providing hospitals with timely pre-arrival information can help emergency departments prepare resources before the patient reaches the hospital.</p>
                    </div>
                    
                    <div className="max-w-xl p-2.5 rounded-xl bg-slate-950/40 aspect-[4/3] flex flex-col justify-between overflow-hidden group cursor-zoom-in mt-4">
                        <div className="flex-grow flex items-center justify-center overflow-hidden">
                            <img src="/images/hospital-er-operations.jpg" loading="lazy" decoding="async" alt="Hospital Visit" className="zoomable-img max-w-full max-h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-[1.02]" />
                        </div>
                        <div className="p-2 bg-slate-950/20 border-t border-white/5 mt-2 text-center shrink-0">
                            <p className="text-xs font-semibold text-slate-400">Hospital ER Operations Consultation</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Section 4: Key Challenges Identified */}
        <div className="space-y-8">
            <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3">Key Challenges Identified</h2>
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="text-brandBlue shrink-0 pt-1 text-xl w-6 flex items-center justify-center">
                        <i className="fa-solid fa-truck-medical"></i>
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-white font-display">Ambulance Response Delays</h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-light mt-1">Emergency vehicles experience significant delays due to traffic congestion, manual dispatch routing, and lack of real-time multi-agency coordination.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="text-brandBlue shrink-0 pt-1 text-xl w-6 flex items-center justify-center">
                        <i className="fa-solid fa-volume-high"></i>
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-white font-display">Misuse of Sirens &amp; Privileges</h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-light mt-1">Concerns regarding the misuse of ambulance sirens in non-critical situations, reducing public compliance and trust in emergency signaling.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="text-brandBlue shrink-0 pt-1 text-xl w-6 flex items-center justify-center">
                        <i className="fa-solid fa-hospital-user"></i>
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-white font-display">Limited Pre-Arrival Hospital Alerts</h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-light mt-1">Hospitals operate blindly without patient telemetry, leaving emergency rooms under-prepared for critical handovers during the Golden Hour.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="text-brandBlue shrink-0 pt-1 text-xl w-6 flex items-center justify-center">
                        <i className="fa-solid fa-comment-slash"></i>
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-white font-display">Fragmented Communication</h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-light mt-1">Police, hospitals, and ambulance providers operate on siloed legacy communications networks, increasing response delays.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="text-brandBlue shrink-0 pt-1 text-xl w-6 flex items-center justify-center">
                        <i className="fa-solid fa-traffic-light"></i>
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-white font-display">Traffic Coordination Challenges</h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-light mt-1">Absence of dynamic green light corridors or real-time communication between transit responders and municipal traffic management centers.</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="text-brandBlue shrink-0 pt-1 text-xl w-6 flex items-center justify-center">
                        <i className="fa-solid fa-eye-slash"></i>
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-white font-display">Limited Situational Awareness</h4>
                        <p className="text-sm text-slate-400 leading-relaxed font-light mt-1">Control rooms operate without geo-tracking dashboard visibility of available ambulances, police units, or ICU beds.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Section 5: From Research to Innovation Mapping */}
        <div className="space-y-6">
            <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3">From Research to Innovation</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                        <tr className="border-b border-white/10 text-brandBlue font-mono uppercase tracking-wider">
                            <th className="pb-3 font-semibold">Research Finding</th>
                            <th className="pb-3 font-semibold">EMSTRAP Solution</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300 font-light">
                        <tr>
                            <td className="py-3 font-semibold text-white">Ambulance Response Delays</td>
                            <td className="py-3">AI-assisted emergency coordination and intelligent dispatch support</td>
                        </tr>
                        <tr>
                            <td className="py-3 font-semibold text-white">Lack of Hospital Alerts</td>
                            <td className="py-3">Real-time hospital notification system</td>
                        </tr>
                        <tr>
                            <td className="py-3 font-semibold text-white">Fragmented Communication</td>
                            <td className="py-3">Unified emergency coordination platform</td>
                        </tr>
                        <tr>
                            <td className="py-3 font-semibold text-white">Traffic Coordination Challenges</td>
                            <td className="py-3">Smart routing and emergency traffic coordination support</td>
                        </tr>
                        <tr>
                            <td className="py-3 font-semibold text-white">Limited Situational Awareness</td>
                            <td className="py-3">Live tracking and operational dashboards</td>
                        </tr>
                        <tr>
                            <td className="py-3 font-semibold text-white">Multi-Agency Coordination</td>
                            <td className="py-3">Integrated platform connecting emergency stakeholders</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        {/* Section 6: Research Impact */}
        <div className="space-y-6">
            <h2 className="text-2xl font-bold font-display text-white border-b border-white/5 pb-3">Research Impact: What This Helped Us Achieve</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div className="space-y-1">
                    <h5 className="text-white font-bold flex items-center gap-2"><i className="fa-solid fa-circle-check text-brandBlue"></i> Validated Real-World Problems</h5>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">Every challenge addressed by EMSTRAP is based on practical observations and stakeholder discussions.</p>
                </div>
                <div className="space-y-1">
                    <h5 className="text-white font-bold flex items-center gap-2"><i className="fa-solid fa-circle-check text-brandBlue"></i> Built Around User Needs</h5>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">The platform architecture was designed using insights collected from emergency service professionals rather than assumptions.</p>
                </div>
                <div className="space-y-1">
                    <h5 className="text-white font-bold flex items-center gap-2"><i className="fa-solid fa-circle-check text-brandBlue"></i> Stronger Product Strategy</h5>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">The research phase directly influenced the development of EMSTRAP Connect, Ride, Shield, and Command.</p>
                </div>
                <div className="space-y-1">
                    <h5 className="text-white font-bold flex items-center gap-2"><i className="fa-solid fa-circle-check text-brandBlue"></i> Long-Term Vision</h5>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">Understanding existing emergency workflows helped establish a scalable roadmap for future innovations.</p>
                </div>
            </div>
        </div>

        {/* Takeaway Block */}
        <div className="max-w-3xl mx-auto text-center border-t border-white/5 pt-12 space-y-3">
            <h4 className="text-base font-bold text-white font-display">Our Biggest Takeaway</h4>
            <p className="text-sm text-slate-400 italic leading-relaxed font-light">
                "Technology alone cannot improve emergency response. Effective emergency management requires better coordination, timely information sharing, and seamless collaboration among all stakeholders. This understanding became the foundation for building EMSTRAP."
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
            <div className="flex items-center gap-3">
                <a href="https://www.linkedin.com/company/emstrap/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-600 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-200" title="LinkedIn" aria-label="Official EMSTRAP LinkedIn">
                        <i className="fa-brands fa-linkedin-in text-sm"></i>
                    </a>
                    <a href="https://www.instagram.com/emstrap_official?stkn=bjN6eXU2cHc5cHJ4" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-600 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-200" title="Instagram" aria-label="Official EMSTRAP Instagram">
                        <i className="fa-brands fa-instagram text-sm"></i>
                    </a>
            </div>
        </div>
    </footer>
    </div>
  );
}
