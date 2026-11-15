import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageSetup, showEmstrapAlert, submitEmstrapModalRequest } from "../utils/emstrapLifecycle";

const PAGE_CSS = ".hero-gradient-overlay {\n            background: linear-gradient(to right, rgba(5, 11, 20, 0.95) 0%, rgba(5, 11, 20, 0.85) 45%, rgba(5, 11, 20, 0.55) 75%, rgba(5, 11, 20, 0.25) 100%);\n        }\n        .card-zoom-img {\n            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);\n        }\n        .card-hover-box:hover .card-zoom-img {\n            transform: scale(1.05);\n        }";

export default function SmartCitiesPage() {
  usePageSetup({
    title: "Smart Cities & Emergency Infrastructure | EMSTRAP Solutions",
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
      requestType: "Smart Cities Demo & Briefing Request",
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
    <div className="page-scope-smartcitiespage theme-solutions min-h-screen flex flex-col justify-between">
      

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
      <Link to="/" className="flex items-center group shrink-0">
        <img
          src="/images/logo.png"
          alt="EMSTRAP Logo"
          className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-7">
        <a href="#home"
          className="text-sm font-semibold text-slate-600 hover:text-brandBlue transition-colors">
          Home
        </a>

        <a href="#challenges"
          className="text-sm font-semibold text-slate-600 hover:text-brandBlue transition-colors">
          Challenges
        </a>

        <a href="#solutions"
          className="text-sm font-semibold text-slate-600 hover:text-brandBlue transition-colors">
          Solutions
        </a>

        <a href="#capabilities"
          className="text-sm font-semibold text-slate-600 hover:text-brandBlue transition-colors">
          Capabilities
        </a>

        <a href="#benefits"
          className="text-sm font-semibold text-slate-600 hover:text-brandBlue transition-colors">
          Benefits
        </a>

        <Link to="/contact"
          className="text-sm font-semibold text-slate-600 hover:text-brandBlue transition-colors">
          Contact
        </Link>

        
      </nav>

      {/* Mobile Menu Button */}
      <button
        id="mobileMenuBtn"
        type="button"
        aria-label="Toggle navigation menu"
        aria-controls="mobileMenu"
        aria-expanded="false"
        className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-800 hover:bg-slate-100 transition-colors"
      >
        <i className="fa-solid fa-bars text-xl"></i>
      </button>
    </div>

    {/* Mobile Navigation */}
    <div
      id="mobileMenu"
      className="hidden lg:hidden border-t border-slate-200 py-4"
    >
      <nav className="flex flex-col gap-1">

        <a href="#home" className="mobile-nav-link">
          Home
        </a>

        <a href="#challenges" className="mobile-nav-link">
          Challenges
        </a>

        <a href="#solutions" className="mobile-nav-link">
          Solutions
        </a>

        <a href="#capabilities" className="mobile-nav-link">
          Capabilities
        </a>

        <a href="#benefits" className="mobile-nav-link">
          Benefits
        </a>

        <Link to="/contact" className="mobile-nav-link">
          Contact
        </Link>

        

      </nav>
    </div>
  </div>
</header>

    

    <main className="flex-grow">

        {/* ===================================================================== */}
        {/* HERO SECTION (Matching Slide 5) */}
        {/* ===================================================================== */}
        <section id="home" className="relative bg-[#050B14] text-white min-h-[480px] sm:min-h-[560px] lg:min-h-[620px] flex items-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img src="/images/hero-smart-cities.jpg" alt="Building the Emergency Infrastructure of Smarter Cities" className="w-full h-full object-cover object-center" decoding="async" />
                <div className="absolute inset-0 hero-gradient-overlay"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 sm:py-20 lg:py-24 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    
                    {/* Left Hero Content */}
                    <div className="lg:col-span-7 space-y-6 max-w-2xl">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-brandBlue block">FOR SMART CITIES</span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-[1.08]">
                            Building the Emergency<br />Infrastructure of<br /><span className="text-emergencyRed">Smarter Cities.</span>
                        </h1>

                        <p className="text-base sm:text-lg text-white/80 font-normal leading-relaxed">
                            EMSTRAP connects emergency stakeholders into a unified city-level response ecosystem.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <a href="#solutions" className="px-8 py-3.5 rounded-full bg-emergencyRed hover:bg-emergencyRedDark text-white font-bold tracking-wider text-xs uppercase transition-all shadow-lg hover:shadow-xl font-display hover:scale-105 active:scale-95 inline-flex items-center gap-2">
                                <span>Partner With EMSTRAP</span>
                                <i className="fa-solid fa-arrow-down text-[10px]"></i>
                            </a>
                            <button onClick={openSolutionModal} className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold tracking-wider text-xs uppercase transition-all border border-white/30 backdrop-blur-md font-display hover:scale-105 active:scale-95">
                                Request a Demo
                            </button>
                        </div>

                        {/* Tag Pills */}
                        <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-2 text-xs font-medium text-white/60">
                            <span>Citizens</span>
                            <span className="text-white/20">|</span>
                            <span>Ambulances</span>
                            <span className="text-white/20">|</span>
                            <span>Hospitals</span>
                            <span className="text-white/20">|</span>
                            <span>Police</span>
                            <span className="text-white/20">|</span>
                            <span>Traffic Management</span>
                            <span className="text-white/20">|</span>
                            <span>Emergency Control Centres</span>
                        </div>
                    </div>

                    
                                   
                        </div>
                    </div>

                
            
        </section>

        {/* ===================================================================== */}
        {/* CITY CHALLENGES SECTION (Matching Slide 5) */}
        {/* ===================================================================== */}
        <section className="py-20 md:py-24 bg-slate-50 border-b border-slate-200/80" id="challenges">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-emergencyRed block mb-2">CITY CHALLENGES</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight">
                        Modern cities face complex emergency challenges.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-4">
                        Managing emergencies across a growing urban environment requires better coordination, real-time information and a unified system.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/smartcity-ops-centre.jpg" alt="Multiple disconnected emergency systems" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Multiple disconnected emergency systems
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Different systems across departments.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/smartcity-traffic-congestion.jpg" alt="Traffic congestion" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Traffic congestion
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Delays emergency response.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/smartcity-ambulance-traffic.jpg" alt="Ambulance delays" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Ambulance delays
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Difficulty reaching incident locations on time.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/smartcity-radio-comms.jpg" alt="Fragmented emergency communication" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Fragmented emergency communication
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Information not shared effectively.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/smartcity-aerial-grid.jpg" alt="Limited city-wide visibility" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Limited city-wide visibility
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Lack of real-time insights.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/smartcity-multi-agency.jpg" alt="Multiple agencies working independently" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Multiple agencies working independently
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Separate operations and limited coordination.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* HOW EMSTRAP HELPS (Matching Slide 5 Ecosystem Flow) */}
        {/* ===================================================================== */}
        <section className="py-20 md:py-24 bg-white border-b border-slate-200/80" id="solutions">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-brandBlue block mb-2">HOW EMSTRAP HELPS</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight">
                        A unified city-level response ecosystem.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-4">
                        EMSTRAP connects all key stakeholders into one integrated platform, enabling faster, more coordinated and more effective emergency response.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/ecosystem/eco-trigger.jpg" alt="Citizens" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Citizens
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Report emergencies and request help.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/ecosystem/eco-analytics.jpg" alt="Ambulances" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Ambulances
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Receive and respond to incidents.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/ecosystem/eco-hospital.jpg" alt="Hospitals" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Hospitals
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Get notified and prepare for incoming patients.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/ecosystem/eco-traffic.jpg" alt="Police" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Police
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Receive incident information and coordinate response.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/ecosystem/eco-response.jpg" alt="Traffic Management" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Traffic Management
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Support emergency movement and route coordination.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/ecosystem/eco-resolution.jpg" alt="Emergency Control Centres" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Emergency Control Centres
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Monitor and manage city-wide emergency response.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* KEY CAPABILITIES SECTION (Matching Slide 5) */}
        {/* ===================================================================== */}
        <section className="py-20 md:py-24 bg-slate-50 border-b border-slate-200/80" id="capabilities">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 block mb-2">KEY CAPABILITIES</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight">
                        Integrated tools for smarter city operations.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-4">
                        EMSTRAP provides a range of capabilities to help cities manage emergencies more efficiently.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    
                    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-brandBlue flex items-center justify-center text-lg mb-4">
                            <i className="fa-solid fa-desktop"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-slate-900 mb-2">Emergency monitoring</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                            Continuous real-time surveillance of city incidents across all civic wards.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg mb-4">
                            <i className="fa-solid fa-location-crosshairs"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-slate-900 mb-2">Real-time tracking</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                            Sub-second live telemetry from every emergency fleet unit across municipal zones.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg mb-4">
                            <i className="fa-solid fa-route"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-slate-900 mb-2">Intelligent dispatch</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                            Automated computer-aided dispatch assigns the nearest available first responder.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg mb-4">
                            <i className="fa-solid fa-brain"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-slate-900 mb-2">AI-assisted decision support</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                            Predictive triage algorithms recommend optimal hospital routing and resource allocation.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-red-50 text-emergencyRed flex items-center justify-center text-lg mb-4">
                            <i className="fa-solid fa-road"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-slate-900 mb-2">Emergency route coordination</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                            Dynamic green wave signal preemption clears intersections for sirens in transit.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-brandBlue flex items-center justify-center text-lg mb-4">
                            <i className="fa-solid fa-hospital"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-slate-900 mb-2">Hospital notifications</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                            Advance patient vitals and trauma bed allocation before ambulance hospital arrival.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg mb-4">
                            <i className="fa-solid fa-chart-column"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-slate-900 mb-2">Operational analytics</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                            Comprehensive city-wide response metrics, heatmaps, and service level KPIs.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-lg mb-4">
                            <i className="fa-solid fa-network-wired"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-slate-900 mb-2">Multi-agency coordination</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                            Interoperable bridge uniting police, municipal ambulances, fire brigades and transit.
                        </p>
                    </div>

                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* KEY BENEFITS SECTION (Matching Slide 5) */}
        {/* ===================================================================== */}
        <section className="py-20 md:py-24 bg-[#050B14] text-white relative overflow-hidden" id="benefits">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400 block mb-2">KEY BENEFITS</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
                        Towards safer, more resilient and smarter cities.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed mt-4">
                        EMSTRAP helps cities build a connected emergency ecosystem that improves coordination, reduces response time and enhances public safety.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                            <i className="fa-solid fa-eye text-lg"></i>
                        </div>
                        <h3 className="text-lg font-bold font-display text-white mb-2">Unified emergency visibility</h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                            Complete situational awareness with single-pane oversight of all citywide emergency activity.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                            <i className="fa-solid fa-users text-lg"></i>
                        </div>
                        <h3 className="text-lg font-bold font-display text-white mb-2">Better agency coordination</h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                            Synchronized standard operating procedures linking police, fire, health and traffic departments.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                            <i className="fa-solid fa-bolt text-lg"></i>
                        </div>
                        <h3 className="text-lg font-bold font-display text-white mb-2">Faster information sharing</h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                            Instant incident data distribution across control rooms without telephone relay bottlenecks.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                            <i className="fa-solid fa-truck-fast text-lg"></i>
                        </div>
                        <h3 className="text-lg font-bold font-display text-white mb-2">Improved emergency mobility</h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                            Dynamic signal clearing and real-time congestion avoidance reduces sirens transit time up to 50%.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                            <i className="fa-solid fa-database text-lg"></i>
                        </div>
                        <h3 className="text-lg font-bold font-display text-white mb-2">Centralized operational intelligence</h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                            Actionable urban insights to optimize ambulance basing, patrol routes, and civic disaster shelters.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                            <i className="fa-solid fa-cubes text-lg"></i>
                        </div>
                        <h3 className="text-lg font-bold font-display text-white mb-2">Scalable emergency infrastructure</h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                            Built on cloud-native standards ready to scale across metropolitan regions and smart governance grids.
                        </p>
                    </div>

                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* READY TO BUILD BETTER INFRASTRUCTURE CTA */}
        {/* ===================================================================== */}
        <section className="py-20 md:py-24 bg-[#050B14] text-white text-center relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400 block">SMART CITY RESILIENCE</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white">
                    Transform City Emergency Coordination Today.
                </h2>
                <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
                    Partner with EMSTRAP to build a connected, responsive urban emergency response framework for your city.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                    <button onClick={openSolutionModal} className="px-8 py-3.5 rounded-full bg-emergencyRed hover:bg-emergencyRedDark text-white font-bold tracking-wider text-xs uppercase transition-all shadow-lg hover:shadow-xl font-display hover:scale-105 active:scale-95">
                        Schedule City Consultation
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
