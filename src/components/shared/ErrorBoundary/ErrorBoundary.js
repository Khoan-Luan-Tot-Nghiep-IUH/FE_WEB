import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload(); // Reload page functionality
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
          <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-lg">
            <img 
              src="/error-image.svg" 
              alt="Error illustration" 
              className="w-24 h-24 mx-auto mb-6"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Oops! Something went wrong.</h2>
            <p className="text-gray-600 mb-6">
              We are sorry, but something went wrong. Please try again later.
            </p>
            <div className="flex space-x-4 justify-center">
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none"
                onClick={this.handleReload}
              >
                Reload Page
              </button>
              <Link 
                to="/" 
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg focus:outline-none"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
