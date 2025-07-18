import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ElectionSelector = ({ selectedElection, onElectionChange, onRefresh, lastUpdated }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const electionOptions = [
    {
      value: 'presidential-2024',
      label: 'Presidential Election 2024',
      description: 'General Election - November 5, 2024'
    },
    {
      value: 'senate-2024',
      label: 'Senate Race 2024',
      description: 'State Senate Election - November 5, 2024'
    },
    {
      value: 'local-2024',
      label: 'Local Elections 2024',
      description: 'Municipal and County Elections - November 5, 2024'
    },
    {
      value: 'referendum-2024',
      label: 'State Referendum 2024',
      description: 'Ballot Measures and Propositions - November 5, 2024'
    }
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="bg-surface border civic-border rounded-lg p-4 civic-shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Election Selector */}
        <div className="flex-1 max-w-md">
          <Select
            label="Select Election"
            options={electionOptions}
            value={selectedElection}
            onChange={onElectionChange}
            searchable
            className="mb-0"
          />
        </div>

        {/* Refresh Controls */}
        <div className="flex items-center space-x-4">
          <div className="text-sm text-text-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} />
              <span className="font-caption">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            loading={isRefreshing}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Election Status */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm font-caption text-success">Live Results</span>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} />
            <span className="font-caption">15,847 registered</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="CheckCircle" size={14} />
            <span className="font-caption">12,456 votes cast</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionSelector;