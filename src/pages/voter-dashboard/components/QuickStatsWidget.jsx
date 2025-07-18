import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsWidget = ({ stats }) => {
  const statItems = [
    {
      label: 'Elections Participated',
      value: stats.totalParticipated,
      icon: 'Vote',
      color: 'primary',
      description: 'Total elections you have voted in'
    },
    {
      label: 'Active Elections',
      value: stats.activeElections,
      icon: 'Calendar',
      color: 'success',
      description: 'Currently open for voting'
    },
    {
      label: 'Upcoming Elections',
      value: stats.upcomingElections,
      icon: 'Clock',
      color: 'warning',
      description: 'Scheduled to start soon'
    },
    {
      label: 'Participation Rate',
      value: `${stats.participationRate}%`,
      icon: 'TrendingUp',
      color: 'secondary',
      description: 'Your voting participation percentage'
    }
  ];

  return (
    <div className="bg-card border civic-border rounded-lg civic-shadow-sm">
      <div className="p-4 border-b civic-border">
        <div className="flex items-center space-x-2">
          <Icon name="BarChart3" size={20} color="var(--color-primary)" />
          <h3 className="font-heading font-semibold text-text-primary">
            Your Voting Statistics
          </h3>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statItems.map((item, index) => (
            <div key={index} className="text-center">
              <div className={`flex items-center justify-center w-12 h-12 mx-auto mb-2 rounded-full bg-${item.color}/10`}>
                <Icon 
                  name={item.icon} 
                  size={20} 
                  color={`var(--color-${item.color})`}
                />
              </div>
              <div className="font-mono font-bold text-2xl text-text-primary mb-1">
                {item.value}
              </div>
              <div className="text-sm font-caption text-text-secondary mb-1">
                {item.label}
              </div>
              <div className="text-xs font-caption text-text-secondary opacity-75">
                {item.description}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Insights */}
        <div className="mt-6 pt-4 border-t civic-border">
          <div className="flex items-center justify-between text-sm">
            <span className="font-caption text-text-secondary">Next Election Deadline:</span>
            <span className="font-mono font-semibold text-warning">
              {stats.nextDeadline}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStatsWidget;