import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = () => {
  const [showEmergencyConfirm, setShowEmergencyConfirm] = useState(false);

  const quickActions = [
    {
      id: 'create-election',
      title: 'Create New Election',
      description: 'Set up a new election with ballot configuration',
      icon: 'Plus',
      variant: 'default',
      action: () => console.log('Navigate to election creation'),
      requiresAuth: false
    },
    {
      id: 'manage-ballots',
      title: 'Manage Ballots',
      description: 'Design and configure election ballots',
      icon: 'FileText',
      variant: 'outline',
      action: () => console.log('Navigate to ballot management'),
      requiresAuth: false
    },
    {
      id: 'voter-verification',
      title: 'Voter Verification',
      description: 'Review and approve pending voter registrations',
      icon: 'UserCheck',
      variant: 'outline',
      action: () => console.log('Navigate to voter verification'),
      requiresAuth: false
    },
    {
      id: 'system-backup',
      title: 'System Backup',
      description: 'Create manual backup of election data',
      icon: 'Download',
      variant: 'secondary',
      action: () => console.log('Initiate system backup'),
      requiresAuth: true
    },
    {
      id: 'audit-report',
      title: 'Generate Audit Report',
      description: 'Create comprehensive audit trail report',
      icon: 'FileSearch',
      variant: 'secondary',
      action: () => console.log('Generate audit report'),
      requiresAuth: true
    },
    {
      id: 'emergency-stop',
      title: 'Emergency Stop',
      description: 'Immediately suspend all active elections',
      icon: 'AlertTriangle',
      variant: 'destructive',
      action: () => setShowEmergencyConfirm(true),
      requiresAuth: true
    }
  ];

  const systemStatus = {
    electionsActive: 2,
    systemLoad: 67,
    lastBackup: "2024-07-18T06:00:00",
    securityStatus: "secure"
  };

  const handleEmergencyStop = () => {
    console.log('Emergency stop initiated');
    setShowEmergencyConfirm(false);
    // This would trigger emergency protocols
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-surface border civic-border rounded-lg civic-shadow-sm">
      <div className="p-6 border-b civic-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-heading font-bold text-text-primary">Quick Actions</h2>
            <p className="text-sm text-text-secondary font-caption mt-1">
              Common administrative tasks
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-xs text-text-secondary">
              <Icon name="Activity" size={14} color="var(--color-success)" />
              <span className="font-caption">System Operational</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* System Status Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="text-lg font-mono font-bold text-primary">
              {systemStatus.electionsActive}
            </div>
            <div className="text-xs text-primary font-caption">Active Elections</div>
          </div>

          <div className="text-center p-3 bg-success/10 border border-success/20 rounded-lg">
            <div className="text-lg font-mono font-bold text-success">
              {systemStatus.systemLoad}%
            </div>
            <div className="text-xs text-success font-caption">System Load</div>
          </div>

          <div className="text-center p-3 bg-muted/10 border border-muted/20 rounded-lg">
            <div className="text-lg font-mono font-bold text-text-primary">
              {formatDate(systemStatus.lastBackup).split(',')[0]}
            </div>
            <div className="text-xs text-text-secondary font-caption">Last Backup</div>
          </div>

          <div className="text-center p-3 bg-success/10 border border-success/20 rounded-lg">
            <div className="text-lg font-mono font-bold text-success">
              Secure
            </div>
            <div className="text-xs text-success font-caption">Security Status</div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <div
              key={action.id}
              className="flex items-center space-x-4 p-4 border civic-border rounded-lg hover:bg-muted/30 civic-transition"
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                action.variant === 'destructive' ?'bg-error/10' 
                  : action.variant === 'default' ?'bg-primary/10' :'bg-muted/50'
              }`}>
                <Icon
                  name={action.icon}
                  size={24}
                  color={
                    action.variant === 'destructive' ?'var(--color-error)' 
                      : action.variant === 'default' ?'var(--color-primary)' :'var(--color-text-primary)'
                  }
                />
              </div>
              
              <div className="flex-1">
                <h3 className="font-body font-semibold text-text-primary">
                  {action.title}
                </h3>
                <p className="text-sm text-text-secondary font-caption">
                  {action.description}
                </p>
              </div>
              
              <Button
                variant={action.variant}
                size="sm"
                onClick={action.action}
                iconName="ChevronRight"
                iconPosition="right"
              >
                {action.variant === 'destructive' ? 'Execute' : 'Go'}
              </Button>
            </div>
          ))}
        </div>

        {/* Emergency Confirmation Modal */}
        {showEmergencyConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1300">
            <div className="bg-surface border civic-border rounded-lg civic-shadow-md p-6 max-w-md mx-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-error/10">
                  <Icon name="AlertTriangle" size={24} color="var(--color-error)" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-text-primary">
                    Emergency Stop Confirmation
                  </h3>
                  <p className="text-sm text-text-secondary font-caption">
                    This action cannot be undone
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-text-primary font-caption mb-4">
                  Are you sure you want to immediately suspend all active elections? This will:
                </p>
                <ul className="text-sm text-text-secondary font-caption space-y-1 ml-4">
                  <li>• Stop all voting activities immediately</li>
                  <li>• Lock all ballot submissions</li>
                  <li>• Notify all administrators</li>
                  <li>• Generate emergency audit logs</li>
                </ul>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="destructive"
                  onClick={handleEmergencyStop}
                  iconName="AlertTriangle"
                  iconPosition="left"
                >
                  Confirm Emergency Stop
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowEmergencyConfirm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickActionsPanel;