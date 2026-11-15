import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { usePageSetup } from "../utils/emstrapLifecycle";

const PAGE_CSS = "/* =========================================\n   EMSTRAP CAREERS - GLOBAL STYLES\n========================================= */\n\n:root {\n    --navy: #071a33;\n    --dark: #0b2042;\n    --blue: #1268db;\n    --red: #ed171f;\n    --light: #f4f7fc;\n    --border: #e2e9f3;\n    --text: #142444;\n    --muted: #52627c;\n    --white: #ffffff;\n} .page-scope-careerspage * {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n} .page-scope-careerspage {\n    scroll-behavior: smooth;\n    scroll-padding-top: 85px;\n} .page-scope-careerspage {\n    font-family: 'Inter', sans-serif;\n    color: var(--text);\n    background: white;\n    overflow-x: clip;\n}\n\nimg {\n    display: block;\n    max-width: 100%;\n}\n\na {\n    text-decoration: none;\n    color: inherit;\n}\n\nbutton, input, select, textarea {\n    font: inherit;\n}\n\n.container {\n    width: min(1180px, calc(100% - 48px));\n    margin: auto;\n}\n\nh1, h2, h3, h4 {\n    font-family: 'Outfit', sans-serif;\n    line-height: 1.15;\n    color: var(--navy);\n}\n\n.section {\n    padding: 55px 0;\n}\n\n.eyebrow {\n    display: inline-flex;\n    align-items: center;\n    gap: 10px;\n    font-size: 11px;\n    font-weight: 800;\n    color: var(--red);\n    text-transform: uppercase;\n    letter-spacing: .7px;\n}\n\n.eyebrow::before {\n    content: \"\";\n    width: 25px;\n    height: 2px;\n    background: var(--red);\n}\n\n.highlight {\n    color: var(--red);\n}\n\n.btn {\n    display: inline-flex;\n    justify-content: center;\n    align-items: center;\n    gap: 10px;\n    padding: 13px 19px;\n    border-radius: 8px;\n    font-size: 12px;\n    font-weight: 800;\n    transition: .25s ease;\n    cursor: pointer;\n    border: none;\n}\n\n.btn:hover {\n    transform: translateY(-3px);\n}\n\n.btn-red {\n    background: var(--red);\n    color: white;\n    box-shadow: 0 7px 18px rgba(237,23,31,.18);\n}\n\n.btn-red:hover {\n    background: #d70e17;\n}\n\n.btn-dark {\n    background: var(--navy);\n    color: white;\n}\n\n.btn-outline {\n    background: transparent;\n    border: 1px solid var(--navy);\n    color: var(--navy);\n}\n\n.btn-outline-white {\n    background: transparent;\n    border: 1px solid rgba(255,255,255,.65);\n    color: white;\n}\n\n/* =========================================\n   HEADER\n========================================= */\n\n.header {\n    position: sticky;\n    top: 0;\n    z-index: 1000;\n    height: 66px;\n    background: rgba(255,255,255,.97);\n    backdrop-filter: blur(15px);\n    border-bottom: 1px solid var(--border);\n}\n\n.nav {\n    height: 100%;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    gap: 20px;\n}\n\n.logo img {\n    width: 140px;\n    height: 54px;\n    object-fit: contain;\n}\n\n.nav-links {\n    display: flex;\n    align-items: center;\n    gap: 27px;\n}\n\n.nav-links a {\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n    position: relative;\n    transition: .2s;\n}\n\n.nav-links a:hover,\n.nav-links a.active {\n    color: var(--red);\n}\n\n.nav-links a.active::after {\n    content: \"\";\n    position: absolute;\n    height: 2px;\n    bottom: -12px;\n    left: 0;\n    width: 100%;\n    background: var(--red);\n}\n\n.nav-buttons {\n    display: flex;\n    gap: 10px;\n    align-items: center;\n}\n\n.nav-buttons .btn {\n    padding: 12px 15px;\n    font-size: 11px;\n}\n\n.menu-toggle {\n    display: none;\n    width: 40px;\n    height: 40px;\n    border: 1px solid var(--border);\n    background: white;\n    border-radius: 8px;\n    color: var(--navy);\n    font-size: 18px;\n    cursor: pointer;\n}\n\n/* =========================================\n   HERO SECTION\n========================================= */\n\n.career-hero {\n    min-height: 255px;\n    display: flex;\n    align-items: center;\n\n    background:\n        linear-gradient(\n            90deg,\n            rgba(246,249,255,.99) 0%,\n            rgba(246,249,255,.95) 32%,\n            rgba(246,249,255,.35) 58%,\n            rgba(246,249,255,.02) 100%\n        ),\n        url('/images/career-hero.png');\n\n    background-size: cover;\n    background-position: center;\n    background-repeat: no-repeat;\n}\n\n.hero-content {\n    max-width: 600px;\n    padding: 35px 0;\n}\n\n.hero-tag {\n    display: inline-block;\n    padding: 5px 11px;\n    border-radius: 30px;\n    background: #ffe8e9;\n    color: var(--red);\n    font-size: 11px;\n    font-weight: 800;\n    margin-bottom: 15px;\n}\n\n.career-hero h1 {\n    font-size: clamp(36px, 4vw, 49px);\n    font-weight: 800;\n    letter-spacing: -1.7px;\n}\n\n.hero-description {\n    max-width: 500px;\n    margin-top: 12px;\n    font-size: 13px;\n    line-height: 1.65;\n    color: var(--text);\n}\n\n.hero-actions {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 12px;\n    margin-top: 19px;\n}\n\n/* =========================================\n   BENEFIT STRIP\n========================================= */\n\n.benefit-strip {\n    background: linear-gradient(90deg,#f4f7ff,#ffffff,#f4f7ff);\n    border-block: 1px solid var(--border);\n    padding: 19px 0;\n}\n\n.benefit-grid {\n    display: grid;\n    grid-template-columns: repeat(4,1fr);\n}\n\n.benefit-item {\n    display: flex;\n    align-items: center;\n    gap: 15px;\n    padding: 0 20px;\n    border-right: 1px solid #b9c7da;\n}\n\n.benefit-item:first-child {\n    padding-left: 15px;\n}\n\n.benefit-item:last-child {\n    border: none;\n}\n\n.benefit-item i {\n    color: var(--navy);\n    font-size: 29px;\n    min-width: 34px;\n}\n\n.benefit-item h4 {\n    font-size: 13px;\n    margin-bottom: 3px;\n}\n\n.benefit-item p {\n    font-size: 11px;\n    line-height: 1.45;\n    color: var(--muted);\n}\n\n/* =========================================\n   WHY JOIN EMSTRAP\n========================================= */\n\n.why-grid {\n    display: grid;\n    grid-template-columns: 1fr 1.1fr .8fr;\n    align-items: center;\n    gap: 28px;\n}\n\n.why-image {\n    position: relative;\n}\n\n.why-image img {\n    width: 100%;\n    height: 195px;\n    object-fit: cover;\n    border-radius: 15px;\n}\n\n.why-content h2 {\n    font-size: 29px;\n    margin: 12px 0;\n    letter-spacing: -.7px;\n}\n\n.why-content p {\n    font-size: 12px;\n    line-height: 1.7;\n    color: var(--muted);\n}\n\n.why-list {\n    border-left: 1px solid #c6d1df;\n    padding-left: 20px;\n    display: flex;\n    flex-direction: column;\n    gap: 13px;\n}\n\n.why-list li {\n    list-style: none;\n    display: flex;\n    gap: 10px;\n    align-items: flex-start;\n    font-size: 11px;\n    font-weight: 600;\n    line-height: 1.5;\n}\n\n.why-list i {\n    color: white;\n    background: var(--red);\n    border-radius: 50%;\n    width: 17px;\n    height: 17px;\n    display: grid;\n    place-items: center;\n    font-size: 9px;\n    flex-shrink: 0;\n}\n\n/* =========================================\n   INTERNS\n========================================= */\n\n.intern-section {\n    background: linear-gradient(110deg,#f5f8ff,#ffffff,#f4f7fd);\n    border-block: 1px solid #edf1f7;\n}\n\n.intern-layout {\n    display: grid;\n    grid-template-columns: .95fr 2.05fr;\n    gap: 35px;\n    align-items: center;\n}\n\n.intern-intro h2 {\n    font-size: 27px;\n    margin: 12px 0 8px;\n}\n\n.intern-intro p {\n    font-size: 12px;\n    line-height: 1.65;\n    color: var(--muted);\n    max-width: 280px;\n    margin-bottom: 14px;\n}\n\n.intern-grid {\n    display: grid;\n    grid-template-columns: repeat(4,1fr);\n    gap: 13px;\n}\n\n.intern-card {\n    overflow: hidden;\n    background: white;\n    border: 1px solid var(--border);\n    border-radius: 13px;\n    box-shadow: 0 5px 14px rgba(15,40,75,.06);\n    transition: .3s;\n}\n\n.intern-card:hover {\n    transform: translateY(-6px);\n    box-shadow: 0 14px 28px rgba(15,40,75,.13);\n}\n\n.intern-card img {\n    width: 100%;\n    height: 130px;\n    object-fit: cover;\n    object-position: center top;\n}\n\n.intern-info {\n    padding: 10px 12px;\n}\n\n.intern-info h3 {\n    font-size: 14px;\n    margin-bottom: 3px;\n}\n\n.intern-info p {\n    font-size: 11px;\n    color: var(--muted);\n}\n\n/* =========================================\n   WHAT YOU WILL GAIN\n========================================= */\n\n.gain-layout {\n    display: grid;\n    grid-template-columns: .85fr 2.15fr;\n    gap: 35px;\n    align-items: center;\n}\n\n.gain-intro h2 {\n    font-size: 28px;\n    margin: 12px 0;\n}\n\n.gain-intro p {\n    font-size: 12px;\n    line-height: 1.7;\n    color: var(--muted);\n}\n\n.gain-grid {\n    display: grid;\n    grid-template-columns: repeat(5,1fr);\n    gap: 10px;\n}\n\n.gain-card {\n    min-height: 145px;\n    padding: 15px 10px;\n    border: 1px solid var(--border);\n    border-radius: 12px;\n    background: linear-gradient(145deg,#fff,#f3f6fd);\n    text-align: center;\n    transition: .25s;\n}\n\n.gain-card:hover {\n    transform: translateY(-5px);\n    border-color: #b9c9e2;\n}\n\n.gain-card i {\n    color: #4838ff;\n    font-size: 27px;\n    margin-bottom: 11px;\n}\n\n.gain-card h3 {\n    font-size: 13px;\n    line-height: 1.3;\n    margin-bottom: 7px;\n}\n\n.gain-card p {\n    font-size: 10px;\n    line-height: 1.5;\n    color: var(--muted);\n}\n\n/* =========================================\n   OPEN POSITIONS + COMPANY CULTURE\n========================================= */\n\n.opportunities-section {\n    background: #fff;\n}\n\n.opportunity-layout {\n    display: grid;\n    grid-template-columns: .98fr 1.02fr;\n    gap: 38px;\n}\n\n.opportunities h2,\n.life-section h2 {\n    font-size: 27px;\n    margin: 10px 0 13px;\n}\n\n.role-filters {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 7px;\n    margin: 13px 0 16px;\n}\n\n.filter-btn {\n    padding: 7px 13px;\n    border: 1px solid #d5dfec;\n    border-radius: 7px;\n    background: #f5f7fb;\n    color: var(--navy);\n    font-size: 10px;\n    font-weight: 800;\n    cursor: pointer;\n    transition: .2s;\n}\n\n.filter-btn.active,\n.filter-btn:hover {\n    background: var(--navy);\n    border-color: var(--navy);\n    color: white;\n}\n\n.role-list {\n    display: flex;\n    flex-direction: column;\n    gap: 7px;\n}\n\n.role-card {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 10px;\n    padding: 10px 12px;\n    border: 1px solid var(--border);\n    border-radius: 10px;\n    background: white;\n    transition: .2s;\n}\n\n.role-card:hover {\n    border-color: #a8bddb;\n    box-shadow: 0 5px 14px rgba(15,40,75,.07);\n}\n\n.role-card[hidden] {\n    display: none;\n}\n\n.role-main {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n    min-width: 0;\n}\n\n.role-icon {\n    width: 43px;\n    height: 43px;\n    flex-shrink: 0;\n    display: grid;\n    place-items: center;\n    background: #eef4ff;\n    border-radius: 10px;\n    color: var(--blue);\n    font-size: 19px;\n}\n\n.role-info h3 {\n    font-size: 12px;\n    margin-bottom: 5px;\n}\n\n.role-meta {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 9px;\n    font-size: 9px;\n    color: var(--muted);\n}\n\n.role-meta i {\n    color: var(--blue);\n}\n\n.apply-btn {\n    flex-shrink: 0;\n    background: white;\n    border: 1px solid #ff777c;\n    border-radius: 7px;\n    padding: 7px 11px;\n    color: var(--red);\n    font-size: 10px;\n    font-weight: 800;\n    cursor: pointer;\n    transition: .2s;\n}\n\n.apply-btn:hover {\n    background: var(--red);\n    color: white;\n}\n\n/* LIFE AT EMSTRAP */\n\n.life-section {\n    border-left: 1px solid #c6d1df;\n    padding-left: 35px;\n}\n\n.life-section h2 span {\n    color: var(--red);\n}\n\n.life-images {\n    display: grid;\n    grid-template-columns: 1.2fr .8fr;\n    gap: 9px;\n    height: 260px;\n}\n\n.life-main,\n.life-side img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: 11px;\n}\n\n.life-side {\n    display: grid;\n    grid-template-rows: 1fr 1fr;\n    gap: 9px;\n    min-height: 0;\n}\n\n.life-side img {\n    min-height: 0;\n}\n\n/* =========================================\n   BOTTOM CTA\n========================================= */\n\n.career-cta {\n    min-height: 210px;\n    display: flex;\n    align-items: center;\n    background:\n        linear-gradient(\n            90deg,\n            rgba(5,24,52,.98) 0%,\n            rgba(5,24,52,.88) 45%,\n            rgba(5,24,52,.05) 100%\n        ),\n        url('/images/bottom-area.jpg');\n\n    background-size: cover;\n    background-position: center;\n    background-repeat: no-repeat;\n}\n\n.cta-content {\n    max-width: 570px;\n    padding: 35px 0;\n}\n\n.cta-content h2 {\n    color: white;\n    font-size: 30px;\n    margin-bottom: 9px;\n}\n\n.cta-content p {\n    color: #dbe7f6;\n    font-size: 13px;\n    line-height: 1.6;\n    margin-bottom: 15px;\n}\n\n/* =========================================\n   FOOTER\n========================================= */\n\n.footer {\n    background: #071a33;\n    color: white;\n    padding: 35px 0 15px;\n}\n\n.footer-grid {\n    display: grid;\n    grid-template-columns: 1.4fr 1fr 1.2fr 1fr;\n    gap: 35px;\n    padding-bottom: 25px;\n}\n\n.footer-logo {\n    width: 145px;\n    height: 55px;\n    object-fit: contain;\n    object-position: left center;\n}\n\n.footer p {\n    font-size: 11px;\n    color: #c5d2e2;\n    line-height: 1.6;\n    margin-top: 10px;\n    max-width: 250px;\n}\n\n.footer h4 {\n    color: white;\n    font: 800 13px Inter,sans-serif;\n    margin: 9px 0 13px;\n}\n\n.footer a {\n    display: block;\n    color: #c5d2e2;\n    font-size: 11px;\n    margin-bottom: 9px;\n    transition: .2s;\n}\n\n.footer a:hover {\n    color: white;\n}\n\n.footer-bottom {\n    padding-top: 14px;\n    border-top: 1px solid rgba(255,255,255,.2);\n    display: flex;\n    justify-content: space-between;\n    gap: 15px;\n    font-size: 10px;\n    color: #b8c5d7;\n}\n\n/* =========================================\n   APPLICATION MODAL\n========================================= */\n\n.modal-overlay {\n    display: none;\n    position: fixed;\n    inset: 0;\n    z-index: 2000;\n    background: rgba(3,14,30,.78);\n    backdrop-filter: blur(5px);\n    padding: 20px;\n    align-items: center;\n    justify-content: center;\n}\n\n.modal-overlay.open {\n    display: flex;\n}\n\n.application-modal {\n    width: min(550px,100%);\n    max-height: 90vh;\n    overflow-y: auto;\n    background: white;\n    border-radius: 17px;\n    padding: 28px;\n    position: relative;\n}\n\n.modal-close {\n    position: absolute;\n    right: 18px;\n    top: 15px;\n    width: 35px;\n    height: 35px;\n    background: #f0f3f8;\n    border: none;\n    border-radius: 50%;\n    cursor: pointer;\n    color: var(--navy);\n}\n\n.application-modal h2 {\n    font-size: 25px;\n    margin: 10px 0;\n}\n\n.application-modal > p {\n    font-size: 12px;\n    color: var(--muted);\n    margin-bottom: 20px;\n}\n\n.form-grid {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 13px;\n}\n\n.form-group {\n    margin-bottom: 13px;\n}\n\n.form-group label {\n    display: block;\n    font-size: 11px;\n    font-weight: 800;\n    margin-bottom: 6px;\n}\n\n.form-group input,\n.form-group select,\n.form-group textarea {\n    width: 100%;\n    padding: 11px;\n    border: 1px solid #d6dfeb;\n    background: #f8faff;\n    border-radius: 8px;\n    outline: none;\n    font-size: 12px;\n    color: var(--text);\n}\n\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n    border-color: var(--blue);\n    background: white;\n}\n\n.form-group textarea {\n    resize: vertical;\n}\n\n.modal-submit {\n    width: 100%;\n    margin-top: 5px;\n}\n\n.form-notice {\n    font-size: 11px;\n    line-height: 1.5;\n    color: var(--muted);\n    margin-top: 12px;\n}\n\n.form-status {\n    font-size: 12px;\n    margin-top: 12px;\n    color: var(--red);\n}\n\n/* =========================================\n   ANIMATIONS\n========================================= */\n\n.reveal {\n    opacity: 0;\n    transform: translateY(20px);\n    transition: opacity .65s ease, transform .65s ease;\n}\n\n.reveal.visible {\n    opacity: 1;\n    transform: translateY(0);\n}\n\n@media(prefers-reduced-motion: reduce) {\n .page-scope-careerspage {\n        scroll-behavior: auto;\n    }\n\n    .reveal {\n        opacity: 1;\n        transform: none;\n        transition: none;\n    } .page-scope-careerspage * {\n        animation-duration: .01ms !important;\n        transition-duration: .01ms !important;\n    }\n}\n\n/* =========================================\n   TABLET RESPONSIVENESS\n========================================= */\n\n@media(max-width:1050px) {\n\n    .nav-links {\n        gap: 15px;\n    }\n\n    .nav-links a {\n        font-size: 11px;\n    }\n\n    .why-grid {\n        grid-template-columns: 1fr 1fr;\n    }\n\n    .why-list {\n        grid-column: 1/-1;\n        border-left: none;\n        border-top: 1px solid var(--border);\n        padding: 18px 0 0;\n        display: grid;\n        grid-template-columns: 1fr 1fr;\n    }\n\n    .intern-layout,\n    .gain-layout {\n        grid-template-columns: 1fr;\n    }\n\n    .intern-intro p {\n        max-width: 550px;\n    }\n\n    .footer-grid {\n        grid-template-columns: repeat(2,1fr);\n    }\n}\n\n/* =========================================\n   MOBILE RESPONSIVENESS\n========================================= */\n\n@media(max-width:760px) {\n\n    .header {\n        height: 68px;\n    }\n\n    .logo img {\n        width: 125px;\n    }\n\n    .menu-toggle {\n        display: grid;\n        place-items: center;\n    }\n\n    .nav {\n        position: relative;\n    }\n\n    .nav-links {\n        display: none;\n        position: absolute;\n        top: 67px;\n        left: -24px;\n        right: -24px;\n        padding: 15px 25px 20px;\n        background: white;\n        border-bottom: 1px solid var(--border);\n        box-shadow: 0 15px 25px rgba(0,0,0,.09);\n        flex-direction: column;\n        align-items: stretch;\n        gap: 0;\n    }\n\n    .nav-links.open {\n        display: flex;\n    }\n\n    .nav-links a {\n        padding: 12px 0;\n        font-size: 13px;\n    }\n\n    .nav-links a.active::after {\n        display: none;\n    }\n\n    .nav-buttons .demo-btn {\n        display: none;\n    }\n\n    .nav-buttons .emergency-btn {\n        font-size: 0;\n        width: 40px;\n        height: 40px;\n        padding: 0;\n    }\n\n    .nav-buttons .emergency-btn i {\n        font-size: 16px;\n    }\n\n    .career-hero {\n        min-height: 380px;\n        background-position: 65% center;\n    }\n\n    .career-hero h1 {\n        font-size: 39px;\n    }\n\n    .hero-content {\n        padding: 55px 0;\n    }\n\n    .benefit-grid {\n        grid-template-columns: 1fr 1fr;\n        gap: 20px 10px;\n    }\n\n    .benefit-item {\n        border: none;\n        padding: 5px;\n    }\n\n    .benefit-item i {\n        font-size: 23px;\n    }\n\n    .section {\n        padding: 42px 0;\n    }\n\n    .why-grid {\n        grid-template-columns: 1fr;\n        gap: 20px;\n    }\n\n    .why-image img {\n        height: 260px;\n    }\n\n    .why-list {\n        grid-column: auto;\n        grid-template-columns: 1fr;\n    }\n\n    .intern-grid {\n        grid-template-columns: repeat(2,1fr);\n    }\n\n    .intern-card img {\n        height: 170px;\n    }\n\n    .gain-grid {\n        grid-template-columns: repeat(2,1fr);\n    }\n\n    .gain-card:last-child {\n        grid-column: 1/-1;\n    }\n\n    .opportunity-layout {\n        grid-template-columns: 1fr;\n        gap: 35px;\n    }\n\n    .life-section {\n        border-left: none;\n        border-top: 1px solid var(--border);\n        padding: 30px 0 0;\n    }\n\n    .life-images {\n        height: 250px;\n    }\n\n    .career-cta {\n        min-height: 260px;\n        background-position: 65% center;\n    }\n\n    .cta-content h2 {\n        font-size: 27px;\n    }\n\n    .footer-grid {\n        grid-template-columns: 1fr 1fr;\n        gap: 25px;\n    }\n}\n\n/* SMALL MOBILE */\n\n@media(max-width:450px) {\n\n    .container {\n        width: calc(100% - 32px);\n    }\n\n    .nav-links {\n        left: -16px;\n        right: -16px;\n    }\n\n    .career-hero h1 {\n        font-size: 34px;\n    }\n\n    .hero-description {\n        font-size: 12px;\n    }\n\n    .hero-actions .btn {\n        padding: 12px;\n        font-size: 10px;\n    }\n\n    .intern-card img {\n        height: 145px;\n    }\n\n    .intern-info h3 {\n        font-size: 12px;\n    }\n\n    .role-card {\n        padding: 9px 7px;\n    }\n\n    .role-icon {\n        width: 35px;\n        height: 35px;\n        font-size: 15px;\n    }\n\n    .role-info h3 {\n        font-size: 10px;\n    }\n\n    .role-meta {\n        font-size: 8px;\n        gap: 5px;\n    }\n\n    .apply-btn {\n        padding: 7px;\n        font-size: 9px;\n    }\n\n    .life-images {\n        height: 210px;\n    }\n\n    .form-grid {\n        grid-template-columns: 1fr;\n        gap: 0;\n    }\n\n    .application-modal {\n        padding: 22px 17px;\n    }\n\n    .footer-grid {\n        grid-template-columns: 1fr 1fr;\n        gap: 20px;\n    }\n\n    .footer-brand {\n        grid-column: 1/-1;\n    }\n\n    .footer-bottom {\n        flex-direction: column;\n    }\n}\n/* Marquee container */\n.intern-marquee-wrapper {\n    width: 100%;\n    min-width: 0;\n    overflow: hidden;\n    position: relative;\n    padding: 12px 0 24px;\n}\n\n/* Moving track */\n.intern-marquee {\n    display: flex;\n    width: max-content;\n    animation: internScroll 22s linear infinite;\n    will-change: transform;\n}\n\n/* Two identical groups */\n.intern-marquee-track {\n    display: flex;\n    align-items: stretch;\n    gap: 22px;\n    padding-right: 22px;\n}\n\n/* Individual intern card */\n.intern-card {\n    width: 230px;\n    flex-shrink: 0;\n    overflow: hidden;\n    border-radius: 18px;\n    background: #ffffff;\n    border: 1px solid #e2e8f0;\n    box-shadow: 0 5px 18px rgba(15, 23, 42, 0.07);\n    transition: transform 0.35s ease, box-shadow 0.35s ease;\n}\n\n.intern-card img {\n    width: 100%;\n    height: 260px;\n    display: block;\n    object-fit: cover;\n    object-position: center top;\n    transition: transform 0.5s ease;\n}\n\n.intern-info {\n    padding: 16px;\n    background: #ffffff;\n}\n\n.intern-info h3 {\n    color: #0f172a;\n    font-size: 17px;\n    font-weight: 800;\n    margin: 0 0 5px;\n}\n\n.intern-info p {\n    color: #64748b;\n    font-size: 13px;\n    margin: 0;\n}\n\n/* Card hover */\n.intern-card:hover {\n    transform: translateY(-7px);\n    box-shadow: 0 16px 35px rgba(15, 23, 42, 0.14);\n    border-color: #2563eb;\n}\n\n.intern-card:hover img {\n    transform: scale(1.04);\n}\n\n/* Pause the complete carousel on hover */\n.intern-marquee-wrapper:hover .intern-marquee {\n    animation-play-state: paused;\n}\n\n/* Continuous right-to-left movement */\n@keyframes internScroll {\n    from {\n        transform: translateX(0);\n    }\n\n    to {\n        transform: translateX(-50%);\n    }\n}\n\n/* Mobile responsive */\n@media (max-width: 768px) {\n\n    .intern-marquee {\n        animation-duration: 18s;\n    }\n\n    .intern-card {\n        width: 190px;\n    }\n\n    .intern-card img {\n        height: 220px;\n    }\n\n}\n\n/* Accessibility */\n@media (prefers-reduced-motion: reduce) {\n    .intern-marquee {\n        animation: none;\n    }\n}";

