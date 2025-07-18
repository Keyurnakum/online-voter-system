import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UpcomingElectionCard = ({ election }) => {
  const getDaysUntilStart = () => {
    const now = new Date();
    const startDate = new Date(election.startDate);
    const diff = startDate - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const daysUntilStart = getDaysUntilStart();

  return (
    <div className="bg-card border civic-border rounded-lg civic-shadow-sm hover:civic-shadow-md civic-transition">
      {/* Card Header */}
      <div className="p-4 border-b civic-border">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calendar" size={16} color="var(--color-secondary)" />
              <span className="text-xs px-2 py-1 rounded-full font-caption bg-secondary/10 text-secondary">
                UPCOMING
              </span>
            </div>
            <h4 className="font-heading font-semibold text-text-primary mb-1">
              {election.title}
            </h4>
            <p className="text-sm text-text-secondary font-caption">
              {election.description}
            </p>
          </div>
        </div>
      </div>

      {/* Election Info */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Start Date */}
          <div className="space-y-1">
            <div className="flex items-center space-x-1">
              <Icon name="Play" size={12} color="var(--color-text-secondary)" />
              <span className="text-xs font-caption text-text-secondary">Starts</span>
            </div>
            <div className="text-sm font-body text-text-primary">
              {new Date(election.startDate).toLocaleDateString()}
            </div>
          </div>

          {/* Registration Deadline */}
          <div className="space-y-1">
            <div className="flex items-center space-x-1">
              <Icon name="UserPlus" size={12} color="var(--color-text-secondary)" />
              <span className="text-xs font-caption text-text-secondary">Register By</span>
            </div>
            <div className="text-sm font-body text-text-primary">
              {new Date(election.registrationDeadline).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Days Until Start */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-caption text-text-secondary">Starts in:</span>
          <span className="font-mono font-bold text-lg text-secondary">
            {daysUntilStart} day{daysUntilStart !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Candidates Preview */}
        {election.candidates && election.candidates.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-caption text-text-secondary">
                {election.candidates.length} Candidate{election.candidates.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {election.candidates.slice(0, 3).map((candidate, index) => (
                <Image
                  key={index}
                  src={candidate.photo}
                  alt={candidate.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ))}
              {election.candidates.length > 3 && (
                <div className="flex items-center justify-center w-6 h-6 bg-muted rounded-full">
                  <span className="text-xs font-caption text-text-secondary">
                    +{election.candidates.length - 3}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Bell"
            iconPosition="left"
          >
            Remind Me
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Info"
            iconPosition="left"
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingElectionCard;