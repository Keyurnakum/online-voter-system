import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const HistoricalComparisonTab = () => {
  const [selectedMetric, setSelectedMetric] = useState('turnout');
  const [selectedTimeframe, setSelectedTimeframe] = useState('presidential');

  const metricOptions = [
    { value: 'turnout', label: 'Voter Turnout' },
    { value: 'demographics', label: 'Demographics' },
    { value: 'methods', label: 'Voting Methods' },
    { value: 'results', label: 'Election Results' }
  ];

  const timeframeOptions = [
    { value: 'presidential', label: 'Presidential Elections' },
    { value: 'midterm', label: 'Midterm Elections' },
    { value: 'local', label: 'Local Elections' },
    { value: 'all', label: 'All Elections' }
  ];

  const turnoutHistoryData = [
    { year: '2008', turnout: 61.6, registered: 146000, voted: 89936 },
    { year: '2012', turnout: 58.6, registered: 153000, voted: 89658 },
    { year: '2016', turnout: 55.7, registered: 157000, voted: 87449 },
    { year: '2020', turnout: 66.6, registered: 168000, voted: 111888 },
    { year: '2024', turnout: 78.6, registered: 175000, voted: 137650 }
  ];

  const demographicComparisonData = [
    {
      year: '2020',
      '18-24': 50.8,
      '25-34': 63.0,
      '35-44': 69.4,
      '45-54': 70.1,
      '55-64': 72.6,
      '65+': 76.0
    },
    {
      year: '2024',
      '18-24': 50.2,
      '25-34': 67.7,
      '35-44': 86.2,
      '45-54': 88.9,
      '55-64': 93.1,
      '65+': 92.9
    }
  ];

  const votingMethodsComparison = [
    {
      year: '2020',
      'In-Person Early': 28.5,
      'Election Day': 45.2,
      'Mail-in Ballot': 18.7,
      'Absentee': 7.6
    },
    {
      year: '2024',
      'In-Person Early': 36.7,
      'Election Day': 30.4,
      'Mail-in Ballot': 23.2,
      'Absentee': 9.7
    }
  ];

  const electionResultsHistory = [
    { year: '2008', democratic: 52.9, republican: 45.7, other: 1.4 },
    { year: '2012', democratic: 51.1, republican: 47.2, other: 1.7 },
    { year: '2016', democratic: 48.2, republican: 46.1, other: 5.7 },
    { year: '2020', democratic: 51.3, republican: 46.8, other: 1.9 },
    { year: '2024', democratic: 54.5, republican: 36.7, other: 8.8 }
  ];

  const renderTurnoutComparison = () => (
    <div className="space-y-6">
      <div className="bg-surface border civic-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Voter Turnout Trends
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={turnoutHistoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="year" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                domain={[40, 85]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
                formatter={(value) => [`${value}%`, 'Turnout']}
              />
              <Line 
                type="monotone" 
                dataKey="turnout" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface border civic-border rounded-lg p-6">
          <h4 className="font-heading font-semibold text-text-primary mb-4">
            Turnout Comparison
          </h4>
          <div className="space-y-4">
            {turnoutHistoryData.slice(-3).map((item) => (
              <div key={item.year} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="font-mono font-semibold text-text-primary w-12">
                    {item.year}
                  </span>
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full civic-transition"
                      style={{ width: `${(item.turnout / 85) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="font-mono font-bold text-text-primary">
                  {item.turnout}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface border civic-border rounded-lg p-6">
          <h4 className="font-heading font-semibold text-text-primary mb-4">
            Key Insights
          </h4>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Icon name="TrendingUp" size={16} color="var(--color-success)" className="mt-1" />
              <div>
                <p className="text-sm font-caption text-text-primary">
                  <strong>+12% increase</strong> from 2020 to 2024
                </p>
                <p className="text-xs text-text-secondary font-caption">
                  Highest turnout in 16 years
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="Users" size={16} color="var(--color-primary)" className="mt-1" />
              <div>
                <p className="text-sm font-caption text-text-primary">
                  <strong>25,762 more votes</strong> than 2020
                </p>
                <p className="text-xs text-text-secondary font-caption">
                  Despite similar registration numbers
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="Calendar" size={16} color="var(--color-accent)" className="mt-1" />
              <div>
                <p className="text-sm font-caption text-text-primary">
                  <strong>Consistent growth</strong> since 2016
                </p>
                <p className="text-xs text-text-secondary font-caption">
                  Reversing previous decline trend
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDemographicsComparison = () => (
    <div className="bg-surface border civic-border rounded-lg p-6">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
        Demographic Turnout: 2020 vs 2024
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={demographicComparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="year" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="18-24" fill="#1B365D" name="18-24" />
            <Bar dataKey="25-34" fill="#4A90A4" name="25-34" />
            <Bar dataKey="35-44" fill="#2E8B57" name="35-44" />
            <Bar dataKey="45-54" fill="#D97706" name="45-54" />
            <Bar dataKey="55-64" fill="#DC2626" name="55-64" />
            <Bar dataKey="65+" fill="#7C3AED" name="65+" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderVotingMethodsComparison = () => (
    <div className="bg-surface border civic-border rounded-lg p-6">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
        Voting Methods: 2020 vs 2024
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={votingMethodsComparison}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="year" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="In-Person Early" fill="#1B365D" name="In-Person Early" />
            <Bar dataKey="Election Day" fill="#4A90A4" name="Election Day" />
            <Bar dataKey="Mail-in Ballot" fill="#2E8B57" name="Mail-in Ballot" />
            <Bar dataKey="Absentee" fill="#D97706" name="Absentee" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderElectionResultsComparison = () => (
    <div className="bg-surface border civic-border rounded-lg p-6">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
        Election Results History
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={electionResultsHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="year" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="democratic" 
              stroke="#1E40AF" 
              strokeWidth={3}
              name="Democratic"
            />
            <Line 
              type="monotone" 
              dataKey="republican" 
              stroke="#DC2626" 
              strokeWidth={3}
              name="Republican"
            />
            <Line 
              type="monotone" 
              dataKey="other" 
              stroke="#059669" 
              strokeWidth={3}
              name="Other"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderCurrentMetric = () => {
    switch (selectedMetric) {
      case 'turnout':
        return renderTurnoutComparison();
      case 'demographics':
        return renderDemographicsComparison();
      case 'methods':
        return renderVotingMethodsComparison();
      case 'results':
        return renderElectionResultsComparison();
      default:
        return renderTurnoutComparison();
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Metric to Compare"
          options={metricOptions}
          value={selectedMetric}
          onChange={setSelectedMetric}
        />
        <Select
          label="Election Type"
          options={timeframeOptions}
          value={selectedTimeframe}
          onChange={setSelectedTimeframe}
        />
      </div>

      {/* Current Metric View */}
      {renderCurrentMetric()}

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface border civic-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} color="var(--color-success)" />
            <span className="text-sm font-caption text-text-secondary">Turnout Change</span>
          </div>
          <div className="text-2xl font-mono font-bold text-success">+12.0%</div>
          <div className="text-xs text-text-secondary font-caption">vs 2020</div>
        </div>
        
        <div className="bg-surface border civic-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Users" size={16} color="var(--color-primary)" />
            <span className="text-sm font-caption text-text-secondary">New Voters</span>
          </div>
          <div className="text-2xl font-mono font-bold text-text-primary">7,000</div>
          <div className="text-xs text-text-secondary font-caption">since 2020</div>
        </div>
        
        <div className="bg-surface border civic-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Calendar" size={16} color="var(--color-accent)" />
            <span className="text-sm font-caption text-text-secondary">Elections Analyzed</span>
          </div>
          <div className="text-2xl font-mono font-bold text-text-primary">5</div>
          <div className="text-xs text-text-secondary font-caption">2008-2024</div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalComparisonTab;