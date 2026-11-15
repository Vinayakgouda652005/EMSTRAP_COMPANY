import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageSetup, showEmstrapAlert, submitEmstrapModalRequest } from "../utils/emstrapLifecycle";

const PAGE_CSS = ".hero-gradient-overlay {\n            background: linear-gradient(to right, rgba(5, 11, 20, 0.95) 0%, rgba(5, 11, 20, 0.85) 45%, rgba(5, 11, 20, 0.55) 75%, rgba(5, 11, 20, 0.25) 100%);\n        }\n        .card-zoom-img {\n            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);\n        }\n        .card-hover-box:hover .card-zoom-img {\n            transform: scale(1.05);\n        }";

export default function PoliceDepartmentsPage() {
  usePageSetup({
    title: "Police Departments & Emergency Teams | EMSTRAP Solutions",
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
      requestType: "Police Departments Demo & Briefing Request",
      successMessage: "Thank you! Our emergency specialist will contact you shortly.",
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
    <div className="page-scope-policedepartmentspage theme-solutions min-h-screen flex flex-col justify-between">
      

    {/* ===================================================================== */}
    {/* GLOBAL NAVIGATION HEADER */}
    {/* ===================================================================== */}
   
{/* GLOBAL NAVIGATION HEADER */}
<header
  id="mainHeader"
  className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
>
  <div className="max-w-7xl mx-auto px-6 md:px-12">
    <div className="h-20 flex items-center justify-between">

      {/* Logo */}
      <Link to="/" className="flex items-center group">
        <img
          src="/images/logo.png"
          alt="EMSTRAP Logo"
          className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
        <Link to="#home" className="hover:text-brandBlue transition-colors">
          Home
        </Link>

        <a href="#challenges" className="hover:text-brandBlue transition-colors">
          Challenges
        </a>

        <a href="#solutions" className="hover:text-brandBlue transition-colors">
          Solutions
        </a>

        <a href="#benefits" className="hover:text-brandBlue transition-colors">
          Benefits
        </a>

        <a href="#ecosystem" className="hover:text-brandBlue transition-colors">
          How It Works
        </a>

        <Link to="/contact" className="hover:text-brandBlue transition-colors">
          Contact
        </Link>
      </nav>

     
      {/* Mobile Menu Button */}
      <button
        id="mobileMenuBtn"
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded="false"
        className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
      >
        <i className="fa-solid fa-bars text-lg"></i>
      </button>
    </div>

    {/* Mobile Navigation */}
    <div id="mobileMenu" className="hidden lg:hidden pb-5">
      <nav className="flex flex-col gap-1 text-sm font-semibold text-slate-700">
        <Link to="#home" className="px-4 py-3 rounded-lg hover:bg-slate-50">
          Home
        </Link>

        <a href="#challenges" className="px-4 py-3 rounded-lg hover:bg-slate-50">
          Challenges
        </a>

        <a href="#solutions" className="px-4 py-3 rounded-lg hover:bg-slate-50">
          Solutions
        </a>

        <a href="#benefits" className="px-4 py-3 rounded-lg hover:bg-slate-50">
          Benefits
        </a>

        <a href="#ecosystem" className="px-4 py-3 rounded-lg hover:bg-slate-50">
          How It Works
        </a>

        <Link to="/contact" className="px-4 py-3 rounded-lg hover:bg-slate-50">
          Contact
        </Link>

        
      </nav>
    </div>
  </div>
</header>

    

    <main className="flex-grow">

        {/* ===================================================================== */}
        {/* HERO SECTION (Matching Slide 4) */}
        {/* ===================================================================== */}
        <section id="home" className="relative bg-[#050B14] text-white min-h-[480px] sm:min-h-[560px] lg:min-h-[620px] flex items-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img src="/images/home-police.jpg" alt="Police Response Team" className="w-full h-full object-cover object-center" decoding="async" />
                <div className="absolute inset-0 hero-gradient-overlay"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 sm:py-20 lg:py-24 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    
                    {/* Left Hero Content */}
                    <div className="lg:col-span-7 space-y-6 max-w-2xl">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-brandBlue block">FOR POLICE DEPARTMENTS</span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-[1.08]">
                            Connect Every<br />Emergency <span className="text-emergencyRed">Response Team.</span>
                        </h1>

                        <p className="text-base sm:text-lg text-white/80 font-normal leading-relaxed">
                            EMSTRAP helps police departments receive emergency information faster, understand incident locations and coordinate with ambulances, hospitals and other responders.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <a href="#solutions" className="px-8 py-3.5 rounded-full bg-emergencyRed hover:bg-emergencyRedDark text-white font-bold tracking-wider text-xs uppercase transition-all shadow-lg hover:shadow-xl font-display hover:scale-105 active:scale-95 inline-flex items-center gap-2">
                                <span>Get Started</span>
                                <i className="fa-solid fa-arrow-down text-[10px]"></i>
                            </a>
                            <button onClick={openSolutionModal} className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold tracking-wider text-xs uppercase transition-all border border-white/30 backdrop-blur-md font-display hover:scale-105 active:scale-95">
                                Request a Demo
                            </button>
                        </div>

                        {/* Tag Pills */}
                        <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-2 text-xs font-medium text-white/60">
                            <span>Ambulance Services</span>
                            <span className="text-white/20">|</span>
                            <span>Hospitals</span>
                            <span className="text-white/20">|</span>
                            <span>Traffic Authorities</span>
                            <span className="text-white/20">|</span>
                            <span>Emergency Control Rooms</span>
                        </div>
                    </div>

                    
                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* THE CHALLENGE SECTION (Matching Slide 4) */}
        {/* ===================================================================== */}
        <section className="py-20 md:py-24 bg-slate-50 border-b border-slate-200/80" id="challenges">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-emergencyRed block mb-2">THE CHALLENGE</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight">
                        Police departments face critical operational challenges.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-4">
                        Emergency response becomes difficult when information is delayed, scattered or managed manually.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/police-dispatch-intake.jpg" alt="Delayed incident information" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Delayed incident information
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Emergency response becomes difficult when information is delayed, scattered or managed manually.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/police-fragmented-screens.jpg" alt="Fragmented communication" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Fragmented communication
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Communication gaps between police patrols, ambulance fleets and city hospital control rooms.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/police-realtime-visibility.jpg" alt="Limited real-time incident visibility" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Limited real-time incident visibility
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Dispatchers lack live GPS coordinates of field officers and ongoing on-scene developments.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/police-multi-responder.jpg" alt="Difficulty coordinating multiple responders" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Difficulty coordinating multiple responders
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Simultaneous coordination with fire brigades, medical paramedics, and traffic police causes delays.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/police-case-records.jpg" alt="Manual incident records" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Manual incident records
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Manual logging and paper case documents slow down reporting and forensic evidence collation.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/police-unified-info.jpg" alt="Lack of unified emergency information" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Lack of unified emergency information
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    No single operational picture shared across police departments, PCR vans, and municipal services.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* HOW EMSTRAP HELPS SECTION (Matching Slide 4) */}
        {/* ===================================================================== */}
        <section className="py-20 md:py-24 bg-white border-b border-slate-200/80" id="solutions">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-brandBlue block mb-2">HOW EMSTRAP HELPS</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight">
                        A connected platform for smarter policing.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-4">
                        EMSTRAP provides the tools and information police departments need to respond faster and more effectively.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/police-mobile-alert.jpg" alt="Real-Time Incident Alerts" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Real-Time Incident Alerts
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Receive emergency notifications with relevant incident information.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/police-gis-map.jpg" alt="Location Intelligence" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Location Intelligence
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    View incident locations through GPS and map-based interfaces.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/police-responder-coordination.jpg" alt="Responder Coordination" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Responder Coordination
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Coordinate with ambulances, hospitals, traffic authorities and emergency control rooms.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/gov-command-wall.jpg" alt="Incident Monitoring" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Incident Monitoring
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Track active emergency cases and response progress.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300 lg:col-span-2">
                        <div>
                            <div className="w-full aspect-[24/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/police-digital-records.jpg" alt="Digital Incident Records" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Digital Incident Records
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Maintain structured emergency records and response information.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* KEY BENEFITS SECTION (Matching Slide 4) */}
        {/* ===================================================================== */}
        <section className="py-20 md:py-24 bg-[#050B14] text-white relative overflow-hidden" id="benefits">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400 block mb-2">KEY BENEFITS</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
                        Support safer cities through better coordination.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed mt-4">
                        EMSTRAP helps police departments improve situational awareness and respond to emergencies more effectively.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                            <i className="fa-solid fa-clock text-lg"></i>
                        </div>
                        <h3 className="text-lg font-bold font-display text-white mb-2">Faster awareness of incidents</h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                            Sub-second dispatch from public 112 calls straight to the mobile patrol terminals.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                            <i className="fa-solid fa-users-viewfinder text-lg"></i>
                        </div>
                        <h3 className="text-lg font-bold font-display text-white mb-2">Better field coordination</h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                            Synchronized tactical assignments between beat officers, traffic units, and emergency medical teams.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                            <i className="fa-solid fa-comments text-lg"></i>
                        </div>
                        <h3 className="text-lg font-bold font-display text-white mb-2">Improved emergency communication</h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                            Integrated digital channels replace fragmented radio chatter and incomplete telephone relays.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                            <i className="fa-solid fa-crosshairs text-lg"></i>
                        </div>
                        <h3 className="text-lg font-bold font-display text-white mb-2">Better situational awareness</h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                            Live operational heatmaps, caller GPS location, and camera feeds for informed tactical choices.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                            <i className="fa-solid fa-database text-lg"></i>
                        </div>
                        <h3 className="text-lg font-bold font-display text-white mb-2">Centralized incident information</h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                            Unified emergency docket accessible across precinct commanders and field officers in real time.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                            <i className="fa-solid fa-file-shield text-lg"></i>
                        </div>
                        <h3 className="text-lg font-bold font-display text-white mb-2">Digital response records</h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                            Automated timestamps, vehicle telemetry, and resolution notes for courtroom evidence and reporting.
                        </p>
                    </div>

                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* A CONNECTED EMERGENCY ECOSYSTEM SECTION (Matching Slide 4) */}
        {/* ===================================================================== */}
        <section className="py-20 md:py-24 bg-white border-b border-slate-200/80" id="ecosystem">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 block mb-2">A CONNECTED EMERGENCY ECOSYSTEM</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight">
                        From incident to resolution. All responders connected.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-4">
                        EMSTRAP helps police departments work together with ambulances, hospitals and other emergency teams.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/ecosystem/eco-trigger.jpg" alt="Incident Report" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Incident Report
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Emergency information received
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/ecosystem/eco-analytics.jpg" alt="Police Department" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Police Department
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    View and assess incident
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/ecosystem/eco-traffic.jpg" alt="Ambulance Services" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Ambulance Services
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Coordinate and respond
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/ecosystem/eco-response.jpg" alt="Traffic Authorities" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Traffic Authorities
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Support movement and access
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/ecosystem/eco-hospital.jpg" alt="Hospitals" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Hospitals
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Prepare for arrival
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/ecosystem/eco-resolution.jpg" alt="Incident Resolution" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Incident Resolution
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Track and complete response
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
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400 block">LAW ENFORCEMENT READINESS</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white">
                    Equip Your Patrols With Connected Intelligence.
                </h2>
                <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
                    Speak with our public safety specialists to evaluate EMSTRAP for your police department or emergency control room.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                    <button onClick={openSolutionModal} className="px-8 py-3.5 rounded-full bg-emergencyRed hover:bg-emergencyRedDark text-white font-bold tracking-wider text-xs uppercase transition-all shadow-lg hover:shadow-xl font-display hover:scale-105 active:scale-95">
                        Schedule a Demonstration
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
                        <li><Link to="/educational-campuses" className="hover:text-white transition-colors">Educational Institutions</Link></li>
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
            <h3 className="text-xl font-bold font-display text-white mb-2">Request Specialist Briefing</h3>
            <p className="text-xs text-white/70 mb-6">Connect with our deployment engineering team.</p>
            <form onSubmit={handleSolutionSubmit} className="space-y-4 text-xs">
                <div>
                    <label className="block text-white/80 font-medium mb-1">Organisation / Agency Name</label>
                    <input type="text" required placeholder="Name of agency or institution" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-brandBlue" />
                </div>
                <div>
                    <label className="block text-white/80 font-medium mb-1">Official Email</label>
                    <input type="email" required placeholder="contact@agency.gov / .org" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-brandBlue" />
                </div>
                <div>
                    <label className="block text-white/80 font-medium mb-1">Contact Phone</label>
                    <input type="tel" required placeholder="+91 ..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-brandBlue" />
                </div>
                <div>
                    <label className="block text-white/80 font-medium mb-1">Operational Needs</label>
                    <textarea rows={3} placeholder="Tell us about your emergency management or fleet requirements..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-brandBlue"></textarea>
                </div>
                <button type="submit" className="w-full py-3 rounded-full bg-brandBlue hover:bg-brandBlueDark text-white font-bold tracking-wider uppercase transition-all shadow-lg font-display">
                    Submit Request
                </button>
            </form>
        </div></div>
    </div>
  );
}
