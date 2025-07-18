import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import SecurityBadges from './components/SecurityBadges';
import HelpSidebar from './components/HelpSidebar';

const VoterRegistrationLogin = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('selectedLanguage', language);
  };

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal Header */}
      <header className="bg-surface border-b civic-border civic-shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Icon name="Shield" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-xl font-heading font-bold text-primary">VoteSecure</h1>
                <p className="text-xs font-caption text-text-secondary">Secure Digital Voting</p>
              </div>
            </Link>

            {/* Language Selector */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select
                  value={currentLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="appearance-none bg-surface border civic-border rounded-md px-3 py-2 pr-8 text-sm font-caption text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.label}
                    </option>
                  ))}
                </select>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form Area */}
            <div className="lg:col-span-2">
              <div className="max-w-md mx-auto lg:mx-0">
                {/* Page Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-heading font-bold text-text-primary mb-2">
                    Secure Voter Access
                  </h2>
                  <p className="text-text-secondary font-caption">
                    Register to vote or sign in to access your voter dashboard and participate in elections.
                  </p>
                </div>

                {/* Auth Tabs */}
                <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />

                {/* Form Content */}
                <div className="bg-surface rounded-lg civic-shadow-md p-6">
                  {activeTab === 'login' ? <LoginForm /> : <RegistrationForm />}
                </div>

                {/* Security Badges */}
                <SecurityBadges />

                {/* Additional Links */}
                <div className="mt-8 text-center space-y-2">
                  <div className="flex items-center justify-center space-x-4 text-sm font-caption text-text-secondary">
                    <Link to="/privacy-policy" className="hover:text-primary civic-transition">
                      Privacy Policy
                    </Link>
                    <span>•</span>
                    <Link to="/terms-of-service" className="hover:text-primary civic-transition">
                      Terms of Service
                    </Link>
                    <span>•</span>
                    <Link to="/accessibility" className="hover:text-primary civic-transition">
                      Accessibility
                    </Link>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2 text-xs text-text-secondary">
                    <Icon name="Clock" size={12} />
                    <span className="font-caption">
                      System last updated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Sidebar - Desktop Only */}
            <div className="hidden lg:block">
              <HelpSidebar />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Help Section */}
      <div className="lg:hidden bg-surface border-t civic-border">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="text-center mb-4">
            <h3 className="font-heading font-semibold text-text-primary mb-2">Need Help?</h3>
            <p className="text-sm font-caption text-text-secondary">
              Get assistance with registration or login issues
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <button className="flex flex-col items-center space-y-2 p-3 bg-muted/50 rounded-md hover:bg-muted civic-transition">
              <Icon name="Phone" size={20} color="var(--color-primary)" />
              <span className="text-xs font-caption text-text-primary">Call</span>
            </button>
            
            <button className="flex flex-col items-center space-y-2 p-3 bg-muted/50 rounded-md hover:bg-muted civic-transition">
              <Icon name="Mail" size={20} color="var(--color-primary)" />
              <span className="text-xs font-caption text-text-primary">Email</span>
            </button>
            
            <button className="flex flex-col items-center space-y-2 p-3 bg-muted/50 rounded-md hover:bg-muted civic-transition">
              <Icon name="MessageCircle" size={20} color="var(--color-primary)" />
              <span className="text-xs font-caption text-text-primary">Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-surface border-t civic-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} color="var(--color-success)" />
                <span className="text-sm font-caption text-success">Secure Platform</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                <span className="text-sm font-caption text-success">FEC Certified</span>
              </div>
            </div>
            
            <div className="text-sm font-caption text-text-secondary">
              © {new Date().getFullYear()} VoteSecure. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VoterRegistrationLogin;