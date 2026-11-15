import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageSetup, showEmstrapAlert, submitEmstrapModalRequest } from "../utils/emstrapLifecycle";

const PAGE_CSS = ".hero-gradient-overlay {\n            background: linear-gradient(to right, rgba(5, 11, 20, 0.95) 0%, rgba(5, 11, 20, 0.85) 45%, rgba(5, 11, 20, 0.55) 75%, rgba(5, 11, 20, 0.25) 100%);\n        }\n        .card-zoom-img {\n            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);\n        }\n        .card-hover-box:hover .card-zoom-img {\n            transform: scale(1.05);\n        }";

export default function AmbulanceProvidersPage() {
  usePageSetup({
    title: "Move Faster. Respond Smarter. | EMSTRAP Solutions",
    bodyClass: "bg-white text-slate-900 font-sans selection:bg-brandBlue selection:text-white antialiased",
    themeClass: "theme-solutions",
    customCss: PAGE_CSS,
    enableWave: false,
    enableHeaderAmbulance: false,
  });

  const openSolutionModal = () => {
    const modal = document.getElementById("solutionModal");
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    }
  };

  const closeSolutionModal = () => {
    const modal = document.getElementById("solutionModal");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  };

  const handleSolutionSubmit = (e) =>
    submitEmstrapModalRequest({
      event: e,
      requestType: "Ambulance Providers Briefing Request",
      successMessage: "Thank you! Your request has been received. An EMSTRAP specialist will contact you shortly.",
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
    <div className="page-scope-ambulanceproviderspage theme-solutions min-h-screen flex flex-col justify-between">
      

    {/* ===================================================================== */}
    {/* GLOBAL NAVIGATION HEADER */}
    {/* ===================================================================== */}
    
<header
  className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
  id="mainHeader"
>
  <div className="max-w-7xl mx-auto px-6 md:px-12">
    <div className="h-20 flex items-center justify-between">

      {/* EMSTRAP Logo */}
      <Link to="/" className="flex items-center group">
        <img
          src="/images/logo.png"
          alt="EMSTRAP Logo"
          className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
        <Link to="#home" className="hover:text-blue-600 transition-colors">
          Home
        </Link>

        <a href="#challenges" className="hover:text-blue-600 transition-colors">
          Challenges
        </a>

        <a href="#solutions" className="hover:text-blue-600 transition-colors">
          Solutions
        </a>

        <a href="#benefits" className="hover:text-blue-600 transition-colors">
          Benefits
        </a>

        <a href="#ecosystem" className="hover:text-blue-600 transition-colors">
          How It Works
        </a>

        <Link to="/contact" className="hover:text-blue-600 transition-colors">
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
        {/* 01. HERO SECTION */}
        {/* ===================================================================== */}
        <section id="home" className="relative bg-[#050B14] text-white min-h-[480px] sm:min-h-[560px] lg:min-h-[620px] flex items-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img src="/ambulance.jpg" alt="FOR AMBULANCE PROVIDERS" className="w-full h-full object-cover object-center" decoding="async" />
                <div className="absolute inset-0 hero-gradient-overlay"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 sm:py-20 lg:py-24 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    
                    {/* Left Hero Content */}
                    <div className="lg:col-span-12 space-y-6 max-w-3xl">

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-[1.08]">
                            Move Faster.<br />Respond Smarter.
                        </h1>

                        <p className="text-base sm:text-lg text-white/80 font-normal leading-relaxed max-w-xl">
                            EMSTRAP helps ambulance providers receive, manage, prioritize and respond to emergency requests through intelligent dispatch, real-time tracking and connected hospital coordination.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <a href="#solutions" className="px-8 py-3.5 rounded-full bg-brandBlue hover:bg-brandBlueDark text-white font-bold tracking-wider text-xs uppercase transition-all shadow-lg hover:shadow-xl font-display hover:scale-105 active:scale-95 inline-flex items-center gap-2">
                                <span>Get Started</span>
                                <i className="fa-solid fa-arrow-down text-[10px]"></i>
                            </a>
                           
                        </div>

                        {/* Tag Pills */}
                        <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-2 text-xs font-medium text-white/60">
                            
                                <span>Ambulance Providers</span>
                                <span className="text-white/20">|</span>
                            
                                <span>Hospitals</span>
                                <span className="text-white/20">|</span>
                            
                                <span>Healthcare Networks</span>
                                
                            
                        </div>
                    </div>
                            
                                
                            </div>
                        </div>
                    
                    

                
            
        </section>

        {/* ===================================================================== */}
        {/* 02. CHALLENGE SECTION */}
        {/* ===================================================================== */}
        <section className="py-20 md:py-24 bg-slate-50 border-b border-slate-200/80" id="challenges">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-emergencyRed block mb-2">THE CHALLENGE</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight">
                        Ambulance operations face real-world challenges every day.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-4">
                        From manual dispatch and traffic delays to gaps in hospital communication, ambulance providers need smarter operational tools.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/amb-call-taker.jpg" alt="Manual Request Handling" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Manual Request Handling
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Phone-based emergency intake creates delays and errors in capturing accurate incident information and location data.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/amb-gps-tracking.jpg" alt="Ambulance Identification" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Ambulance Identification
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Dispatchers struggle to identify the nearest available ambulance in real time without a live fleet visibility tool.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/amb-traffic-delays.jpg" alt="Traffic-Related Delays" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Traffic-Related Delays
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Ambulances lose critical minutes navigating urban congestion without intelligent route guidance and traffic coordination.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/amb-dispatch-console.jpg" alt="Limited Operational Visibility" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Limited Operational Visibility
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Managers have no real-time view of fleet status, active trips or driver availability across the operation.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/amb-paramedic-vitals.jpg" alt="Hospital Communication Gaps" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Hospital Communication Gaps
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Hospitals receive little or no advance notice of incoming patients, reducing their ability to prepare receiving teams.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/amb-paper-logs.jpg" alt="Limited Analytics" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Limited Analytics
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Without digital records and operational data, providers cannot measure performance or identify systemic inefficiencies.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* 03. HOW EMSTRAP HELPS / SOLUTIONS SECTION */}
        {/* ===================================================================== */}
        <section className="py-20 md:py-24 bg-white border-b border-slate-200/80" id="solutions">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-brandBlue block mb-2">INTEGRATED SOLUTIONS</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight">
                        A connected platform for smarter ambulance operations.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-4">
                        EMSTRAP integrates every stage of the ambulance emergency lifecycle — from request intake to patient handover and post-incident reporting.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/amb-cad-dispatch.jpg" alt="Intelligent Emergency Dispatch" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Intelligent Emergency Dispatch
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Automated emergency intake with smart assignment of the nearest available ambulance based on live fleet data.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/traffic-cctv-monitoring.jpg" alt="Real-Time GPS Tracking" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Real-Time GPS Tracking
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Live location monitoring of every ambulance in the fleet from a centralized dispatch dashboard.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/amb-navigation.jpg" alt="Smart Routing" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Smart Routing
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Route optimization and traffic coordination to minimize response times for every active emergency.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/amb-hospital-handover.jpg" alt="Hospital Coordination" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Hospital Coordination
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Automatic advance notifications to receiving hospitals with patient status and estimated arrival time.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/amb-driver-tablet.jpg" alt="Driver Dashboard" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Driver Dashboard
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Mobile-first driver interface with navigation, job status updates and direct communication tools.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/amb-analytics.jpg" alt="Operational Analytics" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Operational Analytics
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Trip records, response time data and fleet utilization reports to support operational improvement.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* 04. KEY BENEFITS SECTION */}
        {/* ===================================================================== */}
        <section className="py-20 md:py-24 bg-[#050B14] text-white relative overflow-hidden" id="benefits">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400 block mb-2">PROVEN OUTCOMES</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
                        Built for faster, more efficient emergency response.
                    </h2>
                    <p className="text-sm sm:text-base text-white/70 font-normal leading-relaxed mt-4">
                        EMSTRAP delivers improvements across every dimension of ambulance operations — from first call to final record.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    <div className="bg-white/5 border border-white/10 hover:border-blue-500/40 p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 group">
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-white">
                            <i className="fa-solid fa-bolt text-white text-lg"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-white mb-2 group-hover:text-white transition-colors">
                            Faster Emergency Coordination
                        </h3>
                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                            Automated dispatch and smart routing significantly reduce time from call to ambulance arrival.
                        </p>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 hover:border-blue-500/40 p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 group">
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-white">
                            <i className="fa-solid fa-truck-medical text-white text-lg"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-white mb-2 group-hover:text-white transition-colors">
                            Better Ambulance Utilization
                        </h3>
                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                            Live fleet visibility ensures optimal assignment and reduces idle time across operations.
                        </p>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 hover:border-blue-500/40 p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 group">
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-white">
                            <i className="fa-solid fa-eye text-white text-lg"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-white mb-2 group-hover:text-white transition-colors">
                            Real-Time Fleet Visibility
                        </h3>
                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                            Managers have a complete live view of all ambulances, drivers and active emergencies.
                        </p>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 hover:border-blue-500/40 p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 group">
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-white">
                            <i className="fa-solid fa-comments text-white text-lg"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-white mb-2 group-hover:text-white transition-colors">
                            Improved Driver Communication
                        </h3>
                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                            Structured digital communication replaces fragmented radio contact for all field personnel.
                        </p>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 hover:border-blue-500/40 p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 group">
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-white">
                            <i className="fa-solid fa-shield-halved text-white text-lg"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-white mb-2 group-hover:text-white transition-colors">
                            Better Hospital Coordination
                        </h3>
                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                            Advance patient notifications enable hospitals to prepare faster and deliver better care.
                        </p>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 hover:border-blue-500/40 p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 group">
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-white">
                            <i className="fa-solid fa-database text-white text-lg"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-white mb-2 group-hover:text-white transition-colors">
                            Digital Operational Records
                        </h3>
                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                            Every trip, dispatch and incident is digitally recorded for compliance and operational review.
                        </p>
                    </div>
                    
                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* 05. ECOSYSTEM & END-TO-END WORKFLOW */}
        {/* ===================================================================== */}
        <section className="py-20 md:py-24 bg-white border-b border-slate-200/80" id="ecosystem">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-brandBlue block mb-2">END-TO-END PROCESS</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight">
                        From request to hospital.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-4">
                        A unified ambulance journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-200 relative">
                                <img src="/images/ecosystem/eco-trigger.jpg" alt="Emergency Request" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                                <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider">
                                    STEP 01
                                </div>
                            </div>
                            <h3 className="text-base font-bold font-display text-slate-900 mb-1 group-hover:text-brandBlue transition-colors">
                                Emergency Request
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                Incident reported and received.
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-200 relative">
                                <img src="/images/ecosystem/eco-analytics.jpg" alt="Dispatch & Assignment" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                                <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider">
                                    STEP 02
                                </div>
                            </div>
                            <h3 className="text-base font-bold font-display text-slate-900 mb-1 group-hover:text-brandBlue transition-colors">
                                Dispatch & Assignment
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                Nearest ambulance assigned.
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-200 relative">
                                <img src="/images/ecosystem/eco-traffic.jpg" alt="En Route" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                                <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider">
                                    STEP 03
                                </div>
                            </div>
                            <h3 className="text-base font-bold font-display text-slate-900 mb-1 group-hover:text-brandBlue transition-colors">
                                En Route
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                Ambulance navigating to scene.
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-200 relative">
                                <img src="/images/ecosystem/eco-response.jpg" alt="Patient Pickup" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                                <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider">
                                    STEP 04
                                </div>
                            </div>
                            <h3 className="text-base font-bold font-display text-slate-900 mb-1 group-hover:text-brandBlue transition-colors">
                                Patient Pickup
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                Patient assessed and secured.
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-200 relative">
                                <img src="/images/ecosystem/eco-hospital.jpg" alt="Hospital Coordination" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                                <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider">
                                    STEP 05
                                </div>
                            </div>
                            <h3 className="text-base font-bold font-display text-slate-900 mb-1 group-hover:text-brandBlue transition-colors">
                                Hospital Coordination
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                Medical team pre-notified.
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-200 relative">
                                <img src="/images/ecosystem/eco-resolution.jpg" alt="Patient Arrival" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                                <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider">
                                    STEP 06
                                </div>
                            </div>
                            <h3 className="text-base font-bold font-display text-slate-900 mb-1 group-hover:text-brandBlue transition-colors">
                                Patient Arrival
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                Handover completed, records filed.
                            </p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* 06. READY TO BUILD BETTER INFRASTRUCTURE CTA */}
        {/* ===================================================================== */}
        <section className="py-16 md:py-20 bg-slate-900 text-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="bg-gradient-to-r from-blue-900/60 via-slate-800 to-slate-900 border border-blue-500/20 p-8 sm:p-12 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
                    <div className="space-y-2 text-center lg:text-left max-w-2xl">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-white tracking-tight">
                            Ready to upgrade your emergency response?
                        </h2>
                        <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                            Talk to an EMSTRAP specialist about your organisation's specific requirements.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 shrink-0">
                        <button onClick={openSolutionModal} className="px-8 py-3.5 rounded-full bg-brandBlue hover:bg-brandBlueDark text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl font-display">
                            Schedule Briefing
                        </button>
                        <Link to="/contact" className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all font-display">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </section>

    </main>

    {/* ===================================================================== */}
    {/* GLOBAL FOOTER */}
    {/* ===================================================================== */}
    <footer className="bg-[#050505] border-t border-neutral-900 py-12 px-6 md:px-12 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-4">
                <Link to="/" className="flex items-center space-x-3 group">
                    <div className="h-9 flex items-center">
                        <img src="/images/logo1.jpeg" alt="EMSTRAP Logo" className="h-full w-auto object-contain" />
                    </div>
                    <span className="text-xl font-black font-display tracking-wider text-white">EMSTRAP</span>
                </Link>
                <p className="text-xs text-neutral-400 leading-relaxed max-w-sm font-normal">
                    EMSTRAP is an integrated emergency response and safety management platform connecting organisations, cities and emergency services into a unified operational ecosystem.
                </p>
                <div className="flex items-center gap-3 pt-2">
                    <a href="https://www.linkedin.com/company/emstrap/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-all text-xs" title="LinkedIn">
                        <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                    <a href="https://www.instagram.com/emstrap_official?stkn=bjN6eXU2cHc5cHJ4" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-all text-xs" title="Instagram">
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                </div>
            </div>

            {/* Solutions Links */}
            <div className="space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-300 block font-bold">Solutions</span>
                <ul className="space-y-2">
                    <li><Link to="/corporate-companies" className="hover:text-white transition-colors">Corporate Safety</Link></li>
                    <li><Link to="/hospitals-and-clinics" className="hover:text-white transition-colors">Hospitals & Clinics</Link></li>
                    <li><Link to="/educational-campuses" className="hover:text-white transition-colors">Educational Campuses</Link></li>
                    <li><Link to="/smart-cities" className="hover:text-white transition-colors">Smart Cities</Link></li>
                    <li><Link to="/government-agencies" className="hover:text-white transition-colors">Government Agencies</Link></li>
                    <li><Link to="/ambulance-providers" className="hover:text-white transition-colors">Ambulance Providers</Link></li>
                    <li><Link to="/traffic-management" className="hover:text-white transition-colors">Traffic Management</Link></li>
                    <li><Link to="/police-departments" className="hover:text-white transition-colors">Police Departments</Link></li>
                </ul>
            </div>

            {/* Products Links */}
            <div className="space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-300 block font-bold">Products</span>
                <ul className="space-y-2">
                    <li><Link to="/connect" className="hover:text-white transition-colors">EMSTRAP Connect</Link></li>
                    <li><Link to="/ride" className="hover:text-white transition-colors">EMSTRAP Ride</Link></li>
                    <li><Link to="/shield" className="hover:text-white transition-colors">EMSTRAP Shield</Link></li>
                    <li><Link to="/command" className="hover:text-white transition-colors">EMSTRAP Command</Link></li>
                </ul>
            </div>

            {/* Company Links */}
            <div className="space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-300 block font-bold">Company</span>
                <ul className="space-y-2">
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

        <div className="max-w-7xl mx-auto pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
            <span>&copy; 2026 EMSTRAP Pvt. Ltd. All rights reserved.</span>
            <div className="flex items-center space-x-6">
                <a href="/privacy-policy.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy Policy</a>
                <a
                  href="#legal-terms"
                  onClick={(e) => {
                    e.preventDefault();
                    showEmstrapAlert("EMSTRAP Terms & Conditions govern platform access, emergency dispatch coordination, and enterprise SLAs. For enterprise agreement terms, contact contact@emstrap.com.");
                  }}
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
            </div>
        </div>
    </footer>

    {/* Solution Request Modal */}
    <div
      id="solutionModal"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeSolutionModal();
      }}
      className="hidden fixed inset-0 z-50 items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-6 text-slate-900 shadow-2xl relative">
            <button onClick={closeSolutionModal} className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 text-xl cursor-pointer">
                <i className="fa-solid fa-xmark"></i>
            </button>
            <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-brandBlue">FOR AMBULANCE PROVIDERS</span>
                <h3 className="text-2xl font-bold font-display text-slate-900 mt-1">Request a Specialist Briefing</h3>
                <p className="text-xs text-slate-500 font-normal mt-1">Connect with our engineering and deployment team.</p>
            </div>
            <form onSubmit={handleSolutionSubmit} className="space-y-4">
                <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Your Name</label>
                    <input type="text" required className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brandBlue" placeholder="e.g. Rahul Sharma" />
                </div>
                <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Organisation / Agency</label>
                    <input type="text" required className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brandBlue" placeholder="e.g. Municipal Corp / Hospital Network" />
                </div>
                <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Official Work Email</label>
                    <input type="email" required className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brandBlue" placeholder="official@agency.gov / name@company.com" />
                </div>
                <div>
                    <label className="text-[11px] font-mono text-slate-600 uppercase tracking-wider block mb-1">Phone Number</label>
                    <input type="tel" required className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brandBlue" placeholder="+91 98808 82476" />
                </div>
                <button type="submit" className="w-full py-3 bg-brandBlue hover:bg-brandBlueDark text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all font-display">
                    Submit Request
                </button>
            </form>
        </div></div>
    </div>
  );
}
