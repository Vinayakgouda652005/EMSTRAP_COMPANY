import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageSetup, showEmstrapAlert, submitEmstrapModalRequest } from "../utils/emstrapLifecycle";

const PAGE_CSS = ".hero-gradient-overlay {\n            background: linear-gradient(to right, rgba(5, 11, 20, 0.95) 0%, rgba(5, 11, 20, 0.85) 45%, rgba(5, 11, 20, 0.55) 75%, rgba(5, 11, 20, 0.25) 100%);\n        }\n        .card-zoom-img {\n            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);\n        }\n        .card-hover-box:hover .card-zoom-img {\n            transform: scale(1.05);\n        }";

export default function EducationalCampusesPage() {
  usePageSetup({
    title: "Educational Institutions & Campus Safety | EMSTRAP Solutions",
    bodyClass: "bg-white text-slate-900 font-sans selection:bg-brandBlue selection:text-white antialiased",
    themeClass: "theme-solutions",
    customCss: PAGE_CSS,
    enableWave: false,
    enableHeaderAmbulance: false,
  });

  const openSolutionModal = () => {
    const modal = document.getElementById("solutionModal");
    if (modal) {
      modal.classList.remove("hidden", "opacity-0");
      modal.classList.add("flex");
    }
  };

  const closeSolutionModal = () => {
    const modal = document.getElementById("solutionModal");
    if (modal) {
      modal.classList.add("hidden", "opacity-0");
      modal.classList.remove("flex");
    }
  };

  const handleSolutionSubmit = (e) =>
    submitEmstrapModalRequest({
      event: e,
      requestType: "Educational Campuses Demo & Briefing Request",
      successMessage: "Thank you! Our campus emergency specialist will contact you shortly.",
      onSuccess: closeSolutionModal,
    });

  useEffect(() => {
    const btn = document.getElementById("mobileMenuBtn");
    const menu = document.getElementById("mobileMenu");
    const toggleMobile = () => {
      if (menu) menu.classList.toggle("hidden");
    };
    if (btn) btn.addEventListener("click", toggleMobile);
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeSolutionModal();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      if (btn) btn.removeEventListener("click", toggleMobile);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="page-scope-educationalcampusespage theme-solutions min-h-screen flex flex-col justify-between">
      

    {/* ===================================================================== */}
    {/* GLOBAL NAVIGATION HEADER */}
    {/* ===================================================================== */}
   
{/* GLOBAL NAVIGATION HEADER */}
<header
    id="mainHeader"
    className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm"
>
    <div className="max-w-7xl mx-auto px-6 md:px-12 h-[76px] flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center shrink-0 group">
            <img
                src="/images/logo.png"
                alt="EMSTRAP Logo"
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-7">
            <a href="#home" className="text-sm font-semibold text-slate-700 hover:text-brandBlue transition-colors">
                Home
            </a>

            <a href="#challenges" className="text-sm font-semibold text-slate-700 hover:text-brandBlue transition-colors">
                Challenges
            </a>

            <a href="#solutions" className="text-sm font-semibold text-slate-700 hover:text-brandBlue transition-colors">
                Solutions
            </a>

            <a href="#benefits" className="text-sm font-semibold text-slate-700 hover:text-brandBlue transition-colors">
                Benefits
            </a>

            <a href="#ecosystem" className="text-sm font-semibold text-slate-700 hover:text-brandBlue transition-colors">
                Ecosystem
            </a>

            <a href="/contact" className="text-sm font-semibold text-slate-700 hover:text-brandBlue transition-colors">
                Contact
            </a>
        </nav>


        {/* MOBILE MENU BUTTON */}
        <button
            id="mobileMenuBtn"
            type="button"
            aria-label="Toggle navigation menu"
            aria-controls="mobileMenu"
            aria-expanded="false"
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-800 hover:bg-slate-100"
        >
            <i className="fa-solid fa-bars text-lg"></i>
        </button>
    </div>

    {/* MOBILE NAVIGATION */}
    <div id="mobileMenu" className="hidden lg:hidden bg-white border-t border-slate-200 shadow-lg">
        <nav className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-4">

            {[
                ["Home", "#home"],
                ["Challenges", "#challenges"],
                ["Solutions", "#solutions"],
                ["Benefits", "#benefits"],
                ["Ecosystem", "#ecosystem"],
                ["Contact", "#contact"]
            ].map(([label, href]) => (
                <a
                    key={label}
                    href={href}
                    onClick={() => {
                        document.getElementById("mobileMenu")?.classList.add("hidden");
                        document.getElementById("mobileMenuBtn")?.setAttribute("aria-expanded", "false");
                    }}
                    className="text-sm font-semibold text-slate-700 hover:text-brandBlue py-1 transition-colors"
                >
                    {label}
                </a>
            ))}

            
        </nav>
    </div>
</header>

        
    

    <main className="flex-grow">

        {/* ===================================================================== */}
        {/* HERO SECTION */}
        {/* ===================================================================== */}
        <section id="home" className="relative bg-[#050B14] text-white min-h-[480px] sm:min-h-[560px] lg:min-h-[620px] flex items-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img src="/images/shield-campus.jpg" alt="Educational Campus Safety" className="w-full h-full object-cover object-center" decoding="async" />
                <div className="absolute inset-0 hero-gradient-overlay"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 sm:py-20 lg:py-24 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    
                    {/* Left Hero Content */}
                    <div className="lg:col-span-7 space-y-6 max-w-2xl">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-brandBlue block">CAMPUS & INSTITUTIONAL SAFETY</span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-[1.08]">
                            A Safer Campus<br />Starts With Preparedness.
                        </h1>

                        <p className="text-base sm:text-lg text-white/80 font-normal leading-relaxed">
                            EMSTRAP helps schools, colleges, and university campuses respond instantly to medical emergencies, fire incidents, and campus safety threats through a unified coordination platform.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <a href="#solutions" className="px-8 py-3.5 rounded-full bg-brandBlue hover:bg-brandBlueDark text-white font-bold tracking-wider text-xs uppercase transition-all shadow-lg hover:shadow-xl font-display hover:scale-105 active:scale-95 inline-flex items-center gap-2">
                                <span>Get Started</span>
                                <i className="fa-solid fa-arrow-down text-[10px]"></i>
                            </a>
                            <button onClick={openSolutionModal} className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold tracking-wider text-xs uppercase transition-all border border-white/30 backdrop-blur-md font-display hover:scale-105 active:scale-95">
                                Request a Demo
                            </button>
                        </div>

                        {/* Tag Pills */}
                        <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-2 text-xs font-medium text-white/60">
                            <span>Universities</span>
                            <span className="text-white/20">|</span>
                            <span>Colleges</span>
                            <span className="text-white/20">|</span>
                            <span>K-12 Schools</span>
                            <span className="text-white/20">|</span>
                            <span>Research Facilities</span>
                        </div>
                    </div>

                   
                        </div>
                    </div>

                
            
        </section>

        {/* ===================================================================== */}
        {/* THE CHALLENGES SECTION */}
        {/* ===================================================================== */}
        <section className="py-20 md:py-24 bg-slate-50 border-b border-slate-200/80" id="challenges">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-emergencyRed block mb-2">THE CHALLENGES</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight">
                        Educational institutions need to prepare for multiple emergency scenarios.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-4">
                        Campuses host thousands of students, teachers, and visitors across large geographical footprints, creating acute safety challenges during critical incidents.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/amb-paramedic-vitals.jpg" alt="Medical Emergencies" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Medical Emergencies
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Sudden cardiac events, asthma attacks, sports injuries, or fainting require swift on-campus first aid and immediate hospital escalation.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/amb-dispatch-console.jpg" alt="Fire Incidents" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Fire Incidents
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Laboratory fires, electrical short circuits, and canteen hazards require rapid alarm dissemination and guided building evacuation.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/amb-traffic-delays.jpg" alt="Accidents & Trauma" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Accidents
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Campus transport accidents, stairwell falls, and playground trauma require rapid triage and coordinated ambulance access.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/amb-call-taker.jpg" alt="Evacuations" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Evacuations
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Mass campus dispersals during weather crises or threats face severe bottlenecking without live muster accountability.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/amb-gps-tracking.jpg" alt="Campus Safety Incidents" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Campus Safety Incidents
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Intrusions, physical confrontations, or security breaches demand instant stealth alerting and rapid security guard dispatch.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/amb-paper-logs.jpg" alt="Emergency Communication" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Emergency Communication
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Delays in reaching wardens, administrators, parents, and local emergency departments cause compounding panic and misinformation.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* HOW EMSTRAP HELPS SECTION */}
        {/* ===================================================================== */}
        <section className="py-20 md:py-24 bg-white border-b border-slate-200/80" id="solutions">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-brandBlue block mb-2">HOW EMSTRAP HELPS</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight">
                        A connected platform for safer educational institutions.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-4">
                        EMSTRAP integrates digital emergency beacons, incident dispatch, campus medical coordination, and local emergency services into a cohesive safety ecosystem.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/corp-employee-sos.jpg" alt="Campus SOS" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Campus SOS
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    One-touch distress alerts from student apps, wearable badges, and fixed wall beacons broadcast pinpoint coordinates to campus security.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/gov-command-wall.jpg" alt="Emergency Coordination" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Emergency Coordination
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Centralized live incident command console providing real-time visibility and instant dispatch to on-duty security personnel.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/corp-medical-support.jpg" alt="Medical Assistance" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Medical Assistance
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Instant notification to the campus clinic with emergency vital logs and automated pre-alerting of nearby partnered trauma centers.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/corp-fire-panel.jpg" alt="Fire & Evacuation Preparedness" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Fire &amp; Evacuation Preparedness
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Digital muster point verification, zone-by-zone evacuation routes, and real-time headcounts delivered to local fire brigades.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300 lg:col-span-2">
                        <div>
                            <div className="w-full aspect-[24/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/corp-safety-dashboard.jpg" alt="Safety Management" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Safety Management
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Continuous safety auditing, automated emergency drill simulations, warden training registers, and institutional compliance reporting.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* KEY BENEFITS SECTION */}
        {/* ===================================================================== */}
        <section className="py-20 md:py-24 bg-[#050B14] text-white relative overflow-hidden" id="benefits">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400 block mb-2">KEY BENEFITS</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
                        Build a safer and more prepared campus.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed mt-4">
                        Measurable improvements in emergency response times, campus-wide safety compliance, and peace of mind for staff, students, and parents.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                            <i className="fa-solid fa-bolt text-lg"></i>
                        </div>
                        <h3 className="text-lg font-bold font-display text-white mb-2">Faster emergency alerts</h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                            Sub-second digital SOS dissemination reaches campus security guards and medical officers instantly.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                            <i className="fa-solid fa-clipboard-check text-lg"></i>
                        </div>
                        <h3 className="text-lg font-bold font-display text-white mb-2">Better campus preparedness</h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                            Structured emergency drills, safety audits, and warden training workflows ensure readiness across all departments.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                            <i className="fa-solid fa-users text-lg"></i>
                        </div>
                        <h3 className="text-lg font-bold font-display text-white mb-2">Improved responder coordination</h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                            Synchronized GPS dispatch between campus security, university infirmary, and incoming city ambulances.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                            <i className="fa-solid fa-bullhorn text-lg"></i>
                        </div>
                        <h3 className="text-lg font-bold font-display text-white mb-2">Better emergency communication</h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                            Targeted multi-channel alerts prevent rumors and panic while providing clear instructions to faculty and students.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                            <i className="fa-solid fa-chart-line text-lg"></i>
                        </div>
                        <h3 className="text-lg font-bold font-display text-white mb-2">Structured safety management</h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                            Comprehensive post-incident forensic logs, digital records, and analytical safety metrics for regulatory bodies.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                            <i className="fa-solid fa-shield-heart text-lg"></i>
                        </div>
                        <h3 className="text-lg font-bold font-display text-white mb-2">Safer campus environment</h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                            A trusted and secure educational atmosphere promoting student wellbeing and peace of mind for families.
                        </p>
                    </div>

                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* THE EMSTRAP CAMPUS ECOSYSTEM SECTION */}
        {/* ===================================================================== */}
        <section className="py-20 md:py-24 bg-white border-b border-slate-200/80" id="ecosystem">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 block mb-2">THE EMSTRAP CAMPUS ECOSYSTEM</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight">
                        From incident to resolution. A connected response.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-4">
                        A continuous, synchronized emergency response workflow tailored for educational campuses.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/ecosystem/eco-trigger.jpg" alt="Emergency Triggered" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Emergency Triggered
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Instant activation via physical beacon, campus hotline, or student mobile safety application.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/ecosystem/eco-analytics.jpg" alt="Campus Administration" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Campus Administration
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Central control room assesses location, building sector, and nature of the emergency in real-time.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/ecosystem/eco-traffic.jpg" alt="Responder Coordination" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Responder Coordination
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Automated dispatch tasks routed to security guards, floor wardens, and campus medical officers.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/ecosystem/eco-response.jpg" alt="On-Ground Response" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    On-Ground Response
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Trained response teams arrive at the designated scene within minutes to secure the perimeter and render first aid.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/ecosystem/eco-hospital.jpg" alt="Incident Resolved" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Incident Resolved
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Successful stabilization, hospital handover, or safe evacuation with automated family notification.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/ecosystem/eco-resolution.jpg" alt="Review & Insights" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Review &amp; Insights
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Automated post-incident response time analytics and safety reports for administrative compliance.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* READY TO BUILD BETTER INFRASTRUCTURE CTA */}
        {/* ===================================================================== */}
        <section className="py-20 md:py-24 bg-[#050B14] text-white text-center relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400 block">CAMPUS RESILIENCE</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white">
                    Protect Your Students &amp; Staff Today.
                </h2>
                <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
                    Speak with our campus emergency specialists to design a customized safety and crisis response framework for your institution.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                    <button onClick={openSolutionModal} className="px-8 py-3.5 rounded-full bg-brandBlue hover:bg-brandBlueDark text-white font-bold tracking-wider text-xs uppercase transition-all shadow-lg hover:shadow-xl font-display hover:scale-105 active:scale-95">
                        Schedule a Consultation
                    </button>
                    <Link to="/contact" className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold tracking-wider text-xs uppercase transition-all border border-white/20 backdrop-blur-md font-display hover:scale-105 active:scale-95">
                        Contact Us
                    </Link>
                </div>
            </div>
        </section>

    </main>

    {/* ===================================================================== */}
    {/* GLOBAL FOOTER */}
    {/* ===================================================================== */}
    <footer className="bg-[#050B14] text-slate-400 py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
                <div className="lg:col-span-2 space-y-4">
                    <div className="h-9 flex items-center">
                        <img src="/images/logo1.jpeg" alt="EMSTRAP Logo" className="h-full w-auto object-contain" />
                    </div>
                    <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
                        EMSTRAP is an integrated emergency response and safety management platform connecting organisations, cities and emergency services into a unified operational ecosystem.
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                        <a href="https://www.linkedin.com/company/emstrap/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brandBlue transition-all text-xs" title="LinkedIn">
                            <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                        <a href="https://www.instagram.com/emstrap_official?stkn=bjN6eXU2cHc5cHJ4" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brandBlue transition-all text-xs" title="Instagram">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-4">Products</h4>
                    <ul className="space-y-2.5 text-xs">
                        <li><Link to="/connect" className="hover:text-white transition-colors">EMSTRAP Connect</Link></li>
                        <li><Link to="/ride" className="hover:text-white transition-colors">EMSTRAP Ride</Link></li>
                        <li><Link to="/shield" className="hover:text-white transition-colors">EMSTRAP Shield</Link></li>
                        <li><Link to="/command" className="hover:text-white transition-colors">EMSTRAP Command</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-4">Solutions</h4>
                    <ul className="space-y-2.5 text-xs">
                        <li><Link to="/corporate-companies" className="hover:text-white transition-colors">Corporate Companies</Link></li>
                        <li><Link to="/hospitals-and-clinics" className="hover:text-white transition-colors">Hospitals &amp; Clinics</Link></li>
                        <li><Link to="/educational-campuses" className="text-white font-medium">Educational Campuses</Link></li>
                        <li><Link to="/smart-cities" className="hover:text-white transition-colors">Smart Cities</Link></li>
                        <li><Link to="/government-agencies" className="hover:text-white transition-colors">Government Agencies</Link></li>
                        <li><Link to="/ambulance-providers" className="hover:text-white transition-colors">Ambulance Providers</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-4">Company</h4>
                    <ul className="space-y-2.5 text-xs">
                        <li><a
    href="/#page-landing"
    className="hover:text-white transition-colors"
    onClick={(e) => {
      e.preventDefault();

      if (window.location.pathname === "/") {
        document.getElementById("page-landing")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        window.location.href = "/#page-landing";
      }
    }}
  >
    Home
  </a></li>
                        <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                       
                        <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                </div>
            </div>

            <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
                <p>&copy; 2026 EMSTRAP. All rights reserved.</p>
                <div className="flex items-center space-x-6">
                    <a
                      href="#legal-terms"
                      onClick={(e) => {
                        e.preventDefault();
                        showEmstrapAlert("EMSTRAP Terms & Conditions govern platform access, emergency dispatch coordination, and enterprise SLAs. For enterprise agreement terms, contact contact@emstrap.com.");
                      }}
                      className="hover:text-slate-400 transition-colors"
                    >
                      Terms of Service
                    </a>
                    <a href="/privacy-policy.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
                    <Link to="/contact" className="hover:text-slate-400 transition-colors">Support</Link>
                </div>
            </div>
        </div>
    </footer>

    {/* Solution Request Modal */}
    <div
      id="solutionModal"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeSolutionModal();
      }}
      className="fixed inset-0 z-50 items-center justify-center p-4 bg-black/80 backdrop-blur-sm hidden opacity-0 transition-opacity duration-300"
    >
        <div className="bg-[#0A1120] border border-white/10 rounded-2xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button onClick={closeSolutionModal} className="absolute top-4 right-4 text-white/60 hover:text-white text-lg">
                <i className="fa-solid fa-xmark"></i>
            </button>
            <h3 className="text-xl font-bold font-display text-white mb-2">Request Campus Safety Briefing</h3>
            <p className="text-xs text-white/70 mb-6">Learn how EMSTRAP can safeguard your institution with real-time response.</p>
            <form onSubmit={handleSolutionSubmit} className="space-y-4 text-xs">
                <div>
                    <label className="block text-white/80 font-medium mb-1">Institution Name</label>
                    <input type="text" required placeholder="University / School Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-brandBlue" />
                </div>
                <div>
                    <label className="block text-white/80 font-medium mb-1">Official Email</label>
                    <input type="email" required placeholder="contact@institution.edu" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-brandBlue" />
                </div>
                <div>
                    <label className="block text-white/80 font-medium mb-1">Contact Phone</label>
                    <input type="tel" required placeholder="+91 ..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-brandBlue" />
                </div>
                <div>
                    <label className="block text-white/80 font-medium mb-1">Campus Size &amp; Needs</label>
                    <textarea rows={3} placeholder="Number of students, campus acreage, specific safety requirements..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-brandBlue"></textarea>
                </div>
                <button type="submit" className="w-full py-3 rounded-full bg-brandBlue hover:bg-brandBlueDark text-white font-bold tracking-wider uppercase transition-all shadow-lg font-display">
                    Submit Request
                </button>
            </form>
        </div></div>
    </div>
  );
}
