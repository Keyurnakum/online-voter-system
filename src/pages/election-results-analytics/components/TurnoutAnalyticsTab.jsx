import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const TurnoutAnalyticsTab = () => {
  const [selectedView, setSelectedView] = useState('demographics');

  const viewOptions = [
    { value: 'demographics', label: 'Demographics' },
    { value: 'geographic', label: 'Geographic' },
    { value: 'methods', label: 'Voting Methods' },
    { value: 'timeline', label: 'Timeline' }
  ];

  const demographicData = [
    { category: '18-24', registered: 2456, voted: 1234, percentage: 50.2 },
    { category: '25-34', registered: 3789, voted: 2567, percentage: 67.7 },
    { category: '35-44', registered: 3234, voted: 2789, percentage: 86.2 },
    { category: '45-54', registered: 2987, voted: 2654, percentage: 88.9 },
    { category: '55-64', registered: 2134, voted: 1987, percentage: 93.1 },
    { category: '65+', registered: 1567, voted: 1456, percentage: 92.9 }
  ];

  const geographicData = [
    { district: 'District 1', registered: 4567, voted: 3456, percentage: 75.7 },
    { district: 'District 2', registered: 3789, voted: 2987, percentage: 78.8 },
    { district: 'District 3', registered: 2345, voted: 1876, percentage: 80.0 },
    { district: 'District 4', registered: 3456, voted: 2654, percentage: 76.8 },
    { district: 'District 5', registered: 1690, voted: 1327, percentage: 78.5 }
  ];

  const votingMethodsData = [
    { method: 'In-Person Early', votes: 4567, percentage: 36.7, color: '#1B365D' },
    { method: 'Election Day', votes: 3789, percentage: 30.4, color: '#4A90A4' },
    { method: 'Mail-in Ballot', votes: 2890, percentage: 23.2, color: '#2E8B57' },
    { method: 'Absentee', votes: 1210, percentage: 9.7, color: '#D97706' }
  ];

  const timelineData = [
    { time: '6:00 AM', votes: 234 },
    { time: '8:00 AM', votes: 1567 },
    { time: '10:00 AM', votes: 2890 },
    { time: '12:00 PM', votes: 4567 },
    { time: '2:00 PM', votes: 6234 },
    { time: '4:00 PM', votes: 8901 },
    { time: '6:00 PM', votes: 11456 },
    { time: '8:00 PM', votes: 12456 }
  ];

  const renderDemographicsView = () => (
    <div className="space-y-6">
      <div className="bg-surface border civic-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Turnout by Age Group
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={demographicData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="category" 
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
              <Bar dataKey="percentage" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {demographicData.map((item) => (
          <div key={item.category} className="bg-surface border civic-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-heading font-semibold text-text-primary">
                Age {item.category}
              </h4>
              <span className="text-lg font-mono font-bold text-primary">
                {item.percentage}%
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-text-secondary">
                <span className="font-caption">Registered: {item.registered.toLocaleString()}</span>
                <span className="font-caption">Voted: {item.voted.toLocaleString()}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full civic-transition"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGeographicView = () => (
    <div className="space-y-6">
      <div className="bg-surface border civic-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Turnout by District
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={geographicData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="district" 
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
              <Bar dataKey="percentage" fill="var(--color-secondary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderVotingMethodsView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface border civic-border rounded-lg p-6">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
            Voting Methods Distribution
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={votingMethodsData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="votes"
                  label={({ method, percentage }) => `${method}: ${percentage}%`}
                >
                  {votingMethodsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          {votingMethodsData.map((method) => (
            <div key={method.method} className="bg-surface border civic-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: method.color }}
                  ></div>
                  <span className="font-heading font-semibold text-text-primary">
                    {method.method}
                  </span>
                </div>
                <span className="text-lg font-mono font-bold text-text-primary">
                  {method.percentage}%
                </span>
              </div>
              <div className="text-sm text-text-secondary font-caption">
                {method.votes.toLocaleString()} votes
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTimelineView = () => (
    <div className="bg-surface border civic-border rounded-lg p-6">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
        Voting Timeline - Election Day
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="time" 
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
              dataKey="votes" 
              stroke="var(--color-accent)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (selectedView) {
      case 'demographics':
        return renderDemographicsView();
      case 'geographic':
        return renderGeographicView();
      case 'methods':
        return renderVotingMethodsView();
      case 'timeline':
        return renderTimelineView();
      default:
        return renderDemographicsView();
    }
  };

  return (
    <div className="space-y-6">
      {/* View Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="max-w-xs">
          <Select
            label="Analysis View"
            options={viewOptions}
            value={selectedView}
            onChange={setSelectedView}
          />
        </div>

        <div className="flex items-center space-x-4 text-sm text-text-secondary">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={14} />
            <span className="font-caption">Total Turnout: 78.6%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={14} />
            <span className="font-caption">+5.2% vs 2020</span>
          </div>
        </div>
      </div>

      {/* Current View */}
      {renderCurrentView()}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface border civic-border rounded-lg p-4 text-center">
          <Icon name="Users" size={24} color="var(--color-primary)" className="mx-auto mb-2" />
          <div className="text-2xl font-mono font-bold text-text-primary">15,847</div>
          <div className="text-sm text-text-secondary font-caption">Registered Voters</div>
        </div>
        
        <div className="bg-surface border civic-border rounded-lg p-4 text-center">
          <Icon name="CheckCircle" size={24} color="var(--color-success)" className="mx-auto mb-2" />
          <div className="text-2xl font-mono font-bold text-text-primary">12,456</div>
          <div className="text-sm text-text-secondary font-caption">Votes Cast</div>
        </div>
        
        <div className="bg-surface border civic-border rounded-lg p-4 text-center">
          <Icon name="TrendingUp" size={24} color="var(--color-accent)" className="mx-auto mb-2" />
          <div className="text-2xl font-mono font-bold text-text-primary">78.6%</div>
          <div className="text-sm text-text-secondary font-caption">Turnout Rate</div>
        </div>
        
        <div className="bg-surface border civic-border rounded-lg p-4 text-center">
          <Icon name="MapPin" size={24} color="var(--color-secondary)" className="mx-auto mb-2" />
          <div className="text-2xl font-mono font-bold text-text-primary">847/892</div>
          <div className="text-sm text-text-secondary font-caption">Precincts Reporting</div>
        </div>
      </div>
    </div>
  );
};

export default TurnoutAnalyticsTab;