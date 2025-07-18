import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BallotPreview = ({ contests = [], ballotSettings = {} }) => {
  const [previewMode, setPreviewMode] = useState('desktop');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [voterSelections, setVoterSelections] = useState({});

  const previewModes = [
    { value: 'desktop', label: 'Desktop View', icon: 'Monitor' },
    { value: 'tablet', label: 'Tablet View', icon: 'Tablet' },
    { value: 'mobile', label: 'Mobile View', icon: 'Smartphone' }
  ];

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' }
  ];

  const getPreviewDimensions = () => {
    switch (previewMode) {
      case 'mobile':
        return 'w-80 h-[600px]';
      case 'tablet':
        return 'w-[600px] h-[800px]';
      default:
        return 'w-full h-full';
    }
  };

  const handleVoteSelection = (contestId, candidateId, isSelected) => {
    setVoterSelections(prev => ({
      ...prev,
      [contestId]: isSelected ? candidateId : null
    }));
  };

  const getTranslatedText = (key, defaultText) => {
    const translations = {
      en: {
        ballotTitle: ballotSettings.title || '2024 General Election',
        instructions: 'Please make your selections below. You may review and change your choices before submitting.',
        voteFor: 'Vote for ONE',
        submitBallot: 'Submit Ballot',
        reviewChoices: 'Review Choices'
      },
      es: {
        ballotTitle: 'Elección General 2024',
        instructions: 'Por favor haga sus selecciones a continuación. Puede revisar y cambiar sus opciones antes de enviar.',
        voteFor: 'Vote por UNO',
        submitBallot: 'Enviar Boleta',
        reviewChoices: 'Revisar Opciones'
      },
      fr: {
        ballotTitle: 'Élection Générale 2024',
        instructions: 'Veuillez faire vos sélections ci-dessous. Vous pouvez réviser et modifier vos choix avant de soumettre.',
        voteFor: 'Votez pour UN',
        submitBallot: 'Soumettre le Bulletin',
        reviewChoices: 'Réviser les Choix'
      }
    };
    
    return translations[selectedLanguage]?.[key] || defaultText;
  };

  return (
    <div className="h-full flex flex-col bg-surface">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b civic-border">
        <div>
          <h2 className="text-xl font-heading font-bold text-text-primary">Ballot Preview</h2>
          <p className="text-sm text-text-secondary font-caption">Real-time voter experience preview</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Select
            options={languages}
            value={selectedLanguage}
            onChange={setSelectedLanguage}
            className="w-32"
          />
          
          <div className="flex items-center bg-muted rounded-lg p-1">
            {previewModes.map((mode) => (
              <button
                key={mode.value}
                onClick={() => setPreviewMode(mode.value)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md civic-transition ${
                  previewMode === mode.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={mode.icon} size={16} />
                <span className="hidden sm:inline font-caption">{mode.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-hidden p-6">
        {contests.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Icon name="Eye" size={48} className="mx-auto text-text-secondary mb-4" />
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">No Ballot to Preview</h3>
              <p className="text-text-secondary font-caption">Add contests to see the ballot preview</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center h-full">
            <div className={`${getPreviewDimensions()} bg-white border civic-border rounded-lg civic-shadow-md overflow-y-auto`}>
              {/* Ballot Header */}
              <div className="bg-primary text-primary-foreground p-6 text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Icon name="Shield" size={24} color="white" />
                  <h1 className="text-xl font-heading font-bold">VoteSecure</h1>
                </div>
                <h2 className="text-lg font-heading font-semibold">
                  {getTranslatedText('ballotTitle', '2024 General Election')}
                </h2>
                <p className="text-sm opacity-90 font-caption mt-2">
                  {ballotSettings.date || 'November 5, 2024'}
                </p>
              </div>

              {/* Instructions */}
              <div className="p-6 bg-accent/5 border-b civic-border">
                <div className="flex items-start space-x-3">
                  <Icon name="Info" size={20} color="var(--color-accent)" className="mt-0.5" />
                  <div>
                    <h3 className="font-heading font-semibold text-text-primary mb-1">Voting Instructions</h3>
                    <p className="text-sm text-text-secondary font-caption">
                      {getTranslatedText('instructions', 'Please make your selections below. You may review and change your choices before submitting.')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contests */}
              <div className="p-6 space-y-8">
                {contests.map((contest, index) => (
                  <div key={contest.id} className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="text-lg font-heading font-semibold text-text-primary">
                        {contest.title}
                      </h3>
                      <p className="text-sm text-text-secondary font-caption mt-1">
                        {contest.description}
                      </p>
                      <p className="text-sm text-accent font-caption mt-2">
                        {getTranslatedText('voteFor', 'Vote for ONE')}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {contest.candidates.map((candidate) => (
                        <div
                          key={candidate.id}
                          className={`border civic-border rounded-lg p-4 cursor-pointer civic-transition ${
                            voterSelections[contest.id] === candidate.id
                              ? 'border-primary bg-primary/5' :'hover:border-primary/50 hover:bg-muted/50'
                          }`}
                          onClick={() => handleVoteSelection(
                            contest.id, 
                            candidate.id, 
                            voterSelections[contest.id] !== candidate.id
                          )}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              voterSelections[contest.id] === candidate.id
                                ? 'border-primary bg-primary' :'border-text-secondary'
                            }`}>
                              {voterSelections[contest.id] === candidate.id && (
                                <Icon name="Check" size={12} color="white" />
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <h4 className="font-body font-semibold text-text-primary">
                                {candidate.name}
                              </h4>
                              {candidate.party && (
                                <p className="text-sm text-text-secondary font-caption">
                                  {candidate.party}
                                </p>
                              )}
                              {candidate.description && (
                                <p className="text-sm text-text-secondary font-caption mt-1">
                                  {candidate.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {contest.allowWriteIn && (
                        <div className="border civic-border border-dashed rounded-lg p-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-5 h-5 rounded-full border-2 border-text-secondary"></div>
                            <div className="flex-1">
                              <input
                                type="text"
                                placeholder="Write-in candidate name"
                                className="w-full border-none outline-none bg-transparent font-body text-text-primary placeholder-text-secondary"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Ballot Actions */}
              <div className="p-6 border-t civic-border bg-muted/30">
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="text-sm text-text-secondary font-caption">
                    Selections made: {Object.keys(voterSelections).length} of {contests.length}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      iconName="Eye"
                      iconPosition="left"
                    >
                      {getTranslatedText('reviewChoices', 'Review Choices')}
                    </Button>
                    <Button
                      variant="default"
                      iconName="Send"
                      iconPosition="left"
                      disabled={Object.keys(voterSelections).length === 0}
                    >
                      {getTranslatedText('submitBallot', 'Submit Ballot')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Preview Stats */}
      <div className="border-t civic-border p-4 bg-muted/30">
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <div className="flex items-center space-x-4">
            <span className="font-caption">Contests: {contests.length}</span>
            <span className="font-caption">
              Candidates: {contests.reduce((total, contest) => total + contest.candidates.length, 0)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={14} />
            <span className="font-caption">
              Last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BallotPreview;