export default function CareersPage() {
  usePageSetup({
    title: "Careers at EMSTRAP | Build Technology That Saves Lives",
    bodyClass: "bg-white text-slate-900 font-sans antialiased",
    customCss: PAGE_CSS,
    enableWave: false,
    enableHeaderAmbulance: false,
  });

  const focusTimerRef = useRef(null);

  const openApplication = (role) => {
    const modal = document.getElementById("applicationModal");
    const appRole = document.getElementById("appRole");
    const status = document.getElementById("formStatus");
    if (modal) modal.classList.add("open");
    document.body.style.overflow = "hidden";
    if (appRole) appRole.value = role;
    if (status) status.textContent = "";
    if (focusTimerRef.current) clearTimeout(focusTimerRef.current);
    focusTimerRef.current = setTimeout(() => {
      document.getElementById("appName")?.focus();
    }, 100);
  };

  const closeApplication = () => {
    if (focusTimerRef.current) {
      clearTimeout(focusTimerRef.current);
      focusTimerRef.current = null;
    }
    const modal = document.getElementById("applicationModal");
    if (modal) modal.classList.remove("open");
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const setToggleIcon = (isOpen) => {
      if (!menuToggle) return;
      const icon = document.createElement("i");
      icon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
      menuToggle.replaceChildren(icon);
    };
    const onToggle = () => {
      if (!menuToggle || !navLinks) return;
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      setToggleIcon(isOpen);
    };
    const onNavLinkClick = () => {
      if (!menuToggle || !navLinks) return;
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      setToggleIcon(false);
    };
    menuToggle?.addEventListener("click", onToggle);
    const links = navLinks ? Array.from(navLinks.querySelectorAll("a")) : [];
    links.forEach((l) => l.addEventListener("click", onNavLinkClick));

    const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
    const roleCards = Array.from(document.querySelectorAll(".role-card"));
    const filterHandlers = filterButtons.map((button) => {
      const h = () => {
        const filter = button.dataset.filter;
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        roleCards.forEach((card) => {
          const categories = (card.dataset.category || "").split(" ");
          card.hidden = filter !== "all" && !categories.includes(filter);
        });
      };
      button.addEventListener("click", h);
      return [button, h];
    });

    const applicationModal = document.getElementById("applicationModal");
    const applicationForm = document.getElementById("applicationForm");
    const onBackdropClick = (event) => {
      if (event.target === applicationModal) closeApplication();
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeApplication();
    };
    const onFormSubmit = async (event) => {
      event.preventDefault();
      if (!applicationForm) return;
      const status = document.getElementById("formStatus");
      const submitBtn = applicationForm.querySelector("button[type='submit']");

      const fullName = document.getElementById("appName")?.value.trim() || "";
      const email = document.getElementById("appEmail")?.value.trim() || "";
      const phone = document.getElementById("appPhone")?.value.trim() || "";
      const position = document.getElementById("appRole")?.value.trim() || "";
      const resumeLink = document.getElementById("appResume")?.value.trim() || "";
      const message = document.getElementById("appMessage")?.value.trim() || "";

      if (!fullName || !email || !phone || !position || !resumeLink) {
        if (status) {
          status.style.color = "var(--red)";
          status.textContent = "Please fill all required fields.";
        }
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      if (status) {
        status.style.color = "var(--navy)";
        status.textContent = "Submitting application...";
      }

      const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
      const abortTimer = controller ? setTimeout(() => controller.abort(), 10000) : null;

      try {
        const response = await fetch("/api/careers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: fullName.slice(0, 120),
            email: email.slice(0, 254),
            phone: phone.slice(0, 25),
            position: position.slice(0, 120),
            resumeLink: resumeLink.slice(0, 500),
            message: message.slice(0, 4000),
          }),
          signal: controller?.signal,
        });
        const contentType = response.headers.get("content-type") || "";
        const result = contentType.includes("application/json") ? await response.json() : null;
        if (response.ok && result?.success) {
          if (status) {
            status.style.color = "#059669";
            status.textContent = "Application submitted successfully. Our talent team will reach out shortly.";
          }
          applicationForm.reset();
        } else {
          if (status) {
            status.style.color = "var(--red)";
            status.textContent = result?.message || "Please check your inputs and try again.";
          }
        }
      } catch {
        if (status) {
          status.style.color = "var(--red)";
          status.textContent = "Unable to submit application right now. Please try again.";
        }
      } finally {
        if (abortTimer) clearTimeout(abortTimer);
        if (submitBtn) submitBtn.disabled = false;
      }
    };

    applicationModal?.addEventListener("click", onBackdropClick);
    document.addEventListener("keydown", onKeyDown);
    applicationForm?.addEventListener("submit", onFormSubmit);

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
      if (focusTimerRef.current) clearTimeout(focusTimerRef.current);
      menuToggle?.removeEventListener("click", onToggle);
      links.forEach((l) => l.removeEventListener("click", onNavLinkClick));
      filterHandlers.forEach(([b, h]) => b.removeEventListener("click", h));
      applicationModal?.removeEventListener("click", onBackdropClick);
      document.removeEventListener("keydown", onKeyDown);
      applicationForm?.removeEventListener("submit", onFormSubmit);
      observer.disconnect();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="page-scope-careerspage min-h-screen flex flex-col justify-between">
      

{/* =========================================
     HEADER
========================================= */}


{/* =========================================
     EMSTRAP NAVBAR
========================================= */}


{/* =========================================
     CAREERS PAGE NAVBAR
========================================= */}

<header className="header">
  <div className="container nav">

    <Link to="/" className="logo">
      <img src="/images/logo.png" alt="EMSTRAP Logo" />
    </Link>

    <nav className="nav-links" id="navLinks">

      <Link to="#home">Home</Link>
      <a href="#internship">Internship</a>
      <a href="#open-positions">Open Positions</a>
      <Link to="/contact">Contact</Link>

    </nav>

    

  </div>
</header>



<main>

{/* =========================================
     HERO SECTION
========================================= */}

<section id="home" className="career-hero">

    <div className="container">

        <div className="hero-content">

            <div className="hero-tag">
                CAREERS AT EMSTRAP
            </div>

            <h1>
                Build Technology
                <br />
                That <span className="highlight">Saves Lives.</span>
            </h1>

            <p className="hero-description">
                Join a mission-driven team building intelligent,
                connected emergency response solutions for a
                safer and healthier India.
            </p>

            <div className="hero-actions">

                <a href="#open-positions" className="btn btn-red">
                    Explore Open Positions
                    <i className="fa-solid fa-arrow-right"></i>
                </a>

                <a href="#internship" className="btn btn-outline">
                    <i className="fa-solid fa-graduation-cap"></i>
                    Internship Program
                </a>

            </div>

        </div>

    </div>

</section>


{/* =========================================
     BENEFIT STRIP
========================================= */}

<section className="benefit-strip">

    <div className="container benefit-grid">

        <div className="benefit-item">

            <i className="fa-solid fa-bullseye"></i>

            <div>
                <h4>Real-World Impact</h4>
                <p>Build solutions that save lives</p>
            </div>

        </div>

        <div className="benefit-item">

            <i className="fa-solid fa-people-group"></i>

            <div>
                <h4>Collaborative Team</h4>
                <p>Work with passionate and talented people</p>
            </div>

        </div>

        <div className="benefit-item">

            <i className="fa-solid fa-rocket"></i>

            <div>
                <h4>Continuous Learning</h4>
                <p>Learn, build and grow with mentorship</p>
            </div>

        </div>

        <div className="benefit-item">

            <i className="fa-solid fa-chart-column"></i>

            <div>
                <h4>Growth Opportunities</h4>
                <p>Be part of a high-impact startup</p>
            </div>

        </div>

    </div>

</section>


{/* =========================================
     WHY JOIN EMSTRAP
========================================= */}

<section className="section">

    <div className="container why-grid">

        <div className="why-image reveal">

            <img src="/images/team-working.png" alt="EMSTRAP team collaborating" loading="lazy" />

        </div>

        <div className="why-content reveal">

            <span className="eyebrow">WHY JOIN EMSTRAP</span>

            <h2>
                Be Part of a Mission
                Bigger Than a Job.
            </h2>

            <p>
                At EMSTRAP, you'll work on real-world challenges
                in emergency response, healthcare, and public safety.
                Bring your ideas into technology that creates
                meaningful impact.
            </p>

        </div>

        <ul className="why-list reveal">

            <li>
                <i className="fa-solid fa-check"></i>
                Work on socially impactful products
            </li>

            <li>
                <i className="fa-solid fa-check"></i>
                Collaborate with industry and government stakeholders
            </li>

            <li>
                <i className="fa-solid fa-check"></i>
                Gain end-to-end product development exposure
            </li>

            <li>
                <i className="fa-solid fa-check"></i>
                Grow in a fast-paced startup environment
            </li>

        </ul>

    </div>

</section>



{/* =========================================
     INTERNSHIP PROGRAM — CONTINUOUS MARQUEE
========================================= */}

<section className="section intern-section" id="internship">

    <div className="container intern-layout">

        {/* Left Introduction */}
        <div className="intern-intro reveal">

            <span className="eyebrow">OUR INTERNS</span>

            <h2>
                EMSTRAP
                <br />
                Internship Program
            </h2>

            <p>
                A hands-on learning experience where students
                contribute to live projects, solve real product
                challenges, and gain industry-ready skills.
            </p>

            <a href="#open-positions" className="btn btn-dark">
                Meet Our Interns
                <i className="fa-solid fa-arrow-right"></i>
            </a>

        </div>

        {/* Right: Moving Intern Cards */}
        <div className="intern-marquee-wrapper">

            <div className="intern-marquee" id="internMarquee">

                {/* Original Cards */}
                <div className="intern-marquee-track">

                    
                    <article className="intern-card">
                        <img src="/images/yashwa.jpeg" alt="Yashwa D" loading="lazy" />
                        <div className="intern-info">
                            <h3>Yashwa D</h3>
                            <p>Full-Stack Intern</p>
                        </div>
                    </article>
                    
                    
                    <article className="intern-card">
                        <img src="/images/mohit.jpeg" alt="Mohit K" loading="lazy" />
                        <div className="intern-info">
                            <h3>Mohit K</h3>
                            <p>Backend Intern</p>
                        </div>
                    </article>

                    <article className="intern-card">
                        <img src="/images/janhavi.jpeg" alt="Janhavi S" loading="lazy" />
                        <div className="intern-info">
                            <h3>Janhavi S</h3>
                            <p>AI/ML Intern</p>
                        </div>
                    </article>

                    <article className="intern-card">
                        <img src="/images/shivani.jpeg" alt="Shivani" loading="lazy" />
                        <div className="intern-info">
                            <h3>Shivani</h3>
                            <p>Frontend Intern</p>
                        </div>
                    </article>

                </div>

                {/* Duplicate Cards for Seamless Loop */}
                <div className="intern-marquee-track" aria-hidden="true">

                    
                     <article className="intern-card">
                        <img src="/images/yashwa.jpeg" alt="Yashwa D" loading="lazy" />
                        <div className="intern-info">
                            <h3>Yashwa D</h3>
                            <p>Full-Stack Intern</p>
                        </div>
                    </article>
                    
                    <article className="intern-card">
                        <img src="/images/mohit.jpeg" alt="" loading="lazy" />
                        <div className="intern-info">
                            <h3>Mohit K</h3>
                            <p>Backend Intern</p>
                        </div>
                    </article>

                    <article className="intern-card">
                        <img src="/images/janhavi.jpeg" alt="" loading="lazy" />
                        <div className="intern-info">
                            <h3>Janhavi S</h3>
                            <p>AI/ML Intern</p>
                        </div>
                    </article>

                    <article className="intern-card">
                        <img src="/images/shivani.jpeg" alt="" loading="lazy" />
                        <div className="intern-info">
                            <h3>Shivani</h3>
                            <p>Frontend Intern</p>
                        </div>
                    </article>

                </div>

            </div>

        </div>

    </div>

</section>

{/* =========================================
     WHAT YOU WILL GAIN
========================================= */}

<section className="section">

    <div className="container gain-layout">

        <div className="gain-intro reveal">

            <span className="eyebrow">WHAT YOU WILL GAIN</span>

            <h2>
                A Launchpad for
                <span className="highlight">Your Career.</span>
            </h2>

            <p>
                More than an internship or job, it's an opportunity
                to learn, build, and grow with real ownership.
            </p>

        </div>

        <div className="gain-grid">

            <article className="gain-card reveal">

                <i className="fa-solid fa-laptop"></i>

                <h3>Real Project Experience</h3>

                <p>
                    Work on live products used by real users.
                </p>

            </article>

            <article className="gain-card reveal">

                <i className="fa-solid fa-people-group"></i>

                <h3>Mentorship & Guidance</h3>

                <p>
                    Learn directly from founders and core team members.
                </p>

            </article>

            <article className="gain-card reveal">

                <i className="fa-solid fa-award"></i>

                <h3>Skill Development</h3>

                <p>
                    Build technical, product, and teamwork skills.
                </p>

            </article>

            <article className="gain-card reveal">

                <i className="fa-regular fa-star"></i>

                <h3>Recognition & Certificate</h3>

                <p>
                    Get an internship certificate and appreciation.
                </p>

            </article>

            <article className="gain-card reveal">

                <i className="fa-solid fa-chart-line"></i>

                <h3>Career Opportunity</h3>

                <p>
                    High-performing interns may get future opportunities.
                </p>

            </article>

        </div>

    </div>

