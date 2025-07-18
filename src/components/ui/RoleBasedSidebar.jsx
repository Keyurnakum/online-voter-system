import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const RoleBasedSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();
  const userRole = 'admin'; // This would come from auth context

  // Only render sidebar for admin users
  if (userRole !== 'admin') {
    return null;
  }

  const adminNavigationItems = [
    {
      label: 'Dashboard Overview',
      path: '/election-administration-dashboard',
      icon: 'LayoutDashboard',
      description: 'Main administrative control center',
      badge: null
    },
    {
      label: 'Election Management',
      path: '/election-administration-dashboard',
      icon: 'Calendar',
      description: 'Create and manage elections',
      badge: '3 Active'
    },
    {
      label: 'Ballot Configuration',
      path: '/ballot-design-configuration',
      icon: 'FileText',
      description: 'Design and configure ballots',
      badge: null
    },
    {
      label: 'Voter Management',
      path: '/election-administration-dashboard',
      icon: 'Users',
      description: 'Manage voter registrations',
      badge: '1,247'
    },
    {
      label: 'Results & Analytics',
      path: '/election-results-analytics',
      icon: 'BarChart3',
      description: 'View comprehensive election data',
      badge: null
    },
    {
      label: 'Security Monitoring',
      path: '/election-administration-dashboard',
      icon: 'Shield',
      description: 'Monitor system security',
      badge: 'All Clear'
    },
    {
      label: 'Audit Logs',
      path: '/election-administration-dashboard',
      icon: 'FileSearch',
      description: 'Review system audit trails',
      badge: null
    },
    {
      label: 'System Settings',
      path: '/election-administration-dashboard',
      icon: 'Settings',
      description: 'Configure system parameters',
      badge: null
    }
  ];

  const quickActions = [
    {
      label: 'Create Election',
      icon: 'Plus',
      action: () => console.log('Create election'),
      variant: 'default'
    },
    {
      label: 'Emergency Stop',
      icon: 'AlertTriangle',
      action: () => console.log('Emergency stop'),
      variant: 'destructive'
    }
  ];

  const isActivePath = (path) => location.pathname === path;

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 z-1000 bg-surface border-r civic-border civic-shadow-sm transition-all duration-300 ${
        isExpanded ? 'w-80' : 'w-16'
      } lg:block hidden`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b civic-border">
          {isExpanded && (
            <div>
              <h2 className="font-heading font-semibold text-primary">Administration</h2>
              <p className="text-sm text-text-secondary font-caption">Election Management</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="ml-auto"
          >
            <Icon name={isExpanded ? "ChevronLeft" : "ChevronRight"} size={18} />
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {adminNavigationItems.map((item) => (
            <Link
              key={item.path + item.label}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-3 rounded-md civic-transition group ${
                isActivePath(item.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-primary hover:bg-muted hover:text-primary'
              }`}
            >
              <Icon name={item.icon} size={20} className="flex-shrink-0" />
              
              {isExpanded && (
                <>
                  <div className="flex-1 min-w-0">
                    <div className="font-body font-normal truncate">{item.label}</div>
                    <div className="text-xs opacity-75 font-caption truncate">{item.description}</div>
                  </div>
                  
                  {item.badge && (
                    <span className={`text-xs px-2 py-1 rounded-full font-caption flex-shrink-0 ${
                      isActivePath(item.path)
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'bg-muted text-text-secondary'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          ))}
        </nav>

        {/* Quick Actions */}
        {isExpanded && (
          <div className="p-4 border-t civic-border">
            <h3 className="font-heading font-semibold text-sm text-text-primary mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant={action.variant}
                  size="sm"
                  fullWidth
                  onClick={action.action}
                  iconName={action.icon}
                  iconPosition="left"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* System Status */}
        {isExpanded && (
          <div className="p-4 border-t civic-border">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="font-caption text-success">System Operational</span>
            </div>
            <div className="text-xs text-text-secondary font-mono mt-1">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden">
        {/* Mobile sidebar would be implemented here with slide-out drawer pattern */}
        {/* This would typically use a modal/drawer component for mobile */}
      </div>
    </>
  );
};

export default RoleBasedSidebar;