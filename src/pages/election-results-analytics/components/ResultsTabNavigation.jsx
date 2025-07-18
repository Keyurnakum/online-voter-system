import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ResultsTabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'live-results',
      label: 'Live Results',
      icon: 'BarChart3',
      description: 'Real-time election outcomes',
      badge: 'Live'
    },
    {
      id: 'turnout-analytics',
      label: 'Turnout Analytics',
      icon: 'Users',
      description: 'Participation statistics',
      badge: null
    },
    {
      id: 'historical-comparison',
      label: 'Historical Comparison',
      icon: 'TrendingUp',
      description: 'Compare with previous elections',
      badge: null
    }
  ];

  return (
    <div className="bg-surface border civic-border rounded-lg p-2">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            onClick={() => onTabChange(tab.id)}
            className="flex-1 justify-start sm:justify-center"
          >
            <div className="flex items-center space-x-2">
              <Icon name={tab.icon} size={16} />
              <div className="text-left sm:text-center">
                <div className="flex items-center space-x-2">
                  <span className="font-body font-normal">{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-xs px-2 py-1 rounded-full font-caption ${
                      activeTab === tab.id
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'bg-success/10 text-success'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </div>
                <div className={`text-xs font-caption ${
                  activeTab === tab.id ? 'opacity-75' : 'text-text-secondary'
                }`}>
                  {tab.description}
                </div>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ResultsTabNavigation;