</section>


{/* =========================================
     OPEN POSITIONS AND LIFE AT EMSTRAP
========================================= */}

<section className="section opportunities-section" id="open-positions">

    <div className="container opportunity-layout">

        {/* OPEN POSITIONS */}

        <div className="opportunities reveal">

            <span className="eyebrow">OPEN POSITIONS</span>

            <h2>
                Explore Opportunities
                <br />
                at <span className="highlight">EMSTRAP.</span>
            </h2>

            <div className="role-filters">

                <button className="filter-btn active" data-filter="all">
                    All Roles
                </button>

                <button className="filter-btn" data-filter="internship">
                    Internship
                </button>

                <button className="filter-btn" data-filter="fulltime">
                    Full-time
                </button>

                <button className="filter-btn" data-filter="hybrid">
                    Hybrid
                </button>

            </div>

            <div className="role-list">

                {/* ROLE 1 */}

                <article className="role-card" data-category="fulltime hybrid">

                    <div className="role-main">

                        <div className="role-icon">
                            <i className="fa-solid fa-code"></i>
                        </div>

                        <div className="role-info">

                            <h3>Backend Developer</h3>

                            <div className="role-meta">
                                <span>Full-time</span>
                                <span>
                                    <i className="fa-solid fa-location-dot"></i>
                                    Bengaluru (Hybrid)
                                </span>
                            </div>

                        </div>

                    </div>

                    <button className="apply-btn" onClick={() => openApplication("Backend Developer")}>
                        Apply Now
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>

                </article>


                {/* ROLE 2 */}

                <article className="role-card" data-category="fulltime hybrid">

                    <div className="role-main">

                        <div className="role-icon">
                            <i className="fa-solid fa-layer-group"></i>
                        </div>

                        <div className="role-info">

                            <h3>Full-Stack Developer</h3>

                            <div className="role-meta">
                                <span>Full-time</span>
                                <span>
                                    <i className="fa-solid fa-location-dot"></i>
                                    Bengaluru (Hybrid)
                                </span>
                            </div>

                        </div>

                    </div>

                    <button className="apply-btn" onClick={() => openApplication("Full-Stack Developer")}>
                        Apply Now
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>

                </article>


                {/* ROLE 3 */}

                <article className="role-card" data-category="fulltime hybrid">

                    <div className="role-main">

                        <div className="role-icon">
                            <i className="fa-solid fa-mobile-screen-button"></i>
                        </div>

                        <div className="role-info">

                            <h3>Application Developer (Android / iOS)</h3>

                            <div className="role-meta">
                                <span>Full-time</span>
                                <span>
                                    <i className="fa-solid fa-location-dot"></i>
                                    Bengaluru (Hybrid)
                                </span>
                            </div>

                        </div>

                    </div>

                    <button className="apply-btn" onClick={() => openApplication("Application Developer")}>
                        Apply Now
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>

                </article>


                {/* ROLE 4 */}

                <article className="role-card" data-category="fulltime hybrid">

                    <div className="role-main">

                        <div className="role-icon">
                            <i className="fa-solid fa-microchip"></i>
                        </div>

                        <div className="role-info">

                            <h3>AI / ML Developer</h3>

                            <div className="role-meta">
                                <span>Full-time</span>
                                <span>
                                    <i className="fa-solid fa-location-dot"></i>
                                    Bengaluru (Hybrid)
                                </span>
                            </div>

                        </div>

                    </div>

                    <button className="apply-btn" onClick={() => openApplication("AI / ML Developer")}>
                        Apply Now
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>

                </article>


                {/* ROLE 5 */}

                <article className="role-card" data-category="internship hybrid">

                    <div className="role-main">

                        <div className="role-icon">
                            <i className="fa-solid fa-graduation-cap"></i>
                        </div>

                        <div className="role-info">

                            <h3>Software Development Intern</h3>

                            <div className="role-meta">
                                <span>Internship</span>
                                <span>
                                    <i className="fa-solid fa-location-dot"></i>
                                    Bengaluru (Hybrid)
                                </span>
                            </div>

                        </div>

                    </div>

                    <button className="apply-btn" onClick={() => openApplication("Software Development Intern")}>
                        Apply Now
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>

                </article>

            </div>

        </div>


        {/* LIFE AT EMSTRAP */}

        <div className="life-section reveal">

            <span className="eyebrow">LIFE AT EMSTRAP</span>

            <h2>
                A Culture of
                <span>Innovation, Collaboration and Impact.</span>
            </h2>

            <div className="life-images">

                <img className="life-main" src="/images/team-collaboration.png" alt="EMSTRAP team collaboration" loading="lazy" decoding="async" />

                <div className="life-side">

                    <img src="/images/team-discussion.png" alt="EMSTRAP team discussion" loading="lazy" decoding="async" />

                    <img src="/images/team-group.jpeg" alt="EMSTRAP team" loading="lazy" decoding="async" />

                </div>

            </div>

        </div>

    </div>

