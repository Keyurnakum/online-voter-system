import React, { useState, useEffect } from 'react';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActiveElectionCard = ({ election }) => {
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const deadline = new Date(election.deadline);
      const diff = deadline - now;

      if (diff <= 0) {
        setTimeRemaining('Voting Closed');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeRemaining(`${days}d ${hours}h remaining`);
      } else if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m remaining`);
      } else {
        setTimeRemaining(`${minutes}m remaining`);
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 60000);

    return () => clearInterval(interval);
  }, [election.deadline]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'closing-soon':
        return 'warning';
      case 'closed':
        return 'error';
      default:
        return 'muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return 'CheckCircle';
      case 'closing-soon':
        return 'Clock';
      case 'closed':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border civic-border rounded-lg civic-shadow-sm hover:civic-shadow-md civic-transition">
      {/* Card Header */}
      <div className="p-6 border-b civic-border">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Vote" size={20} color="var(--color-primary)" />
              <span className={`text-xs px-2 py-1 rounded-full font-caption bg-${getStatusColor(election.status)}/10 text-${getStatusColor(election.status)}`}>
                {election.status.replace('-', ' ').toUpperCase()}
              </span>
            </div>
            <h3 className="font-heading font-bold text-lg text-text-primary mb-1">
              {election.title}
            </h3>
            <p className="text-sm text-text-secondary font-caption">
              {election.description}
            </p>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <Icon 
              name={getStatusIcon(election.status)} 
              size={16} 
              color={`var(--color-${getStatusColor(election.status)})`}
            />
          </div>
        </div>
      </div>

      {/* Election Details */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Voting Period */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={14} color="var(--color-text-secondary)" />
              <span className="text-sm font-caption text-text-secondary">Voting Period</span>
            </div>
            <div className="text-sm font-body text-text-primary">
              {new Date(election.startDate).toLocaleDateString()} - {new Date(election.deadline).toLocaleDateString()}
            </div>
          </div>

          {/* Time Remaining */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} color="var(--color-text-secondary)" />
              <span className="text-sm font-caption text-text-secondary">Time Remaining</span>
            </div>
            <div className={`text-sm font-mono font-semibold text-${getStatusColor(election.status)}`}>
              {timeRemaining}
            </div>
          </div>

          {/* Ballot Type */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="FileText" size={14} color="var(--color-text-secondary)" />
              <span className="text-sm font-caption text-text-secondary">Ballot Type</span>
            </div>
            <div className="text-sm font-body text-text-primary">
              {election.ballotType}
            </div>
          </div>

          {/* Participation Status */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="User" size={14} color="var(--color-text-secondary)" />
              <span className="text-sm font-caption text-text-secondary">Your Status</span>
            </div>
            <div className="flex items-center space-x-2">
              {election.hasVoted ? (
                <>
                  <Icon name="CheckCircle" size={14} color="var(--color-success)" />
                  <span className="text-sm font-body text-success">Voted</span>
                </>
              ) : (
                <>
                  <Icon name="Circle" size={14} color="var(--color-warning)" />
                  <span className="text-sm font-body text-warning">Not Voted</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Candidates Preview */}
        {election.candidates && election.candidates.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-heading font-semibold text-text-primary mb-3">
              Candidates ({election.candidates.length})
            </h4>
            <div className="flex items-center space-x-3">
              {election.candidates.slice(0, 4).map((candidate, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Image
                    src={candidate.photo}
                    alt={candidate.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-xs font-caption text-text-secondary hidden sm:block">
                    {candidate.name.split(' ')[0]}
                  </span>
                </div>
              ))}
              {election.candidates.length > 4 && (
                <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-full">
                  <span className="text-xs font-caption text-text-secondary">
                    +{election.candidates.length - 4}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {!election.hasVoted && election.status === 'active' ? (
            <Button
              variant="default"
              fullWidth
              iconName="Vote"
              iconPosition="left"
              className="sm:flex-1"
            >
              Vote Now
            </Button>
          ) : election.hasVoted ? (
            <Button
              variant="outline"
              fullWidth
              iconName="Receipt"
              iconPosition="left"
              className="sm:flex-1"
            >
              View Receipt
            </Button>
          ) : (
            <Button
              variant="secondary"
              fullWidth
              disabled
              className="sm:flex-1"
            >
              Voting Closed
            </Button>
          )}
          
          <Button
            variant="ghost"
            iconName="Info"
            iconPosition="left"
            className="sm:w-auto"
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActiveElectionCard;