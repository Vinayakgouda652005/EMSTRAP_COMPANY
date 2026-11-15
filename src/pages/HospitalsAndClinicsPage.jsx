import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageSetup, showEmstrapAlert, submitEmstrapModalRequest } from "../utils/emstrapLifecycle";

const PAGE_CSS = ".hero-gradient-overlay {\n            background: linear-gradient(to right, rgba(5, 11, 20, 0.95) 0%, rgba(5, 11, 20, 0.85) 45%, rgba(5, 11, 20, 0.55) 75%, rgba(5, 11, 20, 0.25) 100%);\n        }\n        .card-zoom-img {\n            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);\n        }\n        .card-hover-box:hover .card-zoom-img {\n            transform: scale(1.05);\n        }";

export default function HospitalsAndClinicsPage() {
  usePageSetup({
    title: "Hospitals & Clinics | EMSTRAP Solutions",
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
      requestType: "Hospitals & Clinics Demo & Briefing Request",
      successMessage: "Thank you! Our hospital emergency specialist will contact you shortly.",
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
    <div className="page-scope-hospitalsandclinicspage theme-solutions min-h-screen flex flex-col justify-between">
      

    {/* ===================================================================== */}
    {/* GLOBAL NAVIGATION HEADER */}
    {/* ===================================================================== */}
    
{/* GLOBAL NAVIGATION HEADER */}
<header
    className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm"
    id="mainHeader"
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

           <a
    href="#home"
    onClick={(e) => {
        e.preventDefault();
        document.getElementById("home")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }}
    className="text-sm font-semibold text-slate-700 hover:text-brandBlue transition-colors"
>
    Home
</a>

            <a href="#challenges" className="text-sm font-semibold text-slate-700 hover:text-brandBlue transition-colors">
                Challenges
            </a>

            <a href="#solutions" className="text-sm font-semibold text-slate-700 hover:text-brandBlue transition-colors">
                Solutions
            </a>

            <a href="#products" className="text-sm font-semibold text-slate-700 hover:text-brandBlue transition-colors">
                Products
            </a>

            <a href="#benefits" className="text-sm font-semibold text-slate-700 hover:text-brandBlue transition-colors">
                Benefits
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
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-800 hover:bg-slate-100 transition-colors"
        >
            <i className="fa-solid fa-bars text-lg"></i>
        </button>
    </div>

    {/* MOBILE NAVIGATION */}
    <div
        id="mobileMenu"
        className="hidden lg:hidden bg-white border-t border-slate-200 shadow-lg"
    >
        <nav className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-4">

            {[
                ["Home", "#home"],
                ["Challenges", "#challenges"],
                ["Solutions", "#solutions"],
                ["Products", "#products"],
                ["Benefits", "#benefits"],
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
       <section
    id="home"
    className="relative bg-[#050B14] text-white min-h-[480px] sm:min-h-[560px] lg:min-h-[620px] flex items-center overflow-hidden scroll-mt-24"
>
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img src="/images/hospital.jpg" alt="Hospitals & Healthcare Facilities" className="w-full h-full object-cover object-center" decoding="async" />
                <div className="absolute inset-0 hero-gradient-overlay"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 sm:py-20 lg:py-24 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    
                    {/* Left Hero Content */}
                    <div className="lg:col-span-7 space-y-6 max-w-2xl">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-emergencyRed block">HOSPITALS &amp; CLINICS</span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-[1.08]">
                            Know Before<br />the Patient Arrives.
                        </h1>

                        <p className="text-base sm:text-lg text-white/80 font-normal leading-relaxed">
                            EMSTRAP connects incoming ambulances directly with emergency rooms and trauma centers, streaming vital telemetry, patient details, and accurate ETAs so clinical teams can prepare before the patient arrives.
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
                            <span>Trauma Centers</span>
                            <span className="text-white/20">|</span>
                            <span>Hospitals</span>
                            <span className="text-white/20">|</span>
                            <span>Emergency Departments</span>
                            <span className="text-white/20">|</span>
                            <span>Day Care Clinics</span>
                        </div>
                    </div>

                   
                        </div>
                    </div>

                
            
        </section>

        {/* ===================================================================== */}
        {/* THE CHALLENGE SECTION */}
        {/* ===================================================================== */}
        <section className="py-20 md:py-24 bg-slate-50 border-b border-slate-200/80" id="challenges">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-emergencyRed block mb-2">THE CHALLENGE</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight">
                        Hospitals need to be prepared before the patient arrives.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-4">
                        Without pre-arrival coordination and real-time clinical telemetry, emergency departments lose vital minutes preparing trauma teams, ICU beds, and diagnostics.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/amb-call-taker.jpg" alt="Unannounced Trauma Arrivals" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Zero Advance Warning
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Emergency rooms receive critical arrivals unannounced, leading to chaotic intake and delayed resuscitation.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/amb-gps-tracking.jpg" alt="Fragmented Radio Handoffs" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Manual Phone Relays
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Paramedics struggle to relay complex vitals over noisy phone calls or radios while managing patient care.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/amb-traffic-delays.jpg" alt="Trauma Bay & Bed Delays" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Unprepared Trauma Bays
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Operating suites, CT scanners, and ICU beds are allocated only after the ambulance pulls into the bay.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/amb-dispatch-console.jpg" alt="Delayed Specialist Mobilization" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Specialist Mobilization Delays
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    On-call surgeons, cardiologists, and anesthesiologists lose the critical golden hour due to late paging.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/amb-paramedic-vitals.jpg" alt="Crowded ER Bottlenecks" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Crowded ER Bottlenecks
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Lack of predictive ETA forecasting leads to ambulance diversions and overwhelmed triage bays.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/amb-paper-logs.jpg" alt="Missing Pre-Hospital Data" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Missing Pre-Hospital Data
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Paper handoffs and incomplete field logs hinder clinical decision-making during emergency transfers.
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
                        A connected emergency ecosystem for hospitals and clinics.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-4">
                        EMSTRAP bridges the gap between field paramedics and emergency clinical teams with real-time pre-arrival integration.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/amb-paramedic-vitals.jpg" alt="Pre-Arrival Inbound Telemetry" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Pre-Arrival Inbound Telemetry
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Real-time streaming of vitals (ECG, SpO2, BP, pulse) directly from the ambulance into the ER dashboard.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/smartcity-control-centre.jpg" alt="Precise Live ETA Tracking" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Precise Live ETA Tracking
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Dynamic traffic-aware GPS tracking so the clinical team knows the exact second the ambulance will reach the bay.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/amb-call-taker.jpg" alt="Advance Bed & Bay Allocation" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Advance Bed &amp; Bay Allocation
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Pre-allocate trauma resuscitation bays, ventilators, and surgical suites before patient arrival.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/amb-cad-dispatch.jpg" alt="Specialist Pre-Alerting" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Specialist Pre-Alerting
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Automated paging of on-call trauma surgeons, cardiologists, and stroke teams based on injury triage score.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/smartcity-hospital-coordination.jpg" alt="Direct Paramedic-Physician Link" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Direct Paramedic-Physician Link
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Secure clinical chat, tele-consultation, and treatment advisories between ER consultants and paramedics.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/amb-hospital-handover.jpg" alt="Digital Triage & Paperless Handoff" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Digital Triage &amp; Paperless Handoff
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Zero-delay digital handoffs that automatically populate hospital EHR with field vitals and intervention logs.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300 lg:col-span-3">
                        <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="space-y-1">
                                <h3 className="text-lg font-bold font-display text-slate-900 group-hover:text-brandBlue transition-colors">
                                    Capacity &amp; Resource Optimization
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-2xl">
                                    Multi-facility visibility for hospital networks prevents ER overload, balances intensive care admissions, and reduces emergency diversion rates.
                                </p>
                            </div>
                            <span className="px-5 py-2.5 rounded-full bg-blue-50 text-brandBlue font-bold text-xs uppercase tracking-wider font-mono shrink-0">
                                Network Load Balancing
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* ===================================================================== */}
        {/* EMSTRAP PRODUCTS FOR HOSPITALS & CLINICS SECTION */}
        {/* ===================================================================== */}
        <section className="py-20 md:py-24 bg-slate-50 border-b border-slate-200/80" id="products">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 block mb-2">INTEGRATED PRODUCT SUITE</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight">
                        EMSTRAP Products for Hospitals &amp; Clinics
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-4">
                        Connect pre-hospital ambulance operations directly into your hospital emergency department workflow.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-brandBlue flex items-center justify-center text-xl">
                                <i className="fa-solid fa-tower-broadcast"></i>
                            </div>
                            <h3 className="text-xl font-bold font-display text-slate-900 group-hover:text-brandBlue transition-colors">EMSTRAP Connect</h3>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                Enterprise emergency call dispatch, interoperable multi-agency communication, and hospital intake registration hub.
                            </p>
                        </div>
                        <div className="pt-6 border-t border-slate-100 mt-6">
                            <Link to="/connect" className="text-xs font-bold text-brandBlue flex items-center gap-1.5 hover:underline">
                                <span>Explore Connect</span>
                                <i className="fa-solid fa-arrow-right text-[10px]"></i>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
                                <i className="fa-solid fa-route"></i>
                            </div>
                            <h3 className="text-xl font-bold font-display text-slate-900 group-hover:text-emerald-600 transition-colors">EMSTRAP Ride</h3>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                Ambulance dynamic GPS navigation, in-transit clinical vitals streaming, and emergency corridor coordination with traffic police.
                            </p>
                        </div>
                        <div className="pt-6 border-t border-slate-100 mt-6">
                            <Link to="/ride" className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 hover:underline">
                                <span>Explore Ride</span>
                                <i className="fa-solid fa-arrow-right text-[10px]"></i>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200/90 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl">
                                <i className="fa-solid fa-hospital"></i>
                            </div>
                            <h3 className="text-xl font-bold font-display text-slate-900 group-hover:text-purple-600 transition-colors">EMSTRAP Command</h3>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                Centralized emergency department dashboard, trauma bay allocation, on-call specialist paging, and real-time bed analytics.
                            </p>
                        </div>
                        <div className="pt-6 border-t border-slate-100 mt-6">
                            <Link to="/command" className="text-xs font-bold text-purple-600 flex items-center gap-1.5 hover:underline">
                                <span>Explore Command</span>
                                <i className="fa-solid fa-arrow-right text-[10px]"></i>
                            </Link>
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
                        Better preparation. Better outcomes.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed mt-4">
                        Measurable clinical efficiencies that save lives during critical trauma and emergency intake.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                            <i className="fa-solid fa-clock text-base"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-white mb-2">Faster Emergency Response</h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                            Significantly reduce door-to-needle, door-to-CT, and door-to-balloon times for critical patients.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                            <i className="fa-solid fa-hospital-user text-base"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-white mb-2">Better Trauma Preparedness</h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                            Surgical suites, resuscitation bays, and emergency blood products prepped before patient arrival.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                            <i className="fa-solid fa-heart-pulse text-base"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-white mb-2">Pre-Arrival Patient Data</h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                            Physicians review ECG, oxygen levels, and field medical interventions before the patient reaches the doors.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                            <i className="fa-solid fa-bed-pulse text-base"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-white mb-2">Resource Allocation</h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                            Eliminate bay delays by preparing ventilators, radiology suites, and ICU beds in advance.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                            <i className="fa-solid fa-handshake-angle text-base"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-white mb-2">Seamless Collaboration</h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                            Direct communication between incoming paramedics and ER triage consultants eliminates miscommunication.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                            <i className="fa-solid fa-hourglass-half text-base"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-white mb-2">Reduced Waiting Times</h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                            Smooth, rapid patient transfer straight from ambulance stretcher to assigned trauma bed.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                            <i className="fa-solid fa-circle-check text-base"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-white mb-2">Improved Survival Rates</h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                            Maximize golden hour preservation for severe trauma, acute myocardial infarction, and stroke cases.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4">
                            <i className="fa-solid fa-file-medical text-base"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-white mb-2">Comprehensive Audit Logs</h3>
                        <p className="text-xs text-white/70 leading-relaxed">
                            Precise digital timestamps and vitals logs for clinical governance, compliance, and quality benchmarking.
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
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400 block">CLINICAL EXCELLENCE</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white">
                    Equip Your ER With Pre-Arrival Intelligence.
                </h2>
                <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
                    Transform incoming emergency transfers and optimize clinical outcomes with EMSTRAP ER coordination platform.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                    <button onClick={openSolutionModal} className="px-8 py-3.5 rounded-full bg-brandBlue hover:bg-brandBlueDark text-white font-bold tracking-wider text-xs uppercase transition-all shadow-lg hover:shadow-xl font-display hover:scale-105 active:scale-95">
                        Request Hospital Briefing
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
                        <li><Link to="/hospitals-and-clinics" className="text-white font-medium">Hospitals &amp; Clinics</Link></li>
                        <li><Link to="/educational-campuses" className="hover:text-white transition-colors">Educational Campuses</Link></li>
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
            <h3 className="text-xl font-bold font-display text-white mb-2">Request Hospital Intake Briefing</h3>
            <p className="text-xs text-white/70 mb-6">Learn how EMSTRAP accelerates ER telemetry and prepares clinical teams in advance.</p>
            <form onSubmit={handleSolutionSubmit} className="space-y-4 text-xs">
                <div>
                    <label className="block text-white/80 font-medium mb-1">Hospital / Clinic Name</label>
                    <input type="text" required placeholder="Hospital Network / Trauma Center" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-brandBlue" />
                </div>
                <div>
                    <label className="block text-white/80 font-medium mb-1">Official Email</label>
                    <input type="email" required placeholder="er-head@hospital.org" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-brandBlue" />
                </div>
                <div>
                    <label className="block text-white/80 font-medium mb-1">Contact Phone</label>
                    <input type="tel" required placeholder="+91 ..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-brandBlue" />
                </div>
                <div>
                    <label className="block text-white/80 font-medium mb-1">Trauma / ER Requirements</label>
                    <textarea rows={3} placeholder="Number of ER beds, inbound ambulance frequency, pre-arrival needs..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-brandBlue"></textarea>
                </div>
                <button type="submit" className="w-full py-3 rounded-full bg-brandBlue hover:bg-brandBlueDark text-white font-bold tracking-wider uppercase transition-all shadow-lg font-display">
                    Submit Request
                </button>
            </form>
        </div></div>
    </div>
  );
}
