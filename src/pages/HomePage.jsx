import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, ScrollTrigger, usePageSetup, showEmstrapAlert, sanitizeSafeUrl } from "../utils/emstrapLifecycle";

const PAGE_CSS = "/* ===== EMSTRAP base styles ===== */\n .page-scope-homepage {\n            scrollbar-width: thin;\n            scrollbar-color: #1c2942 transparent;\n            scroll-behavior: auto; /* JS handles the eased smooth-scroll */\n        } .page-scope-homepage {\n            font-family: 'Inter', sans-serif;\n            background-color: #050B14;\n            color: #f3f4f6;\n            overflow-x: clip;\n        }\n\n        .font-display {\n            font-family: 'Sora', sans-serif;\n        }\n\n        /* ===== Glass panel ===== */\n        .glass-panel {\n            background: linear-gradient(135deg, rgba(25, 35, 55, 0.85) 0%, rgba(18, 25, 40, 0.9) 100%);\n            backdrop-filter: blur(30px) saturate(130%);\n            -webkit-backdrop-filter: blur(30px) saturate(130%);\n            border: 1px solid rgba(255, 255, 255, 0.12);\n            box-shadow: \n                0 12px 40px rgba(0, 0, 0, 0.6),\n                inset 0 1px 0px rgba(255, 255, 255, 0.1);\n        }\n\n        .glass-panel-hover:hover {\n            border-color: rgba(44, 100, 161, 0.25);\n            box-shadow: 0 0 35px rgba(44, 100, 161, 0.12);\n            transform: translateY(-4px);\n            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n        }\n\n        /* ===== Header ===== */\n        #mainHeader {\n            transition: background 0.3s ease, backdrop-filter 0.3s ease, padding 0.3s ease;\n        }\n\n        /* ===== Hero section ===== */\n        .hero-viewport {\n            position: relative;\n            width: 100%;\n            min-height: 68vh;\n            overflow: hidden;\n            background: #050B14;\n        }\n\n        .hero-bg-video {\n            position: absolute;\n            inset: 0;\n            z-index: 0;\n            width: 100%;\n            height: 100%;\n            object-fit: cover;\n            object-position: center;\n        }\n\n        .hero-tint {\n            position: absolute;\n            inset: 0;\n            z-index: 1;\n            background:\n                linear-gradient(90deg, #050B14 0%, rgba(5, 11, 20, 0.82) 28%, rgba(5, 11, 20, 0.35) 55%, rgba(5, 11, 20, 0.08) 80%, rgba(5, 11, 20, 0) 100%),\n                linear-gradient(0deg, #050B14 0%, rgba(5, 11, 20, 0.9) 10%, rgba(5, 11, 20, 0) 45%);\n        }\n\n        /* Staggered scroll-reveal cards */\n        .wave-card-node {\n            opacity: 0;\n            transform: translateY(70px) rotateX(-10deg);\n            will-change: transform, opacity;\n        }\n\n        .wave-card-node.wave-animate {\n            animation: cardWaveRipple 3s cubic-bezier(0.22, 1, 0.36, 1) forwards;\n        }\n\n        @keyframes cardWaveRipple {\n            0% {\n                opacity: 0;\n                transform: translateY(80px) scale(0.94) rotateX(-12deg) rotateY(-3deg);\n            }\n            55% {\n                opacity: 0.85;\n                transform: translateY(-6px) scale(1.008) rotateX(2deg) rotateY(1deg);\n            }\n            78% {\n                opacity: 1;\n                transform: translateY(2px) scale(0.998) rotateX(-1deg);\n            }\n            100% {\n                opacity: 1;\n                transform: translateY(0) scale(1) rotateX(0) rotateY(0);\n            }\n        }\n\n        /* Smooth cross-fade transition for hero slider */\n        .hero-bg-slide {\n            transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1);\n        }\n\n        /* Ambient animated blobs */\n        .glowing-blob {\n            position: absolute;\n            border-radius: 50%;\n            filter: blur(120px);\n            opacity: 0.12;\n            mix-blend-mode: screen;\n            pointer-events: none;\n            z-index: 0;\n            animation: floatBlob 25s infinite alternate ease-in-out;\n        }\n\n        .blob-blue {\n            background: radial-gradient(circle, #2C64A1 0%, transparent 80%);\n            width: 50vw;\n            height: 50vw;\n            top: -10%;\n            left: -10%;\n        }\n\n        .blob-red {\n            background: radial-gradient(circle, #C9302C 0%, transparent 80%);\n            width: 45vw;\n            height: 45vw;\n            bottom: -10%;\n            right: -10%;\n            animation-delay: -5s;\n        }\n\n        @keyframes floatBlob {\n            0% { transform: translate(0, 0) scale(1); }\n            50% { transform: translate(6vw, -6vh) scale(1.1); }\n            100% { transform: translate(-3vw, 10vh) scale(0.9); }\n        }\n\n        /* Services & Content Marquee Belts */\n        .services-slider-container,\n        .content-belt-container {\n            overflow: hidden;\n            position: relative;\n            width: 100%;\n            mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);\n            -webkit-mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);\n        }\n\n        .content-belt-track {\n            display: flex;\n            gap: 1.5rem;\n            width: max-content;\n            animation: contentBeltScroll 38s linear infinite;\n            will-change: transform;\n        }\n\n        .content-belt-track:hover {\n            animation-play-state: paused;\n        }\n\n        @keyframes contentBeltScroll {\n            0% { transform: translateX(0); }\n            100% { transform: translateX(-50%); }\n        }\n\n        /* Mu Sigma Style Services Coverflow Carousel */\n        :root {\n            --mu-card-w: 560px;\n            --mu-card-h: 430px;\n            --mu-gap: 36px;\n            --mu-scale: 0.88;\n        }\n\n        @media (max-width: 1200px) {\n            :root {\n                --mu-card-w: 500px;\n                --mu-card-h: 430px;\n                --mu-gap: 28px;\n                --mu-scale: 0.88;\n            }\n        }\n\n        @media (max-width: 860px) {\n            :root {\n                --mu-card-w: 86vw;\n                --mu-card-h: 480px;\n                --mu-gap: 16px;\n                --mu-scale: 0.90;\n            }\n        }\n\n        @media (max-width: 480px) {\n            :root {\n                --mu-card-w: calc(100vw - 32px);\n                --mu-card-h: 460px;\n                --mu-gap: 12px;\n                --mu-scale: 0.90;\n            }\n        }\n\n        .mu-carousel-container {\n            position: relative;\n            width: 100%;\n            max-width: 100%;\n            margin: 0 auto;\n            overflow: hidden;\n            padding: 1.5rem 0;\n        }\n\n        .mu-carousel-stage {\n            position: relative;\n            width: 100%;\n            height: 480px;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            perspective: 1200px;\n        }\n\n        @media (max-width: 768px) {\n            .mu-carousel-stage {\n                height: 500px;\n            }\n        }\n\n        .mu-card {\n            position: absolute;\n            width: var(--mu-card-w);\n            max-width: 90vw;\n            height: var(--mu-card-h);\n            border-radius: 26px;\n            overflow: hidden;\n            transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.6s ease, filter 0.6s ease;\n            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);\n            user-select: none;\n            will-change: transform, opacity;\n        }\n\n        /* 3D Positions with clear distance between all three cards matching Mu Sigma */\n        .mu-card.active {\n            transform: translateX(0) scale(1);\n            opacity: 1;\n            z-index: 20;\n            pointer-events: auto;\n            filter: none;\n        }\n\n        .mu-card.prev {\n            transform: translateX(calc(-1 * (var(--mu-card-w) * 0.5 + var(--mu-card-w) * var(--mu-scale) * 0.5 + var(--mu-gap)))) scale(var(--mu-scale));\n            opacity: 0.85;\n            z-index: 10;\n            cursor: pointer;\n            filter: brightness(0.85);\n        }\n\n        .mu-card.next {\n            transform: translateX(calc(var(--mu-card-w) * 0.5 + var(--mu-card-w) * var(--mu-scale) * 0.5 + var(--mu-gap))) scale(var(--mu-scale));\n            opacity: 0.85;\n            z-index: 10;\n            cursor: pointer;\n            filter: brightness(0.85);\n        }\n\n        .mu-card.hidden-card {\n            transform: scale(0.65);\n            opacity: 0;\n            z-index: 0;\n            pointer-events: none;\n        }\n\n        /* Nav Arrows situated in the gap between center and side cards */\n        .mu-nav-btn {\n            position: absolute;\n            top: 50%;\n            width: 44px;\n            height: 44px;\n            border-radius: 50%;\n            background: #FFFFFF;\n            color: #0F172A;\n            box-shadow: 0 8px 24px rgba(0,0,0,0.18);\n            border: 1px solid rgba(226, 232, 240, 0.9);\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            z-index: 30;\n            cursor: pointer;\n            transition: all 0.25s ease;\n        }\n\n        .mu-nav-btn:hover {\n            background: #F8FAFC;\n            box-shadow: 0 12px 28px rgba(0,0,0,0.24);\n        }\n\n        .mu-nav-btn.prev-btn {\n            left: calc(50% - (var(--mu-card-w) * 0.5 + var(--mu-gap) * 0.5));\n            transform: translate(-50%, -50%);\n        }\n        .mu-nav-btn.prev-btn:hover {\n            transform: translate(-50%, -50%) scale(1.1);\n        }\n\n        .mu-nav-btn.next-btn {\n            left: calc(50% + (var(--mu-card-w) * 0.5 + var(--mu-gap) * 0.5));\n            transform: translate(-50%, -50%);\n        }\n        .mu-nav-btn.next-btn:hover {\n            transform: translate(-50%, -50%) scale(1.1);\n        }\n\n        @media (max-width: 860px) {\n            .mu-nav-btn.prev-btn {\n                left: 12px;\n                transform: translateY(-50%);\n            }\n            .mu-nav-btn.prev-btn:hover {\n                transform: translateY(-50%) scale(1.1);\n            }\n            .mu-nav-btn.next-btn {\n                left: auto;\n                right: 12px;\n                transform: translateY(-50%);\n            }\n            .mu-nav-btn.next-btn:hover {\n                transform: translateY(-50%) scale(1.1);\n            }\n        }\n\n        @keyframes sirenFlash {\n            0% { fill: #EF4444; filter: drop-shadow(0 0 8px #EF4444); }\n            100% { fill: #3B82F6; filter: drop-shadow(0 0 8px #3B82F6); }\n        }\n        .siren-flash {\n            animation: sirenFlash 0.3s infinite alternate;\n        }";

const stepColors = [
  "#EF4444",
  "#F97316",
  "#F59E0B",
  "#3B82F6",
  "#14B8A6",
  "#22C55E",
];

const simNodes = {
  incident: { x: 65, y: 60 },
  ambulance: { x: 10, y: 20 },
  hospital: { x: 82, y: 25 },
  police: { x: 40, y: 15 },
  fire: { x: 18, y: 70 },
};

const simSignals = [
  { x: 30, y: 30 },
  { x: 45, y: 40 },
  { x: 55, y: 50 },
  { x: 70, y: 55 },
];

const mockLocations = [
  "Kempegowda International Airport (BLR)",
  "Majestic Bus Station, Bengaluru",
  "Indiranagar Metro Station, Bengaluru",
  "Fortis Hospital, Bannerghatta Road",
  "Apollo Hospitals, Jayanagar",
  "Manipal Hospital, HAL Old Airport Road",
  "Narayana Health City, Bommasandra",
  "MG Road Metro Station, Bengaluru",
  "Koramangala 4th Block, Bengaluru",
  "Whitefield Railway Station, Bengaluru",
];

export default function HomePage() {
  usePageSetup({
    title: "EMSTRAP | Emergency Response Ecosystem",
    bodyClass: "text-slate-100 min-h-screen flex flex-col justify-between selection:bg-brandBlue selection:text-white",
    customCss: PAGE_CSS,
    enableWave: true,
    enableHeaderAmbulance: true,
  });

  const currentHeroSectorRef = useRef(0);
  const heroSectorIntervalRef = useRef(null);
  const currentMuIndexRef = useRef(0);
  const muAutoPlayTimerRef = useRef(null);
  const simIntervalRef = useRef(null);
  const simTimeoutsRef = useRef([]);
  const zoomTimersRef = useRef([]);
  const suggestionTimersRef = useRef([]);
  const simSessionRef = useRef(0);
  const isMountedRef = useRef(true);
  const simStateRef = useRef({
    type: null,
    gps: { lat: 12.9716, lon: 77.5946 },
    image: false,
    accepted: false,
    corridor: false,
    camActive: false,
    alertSent: false,
    ambPos: { x: 10, y: 20 },
  });
  const bookStateRef = useRef({
    pickup: "",
    drop: "",
    type: "basic",
    price: 1000,
  });

  const totalHeroSectors = 5;
  const totalMuSlides = 4;

  const setHeroSector = (index, resetTimer = true) => {
    currentHeroSectorRef.current = (index + totalHeroSectors) % totalHeroSectors;
    for (let i = 0; i < totalHeroSectors; i++) {
      const slide = document.getElementById(`heroBgSlide${i}`);
      const dot = document.getElementById(`heroSectorDot${i}`);
      if (slide) {
        if (i === currentHeroSectorRef.current) {
          slide.classList.remove("opacity-0");
          slide.classList.add("opacity-100");
        } else {
          slide.classList.remove("opacity-100");
          slide.classList.add("opacity-0");
        }
      }
      if (dot) {
        dot.className =
          i === currentHeroSectorRef.current
            ? "w-8 h-1.5 rounded-full bg-white transition-all duration-300"
            : "w-2 h-1.5 rounded-full bg-white/30 hover:bg-white/60 transition-all duration-300";
      }
    }
    if (resetTimer) {
      pauseHeroSectorAutoCycle();
      startHeroSectorAutoCycle();
    }
  };

  const startHeroSectorAutoCycle = () => {
    if (heroSectorIntervalRef.current) {
        clearTimeout(heroSectorIntervalRef.current);
    }

    const advanceSlide = () => {
        const nextIndex = (currentHeroSectorRef.current + 1) % totalHeroSectors;

        setHeroSector(nextIndex, false);

        // Video gets 10 seconds; all images get 4 seconds
        const delay = nextIndex === 0 ? 10000 : 4000;

        heroSectorIntervalRef.current = setTimeout(advanceSlide, delay);
    };

    // First slide is the video: show it for 10 seconds
    heroSectorIntervalRef.current = setTimeout(advanceSlide, 10000);
};

  const pauseHeroSectorAutoCycle = () => {
    if (heroSectorIntervalRef.current) {
      clearInterval(heroSectorIntervalRef.current);
      heroSectorIntervalRef.current = null;
    }
  };

  const updateMuSlider = () => {
    const cards = document.querySelectorAll("#muServicesStage .mu-card");
    const dots = document.querySelectorAll("#muDotsContainer button");
    if (!cards.length) return;

    cards.forEach((card) => {
      const idx = parseInt(card.dataset.index || "0", 10);
      card.classList.remove("active", "prev", "next", "hidden-card");
      if (idx === currentMuIndexRef.current) {
        card.classList.add("active");
      } else if (idx === (currentMuIndexRef.current - 1 + totalMuSlides) % totalMuSlides) {
        card.classList.add("prev");
      } else if (idx === (currentMuIndexRef.current + 1) % totalMuSlides) {
        card.classList.add("next");
      } else {
        card.classList.add("hidden-card");
      }
    });

    dots.forEach((dot, idx) => {
      dot.className =
        idx === currentMuIndexRef.current
          ? "w-8 h-2 rounded-full bg-slate-900 transition-all cursor-pointer"
          : "w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400 transition-all cursor-pointer";
    });
  };

  const stopMuAutoPlay = () => {
    if (muAutoPlayTimerRef.current) {
      clearInterval(muAutoPlayTimerRef.current);
      muAutoPlayTimerRef.current = null;
    }
  };

  const startMuAutoPlay = () => {
    stopMuAutoPlay();
    muAutoPlayTimerRef.current = setInterval(() => {
      currentMuIndexRef.current = (currentMuIndexRef.current + 1) % totalMuSlides;
      updateMuSlider();
    }, 6000);
  };

  const setMuSlide = (idx) => {
    currentMuIndexRef.current = (idx + totalMuSlides) % totalMuSlides;
    updateMuSlider();
    startMuAutoPlay();
  };

  const nextMuSlide = () => setMuSlide(currentMuIndexRef.current + 1);
  const prevMuSlide = () => setMuSlide(currentMuIndexRef.current - 1);
  const handleMuCardClick = (idx) => {
    if (idx === currentMuIndexRef.current) return;
    setMuSlide(idx);
  };

  const toggleMobileMenu = () => {
    const mobileMenu = document.getElementById("mobileMenu");
    if (mobileMenu) {
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("flex");
    }
  };

  const closeSuccessModal = () => {
    const sm = document.getElementById("successModal");
    if (sm) {
      sm.classList.add("hidden");
      sm.classList.remove("flex");
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = document.getElementById("contactForm");
    const submitButton = document.getElementById("submitBtn");
    if (!form || !submitButton) return;

    const fullName = form.querySelector("#fullName")?.value.trim() || "";
    const organization = form.querySelector("#organization")?.value.trim() || "";
    const email = form.querySelector("#email")?.value.trim() || "";
    const phone = form.querySelector("#phone")?.value.trim() || "";
    const message = form.querySelector("#message")?.value.trim() || "";
    if (!fullName || !organization || !email || !phone || !message) {
      showEmstrapAlert("Please fill all fields.");
      return;
    }

    submitButton.disabled = true;
    const spanEl = submitButton.querySelector("span");
    const originalLabel = spanEl ? spanEl.textContent : submitButton.textContent;
    if (spanEl) spanEl.textContent = "Sending...";
    else submitButton.textContent = "Sending...";

    const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    const abortTimer = controller ? setTimeout(() => controller.abort(), 10000) : null;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.slice(0, 200),
          organization: organization.slice(0, 200),
          email: email.slice(0, 254),
          phone: phone.slice(0, 50),
          message: message.slice(0, 4000),
        }),
        signal: controller?.signal,
      });
      let result = null;
      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (response.ok && result?.success) {
        const sm = document.getElementById("successModal");
        sm?.classList.remove("hidden");
        sm?.classList.add("flex");
        form.reset();
      } else {
        showEmstrapAlert(result?.message || "Unable to send your message right now. Please verify your details and try again.");
      }
    } catch (err) {
      if (err?.name === "AbortError") {
        showEmstrapAlert("Request timed out. Please check your connection and try again.");
      } else {
        showEmstrapAlert("Network error while sending message. Please try again shortly.");
      }
    } finally {
      if (abortTimer) clearTimeout(abortTimer);
      submitButton.disabled = false;
      if (spanEl) spanEl.textContent = originalLabel || "Send Message";
      else submitButton.textContent = originalLabel || "Send Message";
    }
  };

  const closeLogoLightbox = () => {
    const lb = document.getElementById("logoLightbox");
    if (lb) {
      lb.classList.add("hidden");
      lb.classList.remove("flex");
    }
  };

  const clearSimTimers = () => {
    if (simIntervalRef.current) {
      clearInterval(simIntervalRef.current);
      simIntervalRef.current = null;
    }
    simTimeoutsRef.current.forEach((id) => clearTimeout(id));
    simTimeoutsRef.current = [];
  };

  const scheduleSimTimeout = (fn, delay) => {
    const id = setTimeout(() => {
      simTimeoutsRef.current = simTimeoutsRef.current.filter((t) => t !== id);
      fn();
    }, delay);
    simTimeoutsRef.current.push(id);
    return id;
  };

  const simAddLog = (...parts) => {
    const box = document.getElementById("simLogBox");
    const empty = document.getElementById("simLogEmpty");
    if (empty) empty.style.display = "none";
    if (!box) return;
    const time = new Date().toLocaleTimeString();
    const p = document.createElement("p");
    const timeSpan = document.createElement("span");
    timeSpan.className = "text-slate-500";
    timeSpan.textContent = `[${time}]`;
    p.appendChild(timeSpan);
    p.appendChild(document.createTextNode(" "));

    parts.forEach((part) => {
      if (part == null) return;
      if (typeof part === "object" && part.bold !== undefined) {
        const b = document.createElement("b");
        b.textContent = String(part.bold);
        p.appendChild(b);
      } else if (typeof part === "object" && part.icon) {
        const icon = document.createElement("i");
        icon.className = String(part.icon);
        p.appendChild(icon);
      } else {
        p.appendChild(document.createTextNode(String(part)));
      }
    });

    box.appendChild(p);
    box.scrollTop = box.scrollHeight;
  };

  const simUpdateAmbPos = () => {
    const amb = document.getElementById("simNodeAmbulance");
    if (amb) {
      amb.style.left = `${simStateRef.current.ambPos.x}%`;
      amb.style.top = `${simStateRef.current.ambPos.y}%`;
    }
  };

  const simRenderSignals = () => {
    const container = document.getElementById("simSignalsContainer");
    if (!container) return;
    container.replaceChildren();
    simSignals.forEach((s) => {
      const div = document.createElement("div");
      div.className = "absolute w-2.5 h-6 bg-slate-800 border border-slate-700 rounded-sm flex flex-col justify-between p-0.5 z-20";
      div.style.left = `${s.x}%`;
      div.style.top = `${s.y}%`;

      const red = document.createElement("div");
      red.className = `w-full h-1.5 rounded-sm transition-colors duration-500 ${simStateRef.current.corridor ? "bg-red-500/10" : "bg-red-500"}`;
      const amber = document.createElement("div");
      amber.className = "w-full h-1.5 rounded-sm bg-amber-500/10";
      const green = document.createElement("div");
      green.className = `w-full h-1.5 rounded-sm transition-colors duration-500 ${simStateRef.current.corridor ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" : "bg-green-500/20"}`;

      div.appendChild(red);
      div.appendChild(amber);
      div.appendChild(green);
      container.appendChild(div);
    });
  };

  const simStartCamera = async (sessionId) => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("MediaDevices unavailable");
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      if (!isMountedRef.current || simSessionRef.current !== sessionId) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      const video = document.getElementById("simVideo");
      if (video) {
        video.srcObject = stream;
        simStateRef.current.camActive = true;
      } else {
        stream.getTracks().forEach((t) => t.stop());
      }
    } catch {
      if (isMountedRef.current && simSessionRef.current === sessionId) {
        simAddLog("[ALERT]  Camera unavailable. Use “Sample Image” to proceed.");
      }
    }
  };

  const simStopCamera = () => {
    const video = document.getElementById("simVideo");
    if (video && video.srcObject) {
      video.srcObject.getTracks().forEach((t) => t.stop());
      video.srcObject = null;
      simStateRef.current.camActive = false;
    }
  };

  const openSimulation = () => {
    document.getElementById("simModal")?.classList.remove("hidden");
    document.getElementById("simModal")?.classList.add("flex");
    simRenderSignals();
  };

  const closeSimulation = () => {
    simSessionRef.current += 1;
    document.getElementById("simModal")?.classList.remove("flex");
    document.getElementById("simModal")?.classList.add("hidden");
    simStopCamera();
    clearSimTimers();
  };

  const playDemoVideo = () => {
    const playerModal = document.getElementById("videoPlayerModal");
    const video = document.getElementById("demoVideoPlayer");
    playerModal?.classList.remove("hidden");
    playerModal?.classList.add("flex");
    if (video?.play) {
      Promise.resolve(video.play()).catch(() => {});
    }
  };

  const closeVideoPlayer = () => {
    const playerModal = document.getElementById("videoPlayerModal");
    const video = document.getElementById("demoVideoPlayer");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    playerModal?.classList.remove("flex");
    playerModal?.classList.add("hidden");
  };

  const simHandleAlert = async (type) => {
    const sessionId = simSessionRef.current;
    simStateRef.current.type = type;
    document.getElementById("simInitialSection")?.classList.add("hidden");
    document.getElementById("simCameraSection")?.classList.remove("hidden");
    const sendBtn = document.getElementById("simSendBtn");
    if (sendBtn) sendBtn.disabled = !simStateRef.current.image;
    const typeLbl = document.getElementById("simTypeLabel");
    if (typeLbl) typeLbl.innerText = type.toUpperCase();

    if (type === "fire") document.getElementById("simNodeFire")?.classList.remove("hidden");
    else document.getElementById("simNodeFire")?.classList.add("hidden");
    document.getElementById("simNodeIncident")?.classList.remove("hidden");

    simAddLog("Alert type selected: ", { bold: type.toUpperCase() }, ". Camera opened – capture required.");
    await simStartCamera(sessionId);
    if (!isMountedRef.current || simSessionRef.current !== sessionId) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (!isMountedRef.current || simSessionRef.current !== sessionId) return;
          simStateRef.current.gps = {
            lat: +pos.coords.latitude.toFixed(5),
            lon: +pos.coords.longitude.toFixed(5),
          };
          const gpsLbl = document.getElementById("simGpsLabel");
          if (gpsLbl) gpsLbl.innerText = `${simStateRef.current.gps.lat}, ${simStateRef.current.gps.lon}`;
          simAddLog(`GPS captured: ${simStateRef.current.gps.lat}, ${simStateRef.current.gps.lon}`);
        },
        () => {
          if (!isMountedRef.current || simSessionRef.current !== sessionId) return;
          simAddLog("GPS permission denied – using default Bengaluru coords.");
        }
      );
    }
  };

  const simCaptureImage = () => {
    const video = document.getElementById("simVideo");
    const canvas = document.getElementById("simCanvas");
    if (video && canvas) {
      const w = video.videoWidth || 640;
      const h = video.videoHeight || 360;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, w, h);
      canvas.classList.remove("hidden");
      simStateRef.current.image = true;
      const imgLbl = document.getElementById("simImgLabel");
      if (imgLbl) imgLbl.innerText = "Captured [CONFIRMED]";
      const sendBtn = document.getElementById("simSendBtn");
      if (sendBtn) sendBtn.disabled = false;
      simAddLog("Image captured and attached to the alert.");
    }
  };

  const simUseSampleImage = () => {
    const canvas = document.getElementById("simCanvas");
    if (canvas) {
      canvas.width = 640;
      canvas.height = 360;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#111";
        ctx.fillRect(0, 0, 640, 360);
        ctx.fillStyle = "#C9302C";
        ctx.beginPath();
        ctx.arc(480, 240, 50, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#22c55e";
        ctx.fillRect(60, 90, 28, 28);
        ctx.fillStyle = "#eab308";
        ctx.fillRect(520, 60, 32, 32);
        ctx.fillStyle = "#60a5fa";
        ctx.beginPath();
        ctx.arc(260, 70, 18, 0, Math.PI * 2);
        ctx.fill();
      }
      canvas.classList.remove("hidden");
      simStateRef.current.image = true;
      const imgLbl = document.getElementById("simImgLabel");
      if (imgLbl) imgLbl.innerText = "Sample [CONFIRMED]";
      const sendBtn = document.getElementById("simSendBtn");
      if (sendBtn) sendBtn.disabled = false;
      simAddLog("Sample image generated and attached to the alert.");
    }
  };

  const simMoveToHospital = (startX, startY) => {
    if (simIntervalRef.current) clearInterval(simIntervalRef.current);
    let x = startX;
    let y = startY;
    const tx = simNodes.hospital.x;
    const ty = simNodes.hospital.y;

    simIntervalRef.current = setInterval(() => {
      const dx = tx - x;
      const dy = ty - y;
      const dist = Math.hypot(dx, dy);

      if (dist < 1) {
        clearInterval(simIntervalRef.current);
        simIntervalRef.current = null;
        simStateRef.current.ambPos = { x: tx, y: ty };
        simStateRef.current.corridor = false;
        simUpdateAmbPos();
        simRenderSignals();
        simAddLog("[FACILITY]  Reached hospital. Handover complete. Case closed. [CONFIRMED]");
        simAddLog("[SIGNAL]  Green Corridor deactivated. Normal traffic restored.");
      } else {
        const spd = 0.6;
        x += (dx / dist) * spd;
        y += (dy / dist) * spd;
        simStateRef.current.ambPos = { x, y };
        simUpdateAmbPos();
      }
    }, 30);
  };

  const simStartAmbulanceAnimation = () => {
    if (simIntervalRef.current) clearInterval(simIntervalRef.current);
    let x = simNodes.ambulance.x;
    let y = simNodes.ambulance.y;
    const tx = simNodes.incident.x;
    const ty = simNodes.incident.y;

    simIntervalRef.current = setInterval(() => {
      const dx = tx - x;
      const dy = ty - y;
      const dist = Math.hypot(dx, dy);

      if (dist < 1) {
        clearInterval(simIntervalRef.current);
        simIntervalRef.current = null;
        simStateRef.current.ambPos = { x: tx, y: ty };
        simUpdateAmbPos();
        simAddLog("[CONFIRMED] Ambulance arrived at incident. Hospital pre-alerted; Police managing traffic.");
        scheduleSimTimeout(() => {
          simAddLog("[UNIT]  Transporting patient to hospital…");
          simMoveToHospital(tx, ty);
        }, 900);
      } else {
        const spd = 0.5;
        x += (dx / dist) * spd;
        y += (dy / dist) * spd;
        simStateRef.current.ambPos = { x, y };
        simUpdateAmbPos();
      }
    }, 30);
  };

  const simNotifyResponders = () => {
    simAddLog("[DISPATCH]  Notifications dispatched via WhatsApp/SMS/App to responders (image + location attached).");
    scheduleSimTimeout(() => {
      simStateRef.current.accepted = true;
      simStateRef.current.corridor = true;
      simRenderSignals();
      simAddLog("[UNIT]  Ambulance A → ", { bold: "“I’m responding”" }, ". Details shared with Citizen, Police, and Hospital.");
      simAddLog("[ACTIVE]  Green Corridor activated on route – traffic signals set to priority green.");
      simStartAmbulanceAnimation();
    }, 1200);
  };

  const simSendAlert = () => {
    simStopCamera();
    simStateRef.current.alertSent = true;
    const sendBtn = document.getElementById("simSendBtn");
    if (sendBtn) sendBtn.disabled = true;
    simAddLog("[TRANSMIT]  Alert sent to server with image & GPS.");
    scheduleSimTimeout(() => {
      simAddLog("[SEARCH]  Finding nearest responders…");
      scheduleSimTimeout(() => {
        const fireParts =
          simStateRef.current.type === "fire"
            ? [" , ", { bold: "Fire Station 12" }, " (3.4 km)"]
            : [];
        simAddLog(
          "[CONFIRMED] Selected: ",
          { bold: "Ambulance A" },
          " (2.6 km), ",
          { bold: "City Care Hospital" },
          " (4.1 km), ",
          { bold: "Highway Police" },
          " (2.0 km)",
          ...fireParts,
          "."
        );
        simNotifyResponders();
      }, 900);
    }, 500);
  };

  const bookGoToStep = (stepNum) => {
    for (let i = 1; i <= 4; i++) {
      const el = document.getElementById("bookStep" + i);
      if (el) {
        if (i === stepNum) el.classList.remove("hidden");
        else el.classList.add("hidden");
      }
    }
  };

  const bookSetType = (type, price) => {
    bookStateRef.current.type = type;
    bookStateRef.current.price = price;
  };

  const bookGoToStep2 = () => {
    const p = document.getElementById("bookPickup")?.value.trim() || "";
    const d = document.getElementById("bookDrop")?.value.trim() || "";
    if (!p || !d) {
      showEmstrapAlert("Please enter both Pickup and Drop locations.");
      return;
    }
    bookStateRef.current.pickup = p;
    bookStateRef.current.drop = d;
    bookGoToStep(2);
  };

  const bookGoToStep3 = () => {
    const sp = document.getElementById("summaryPickup");
    const sd = document.getElementById("summaryDrop");
    const st = document.getElementById("summaryType");
    const spr = document.getElementById("summaryPrice");
    if (sp) sp.innerText = bookStateRef.current.pickup;
    if (sd) sd.innerText = bookStateRef.current.drop;

    let label = "Basic Life Support (BLS)";
    if (bookStateRef.current.type === "oxygen") label = "Oxygen Support";
    if (bookStateRef.current.type === "pregnancy") label = "Pregnancy Support";
    if (bookStateRef.current.type === "icu") label = "ICU / Advanced (ALS)";

    if (st) st.innerText = label;
    if (spr) spr.innerText = "₹" + bookStateRef.current.price.toLocaleString();
    bookGoToStep(3);
  };

  const bookMoveToDestination = () => {
    if (simIntervalRef.current) clearInterval(simIntervalRef.current);
    let x = 30;
    let y = 65;
    const dxDest = 75;
    const dyDest = 35;

    simIntervalRef.current = setInterval(() => {
      const dx = dxDest - x;
      const dy = dyDest - y;
      const dist = Math.hypot(dx, dy);
      if (dist < 1) {
        clearInterval(simIntervalRef.current);
        simIntervalRef.current = null;
        simStateRef.current.ambPos = { x: dxDest, y: dyDest };
        simUpdateAmbPos();
        simAddLog("[FACILITY]  Arrived at destination: ", { bold: bookStateRef.current.drop }, ". Handover complete. Booking closed. [CONFIRMED]");
        document.getElementById("simNodePickup")?.classList.add("hidden");
        document.getElementById("simNodeDrop")?.classList.add("hidden");
      } else {
        const spd = 0.5;
        x += (dx / dist) * spd;
        y += (dy / dist) * spd;
        simStateRef.current.ambPos = { x, y };
        simUpdateAmbPos();
      }
    }, 30);
  };

  const bookStartAmbulanceAnimation = () => {
    if (simIntervalRef.current) clearInterval(simIntervalRef.current);
    document.getElementById("simNodePickup")?.classList.remove("hidden");
    document.getElementById("simNodeDrop")?.classList.remove("hidden");
    simAddLog({ icon: "fa-regular fa-calendar" }, " Booking confirmed! Dispatching Ambulance A to: ", { bold: bookStateRef.current.pickup }, ".");

    let x = 10;
    let y = 20;
    const px = 30;
    const py = 65;

    simIntervalRef.current = setInterval(() => {
      const dx = px - x;
      const dy = py - y;
      const dist = Math.hypot(dx, dy);
      if (dist < 1) {
        clearInterval(simIntervalRef.current);
        simIntervalRef.current = null;
        simStateRef.current.ambPos = { x: px, y: py };
        simUpdateAmbPos();
        simAddLog("[UNIT]  Ambulance arrived at: ", { bold: bookStateRef.current.pickup }, ". Patient boarded successfully.");
        scheduleSimTimeout(() => {
          simAddLog("[TRANSIT]  En route to destination: ", { bold: bookStateRef.current.drop }, "…");
          bookMoveToDestination();
        }, 1200);
      } else {
        const spd = 0.5;
        x += (dx / dist) * spd;
        y += (dy / dist) * spd;
        simStateRef.current.ambPos = { x, y };
        simUpdateAmbPos();
      }
    }, 30);
  };

  const bookCompleteBooking = () => {
    bookGoToStep(4);
    clearSimTimers();
    bookStartAmbulanceAnimation();
  };

  const openBookingSection = () => {
    document.getElementById("simInitialSection")?.classList.add("hidden");
    document.getElementById("simBookingSection")?.classList.remove("hidden");
    document.getElementById("simTelemetryLabels")?.classList.add("hidden");
    bookGoToStep(1);
  };

  const simReset = () => {
    simSessionRef.current += 1;
    simStopCamera();
    clearSimTimers();
    simStateRef.current = {
      type: null,
      gps: { lat: 12.9716, lon: 77.5946 },
      image: false,
      accepted: false,
      corridor: false,
      camActive: false,
      alertSent: false,
      ambPos: { x: 10, y: 20 },
    };
    const box = document.getElementById("simLogBox");
    if (box) {
      const emptyP = document.createElement("p");
      emptyP.className = "text-slate-600 italic";
      emptyP.id = "simLogEmpty";
      emptyP.textContent = "Awaiting events...";
      box.replaceChildren(emptyP);
    }
    document.getElementById("simInitialSection")?.classList.remove("hidden");
    document.getElementById("simCameraSection")?.classList.add("hidden");
    document.getElementById("simBookingSection")?.classList.add("hidden");
    document.getElementById("simTelemetryLabels")?.classList.remove("hidden");
    document.getElementById("simCanvas")?.classList.add("hidden");
    const typeLbl = document.getElementById("simTypeLabel");
    if (typeLbl) typeLbl.innerText = "–";
    const gpsLbl = document.getElementById("simGpsLabel");
    if (gpsLbl) gpsLbl.innerText = "12.9716, 77.5946";
    const imgLbl = document.getElementById("simImgLabel");
    if (imgLbl) imgLbl.innerText = "Not captured";
    const sendBtn = document.getElementById("simSendBtn");
    if (sendBtn) sendBtn.disabled = true;
    document.getElementById("simNodeIncident")?.classList.add("hidden");
    document.getElementById("simNodeFire")?.classList.add("hidden");
    document.getElementById("simNodePickup")?.classList.add("hidden");
    document.getElementById("simNodeDrop")?.classList.add("hidden");
    const pInput = document.getElementById("bookPickup");
    if (pInput) pInput.value = "Majestic Bus Station, Bengaluru";
    const dInput = document.getElementById("bookDrop");
    if (dInput) dInput.value = "Fortis Hospital, Bannerghatta Road";
    document.querySelectorAll('input[name="ambType"]').forEach((r) => {
      if (r.value === "basic") r.checked = true;
    });
    bookStateRef.current = { pickup: "", drop: "", type: "basic", price: 1000 };
    bookGoToStep(1);
    simUpdateAmbPos();
    simRenderSignals();
    simAddLog("Simulation reset.");
  };

  const showSuggestions = (inputId, suggestionsId) => {
    const input = document.getElementById(inputId);
    const container = document.getElementById(suggestionsId);
    if (!input || !container) return;
    const val = input.value.toLowerCase();
    container.replaceChildren();
    if (!val) {
      container.classList.add("hidden");
      return;
    }
    const matches = mockLocations.filter((loc) => loc.toLowerCase().includes(val));
    if (!matches.length) {
      container.classList.add("hidden");
      return;
    }
    matches.forEach((loc) => {
      const div = document.createElement("div");
      div.className = "px-4 py-2.5 text-[11px] text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer transition-colors border-b border-white/5 last:border-0";
      div.innerText = loc;
      div.onmousedown = () => {
        input.value = loc;
        container.classList.add("hidden");
      };
      container.appendChild(div);
    });
    container.classList.remove("hidden");
  };

  const hideSuggestions = (suggestionsId) => {
    const id = setTimeout(() => {
      document.getElementById(suggestionsId)?.classList.add("hidden");
    }, 150);
    suggestionTimersRef.current.push(id);
  };

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

  const closeResourceModal = () => {
    const modal = document.getElementById("resourceModal");
    const iframe = document.getElementById("resourceModalIframe");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.body.style.overflow = "";
    }
    if (iframe) iframe.removeAttribute("src");
  };

  useEffect(() => {
    isMountedRef.current = true;
    // 1. Mobile menu button
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    mobileMenuBtn?.addEventListener("click", toggleMobileMenu);

    // 2. Hero 5-sector slider
    setHeroSector(0, false);
    startHeroSectorAutoCycle();
    const onVisChange = () => {
      if (document.hidden) pauseHeroSectorAutoCycle();
      else startHeroSectorAutoCycle();
    };
    document.addEventListener("visibilitychange", onVisChange);

    // 3. How It Works progress bar
    const updateHowItWorksProgress = () => {
      const section = document.getElementById("page-how-it-works");
      const progressLine = document.getElementById("howItWorksProgressLine");
      if (!section || !progressLine) return;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const startScroll = windowHeight * 0.75;
      const endScroll = windowHeight * 0.25;
      const scrollRange = startScroll - endScroll;
      const currentScroll = startScroll - rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / scrollRange));
      progressLine.style.width = progress * 100 + "%";

      const thresholds = [0, 0.2, 0.4, 0.6, 0.8, 0.98];
      for (let i = 0; i < 6; i++) {
        const badge = document.getElementById(`stepBadge${i}`);
        if (!badge) continue;
        if (progress >= thresholds[i]) {
          badge.style.borderColor = stepColors[i];
          badge.style.boxShadow = `0 0 16px ${stepColors[i]}80`;
          badge.style.transform = "scale(1.1)";
        } else {
          badge.style.borderColor = "#CBD5E1";
          badge.style.boxShadow = "none";
          badge.style.transform = "scale(1)";
        }
      }
    };
    updateHowItWorksProgress();
    window.addEventListener("scroll", updateHowItWorksProgress, { passive: true });
    window.addEventListener("resize", updateHowItWorksProgress, { passive: true });

    // 4. Nav active link scroll spy & smooth anchor scrolling
    const trackScrollNavigation = () => {
      const sections = document.querySelectorAll("#page-landing, #page-about, #page-services, #page-who-we-serve, #page-contact");
      const navLinks = document.querySelectorAll(".nav-link");
      let currentSection = "";
      sections.forEach((sec) => {
        const top = sec.getBoundingClientRect().top;
        if (top <= 160) currentSection = sec.id;
      });
      navLinks.forEach((link) => {
        link.classList.remove("active");
        const href = link.getAttribute("href");
        if (href && href === "#" + currentSection) {
          link.classList.add("active");
        }
      });
    };
    trackScrollNavigation();
    window.addEventListener("scroll", trackScrollNavigation, { passive: true });

    // 5. Mu Sigma Coverflow
    updateMuSlider();
    const carousel = document.getElementById("muServicesCarousel");
    carousel?.addEventListener("mouseenter", stopMuAutoPlay);
    carousel?.addEventListener("mouseleave", startMuAutoPlay);
    carousel?.addEventListener("touchstart", stopMuAutoPlay, { passive: true });
    carousel?.addEventListener("touchend", startMuAutoPlay, { passive: true });
    startMuAutoPlay();

    // 6. Who We Serve Marquee Clones
    const whoTrack = document.getElementById("whoWeServeBeltTrack");
    if (whoTrack && !whoTrack.dataset.cloned) {
      const sourceCards = whoTrack.querySelectorAll(".who-card-source");
      sourceCards.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        clone.classList.remove("who-card-source");
        clone.classList.add("who-card-clone");
        whoTrack.appendChild(clone);
      });
      whoTrack.dataset.cloned = "true";
    }

    // 7. Zoom images & GSAP section reveals
    const zoomImages = document.querySelectorAll(".zoomable-img");
    const zoomHandlers = [];
    zoomImages.forEach((img) => {
      const h = (e) => openZoomModal(e.currentTarget.src);
      img.addEventListener("click", h);
      zoomHandlers.push([img, h]);
    });

    const sectionTweens = [];
    gsap.utils.toArray("main > div:not(#page-landing), main section:not(#page-landing)").forEach((section) => {
      const t = gsap.fromTo(
        section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 85%", once: true },
        }
      );
      sectionTweens.push(t);
    });

    // 8. Escape key
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        closeResourceModal();
        closeLogoLightbox();
        closeSuccessModal();
        closeSimulation();
        closeVideoPlayer();
        closeZoomModal();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      isMountedRef.current = false;
      simSessionRef.current += 1;
      mobileMenuBtn?.removeEventListener("click", toggleMobileMenu);
      pauseHeroSectorAutoCycle();
      document.removeEventListener("visibilitychange", onVisChange);
      window.removeEventListener("scroll", updateHowItWorksProgress);
      window.removeEventListener("resize", updateHowItWorksProgress);
      window.removeEventListener("scroll", trackScrollNavigation);
      carousel?.removeEventListener("mouseenter", stopMuAutoPlay);
      carousel?.removeEventListener("mouseleave", startMuAutoPlay);
      carousel?.removeEventListener("touchstart", stopMuAutoPlay);
      carousel?.removeEventListener("touchend", startMuAutoPlay);
      stopMuAutoPlay();
      if (whoTrack) {
        whoTrack.querySelectorAll(".who-card-clone").forEach((node) => node.remove());
        delete whoTrack.dataset.cloned;
      }
      zoomHandlers.forEach(([img, h]) => img.removeEventListener("click", h));
      sectionTweens.forEach((t) => {
        if (t.scrollTrigger) t.scrollTrigger.kill();
        t.kill();
      });
      document.removeEventListener("keydown", onKeyDown);
      clearSimTimers();
      simStopCamera();
      zoomTimersRef.current.forEach((t) => clearTimeout(t));
      zoomTimersRef.current = [];
      suggestionTimersRef.current.forEach((t) => clearTimeout(t));
      suggestionTimersRef.current = [];
    };
  }, []);

  return (
    <div className="page-scope-homepage min-h-screen flex flex-col justify-between">
      

    {/* Top Glow Line */}
    <div className="h-1.5 w-full bg-gradient-to-r from-emergencyRed via-brandBlue to-emerald-400"></div>

    {/* Fixed Header & Navigation */}
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10 py-5 bg-[#050B14]/95 backdrop-blur-md" id="mainHeader">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-2">
            <a className="flex items-center group shrink-0" href="#page-landing">
                <div className="h-9 sm:h-10 flex items-center transition-transform duration-300 group-hover:scale-105">
                    <img src="/images/logo.png" alt="EMSTRAP" className="h-full w-auto object-contain" />
                </div>
            </a>
            
            <div className="flex items-center space-x-3 sm:space-x-6 lg:space-x-8">
                <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
                    <a className="nav-link text-xs lg:text-sm font-semibold transition-colors duration-200 text-neutral-300 hover:text-white" href="#page-about" id="nav-about">About</a>
                    <a className="nav-link text-xs lg:text-sm font-semibold transition-colors duration-200 text-neutral-300 hover:text-white" href="#page-services" id="nav-services">Services</a>
                    {/* Solutions Dropdown */}
                    <div className="relative group py-2">
                        <button className="nav-link flex items-center gap-1.5 text-xs lg:text-sm font-semibold transition-colors duration-200 text-neutral-300 hover:text-white">
                            <span>Solutions</span>
                            <i className="fa-solid fa-chevron-down text-[10px] text-neutral-400 group-hover:text-white transition-transform group-hover:rotate-180"></i>
                        </button>
                        <div className="absolute top-full left-0 w-60 bg-[#0B1528] border border-white/10 rounded-2xl shadow-2xl py-2 hidden group-hover:block z-50">
                            <Link to="/corporate-companies" className="block px-4 py-2 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-brandBlue">Corporate Companies</Link>
                            <Link to="/hospitals-and-clinics" className="block px-4 py-2 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-brandBlue">Hospitals &amp; Clinics</Link>
                            <Link to="/educational-campuses" className="block px-4 py-2 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-brandBlue">Educational Institutions</Link>
                            <Link to="/smart-cities" className="block px-4 py-2 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-brandBlue">Smart Cities</Link>
                            <Link to="/government-agencies" className="block px-4 py-2 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-brandBlue">Government Agencies</Link>
                            <Link to="/ambulance-providers" className="block px-4 py-2 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-brandBlue">Ambulance Providers</Link>
                            <Link to="/traffic-management" className="block px-4 py-2 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-brandBlue">Traffic Management</Link>
                            <Link to="/police-departments" className="block px-4 py-2 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-brandBlue">Police Departments</Link>
                        </div>
                    </div>
                    <Link to="/careers" className="nav-link text-xs lg:text-sm font-semibold transition-colors duration-200 text-neutral-300 hover:text-white" target="_blank" rel="noopener noreferrer" id="nav-careers">Careers</Link>
                    <a className="nav-link text-xs lg:text-sm font-semibold transition-colors duration-200 text-neutral-300 hover:text-white" href="#page-contact" id="nav-contact">Contact</a>
                </nav>
                <div className="flex items-center gap-2 pl-3 border-l border-neutral-800">
                    <a href="https://www.linkedin.com/company/emstrap/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-all text-xs" title="LinkedIn" aria-label="Official EMSTRAP LinkedIn">
                        <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                    <a href="https://www.instagram.com/emstrap_official?stkn=bjN6eXU2cHc5cHJ4" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-all text-xs" title="Instagram" aria-label="Official EMSTRAP Instagram">
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                </div>
                <button className="md:hidden text-white hover:text-brandBlue transition-colors p-2 text-xs font-bold tracking-wider focus:outline-none" id="mobileMenuBtn" aria-label="Toggle mobile navigation">
                    <i className="fa-solid fa-bars text-lg"></i>
                </button>
            </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        <div className="hidden absolute top-full left-0 right-0 glass-panel flex-col py-6 px-8 space-y-3 max-h-[85vh] overflow-y-auto" id="mobileMenu">
            <a className="nav-link text-sm font-semibold py-2 text-neutral-300 hover:text-white" href="#page-about" onClick={toggleMobileMenu}>About</a>
            <a className="nav-link text-sm font-semibold py-2 text-neutral-300 hover:text-white" href="#page-services" onClick={toggleMobileMenu}>Services</a>
            <div className="py-2 border-y border-white/10 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">Solutions</span>
                <Link to="/corporate-companies" className="block py-1 text-xs text-slate-300 hover:text-white pl-2">Corporate Companies</Link>
                <Link to="/smart-cities" className="block py-1 text-xs text-slate-300 hover:text-white pl-2">Smart Cities</Link>
                <Link to="/government-agencies" className="block py-1 text-xs text-slate-300 hover:text-white pl-2">Government Agencies</Link>
                <Link to="/ambulance-providers" className="block py-1 text-xs text-slate-300 hover:text-white pl-2">Ambulance Providers</Link>
                <Link to="/traffic-management" className="block py-1 text-xs text-slate-300 hover:text-white pl-2">Traffic Management</Link>
                <Link to="/police-departments" className="block py-1 text-xs text-slate-300 hover:text-white pl-2">Police Departments</Link>
            </div>
            <Link to="/careers" className="nav-link text-sm font-semibold py-2 text-neutral-300 hover:text-white" target="_blank" rel="noopener noreferrer" onClick={toggleMobileMenu}>Careers</Link>
            <a className="nav-link text-sm font-semibold py-2 text-neutral-300 hover:text-white" href="#page-contact" onClick={toggleMobileMenu}>Contact</a>
        </div>

        {/* Scroll Progress Ambulance Track in Header */}
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

    <main className="flex-grow">
        {/* 1.1 HERO SECTION WITH 4-SECOND BACKGROUND IMAGE SLIDER */}
       
{/* =========================================
    EMSTRAP HOMEPAGE HERO
    Video first, followed by 5 image slides
========================================= */}

<section
    className="relative min-h-[620px] md:min-h-[700px] lg:min-h-[760px] flex items-center bg-[#101B2B] text-white pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden"
    id="page-landing"
>
    {/* VIDEO — FIRST SLIDE */}
    <video
        id="heroBgSlide0"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="hero-bg-slide absolute inset-0 z-0 w-full h-full object-cover opacity-100 pointer-events-none"
        aria-label="EMSTRAP emergency response introduction"
    >
        <source src="/images/herovideo.mp4" type="video/mp4" />
    </video>

    {/* IMAGE SLIDE 1 — AMBULANCE */}
    <div
        id="heroBgSlide1"
        className="hero-bg-slide absolute inset-0 z-[1] opacity-0 pointer-events-none"
    >
        <img
            src="/ambulance.png"
            alt="Emergency medical ambulance fleet"
            decoding="async"
            className="w-full h-full object-cover object-center md:object-[72%_center]"
        />
    </div>

    {/* IMAGE SLIDE 2 — POLICE CONTROL ROOM */}
    <div
        id="heroBgSlide2"
        className="hero-bg-slide absolute inset-0 z-[1] opacity-0 pointer-events-none"
    >
        <img
            src="/images/police-control.jpg"
            alt="Police emergency control room"
            decoding="async"
            className="w-full h-full object-cover object-center"
        />
    </div>

    {/* IMAGE SLIDE 3 — INDUSTRIAL SAFETY */}
    <div
        id="heroBgSlide3"
        className="hero-bg-slide absolute inset-0 z-[1] opacity-0 pointer-events-none"
    >
        <img
            src="/images/shield-manufacturing.png"
            alt="Industrial workplace safety infrastructure"
            decoding="async"
            className="w-full h-full object-cover object-center"
        />
    </div>

    {/* IMAGE SLIDE 4 — SMART CITY */}
    <div
        id="heroBgSlide4"
        className="hero-bg-slide absolute inset-0 z-[1] opacity-0 pointer-events-none"
    >
        <img
            src="/images/shield-smartcity.jpg"
            alt="Smart city emergency infrastructure"
            decoding="async"
            className="w-full h-full object-cover object-center"
        />
    </div>

    {/* IMAGE SLIDE 5 — HOSPITAL */}
    <div
        id="heroBgSlide5"
        className="hero-bg-slide absolute inset-0 z-[1] opacity-0 pointer-events-none"
    >
        <img
            src="/images/hospital-er-operations.jpg"
            alt="Hospital emergency room operations"
            decoding="async"
            className="w-full h-full object-cover object-center"
        />
    </div>

    {/* BRIGHTER GRADIENT OVERLAY */}
    <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
            background: `
                linear-gradient(
                    90deg,
                    rgba(5, 15, 29, 0.72) 0%,
                    rgba(5, 15, 29, 0.48) 38%,
                    rgba(5, 15, 29, 0.20) 70%,
                    rgba(5, 15, 29, 0.12) 100%
                ),
                linear-gradient(
                    0deg,
                    rgba(5, 15, 29, 0.42) 0%,
                    rgba(5, 15, 29, 0.04) 48%,
                    rgba(5, 15, 29, 0.12) 100%
                )
            `
        }}
    />

    {/* SOFT BRAND GLOW */}
    <div
        className="absolute z-[3] pointer-events-none rounded-full"
        style={{
            width: "500px",
            height: "500px",
            top: "-220px",
            right: "-100px",
            background: "rgba(44, 100, 161, 0.18)",
            filter: "blur(110px)"
        }}
    />

    {/* HERO CONTENT */}
    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">

        <div className="max-w-4xl mb-10 md:mb-12">

           <div className="mb-7">
    <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] text-white-500">
        Intelligent Emergency Response Ecosystem
    </span>
</div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-display tracking-tight text-white leading-[1.05] mb-6">
                When Every Second Matters,
                <br />
                Every Response Counts.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/90 font-normal leading-relaxed max-w-3xl mb-9">
                EMSTRAP is an AI-powered emergency response ecosystem
                connecting police command centers, hospital networks,
                ambulance fleets, and enterprise facilities through
                one unified, real-time coordination platform.
            </p>

            {/* CTA BUTTONS */}
            <div className="flex flex-wrap items-center gap-4">

                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        openSimulation();
                    }}
                    className="px-8 py-4 rounded-full bg-emergencyRed hover:bg-emergencyRedDark text-white font-bold tracking-wider text-xs uppercase transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 font-display"
                >
                    <span>Explore Platform Demo</span>
                    <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </a>

                <a
                    href="#page-services"
                    className="px-8 py-4 rounded-full border border-white/40 hover:border-white bg-white/10 hover:bg-white/20 text-white font-bold tracking-wider text-xs uppercase transition-all duration-300 inline-flex items-center gap-3 backdrop-blur-md font-display"
                >
                    <span>Explore Services</span>
                    <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </a>

            </div>

            {/* TRUST / CAPABILITY LABELS */}
            <div className="pt-7 mt-8 border-t border-white/25 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-medium text-white/80">
                <span>AI-Powered Response</span>
                <span className="hidden sm:inline text-white/40">|</span>
                <span>Real-Time Coordination</span>
                <span className="hidden sm:inline text-white/40">|</span>
                <span>Connected Emergency Services</span>
            </div>

        </div>

    </div>
