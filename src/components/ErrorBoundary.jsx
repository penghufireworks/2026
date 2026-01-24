import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">糟糕！頁面發生了一些錯誤。</h1>
          <p className="text-slate-600 mb-6">我們正在搶修中，請嘗試重新整理頁面。</p>
          <pre className="bg-slate-200 p-4 rounded text-xs text-left overflow-auto max-w-lg mb-6">
            {this.state.error?.toString()}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            className="bg-ocean-blue text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600"
          >
            重新整理
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