</section>



</main>


{/* =========================================
     FOOTER
========================================= */}

<footer className="footer">

    <div className="container">

        <div className="footer-grid">

            <div>

                <img src="/images/logo1.jpeg" alt="EMSTRAP" className="footer-logo" />

                <p>
                    Transforming emergency response through
                    smart technology and real-time coordination.
                    Saving lives, one second at a time.
                </p>

            </div>

            <div>

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
                <a href="#open-positions">Careers</a>
                <Link to="/contact">Contact</Link>

            </div>

            <div>

                <h4>Our Products</h4>

                <Link to="/connect">EMSTRAP Connect</Link>
                <Link to="/ride">EMSTRAP Ride</Link>
                <Link to="/shield">EMSTRAP Shield</Link>
                <Link to="/command">EMSTRAP Command</Link>

            </div>

            <div>

                <h4>Connect With Us</h4>

                <a href="https://www.linkedin.com/company/emstrap/" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                </a>

                <a href="https://www.instagram.com/emstrap_official/" target="_blank" rel="noopener noreferrer">
                    Instagram
                </a>

                <Link to="/contact">
                    Partnerships
                </Link>

            </div>

        </div>

        <div className="footer-bottom">

            <span>
                © 2026 EMSTRAP Pvt. Ltd. All rights reserved.
            </span>

            <span>
                Building technology that saves lives.
            </span>

        </div>

    </div>

</footer>


{/* =========================================
     APPLICATION MODAL
========================================= */}

<div className="modal-overlay" id="applicationModal">

    <div className="application-modal">

        <button className="modal-close" onClick={closeApplication} aria-label="Close application form">
            <i className="fa-solid fa-xmark"></i>
        </button>

        <span className="eyebrow">JOIN OUR TEAM</span>

        <h2>Apply at EMSTRAP</h2>

        <p>
            Share your details and portfolio with our recruitment team.
        </p>

        <form id="applicationForm">

            <div className="form-grid">

                <div className="form-group">

                    <label htmlFor="appName">Full Name *</label>

                    <input type="text" id="appName" name="name" placeholder="Your full name" required />

                </div>

                <div className="form-group">

                    <label htmlFor="appEmail">Email Address *</label>

                    <input type="email" id="appEmail" name="email" placeholder="Your email" required />

                </div>

            </div>

            <div className="form-grid">

                <div className="form-group">

                    <label htmlFor="appPhone">Phone Number *</label>

                    <input type="tel" id="appPhone" name="phone" placeholder="+91" required />

                </div>

                <div className="form-group">

                    <label htmlFor="appRole">Position *</label>

                    <select id="appRole" name="role" required>

                        <option value="">Select position</option>

                        <option>Backend Developer</option>

                        <option>Full-Stack Developer</option>

                        <option>Application Developer</option>

                        <option>AI / ML Developer</option>

                        <option>Software Development Intern</option>

                        <option>General Application</option>

                    </select>

                </div>

            </div>

            <div className="form-group">

                <label htmlFor="appResume">
                    Resume / Portfolio Link *
                </label>

                <input type="url" id="appResume" name="resume" placeholder="https://drive.google.com/..." required />

            </div>

            <div className="form-group">

                <label htmlFor="appMessage">
                    Why do you want to join EMSTRAP?
                </label>

                <textarea id="appMessage" name="message" rows={3} placeholder="Tell us a little about yourself..."></textarea>

            </div>

            <button type="submit" className="btn btn-red modal-submit">
                Submit Application
                <i className="fa-solid fa-paper-plane"></i>
            </button>

            <p className="form-status" id="formStatus" aria-live="polite"></p>

        </form>

    </div>

</div>


{/* =========================================
     JAVASCRIPT
========================================= */}




    </div>
  );
}
