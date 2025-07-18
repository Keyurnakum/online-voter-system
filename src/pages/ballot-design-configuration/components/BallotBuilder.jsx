import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BallotBuilder = ({ onContestAdd, onContestUpdate, onContestDelete, contests = [] }) => {
  const [activeTab, setActiveTab] = useState('contests');
  const [showContestForm, setShowContestForm] = useState(false);
  const [editingContest, setEditingContest] = useState(null);
  const [contestForm, setContestForm] = useState({
    id: '',
    title: '',
    description: '',
    type: 'single-choice',
    maxSelections: 1,
    allowWriteIn: false,
    candidates: []
  });

  const contestTypes = [
    { value: 'single-choice', label: 'Single Choice' },
    { value: 'multi-choice', label: 'Multiple Choice' },
    { value: 'ranked-choice', label: 'Ranked Choice' },
    { value: 'approval', label: 'Approval Voting' }
  ];

  const tabs = [
    { id: 'contests', label: 'Contests', icon: 'Vote' },
    { id: 'candidates', label: 'Candidates', icon: 'Users' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  const handleContestSubmit = (e) => {
    e.preventDefault();
    const contestData = {
      ...contestForm,
      id: editingContest ? editingContest.id : Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    if (editingContest) {
      onContestUpdate(contestData);
    } else {
      onContestAdd(contestData);
    }

    resetForm();
  };

  const resetForm = () => {
    setContestForm({
      id: '',
      title: '',
      description: '',
      type: 'single-choice',
      maxSelections: 1,
      allowWriteIn: false,
      candidates: []
    });
    setEditingContest(null);
    setShowContestForm(false);
  };

  const handleEditContest = (contest) => {
    setContestForm(contest);
    setEditingContest(contest);
    setShowContestForm(true);
  };

  const handleDeleteContest = (contestId) => {
    if (window.confirm('Are you sure you want to delete this contest?')) {
      onContestDelete(contestId);
    }
  };

  const addCandidate = () => {
    const newCandidate = {
      id: Date.now().toString(),
      name: '',
      party: '',
      description: '',
      photo: ''
    };
    setContestForm(prev => ({
      ...prev,
      candidates: [...prev.candidates, newCandidate]
    }));
  };

  const updateCandidate = (candidateId, field, value) => {
    setContestForm(prev => ({
      ...prev,
      candidates: prev.candidates.map(candidate =>
        candidate.id === candidateId ? { ...candidate, [field]: value } : candidate
      )
    }));
  };

  const removeCandidate = (candidateId) => {
    setContestForm(prev => ({
      ...prev,
      candidates: prev.candidates.filter(candidate => candidate.id !== candidateId)
    }));
  };

  return (
    <div className="h-full flex flex-col bg-surface">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b civic-border">
        <div>
          <h2 className="text-xl font-heading font-bold text-text-primary">Ballot Builder</h2>
          <p className="text-sm text-text-secondary font-caption">Create and manage ballot contests</p>
        </div>
        <Button
          variant="default"
          onClick={() => setShowContestForm(true)}
          iconName="Plus"
          iconPosition="left"
        >
          Add Contest
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b civic-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 font-body civic-transition ${
              activeTab === tab.id
                ? 'border-b-2 border-primary text-primary bg-primary/5' :'text-text-secondary hover:text-text-primary hover:bg-muted'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'contests' && (
          <div className="space-y-4">
            {contests.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Vote" size={48} className="mx-auto text-text-secondary mb-4" />
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">No Contests Yet</h3>
                <p className="text-text-secondary font-caption mb-4">Start building your ballot by adding contests</p>
                <Button
                  variant="default"
                  onClick={() => setShowContestForm(true)}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Create First Contest
                </Button>
              </div>
            ) : (
              contests.map((contest) => (
                <div key={contest.id} className="bg-card border civic-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-text-primary">{contest.title}</h3>
                      <p className="text-sm text-text-secondary font-caption mt-1">{contest.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditContest(contest)}
                        iconName="Edit"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteContest(contest.id)}
                        iconName="Trash2"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <span className="font-caption">Type: {contest.type}</span>
                    <span className="font-caption">Candidates: {contest.candidates.length}</span>
                    {contest.allowWriteIn && (
                      <span className="bg-accent/10 text-accent px-2 py-1 rounded font-caption">Write-in Allowed</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'candidates' && (
          <div className="text-center py-12">
            <Icon name="Users" size={48} className="mx-auto text-text-secondary mb-4" />
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">Candidate Management</h3>
            <p className="text-text-secondary font-caption">Add contests first to manage candidates</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-card border civic-border rounded-lg p-6">
              <h3 className="font-heading font-semibold text-text-primary mb-4">Ballot Settings</h3>
              <div className="space-y-4">
                <Input
                  label="Ballot Title"
                  placeholder="e.g., 2024 General Election"
                  className="mb-4"
                />
                <Input
                  label="Election Date"
                  type="date"
                  className="mb-4"
                />
                <Select
                  label="Ballot Language"
                  options={[
                    { value: 'en', label: 'English' },
                    { value: 'es', label: 'Spanish' },
                    { value: 'fr', label: 'French' }
                  ]}
                  value="en"
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contest Form Modal */}
      {showContestForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1300 p-4">
          <div className="bg-surface rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b civic-border">
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                {editingContest ? 'Edit Contest' : 'Add New Contest'}
              </h3>
            </div>
            
            <form onSubmit={handleContestSubmit} className="p-6 space-y-4">
              <Input
                label="Contest Title"
                placeholder="e.g., Mayor of Springfield"
                value={contestForm.title}
                onChange={(e) => setContestForm(prev => ({ ...prev, title: e.target.value }))}
                required
              />
              
              <Input
                label="Description"
                placeholder="Brief description of the contest"
                value={contestForm.description}
                onChange={(e) => setContestForm(prev => ({ ...prev, description: e.target.value }))}
              />
              
              <Select
                label="Voting Type"
                options={contestTypes}
                value={contestForm.type}
                onChange={(value) => setContestForm(prev => ({ ...prev, type: value }))}
              />

              {/* Candidates Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-semibold text-text-primary">Candidates</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addCandidate}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Add Candidate
                  </Button>
                </div>
                
                {contestForm.candidates.map((candidate) => (
                  <div key={candidate.id} className="bg-muted rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="font-body font-semibold text-text-primary">Candidate {contestForm.candidates.indexOf(candidate) + 1}</h5>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCandidate(candidate.id)}
                        iconName="Trash2"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input
                        label="Full Name"
                        placeholder="Candidate name"
                        value={candidate.name}
                        onChange={(e) => updateCandidate(candidate.id, 'name', e.target.value)}
                        required
                      />
                      <Input
                        label="Party Affiliation"
                        placeholder="Political party"
                        value={candidate.party}
                        onChange={(e) => updateCandidate(candidate.id, 'party', e.target.value)}
                      />
                    </div>
                    
                    <Input
                      label="Biography"
                      placeholder="Brief candidate description"
                      value={candidate.description}
                      onChange={(e) => updateCandidate(candidate.id, 'description', e.target.value)}
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t civic-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  disabled={!contestForm.title || contestForm.candidates.length === 0}
                >
                  {editingContest ? 'Update Contest' : 'Create Contest'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BallotBuilder;