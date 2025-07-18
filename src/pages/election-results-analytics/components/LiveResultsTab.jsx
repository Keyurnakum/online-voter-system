import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LiveResultsTab = () => {
  const [selectedContest, setSelectedContest] = useState('presidential');

  const contestResults = {
    presidential: {
      title: 'Presidential Election 2024',
      totalVotes: 12456,
      reportingPrecincts: '847 of 892',
      candidates: [
        {
          id: 1,
          name: 'Sarah Johnson',
          party: 'Democratic',
          votes: 6789,
          percentage: 54.5,
          isWinner: true,
          color: 'bg-blue-500'
        },
        {
          id: 2,
          name: 'Michael Rodriguez',
          party: 'Republican',
          votes: 4567,
          percentage: 36.7,
          isWinner: false,
          color: 'bg-red-500'
        },
        {
          id: 3,
          name: 'Jennifer Chen',
          party: 'Independent',
          votes: 1100,
          percentage: 8.8,
          isWinner: false,
          color: 'bg-green-500'
        }
      ]
    },
    senate: {
      title: 'Senate Race 2024',
      totalVotes: 11234,
      reportingPrecincts: '823 of 892',
      candidates: [
        {
          id: 1,
          name: 'David Thompson',
          party: 'Republican',
          votes: 5678,
          percentage: 50.6,
          isWinner: true,
          color: 'bg-red-500'
        },
        {
          id: 2,
          name: 'Maria Garcia',
          party: 'Democratic',
          votes: 5556,
          percentage: 49.4,
          isWinner: false,
          color: 'bg-blue-500'
        }
      ]
    }
  };

  const contests = [
    { id: 'presidential', label: 'Presidential', icon: 'Crown' },
    { id: 'senate', label: 'Senate', icon: 'Building' },
    { id: 'house', label: 'House', icon: 'Users' },
    { id: 'local', label: 'Local', icon: 'MapPin' }
  ];

  const currentContest = contestResults[selectedContest] || contestResults.presidential;

  return (
    <div className="space-y-6">
      {/* Contest Selector */}
      <div className="flex flex-wrap gap-2">
        {contests.map((contest) => (
          <Button
            key={contest.id}
            variant={selectedContest === contest.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedContest(contest.id)}
            iconName={contest.icon}
            iconPosition="left"
          >
            {contest.label}
          </Button>
        ))}
      </div>

      {/* Contest Header */}
      <div className="bg-surface border civic-border rounded-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-2xl font-heading font-bold text-text-primary">
              {currentContest.title}
            </h2>
            <div className="flex items-center space-x-4 mt-2 text-sm text-text-secondary">
              <span className="font-caption">
                {currentContest.totalVotes.toLocaleString()} total votes
              </span>
              <span className="font-caption">
                {currentContest.reportingPrecincts} precincts reporting
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-caption text-success">Live Updates</span>
          </div>
        </div>
      </div>

      {/* Results Display */}
      <div className="space-y-4">
        {currentContest.candidates.map((candidate, index) => (
          <div
            key={candidate.id}
            className={`bg-surface border civic-border rounded-lg p-6 civic-transition hover:civic-shadow-md ${
              candidate.isWinner ? 'ring-2 ring-success' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  {candidate.isWinner && (
                    <div className="flex items-center justify-center w-8 h-8 bg-success rounded-full">
                      <Icon name="Crown" size={16} color="white" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-text-primary">
                      {candidate.name}
                    </h3>
                    <p className="text-sm text-text-secondary font-caption">
                      {candidate.party} Party
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-mono font-bold text-text-primary">
                  {candidate.percentage}%
                </div>
                <div className="text-sm text-text-secondary font-mono">
                  {candidate.votes.toLocaleString()} votes
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className={`h-3 rounded-full civic-transition ${candidate.color}`}
                  style={{ width: `${candidate.percentage}%` }}
                ></div>
              </div>
              
              {candidate.isWinner && (
                <div className="flex items-center space-x-2 text-success">
                  <Icon name="CheckCircle" size={16} />
                  <span className="text-sm font-caption font-semibold">Winner</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface border civic-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} color="var(--color-success)" />
            <span className="text-sm font-caption text-text-secondary">Turnout Rate</span>
          </div>
          <div className="text-2xl font-mono font-bold text-text-primary">78.6%</div>
        </div>
        
        <div className="bg-surface border civic-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} color="var(--color-warning)" />
            <span className="text-sm font-caption text-text-secondary">Polls Close</span>
          </div>
          <div className="text-2xl font-mono font-bold text-text-primary">8:00 PM</div>
        </div>
        
        <div className="bg-surface border civic-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="MapPin" size={16} color="var(--color-primary)" />
            <span className="text-sm font-caption text-text-secondary">Precincts</span>
          </div>
          <div className="text-2xl font-mono font-bold text-text-primary">95%</div>
        </div>
      </div>
    </div>
  );
};

export default LiveResultsTab;