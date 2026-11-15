import { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageSetup } from "../utils/emstrapLifecycle";

const PAGE_CSS = ":root {\n    --navy: #071a33;\n    --blue: #1268d6;\n    --red: #ed171f;\n    --ink: #10213e;\n    --muted: #52627a;\n    --line: #e4eaf2;\n    --pale: #f4f8fd;\n} .page-scope-aboutpage * {\n    box-sizing: border-box;\n} .page-scope-aboutpage {\n    scroll-behavior: smooth;\n    scroll-padding-top: 85px;\n} .page-scope-aboutpage {\n    margin: 0;\n    font-family: 'Inter', sans-serif;\n    color: var(--ink);\n    background: white;\n    line-height: 1.55;\n    overflow-x: clip;\n}\n\nimg {\n    display: block;\n    max-width: 100%;\n}\n\na {\n    text-decoration: none;\n    color: inherit;\n}\n\n.container {\n    width: min(1180px, calc(100% - 48px));\n    margin: auto;\n}\n\nh1, h2, h3, h4 {\n    font-family: 'Outfit', sans-serif;\n    line-height: 1.12;\n    color: var(--navy);\n    margin: 0;\n}\n\nh1 {\n    font-size: clamp(38px, 5vw, 68px);\n    letter-spacing: -2px;\n}\n\nh2 {\n    font-size: clamp(30px, 3.5vw, 46px);\n    letter-spacing: -1px;\n}\n\np {\n    color: var(--muted);\n    margin: 0;\n}\n\n.btn {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    gap: 10px;\n    min-height: 46px;\n    padding: 0 20px;\n    border-radius: 8px;\n    font-size: 13px;\n    font-weight: 800;\n    transition: .25s ease;\n}\n\n.btn:hover {\n    transform: translateY(-3px);\n}\n\n.btn-red {\n    background: var(--red);\n    color: white;\n    box-shadow: 0 8px 20px rgba(237,23,31,.18);\n}\n\n.btn-red:hover {\n    background: #d90e16;\n}\n\n.btn-dark {\n    background: var(--navy);\n    color: white;\n}\n\n.btn-outline {\n    border: 1px solid rgba(255,255,255,.65);\n    color: white;\n}\n\n/* HEADER */\n\n.site-header {\n    height: 76px;\n    position: sticky;\n    top: 0;\n    z-index: 1000;\n    background: rgba(255,255,255,.97);\n    backdrop-filter: blur(14px);\n    border-bottom: 1px solid var(--line);\n}\n\n.nav-wrap {\n    height: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 20px;\n}\n\n.brand img {\n    width: 142px;\n    height: 54px;\n    object-fit: contain;\n}\n\n.main-nav {\n    display: flex;\n    align-items: center;\n    gap: 25px;\n    font-size: 13px;\n    font-weight: 800;\n}\n\n.main-nav a {\n    position: relative;\n    padding: 28px 0;\n    white-space: nowrap;\n    transition: .2s;\n}\n\n.main-nav a:hover,\n.main-nav a.active {\n    color: var(--red);\n}\n\n.main-nav a.active::after {\n    content: \"\";\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: 17px;\n    height: 2px;\n    background: var(--red);\n}\n\n.nav-actions {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n}\n\n.nav-actions .btn {\n    min-height: 42px;\n    padding: 0 14px;\n    font-size: 12px;\n}\n\n.menu-toggle {\n    display: none;\n    width: 42px;\n    height: 42px;\n    border: 1px solid var(--line);\n    background: white;\n    border-radius: 9px;\n    color: var(--navy);\n    font-size: 18px;\n}\n\n/* HERO */\n\n/* ABOUT HERO SECTION */\n\n.about-hero {\n    position: relative;\n    min-height: 520px;\n\n    display: flex;\n    align-items: center;\n\n    background:\n        linear-gradient(\n            90deg,\n            rgba(4, 17, 35, 0.96) 0%,\n            rgba(4, 17, 35, 0.85) 42%,\n            rgba(4, 17, 35, 0.35) 100%\n        ),\n\n        url('/images/banner/banner-ambulance.jpg');\n\n    background-size: cover;\n    background-position: center;\n    background-repeat: no-repeat;\n\n    overflow: hidden;\n}\n\n.hero-inner {\n    position: relative;\n    z-index: 2;\n    max-width: 760px;\n    padding: 90px 0;\n}\n\n.about-hero h1 {\n    color: #ffffff;\n}\n\n.about-hero h1 span {\n    color: #ff252d;\n}\n\n.hero-copy {\n    color: #e5edf7;\n    font-size: 16px;\n    line-height: 1.7;\n    max-width: 650px;\n    margin-top: 20px;\n}\n\n/* COMMON SECTIONS */\n\n.section {\n    padding: 82px 0;\n}\n\n.eyebrow {\n    display: inline-flex;\n    align-items: center;\n    gap: 10px;\n    color: var(--red);\n    font-size: 12px;\n    font-weight: 800;\n    letter-spacing: 1px;\n    text-transform: uppercase;\n}\n\n.eyebrow::before {\n    content: \"\";\n    width: 28px;\n    height: 2px;\n    background: var(--red);\n}\n\n/* WHO WE ARE */\n\n.intro-grid {\n    display: grid;\n    grid-template-columns: 1.05fr .95fr;\n    gap: 55px;\n    align-items: center;\n}\n\n.intro-copy h2 {\n    margin: 14px 0 18px;\n}\n\n.intro-copy h2 span {\n    color: var(--red);\n}\n\n.intro-copy p {\n    font-size: 14px;\n    margin-bottom: 13px;\n}\n\n.intro-image {\n    position: relative;\n}\n\n.intro-image img {\n    width: 100%;\n    height: 370px;\n    object-fit: cover;\n    border-radius: 16px;\n    box-shadow: 0 16px 40px rgba(12,35,68,.1);\n}\n\n.image-caption {\n    position: absolute;\n    left: 18px;\n    bottom: 18px;\n    padding: 12px 16px;\n    border-radius: 10px;\n    background: rgba(7,26,51,.9);\n    color: white;\n    font-size: 12px;\n    font-weight: 700;\n}\n\n/* MISSION AND VISION */\n\n.mission-band {\n    background: var(--pale);\n    border-block: 1px solid var(--line);\n}\n\n.section-heading {\n    max-width: 720px;\n    margin-bottom: 34px;\n}\n\n.section-heading h2 {\n    margin: 12px 0;\n}\n\n.section-heading p {\n    font-size: 15px;\n}\n\n.mission-grid {\n    display: grid;\n    grid-template-columns: repeat(2,1fr);\n    gap: 20px;\n}\n\n.mission-card {\n    display: flex;\n    gap: 18px;\n    padding: 27px;\n    border: 1px solid var(--line);\n    border-radius: 15px;\n    background: white;\n    box-shadow: 0 8px 24px rgba(12,35,68,.04);\n    transition: .25s;\n}\n\n.mission-card:hover {\n    transform: translateY(-4px);\n    box-shadow: 0 16px 40px rgba(12,35,68,.1);\n}\n\n.icon-box {\n    flex: 0 0 48px;\n    width: 48px;\n    height: 48px;\n    border-radius: 13px;\n    display: grid;\n    place-items: center;\n    background: #fff0f0;\n    color: var(--red);\n    font-size: 19px;\n}\n\n.mission-card:nth-child(2) .icon-box {\n    background: #eaf3ff;\n    color: var(--blue);\n}\n\n.mission-card h3 {\n    font-size: 21px;\n    margin-bottom: 9px;\n}\n\n.mission-card p {\n    font-size: 14px;\n}\n\n/* CHALLENGES */\n\n.center-heading {\n    text-align: center;\n    max-width: 760px;\n    margin: 0 auto 38px;\n}\n\n.center-heading h2 {\n    margin: 13px 0;\n}\n\n.center-heading .eyebrow {\n    justify-content: center;\n}\n\n.problem-grid {\n    display: grid;\n    grid-template-columns: repeat(4,1fr);\n    gap: 16px;\n}\n\n.problem-card {\n    padding: 23px 20px;\n    border: 1px solid var(--line);\n    border-radius: 14px;\n    background: white;\n    transition: .25s;\n}\n\n.problem-card:hover {\n    transform: translateY(-4px);\n    box-shadow: 0 16px 40px rgba(12,35,68,.1);\n}\n\n.problem-top {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    margin-bottom: 20px;\n}\n\n.problem-label {\n    font-size: 11px;\n    font-weight: 800;\n    letter-spacing: 1px;\n    color: #7b8798;\n}\n\n.problem-card .icon-box {\n    width: 40px;\n    height: 40px;\n    flex-basis: 40px;\n    background: #eef5ff;\n    color: var(--blue);\n}\n\n.problem-card h3 {\n    font-size: 18px;\n    margin-bottom: 9px;\n}\n\n.problem-card p {\n    font-size: 13px;\n}\n\n/* SOLUTIONS */\n\n.ecosystem {\n    background: var(--navy);\n}\n\n.ecosystem h2 {\n    color: white;\n}\n\n.ecosystem .section-heading p {\n    color: #c5d3e5;\n}\n\n.solution-grid {\n    display: grid;\n    grid-template-columns: repeat(4,1fr);\n    gap: 15px;\n}\n\n.solution-card {\n    padding: 24px 20px;\n    border: 1px solid rgba(255,255,255,.16);\n    border-radius: 14px;\n    background: rgba(255,255,255,.06);\n    transition: .25s;\n}\n\n.solution-card:hover {\n    transform: translateY(-4px);\n    background: rgba(255,255,255,.12);\n}\n\n.solution-card .icon-box {\n    background: rgba(255,255,255,.12);\n    color: white;\n    margin-bottom: 18px;\n}\n\n.solution-card h3 {\n    color: white;\n    font-size: 18px;\n    margin-bottom: 9px;\n}\n\n.solution-card p {\n    color: #c5d3e5;\n    font-size: 13px;\n}\n\n/* FOUNDERS */\n\n.founder-grid {\n    display: grid;\n    grid-template-columns: repeat(2,1fr);\n    gap: 22px;\n}\n\n.founder-card {\n    display: grid;\n    grid-template-columns: 180px 1fr;\n    overflow: hidden;\n    border: 1px solid var(--line);\n    border-radius: 16px;\n    background: white;\n    box-shadow: 0 8px 24px rgba(12,35,68,.05);\n    transition: .25s;\n}\n\n.founder-card:hover {\n    transform: translateY(-4px);\n    box-shadow: 0 16px 40px rgba(12,35,68,.1);\n}\n\n.founder-card img {\n    width: 100%;\n    height: 100%;\n    min-height: 230px;\n    object-fit: cover;\n    object-position: center top;\n}\n\n.founder-info {\n    padding: 24px;\n    align-self: center;\n}\n\n.founder-info .role {\n    display: inline-block;\n    color: var(--red);\n    font-size: 11px;\n    font-weight: 800;\n    letter-spacing: 1px;\n    text-transform: uppercase;\n    margin-bottom: 9px;\n}\n\n.founder-info h3 {\n    font-size: 22px;\n    margin-bottom: 8px;\n}\n\n.founder-info p {\n    font-size: 13px;\n}\n\n.social-link {\n    display: inline-flex;\n    align-items: center;\n    gap: 8px;\n    color: var(--blue);\n    font-size: 12px;\n    font-weight: 800;\n    margin-top: 16px;\n}\n\n/* CALL TO ACTION */\n\n.about-cta {\n    padding: 62px 0;\n    background: linear-gradient(110deg,#0a1e39,#12365f);\n}\n\n.cta-inner {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 28px;\n}\n\n.cta-inner h2 {\n    color: white;\n    font-size: clamp(28px,3vw,40px);\n    margin-bottom: 10px;\n}\n\n.cta-inner p {\n    color: #d4e0ee;\n    max-width: 650px;\n}\n\n.cta-actions {\n    display: flex;\n    gap: 10px;\n    flex-wrap: wrap;\n    flex-shrink: 0;\n}\n\n/* FOOTER */\n\n.site-footer {\n    background: #06172d;\n    color: white;\n    padding: 42px 0 18px;\n}\n\n.footer-grid {\n    display: grid;\n    grid-template-columns: 1.4fr 1fr 1.2fr 1fr;\n    gap: 38px;\n    padding-bottom: 30px;\n}\n\n.footer-brand img {\n    width: 145px;\n    height: 56px;\n    object-fit: contain;\n    object-position: left center;\n}\n\n.footer-brand p {\n    color: #c4d0df;\n    font-size: 13px;\n    max-width: 260px;\n    margin-top: 12px;\n}\n\n.footer-col h4 {\n    color: white;\n    font: 800 14px Inter,sans-serif;\n    margin: 9px 0 15px;\n}\n\n.footer-col a {\n    display: block;\n    color: #c4d0df;\n    font-size: 13px;\n    margin: 9px 0;\n    transition: .2s;\n}\n\n.footer-col a:hover {\n    color: white;\n}\n\n.footer-bottom {\n    border-top: 1px solid rgba(255,255,255,.2);\n    padding-top: 16px;\n    display: flex;\n    justify-content: space-between;\n    gap: 18px;\n    color: #aebdd0;\n    font-size: 12px;\n}\n\n.footer-social {\n    display: flex;\n    gap: 14px;\n}\n\n.footer-social a {\n    color: white;\n}\n\n/* ANIMATIONS */\n\n.reveal {\n    opacity: 0;\n    transform: translateY(22px);\n    transition: opacity .65s ease, transform .65s ease;\n}\n\n.reveal.visible {\n    opacity: 1;\n    transform: translateY(0);\n}\n\n@media(prefers-reduced-motion: reduce) {\n .page-scope-aboutpage {\n        scroll-behavior: auto;\n    }\n\n    .reveal {\n        opacity: 1;\n        transform: none;\n        transition: none;\n    } .page-scope-aboutpage * {\n        animation-duration: .01ms !important;\n        transition-duration: .01ms !important;\n    }\n}\n\n/* TABLET */\n\n@media(max-width:1050px) {\n    .main-nav {\n        gap: 14px;\n    }\n\n    .main-nav a {\n        font-size: 12px;\n    }\n\n    .problem-grid,\n    .solution-grid {\n        grid-template-columns: repeat(2,1fr);\n    }\n\n    .founder-card {\n        grid-template-columns: 145px 1fr;\n    }\n}\n\n/* MOBILE */\n\n@media(max-width:820px) {\n    .site-header {\n        height: 70px;\n    }\n\n    .brand img {\n        width: 130px;\n    }\n\n    .menu-toggle {\n        display: grid;\n        place-items: center;\n    }\n\n    .nav-wrap {\n        position: relative;\n    }\n\n    .main-nav {\n        display: none;\n        position: absolute;\n        top: 69px;\n        left: -24px;\n        right: -24px;\n        padding: 14px 24px 20px;\n        background: white;\n        border-bottom: 1px solid var(--line);\n        box-shadow: 0 16px 24px rgba(10,30,57,.1);\n        align-items: stretch;\n        gap: 0;\n        flex-direction: column;\n    }\n\n    .main-nav.open {\n        display: flex;\n    }\n\n    .main-nav a {\n        padding: 12px 4px;\n        font-size: 14px;\n    }\n\n    .main-nav a.active::after {\n        display: none;\n    }\n\n    .nav-actions .btn-outline {\n        display: none;\n    }\n\n    .intro-grid {\n        grid-template-columns: 1fr;\n        gap: 28px;\n    }\n\n    .intro-image img {\n        height: 320px;\n    }\n\n    .footer-grid {\n        grid-template-columns: repeat(2,1fr);\n        gap: 25px;\n    }\n}\n\n/* SMALL MOBILE */\n\n@media(max-width:600px) {\n    .container {\n        width: min(100% - 34px,1180px);\n    }\n\n    .main-nav {\n        left: -17px;\n        right: -17px;\n    }\n\n    .nav-actions .btn-red {\n        font-size: 0;\n        width: 42px;\n        padding: 0;\n    }\n\n    .nav-actions .btn-red i {\n        font-size: 16px;\n    }\n\n    .about-hero {\n        min-height: 530px;\n        background-position: 58% center;\n    }\n\n    .hero-inner {\n        padding: 65px 0;\n    }\n\n    .hero-copy {\n        font-size: 14px;\n    }\n\n    .hero-proof {\n        gap: 12px 18px;\n    }\n\n    .section {\n        padding: 62px 0;\n    }\n\n    .intro-image img {\n        height: 250px;\n    }\n\n    .mission-grid,\n    .problem-grid,\n    .solution-grid,\n    .founder-grid {\n        grid-template-columns: 1fr;\n    }\n\n    .mission-card {\n        padding: 22px;\n    }\n\n    .problem-card {\n        padding: 20px;\n    }\n\n    .founder-card {\n        grid-template-columns: 112px 1fr;\n    }\n\n    .founder-card img {\n        min-height: 190px;\n    }\n\n    .founder-info {\n        padding: 16px;\n    }\n\n    .founder-info h3 {\n        font-size: 18px;\n    }\n\n    .founder-info p {\n        font-size: 12px;\n    }\n\n    .cta-inner {\n        align-items: flex-start;\n        flex-direction: column;\n    }\n\n    .footer-grid {\n        grid-template-columns: 1fr 1fr;\n        gap: 22px;\n    }\n\n    .footer-brand {\n        grid-column: 1/-1;\n    }\n\n    .footer-bottom {\n        flex-direction: column;\n    }\n}\n\n@media(max-width:380px) {\n    .founder-card {\n        grid-template-columns: 1fr;\n    }\n\n    .founder-card img {\n        height: 230px;\n    }\n\n    .footer-grid {\n        grid-template-columns: 1fr;\n    }\n}\n@media (max-width: 768px) {\n\n    .about-hero {\n        min-height: 520px;\n\n        background-position: 65% center;\n\n        background-image:\n            linear-gradient(\n                90deg,\n                rgba(4, 17, 35, 0.94),\n                rgba(4, 17, 35, 0.72)\n            ),\n            url('/images/banner/banner-ambulance.jpg');\n    }\n\n    .hero-inner {\n        padding: 70px 0;\n    }\n\n    .about-hero h1 {\n        font-size: 38px;\n    }\n\n    .hero-copy {\n        font-size: 14px;\n    }\n}";

