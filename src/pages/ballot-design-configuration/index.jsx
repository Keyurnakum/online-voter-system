import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import BallotBuilder from './components/BallotBuilder';
import BallotPreview from './components/BallotPreview';
import TemplateLibrary from './components/TemplateLibrary';
import ValidationEngine from './components/ValidationEngine';
import BallotTestingSimulator from './components/BallotTestingSimulator';

const BallotDesignConfiguration = () => {
  const [activeWorkspace, setActiveWorkspace] = useState('builder');
  const [contests, setContests] = useState([]);
  const [ballotSettings, setBallotSettings] = useState({
    title: '',
    date: '',
    language: 'en'
  });
  const [validationResults, setValidationResults] = useState(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const workspaceOptions = [
    { id: 'builder', label: 'Ballot Builder', icon: 'Edit3', description: 'Create and edit contests' },
    { id: 'preview', label: 'Preview', icon: 'Eye', description: 'Real-time ballot preview' },
    { id: 'templates', label: 'Templates', icon: 'FileText', description: 'Pre-built ballot templates' },
    { id: 'validation', label: 'Validation', icon: 'CheckCircle', description: 'Error checking and compliance' },
    { id: 'testing', label: 'Testing', icon: 'Play', description: 'Simulate voter experience' }
  ];

  const handleContestAdd = (contest) => {
    setContests(prev => [...prev, contest]);
  };

  const handleContestUpdate = (updatedContest) => {
    setContests(prev => prev.map(contest => 
      contest.id === updatedContest.id ? updatedContest : contest
    ));
  };

  const handleContestDelete = (contestId) => {
    setContests(prev => prev.filter(contest => contest.id !== contestId));
  };

  const handleTemplateSelect = (template) => {
    // Mock template data conversion
    const templateContests = [
      {
        id: `${template.id}-contest-1`,
        title: `${template.name} - Contest 1`,
        description: 'Sample contest from template',
        type: 'single-choice',
        maxSelections: 1,
        allowWriteIn: false,
        candidates: [
          {
            id: '1',
            name: 'John Smith',
            party: 'Democratic Party',
            description: 'Experienced public servant with 15 years in local government',
            photo: 'https://randomuser.me/api/portraits/men/32.jpg'
          },
          {
            id: '2',
            name: 'Sarah Johnson',
            party: 'Republican Party',
            description: 'Business leader focused on economic development',
            photo: 'https://randomuser.me/api/portraits/women/44.jpg'
          }
        ]
      }
    ];

    setContests(templateContests);
    setBallotSettings(prev => ({
      ...prev,
      title: template.name,
      date: '2024-11-05'
    }));
    setActiveWorkspace('builder');
  };

  const handleValidationComplete = (results) => {
    setValidationResults(results);
  };

  const renderWorkspaceContent = () => {
    switch (activeWorkspace) {
      case 'builder':
        return (
          <BallotBuilder
            contests={contests}
            onContestAdd={handleContestAdd}
            onContestUpdate={handleContestUpdate}
            onContestDelete={handleContestDelete}
          />
        );
      case 'preview':
        return (
          <BallotPreview
            contests={contests}
            ballotSettings={ballotSettings}
          />
        );
      case 'templates':
        return (
          <TemplateLibrary
            onTemplateSelect={handleTemplateSelect}
          />
        );
      case 'validation':
        return (
          <ValidationEngine
            contests={contests}
            ballotSettings={ballotSettings}
            onValidationComplete={handleValidationComplete}
          />
        );
      case 'testing':
        return (
          <BallotTestingSimulator
            contests={contests}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedHeader />
      <RoleBasedSidebar />
      
      <div className="pt-16 lg:pl-80">
        <div className="h-screen flex flex-col">
          {/* Workspace Navigation */}
          <div className="flex items-center justify-between p-6 border-b civic-border bg-surface">
            <div className="flex items-center space-x-6">
              <div>
                <h1 className="text-2xl font-heading font-bold text-text-primary">Ballot Design & Configuration</h1>
                <p className="text-sm text-text-secondary font-caption">
                  Create, customize, and validate digital ballots for elections
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Validation Status */}
              {validationResults && (
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                  validationResults.isValid 
                    ? 'bg-success/10 text-success' :'bg-error/10 text-error'
                }`}>
                  <Icon 
                    name={validationResults.isValid ? "CheckCircle" : "AlertCircle"} 
                    size={14}
                  />
                  <span className="font-caption">
                    {validationResults.isValid ? 'Valid' : `${validationResults.errors.length} errors`}
                  </span>
                </div>
              )}

              {/* Quick Actions */}
              <Button
                variant="outline"
                size="sm"
                iconName="Save"
                iconPosition="left"
              >
                Save Draft
              </Button>
              
              <Button
                variant="default"
                size="sm"
                iconName="Send"
                iconPosition="left"
                disabled={!validationResults?.isValid}
              >
                Publish Ballot
              </Button>
            </div>
          </div>

          {/* Workspace Tabs */}
          <div className="flex border-b civic-border bg-surface">
            {workspaceOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveWorkspace(option.id)}
                className={`flex items-center space-x-2 px-6 py-3 font-body civic-transition relative ${
                  activeWorkspace === option.id
                    ? 'text-primary bg-primary/5 border-b-2 border-primary' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={option.icon} size={16} />
                <div className="text-left">
                  <div className="font-semibold">{option.label}</div>
                  <div className="text-xs opacity-75 font-caption">{option.description}</div>
                </div>
                
                {/* Notification badges */}
                {option.id === 'validation' && validationResults && !validationResults.isValid && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Main Workspace */}
          <div className="flex-1 flex">
            {/* Left Panel - Active Workspace */}
            <div className="flex-1 flex flex-col">
              {renderWorkspaceContent()}
            </div>

            {/* Right Panel - Quick Preview (Desktop Only) */}
            {activeWorkspace !== 'preview' && (
              <div className="hidden xl:block w-96 border-l civic-border bg-surface">
                <div className="h-full">
                  <div className="p-4 border-b civic-border">
                    <h3 className="font-heading font-semibold text-text-primary">Quick Preview</h3>
                    <p className="text-sm text-text-secondary font-caption">Live ballot preview</p>
                  </div>
                  <div className="h-full overflow-hidden">
                    <BallotPreview
                      contests={contests}
                      ballotSettings={ballotSettings}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Status Bar */}
          <div className="border-t civic-border p-4 bg-muted/30">
            <div className="flex items-center justify-between text-sm text-text-secondary">
              <div className="flex items-center space-x-4">
                <span className="font-caption">Contests: {contests.length}</span>
                <span className="font-caption">
                  Candidates: {contests.reduce((total, contest) => total + contest.candidates.length, 0)}
                </span>
                <span className="font-caption">
                  Last saved: {new Date().toLocaleTimeString()}
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="font-caption">Auto-save enabled</span>
                </div>
                
                <Link 
                  to="/election-administration-dashboard"
                  className="flex items-center space-x-1 hover:text-primary civic-transition"
                >
                  <Icon name="ArrowLeft" size={14} />
                  <span className="font-caption">Back to Dashboard</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BallotDesignConfiguration;