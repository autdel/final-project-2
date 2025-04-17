import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

/* I used Claude here to help me structure the following class and
   make my previous error boundary more robust / useful. 
   I was hoping to have a more integrated way to handle and get specific 
   info about errors, but I ran out of time, so I just logged problems */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('Error in the application: ', error, errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <div className='min-h-screen flex items-center justify-center p-4'>
                    <div className='max-w-md w-full shadow-lg rounded-lg p-8 text-center'>
                        <div className='inline-flex items-center justify-center w-16 h-16 rounded-full mb-6'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-red-600 dark:text-red-400">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className='text-2xl font-bold mb-4'>
                            Oh no! Something went wrong...
                        </h2>
                        <p className='text-neutral-600 dark:text-neutral-300 mb-6'>
                            Try refreshing the page. Come back later if the problem persists.
                        </p>
                        <button onClick={() => window.location.reload()} className='px-4 py-2 transition-colors'>
                            Refresh This Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;