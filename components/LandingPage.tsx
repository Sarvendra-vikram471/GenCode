import React, { useState } from 'react';
import { AuthModal } from './AuthModal';
import { User } from '../types';
import ZeroCodeLogo from '../images/ZeroCode_logo.png';
import { authService } from '../services/authService';

interface LandingPageProps {
  onAuthenticated: (authState: AuthState) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onAuthenticated }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (credentials: any) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      const response = await authService.login(credentials);
      authService.saveAuthData(response);
      onAuthenticated({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error: any) {
      setAuthError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (credentials: any) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      const response = await authService.signup(credentials);
      authService.saveAuthData(response);
      onAuthenticated({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error: any) {
      setAuthError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: "🚀",
      title: "Instant Development",
      description: "Build complete web applications in minutes, not hours"
    },
    {
      icon: "🎨",
      title: "Beautiful Design",
      description: "AI-generated modern, responsive designs that look professional"
    },
    {
      icon: "⚡",
      title: "Real-time Preview",
      description: "See your changes instantly with live preview and hot reload"
    },
    {
      icon: "📱",
      title: "Mobile Ready",
      description: "All generated code is mobile-responsive by default"
    },
    {
      icon: "🔧",
      title: "Full Control",
      description: "Download and customize your code however you want"
    },
    {
      icon: "🛡️",
      title: "Secure & Private",
      description: "Your data stays private with enterprise-grade security"
    }
  ];

  const examples = [
    "Create a modern e-commerce website with shopping cart",
    "Build a portfolio website with animations and contact form",
    "Design a restaurant website with menu and online ordering",
    "Make a blog with dark mode and search functionality",
    "Create a dashboard for data visualization",
    "Build a landing page for a SaaS product"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center space-x-3">
          <img src={ZeroCodeLogo} alt="ZeroCode" className="h-10 w-auto" />
          <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
            ZeroCode
          </span>
        </div>
        <button
          onClick={() => setShowAuthModal(true)}
          className="px-6 py-2 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 text-center px-6 py-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-teal-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Build Websites
          </span>
          <br />
          <span className="text-white">Without Code</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Transform your ideas into stunning websites instantly. 
          <span className="text-teal-400 font-semibold"> No coding required.</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            onClick={() => setShowAuthModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl text-lg"
          >
            Start Building Now
          </button>
          <button className="px-8 py-4 border-2 border-gray-600 text-gray-300 font-semibold rounded-xl hover:border-teal-500 hover:text-teal-400 transition-all duration-300 text-lg">
            Watch Demo
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
          <div className="text-center">
            <div className="text-4xl font-bold text-teal-400 mb-2">10,000+</div>
            <div className="text-gray-400">Websites Built</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">5 Minutes</div>
            <div className="text-gray-400">Average Build Time</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-pink-400 mb-2">99.9%</div>
            <div className="text-gray-400">Uptime</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 px-6 py-20 bg-black bg-opacity-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Why Choose <span className="text-teal-400">ZeroCode</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-5 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-10 hover:border-opacity-30 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Examples Section */}
      <div className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            What Can You <span className="text-purple-400">Build</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Just describe what you want, and watch it come to life
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {examples.map((example, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-4 text-left hover:from-gray-700 hover:to-gray-600 transition-all duration-300 cursor-pointer"
              >
                <p className="text-gray-300">"{example}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mb-16">
        <button
          onClick={() => setShowAuthModal(true)}
          className="bg-gradient-to-r from-teal-500 to-purple-600 text-white font-bold py-4 px-8 rounded-full text-lg hover:from-teal-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          🚀 Get Started Free
        </button>
        <p className="text-brand-subtle-text mt-4 text-sm">
          No credit card required • Start building in seconds
        </p>
      </div>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <img src="/images/ZeroCode_symbol.png" alt="ZeroCode" className="h-8 w-8" />
            <span className="text-xl font-bold text-white">ZeroCode</span>
          </div>
          <p className="text-gray-400 mb-6">
            © 2024 ZeroCode. All rights reserved. Built with ❤️ for creators.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Support</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
        isLoading={isLoading}
        error={authError}
      />
    </div>
  );
};
