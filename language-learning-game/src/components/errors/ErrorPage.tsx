import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface ErrorPageProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  title = 'Something went wrong',
  message = 'We apologize for the inconvenience. Please try again later.',
  showHomeButton = false,
  showBackButton = true,
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-neutral-800 shadow-lg rounded-lg p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-red-600 dark:text-red-400">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-4">
          {title}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-300 mb-6">
          {message}
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          {showHomeButton && (
            <Link to="/" className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
              Go to Home
            </Link>
          )}
          {showBackButton && (
            <button onClick={() => navigate(-1)} className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
              Go Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;