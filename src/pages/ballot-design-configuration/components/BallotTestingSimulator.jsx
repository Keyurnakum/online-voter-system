import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BallotTestingSimulator = ({ contests = [] }) => {
  const [simulationMode, setSimulationMode] = useState('voter');
  const [currentStep, setCurrentStep] = useState(0);
  const [voterSelections, setVoterSelections] = useState({});
  const [simulationResults, setSimulationResults] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const simulationModes = [
    { value: 'voter', label: 'Voter Experience', icon: 'User' },
    { value: 'accessibility', label: 'Accessibility Test', icon: 'Eye' },
    { value: 'stress', label: 'Stress Test', icon: 'Zap' },
    { value: 'security', label: 'Security Test', icon: 'Shield' }
  ];

  const voterProfiles = [
    {
      id: 'tech-savvy',
      name: 'Tech-Savvy Voter',
      description: 'Comfortable with technology, quick navigation',
      characteristics: ['Fast interaction', 'Minimal help needed', 'Efficient voting']
    },
    {
      id: 'elderly',
      name: 'Elderly Voter',
      description: 'May need larger text and slower interaction',
      characteristics: ['Slower navigation', 'Needs clear instructions', 'Prefers simple interface']
    },
    {
      id: 'first-time',
      name: 'First-Time Voter',
      description: 'New to voting process, needs guidance',
      characteristics: ['Requires help text', 'Cautious selections', 'Wants confirmation']
    },
    {
      id: 'mobile-user',
      name: 'Mobile User',
      description: 'Voting on smartphone or tablet',
      characteristics: ['Touch interactions', 'Small screen', 'Potential connectivity issues']
    }
  ];

  const [selectedProfile, setSelectedProfile] = useState('tech-savvy');

  const simulationSteps = [
    'Authentication',
    'Ballot Instructions',
    'Contest Voting',
    'Review Selections',
    'Submit Ballot'
  ];

  const runSimulation = async () => {
    setIsSimulating(true);
    setCurrentStep(0);
    setSimulationResults(null);

    // Simulate each step with delays
    for (let i = 0; i < simulationSteps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Generate simulation results
    const results = generateSimulationResults();
    setSimulationResults(results);
    setIsSimulating(false);
  };

  const generateSimulationResults = () => {
    const profile = voterProfiles.find(p => p.id === selectedProfile);
    const baseTime = profile.id === 'elderly' ? 8 : profile.id === 'first-time' ? 6 : 4;
    
    return {
      completionTime: `${baseTime + Math.floor(Math.random() * 3)} minutes`,
      successRate: profile.id === 'elderly' ? '92%' : '98%',
      usabilityScore: profile.id === 'elderly' ? 85 : profile.id === 'first-time' ? 88 : 95,
      issues: generateIssues(profile),
      recommendations: generateRecommendations(profile)
    };
  };

  const generateIssues = (profile) => {
    const allIssues = [
      { severity: 'low', message: 'Some contest titles are lengthy for mobile view' },
      { severity: 'medium', message: 'Candidate photos take time to load' },
      { severity: 'low', message: 'Help text could be more prominent' },
      { severity: 'medium', message: 'Submit button requires double confirmation' }
    ];

    if (profile.id === 'elderly') {
      allIssues.push({ severity: 'medium', message: 'Font size may be too small for some users' });
    }
    if (profile.id === 'mobile-user') {
      allIssues.push({ severity: 'low', message: 'Touch targets could be larger' });
    }

    return allIssues.slice(0, Math.floor(Math.random() * 3) + 1);
  };

  const generateRecommendations = (profile) => {
    const recommendations = [
      'Consider adding progress indicators',
      'Implement auto-save functionality',
      'Add keyboard navigation support',
      'Include audio instructions option'
    ];

    return recommendations.slice(0, Math.floor(Math.random() * 2) + 2);
  };

  const handleVoteSelection = (contestId, candidateId) => {
    setVoterSelections(prev => ({
      ...prev,
      [contestId]: candidateId
    }));
  };

  const resetSimulation = () => {
    setCurrentStep(0);
    setVoterSelections({});
    setSimulationResults(null);
    setIsSimulating(false);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-accent';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <div className="h-full flex flex-col bg-surface">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b civic-border">
        <div>
          <h2 className="text-xl font-heading font-bold text-text-primary">Ballot Testing Simulator</h2>
          <p className="text-sm text-text-secondary font-caption">
            Test voter experience and identify usability issues
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select
            options={simulationModes}
            value={simulationMode}
            onChange={setSimulationMode}
            className="w-48"
          />
          <Button
            variant="default"
            onClick={runSimulation}
            disabled={isSimulating || contests.length === 0}
            loading={isSimulating}
            iconName="Play"
            iconPosition="left"
          >
            Run Simulation
          </Button>
        </div>
      </div>

      {/* Simulation Setup */}
      {!isSimulating && !simulationResults && (
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Voter Profile Selection */}
            <div className="bg-card border civic-border rounded-lg p-6">
              <h3 className="font-heading font-semibold text-text-primary mb-4">Select Voter Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {voterProfiles.map((profile) => (
                  <div
                    key={profile.id}
                    onClick={() => setSelectedProfile(profile.id)}
                    className={`border rounded-lg p-4 cursor-pointer civic-transition ${
                      selectedProfile === profile.id
                        ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        selectedProfile === profile.id
                          ? 'border-primary bg-primary' :'border-text-secondary'
                      }`}>
                        {selectedProfile === profile.id && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <h4 className="font-body font-semibold text-text-primary">{profile.name}</h4>
                    </div>
                    <p className="text-sm text-text-secondary font-caption mb-3">{profile.description}</p>
                    <div className="space-y-1">
                      {profile.characteristics.map((char, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Icon name="Check" size={12} color="var(--color-accent)" />
                          <span className="text-xs text-text-secondary font-caption">{char}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulation Preview */}
            <div className="bg-card border civic-border rounded-lg p-6">
              <h3 className="font-heading font-semibold text-text-primary mb-4">Simulation Preview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary font-caption">Contests to test:</span>
                  <span className="font-mono text-text-primary">{contests.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary font-caption">Estimated duration:</span>
                  <span className="font-mono text-text-primary">2-3 minutes</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary font-caption">Simulation steps:</span>
                  <span className="font-mono text-text-primary">{simulationSteps.length}</span>
                </div>
              </div>
            </div>

            {contests.length === 0 && (
              <div className="text-center py-12">
                <Icon name="AlertCircle" size={48} className="mx-auto text-warning mb-4" />
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">No Contests to Test</h3>
                <p className="text-text-secondary font-caption">Add contests to your ballot before running simulations</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Simulation Progress */}
      {isSimulating && (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="mb-6">
              <Icon name="Loader2" size={48} className="mx-auto text-primary mb-4 animate-spin" />
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                Running Simulation
              </h3>
              <p className="text-text-secondary font-caption">
                Testing: {simulationSteps[currentStep]}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2 mb-4">
              <div 
                className="bg-primary h-2 rounded-full civic-transition"
                style={{ width: `${((currentStep + 1) / simulationSteps.length) * 100}%` }}
              ></div>
            </div>

            {/* Steps */}
            <div className="space-y-2">
              {simulationSteps.map((step, index) => (
                <div
                  key={step}
                  className={`flex items-center space-x-3 text-sm ${
                    index <= currentStep ? 'text-text-primary' : 'text-text-secondary'
                  }`}
                >
                  <Icon 
                    name={index < currentStep ? "CheckCircle" : index === currentStep ? "Loader2" : "Circle"} 
                    size={16}
                    className={index === currentStep ? "animate-spin" : ""}
                    color={index <= currentStep ? "var(--color-primary)" : "var(--color-text-secondary)"}
                  />
                  <span className="font-caption">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Simulation Results */}
      {simulationResults && (
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Results Summary */}
            <div className="bg-card border civic-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-text-primary">Simulation Results</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetSimulation}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Run Again
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-primary mb-1">
                    {simulationResults.completionTime}
                  </div>
                  <div className="text-sm text-text-secondary font-caption">Completion Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-success mb-1">
                    {simulationResults.successRate}
                  </div>
                  <div className="text-sm text-text-secondary font-caption">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-accent mb-1">
                    {simulationResults.usabilityScore}
                  </div>
                  <div className="text-sm text-text-secondary font-caption">Usability Score</div>
                </div>
              </div>
            </div>

            {/* Issues Found */}
            {simulationResults.issues.length > 0 && (
              <div className="bg-card border civic-border rounded-lg p-6">
                <h3 className="font-heading font-semibold text-text-primary mb-4">Issues Identified</h3>
                <div className="space-y-3">
                  {simulationResults.issues.map((issue, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                      <Icon 
                        name="AlertTriangle" 
                        size={16} 
                        color={issue.severity === 'high' ? 'var(--color-error)' : issue.severity === 'medium' ? 'var(--color-warning)' : 'var(--color-accent)'}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`text-xs px-2 py-1 rounded font-caption ${getSeverityColor(issue.severity)}`}>
                            {issue.severity.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-text-primary font-caption">{issue.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            <div className="bg-card border civic-border rounded-lg p-6">
              <h3 className="font-heading font-semibold text-text-primary mb-4">Recommendations</h3>
              <div className="space-y-3">
                {simulationResults.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Icon name="Lightbulb" size={16} color="var(--color-accent)" className="mt-0.5" />
                    <p className="text-sm text-text-secondary font-caption">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BallotTestingSimulator;