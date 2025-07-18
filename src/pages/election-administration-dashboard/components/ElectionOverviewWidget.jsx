import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ElectionOverviewWidget = () => {
  const [selectedTab, setSelectedTab] = useState('active');

  const electionData = {
    active: [
      {
        id: 1,
        title: "2024 Presidential Election",
        type: "Federal",
        startDate: "2024-11-05T08:00:00",
        endDate: "2024-11-05T20:00:00",
        status: "active",
        totalVoters: 15847,
        votescast: 8923,
        participationRate: 56.3,
        candidates: 4
      },
      {
        id: 2,
        title: "City Council District 3",
        type: "Local",
        startDate: "2024-07-18T09:00:00",
        endDate: "2024-07-18T18:00:00",
        status: "active",
        totalVoters: 3421,
        votescast: 1876,
        participationRate: 54.8,
        candidates: 3
      }
    ],
    upcoming: [
      {
        id: 3,
        title: "School Board Election",
        type: "Local",
        startDate: "2024-08-15T08:00:00",
        endDate: "2024-08-15T19:00:00",
        status: "upcoming",
        totalVoters: 8934,
        votescast: 0,
        participationRate: 0,
        candidates: 6
      },
      {
        id: 4,
        title: "State Referendum Prop 12",
        type: "State",
        startDate: "2024-09-10T07:00:00",
        endDate: "2024-09-10T21:00:00",
        status: "upcoming",
        totalVoters: 42156,
        votescast: 0,
        participationRate: 0,
        candidates: 2
      }
    ],
    completed: [
      {
        id: 5,
        title: "Mayor Election 2024",
        type: "Local",
        startDate: "2024-06-15T08:00:00",
        endDate: "2024-06-15T20:00:00",
        status: "completed",
        totalVoters: 12456,
        votescast: 9834,
        participationRate: 78.9,
        candidates: 5
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'upcoming':
        return 'warning';
      case 'completed':
        return 'muted';
      default:
        return 'muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return 'Play';
      case 'upcoming':
        return 'Clock';
      case 'completed':
        return 'CheckCircle';
      default:
        return 'Circle';
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

  const tabs = [
    { key: 'active', label: 'Active', count: electionData.active.length },
    { key: 'upcoming', label: 'Upcoming', count: electionData.upcoming.length },
    { key: 'completed', label: 'Completed', count: electionData.completed.length }
  ];

  return (
    <div className="bg-surface border civic-border rounded-lg civic-shadow-sm">
      <div className="p-6 border-b civic-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-heading font-bold text-text-primary">Election Overview</h2>
            <p className="text-sm text-text-secondary font-caption mt-1">
              Manage and monitor all elections
            </p>
          </div>
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={() => console.log('Create new election')}
          >
            New Election
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b civic-border">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key)}
              className={`py-4 px-1 border-b-2 font-body font-medium text-sm civic-transition ${
                selectedTab === tab.key
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-muted'
              }`}
            >
              {tab.label}
              <span className="ml-2 px-2 py-1 text-xs rounded-full bg-muted text-text-secondary">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Election List */}
      <div className="p-6">
        <div className="space-y-4">
          {electionData[selectedTab].map((election) => (
            <div
              key={election.id}
              className="flex items-center justify-between p-4 border civic-border rounded-lg hover:bg-muted/50 civic-transition"
            >
              <div className="flex items-center space-x-4">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-${getStatusColor(election.status)}/10`}>
                  <Icon
                    name={getStatusIcon(election.status)}
                    size={20}
                    color={`var(--color-${getStatusColor(election.status)})`}
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-body font-semibold text-text-primary">
                    {election.title}
                  </h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-text-secondary font-caption">
                      {election.type}
                    </span>
                    <span className="text-sm text-text-secondary font-caption">
                      {election.candidates} candidates
                    </span>
                    <span className="text-sm text-text-secondary font-caption">
                      {formatDate(election.startDate)} - {formatDate(election.endDate)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                {election.status === 'active' && (
                  <div className="text-right">
                    <div className="text-lg font-mono font-bold text-text-primary">
                      {election.participationRate}%
                    </div>
                    <div className="text-sm text-text-secondary font-caption">
                      {election.votescast.toLocaleString()} / {election.totalVoters.toLocaleString()}
                    </div>
                  </div>
                )}

                {election.status === 'completed' && (
                  <div className="text-right">
                    <div className="text-lg font-mono font-bold text-success">
                      {election.participationRate}%
                    </div>
                    <div className="text-sm text-text-secondary font-caption">
                      Final turnout
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                    onClick={() => console.log('View election', election.id)}
                  >
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Settings"
                    onClick={() => console.log('Manage election', election.id)}
                  >
                    Manage
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {electionData[selectedTab].length === 0 && (
          <div className="text-center py-12">
            <Icon name="Calendar" size={48} className="mx-auto text-text-secondary mb-4" />
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
              No {selectedTab} elections
            </h3>
            <p className="text-text-secondary font-caption">
              {selectedTab === 'active' && "No elections are currently running."}
              {selectedTab === 'upcoming' && "No elections are scheduled."}
              {selectedTab === 'completed' && "No elections have been completed yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ElectionOverviewWidget;