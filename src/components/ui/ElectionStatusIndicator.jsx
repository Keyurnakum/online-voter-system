import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const ElectionStatusIndicator = () => {
  const [electionData, setElectionData] = useState({
    activeElections: 2,
    totalVoters: 15847,
    votescast: 8923,
    systemStatus: 'operational',
    lastUpdate: new Date()
  });

  const [isExpanded, setIsExpanded] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setElectionData(prev => ({
        ...prev,
        votescast: prev.votescast + Math.floor(Math.random() * 3),
        lastUpdate: new Date()
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'AlertCircle';
      default:
        return 'Clock';
    }
  };

  const participationRate = Math.round((electionData.votescast / electionData.totalVoters) * 100);

  return (
    <div className="relative">
      {/* Main Status Indicator */}
      <div 
        className="flex items-center space-x-3 px-4 py-2 bg-surface border civic-border rounded-lg civic-shadow-sm cursor-pointer civic-transition hover:civic-shadow-md"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Status Icon */}
        <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-${getStatusColor(electionData.systemStatus)}/10`}>
          <Icon 
            name={getStatusIcon(electionData.systemStatus)} 
            size={16} 
            color={`var(--color-${getStatusColor(electionData.systemStatus)})`}
          />
        </div>

        {/* Status Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="font-body font-semibold text-text-primary">
              {electionData.activeElections} Active Election{electionData.activeElections !== 1 ? 's' : ''}
            </span>
            {electionData.activeElections > 0 && (
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            )}
          </div>
          <div className="text-sm text-text-secondary font-caption">
            {electionData.votescast.toLocaleString()} votes cast
          </div>
        </div>

        {/* Expand Icon */}
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-text-secondary"
        />
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border civic-border rounded-lg civic-shadow-md z-1100 p-4">
          <div className="space-y-4">
            {/* Election Statistics */}
            <div>
              <h3 className="font-heading font-semibold text-sm text-text-primary mb-3">
                Current Election Status
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-xs text-text-secondary font-caption uppercase tracking-wide">
                    Total Registered
                  </div>
                  <div className="font-mono font-bold text-lg text-text-primary">
                    {electionData.totalVoters.toLocaleString()}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-xs text-text-secondary font-caption uppercase tracking-wide">
                    Votes Cast
                  </div>
                  <div className="font-mono font-bold text-lg text-text-primary">
                    {electionData.votescast.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Participation Rate */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-caption text-text-secondary">Participation Rate</span>
                  <span className="font-mono font-semibold text-text-primary">{participationRate}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-success h-2 rounded-full civic-transition"
                    style={{ width: `${Math.min(participationRate, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* System Health */}
            <div className="border-t civic-border pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name="Activity" 
                    size={14} 
                    color="var(--color-success)"
                  />
                  <span className="text-sm font-caption text-text-secondary">System Health</span>
                </div>
                <span className={`text-sm font-semibold text-${getStatusColor(electionData.systemStatus)}`}>
                  {electionData.systemStatus.charAt(0).toUpperCase() + electionData.systemStatus.slice(1)}
                </span>
              </div>
            </div>

            {/* Last Update */}
            <div className="border-t civic-border pt-4">
              <div className="flex items-center space-x-2 text-xs text-text-secondary">
                <Icon name="Clock" size={12} />
                <span className="font-caption">
                  Last updated: {electionData.lastUpdate.toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectionStatusIndicator;