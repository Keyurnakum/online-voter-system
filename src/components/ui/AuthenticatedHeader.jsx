import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AuthenticatedHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Elections',
      path: '/voter-dashboard',
      icon: 'Vote',
      roles: ['voter', 'admin'],
      description: 'View and participate in elections'
    },
    {
      label: 'Results',
      path: '/election-results-analytics',
      icon: 'BarChart3',
      roles: ['voter', 'admin'],
      description: 'View election results and analytics'
    },
    {
      label: 'Admin Dashboard',
      path: '/election-administration-dashboard',
      icon: 'Settings',
      roles: ['admin'],
      description: 'Election administration tools'
    },
    {
      label: 'Ballot Builder',
      path: '/ballot-design-configuration',
      icon: 'FileText',
      roles: ['admin'],
      description: 'Design and configure ballots'
    },
    {
      label: 'Account',
      path: '/voter-registration-login',
      icon: 'User',
      roles: ['voter', 'admin'],
      description: 'Manage your account'
    }
  ];

  const userRole = 'voter'; // This would come from auth context
  const activeElections = 2; // This would come from election context

  const filteredNavItems = navigationItems.filter(item => 
    item.roles.includes(userRole)
  );

  const isActivePath = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    // Logout logic would go here
    console.log('Logging out...');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-surface border-b civic-border civic-shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/voter-dashboard" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="Shield" size={24} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-heading font-bold text-primary">VoteSecure</h1>
              <p className="text-xs font-caption text-text-secondary">Secure Digital Voting</p>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {filteredNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md civic-transition ${
                isActivePath(item.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-primary hover:bg-muted hover:text-primary'
              }`}
            >
              <Icon name={item.icon} size={18} />
              <span className="font-body font-normal">{item.label}</span>
              {item.label === 'Elections' && activeElections > 0 && (
                <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-caption">
                  {activeElections}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Security Indicators & User Actions */}
        <div className="flex items-center space-x-4">
          {/* Security Badge Cluster */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-xs text-text-secondary">
              <Icon name="Shield" size={14} color="var(--color-success)" />
              <span className="font-caption">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-text-secondary">
              <Icon name="CheckCircle" size={14} color="var(--color-success)" />
              <span className="font-caption">Certified</span>
            </div>
          </div>

          {/* Election Status Indicator */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-success/10 rounded-full">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-caption text-success">Elections Active</span>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              iconName="LogOut"
              iconPosition="left"
              className="hidden sm:flex"
            >
              Logout
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="lg:hidden"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-surface border-t civic-border civic-shadow-md">
          <nav className="px-4 py-4 space-y-2">
            {filteredNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md civic-transition ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <div className="flex-1">
                  <div className="font-body font-normal">{item.label}</div>
                  <div className="text-xs text-text-secondary font-caption">{item.description}</div>
                </div>
                {item.label === 'Elections' && activeElections > 0 && (
                  <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-caption">
                    {activeElections}
                  </span>
                )}
              </Link>
            ))}
            
            {/* Mobile Security Indicators */}
            <div className="pt-4 border-t civic-border">
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Shield" size={14} color="var(--color-success)" />
                  <span className="font-caption">SSL Secured</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="CheckCircle" size={14} color="var(--color-success)" />
                  <span className="font-caption">Gov Certified</span>
                </div>
              </div>
            </div>

            {/* Mobile Logout */}
            <div className="pt-2">
              <Button
                variant="outline"
                fullWidth
                onClick={handleLogout}
                iconName="LogOut"
                iconPosition="left"
              >
                Logout
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default AuthenticatedHeader;