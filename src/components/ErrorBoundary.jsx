import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(prevProps) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error("EMSTRAP UI boundary caught an error:", error, errorInfo);
    }
  }

  handleRecover = () => {
    this.setState({ hasError: false });
    if (typeof window !== "undefined") {
      window.location.assign("/");
    }
  };

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050B14] text-slate-100 flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full rounded-3xl bg-slate-900/90 border border-white/10 p-8 text-center shadow-2xl space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto text-2xl">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <h2 className="text-2xl font-bold font-display text-white">
              Something went wrong
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              An unexpected error occurred while displaying this section. Your session remains safe.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleRetry}
                className="flex-1 py-3 px-5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Try Again
              </button>
              <button
                type="button"
                onClick={this.handleRecover}
                className="flex-1 py-3 px-5 rounded-full bg-[#2C64A1] hover:bg-[#1E4976] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
