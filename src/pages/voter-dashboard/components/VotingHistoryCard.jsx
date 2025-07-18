import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VotingHistoryCard = ({ election }) => {
  const getResultStatus = (status) => {
    switch (status) {
      case 'completed':
        return { color: 'success', icon: 'CheckCircle', text: 'Results Available' };
      case 'pending':
        return { color: 'warning', icon: 'Clock', text: 'Counting Votes' };
      case 'certified':
        return { color: 'primary', icon: 'Award', text: 'Certified Results' };
      default:
        return { color: 'muted', icon: 'Circle', text: 'Processing' };
    }
  };

  const resultStatus = getResultStatus(election.resultStatus);

  return (
    <div className="bg-card border civic-border rounded-lg civic-shadow-sm hover:civic-shadow-md civic-transition">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="History" size={16} color="var(--color-text-secondary)" />
              <span className="text-xs px-2 py-1 rounded-full font-caption bg-muted text-text-secondary">
                COMPLETED
              </span>
            </div>
            <h4 className="font-heading font-semibold text-text-primary mb-1">
              {election.title}
            </h4>
            <p className="text-sm text-text-secondary font-caption">
              Voted on {new Date(election.votedDate).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <Icon 
              name={resultStatus.icon} 
              size={16} 
              color={`var(--color-${resultStatus.color})`}
            />
          </div>
        </div>

        {/* Election Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-1">
            <span className="text-xs font-caption text-text-secondary">Election Date</span>
            <div className="text-sm font-body text-text-primary">
              {new Date(election.electionDate).toLocaleDateString()}
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-caption text-text-secondary">Result Status</span>
            <div className={`text-sm font-body text-${resultStatus.color}`}>
              {resultStatus.text}
            </div>
          </div>
        </div>

        {/* Winner Information */}
        {election.winner && (
          <div className="mb-4 p-3 bg-success/5 border border-success/20 rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="Trophy" size={16} color="var(--color-success)" />
              <span className="text-sm font-caption text-success">Winner</span>
            </div>
            <div className="text-sm font-body text-text-primary mt-1">
              {election.winner.name} - {election.winner.party}
            </div>
            <div className="text-xs font-caption text-text-secondary">
              {election.winner.votes.toLocaleString()} votes ({election.winner.percentage}%)
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Receipt"
            iconPosition="left"
          >
            View Receipt
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="BarChart3"
            iconPosition="left"
          >
            Results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VotingHistoryCard;