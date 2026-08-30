import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary caught an exception:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] bg-[#101820] text-white flex flex-col items-center justify-center p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-[#FEE715]/10 text-[#FEE715] border border-[#FEE715]/30 rounded-2xl flex items-center justify-center font-bold text-2xl">
            ⚡
          </div>
          <h2 className="text-2xl font-extrabold font-display text-white">Something went wrong</h2>
          <p className="text-xs text-gray-400 max-w-md">
            We encountered a temporary rendering issue loading this page route.
          </p>
          <div className="pt-2 flex gap-4">
            <a
              href="/"
              className="px-6 py-2.5 bg-[#FEE715] text-[#101820] font-bold text-xs rounded-xl shadow-yellowGlow"
            >
              Return Home
            </a>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-gray-800 text-white font-bold text-xs rounded-xl border border-gray-700 hover:bg-gray-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
