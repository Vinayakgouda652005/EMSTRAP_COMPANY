import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

import HomePage from "./pages/HomePage";
const AboutPage = lazy(() => import("./pages/AboutPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ConnectPage = lazy(() => import("./pages/ConnectPage"));
const RidePage = lazy(() => import("./pages/RidePage"));
const ShieldPage = lazy(() => import("./pages/ShieldPage"));
const CommandPage = lazy(() => import("./pages/CommandPage"));
const CorporateCompaniesPage = lazy(() => import("./pages/CorporateCompaniesPage"));
const HospitalsAndClinicsPage = lazy(() => import("./pages/HospitalsAndClinicsPage"));
const EducationalCampusesPage = lazy(() => import("./pages/EducationalCampusesPage"));
const SmartCitiesPage = lazy(() => import("./pages/SmartCitiesPage"));
const GovernmentAgenciesPage = lazy(() => import("./pages/GovernmentAgenciesPage"));
const AmbulanceProvidersPage = lazy(() => import("./pages/AmbulanceProvidersPage"));
const TrafficManagementPage = lazy(() => import("./pages/TrafficManagementPage"));
const PoliceDepartmentsPage = lazy(() => import("./pages/PoliceDepartmentsPage"));
const ResearchPage = lazy(() => import("./pages/ResearchPage"));
const PrototypePage = lazy(() => import("./pages/PrototypePage"));
const PatentPage = lazy(() => import("./pages/PatentPage"));
const PilotsPage = lazy(() => import("./pages/PilotsPage"));
const RoadmapPage = lazy(() => import("./pages/RoadmapPage"));
const LaunchPage = lazy(() => import("./pages/LaunchPage"));
const ServiceDetailsPage = lazy(() => import("./pages/ServiceDetailsPage"));


function SEOManager() {
  const { pathname } = useLocation();

  const pageSEO = {
    "/": {
      title: "EMSTRAP | AI-Powered Emergency Response Ecosystem",
      description: "EMSTRAP connects citizens, ambulance fleets, hospitals, police and emergency services through an intelligent emergency response ecosystem."
    },
    "/about": {
      title: "About EMSTRAP | Our Mission and Vision",
      description: "Learn about EMSTRAP, our mission, vision and technology for building a smarter emergency response ecosystem."
    },
    "/careers": {
      title: "Careers at EMSTRAP | Join Our Team",
      description: "Explore career and internship opportunities at EMSTRAP and help build technology for faster emergency response."
    },
    "/contact": {
      title: "Contact EMSTRAP | Get in Touch",
      description: "Contact EMSTRAP for partnerships, product enquiries, collaborations and emergency response technology solutions."
    },
    "/connect": {
      title: "EMSTRAP Connect | Smart Emergency Communication",
      description: "EMSTRAP Connect supports emergency communication and coordination between smart cities, police and emergency response teams."
    },
    "/ride": {
      title: "EMSTRAP Ride | Ambulance Booking Platform",
      description: "EMSTRAP Ride connects people with ambulance transportation services for coordinated emergency patient transport."
    },
    "/shield": {
      title: "EMSTRAP Shield | Enterprise Safety Platform",
      description: "EMSTRAP Shield helps organisations strengthen workplace safety through employee SOS alerts and emergency coordination."
    },
    "/command": {
      title: "EMSTRAP Command | Emergency Operations Platform",
      description: "EMSTRAP Command supports ambulance providers and hospitals with emergency operations and response coordination."
    },
    "/corporate-companies": {
      title: "EMSTRAP for Corporate Companies | Workplace Safety",
      description: "Discover EMSTRAP emergency response and workplace safety solutions for corporate organisations."
    },
    "/hospitals-and-clinics": {
      title: "EMSTRAP for Hospitals and Clinics",
      description: "Explore EMSTRAP solutions for hospital emergency coordination and ambulance pre-arrival communication."
    },
    "/educational-campuses": {
      title: "EMSTRAP for Educational Campuses | Campus Safety",
      description: "Discover emergency alert and response coordination solutions for educational institutions and campuses."
    },
    "/smart-cities": {
      title: "EMSTRAP for Smart Cities | Emergency Coordination",
      description: "Explore intelligent emergency communication and coordination solutions for smart city ecosystems."
    },
    "/government-agencies": {
      title: "EMSTRAP for Government Agencies",
      description: "Discover EMSTRAP emergency coordination technology for government departments and public services."
    },
    "/ambulance-providers": {
      title: "EMSTRAP for Ambulance Providers",
      description: "Explore technology for ambulance fleet coordination, emergency requests and patient transportation."
    },
    "/traffic-management": {
      title: "EMSTRAP Traffic Management | Emergency Response",
      description: "Discover how EMSTRAP supports traffic coordination and emergency response route prioritisation."
    },
    "/police-departments": {
      title: "EMSTRAP for Police Departments",
      description: "Explore emergency communication and incident coordination solutions for police departments."
    },
    "/research": {
      title: "EMSTRAP Research | Emergency Response Innovation",
      description: "Explore EMSTRAP research and innovation in AI-powered emergency response technology."
    },
    "/prototype": {
      title: "EMSTRAP Prototype | Emergency Technology",
      description: "Learn about EMSTRAP prototypes and technology concepts for intelligent emergency detection and response."
    },
    "/patent": {
      title: "EMSTRAP Patent | Innovation and Technology",
      description: "Discover EMSTRAP's patented innovation and technology development in emergency response."
    },
    "/pilots": {
      title: "EMSTRAP Pilot Programmes | Emergency Response",
      description: "Learn about EMSTRAP pilot programmes and opportunities to implement emergency response solutions."
    },
    "/roadmap": {
      title: "EMSTRAP Roadmap | Product Development",
      description: "Explore the EMSTRAP product roadmap and future direction of its emergency response ecosystem."
    },
    "/launch": {
      title: "EMSTRAP Launch | Bringing Emergency Technology to Market",
      description: "Discover EMSTRAP's launch journey and plans for bringing intelligent emergency response solutions to market."
    },
    "/service-details": {
      title: "EMSTRAP Services | Emergency Response Solutions",
      description: "Explore EMSTRAP services and technology solutions for emergency communication and response coordination."
    }
  };

  useEffect(() => {
    const cleanPath = pathname
  .replace(/\.html$/, "")
  .replace(/\/$/, "") || "/";
    const seo = pageSEO[cleanPath] || pageSEO["/"];

    document.title = seo.title;

    const setMeta = (selector, attribute, value, createTag) => {
      let element = document.head.querySelector(selector);

      if (!element) {
        element = document.createElement("meta");
        Object.entries(createTag).forEach(([key, val]) => {
          element.setAttribute(key, val);
        });
        document.head.appendChild(element);
      }

      element.setAttribute(attribute, value);
    };

    setMeta('meta[name="description"]', "content", seo.description, {
      name: "description"
    });

    setMeta('meta[property="og:title"]', "content", seo.title, {
      property: "og:title"
    });

    setMeta('meta[property="og:description"]', "content", seo.description, {
      property: "og:description"
    });

    setMeta('meta[property="og:url"]', "content", `https://www.emstrap.com${cleanPath}`, {
      property: "og:url"
    });

    let canonical = document.head.querySelector('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", `https://www.emstrap.com${cleanPath === "/" ? "/" : cleanPath}`);
  }, [pathname]);

  return null;
}

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.slice(1);
      const tryScroll = () => {
        const el = document.getElementById(targetId);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
          return true;
        }
        return false;
      };
      if (!tryScroll()) {
        const t = setTimeout(tryScroll, 80);
        return () => clearTimeout(t);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function RouteFallback() {
  return <div className="min-h-screen bg-[#050B14]" aria-hidden="true" />;
}

function AppRoutes() {
  const { pathname } = useLocation();
  return (
    <ErrorBoundary resetKey={pathname}>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/index.html" element={<HomePage />} />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/about.html" element={<AboutPage />} />

          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers.html" element={<CareersPage />} />

          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact.html" element={<ContactPage />} />

          <Route path="/connect" element={<ConnectPage />} />
          <Route path="/connect.html" element={<ConnectPage />} />

          <Route path="/ride" element={<RidePage />} />
          <Route path="/ride.html" element={<RidePage />} />

          <Route path="/shield" element={<ShieldPage />} />
          <Route path="/shield.html" element={<ShieldPage />} />

          <Route path="/command" element={<CommandPage />} />
          <Route path="/command.html" element={<CommandPage />} />

          <Route path="/corporate-companies" element={<CorporateCompaniesPage />} />
          <Route path="/corporate-companies.html" element={<CorporateCompaniesPage />} />

          <Route path="/hospitals-and-clinics" element={<HospitalsAndClinicsPage />} />
          <Route path="/hospitals-and-clinics.html" element={<HospitalsAndClinicsPage />} />

          <Route path="/educational-campuses" element={<EducationalCampusesPage />} />
          <Route path="/educational-campuses.html" element={<EducationalCampusesPage />} />

          <Route path="/smart-cities" element={<SmartCitiesPage />} />
          <Route path="/smart-cities.html" element={<SmartCitiesPage />} />

          <Route path="/government-agencies" element={<GovernmentAgenciesPage />} />
          <Route path="/government-agencies.html" element={<GovernmentAgenciesPage />} />

          <Route path="/ambulance-providers" element={<AmbulanceProvidersPage />} />
          <Route path="/ambulance-providers.html" element={<AmbulanceProvidersPage />} />

          <Route path="/traffic-management" element={<TrafficManagementPage />} />
          <Route path="/traffic-management.html" element={<TrafficManagementPage />} />

          <Route path="/police-departments" element={<PoliceDepartmentsPage />} />
          <Route path="/police-departments.html" element={<PoliceDepartmentsPage />} />

          <Route path="/research" element={<ResearchPage />} />
          <Route path="/research.html" element={<ResearchPage />} />

          <Route path="/prototype" element={<PrototypePage />} />
          <Route path="/prototype.html" element={<PrototypePage />} />

          <Route path="/patent" element={<PatentPage />} />
          <Route path="/patent.html" element={<PatentPage />} />

          <Route path="/pilots" element={<PilotsPage />} />
          <Route path="/pilots.html" element={<PilotsPage />} />

          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/roadmap.html" element={<RoadmapPage />} />

          <Route path="/launch" element={<LaunchPage />} />
          <Route path="/launch.html" element={<LaunchPage />} />

          <Route path="/service-details" element={<ServiceDetailsPage />} />
          <Route path="/service-details.html" element={<ServiceDetailsPage />} />

          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SEOManager />
      <ScrollManager />
      <AppRoutes />
    </BrowserRouter>
  );
}
