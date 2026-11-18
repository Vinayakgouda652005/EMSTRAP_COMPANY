import { Fragment, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { usePageSetup, initWaveObserver } from "../utils/emstrapLifecycle";

const PAGE_CSS = " .page-scope-servicedetailspage {\n            background-color: #050B14;\n            font-family: 'Inter', sans-serif;\n            overflow-x: clip;\n            background-image: \n                radial-gradient(circle at 10% 20%, rgba(44, 100, 161, 0.05) 0%, transparent 40%),\n                radial-gradient(circle at 90% 80%, rgba(201, 48, 44, 0.04) 0%, transparent 40%);\n            background-attachment: fixed;\n        }\n\n        @media (max-width: 1024px) {\n            .page-scope-servicedetailspage {\n                background-attachment: scroll;\n            }\n        }\n\n        .font-display {\n            font-family: 'Outfit', sans-serif;\n        }\n\n        .glass-panel {\n            background: linear-gradient(135deg, rgba(25, 35, 55, 0.85) 0%, rgba(18, 25, 40, 0.9) 100%);\n            backdrop-filter: blur(30px) saturate(130%);\n            -webkit-backdrop-filter: blur(30px) saturate(130%);\n            border: 1px solid rgba(255, 255, 255, 0.12);\n            box-shadow: \n                0 12px 40px rgba(0, 0, 0, 0.6),\n                inset 0 1px 0px rgba(255, 255, 255, 0.1);\n        }\n\n        /* Strip all background cards, borders, and margins inside service details to keep it pure paragraphs and bullet points */\n        #serviceContainer .glass-panel,\n        #serviceContainer .bg-slate-950\\/40,\n        #serviceContainer .bg-slate-950\\/30,\n        #serviceContainer .bg-slate-950\\/50,\n        #serviceContainer .bg-\\[\\#050B14\\] {\n            background: transparent !important;\n            border: none !important;\n            box-shadow: none !important;\n            padding-left: 0 !important;\n            padding-right: 0 !important;\n            padding-top: 0 !important;\n            padding-bottom: 0 !important;\n            border-radius: 0 !important;\n        }\n\n        #serviceContainer .w-10.h-10.rounded-xl,\n        #serviceContainer .w-12.h-12.rounded-xl {\n            background: transparent !important;\n            border: none !important;\n            width: auto !important;\n            height: auto !important;\n            padding: 0 !important;\n            margin-bottom: 0 !important;\n            display: inline-flex !important;\n            align-items: center;\n            justify-content: center;\n        }\n\n        #serviceContainer .border-t.border-white\\/5.pt-3,\n        #serviceContainer .border-t.border-white\\/5.pt-4 {\n            border-top: none !important;\n            padding-top: 0.5rem !important;\n        }\n\n        #serviceContainer .gap-3,\n        #serviceContainer .gap-4,\n        #serviceContainer .gap-6 {\n            gap: 1rem !important;\n        }\n\n        /* =====================================================================\n           Staggered scroll-reveal cards\n           ===================================================================== */\n        .wave-card-node {\n            opacity: 0;\n            transform: translateY(70px) rotateX(-10deg);\n            will-change: transform, opacity;\n        }\n\n        .wave-card-node.wave-animate {\n            animation: cardWaveRipple 3s cubic-bezier(0.22, 1, 0.36, 1) forwards;\n        }\n\n        @keyframes cardWaveRipple {\n            0% {\n                opacity: 0;\n                transform: translateY(80px) scale(0.94) rotateX(-12deg) rotateY(-3deg);\n            }\n            55% {\n                opacity: 0.85;\n                transform: translateY(-6px) scale(1.008) rotateX(2deg) rotateY(1deg);\n            }\n            78% {\n                transform: translateY(2px) scale(0.998) rotateX(-1deg);\n            }\n            100% {\n                opacity: 1;\n                transform: translateY(0) scale(1) rotateX(0) rotateY(0);\n            }\n        }";

const serviceDetailsData = {
  connect: {
    title: "EMSTRAP Connect",
    tagline: "Core Emergency Response Platform",
    themeClass: "from-emergencyRed to-rose-400",
    paragraphs: [
      "EMSTRAP Connect is the core emergency response platform of the EMSTRAP ecosystem, built to bridge the gap between citizens and emergency responders. With a single emergency alert, the platform instantly connects users with nearby ambulance services, hospitals, and police, enabling faster coordination when every second matters. The platform securely shares essential incident information, including the user's live location, emergency details, and supporting images, allowing responders to understand the situation before they arrive. This real-time communication helps emergency teams prepare the appropriate resources, reduce response times, and improve the quality of assistance provided. Designed with simplicity and speed in mind, EMSTRAP Connect empowers individuals to request help quickly while ensuring that multiple emergency services can coordinate efficiently through a unified response network.",
    ],
    sections: [
      {
        title: "Key Features",
        render: () => (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl flex items-start gap-3">
              <i className="fa-solid fa-circle-check text-emergencyRed mt-1"></i>
              <p className="text-slate-300 text-sm font-light">One-tap SOS alert activation</p>
            </div>
            <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl flex items-start gap-3">
              <i className="fa-solid fa-circle-check text-emergencyRed mt-1"></i>
              <p className="text-slate-300 text-sm font-light">Live GPS routing and telemetry tracking</p>
            </div>
            <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl flex items-start gap-3">
              <i className="fa-solid fa-circle-check text-emergencyRed mt-1"></i>
              <p className="text-slate-300 text-sm font-light">AI-powered emergency dispatch coordination</p>
            </div>
            <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl flex items-start gap-3">
              <i className="fa-solid fa-circle-check text-emergencyRed mt-1"></i>
              <p className="text-slate-300 text-sm font-light">Instant hospital pre-arrival notifications</p>
            </div>
            <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl flex items-start gap-3">
              <i className="fa-solid fa-circle-check text-emergencyRed mt-1"></i>
              <p className="text-slate-300 text-sm font-light">Real-time emergency incident timeline</p>
            </div>
            <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl flex items-start gap-3">
              <i className="fa-solid fa-circle-check text-emergencyRed mt-1"></i>
              <p className="text-slate-300 text-sm font-light">Secured digital incident records</p>
            </div>
            <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl flex items-start gap-3 col-span-1 md:col-span-2">
              <i className="fa-solid fa-circle-check text-emergencyRed mt-1"></i>
              <p className="text-slate-300 text-sm font-light">Live response progress monitoring</p>
            </div>
          </div>
        ),
      },
      {
        title: "Ecosystem Benefits",
        render: () => (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-slate-950/40 border border-white/5 p-5 rounded-xl space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2"><i className="fa-solid fa-user text-emergencyRed text-xs"></i> For Citizens</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light font-mono">Direct life-saving ambulance dispatch and real-time transit status updates.</p>
            </div>
            <div className="bg-slate-950/40 border border-white/5 p-5 rounded-xl space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2"><i className="fa-solid fa-hospital text-emergencyRed text-xs"></i> For Hospitals</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light font-mono">Immediate access to incoming patient context, vitals, and live ETA.</p>
            </div>
            <div className="bg-slate-950/40 border border-white/5 p-5 rounded-xl space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2"><i className="fa-solid fa-truck-medical text-emergencyRed text-xs"></i> For Ambulance Operators</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light font-mono">Optimal emergency routing paths and automated hospital pre-alerts.</p>
            </div>
            <div className="bg-slate-950/40 border border-white/5 p-5 rounded-xl space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2"><i className="fa-solid fa-shield-halved text-emergencyRed text-xs"></i> For Police</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light font-mono">Instant municipal notifications for rapid field response and public safety.</p>
            </div>
          </div>
        ),
      },
    ],
  },
  ride: {
    title: "EMSTRAP Ride",
    tagline: "Smart Ambulance Booking, When Every Second Counts",
    themeClass: "from-warmAmber to-amber-400",
    paragraphs: [
      "EMSTRAP Ride is an intelligent ambulance booking platform that enables individuals, families, and organisations to quickly book the right ambulance based on the patient's medical condition. Designed to simplify emergency and non-emergency medical transportation, EMSTRAP Ride connects users with nearby ambulance providers through a fast, reliable, and easy-to-use platform.",
      "Unlike traditional ambulance booking methods that often involve multiple phone calls and delays, EMSTRAP Ride allows users to book an ambulance in just a few steps, track its live location, and stay informed until it reaches the destination. Whether it's a medical emergency, hospital transfer, scheduled appointment, or maternity care, EMSTRAP Ride ensures that patients receive the appropriate level of medical transportation when they need it most.",
    ],
    sections: [
      {
        title: "Choose the Right Ambulance",
        render: () => (
          <>
            <p className="text-xs text-slate-400 leading-relaxed font-light mb-6">EMSTRAP Ride offers four categories of ambulances, allowing users to select the most suitable vehicle based on the patient&apos;s condition.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              <div className="bg-slate-950/40 border border-white/5 p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-warmAmber/10 border border-warmAmber/30 flex items-center justify-center">
                    <i className="fa-solid fa-truck-medical text-warmAmber"></i>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Basic Support Ambulance (BLS)</h4>
                    <p className="text-[10px] text-slate-500 uppercase font-mono">Standard Medical Transit</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-light">Ideal for patients who require safe transportation but do not need advanced medical intervention during transit.</p>
                <div className="border-t border-white/5 pt-3">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2 font-mono">Suitable For:</span>
                  <ul className="space-y-1.5 text-xs text-slate-300 font-light">
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-warmAmber text-[10px]"></i> General patient transportation</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-warmAmber text-[10px]"></i> Hospital admissions and discharges</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-warmAmber text-[10px]"></i> Minor injuries</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-warmAmber text-[10px]"></i> Routine medical appointments</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-warmAmber text-[10px]"></i> Non-critical patient transfers</li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-950/40 border border-white/5 p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-warmAmber/10 border border-warmAmber/30 flex items-center justify-center">
                    <i className="fa-solid fa-wind text-warmAmber"></i>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Oxygen Support Ambulance</h4>
                    <p className="text-[10px] text-slate-500 uppercase font-mono">Respiratory-Assisted Transit</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-light">Designed for patients who require continuous oxygen support while travelling to a healthcare facility.</p>
                <div className="border-t border-white/5 pt-3">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2 font-mono">Suitable For:</span>
                  <ul className="space-y-1.5 text-xs text-slate-300 font-light">
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-warmAmber text-[10px]"></i> Patients with breathing difficulties</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-warmAmber text-[10px]"></i> Respiratory illnesses</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-warmAmber text-[10px]"></i> Elderly patients requiring oxygen support</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-warmAmber text-[10px]"></i> Moderate medical emergencies</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-warmAmber text-[10px]"></i> Oxygen-assisted hospital transfers</li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-950/40 border border-white/5 p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-warmAmber/10 border border-warmAmber/30 flex items-center justify-center">
                    <i className="fa-solid fa-heart-pulse text-warmAmber"></i>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">ICU Ambulance</h4>
                    <p className="text-[10px] text-slate-500 uppercase font-mono">Advanced Life Support (ALS)</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-light">A fully equipped intensive care ambulance for critically ill patients who require advanced life-support systems.</p>
                <div className="border-t border-white/5 pt-3">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2 font-mono">Suitable For:</span>
                  <ul className="space-y-1.5 text-xs text-slate-300 font-light">
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-warmAmber text-[10px]"></i> Critical medical emergencies</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-warmAmber text-[10px]"></i> Cardiac emergencies</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-warmAmber text-[10px]"></i> Severe trauma cases</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-warmAmber text-[10px]"></i> Ventilator-supported patients</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-warmAmber text-[10px]"></i> Inter-hospital ICU transfers</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-warmAmber text-[10px]"></i> High-risk patient transport</li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-950/40 border border-white/5 p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-warmAmber/10 border border-warmAmber/30 flex items-center justify-center">
                    <i className="fa-solid fa-baby text-warmAmber"></i>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Pregnancy Care Ambulance</h4>
                    <p className="text-[10px] text-slate-500 uppercase font-mono">Maternity &amp; Neonatal support</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-light">Specially designed for expectant mothers requiring safe and timely transportation before, during, or after childbirth.</p>
                <div className="border-t border-white/5 pt-3">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2 font-mono">Suitable For:</span>
                  <ul className="space-y-1.5 text-xs text-slate-300 font-light">
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-warmAmber text-[10px]"></i> Labour pain emergencies</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-warmAmber text-[10px]"></i> High-risk pregnancies</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-warmAmber text-[10px]"></i> Maternity hospital transfers</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-warmAmber text-[10px]"></i> Pregnancy-related complications</li>
                    <li className="flex items-center gap-2"><i className="fa-solid fa-check text-warmAmber text-[10px]"></i> Post-delivery transportation</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        ),
      },
      {
        title: "Key Features",
        items: [
          "Instant ambulance booking",
          "Four specialised ambulance categories",
          "Live ambulance tracking",
          "GPS-based pickup and navigation",
          "Estimated arrival time",
          "Real-time booking status updates",
          "Secure patient information",
          "Hospital pre-arrival notification",
          "Digital trip records",
          "24/7 booking availability",
          "Easy-to-use mobile interface",
        ],
      },
      {
        title: "How EMSTRAP Ride Works",
        render: () => (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
            <div className="bg-slate-950/30 border border-white/5 p-5 rounded-2xl relative">
              <span className="absolute right-4 top-4 text-3xl font-black text-white/5 font-mono">01</span>
              <h4 className="text-sm font-bold text-white mb-2">Select Pickup Location</h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed">Enter your current location or allow GPS access for automatic detection.</p>
            </div>
            <div className="bg-slate-950/30 border border-white/5 p-5 rounded-2xl relative">
              <span className="absolute right-4 top-4 text-3xl font-black text-white/5 font-mono">02</span>
              <h4 className="text-sm font-bold text-white mb-2">Choose the Ambulance Type</h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed">Select the ambulance that best matches the patient&apos;s medical needs (Basic Support, Oxygen Support, ICU, Pregnancy Care).</p>
            </div>
            <div className="bg-slate-950/30 border border-white/5 p-5 rounded-2xl relative">
              <span className="absolute right-4 top-4 text-3xl font-black text-white/5 font-mono">03</span>
              <h4 className="text-sm font-bold text-white mb-2">Confirm the Booking</h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed">Review the booking details and submit your request.</p>
            </div>
            <div className="bg-slate-950/30 border border-white/5 p-5 rounded-2xl relative">
              <span className="absolute right-4 top-4 text-3xl font-black text-white/5 font-mono">04</span>
              <h4 className="text-sm font-bold text-white mb-2">Get Matched with an Ambulance</h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed">Nearby ambulance drivers receive the request and accept the booking.</p>
            </div>
            <div className="bg-slate-950/30 border border-white/5 p-5 rounded-2xl relative">
              <span className="absolute right-4 top-4 text-3xl font-black text-white/5 font-mono">05</span>
              <h4 className="text-sm font-bold text-white mb-2">Track Your Ambulance</h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed">View the ambulance&apos;s live location, estimated arrival time, and journey progress.</p>
            </div>
            <div className="bg-slate-950/30 border border-white/5 p-5 rounded-2xl relative">
              <span className="absolute right-4 top-4 text-3xl font-black text-white/5 font-mono">06</span>
              <h4 className="text-sm font-bold text-white mb-2">Reach the Hospital Safely</h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed">The selected hospital is notified in advance (where integrated), helping medical teams prepare for the patient&apos;s arrival.</p>
            </div>
          </div>
        ),
      },
      {
        title: "Why Choose EMSTRAP Ride?",
        render: () => (
          <div className="bg-slate-950/40 border border-white/5 p-6 rounded-2xl space-y-4">
            <p className="text-xs text-slate-400 leading-relaxed font-light">EMSTRAP Ride combines intelligent technology with dependable medical transportation to ensure every patient receives the right ambulance at the right time. By offering multiple ambulance categories, real-time tracking, and seamless coordination between patients, ambulance drivers, and hospitals, EMSTRAP Ride makes emergency transportation faster, more transparent, and more reliable. Whether it&apos;s a routine hospital transfer or a life-threatening emergency, EMSTRAP Ride helps ensure timely access to medical care.</p>
          </div>
        ),
      },
      {
        title: "Ideal For",
        render: () => (
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-light text-slate-300">Individuals and Families</span>
            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-light text-slate-300">Hospitals and Clinics</span>
            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-light text-slate-300">Corporate Organisations</span>
            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-light text-slate-300">Senior Citizens</span>
            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-light text-slate-300">Pregnant Women</span>
            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-light text-slate-300">Patients Requiring Scheduled Medical Transport</span>
            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-light text-slate-300">Emergency Medical Situations</span>
          </div>
        ),
      },
    ],
  },
  shield: {
    title: "EMSTRAP Shield",
    tagline: "Your Complete Workplace Safety Partner",
    themeClass: "from-brandAccent to-emerald-400",
    paragraphs: [
      "EMSTRAP Shield is a comprehensive workplace safety solution that helps organisations protect their employees, assets, and operations through an integrated ecosystem of emergency response services, fire safety, medical assistance, employee training, and safety management.",
      "Designed for companies, industries, manufacturing plants, warehouses, IT parks, educational institutions, hospitals, commercial buildings, and large campuses, EMSTRAP Shield combines advanced technology with professional safety services to ensure organisations are always prepared for emergencies.",
      "Instead of coordinating with multiple service providers for ambulances, fire safety, emergency training, and compliance, businesses can rely on a single trusted partner to manage every aspect of workplace safety.",
      "Whether it's a medical emergency, fire incident, industrial accident, or workplace evacuation, EMSTRAP Shield ensures immediate coordination with the appropriate emergency responders while helping organisations build a strong culture of safety and preparedness.",
    ],
    sections: [
      {
        title: "What's Included in EMSTRAP Shield",
        render: () => (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            <div className="bg-slate-950/40 border border-white/5 p-5 rounded-xl space-y-3">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <i className="fa-solid fa-truck-medical text-brandAccent text-sm"></i> Emergency Medical Support
              </h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed">Protect your employees with fast and reliable medical emergency services. Managed by EMSTRAP:</p>
              <ul className="space-y-1.5 text-xs text-slate-300 font-light list-disc list-inside">
                <li>Priority ambulance assistance for employees</li>
                <li>24/7 emergency response coordination</li>
                <li>Hospital connectivity for faster treatment</li>
                <li>Medical emergency escalation</li>
                <li>Employee emergency support</li>
                <li>Live emergency tracking</li>
              </ul>
            </div>

            <div className="bg-slate-950/40 border border-white/5 p-5 rounded-xl space-y-3">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <i className="fa-solid fa-fire text-brandAccent text-sm"></i> Fire Safety Services
              </h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed">Strengthen workplace fire preparedness with end-to-end fire safety solutions:</p>
              <ul className="space-y-1.5 text-xs text-slate-300 font-light list-disc list-inside">
                <li>Fire station connectivity for rapid response</li>
                <li>Fire extinguisher supply and installation</li>
                <li>Fire extinguisher inspection and scheduled maintenance</li>
                <li>Fire safety risk assessments &amp; compliance guidance</li>
                <li>Fire emergency response and evacuation planning</li>
              </ul>
            </div>

            <div className="bg-slate-950/40 border border-white/5 p-5 rounded-xl space-y-3 col-span-1 md:col-span-2">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <i className="fa-solid fa-graduation-cap text-brandAccent text-sm"></i> Employee Safety Training
              </h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed">Well-trained employees respond more effectively during emergencies. EMSTRAP provides professional training programmes covering:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-xs text-slate-300 font-light">
                <div className="flex items-center gap-2"><i className="fa-solid fa-chevron-right text-brandAccent text-[9px]"></i> Fire extinguisher operation</div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-chevron-right text-brandAccent text-[9px]"></i> Emergency evacuation procedures</div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-chevron-right text-brandAccent text-[9px]"></i> Basic First Aid awareness</div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-chevron-right text-brandAccent text-[9px]"></i> CPR awareness</div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-chevron-right text-brandAccent text-[9px]"></i> Medical emergency response</div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-chevron-right text-brandAccent text-[9px]"></i> Workplace safety best practices</div>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Mock Drills Every Six Months",
        render: () => (
          <div className="bg-slate-950/40 border border-white/5 p-6 rounded-2xl space-y-4">
            <span className="text-xs font-bold uppercase text-brandAccent tracking-wider font-mono">Preparedness Saves Lives</span>
            <p className="text-xs text-slate-400 leading-relaxed font-light">EMSTRAP conducts scheduled emergency mock drills every six months to ensure employees know exactly how to respond during real emergencies.</p>
            <div className="border-t border-white/5 pt-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2 font-mono">Our Drills Include:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-light">
                <div className="flex items-center gap-2"><i className="fa-solid fa-circle-dot text-brandAccent text-[8px]"></i> Fire evacuation simulations</div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-circle-dot text-brandAccent text-[8px]"></i> Medical emergency response exercises</div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-circle-dot text-brandAccent text-[8px]"></i> Disaster &amp; earthquake preparedness</div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-circle-dot text-brandAccent text-[8px]"></i> Assembly point verification</div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-circle-dot text-brandAccent text-[8px]"></i> Emergency communication testing</div>
                <div className="flex items-center gap-2"><i className="fa-solid fa-circle-dot text-brandAccent text-[8px]"></i> Incident evaluation reports</div>
              </div>
            </div>
            <p className="text-xs text-slate-500 font-light italic leading-relaxed border-l-2 border-brandAccent/30 pl-3">Each drill concludes with a detailed assessment report highlighting observations, response times, and actionable recommendations.</p>
          </div>
        ),
      },
      {
        title: "Safety Management Platform",
        render: () => (
          <div className="bg-slate-950/40 border border-white/5 p-6 rounded-2xl space-y-4">
            <p className="text-xs text-slate-400 leading-relaxed font-light">Manage workplace safety through one intelligent dashboard. Dashboard capabilities include:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-medium text-center">
              <div className="bg-slate-950/50 p-3 rounded-lg border border-white/5 text-slate-300">Employee SOS system</div>
              <div className="bg-slate-950/50 p-3 rounded-lg border border-white/5 text-slate-300">Incident reporting</div>
              <div className="bg-slate-950/50 p-3 rounded-lg border border-white/5 text-slate-300">Safety records</div>
              <div className="bg-slate-950/50 p-3 rounded-lg border border-white/5 text-slate-300">Emergency contacts</div>
              <div className="bg-slate-950/50 p-3 rounded-lg border border-white/5 text-slate-300">Digital inspections</div>
              <div className="bg-slate-950/50 p-3 rounded-lg border border-white/5 text-slate-300">Safety analytics</div>
              <div className="bg-slate-950/50 p-3 rounded-lg border border-white/5 text-slate-300 col-span-2 sm:col-span-1">Multi-site management</div>
              <div className="bg-slate-950/50 p-3 rounded-lg border border-white/5 text-slate-300 col-span-2 sm:col-span-2">Compliance documentation</div>
            </div>
          </div>
        ),
      },
      {
        title: "Why Choose EMSTRAP Shield?",
        render: () => (
          <div className="bg-slate-950/40 border border-white/5 p-6 rounded-2xl space-y-4">
            <p className="text-xs text-slate-400 leading-relaxed font-light">Unlike traditional safety providers that focus on only one service, EMSTRAP Shield combines emergency medical support, fire safety, employee training, and digital safety management into a single, integrated solution.</p>
            <div className="border-t border-white/5 pt-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2 font-mono">By partnering with EMSTRAP Shield, organisations can:</span>
              <ul className="space-y-1.5 text-xs text-slate-300 font-light">
                <li className="flex items-center gap-2"><i className="fa-solid fa-check text-brandAccent text-[10px]"></i> Improve employee safety and wellbeing</li>
                <li className="flex items-center gap-2"><i className="fa-solid fa-check text-brandAccent text-[10px]"></i> Reduce emergency response times</li>
                <li className="flex items-center gap-2"><i className="fa-solid fa-check text-brandAccent text-[10px]"></i> Enhance workplace preparedness</li>
                <li className="flex items-center gap-2"><i className="fa-solid fa-check text-brandAccent text-[10px]"></i> Simplify coordination with responders</li>
                <li className="flex items-center gap-2"><i className="fa-solid fa-check text-brandAccent text-[10px]"></i> Strengthen fire safety readiness &amp; support compliance requirements</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        title: "Who EMSTRAP Shield Serves",
        render: () => (
          <div className="space-y-6 mt-2">
            <p className="text-xs text-slate-400 font-light leading-relaxed">EMSTRAP Shield delivers specialized emergency management protocols tailored to high-density, high-risk operational environments:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="bg-slate-950/60 border border-white/10 rounded-2xl overflow-hidden flex flex-col group hover:border-brandAccent/40 transition-all">
                <div className="relative h-44 overflow-hidden">
                  <img src="/shield-manufacturing.png" loading="lazy" decoding="async" alt="Manufacturing Industry" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  <span className="absolute bottom-3 left-3 text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
                    Manufacturing Industry
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="text-base font-bold text-white font-display">Manufacturing &amp; Industrial Plants</h4>
                    <p className="text-xs text-slate-400 font-light leading-relaxed mt-1">Floor-wide worker SOS alarms, rapid chemical and machinery hazard triage, and prioritized emergency evacuation routing for factories and assembly lines.</p>
                  </div>
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Response: <b className="text-white">&lt; 2 Min</b></span>
                    <span className="text-emerald-400 font-semibold">Priority Triage</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/60 border border-white/10 rounded-2xl overflow-hidden flex flex-col group hover:border-brandAccent/40 transition-all">
                <div className="relative h-44 overflow-hidden">
                  <img src="/shield-smartcity.jpg" loading="lazy" decoding="async" alt="Smart City Projects" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  <span className="absolute bottom-3 left-3 text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
                    Smart City Projects
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="text-base font-bold text-white font-display">Smart Cities &amp; Municipal Authorities</h4>
                    <p className="text-xs text-slate-400 font-light leading-relaxed mt-1">Intelligent urban corridor signal preemption, integrated municipal incident monitoring, and automated emergency routing across congested urban sectors.</p>
                  </div>
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Corridors: <b className="text-white">120+ Active</b></span>
                    <span className="text-emerald-400 font-semibold">42% Time Saved</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/60 border border-white/10 rounded-2xl overflow-hidden flex flex-col group hover:border-brandAccent/40 transition-all">
                <div className="relative h-44 overflow-hidden">
                  <img src="/shield-police.jpg" loading="lazy" decoding="async" alt="Police & Public Safety" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  <span className="absolute bottom-3 left-3 text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
                    Police &amp; Public Safety
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="text-base font-bold text-white font-display">Police Control Rooms &amp; Law Enforcement</h4>
                    <p className="text-xs text-slate-400 font-light leading-relaxed mt-1">State and city police command center integration with live geospatial telemetry, active incident logs, patrol routing, and inter-agency responder coordination.</p>
                  </div>
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Coverage: <b className="text-white">1M+ Citizens</b></span>
                    <span className="text-emerald-400 font-semibold">24/7 Monitoring</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/60 border border-white/10 rounded-2xl overflow-hidden flex flex-col group hover:border-brandAccent/40 transition-all">
                <div className="relative h-44 overflow-hidden">
                  <img src="/shield-ambulance.png" loading="lazy" decoding="async" alt="Ambulance Providers" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  <span className="absolute bottom-3 left-3 text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
                    Ambulance Providers
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="text-base font-bold text-white font-display">Ambulance Providers &amp; Emergency Fleets</h4>
                    <p className="text-xs text-slate-400 font-light leading-relaxed mt-1">Connected fleet dispatch platform with real-time GPS telemetry, priority ambulance assignment, in-transit vitals updates, and hospital pre-arrival readiness.</p>
                  </div>
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Fleets: <b className="text-white">300+ Active</b></span>
                    <span className="text-emerald-400 font-semibold">100% Real-time</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/60 border border-white/10 rounded-2xl overflow-hidden flex flex-col group hover:border-brandAccent/40 transition-all lg:col-span-2">
                <div className="relative h-44 overflow-hidden">
                  <img src="/shield-campus.jpg" loading="lazy" decoding="async" alt="Educational Campuses" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  <span className="absolute bottom-3 left-3 text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
                    Educational Institutions
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="text-base font-bold text-white font-display">Educational Institutions &amp; Large Campuses</h4>
                    <p className="text-xs text-slate-400 font-light leading-relaxed mt-1">Campus-wide emergency network protecting students, professors, and administrative staff across academic blocks, laboratories, hostels, libraries, and stadiums.</p>
                  </div>
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Campuses: <b className="text-white">50+ Onboarded</b></span>
                    <span className="text-emerald-400 font-semibold">&lt; 90 Sec Escalation</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-3 font-mono">Also Serving These Sectors:</span>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-light text-slate-300">Corporate Offices &amp; IT Parks</span>
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-light text-slate-300">Warehouses &amp; Logistics Centres</span>
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-light text-slate-300">Construction Sites</span>
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-light text-slate-300">Hospitals &amp; Healthcare Facilities</span>
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-light text-slate-300">Hotels &amp; Hospitality</span>
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-light text-slate-300">Shopping Malls &amp; Commercial Complexes</span>
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-light text-slate-300">Industrial Parks &amp; SEZs</span>
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-light text-slate-300">Residential Communities &amp; Townships</span>
              </div>
            </div>
          </div>
        ),
      },
    ],
  },
  command: {
    title: "EMSTRAP Command",
    tagline: "Empowering Emergency Responders with Intelligent Operations",
    themeClass: "from-brandBlue to-blue-400",
    paragraphs: [
      "EMSTRAP Command is a unified emergency operations platform designed for hospitals, ambulance drivers, police departments, and emergency response agencies. It provides the digital tools needed to receive emergency alerts, coordinate responses, monitor incidents, and communicate efficiently during critical situations.",
      "By bringing emergency responders onto a single platform, EMSTRAP Command helps reduce response times, improve coordination, and ensure that every emergency is managed with greater speed and accuracy. Whether responding to a road accident, medical emergency, or public safety incident, EMSTRAP Command delivers real-time information that enables responders to make faster and more informed decisions.",
    ],
    sections: [
      {
        title: "Responder Dashboards",
        render: () => (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
            <div className="bg-slate-950/40 border border-white/5 p-5 rounded-xl space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <i className="fa-solid fa-truck-medical text-brandBlue"></i> Ambulance Driver
              </h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed">A dedicated mobile dashboard designed specifically for ambulance drivers features:</p>
              <ul className="space-y-1 text-[11px] text-slate-300 font-light list-disc list-inside">
                <li>Receive emergency requests instantly</li>
                <li>Accept or decline assignments</li>
                <li>GPS navigation to emergency location</li>
                <li>Access patient info (when available)</li>
                <li>Real-time status updates &amp; logs</li>
                <li>Emergency communication with ER desks</li>
              </ul>
            </div>

            <div className="bg-slate-950/40 border border-white/5 p-5 rounded-xl space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <i className="fa-solid fa-hospital text-brandBlue"></i> Hospital Dashboard
              </h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed">Enable hospitals to prepare before the patient arrives:</p>
              <ul className="space-y-1 text-[11px] text-slate-300 font-light list-disc list-inside">
                <li>Receive alerts and vitals in real time</li>
                <li>View incident details, images, and maps</li>
                <li>Monitor incoming ambulances &amp; ETAs</li>
                <li>Coordinate emergency admission queues</li>
                <li>Internal staff notifications &amp; logs</li>
                <li>Analytics reporting dashboards</li>
              </ul>
            </div>

            <div className="bg-slate-950/40 border border-white/5 p-5 rounded-xl space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <i className="fa-solid fa-shield-halved text-brandBlue"></i> Police Dashboard
              </h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed">Support police teams with faster emergency coordination:</p>
              <ul className="space-y-1 text-[11px] text-slate-300 font-light list-disc list-inside">
                <li>Receive incident alerts &amp; location map</li>
                <li>Coordinate field response &amp; routes</li>
                <li>Track active cases &amp; upload evidence</li>
                <li>Collaborate with hospitals &amp; drivers</li>
                <li>Generate secure incident logs</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        title: "Advanced Core Modules",
        render: () => (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
            <div className="bg-slate-950/40 border border-white/5 p-5 rounded-xl space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2"><i className="fa-solid fa-map-location-dot text-brandBlue text-xs"></i> Live Emergency Monitoring</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">Interactive tracking maps display active incidents, telemetry locations, responders timelines, status updates, and priority queues.</p>
            </div>
            <div className="bg-slate-950/40 border border-white/5 p-5 rounded-xl space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2"><i className="fa-solid fa-brain text-brandBlue text-xs"></i> AI Decision Support</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">Intelligent algorithms assist dispatchers: incident severity assessment, AI incident summaries, suggested resources, and smart triage prioritisation.</p>
            </div>
            <div className="bg-slate-950/40 border border-white/5 p-5 rounded-xl space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2"><i className="fa-solid fa-chart-line text-brandBlue text-xs"></i> Reports &amp; Analytics</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">Tracks operational performance including total incidents handled, average response times, responder averages, and hot-spot location trends.</p>
            </div>
          </div>
        ),
      },
      {
        title: "Secure Collaboration",
        render: () => (
          <div className="bg-slate-950/40 border border-white/5 p-6 rounded-2xl space-y-4">
            <p className="text-xs text-slate-400 leading-relaxed font-light">EMSTRAP Command enables secure communication and information sharing between emergency responders.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs text-center font-medium">
              <div className="bg-slate-950/50 p-3 rounded-lg border border-white/5 text-slate-300">Real-time alerts</div>
              <div className="bg-slate-950/50 p-3 rounded-lg border border-white/5 text-slate-300">Shared incident logs</div>
              <div className="bg-slate-950/50 p-3 rounded-lg border border-white/5 text-slate-300">Role-based controls</div>
              <div className="bg-slate-950/50 p-3 rounded-lg border border-white/5 text-slate-300">Secure channels</div>
              <div className="bg-slate-950/50 p-3 rounded-lg border border-white/5 text-slate-300">Digital incident records</div>
              <div className="bg-slate-950/50 p-3 rounded-lg border border-white/5 text-slate-300">Audit logs</div>
            </div>
          </div>
        ),
      },
      {
        title: "Why Choose EMSTRAP Command?",
        render: () => (
          <div className="bg-slate-950/40 border border-white/5 p-6 rounded-2xl">
            <p className="text-xs text-slate-400 leading-relaxed font-light">EMSTRAP Command creates a connected emergency response ecosystem by enabling hospitals, ambulance drivers, and police departments to work together on a single platform. With real-time alerts, AI-powered insights, and coordinated communication, organisations can respond more efficiently and improve outcomes during critical situations. As the EMSTRAP ecosystem evolves, EMSTRAP Command is designed to expand with additional capabilities such as fleet management, fire department operations, and government emergency control room integration.</p>
          </div>
        ),
      },
      {
        title: "Ideal For",
        render: () => (
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-light text-slate-300">Hospitals</span>
            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-light text-slate-300">Ambulance Drivers</span>
            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-light text-slate-300">Ambulance Service Providers</span>
            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-light text-slate-300">Police Departments</span>
            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-light text-slate-300">Emergency Response Organisations</span>
            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-light text-slate-300">Disaster Management Authorities</span>
            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-light text-slate-300">Smart City Projects</span>
            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-light text-slate-300">Municipal Corporations</span>
            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-light text-slate-300">Government Emergency Services</span>
          </div>
        ),
      },
    ],
  },
};

export default function ServiceDetailsPage() {
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get("service") || "connect";
  const service = Object.prototype.hasOwnProperty.call(serviceDetailsData, serviceId)
    ? serviceDetailsData[serviceId]
    : undefined;
  const topGlowClass = service
    ? `h-1.5 w-full bg-gradient-to-r ${service.themeClass}`
    : "h-1.5 w-full bg-gradient-to-r from-emergencyRed via-brandBlue to-emerald-400";
  const containerRef = useRef(null);

  usePageSetup({
    title: service ? `${service.title} - EMSTRAP Details` : "EMSTRAP - Service Details",
    bodyClass: "text-slate-100 min-h-screen flex flex-col justify-between",
    themeClass: "theme-milestone",
    customCss: PAGE_CSS,
    enableWave: false,
    enableHeaderAmbulance: true,
  });

  useEffect(() => {
    if (!containerRef.current) return;
    return initWaveObserver(containerRef.current);
  }, [serviceId]);

  return (
    <div className="page-scope-servicedetailspage theme-milestone min-h-screen flex flex-col justify-between">
      {/* Top Glow Line */}
      <div id="topGlow" className={topGlowClass}></div>

      {/* Header / Navigation */}
      <header className="py-6 px-6 md:px-12 border-b border-white/5 bg-brandDark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="h-10 flex items-center transition-transform duration-300 group-hover:scale-105">
              <img src="/images/logo.png" alt="EMSTRAP Logo" className="h-full w-auto object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-display tracking-wider text-white">EMSTRAP</span>
            </div>
          </Link>

          <Link to="/#page-services" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-xs tracking-wide transition-all duration-300 border border-white/10">
            <i className="fa-solid fa-arrow-left"></i> Back to Home
          </Link>
        </div>

        {/* Scroll Progress Ambulance Track */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10">
          <div id="headerAmbulance" className="absolute bottom-0 w-8 h-6 transition-all duration-75 ease-out" style={{ left: "0px", zIndex: "50", marginBottom: "1px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-full h-full" style={{ filter: "drop-shadow(0 0 6px #C9302C)" }}>
              <path fill="#C9302C" d="M128 32C92.7 32 64 60.7 64 96V352h48c0 26.5 21.5 48 48 48s48-21.5 48-48H384c0 26.5 21.5 48 48 48s48-21.5 48-48h48c35.3 0 64-28.7 64-64V256h-8V224H520c-13.3 0-24-10.7-24-24V144c0-8.8-7.2-16-16-16H384V96c0-35.3-28.7-64-64-64H128zM192 128H288v48H192V128zm0 96H288v48H192V224zM536 256H592c4.4 0 8 3.6 8 8V352c0 8.8-7.2 16-16 16H536V256zM160 384c8.8 0 16 7.2 16 16s-7.2 16-16 16s-16-7.2-16-16s7.2-16 16-16zm272 0c8.8 0 16 7.2 16 16s-7.2 16-16 16s-16-7.2-16-16s7.2-16 16-16z" />
              <circle cx="320" cy="20" r="28" className="siren-flash" />
            </svg>
          </div>
          <div id="headerShieldReaction" className="absolute bottom-6 right-8 w-5 h-5 flex items-center justify-center bg-[#2C64A1] rounded-full border border-white/20 p-1 transition-all duration-300 scale-0 opacity-0 translate-y-2 z-55 shadow-[0_0_10px_rgba(44,100,161,0.6)]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-full h-full">
              <path fill="#ffffff" d="M256 0c4.6 0 9.2 1 13.4 2.9L452.9 82.8c22 9.3 35.1 31.7 35.1 55.4l0 102.5c0 141.8-84.4 269-218.1 328.3c-8.9 3.9-19 3.9-27.9 0C108.4 509.8 24 382.5 24 240.7l0-102.5c0-23.7 13.1-46.1 35.1-55.4L242.6 2.9C246.8 1 251.4 0 256 0z" />
            </svg>
          </div>
          <div className="absolute bottom-0 right-0 w-6 h-5 flex items-center justify-center" style={{ zIndex: "45", marginBottom: "1px" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-full h-full" style={{ filter: "drop-shadow(0 0 4px #C9302C)" }}>
              <path fill="#C9302C" d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h74.7c58.9 0 106.7 47.8 106.7 106.7V384c0 17.7-14.3 32-32 32h-32v64c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32V416H96c-17.7 0-32-14.3-32-32V298.7zm426.7-106.7c58.9 0 106.7 47.8 106.7 106.7V384c0 17.7-14.3 32-32 32h-32v64c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32V416H416c-17.7 0-32-14.3-32-32V298.7c0-58.9 47.8-106.7 106.7-106.7z" />
            </svg>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-grow py-16 px-6 md:px-12 max-w-5xl mx-auto w-full">
        <div id="serviceContainer" ref={containerRef} className="space-y-12">
          {service ? (
            <>
              <div className="space-y-6 wave-card-node">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className={`text-3xl md:text-5xl font-black font-display bg-gradient-to-r ${service.themeClass} bg-clip-text text-transparent`}>
                      {service.title}
                    </h1>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">{service.tagline}</p>
                  </div>
                </div>
                <p className="text-base text-slate-300 leading-relaxed font-light mt-6">
                  {service.paragraphs.map((p, idx) => (
                    <Fragment key={idx}>
                      {idx > 0 && (
                        <>
                          <br />
                          <br />
                        </>
                      )}
                      {p}
                    </Fragment>
                  ))}
                </p>
              </div>
              <div className="space-y-12 mt-12 wave-card-node">
                {service.sections.map((sec) => (
                  <div key={sec.title} className="border-t border-white/5 pt-8">
                    <h3 className="text-lg font-bold font-display text-white mb-4 flex items-center gap-2">
                      <span className={`w-1.5 h-6 rounded-full bg-gradient-to-b ${service.themeClass}`}></span>
                      {sec.title}
                    </h3>
                    {sec.render ? (
                      sec.render()
                    ) : Array.isArray(sec.items) ? (
                      <ul className="space-y-2 mt-2 list-none">
                        {sec.items.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <span className="text-brandBlue mt-0.5 shrink-0 text-sm">&bull;</span>
                            <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="flex justify-center pt-8">
                <Link
                  to="/#page-services"
                  className={`px-8 py-3.5 rounded-full bg-gradient-to-r ${service.themeClass} hover:opacity-90 text-white font-bold text-sm tracking-wide transition-all shadow-lg hover:scale-105`}
                >
                  Back to Services
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-20 glass-panel p-8 rounded-3xl border border-white/5">
              <i className="fa-solid fa-triangle-exclamation text-4xl text-emergencyRed mb-4"></i>
              <h2 className="text-xl font-bold text-white mb-2">Service Not Found</h2>
              <p className="text-slate-400 text-sm font-light mb-6">The requested service module does not exist or has been relocated.</p>
              <Link to="/#page-services" className="px-6 py-2.5 rounded-full bg-brandBlue text-white font-semibold text-xs tracking-wide">
                Back to Services
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#03070d] border-t border-white/5 py-8 px-6 md:px-12 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <span>&copy; 2026 EMSTRAP Pvt. Ltd. All rights reserved.</span>
          <Link to="/#page-landing" className="mt-2 md:mt-0 font-bold font-display tracking-wider text-brandBlue hover:text-white transition-all">EMSTRAP</Link>
        </div>
      </footer>
    </div>
  );
}
