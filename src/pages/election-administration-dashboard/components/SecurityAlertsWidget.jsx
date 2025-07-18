import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SecurityAlertsWidget = () => {
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  const securityMetrics = {
    totalAlerts: 0,
    criticalAlerts: 0,
    warningAlerts: 0,
    infoAlerts: 0,
    resolvedToday: 3,
    systemStatus: 'secure'
  };

  const recentAlerts = [
    {
      id: 1,
      type: "Login Attempt",
      severity: "info",
      message: "Multiple successful admin logins from verified IP addresses",
      timestamp: "2024-07-18T14:30:00",
      status: "resolved",
      source: "Authentication System",
      details: "5 successful logins from whitelisted IPs in the last hour"
    },
    {
      id: 2,
      type: "System Update",
      severity: "info",
      message: "Security patches applied successfully",
      timestamp: "2024-07-18T12:15:00",
      status: "resolved",
      source: "System Maintenance",
      details: "All security updates installed without issues"
    },
    {
      id: 3,
      type: "Backup Verification",
      severity: "info",
      message: "Daily backup verification completed successfully",
      timestamp: "2024-07-18T06:00:00",
      status: "resolved",
      source: "Backup System",
      details: "All election data backups verified and secure"
    }
  ];

  const securityFeatures = [
    {
      name: "SSL Encryption",
      status: "active",
      description: "256-bit SSL encryption for all data transmission",
      icon: "Shield"
    },
    {
      name: "Multi-Factor Authentication",
      status: "active",
      description: "Required for all administrative accounts",
      icon: "Key"
    },
    {
      name: "Intrusion Detection",
      status: "active",
      description: "Real-time monitoring for suspicious activities",
      icon: "Search"
    },
    {
      name: "Data Encryption",
      status: "active",
      description: "End-to-end encryption for all ballot data",
      icon: "Lock"
    },
    {
      name: "Audit Logging",
      status: "active",
      description: "Comprehensive logging of all system activities",
      icon: "FileText"
    },
    {
      name: "Access Control",
      status: "active",
      description: "Role-based permissions and access restrictions",
      icon: "Users"
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'primary';
      default:
        return 'muted';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return 'AlertTriangle';
      case 'warning':
        return 'AlertCircle';
      case 'info':
        return 'Info';
      default:
        return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'resolved':
        return 'success';
      case 'pending':
        return 'warning';
      default:
        return 'muted';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const severityFilters = [
    { value: 'all', label: 'All Alerts' },
    { value: 'critical', label: 'Critical' },
    { value: 'warning', label: 'Warning' },
    { value: 'info', label: 'Info' }
  ];

  const filteredAlerts = recentAlerts.filter(alert => 
    selectedSeverity === 'all' || alert.severity === selectedSeverity
  );

  return (
    <div className="bg-surface border civic-border rounded-lg civic-shadow-sm">
      <div className="p-6 border-b civic-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-heading font-bold text-text-primary">Security Monitoring</h2>
            <p className="text-sm text-text-secondary font-caption mt-1">
              System security status and alerts
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 px-3 py-1 bg-success/10 rounded-full">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-caption text-success">All Systems Secure</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Security Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-success/10 border border-success/20 rounded-lg">
            <div className="text-2xl font-mono font-bold text-success">
              {securityMetrics.totalAlerts}
            </div>
            <div className="text-sm text-success font-caption">Active Alerts</div>
          </div>

          <div className="text-center p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="text-2xl font-mono font-bold text-error">
              {securityMetrics.criticalAlerts}
            </div>
            <div className="text-sm text-error font-caption">Critical</div>
          </div>

          <div className="text-center p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="text-2xl font-mono font-bold text-warning">
              {securityMetrics.warningAlerts}
            </div>
            <div className="text-sm text-warning font-caption">Warnings</div>
          </div>

          <div className="text-center p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="text-2xl font-mono font-bold text-primary">
              {securityMetrics.resolvedToday}
            </div>
            <div className="text-sm text-primary font-caption">Resolved Today</div>
          </div>
        </div>

        {/* Security Features Status */}
        <div className="mb-6">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
            Security Features
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {securityFeatures.map((feature) => (
              <div
                key={feature.name}
                className="flex items-center space-x-3 p-4 border civic-border rounded-lg"
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-${getStatusColor(feature.status)}/10`}>
                  <Icon
                    name={feature.icon}
                    size={20}
                    color={`var(--color-${getStatusColor(feature.status)})`}
                  />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-body font-semibold text-text-primary">
                    {feature.name}
                  </h4>
                  <p className="text-sm text-text-secondary font-caption">
                    {feature.description}
                  </p>
                </div>
                
                <div className={`px-2 py-1 text-xs rounded-full font-caption bg-${getStatusColor(feature.status)}/10 text-${getStatusColor(feature.status)}`}>
                  {feature.status.charAt(0).toUpperCase() + feature.status.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alert Filters */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm font-caption text-text-secondary">Filter by severity:</span>
          {severityFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedSeverity(filter.value)}
              className={`px-3 py-1 text-sm font-caption rounded-md civic-transition ${
                selectedSeverity === filter.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Recent Alerts */}
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
            Recent Activity
          </h3>
          
          {filteredAlerts.length > 0 ? (
            <div className="space-y-3">
              {filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start space-x-4 p-4 border civic-border rounded-lg"
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-${getSeverityColor(alert.severity)}/10 flex-shrink-0`}>
                    <Icon
                      name={getSeverityIcon(alert.severity)}
                      size={20}
                      color={`var(--color-${getSeverityColor(alert.severity)})`}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-body font-semibold text-text-primary">
                        {alert.type}
                      </h4>
                      <span className="text-sm text-text-secondary font-caption">
                        {formatDate(alert.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-text-primary font-caption mt-1">
                      {alert.message}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-4">
                        <span className="text-xs text-text-secondary font-caption">
                          Source: {alert.source}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full font-caption bg-${getStatusColor(alert.status)}/10 text-${getStatusColor(alert.status)}`}>
                          {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                        </span>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => console.log('View alert details', alert.id)}
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Icon name="Shield" size={48} className="mx-auto text-success mb-4" />
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                All Clear
              </h3>
              <p className="text-text-secondary font-caption">
                No security alerts at this time. System is operating normally.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityAlertsWidget;