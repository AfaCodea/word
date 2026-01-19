'use client';

import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log to error reporting service
        console.error('Error Boundary caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                    <div className="max-w-md">
                        <div className="mb-4">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-4">
                                <svg
                                    className="w-8 h-8 text-red-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-white mb-2">
                            Oops! Something went wrong
                        </h2>

                        <p className="text-slate-400 mb-6">
                            {this.state.error?.message || 'An unexpected error occurred'}
                        </p>

                        <button
                            onClick={() => {
                                this.setState({ hasError: false, error: undefined });
                                window.location.reload();
                            }}
                            className="px-6 py-3 bg-neon-blue text-deep-bg font-semibold rounded-lg hover:bg-neon-blue/90 transition-colors focus:ring-2 focus:ring-neon-blue focus:ring-offset-2 focus:ring-offset-deep-bg focus:outline-none"
                        >
                            Reload Page
                        </button>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mt-6 text-left">
                                <summary className="cursor-pointer text-sm text-slate-500 hover:text-slate-400">
                                    Error Details (Dev Only)
                                </summary>
                                <pre className="mt-2 p-4 bg-slate-900/50 rounded-lg text-xs text-red-400 overflow-auto">
                                    {this.state.error.stack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
