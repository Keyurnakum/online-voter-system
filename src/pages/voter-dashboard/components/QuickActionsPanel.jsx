import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = () => {
  const quickActions = [
    {
      title: 'Update Profile',
      description: 'Manage your voter registration details',
      icon: 'User',
      color: 'primary',
      action: () => console.log('Update profile'),
      link: '/voter-registration-login'
    },
    {
      title: 'Election Results',
      description: 'View comprehensive election analytics',
      icon: 'BarChart3',
      color: 'success',
      action: () => console.log('View results'),
      link: '/election-results-analytics'
    },
    {
      title: 'Voting Guide',
      description: 'Learn about candidates and ballot measures',
      icon: 'BookOpen',
      color: 'secondary',
      action: () => console.log('Open voting guide'),
      link: '#'
    },
    {
      title: 'Help & Support',
      description: 'Get assistance with voting process',
      icon: 'HelpCircle',
      color: 'warning',
      action: () => console.log('Open help'),
      link: '#'
    }
  ];

  const systemStatus = {
    status: 'operational',
    message: 'All systems operational',
    lastCheck: new Date().toLocaleTimeString()
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-card border civic-border rounded-lg civic-shadow-sm">
        <div className="p-4 border-b civic-border">
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={20} color="var(--color-primary)" />
            <h3 className="font-heading font-semibold text-text-primary">
              Quick Actions
            </h3>
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <div key={index}>
                {action.link && action.link !== '#' ? (
                  <Link to={action.link} className="block">
                    <div className="flex items-center space-x-3 p-3 rounded-md civic-transition hover:bg-muted/50 cursor-pointer">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-${action.color}/10`}>
                        <Icon 
                          name={action.icon} 
                          size={18} 
                          color={`var(--color-${action.color})`}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-body font-semibold text-text-primary text-sm">
                          {action.title}
                        </h4>
                        <p className="text-xs text-text-secondary font-caption">
                          {action.description}
                        </p>
                      </div>
                      <Icon name="ChevronRight" size={16} color="var(--color-text-secondary)" />
                    </div>
                  </Link>
                ) : (
                  <div 
                    onClick={action.action}
                    className="flex items-center space-x-3 p-3 rounded-md civic-transition hover:bg-muted/50 cursor-pointer"
                  >
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-${action.color}/10`}>
                      <Icon 
                        name={action.icon} 
                        size={18} 
                        color={`var(--color-${action.color})`}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-body font-semibold text-text-primary text-sm">
                        {action.title}
                      </h4>
                      <p className="text-xs text-text-secondary font-caption">
                        {action.description}
                      </p>
                    </div>
                    <Icon name="ChevronRight" size={16} color="var(--color-text-secondary)" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-card border civic-border rounded-lg civic-shadow-sm">
        <div className="p-4 border-b civic-border">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={20} color="var(--color-success)" />
            <h3 className="font-heading font-semibold text-text-primary">
              System Status
            </h3>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <span className="font-body font-semibold text-success">
              {systemStatus.message}
            </span>
          </div>
          
          <div className="text-xs text-text-secondary font-caption">
            Last checked: {systemStatus.lastCheck}
          </div>

          {/* Security Indicators */}
          <div className="mt-4 pt-4 border-t civic-border">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={14} color="var(--color-success)" />
                  <span className="font-caption text-text-secondary">SSL Security</span>
                </div>
                <span className="font-caption text-success">Active</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Lock" size={14} color="var(--color-success)" />
                  <span className="font-caption text-text-secondary">Data Encryption</span>
                </div>
                <span className="font-caption text-success">256-bit</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={14} color="var(--color-success)" />
                  <span className="font-caption text-text-secondary">Certification</span>
                </div>
                <span className="font-caption text-success">Valid</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-card border civic-border rounded-lg civic-shadow-sm">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Phone" size={16} color="var(--color-error)" />
            <h4 className="font-heading font-semibold text-text-primary text-sm">
              Need Help?
            </h4>
          </div>
          
          <p className="text-sm text-text-secondary font-caption mb-3">
            Contact election support for technical assistance or voting questions.
          </p>
          
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Phone"
            iconPosition="left"
          >
            Call Support: 1-800-VOTE-HELP
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;