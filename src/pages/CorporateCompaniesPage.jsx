import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageSetup, showEmstrapAlert, submitEmstrapModalRequest } from "../utils/emstrapLifecycle";

const PAGE_CSS = ".hero-gradient-overlay {\n            background: linear-gradient(to right, rgba(5, 11, 20, 0.95) 0%, rgba(5, 11, 20, 0.85) 45%, rgba(5, 11, 20, 0.55) 75%, rgba(5, 11, 20, 0.25) 100%);\n        }\n        .card-zoom-img {\n            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);\n        }\n        .card-hover-box:hover .card-zoom-img {\n            transform: scale(1.05);\n        }";

export default function CorporateCompaniesPage() {
  usePageSetup({
    title: "A Safer Workplace Starts With Faster Response. | EMSTRAP Solutions",
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
      requestType: "Corporate Companies Briefing Request",
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
    <div className="page-scope-corporatecompaniespage theme-solutions min-h-screen flex flex-col justify-between">
      

    {/* ===================================================================== */}
    {/* GLOBAL NAVIGATION HEADER */}
    {/* ===================================================================== */}
    
{/* ===================================================================== */}
{/* EMSTRAP CORPORATE SOLUTIONS NAVBAR */}
{/* ===================================================================== */}

<header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">

    <nav className="max-w-7xl mx-auto px-6 md:px-12 h-[76px] flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
            <img
                src="/images/logo.png"
                alt="EMSTRAP Logo"
                className="h-10 w-auto object-contain"
            />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-7">

            <a href="#home" className="text-sm font-semibold text-slate-700">
  Home
</a>

            <a href="#challenges" className="text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors">
                Challenges
            </a>

            <a href="#solutions" className="text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors">
                Solutions
            </a>

            <a href="#benefits" className="text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors">
                Benefits
            </a>

            <a href="#ecosystem" className="text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors">
                Ecosystem
            </a>

            <Link to="/contact" className="text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors">
                Contact
            </Link>

        </div>

        

        {/* Mobile Menu Button */}
        <button
            id="mobileMenuBtn"
            type="button"
            aria-label="Toggle navigation menu"
            aria-controls="mobileMenu"
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-800 hover:bg-slate-100 transition-colors"
        >
            <i className="fa-solid fa-bars text-lg"></i>
        </button>

    </nav>

    {/* Mobile Navigation */}
    <div
        id="mobileMenu"
        className="hidden lg:hidden bg-white border-t border-slate-100 shadow-lg"
    >
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-5">

           <a href="#home" className="text-sm font-semibold text-slate-700">
  Home
</a>

            <a href="#challenges" className="text-sm font-semibold text-slate-700">
                Challenges
            </a>

            <a href="#solutions" className="text-sm font-semibold text-slate-700">
                Solutions
            </a>

            <a href="#benefits" className="text-sm font-semibold text-slate-700">
                Benefits
            </a>

            <a href="#ecosystem" className="text-sm font-semibold text-slate-700">
                Ecosystem
            </a>

            <Link to="/contact" className="text-sm font-semibold text-slate-700">
                Contact
            </Link>

            

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
                <img src="/images/hero-corporate.jpg" alt="FOR CORPORATE COMPANIES" className="w-full h-full object-cover object-center" decoding="async" />
                <div className="absolute inset-0 hero-gradient-overlay"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 sm:py-20 lg:py-24 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    
                    {/* Left Hero Content */}
                    <div className="lg:col-span-12 space-y-6 max-w-3xl">

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-[1.08]">
                            A Safer Workplace<br />Starts With Faster Response.
                        </h1>

                        <p className="text-base sm:text-lg text-white/80 font-normal leading-relaxed max-w-xl">
                            EMSTRAP Shield helps organisations protect employees through integrated emergency response, medical assistance, fire safety and safety management.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <a href="#solutions" className="px-8 py-3.5 rounded-full bg-brandBlue hover:bg-brandBlueDark text-white font-bold tracking-wider text-xs uppercase transition-all shadow-lg hover:shadow-xl font-display hover:scale-105 active:scale-95 inline-flex items-center gap-2">
                                <span>HOW EMSTRAP HELPS</span>
                                <i className="fa-solid fa-arrow-down text-[10px]"></i>
                            </a>
                            
                        </div>

                        {/* Tag Pills */}
                        <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-2 text-xs font-medium text-white/60">
                            
                                <span>Employee Safety</span>
                                <span className="text-white/20">|</span>
                            
                                <span>Emergency Response</span>
                                <span className="text-white/20">|</span>
                            
                                <span>Fire Safety</span>
                                <span className="text-white/20">|</span>
                            
                                <span>Safety Management</span>
                                
                            
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
                        Companies need to prepare for workplace emergencies.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-4">
                        From medical emergencies and fire incidents to complex multi-site evacuation, corporate safety demands a coordinated, technology-driven approach.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/corp-workplace-emergency.jpg" alt="Employee Emergencies" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Employee Emergencies
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Unpredictable incidents involving staff require an immediate, coordinated response with no room for communication gaps.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/corp-medical-response.jpg" alt="Medical Incidents" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Medical Incidents
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Medical emergencies in the workplace need fast action and seamless coordination with ambulance and hospital services.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/corp-fire-response.jpg" alt="Fire Incidents" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Fire Incidents
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Fire events demand organized evacuation procedures and rapid coordination with fire services to minimize harm.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/corp-evacuation.jpg" alt="Emergency Evacuation" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Emergency Evacuation
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Multi-floor, multi-site facilities require structured and well-practiced evacuation protocols that workers can execute under pressure.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/corp-safety-training.jpg" alt="Safety Training Gaps" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Safety Training Gaps
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Inadequate emergency training leaves employees unprepared, reducing response effectiveness when it matters most.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/corp-incident-documentation.jpg" alt="Incident Reporting" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-emergencyRed w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-emergencyRed transition-colors">
                                    Incident Reporting
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Manual or paper-based incident records create accountability gaps and hinder post-incident analysis and compliance.
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
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-brandBlue block mb-2">HOW EMSTRAP HELPS</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight">
                        A complete platform for workplace safety and emergency response.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-4">
                        EMSTRAP Shield integrates every layer of corporate emergency preparedness — from daily safety management to live incident response.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/corp-employee-sos.jpg" alt="Employee SOS" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Employee SOS
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    One-touch emergency activation for employees to trigger immediate assistance with real-time location sharing.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/corp-medical-support.jpg" alt="Medical Emergency Support" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Medical Emergency Support
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Connect employees directly to ambulance services with location data and priority routing to the nearest hospital.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/corp-fire-panel.jpg" alt="Fire Safety Management" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Fire Safety Management
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Integrated fire incident management with evacuation tracking, headcount tools and fire service coordination.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/corp-briefing.jpg" alt="Employee Training" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Employee Training
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Digital safety training programs that ensure every employee is prepared and aware of emergency procedures.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/corp-mock-drill.jpg" alt="Mock Drills" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Mock Drills
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    Schedule and run structured emergency simulations with automated tracking, real-time monitoring and drill reporting.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-hover-box bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] bg-slate-100 overflow-hidden relative">
                                <img src="/images/cards/corp-safety-dashboard.jpg" alt="Safety Management" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                            </div>
                            <div className="h-[2px] bg-brandBlue w-full"></div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-display text-slate-900 mb-2 group-hover:text-brandBlue transition-colors">
                                    Safety Management
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                    A centralized platform for safety policies, incident records, compliance documentation and operational dashboards.
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
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400 block mb-2">KEY BENEFITS</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
                        Build a safer and more prepared organization.
                    </h2>
                    <p className="text-sm sm:text-base text-white/70 font-normal leading-relaxed mt-4">
                        EMSTRAP Shield delivers measurable improvements across every dimension of workplace safety and emergency readiness.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    <div className="bg-white/5 border border-white/10 hover:border-blue-500/40 p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 group">
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-white">
                            <i className="fa-solid fa-bolt text-white text-lg"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-white mb-2 group-hover:text-white transition-colors">
                            Faster Emergency Response
                        </h3>
                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                            Direct digital emergency activation reduces response times and closes critical gaps in coordination.
                        </p>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 hover:border-blue-500/40 p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 group">
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-white">
                            <i className="fa-solid fa-shield-halved text-white text-lg"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-white mb-2 group-hover:text-white transition-colors">
                            Improved Employee Safety
                        </h3>
                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                            Every employee has direct access to emergency assistance in critical moments, regardless of location.
                        </p>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 hover:border-blue-500/40 p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 group">
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-white">
                            <i className="fa-solid fa-circle-check text-white text-lg"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-white mb-2 group-hover:text-white transition-colors">
                            Better Preparedness
                        </h3>
                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                            Regular digital drills and structured training build a safety-ready workforce across all sites.
                        </p>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 hover:border-blue-500/40 p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 group">
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-white">
                            <i className="fa-solid fa-layer-group text-indigo-500 text-lg"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-white mb-2 group-hover:text-white transition-colors">
                            Centralized Safety Management
                        </h3>
                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                            Manage all safety operations, documentation and compliance from one connected platform.
                        </p>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 hover:border-blue-500/40 p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 group">
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-white">
                            <i className="fa-solid fa-users text-sky-500 text-lg"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-white mb-2 group-hover:text-white transition-colors">
                            Improved Emergency Coordination
                        </h3>
                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                            Connect internal safety teams with external ambulance and emergency services seamlessly.
                        </p>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 hover:border-blue-500/40 p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 group">
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-white">
                            <i className="fa-solid fa-eye text-white text-lg"></i>
                        </div>
                        <h3 className="text-base font-bold font-display text-white mb-2 group-hover:text-white transition-colors">
                            Better Incident Visibility
                        </h3>
                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                            Real-time incident monitoring gives safety managers complete situational awareness across all locations.
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
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 block mb-2">THE EMSTRAP CORPORATE ECOSYSTEM</span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight">
                        A connected safety cycle.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-4">
                        A connected safety cycle.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-200 relative">
                                <img src="/images/ecosystem/eco-planning.jpg" alt="Safety Planning" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                                <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider">
                                    STEP 01
                                </div>
                            </div>
                            <h3 className="text-base font-bold font-display text-slate-900 mb-1 group-hover:text-brandBlue transition-colors">
                                Safety Planning
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                Policies, protocols and responsibilities defined.
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-200 relative">
                                <img src="/images/ecosystem/eco-training.jpg" alt="Employee Training" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                                <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider">
                                    STEP 02
                                </div>
                            </div>
                            <h3 className="text-base font-bold font-display text-slate-900 mb-1 group-hover:text-brandBlue transition-colors">
                                Employee Training
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                Staff trained through digital programs.
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-200 relative">
                                <img src="/images/ecosystem/eco-drill.jpg" alt="Mock Drills" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                                <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider">
                                    STEP 03
                                </div>
                            </div>
                            <h3 className="text-base font-bold font-display text-slate-900 mb-1 group-hover:text-brandBlue transition-colors">
                                Mock Drills
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                Simulations test readiness and identify gaps.
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-200 relative">
                                <img src="/images/ecosystem/eco-trigger.jpg" alt="Emergency Trigger" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                                <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider">
                                    STEP 04
                                </div>
                            </div>
                            <h3 className="text-base font-bold font-display text-slate-900 mb-1 group-hover:text-brandBlue transition-colors">
                                Emergency Trigger
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                SOS activated or automated alert fired.
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-200 relative">
                                <img src="/images/ecosystem/eco-response.jpg" alt="Response & Assistance" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                                <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider">
                                    STEP 05
                                </div>
                            </div>
                            <h3 className="text-base font-bold font-display text-slate-900 mb-1 group-hover:text-brandBlue transition-colors">
                                Response & Assistance
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                Coordinated internal and external response.
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all duration-300">
                        <div>
                            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-200 relative">
                                <img src="/images/ecosystem/eco-analytics.jpg" alt="Reporting & Improvement" className="w-full h-full object-cover card-zoom-img" loading="lazy" />
                                <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider">
                                    STEP 06
                                </div>
                            </div>
                            <h3 className="text-base font-bold font-display text-slate-900 mb-1 group-hover:text-brandBlue transition-colors">
                                Reporting & Improvement
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                Digital records enable continuous improvement.
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
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-brandBlue">FOR CORPORATE COMPANIES</span>
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
