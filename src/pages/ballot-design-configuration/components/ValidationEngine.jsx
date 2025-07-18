import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ValidationEngine = ({ contests = [], ballotSettings = {}, onValidationComplete }) => {
  const [validationResults, setValidationResults] = useState({
    errors: [],
    warnings: [],
    suggestions: [],
    isValid: false,
    lastChecked: null
  });
  const [isValidating, setIsValidating] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    errors: true,
    warnings: true,
    suggestions: false
  });

  const validationRules = [
    {
      id: 'ballot-title',
      type: 'error',
      check: () => !ballotSettings.title || ballotSettings.title.trim().length === 0,
      message: 'Ballot title is required',
      suggestion: 'Add a descriptive title for your ballot (e.g., "2024 General Election")'
    },
    {
      id: 'election-date',
      type: 'error',
      check: () => !ballotSettings.date,
      message: 'Election date is required',
      suggestion: 'Set the election date in ballot settings'
    },
    {
      id: 'no-contests',
      type: 'error',
      check: () => contests.length === 0,
      message: 'At least one contest is required',
      suggestion: 'Add contests to your ballot using the Ballot Builder'
    },
    {
      id: 'empty-contests',
      type: 'error',
      check: () => contests.some(contest => contest.candidates.length === 0),
      message: 'All contests must have at least one candidate',
      suggestion: 'Add candidates to all contests or remove empty contests'
    },
    {
      id: 'missing-candidate-names',
      type: 'error',
      check: () => contests.some(contest => 
        contest.candidates.some(candidate => !candidate.name || candidate.name.trim().length === 0)
      ),
      message: 'All candidates must have names',
      suggestion: 'Ensure all candidates have complete name information'
    },
    {
      id: 'single-candidate-contest',
      type: 'warning',
      check: () => contests.some(contest => contest.candidates.length === 1 && !contest.allowWriteIn),
      message: 'Some contests have only one candidate without write-in option',
      suggestion: 'Consider enabling write-in candidates or adding more candidates'
    },
    {
      id: 'long-contest-titles',
      type: 'warning',
      check: () => contests.some(contest => contest.title && contest.title.length > 50),
      message: 'Some contest titles are very long',
      suggestion: 'Keep contest titles concise for better readability'
    },
    {
      id: 'missing-candidate-parties',
      type: 'warning',
      check: () => contests.some(contest => 
        contest.candidates.some(candidate => !candidate.party || candidate.party.trim().length === 0)
      ),
      message: 'Some candidates are missing party affiliations',
      suggestion: 'Add party information for all candidates or mark as independent'
    },
    {
      id: 'no-descriptions',
      type: 'suggestion',
      check: () => contests.some(contest => !contest.description || contest.description.trim().length === 0),
      message: 'Contest descriptions help voters understand what they\'re voting for',
      suggestion: 'Add brief descriptions to explain each contest'
    },
    {
      id: 'candidate-photos',
      type: 'suggestion',
      check: () => contests.some(contest => 
        contest.candidates.some(candidate => !candidate.photo)
      ),
      message: 'Candidate photos improve voter recognition',
      suggestion: 'Consider adding photos for all candidates'
    },
    {
      id: 'accessibility-check',
      type: 'suggestion',
      check: () => true, // Always suggest accessibility review
      message: 'Accessibility compliance review recommended',
      suggestion: 'Review ballot for screen reader compatibility and color contrast'
    }
  ];

  useEffect(() => {
    runValidation();
  }, [contests, ballotSettings]);

  const runValidation = async () => {
    setIsValidating(true);
    
    // Simulate validation processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const errors = [];
    const warnings = [];
    const suggestions = [];

    validationRules.forEach(rule => {
      if (rule.check()) {
        const issue = {
          id: rule.id,
          message: rule.message,
          suggestion: rule.suggestion
        };

        switch (rule.type) {
          case 'error':
            errors.push(issue);
            break;
          case 'warning':
            warnings.push(issue);
            break;
          case 'suggestion':
            suggestions.push(issue);
            break;
        }
      }
    });

    const results = {
      errors,
      warnings,
      suggestions,
      isValid: errors.length === 0,
      lastChecked: new Date()
    };

    setValidationResults(results);
    setIsValidating(false);
    
    if (onValidationComplete) {
      onValidationComplete(results);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getIssueIcon = (type) => {
    switch (type) {
      case 'error':
        return { name: 'AlertCircle', color: 'var(--color-error)' };
      case 'warning':
        return { name: 'AlertTriangle', color: 'var(--color-warning)' };
      case 'suggestion':
        return { name: 'Lightbulb', color: 'var(--color-accent)' };
      default:
        return { name: 'Info', color: 'var(--color-text-secondary)' };
    }
  };

  const getIssueColor = (type) => {
    switch (type) {
      case 'error':
        return 'border-error bg-error/5';
      case 'warning':
        return 'border-warning bg-warning/5';
      case 'suggestion':
        return 'border-accent bg-accent/5';
      default:
        return 'border-muted bg-muted/5';
    }
  };

  const renderIssueSection = (title, issues, type, isExpanded) => {
    if (issues.length === 0) return null;

    const icon = getIssueIcon(type);

    return (
      <div className={`border rounded-lg ${getIssueColor(type)}`}>
        <button
          onClick={() => toggleSection(type)}
          className="w-full flex items-center justify-between p-4 text-left civic-transition hover:bg-black/5"
        >
          <div className="flex items-center space-x-3">
            <Icon name={icon.name} size={20} color={icon.color} />
            <div>
              <h3 className="font-heading font-semibold text-text-primary">{title}</h3>
              <p className="text-sm text-text-secondary font-caption">
                {issues.length} {issues.length === 1 ? 'issue' : 'issues'} found
              </p>
            </div>
          </div>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="text-text-secondary"
          />
        </button>

        {isExpanded && (
          <div className="px-4 pb-4 space-y-3">
            {issues.map((issue) => (
              <div key={issue.id} className="bg-surface rounded-lg p-3 border civic-border">
                <p className="font-body text-text-primary mb-2">{issue.message}</p>
                <p className="text-sm text-text-secondary font-caption">{issue.suggestion}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-surface">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b civic-border">
        <div>
          <h2 className="text-xl font-heading font-bold text-text-primary">Validation Engine</h2>
          <p className="text-sm text-text-secondary font-caption">
            Automated ballot validation and compliance checking
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {validationResults.lastChecked && (
            <div className="text-sm text-text-secondary font-caption">
              Last checked: {validationResults.lastChecked.toLocaleTimeString()}
            </div>
          )}
          <Button
            variant="outline"
            onClick={runValidation}
            loading={isValidating}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Re-validate
          </Button>
        </div>
      </div>

      {/* Validation Status */}
      <div className="p-6 border-b civic-border">
        <div className={`flex items-center space-x-3 p-4 rounded-lg ${
          validationResults.isValid 
            ? 'bg-success/10 border border-success/20' :'bg-error/10 border border-error/20'
        }`}>
          <Icon 
            name={validationResults.isValid ? "CheckCircle" : "AlertCircle"} 
            size={24} 
            color={validationResults.isValid ? "var(--color-success)" : "var(--color-error)"}
          />
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-text-primary">
              {validationResults.isValid ? 'Ballot is Valid' : 'Validation Issues Found'}
            </h3>
            <p className="text-sm text-text-secondary font-caption">
              {validationResults.isValid 
                ? 'Your ballot passes all validation checks and is ready for deployment'
                : `${validationResults.errors.length} errors, ${validationResults.warnings.length} warnings, ${validationResults.suggestions.length} suggestions`
              }
            </p>
          </div>
          {validationResults.isValid && (
            <Button
              variant="success"
              iconName="Send"
              iconPosition="left"
            >
              Deploy Ballot
            </Button>
          )}
        </div>
      </div>

      {/* Validation Results */}
      <div className="flex-1 overflow-y-auto p-6">
        {isValidating ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Icon name="Loader2" size={48} className="mx-auto text-primary mb-4 animate-spin" />
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">Validating Ballot</h3>
              <p className="text-text-secondary font-caption">Checking for errors and compliance issues...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Errors */}
            {renderIssueSection(
              'Critical Errors',
              validationResults.errors,
              'error',
              expandedSections.errors
            )}

            {/* Warnings */}
            {renderIssueSection(
              'Warnings',
              validationResults.warnings,
              'warning',
              expandedSections.warnings
            )}

            {/* Suggestions */}
            {renderIssueSection(
              'Suggestions',
              validationResults.suggestions,
              'suggestion',
              expandedSections.suggestions
            )}

            {/* No Issues */}
            {validationResults.isValid && validationResults.warnings.length === 0 && validationResults.suggestions.length === 0 && (
              <div className="text-center py-12">
                <Icon name="CheckCircle" size={48} className="mx-auto text-success mb-4" />
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">Perfect Ballot!</h3>
                <p className="text-text-secondary font-caption">
                  Your ballot has no issues and follows all best practices
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Validation Summary */}
      <div className="border-t civic-border p-4 bg-muted/30">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4 text-text-secondary">
            <span className="font-caption">Contests: {contests.length}</span>
            <span className="font-caption">
              Candidates: {contests.reduce((total, contest) => total + contest.candidates.length, 0)}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {validationResults.errors.length > 0 && (
              <span className="text-error font-caption">{validationResults.errors.length} errors</span>
            )}
            {validationResults.warnings.length > 0 && (
              <span className="text-warning font-caption">{validationResults.warnings.length} warnings</span>
            )}
            {validationResults.suggestions.length > 0 && (
              <span className="text-accent font-caption">{validationResults.suggestions.length} suggestions</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationEngine;