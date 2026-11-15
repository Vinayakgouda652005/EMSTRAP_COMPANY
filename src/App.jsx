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
      <ScrollManager />
      <AppRoutes />
    </BrowserRouter>
  );
}