</section>


        {/* About Section */}
        <section className="py-24 bg-white text-slate-900 scroll-margin-top relative emstrap-light-section" id="page-about" style={{"backgroundColor":"#FFFFFF","color":"#0F172A"}}>
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* Left Column */}
                    <div className="lg:col-span-6 space-y-6">
                        <div className="flex items-center gap-2">
                            <span className="w-6 h-[2px] bg-slate-900"></span>
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">ABOUT</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-slate-900 tracking-tight leading-[1.12]">
                            Modernising emergency response through technology.
                        </h2>
                        <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                            Emergency situations demand speed, coordination, and accurate decision-making. EMSTRAP is building a unified emergency response ecosystem designed to connect citizens, responders, hospitals, and authorities through intelligent technology.
                        </p>
                        <p className="text-sm text-slate-600 font-normal leading-relaxed">
                            By integrating Artificial Intelligence, real-time communication, GPS tracking, and multi-agency coordination into a single platform, EMSTRAP enables seamless collaboration between public-safety authorities, healthcare networks, ambulance operators, and enterprises.
                        </p>
                        <div className="pt-2">
                            <Link to="/about" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all font-display shadow-sm">
                                <span>Learn More About EMSTRAP</span>
                                <i className="fa-solid fa-arrow-right text-[10px]"></i>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Mission & Vision Cards */}
                    <div className="lg:col-span-6 space-y-6">
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-slate-300">
                            <h3 className="text-xl font-bold font-display text-slate-900 mb-2">Our Mission</h3>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                To build an intelligent emergency response ecosystem that enables faster medical assistance, improves communication between emergency services, and ensures timely care through innovative technology.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-slate-300">
                            <h3 className="text-xl font-bold font-display text-slate-900 mb-2">Our Vision</h3>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                                To become India's leading AI-powered emergency response platform, empowering healthcare providers, emergency responders, government agencies, and enterprises with intelligent solutions that make communities safer and emergency care more accessible.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 1.2 HOW IT WORKS ("From crisis to care", 6 steps) WITH WHITE BACKGROUND & BLACK CONTENT */}
        <section className="py-24 bg-white text-slate-900 scroll-margin-top relative" id="page-how-it-works">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-20 relative z-10 wave-card-node">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] font-mono block mb-3 text-slate-500">HOW IT WORKS</span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-display tracking-tight mb-4 text-slate-900">From crisis to care.</h2>
                    <p className="text-sm md:text-base font-normal leading-relaxed max-w-2xl mx-auto text-slate-600">
                        A connected emergency response flow designed to move information quickly from the moment an emergency occurs to the moment care begins.
                    </p>
                </div>
                
                {/* Horizontal Timeline Container */}
                <div className="relative max-w-6xl mx-auto z-10">
                    {/* Base Track Connecting Line (01 to 06) with Alert-Red to Care-Green Gradient */}
                    <div className="hidden lg:block absolute top-[16px] left-[8.33%] right-[8.33%] h-[3px] z-0 overflow-hidden rounded-full">
                        <div className="w-full h-full bg-slate-200 absolute inset-0"></div>
                        {/* Animated Progress Line connecting 01 to 06 on scroll */}
                        <div id="howItWorksProgressLine" className="h-full bg-gradient-to-r from-[#EF4444] via-[#F59E0B] via-[#3B82F6] to-[#22C55E] absolute left-0 top-0 transition-all duration-150 shadow-[0_0_12px_rgba(59,130,246,0.3)]" style={{"width":"0%"}}></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-4 relative z-10">
                        
                        {/* Step 01 - Alert Red */}
                        <div className="flex flex-col items-center text-center wave-card-node group">
                            <div id="stepBadge0" className="step-badge w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs tracking-wider shadow-sm mb-6 z-10 bg-slate-100 text-slate-900 border-2 border-slate-300 transition-all duration-300 group-hover:scale-110">
                                01
                            </div>
                            <div className="step-icon-circle w-14 h-14 rounded-full bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center mb-6 text-slate-900 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                                <i className="fa-regular fa-bell text-xl text-slate-900"></i>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest mb-1 font-mono text-slate-500">STEP 01</span>
                            <h4 className="text-sm font-bold font-display mb-1 text-slate-900">Emergency Alert</h4>
                            <p className="text-xs leading-relaxed px-1 font-normal text-slate-600">User triggers an emergency alert.</p>
                        </div>

                        {/* Step 02 - Coral Orange */}
                        <div className="flex flex-col items-center text-center wave-card-node group" style={{"animationDelay":"0.1s"}}>
                            <div id="stepBadge1" className="step-badge w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs tracking-wider shadow-sm mb-6 z-10 bg-slate-100 text-slate-900 border-2 border-slate-300 transition-all duration-300 group-hover:scale-110">
                                02
                            </div>
                            <div className="step-icon-circle w-14 h-14 rounded-full bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center mb-6 text-slate-900 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                                <i className="fa-solid fa-camera text-xl text-slate-900"></i>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest mb-1 font-mono text-slate-500">STEP 02</span>
                            <h4 className="text-sm font-bold font-display mb-1 text-slate-900">Capture</h4>
                            <p className="text-xs leading-relaxed px-1 font-normal text-slate-600">Emergency scene information is captured.</p>
                        </div>

                        {/* Step 03 - Warm Amber */}
                        <div className="flex flex-col items-center text-center wave-card-node group" style={{"animationDelay":"0.2s"}}>
                            <div id="stepBadge2" className="step-badge w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs tracking-wider shadow-sm mb-6 z-10 bg-slate-100 text-slate-900 border-2 border-slate-300 transition-all duration-300 group-hover:scale-110">
                                03
                            </div>
                            <div className="step-icon-circle w-14 h-14 rounded-full bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center mb-6 text-slate-900 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                                <i className="fa-solid fa-paper-plane text-xl text-slate-900"></i>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest mb-1 font-mono text-slate-500">STEP 03</span>
                            <h4 className="text-sm font-bold font-display mb-1 text-slate-900">Notification</h4>
                            <p className="text-xs leading-relaxed px-1 font-normal text-slate-600">Relevant responders receive the alert.</p>
                        </div>

                        {/* Step 04 - Brand Blue */}
                        <div className="flex flex-col items-center text-center wave-card-node group" style={{"animationDelay":"0.3s"}}>
                            <div id="stepBadge3" className="step-badge w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs tracking-wider shadow-sm mb-6 z-10 bg-slate-100 text-slate-900 border-2 border-slate-300 transition-all duration-300 group-hover:scale-110">
                                04
                            </div>
                            <div className="step-icon-circle w-14 h-14 rounded-full bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center mb-6 text-slate-900 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                                <i className="fa-solid fa-truck-medical text-xl text-slate-900"></i>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest mb-1 font-mono text-slate-500">STEP 04</span>
                            <h4 className="text-sm font-bold font-display mb-1 text-slate-900">Dispatch</h4>
                            <p className="text-xs leading-relaxed px-1 font-normal text-slate-600">An available ambulance accepts the request.</p>
                        </div>

                        {/* Step 05 - Teal / Cyan */}
                        <div className="flex flex-col items-center text-center wave-card-node group" style={{"animationDelay":"0.4s"}}>
                            <div id="stepBadge4" className="step-badge w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs tracking-wider shadow-sm mb-6 z-10 bg-slate-100 text-slate-900 border-2 border-slate-300 transition-all duration-300 group-hover:scale-110">
                                05
                            </div>
                            <div className="step-icon-circle w-14 h-14 rounded-full bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center mb-6 text-slate-900 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                                <i className="fa-solid fa-location-dot text-xl text-slate-900"></i>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest mb-1 font-mono text-slate-500">STEP 05</span>
                            <h4 className="text-sm font-bold font-display mb-1 text-slate-900">Live Tracking</h4>
                            <p className="text-xs leading-relaxed px-1 font-normal text-slate-600">The ambulance is tracked in real time.</p>
                        </div>

                        {/* Step 06 - Care Green */}
                        <div className="flex flex-col items-center text-center wave-card-node group" style={{"animationDelay":"0.5s"}}>
                            <div id="stepBadge5" className="step-badge w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs tracking-wider shadow-sm mb-6 z-10 bg-slate-100 text-slate-900 border-2 border-slate-300 transition-all duration-300 group-hover:scale-110">
                                06
                            </div>
                            <div className="step-icon-circle w-14 h-14 rounded-full bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center mb-6 text-slate-900 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                                <i className="fa-solid fa-hospital text-xl text-slate-900"></i>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest mb-1 font-mono text-slate-500">STEP 06</span>
                            <h4 className="text-sm font-bold font-display mb-1 text-slate-900">Hospital Care</h4>
                            <p className="text-xs leading-relaxed px-1 font-normal text-slate-600">The hospital prepares for patient arrival.</p>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        {/* 1.3 OUR SERVICES: MU SIGMA STYLE 3D COVERFLOW SHOWCASE (IMG2) */}
        <section className="py-24 bg-white text-slate-900 scroll-margin-top relative overflow-hidden emstrap-light-section" id="page-services" style={{"backgroundColor":"#FFFFFF","color":"#0F172A"}}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
                {/* Header styled like img2 */}
                <div className="text-center max-w-3xl mx-auto">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 block mb-3">OUR SERVICES</span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black font-display text-slate-900 tracking-tight">
                        Platforms That <span className="text-[#C9302C]">Save Lives</span>
                    </h2>
                    <p className="text-sm md:text-base text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto mt-4">
                        From data to decision, we engineer outcomes that accelerate emergency performance across public safety, healthcare, and enterprise sectors.
                    </p>
                </div>
            </div>

            {/* Mu Sigma Style 3D Interactive Carousel Container */}
            <div className="mu-carousel-container" id="muServicesCarousel">
                <div className="mu-carousel-stage" id="muServicesStage">
                    
                    {/* Slide 0: EMSTRAP Connect */}
                    <div className="mu-card active" data-index="0" onClick={() => handleMuCardClick(0)}>
                        <img src="/images/connect.png" alt="EMSTRAP Connect Smart City Operations" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/30"></div>
                        
                        <div className="relative z-10 h-full p-5 sm:p-10 flex flex-col justify-end text-white">
                            
                            <h3 className="text-2xl sm:text-4xl font-black font-display text-white mb-2 tracking-tight">
                                EMSTRAP Connect
                            </h3>
                            <p className="text-xs sm:text-sm text-neutral-200 font-light leading-relaxed max-w-xl mb-4 sm:mb-6">
                                B2G incident-reporting and digital communication bridge connecting citizens, police control rooms, and municipal authorities with location-based duplicate detection.
                            </p>
                            <div className="pt-4 border-t border-white/20 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
                                <div className="flex items-center gap-4 sm:gap-10">
                                    <div>
                                        <span className="text-xl sm:text-3xl font-black font-display text-white block">68%</span>
                                        <span className="text-[11px] sm:text-xs text-neutral-300 font-normal">Reduction in duplicate incident calls</span>
                                    </div>
                                    <div className="border-l border-white/25 pl-4 sm:pl-10">
                                        <span className="text-xl sm:text-3xl font-black font-display text-white block">&lt; 30s</span>
                                        <span className="text-[11px] sm:text-xs text-neutral-300 font-normal">Multi-agency CAD synchronization</span>
                                    </div>
                                </div>
                                <div className="shrink-0">
                                    <Link to="/connect" className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#C9302C] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all font-display shadow-lg hover:scale-105 active:scale-95">
                                        <span>KNOW MORE</span>
                                        <i className="fa-solid fa-chevron-right text-[10px]"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Slide 1: EMSTRAP Ride */}
                    <div className="mu-card next" data-index="1" onClick={() => handleMuCardClick(1)}>
                        <img src="/images/ride-app-mockup.jpg" alt="EMSTRAP Ride Ambulance Booking" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/30"></div>
                        
                        <div className="relative z-10 h-full p-5 sm:p-10 flex flex-col justify-end text-white">
                            
                            <h3 className="text-2xl sm:text-4xl font-black font-display text-white mb-2 tracking-tight">
                                EMSTRAP Ride
                            </h3>
                            <p className="text-xs sm:text-sm text-neutral-200 font-light leading-relaxed max-w-xl mb-4 sm:mb-6">
                                Reliable emergency and non-emergency ambulance booking platform for patients and families with live GPS telemetry, fixed transparent pricing, and direct ER routing.
                            </p>
                            <div className="pt-4 border-t border-white/20 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
                                <div className="flex items-center gap-4 sm:gap-10">
                                    <div>
                                        {/* <span className="text-2xl sm:text-3xl font-black font-display text-white block">&lt;  10min</span> */}
                                        {/* <span className="text-[11px] sm:text-xs text-neutral-300 font-normal">Average emergency dispatch arrival</span> */}
                                    </div>
                                    <div className="border-l border-white/25 pl-4 sm:pl-10">
                                        <span className="text-xl sm:text-3xl font-black font-display text-white block">100%</span>
                                        <span className="text-[11px] sm:text-xs text-neutral-300 font-normal">Real-time GPS tracking &amp; vitals telemetry</span>
                                    </div>
                                </div>
                                <div className="shrink-0">
                                    <Link to="/ride" className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#C9302C] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all font-display shadow-lg hover:scale-105 active:scale-95">
                                        <span>KNOW MORE</span>
                                        <i className="fa-solid fa-chevron-right text-[10px]"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Slide 2: EMSTRAP Shield */}
                    <div className="mu-card hidden-card" data-index="2" onClick={() => handleMuCardClick(2)}>
                        <img src="/images/shield.png" alt="EMSTRAP Shield Corporate Safety" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/30"></div>
                        
                        <div className="relative z-10 h-full p-5 sm:p-10 flex flex-col justify-end text-white">
                            
                            <h3 className="text-2xl sm:text-4xl font-black font-display text-white mb-2 tracking-tight">
                                EMSTRAP Shield
                            </h3>
                            <p className="text-xs sm:text-sm text-neutral-200 font-light leading-relaxed max-w-xl mb-4 sm:mb-6">
                                Complete corporate safety ecosystem with employee SOS, workplace safety inspections, drills, and covered ambulance assistance at ₹0 fee for employees.
                            </p>
                            <div className="pt-4 border-t border-white/20 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
                                <div className="flex items-center gap-4 sm:gap-10">
                                    <div>
                                        <span className="text-xl sm:text-3xl font-black font-display text-white block">₹0 Fee</span>
                                        <span className="text-[11px] sm:text-xs text-neutral-300 font-normal">Covered ambulance assistance for employees</span>
                                    </div>
                                    <div className="border-l border-white/25 pl-4 sm:pl-10">
                                        <span className="text-xl sm:text-3xl font-black font-display text-white block">100%</span>
                                        <span className="text-[11px] sm:text-xs text-neutral-300 font-normal">Workplace compliance &amp; safety drills</span>
                                    </div>
                                </div>
                                <div className="shrink-0">
                                    <Link to="/shield" className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#C9302C] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all font-display shadow-lg hover:scale-105 active:scale-95">
                                        <span>KNOW MORE</span>
                                        <i className="fa-solid fa-chevron-right text-[10px]"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Slide 3: EMSTRAP Command */}
                    <div className="mu-card prev" data-index="3" onClick={() => handleMuCardClick(3)}>
                        <img src="/images/hospital-er-operations.png" alt="EMSTRAP Command ER Operations" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/30"></div>
                        
                        <div className="relative z-10 h-full p-5 sm:p-10 flex flex-col justify-end text-white">
                            
                            <h3 className="text-2xl sm:text-4xl font-black font-display text-white mb-2 tracking-tight">
                                EMSTRAP Command
                            </h3>
                            <p className="text-xs sm:text-sm text-neutral-200 font-light leading-relaxed max-w-xl mb-4 sm:mb-6">
                                Central operations platform for ambulance operators and hospital emergency rooms to manage fleet availability, trip dispatches, and pre-arrival ER patient vitals.
                            </p>
                            <div className="pt-4 border-t border-white/20 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
                                <div className="flex items-center gap-4 sm:gap-10">
                                    <div>
                                        <span className="text-xl sm:text-3xl font-black font-display text-white block">99.9%</span>
                                        <span className="text-[11px] sm:text-xs text-neutral-300 font-normal">CAD fleet dispatch reliability</span>
                                    </div>
                                    <div className="border-l border-white/25 pl-4 sm:pl-10">
                                        <span className="text-xl sm:text-3xl font-black font-display text-white block">Pre-Arrival</span>
                                        <span className="text-[11px] sm:text-xs text-neutral-300 font-normal">Direct trauma ER telemetry triage</span>
                                    </div>
                                </div>
                                <div className="shrink-0">
                                    <Link to="/command" className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#C9302C] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all font-display shadow-lg hover:scale-105 active:scale-95">
                                        <span>KNOW MORE</span>
                                        <i className="fa-solid fa-chevron-right text-[10px]"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Navigation Arrow Buttons Positioned at Card Borders like img2 */}
                <button onClick={prevMuSlide} className="mu-nav-btn prev-btn" aria-label="Previous service slide">
                    <i className="fa-solid fa-chevron-left text-xs"></i>
                </button>
                <button onClick={nextMuSlide} className="mu-nav-btn next-btn" aria-label="Next service slide">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                </button>

                {/* Indicator Dots */}
                <div className="flex items-center justify-center gap-2 mt-6" id="muDotsContainer">
                    <button onClick={() => setMuSlide(0)} className="w-8 h-2 rounded-full bg-slate-900 transition-all cursor-pointer" aria-label="Slide 1"></button>
                    <button onClick={() => setMuSlide(1)} className="w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400 transition-all cursor-pointer" aria-label="Slide 2"></button>
                    <button onClick={() => setMuSlide(2)} className="w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400 transition-all cursor-pointer" aria-label="Slide 3"></button>
                    <button onClick={() => setMuSlide(3)} className="w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400 transition-all cursor-pointer" aria-label="Slide 4"></button>
                </div>
            </div>
        </section>

        {/* 1.4 WHO WE SERVE: REDESIGNED WITH IMG1 CARD DESIGN (PILL BADGE, PHOTO, SUBTITLE, CATEGORY) */}
        <section className="py-24 bg-white text-slate-900 scroll-margin-top relative overflow-hidden emstrap-light-section" id="page-who-we-serve" style={{"backgroundColor":"#FFFFFF","color":"#0F172A"}}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
                <div className="text-center max-w-3xl mx-auto">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500 font-mono block mb-3">WHO WE SERVE</span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black font-display tracking-tight text-[#0A1128]">
                        Solutions That Save Lives
                    </h2>
                    <p className="text-sm md:text-base text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto mt-4">
                        From data to decision, we engineer outcomes that accelerate emergency performance across public safety, healthcare, and enterprise sectors.
                    </p>
                </div>
            </div>

            {/* Continuous Moving Content Belt Viewport with img1 Card Design */}
            <div className="content-belt-container w-full py-4">
                <div className="content-belt-track" id="whoWeServeBeltTrack">
                    {/* 1. Corporate Companies -> corporate-companies.html */}
                    <div className="who-card-source bg-white rounded-[22px] border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group w-[280px] sm:w-[320px] md:w-[350px] shrink-0 overflow-hidden">
                        <div>
                            <div className="w-full h-48 overflow-hidden relative bg-slate-100">
                                <img src="/images/home-corporate.jpg" alt="Corporate Workplace Campus Safety" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold font-display text-slate-900 mb-1 group-hover:text-brandBlue transition-colors">Corporate Companies</h3>
                                <span className="text-xs font-medium text-slate-500 block mb-3 font-mono">Employee SOS &amp; Facility Muster</span>
                                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                    Enterprise workplace safety sentry, employee SOS triggers, automated incident escalation, and multi-facility emergency muster systems.
                                </p>
                            </div>
                        </div>
                        <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                            <Link to="/corporate-companies" className="text-xs font-bold text-brandBlue flex items-center gap-1.5 group-hover:underline">
                                <span>Explore Solutions</span>
                                <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
                            </Link>
                            <span className="text-[11px] font-mono text-slate-400">Corporate B2B</span>
                        </div>
                    </div>

                    {/* 2. Smart Cities -> smart-cities.html */}
                    <div className="who-card-source bg-white rounded-[22px] border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group w-[280px] sm:w-[320px] md:w-[350px] shrink-0 overflow-hidden">
                        <div>
                            <div className="w-full h-48 overflow-hidden relative bg-slate-100">
                                <img src="/images/home-smart-cities.jpg" alt="Smart Cities Emergency Network" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold font-display text-slate-900 mb-1 group-hover:text-brandBlue transition-colors">Smart Cities</h3>
                                <span className="text-xs font-medium text-slate-500 block mb-3 font-mono">Connected Urban Emergency Corridors</span>
                                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                    Adaptive traffic preemption, connected sensor networks, and real-time municipal emergency routing across urban centers.
                                </p>
                            </div>
                        </div>
                        <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                            <Link to="/smart-cities" className="text-xs font-bold text-brandBlue flex items-center gap-1.5 group-hover:underline">
                                <span>Explore Solutions</span>
                                <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
                            </Link>
                            <span className="text-[11px] font-mono text-slate-400">Urban IoT</span>
                        </div>
                    </div>

                    {/* 3. Government Agencies -> government-agencies.html */}
                    <div className="who-card-source bg-white rounded-[22px] border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group w-[280px] sm:w-[320px] md:w-[350px] shrink-0 overflow-hidden">
                        <div>
                            <div className="w-full h-48 overflow-hidden relative bg-slate-100">
                                <img src="/images/home-government.jpg" alt="Government Disaster Command Center" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold font-display text-slate-900 mb-1 group-hover:text-brandBlue transition-colors">Government Agencies</h3>
                                <span className="text-xs font-medium text-slate-500 block mb-3 font-mono">Disaster Command &amp; City Resilience</span>
                                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                    Unified municipal disaster response, public safety compliance logging, and regional emergency data infrastructure across civil administration.
                                </p>
                            </div>
                        </div>
                        <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                            <Link to="/government-agencies" className="text-xs font-bold text-brandBlue flex items-center gap-1.5 group-hover:underline">
                                <span>Explore Solutions</span>
                                <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
                            </Link>
                            <span className="text-[11px] font-mono text-slate-400">Smart Governance</span>
                        </div>
                    </div>

                    {/* 4. Ambulance Providers -> ambulance-providers.html */}
                    <div className="who-card-source bg-white rounded-[22px] border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group w-[280px] sm:w-[320px] md:w-[350px] shrink-0 overflow-hidden">
                        <div>
                            <div className="w-full h-48 overflow-hidden relative bg-slate-100">
                                <img src="/images/home-ambulance.jpg" alt="Emergency Medical Fleets" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold font-display text-slate-900 mb-1 group-hover:text-brandBlue transition-colors">Ambulance Providers</h3>
                                <span className="text-xs font-medium text-slate-500 block mb-3 font-mono">Fleet GPS &amp; Dynamic CAD Dispatch</span>
                                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                    Fleet GPS tracking, intelligent automated dispatch matching, real-time hospital route optimization, and live telemetry handoff.
                                </p>
                            </div>
                        </div>
                        <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                            <Link to="/ambulance-providers" className="text-xs font-bold text-brandBlue flex items-center gap-1.5 group-hover:underline">
                                <span>Explore Solutions</span>
                                <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
                            </Link>
                            <span className="text-[11px] font-mono text-slate-400">Emergency Fleets</span>
                        </div>
                    </div>

                    {/* 5. Traffic Management -> traffic-management.html */}
                    <div className="who-card-source bg-white rounded-[22px] border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group w-[280px] sm:w-[320px] md:w-[350px] shrink-0 overflow-hidden">
                        <div>
                            <div className="w-full h-48 overflow-hidden relative bg-slate-100">
                                <img src="/images/home-traffic.jpg" alt="Traffic Management Center" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold font-display text-slate-900 mb-1 group-hover:text-brandBlue transition-colors">Traffic Management</h3>
                                <span className="text-xs font-medium text-slate-500 block mb-3 font-mono">Green Corridors &amp; Signal Preemption</span>
                                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                    Automated green corridor traffic signal preemption to clear congested city arteries dynamically for incoming emergency vehicles.
                                </p>
                            </div>
                        </div>
                        <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                            <Link to="/traffic-management" className="text-xs font-bold text-brandBlue flex items-center gap-1.5 group-hover:underline">
                                <span>Explore Solutions</span>
                                <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
                            </Link>
                            <span className="text-[11px] font-mono text-slate-400">Traffic &amp; Transit</span>
                        </div>
                    </div>

                    {/* 6. Police Departments -> police-departments.html */}
                    <div className="who-card-source bg-white rounded-[22px] border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group w-[280px] sm:w-[320px] md:w-[350px] shrink-0 overflow-hidden">
                        <div>
                            <div className="w-full h-48 overflow-hidden relative bg-slate-100">
                                <img src="/images/home-police.jpg" alt="Police Command CAD" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold font-display text-slate-900 mb-1 group-hover:text-brandBlue transition-colors">Police Departments</h3>
                                <span className="text-xs font-medium text-slate-500 block mb-3 font-mono">Geospatial Mapping &amp; Transit Escort</span>
                                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                    Law enforcement CAD integration, automated emergency transit escort notification, and dynamic geospatial crime and trauma incident mapping.
                                </p>
                            </div>
                        </div>
                        <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                            <Link to="/police-departments" className="text-xs font-bold text-brandBlue flex items-center gap-1.5 group-hover:underline">
                                <span>Explore Solutions</span>
                                <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
                            </Link>
                            <span className="text-[11px] font-mono text-slate-400">Law Enforcement</span>
                        </div>
                    </div>

                    {/* 7. Hospitals & Clinics -> hospitals-and-clinics.html */}
                    <div className="who-card-source bg-white rounded-[22px] border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group w-[280px] sm:w-[320px] md:w-[350px] shrink-0 overflow-hidden">
                        <div>
                            <div className="w-full h-48 overflow-hidden relative bg-slate-100">
                                <img src="/images/hospital.jpg" alt="Hospitals &amp; Healthcare Facilities" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold font-display text-slate-900 mb-1 group-hover:text-brandBlue transition-colors">Hospitals &amp; Clinics</h3>
                                <span className="text-xs font-medium text-slate-500 block mb-3 font-mono">Pre-Arrival Telemetry &amp; Bed Prep</span>
                                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                    Pre-arrival trauma ER patient telemetry, automated trauma bed allocation, and direct physician triage preparation before patient arrival.
                                </p>
                            </div>
                        </div>
                        <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                            <Link to="/hospitals-and-clinics" className="text-xs font-bold text-brandBlue flex items-center gap-1.5 group-hover:underline">
                                <span>Explore Solutions</span>
                                <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
                            </Link>
                            <span className="text-[11px] font-mono text-slate-400">Healthcare ER</span>
                        </div>
                    </div>

                    {/* 8. Educational Campuses -> shield.html */}
                    <div className="who-card-source bg-white rounded-[22px] border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group w-[280px] sm:w-[320px] md:w-[350px] shrink-0 overflow-hidden">
                        <div>
                            <div className="w-full h-48 overflow-hidden relative bg-slate-100">
                                <img src="/images/shield-campus.jpg" alt="Educational Campus Safety" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold font-display text-slate-900 mb-1 group-hover:text-brandBlue transition-colors">Educational Campuses</h3>
                                <span className="text-xs font-medium text-slate-500 block mb-3 font-mono">Student Safety &amp; Medical Transit</span>
                                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                    Campus-wide emergency beacon triggers, student medical transit coordination, and direct synchronized dispatch with nearby trauma hospitals.
                                </p>
                            </div>
                        </div>
                        <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                            <Link to="/educational-campuses" className="text-xs font-bold text-brandBlue flex items-center gap-1.5 group-hover:underline">
                                <span>Explore Solutions</span>
                                <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
                            </Link>
                            <span className="text-[11px] font-mono text-slate-400">Higher Ed &amp; Schools</span>
                        </div>
                    </div>

                    {/* 9. Industrial & Manufacturing -> shield.html */}
                    <div className="who-card-source bg-white rounded-[22px] border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group w-[280px] sm:w-[320px] md:w-[350px] shrink-0 overflow-hidden">
                        <div>
                            <div className="w-full h-48 overflow-hidden relative bg-slate-100">
                                <img src="/images/shield-manufacturing.png" alt="Industrial Manufacturing Safety" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold font-display text-slate-900 mb-1 group-hover:text-amber-800 transition-colors">Industrial &amp; Manufacturing</h3>
                                <span className="text-xs font-medium text-slate-500 block mb-3 font-mono">Hazmat &amp; Industrial Trauma Triage</span>
                                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                    Factory floor automated trauma escalation, hazmat incident protocol synchronization, and rapid industrial emergency response routing.
                                </p>
                            </div>
                        </div>
                        <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                            <Link to="/corporate-companies" className="text-xs font-bold text-amber-800 flex items-center gap-1.5 group-hover:underline">
                                <span>Explore Solutions</span>
                                <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
                            </Link>
                            <span className="text-[11px] font-mono text-slate-400">Industrial Plants</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* 1.5 CONTACT SECTION (home) & 1.6 CONTACT: PURE WHITE BACKGROUND & PLAIN DARK TEXT */}
        <section className="py-24 scroll-margin-top bg-white text-slate-900 emstrap-light-section" id="page-contact" style={{"backgroundColor":"#FFFFFF","color":"#0F172A"}}>
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-wider font-mono text-slate-500 block mb-2">GET IN TOUCH</span>
                    <h2 className="text-3xl md:text-5xl font-black font-display text-slate-900">Contact Us</h2>
                    <p className="text-base text-slate-600 mt-2 font-normal">Connect with our corporate team for partnerships, enterprise solutions, and investment inquiries.</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Contact Info Column */}
                    <div className="lg:col-span-5 space-y-8 wave-card-node">
                        <div className="bg-white p-8 border border-slate-200 shadow-sm rounded-2xl">
                            <h3 className="text-lg font-bold font-display text-slate-900 mb-4">Contact Details</h3>
                            <div className="space-y-4 text-sm text-slate-600 font-normal">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-800 shrink-0 shadow-sm">
                                        <i className="fa-solid fa-envelope"></i>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Email Address</p>
                                        <a href="mailto:contact@emstrap.com" className="text-slate-900 hover:text-slate-700 font-semibold underline transition-all">contact@emstrap.com</a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-800 shrink-0 shadow-sm">
                                        <i className="fa-solid fa-phone"></i>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Phone Number</p>
                                        <a href="tel:9880882476" className="text-slate-900 hover:text-slate-700 font-semibold underline transition-all">9880882476</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white p-8 border border-slate-200 shadow-sm rounded-2xl">
                            <h3 className="text-lg font-bold font-display text-slate-900 mb-3">Professional Networks</h3>
                            <p className="text-xs text-slate-600 font-normal mb-4">Follow us on LinkedIn to track partnership events and career updates.</p>
                            <div className="flex items-center gap-3">
                                <a href="https://www.linkedin.com/company/emstrap/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white hover:bg-slate-900 hover:text-white border border-slate-200 flex items-center justify-center text-slate-700 transition-all duration-200 shadow-sm" title="LinkedIn" aria-label="Official EMSTRAP LinkedIn">
                                    <i className="fa-brands fa-linkedin-in text-sm"></i>
                                </a>
                                <a href="https://www.instagram.com/emstrap_official?stkn=bjN6eXU2cHc5cHJ4" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white hover:bg-slate-900 hover:text-white border border-slate-200 flex items-center justify-center text-slate-700 transition-all duration-200 shadow-sm" title="Instagram" aria-label="Official EMSTRAP Instagram">
                                    <i className="fa-brands fa-instagram text-sm"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    {/* Contact Form Column */}
                    <div className="lg:col-span-7 bg-white p-8 md:p-10 border border-slate-200 shadow-sm rounded-2xl wave-card-node">
                        <h3 className="text-xl font-bold font-display text-slate-900 mb-6">Send a Corporate Message</h3>
                        <form id="contactForm" onSubmit={handleFormSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-2 font-mono">Full Name</label>
                                    <input className="w-full bg-white border border-slate-300 focus:border-slate-800 focus:bg-white focus:outline-none rounded-xl px-4 py-3 text-sm text-slate-900 transition-all shadow-sm" placeholder="Enter your full name" required type="text" id="fullName" name="fullName" />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-2 font-mono">Organization</label>
                                    <input className="w-full bg-white border border-slate-300 focus:border-slate-800 focus:bg-white focus:outline-none rounded-xl px-4 py-3 text-sm text-slate-900 transition-all shadow-sm" placeholder="Enter your organization" required type="text" id="organization" name="organization" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-2 font-mono">Email Address</label>
                                    <input className="w-full bg-white border border-slate-300 focus:border-slate-800 focus:bg-white focus:outline-none rounded-xl px-4 py-3 text-sm text-slate-900 transition-all shadow-sm" placeholder="Enter your email" required type="email" id="email" name="email" />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-2 font-mono">Phone Number</label>
                                    <input className="w-full bg-white border border-slate-300 focus:border-slate-800 focus:bg-white focus:outline-none rounded-xl px-4 py-3 text-sm text-slate-900 transition-all shadow-sm" placeholder="Enter your phone number" required type="tel" id="phone" name="phone" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-2 font-mono">Your Message</label>
                                <textarea className="w-full bg-white border border-slate-300 focus:border-slate-800 focus:bg-white focus:outline-none rounded-xl px-4 py-3 text-sm text-slate-900 transition-all shadow-sm" placeholder="How can EMSTRAP technology support your emergency initiatives?" required rows={4} id="message" name="message"></textarea>
                            </div>
                            <button id="submitBtn" className="w-full py-4 mt-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold tracking-wider text-xs uppercase transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer font-display" type="submit">
                                <span>Send Message</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>  
    </main>

    {/* Persistent Global Footer */}
    <footer className="relative z-10 bg-[#050B14] border-t border-white/5 py-16 px-6 md:px-12 mt-0" id="mainFooter">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* Brand Column */}
            <div className="lg:col-span-3">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-15 h-15 rounded-lg bg-white/5 p-0.5 flex items-center justify-center">
                        <img src="/images/logo1.jpeg" alt="EMSTRAP Logo" className="max-w-full max-h-full object-contain" />
                    </div>
                    <span className="text-xl font-bold font-display tracking-wider text-white">EMSTRAP Pvt Ltd</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-6 font-light">
                    Transforming emergency response through smart technology and real-time coordination. Saving lives, one second at a time.
                </p>
                <div className="flex items-center space-x-3 mb-6">
                    <a href="https://www.linkedin.com/company/emstrap/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-600 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-200" title="LinkedIn" aria-label="Official EMSTRAP LinkedIn">
                        <i className="fa-brands fa-linkedin-in text-sm"></i>
                    </a>
                    <a href="https://www.instagram.com/emstrap_official?stkn=bjN6eXU2cHc5cHJ4" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-600 flex items-center justify-center text-neutral-400 hover:text-white transition-all duration-200" title="Instagram" aria-label="Official EMSTRAP Instagram">
                        <i className="fa-brands fa-instagram text-sm"></i>
                    </a>
                </div>
            </div>

            {/* Quick Links Column */}
            <div className="lg:col-span-2">
                <h4 className="text-xs font-bold font-display uppercase tracking-widest text-white mb-5">Quick Links</h4>
                <ul className="space-y-2.5 text-sm text-gray-400 font-light">
                    <li><a className="hover:text-brandBlue transition-all" href="#page-about">About</a></li>
                    <li><a className="hover:text-brandBlue transition-all" href="#page-services">Services</a></li>
                    <li><Link to="/careers" className="hover:text-brandBlue transition-all" target="_blank" rel="noopener noreferrer">Careers</Link></li>
                    <li><a className="hover:text-brandBlue transition-all" href="#page-contact">Contact</a></li>
                </ul>
            </div>

            {/* Solutions Column */}
            <div className="lg:col-span-2">
                <h4 className="text-xs font-bold font-display uppercase tracking-widest text-white mb-5">Solutions</h4>
                <ul className="space-y-2 text-xs text-gray-400 font-light">
                    <li><Link to="/corporate-companies" className="hover:text-brandBlue transition-all">Corporate Companies</Link></li>
                    <li><Link to="/hospitals-and-clinics" className="hover:text-brandBlue transition-all">Hospitals & Clinics</Link></li>
                    <li><Link to="/educational-campuses" className="hover:text-brandBlue transition-all">Educational Campuses</Link></li>
                    <li><Link to="/smart-cities" className="hover:text-brandBlue transition-all">Smart Cities</Link></li>
                    <li><Link to="/government-agencies" className="hover:text-brandBlue transition-all">Government Agencies</Link></li>
                    <li><Link to="/ambulance-providers" className="hover:text-brandBlue transition-all">Ambulance Providers</Link></li>
                    <li><Link to="/traffic-management" className="hover:text-brandBlue transition-all">Traffic Management</Link></li>
                    <li><Link to="/police-departments" className="hover:text-brandBlue transition-all">Police Departments</Link></li>
                </ul>
            </div>

            {/* Contact Details Column */}
            <div className="lg:col-span-2">
                <h4 className="text-xs font-bold font-display uppercase tracking-widest text-white mb-5">Contact Details</h4>
                <ul className="space-y-4 text-sm text-gray-400 font-light">
                    <li className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Email Address</span>
                        <a href="mailto:contact@emstrap.com" className="hover:text-brandBlue transition-all text-white font-medium mt-0.5">contact@emstrap.com</a>
                    </li>
                    <li className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Phone Number</span>
                        <a href="tel:9880882476" className="hover:text-brandBlue transition-all text-white font-medium mt-0.5">+91 9880882476</a>
                    </li>
                </ul>
            </div>

            {/* Legal & Corporate Materials Column */}
            <div className="lg:col-span-3 space-y-6">
                <div>
                    <h4 className="text-xs font-bold font-display uppercase tracking-widest text-white mb-4">Legal</h4>
                    <ul className="flex flex-wrap gap-4 text-xs text-gray-400 font-light">
                        <li><a className="hover:text-brandBlue transition-all" href="/privacy-policy.pdf" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
                        <li><span className="text-slate-600">&bull;</span></li>
                        <li><a className="hover:text-brandBlue transition-all cursor-pointer" href="#legal-terms" onClick={(e) => { e.preventDefault(); showEmstrapAlert("EMSTRAP Terms & Conditions govern platform access, emergency dispatch coordination, and enterprise SLAs. For enterprise agreement terms, contact contact@emstrap.com."); }}>Terms &amp; Conditions</a></li>
                    </ul>
                </div>

                {/* Corporate Materials */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                    <h4 className="text-xs font-bold font-mono uppercase tracking-widest text-brandBlue">CORPORATE MATERIALS</h4>
                    <ul className="space-y-2.5 text-xs text-slate-400">
                        <li>
                            <a href="/company-profile.pdf" download className="hover:text-brandBlue text-slate-300 hover:text-white transition-all inline-flex items-center gap-2">
                                <i className="fa-solid fa-download text-brandBlue text-xs"></i>
                                <span>Company Profile</span>

                            </a>
                        </li>
                        <li>
                            <a href="/product-brochure.pdf" download className="hover:text-brandBlue text-slate-300 hover:text-white transition-all inline-flex items-center gap-2">
                                <i className="fa-solid fa-download text-brandBlue text-xs"></i>
                                <span>Service Profile</span>

                            </a>
                        </li>
                        <li>
                            <a href="/government-proposal.pdf" download className="hover:text-brandBlue text-slate-300 hover:text-white transition-all inline-flex items-center gap-2">
                                <i className="fa-solid fa-download text-brandBlue text-xs"></i>
                                <span>Investors &amp; Government Stack</span>

                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
            <span className="uppercase tracking-wider">&copy; 2026 EMSTRAP Pvt Ltd. All rights reserved.</span>
            <a href="#page-landing" className="mt-4 md:mt-0 font-bold font-display tracking-wider text-brandBlue hover:text-white transition-all">EMSTRAP</a>
        </div>
    </footer>

    {/* Logo Lightbox Modal */}
    <div id="logoLightbox" className="hidden fixed inset-0 z-[200] items-center justify-center bg-black/90 backdrop-blur-md cursor-pointer" onClick={closeLogoLightbox}>
        <div className="relative flex flex-col items-center gap-5 animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <img src="/images/logo.png" alt="EMSTRAP Logo" className="max-w-[70vw] max-h-[70vh] object-contain drop-shadow-2xl" />
            <p className="text-xs text-slate-500 tracking-widest uppercase">Click outside to close</p>
            <button onClick={closeLogoLightbox} className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all cursor-pointer">
                <i className="fa-solid fa-xmark text-sm"></i>
            </button>
        </div>
    </div>

    {/* Success Modal */}
    <div className="hidden fixed inset-0 z-50 items-center justify-center p-6 bg-black/80 backdrop-blur-md" id="successModal" onClick={(e) => { if (e.target === e.currentTarget) closeSuccessModal(); }}>
        <div className="glass-panel p-8 rounded-3xl max-w-md w-full border border-brandBlue/30 text-center animate-scale-in" style={{"boxShadow":"0 0 40px rgba(0,82,255,0.15)"}}>
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-5 text-emerald-400 text-2xl">
                <i className="fa-solid fa-check"></i>
            </div>
            <h3 className="text-2xl font-bold font-display text-white mb-3">Email Sent!</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-7 font-light">
                Your message has been sent. Our team will review your enquiry and get back to you shortly.
            </p>
            <button className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer" onClick={closeSuccessModal}>
                <i className="fa-solid fa-xmark"></i> Close
            </button>
        </div>
    </div>

    {/* Interactive Simulation Modal (Demo Simulation) */}
    <div id="simModal" className="hidden fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-sm items-center justify-center p-4 overflow-y-auto" onClick={(e) => { if (e.target === e.currentTarget) closeSimulation(); }}>
      <div className="w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-in">
        <header className="p-4 sm:p-6 border-b border-slate-800 flex justify-between items-start sm:items-center gap-3 bg-slate-900/50">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
            <span className="text-xl sm:text-2xl text-red-500 shrink-0"><i className="fa-solid fa-triangle-exclamation"></i></span>
            <h2 className="text-base sm:text-xl font-bold text-slate-100 font-display leading-snug">EMSTRAP – Emergency Response Visual Simulation</h2>
            <span className="text-[11px] sm:text-xs px-2 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full font-mono whitespace-nowrap">Demo • No real data</span>
          </div>
          <button onClick={closeSimulation} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors cursor-pointer shrink-0" aria-label="Close simulation">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid lg:grid-cols-[350px_1fr] gap-4 sm:gap-6">
          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-brandBlue/15 to-blue-600/5 border border-brandBlue/30 rounded-2xl p-5 shadow-[0_0_15px_rgba(0,82,255,0.05)]">
              <h3 className="text-slate-100 font-bold mb-1.5 flex items-center gap-2 font-display text-sm"><span className="text-brandBlue">[ACTIVE] </span> Real Working Platform</h3>
              <p className="text-slate-400 text-[11px] leading-relaxed mb-4">Watch EMSTRAP's real-time emergency dispatch and preemption platform in action.</p>
              <button onClick={playDemoVideo} className="w-full py-2.5 bg-gradient-to-r from-brandBlue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-bold hover:shadow-glow-blue transition-all flex items-center justify-center gap-2 text-xs font-display cursor-pointer">
                <i className="fa-solid fa-circle-play text-xs"></i> Real Working Demo
              </button>
            </div>
            <section className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5">
              <h3 className="text-slate-100 font-bold mb-2">1) Demo Simulation</h3>
              <p className="text-slate-400 text-xs mb-4">Select an option to start the simulation.</p>
              <div id="simInitialSection" className="grid grid-cols-2 gap-3 mb-4">
                <button onClick={() => simHandleAlert("emergency")} className="py-3 px-4 bg-[#E53935] hover:bg-[#D32F2F] text-white rounded-xl font-bold transition-all shadow-lg shadow-[#E53935]/20 flex items-center justify-center gap-2 text-xs font-display cursor-pointer">
                  <span><i className="fa-solid fa-triangle-exclamation"></i></span> Emergency
                </button>
                <button onClick={openBookingSection} className="py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-xs font-display cursor-pointer">
                  <span><i className="fa-regular fa-calendar"></i></span> Booking
                </button>
              </div>

              {/* Emergency Camera Section */}
              <div id="simCameraSection" className="hidden space-y-4 animate-in fade-in slide-in-from-top-2">
                <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
                  <video id="simVideo" autoPlay playsInline muted className="w-full h-full object-cover"></video>
                  <canvas id="simCanvas" className="absolute inset-0 w-full h-full object-cover hidden"></canvas>
                </div>
                <div className="flex gap-2">
                  <button onClick={simCaptureImage} className="flex-1 py-2 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-all cursor-pointer"><i className="fa-solid fa-camera"></i> Capture</button>
                  <button onClick={simUseSampleImage} className="flex-1 py-2 bg-slate-700 text-white rounded-xl font-bold text-sm hover:bg-slate-600 transition-all cursor-pointer"><i className="fa-solid fa-image"></i> Sample</button>
                </div>
                <button id="simSendBtn" onClick={simSendAlert} disabled className="w-full py-3 bg-blue-600 disabled:bg-slate-700 text-white rounded-xl font-bold hover:bg-blue-700 transition-all cursor-pointer">[TRANSMIT]  Send Alert</button>
              </div>

              {/* Booking Section */}
              <div id="simBookingSection" className="hidden space-y-4 animate-in fade-in slide-in-from-top-2">
                {/* Step 1: Pickup & Drop */}
                <div id="bookStep1" className="space-y-4">
                  <div className="relative">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">Pickup Location</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs"><i className="fa-solid fa-location-dot"></i></span>
                      <input id="bookPickup" className="w-full bg-slate-950 border border-slate-800 focus:border-brandBlue focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-xs text-white transition-all font-light" defaultValue="Majestic Bus Station, Bengaluru" placeholder="Search pickup address..." type="text" autoComplete="off" onInput={() => showSuggestions("bookPickup", "pickupSuggestions")} onBlur={() => hideSuggestions("pickupSuggestions")} />
                    </div>
                    <div id="pickupSuggestions" className="hidden absolute left-0 right-0 mt-1 bg-slate-950 border border-slate-800 rounded-xl max-h-48 overflow-y-auto z-50 shadow-2xl"></div>
                  </div>
                  <div className="relative">
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">Drop Location</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs"><i className="fa-solid fa-flag-checkered"></i></span>
                      <input id="bookDrop" className="w-full bg-slate-950 border border-slate-800 focus:border-brandBlue focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-xs text-white transition-all font-light" defaultValue="Fortis Hospital, Bannerghatta Road" placeholder="Search drop address..." type="text" autoComplete="off" onInput={() => showSuggestions("bookDrop", "dropSuggestions")} onBlur={() => hideSuggestions("dropSuggestions")} />
                    </div>
                    <div id="dropSuggestions" className="hidden absolute left-0 right-0 mt-1 bg-slate-950 border border-slate-800 rounded-xl max-h-48 overflow-y-auto z-50 shadow-2xl"></div>
                  </div>
                  <button onClick={bookGoToStep2} className="w-full py-3 rounded-xl bg-gradient-to-r from-brandBlue to-blue-700 hover:shadow-glow-blue text-white font-bold tracking-wide transition-all flex items-center justify-center text-xs font-display cursor-pointer">
                    Next: Select Ambulance
                  </button>
                </div>

                {/* Step 2: Ambulance Type */}
                <div id="bookStep2" className="hidden space-y-4">
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">Select Ambulance Type</label>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between p-3 rounded-xl border border-white/10 hover:border-brandBlue/50 cursor-pointer bg-slate-950/40">
                      <span className="flex items-center gap-2">
                        <input type="radio" name="ambType" defaultValue="basic" defaultChecked onClick={() => bookSetType("basic", 1000)} />
                        <span className="text-xs font-medium text-slate-300">Basic Support (BLS)</span>
                      </span>
                      <span className="text-xs font-bold text-brandBlue">₹1,000</span>
                    </label>
                    <label className="flex items-center justify-between p-3 rounded-xl border border-white/10 hover:border-brandBlue/50 cursor-pointer bg-slate-950/40">
                      <span className="flex items-center gap-2">
                        <input type="radio" name="ambType" defaultValue="oxygen" onClick={() => bookSetType("oxygen", 1500)} />
                        <span className="text-xs font-medium text-slate-300">Oxygen Support</span>
                      </span>
                      <span className="text-xs font-bold text-brandBlue">₹1,500</span>
                    </label>
                    <label className="flex items-center justify-between p-3 rounded-xl border border-white/10 hover:border-brandBlue/50 cursor-pointer bg-slate-950/40">
                      <span className="flex items-center gap-2">
                        <input type="radio" name="ambType" defaultValue="pregnancy" onClick={() => bookSetType("pregnancy", 2000)} />
                        <span className="text-xs font-medium text-slate-300">Pregnancy Support</span>
                      </span>
                      <span className="text-xs font-bold text-brandBlue">₹2,000</span>
                    </label>
                    <label className="flex items-center justify-between p-3 rounded-xl border border-white/10 hover:border-brandBlue/50 cursor-pointer bg-slate-950/40">
                      <span className="flex items-center gap-2">
                        <input type="radio" name="ambType" defaultValue="icu" onClick={() => bookSetType("icu", 3500)} />
                        <span className="text-xs font-medium text-slate-300">ICU / Advanced (ALS)</span>
                      </span>
                      <span className="text-xs font-bold text-brandBlue">₹3,500</span>
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => bookGoToStep(1)} className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all text-center text-xs cursor-pointer">Back</button>
                    <button onClick={bookGoToStep3} className="flex-1 py-2.5 bg-gradient-to-r from-brandBlue to-blue-700 hover:shadow-glow-blue text-white font-bold transition-all text-center text-xs cursor-pointer">Next</button>
                  </div>
                </div>

                {/* Step 3: Payment Summary */}
                <div id="bookStep3" className="hidden space-y-4">
                  <div className="p-4 bg-slate-950/80 rounded-xl border border-white/5 space-y-2 text-xs text-slate-300 font-light">
                    <div><span className="text-slate-500">From:</span> <span id="summaryPickup" className="font-semibold text-white"></span></div>
                    <div><span className="text-slate-500">To:</span> <span id="summaryDrop" className="font-semibold text-white"></span></div>
                    <div><span className="text-slate-500">Type:</span> <span id="summaryType" className="font-semibold text-white"></span></div>
                    <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-sm text-white">
                      <span>Total Cost:</span>
                      <span id="summaryPrice" className="text-brandBlue"></span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => bookGoToStep(2)} className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all text-xs cursor-pointer">Back</button>
                    <button onClick={bookCompleteBooking} className="flex-1 py-2.5 bg-gradient-to-r from-green-600 to-emerald-700 hover:shadow-glow-green text-white font-bold transition-all flex items-center justify-center space-x-2 text-xs font-display cursor-pointer">
                      <span><i className="fa-regular fa-credit-card"></i></span> <span>Pay &amp; Book</span>
                    </button>
                  </div>
                </div>

                {/* Step 4: Success Screen */}
                <div id="bookStep4" className="hidden text-center space-y-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/40 flex items-center justify-center mx-auto animate-pulse">
                    <i className="fa-solid fa-circle-check text-xl text-green-400"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-display">Driver Booked!</h3>
                    <p className="text-[10px] text-slate-400">Your ambulance is dispatched</p>
                  </div>
                  <div className="p-4 bg-slate-950/80 rounded-xl border border-white/5 text-left text-xs space-y-1.5 text-slate-300 font-light">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Driver:</span>
                      <span className="font-semibold text-white">Ramesh Kumar</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Contact:</span>
                      <span className="font-semibold text-white">+91 98765 43210</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Vehicle:</span>
                      <span className="font-semibold text-white">KA 03 AA 4829</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">ETA:</span>
                      <span className="font-semibold text-green-400 font-mono">5 Mins</span>
                    </div>
                  </div>
                  <button onClick={simReset} className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all text-xs font-display cursor-pointer">
                    Reset Demo
                  </button>
                </div>
              </div>

              <div id="simTelemetryLabels" className="mt-4 pt-4 border-t border-slate-700/50 grid grid-cols-[72px_1fr] sm:grid-cols-[80px_1fr] gap-2 text-xs">
                <div className="text-slate-500">Type</div><div id="simTypeLabel" className="text-slate-300 font-mono break-words min-w-0">–</div>
                <div className="text-slate-500">GPS</div><div id="simGpsLabel" className="text-slate-300 font-mono break-words min-w-0">12.9716, 77.5946</div>
                <div className="text-slate-500">Image</div><div id="simImgLabel" className="text-slate-300 font-mono break-words min-w-0">Not captured</div>
              </div>
            </section>

            <section className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 flex flex-col h-[220px] sm:h-[250px]">
              <h3 className="text-slate-100 font-bold mb-2">2) System Log</h3>
              <div id="simLogBox" className="flex-1 bg-black/40 rounded-xl p-3 font-mono text-[11px] overflow-y-auto space-y-2 border border-slate-700/30 text-slate-300">
                <p className="text-slate-600 italic" id="simLogEmpty">Awaiting events...</p>
              </div>
            </section>

            <div className="flex gap-2">
              <button onClick={simReset} className="flex-1 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-700 transition-all cursor-pointer"><i className="fa-solid fa-arrows-rotate"></i> Reset Simulation</button>
            </div>
          </div>

          {/* Map Area */}
          <section className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 sm:p-5 flex flex-col">
            <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
              <h3 className="text-slate-100 font-bold">3) City View &amp; Live Tracking</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3 text-[10px] font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-red-400"><span className="w-2 h-2 rounded-full bg-red-500"></span> Incident</span>
                <span className="flex items-center gap-1.5 text-green-400"><span className="w-2 h-2 rounded-sm bg-green-500"></span> Ambulance</span>
                <span className="flex items-center gap-1.5 text-blue-400"><span className="w-2 h-2 rounded-full bg-blue-400"></span> Police</span>
                <span className="flex items-center gap-1.5 text-yellow-400"><span className="w-2 h-2 rounded-sm bg-yellow-500"></span> Hospital</span>
              </div>
            </div>

            <div className="flex-1 bg-slate-950 rounded-2xl relative overflow-hidden border border-slate-800 min-h-[280px] sm:min-h-[400px]">
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-10" style={{"backgroundImage":"linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)","backgroundSize":"40px 40px"}}></div>
              
              {/* Traffic Signals */}
              <div id="simSignalsContainer"></div>

              {/* Static Nodes */}
              <div className="absolute w-4 h-4 bg-yellow-500 rounded-sm shadow-[0_0_10px_rgba(234,179,8,0.5)]" style={{"left":"82%","top":"25%","transform":"translate(-50%, -50%)"}}>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap text-[8px] font-bold text-yellow-400 bg-slate-900/80 px-1 rounded">Hospital</div>
              </div>
              <div className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.5)]" style={{"left":"40%","top":"15%","transform":"translate(-50%, -50%)"}}>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap text-[8px] font-bold text-blue-400 bg-slate-900/80 px-1 rounded">Police</div>
              </div>
              <div id="simNodeFire" className="hidden absolute w-3 h-3 bg-rose-400 rounded-full shadow-[0_0_10px_rgba(251,113,133,0.5)]" style={{"left":"18%","top":"70%","transform":"translate(-50%, -50%)"}}>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap text-[8px] font-bold text-rose-400 bg-slate-900/80 px-1 rounded">Fire</div>
              </div>

              {/* Dynamic Nodes */}
              <div id="simNodeIncident" className="hidden absolute w-4 h-4 bg-red-500 rounded-full shadow-[0_0_15px_rgba(201, 48, 44,0.6)] animate-pulse" style={{"left":"65%","top":"60%","transform":"translate(-50%, -50%)"}}>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 whitespace-nowrap text-[10px] font-bold text-red-400 bg-slate-900/80 px-1.5 py-0.5 rounded border border-red-500/30">EMERGENCY</div>
              </div>

              <div id="simNodeAmbulance" className="absolute w-4 h-4 bg-green-500 rounded-sm shadow-[0_0_15px_rgba(34,197,94,0.6)] transition-all duration-300" style={{"left":"10%","top":"20%","transform":"translate(-50%, -50%)"}}>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap text-[8px] font-bold text-green-400 bg-slate-900/80 px-1 rounded">AMBULANCE A</div>
              </div>
              <div id="simNodePickup" className="hidden absolute w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(44, 100, 161,0.6)] animate-pulse" style={{"left":"30%","top":"65%","transform":"translate(-50%, -50%)"}}>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 whitespace-nowrap text-[9px] font-bold text-blue-400 bg-slate-900/80 px-1.5 py-0.5 rounded border border-blue-500/30">PICKUP</div>
              </div>
              <div id="simNodeDrop" className="hidden absolute w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.6)] animate-pulse" style={{"left":"75%","top":"35%","transform":"translate(-50%, -50%)"}}>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 whitespace-nowrap text-[9px] font-bold text-emerald-400 bg-slate-900/80 px-1.5 py-0.5 rounded border border-emerald-500/30">HOSPITAL (DROP)</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    {/* Document Viewer Modal */}
    <div id="resourceModal" className="fixed inset-0 z-[120] hidden items-center justify-center bg-black/85 backdrop-blur-md p-4 md:p-6" onClick={closeResourceModal}>
        <div className="relative w-full max-w-5xl h-[88vh] bg-[#0A101D] border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 bg-[#050B14]">
                <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brandBlue/20 text-brandBlue flex items-center justify-center text-base sm:text-lg shrink-0">
                        <i className="fa-solid fa-file-pdf"></i>
                    </div>
                    <div className="min-w-0">
                        <h3 id="resourceModalTitle" className="text-sm sm:text-base md:text-lg font-bold text-white font-display truncate">Document Viewer</h3>
                        <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono truncate">EMSTRAP Official Materials &bull; Verified PDF</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
                    <a id="resourceModalDownloadBtn" href="#" download className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-brandBlue hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap">
                        <i className="fa-solid fa-download"></i>
                        <span>Download PDF</span>
                    </a>
                    <button onClick={closeResourceModal} className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-white/10 cursor-pointer shrink-0" title="Close (Esc)">
                        <i className="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>
            </div>

            {/* Modal Body: Scrollable Preview */}
            <div className="flex-1 bg-slate-950/90 overflow-y-auto p-2 relative">
                <iframe id="resourceModalIframe" src={null} className="w-full h-full rounded-2xl border-0 shadow-inner" title="PDF Document Preview"></iframe>
            </div>

            {/* Modal Footer */}
            <div className="px-4 sm:px-6 py-3 border-t border-white/10 bg-[#050B14] flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><i className="fa-solid fa-circle-check text-emerald-400 text-[10px]"></i> Authorized Corporate Material</span>
                <div className="flex items-center gap-4">
                    <a id="resourceModalExternalLink" href="#" target="_blank" rel="noopener noreferrer" className="text-xs text-brandBlue hover:underline flex items-center gap-1 font-medium">
                        <span>Open in New Tab</span>
                        <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                    </a>
                    <button onClick={closeResourceModal} className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs transition-all cursor-pointer">Close</button>
                </div>
            </div>
        </div>
    </div>

    {/* Fullscreen Video Player Modal */}
    <div id="videoPlayerModal" className="hidden fixed inset-0 z-[200] bg-black/95 items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) closeVideoPlayer(); }}>
        <button onClick={closeVideoPlayer} className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white text-xl transition-all z-10 focus:outline-none cursor-pointer">
            <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
            <video id="demoVideoPlayer" preload="none" playsInline className="w-full h-full object-contain" controls>
                <source src="/demo-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    </div>

    {/* Image Zoom Modal */}
    <div id="imageZoomModal" className="fixed inset-0 z-[150] hidden bg-slate-950/95 backdrop-blur-md items-center justify-center p-4 cursor-zoom-out" onClick={closeZoomModal}>
        <button className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl font-display transition-all cursor-pointer" onClick={closeZoomModal}>
            <i className="fa-solid fa-xmark"></i>
        </button>
        <img id="zoomedImage" src={null} alt="Full Screen Preview" className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl transition-transform duration-300 scale-95" onClick={(e) => e.stopPropagation()} />
    </div>

    {/* Core Scripts */}
    

    </div>
  );
}
