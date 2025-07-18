import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import ElectionStatusIndicator from '../../components/ui/ElectionStatusIndicator';
import SecurityBadgeCluster from '../../components/ui/SecurityBadgeCluster';
import ElectionOverviewWidget from './components/ElectionOverviewWidget';
import RealTimeMonitoringWidget from './components/RealTimeMonitoringWidget';
import VoterManagementWidget from './components/VoterManagementWidget';
import SecurityAlertsWidget from './components/SecurityAlertsWidget';
import QuickActionsPanel from './components/QuickActionsPanel';
import AuditTrailWidget from './components/AuditTrailWidget';
import Icon from '../../components/AppIcon';

const ElectionAdministrationDashboard = () => {
  const [activeWidget, setActiveWidget] = useState('overview');
  const [dashboardLayout, setDashboardLayout] = useState('grid');

  const widgets = [
    {
      id: 'overview',
      title: 'Election Overview',
      icon: 'LayoutDashboard',
      component: ElectionOverviewWidget,
      description: 'Manage active, upcoming, and completed elections'
    },
    {
      id: 'monitoring',
      title: 'Real-Time Monitoring',
      icon: 'Activity',
      component: RealTimeMonitoringWidget,
      description: 'Live system performance and voting activity'
    },
    {
      id: 'voters',
      title: 'Voter Management',
      icon: 'Users',
      component: VoterManagementWidget,
      description: 'Registration oversight and verification'
    },
    {
      id: 'security',
      title: 'Security Monitoring',
      icon: 'Shield',
      component: SecurityAlertsWidget,
      description: 'System security status and alerts'
    },
    {
      id: 'actions',
      title: 'Quick Actions',
      icon: 'Zap',
      component: QuickActionsPanel,
      description: 'Common administrative tasks'
    },
    {
      id: 'audit',
      title: 'Audit Trail',
      icon: 'FileSearch',
      component: AuditTrailWidget,
      description: 'System activity and security logs'
    }
  ];

  const layoutOptions = [
    { value: 'grid', label: 'Grid View', icon: 'Grid3X3' },
    { value: 'list', label: 'List View', icon: 'List' },
    { value: 'focus', label: 'Focus Mode', icon: 'Maximize' }
  ];

  const currentTime = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const ActiveWidgetComponent = widgets.find(w => w.id === activeWidget)?.component || ElectionOverviewWidget;

  return (
    <>
      <Helmet>
        <title>Election Administration Dashboard - VoteSecure</title>
        <meta name="description" content="Comprehensive election administration control center for managing digital elections, voter oversight, and system monitoring." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <AuthenticatedHeader />
        <RoleBasedSidebar />
        
        <main className="lg:ml-80 pt-16">
          <div className="p-6">
            {/* Dashboard Header */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-heading font-bold text-text-primary">
                    Election Administration Dashboard
                  </h1>
                  <p className="text-text-secondary font-caption mt-2">
                    {currentTime}
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <SecurityBadgeCluster />
                  <ElectionStatusIndicator />
                </div>
              </div>
            </div>

            {/* Dashboard Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              {/* Widget Navigation */}
              <div className="flex flex-wrap gap-2">
                {widgets.map((widget) => (
                  <button
                    key={widget.id}
                    onClick={() => setActiveWidget(widget.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg civic-transition ${
                      activeWidget === widget.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-surface text-text-secondary hover:text-text-primary hover:bg-muted border civic-border'
                    }`}
                  >
                    <Icon name={widget.icon} size={16} />
                    <span className="font-caption">{widget.title}</span>
                  </button>
                ))}
              </div>

              {/* Layout Controls */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-caption text-text-secondary">Layout:</span>
                {layoutOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setDashboardLayout(option.value)}
                    className={`flex items-center space-x-1 px-3 py-2 text-sm font-caption rounded-md civic-transition ${
                      dashboardLayout === option.value
                        ? 'bg-secondary text-secondary-foreground'
                        : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                    }`}
                  >
                    <Icon name={option.icon} size={14} />
                    <span className="hidden sm:inline">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dashboard Content */}
            {dashboardLayout === 'grid' && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="xl:col-span-2">
                  <ElectionOverviewWidget />
                </div>
                <div>
                  <RealTimeMonitoringWidget />
                </div>
                <div>
                  <VoterManagementWidget />
                </div>
                <div>
                  <SecurityAlertsWidget />
                </div>
                <div>
                  <QuickActionsPanel />
                </div>
                <div className="xl:col-span-2">
                  <AuditTrailWidget />
                </div>
              </div>
            )}

            {dashboardLayout === 'list' && (
              <div className="space-y-6">
                <ElectionOverviewWidget />
                <RealTimeMonitoringWidget />
                <VoterManagementWidget />
                <SecurityAlertsWidget />
                <QuickActionsPanel />
                <AuditTrailWidget />
              </div>
            )}

            {dashboardLayout === 'focus' && (
              <div className="max-w-6xl mx-auto">
                <div className="mb-6 p-4 bg-surface border civic-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={widgets.find(w => w.id === activeWidget)?.icon || 'LayoutDashboard'} 
                      size={20} 
                      className="text-primary"
                    />
                    <div>
                      <h2 className="font-heading font-semibold text-text-primary">
                        {widgets.find(w => w.id === activeWidget)?.title}
                      </h2>
                      <p className="text-sm text-text-secondary font-caption">
                        {widgets.find(w => w.id === activeWidget)?.description}
                      </p>
                    </div>
                  </div>
                </div>
                <ActiveWidgetComponent />
              </div>
            )}

            {/* System Status Footer */}
            <div className="mt-8 pt-6 border-t civic-border">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-text-secondary">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="font-caption">System Operational</span>
                  </div>
                  <span className="font-caption">
                    Last updated: {new Date().toLocaleTimeString()}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="font-caption">
                    © {new Date().getFullYear()} VoteSecure - Secure Digital Voting Platform
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ElectionAdministrationDashboard;