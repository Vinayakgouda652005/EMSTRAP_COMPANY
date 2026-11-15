import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import "./index.css";

if (typeof window !== "undefined") {
  window.addEventListener("unhandledrejection", (event) => {
    if (!import.meta.env.DEV) {
      event.preventDefault();
    }
  });
}

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