export default function AboutPage() {
  usePageSetup({
    title: "About EMSTRAP | Emergency Response Technology",
    bodyClass: "bg-white text-slate-900 font-sans antialiased",
    customCss: PAGE_CSS,
    enableWave: false,
    enableHeaderAmbulance: false,
  });

  useEffect(() => {
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    const setToggleIcon = (isOpen) => {
      if (!menuToggle) return;
      const icon = document.createElement("i");
      icon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
      menuToggle.replaceChildren(icon);
    };
    const onToggle = () => {
      if (!menuToggle || !mainNav) return;
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      setToggleIcon(isOpen);
    };
    const onLinkClick = () => {
      if (!menuToggle || !mainNav) return;
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      setToggleIcon(false);
    };
    menuToggle?.addEventListener("click", onToggle);
    const links = mainNav ? Array.from(mainNav.querySelectorAll("a")) : [];
    links.forEach((l) => l.addEventListener("click", onLinkClick));

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => {
      menuToggle?.removeEventListener("click", onToggle);
      links.forEach((l) => l.removeEventListener("click", onLinkClick));
      observer.disconnect();
    };
  }, []);

  return (
    <div className="page-scope-aboutpage min-h-screen flex flex-col justify-between">
      

{/* HEADER */}


{/* =========================================
     ABOUT PAGE HEADER
========================================= */}

<header className="site-header">
  <div className="container nav-wrap">

    {/* EMSTRAP Logo */}
    <Link to="/" className="brand">
      <img src="/images/logo.png" alt="EMSTRAP Logo" />
    </Link>

    {/* Page Navigation */}
    <nav className="main-nav" id="mainNav">
    <a href="#home">Home</a>
    <a href="#our-story">Our Story</a>
    <a href="#challenges">Challenges</a>
    <a href="#solutions">Our Solutions</a>
    <a href="#leadership">Leadership</a>
    <Link to="/careers">Careers</Link>
</nav>

    {/* Contact Button and Mobile Menu */}
    <div className="nav-actions">
      <Link to="/contact" className="btn btn-red">
        Contact Us
        <i className="fa-solid fa-arrow-right"></i>
      </Link>

      <button
        className="menu-toggle"
        id="menuToggle"
        type="button"
        aria-label="Open navigation menu"
        aria-expanded="false"
      >
        <i className="fa-solid fa-bars"></i>
      </button>
    </div>

  </div>
</header>


<main>

{/* HERO SECTION */}

<section id="home" className="about-hero">

    <div className="container">
        <div className="hero-inner">

            <div className="hero-kicker">
                <i className="fa-solid fa-heart-pulse"></i>
                ABOUT EMSTRAP
            </div>

            <h1>
                When every second matters,
                <br />
                <span>every response counts.</span>
            </h1>

            <p className="hero-copy">
                EMSTRAP is building an AI-powered emergency response
                ecosystem that connects citizens, ambulance services,
                hospitals and authorities through intelligent technology
                and real-time coordination.
            </p>

            <div className="hero-buttons">

                <a href="#our-story" className="btn btn-red">
                    Discover Our Story
                    <i className="fa-solid fa-arrow-right"></i>
                </a>

                <Link to="/contact" className="btn btn-outline">
                    Talk to Our Team
                </Link>

            </div>

            <div className="hero-proof">

                <span>
                    <i className="fa-solid fa-tower-broadcast"></i>
                    Connected response
                </span>

                <span>
                    <i className="fa-solid fa-location-dot"></i>
                    Real-time visibility
                </span>

                <span>
                    <i className="fa-solid fa-hospital"></i>
                    Coordinated care
                </span>

            </div>

        </div>
    </div>

</section>

{/* WHO WE ARE */}

<section className="section" id="our-story">

    <div className="container intro-grid">

        <div className="intro-copy reveal">

            <span className="eyebrow">WHO WE ARE</span>

            <h2>
                Modernising emergency response
                <span>through technology.</span>
            </h2>

            <p>
                Emergency situations demand speed, coordination,
                and accurate decision-making. EMSTRAP is building
                a unified emergency response ecosystem designed to
                connect citizens, responders, hospitals, and
                authorities through intelligent technology.
            </p>

            <p>
                By integrating real-time communication, intelligent
                routing, GPS tracking, and multi-agency coordination
                into a single platform, EMSTRAP enables collaboration
                between public-safety authorities, healthcare networks,
                ambulance operators, and enterprises.
            </p>

            <Link to="/connect" className="btn btn-red">
                Explore Our Ecosystem
                <i className="fa-solid fa-arrow-right"></i>
            </Link>

        </div>

        <div className="intro-image reveal">

            <img src="/images/research-tmc-team.png" alt="Emergency response operations team" loading="lazy" />

            <div className="image-caption">
                <i className="fa-solid fa-satellite-dish"></i>
                One connected response ecosystem
            </div>

        </div>

    </div>

</section>



{/* CHALLENGES */}

<section className="section" id="challenges">

    <div className="container">

        <div className="center-heading reveal">

            <span className="eyebrow">THE CHALLENGES WE SOLVE</span>

            <h2>Critical gaps in emergency response.</h2>

            <p>
                Every minute during an emergency can matter.
                Disconnected systems can make it harder for
                responders to share information and coordinate action.
            </p>

        </div>

        <div className="problem-grid">

            <article className="problem-card reveal">

                <div className="problem-top">
                    <span className="problem-label">TRANSPORT</span>

                    <div className="icon-box">
                        <i className="fa-solid fa-truck-medical"></i>
                    </div>
                </div>

                <h3>Ambulance Delays</h3>

                <p>
                    Fragmented operators, manual dispatch and
                    limited visibility can delay the coordination
                    of emergency transport.
                </p>

            </article>

            <article className="problem-card reveal">

                <div className="problem-top">
                    <span className="problem-label">TRAFFIC</span>

                    <div className="icon-box">
                        <i className="fa-solid fa-traffic-light"></i>
                    </div>
                </div>

                <h3>Traffic Congestion</h3>

                <p>
                    Emergency vehicles can face city traffic
                    without coordinated route awareness and
                    traffic support.
                </p>

            </article>

            <article className="problem-card reveal">

                <div className="problem-top">
                    <span className="problem-label">ADMISSION</span>

                    <div className="icon-box">
                        <i className="fa-solid fa-hospital"></i>
                    </div>
                </div>

                <h3>Hospital Readiness</h3>

                <p>
                    Receiving teams may have limited advance
                    information about an incoming patient
                    and their situation.
                </p>

            </article>

            <article className="problem-card reveal">

                <div className="problem-top">
                    <span className="problem-label">OPERATIONS</span>

                    <div className="icon-box">
                        <i className="fa-solid fa-network-wired"></i>
                    </div>
                </div>

                <h3>Manual Coordination</h3>

                <p>
                    Citizens and responders may need to contact
                    multiple services when a coordinated
                    response is needed.
                </p>

            </article>

        </div>

    </div>

</section>

{/* OUR SOLUTIONS */}

<section className="section ecosystem" id="solutions">

    <div className="container">

        <div className="section-heading reveal">

            <span className="eyebrow">OUR APPROACH</span>

            <h2>A Unified Emergency Response Ecosystem.</h2>

            <p>
                EMSTRAP brings key parts of emergency response
                into a connected environment, helping information
                move from incident reporting to coordination and care.
            </p>

        </div>

        <div className="solution-grid">

            <article className="solution-card reveal">

                <div className="icon-box">
                    <i className="fa-solid fa-bolt"></i>
                </div>

                <h3>Intelligent Dispatch</h3>

                <p>
                    Support ambulance coordination with location-aware
                    workflows and relevant response information.
                </p>

            </article>

            <article className="solution-card reveal">

                <div className="icon-box">
                    <i className="fa-solid fa-route"></i>
                </div>

                <h3>Route Coordination</h3>

                <p>
                    Improve route visibility and support coordination
                    with traffic authorities where integrations
                    are available.
                </p>

            </article>

            <article className="solution-card reveal">

                <div className="icon-box">
                    <i className="fa-solid fa-heart-pulse"></i>
                </div>

                <h3>Hospital Readiness</h3>

                <p>
                    Help receiving teams prepare through advance
                    incident and patient information.
                </p>

            </article>

            <article className="solution-card reveal">

                <div className="icon-box">
                    <i className="fa-solid fa-shield-halved"></i>
                </div>

                <h3>Multi-Agency Connection</h3>

                <p>
                    Bring relevant responders and organisations
                    into a shared emergency coordination workflow.
                </p>

            </article>

        </div>

    </div>

</section>

{/* FOUNDERS */}

<section className="section" id="leadership">

    <div className="container">

        <div className="section-heading reveal">

            <span className="eyebrow">LEADERSHIP</span>

            <h2>People Building the Mission.</h2>

            <p>
                EMSTRAP is driven by a team focused on applying
                technology to real-world emergency response challenges.
            </p>

        </div>

        <div className="founder-grid">

            <article className="founder-card reveal">

                <img src="/founder-vinayak.jpg" alt="Vinayak Manjunath Gouda" loading="lazy" />

                <div className="founder-info">

                    <span className="role">
                        Founder & Chief Executive Officer
                    </span>

                    <h3>Vinayak Manjunath Gouda</h3>

                    <p>
                        Leading EMSTRAP's vision, product direction
                        and development of a connected emergency
                        response ecosystem.
                    </p>

                    <a className="social-link" href="https://www.linkedin.com/in/vinayak-manjunath-gouda" target="_blank" rel="noopener noreferrer">
                        Connect Through Linkedin
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>

                </div>

            </article>

            <article className="founder-card reveal">

                <img src="/founder-keerthi.jpg" alt="K Keerthi Shree" loading="lazy" />

                <div className="founder-info">

                    <span className="role">
                        Co-founder & Chief Marketing Officer
                    </span>

                    <h3>K. Keerthi Shree</h3>

                    <p>
                        Supporting EMSTRAP's growth, communications
                        and outreach as the company builds its
                        emergency response ecosystem.
                    </p>

                    <a className="social-link" href="https://www.linkedin.com/in/k-keerthi-shree-58b0b4300" target="_blank" rel="noopener noreferrer">
                        Connect Through Linkedin
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>

                </div>

            </article>

            <article className="founder-card reveal">

                <img src="/images/Samyuktha.jpeg" alt="Samyuktha Lakshmi M" loading="lazy" />

                <div className="founder-info">

                    <span className="role">
                        Tech Lead
                    </span>

                    <h3>Samyuktha Lakshmi M</h3>

                    <p>
                        Driving technical innovation, leading engineering
    initiatives, and overseeing the development of
    EMSTRAP's AI-powered emergency response ecosystem.
                    </p>

                    <a className="social-link" href="https://www.linkedin.com/in/samyuktha-lakshmi-m-engineering-student/" target="_blank" rel="noopener noreferrer">
                        Connect Through Linkedin
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>

                </div>

            </article>

        </div>

    </div>

</section>

{/* CONTACT CTA */}

<section className="about-cta">

    <div className="container cta-inner">

        <div>

            <h2>Let's Build a Faster, More Connected Response.</h2>

            <p>
                Partner with EMSTRAP to explore technology-led
                emergency coordination for communities, healthcare
                networks, public authorities and enterprises.
            </p>

        </div>

        <div className="cta-actions">

            <Link to="/contact" className="btn btn-red">
                Contact Us
                <i className="fa-solid fa-arrow-right"></i>
            </Link>

            <Link to="/careers" className="btn btn-outline">
                Join Our Team
            </Link>

        </div>

    </div>

</section>

</main>

{/* FOOTER */}

<footer className="site-footer">

    <div className="container">

        <div className="footer-grid">

            <div className="footer-brand">

                <Link to="/">
                    <img src="/images/logo1.jpeg" alt="EMSTRAP" />
                </Link>

                <p>
                    Transforming emergency response through smart
                    technology and real-time coordination.
                    Saving lives, one second at a time.
                </p>

            </div>

            <div className="footer-col">

                <h4>Quick Links</h4>

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
                <Link to="/about">About Us</Link>
                <Link to="/careers">Careers</Link>
                <Link to="/contact">Contact</Link>

            </div>

            <div className="footer-col">

                <h4>Our Solutions</h4>

                <Link to="/connect">EMSTRAP Connect</Link>
                <Link to="/ride">EMSTRAP Ride</Link>
                <Link to="/shield">EMSTRAP Shield</Link>
                <Link to="/command">EMSTRAP Command</Link>

            </div>

            <div className="footer-col">

                <h4>Connect With Us</h4>

                <a href="https://www.linkedin.com/company/emstrap/" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                </a>

                <a href="https://www.instagram.com/emstrap_official/" target="_blank" rel="noopener noreferrer">
                    Instagram
                </a>

                <Link to="/contact">
                    Partnership Enquiries
                </Link>

            </div>

        </div>

        <div className="footer-bottom">

            <span>
                © 2026 EMSTRAP Pvt. Ltd. All rights reserved.
            </span>

            <div className="footer-social">

                <a href="https://www.linkedin.com/company/emstrap/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-linkedin-in"></i>
                </a>

                <a href="https://www.instagram.com/emstrap_official/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-instagram"></i>
                </a>

            </div>

        </div>

    </div>

</footer>

{/* JAVASCRIPT */}




    </div>
  );
}
