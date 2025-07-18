import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RealTimeMonitoringWidget = () => {
  const [monitoringData, setMonitoringData] = useState({
    totalVotescast: 10799,
    votingRate: 23.4,
    serverLoad: 67,
    activeConnections: 1247,
    securityAlerts: 0,
    systemUptime: 99.97,
    lastUpdate: new Date()
  });

  const [timeRange, setTimeRange] = useState('1h');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMonitoringData(prev => ({
        ...prev,
        totalVotescast: prev.totalVotescast + Math.floor(Math.random() * 5),
        votingRate: Math.max(0, prev.votingRate + (Math.random() - 0.5) * 2),
        serverLoad: Math.max(0, Math.min(100, prev.serverLoad + (Math.random() - 0.5) * 10)),
        activeConnections: Math.max(0, prev.activeConnections + Math.floor((Math.random() - 0.5) * 20)),
        lastUpdate: new Date()
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const votingActivity = [
    { time: '12:00', votes: 45 },
    { time: '12:15', votes: 67 },
    { time: '12:30', votes: 89 },
    { time: '12:45', votes: 123 },
    { time: '13:00', votes: 156 },
    { time: '13:15', votes: 134 },
    { time: '13:30', votes: 178 },
    { time: '13:45', votes: 145 }
  ];

  const systemMetrics = [
    {
      label: 'Server Load',
      value: monitoringData.serverLoad,
      unit: '%',
      status: monitoringData.serverLoad > 80 ? 'warning' : 'success',
      icon: 'Server'
    },
    {
      label: 'Active Connections',
      value: monitoringData.activeConnections,
      unit: '',
      status: 'success',
      icon: 'Users'
    },
    {
      label: 'System Uptime',
      value: monitoringData.systemUptime,
      unit: '%',
      status: 'success',
      icon: 'Activity'
    },
    {
      label: 'Security Alerts',
      value: monitoringData.securityAlerts,
      unit: '',
      status: monitoringData.securityAlerts > 0 ? 'error' : 'success',
      icon: 'Shield'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'muted';
    }
  };

  const timeRanges = [
    { value: '15m', label: '15 min' },
    { value: '1h', label: '1 hour' },
    { value: '6h', label: '6 hours' },
    { value: '24h', label: '24 hours' }
  ];

  return (
    <div className="bg-surface border civic-border rounded-lg civic-shadow-sm">
      <div className="p-6 border-b civic-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-heading font-bold text-text-primary">Real-Time Monitoring</h2>
            <p className="text-sm text-text-secondary font-caption mt-1">
              Live system and voting activity
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                className={`px-3 py-1 text-sm font-caption rounded-md civic-transition ${
                  timeRange === range.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-mono font-bold text-success">
                  {monitoringData.totalVotescast.toLocaleString()}
                </div>
                <div className="text-sm text-success font-caption">Total Votes Cast</div>
              </div>
              <Icon name="Vote" size={24} color="var(--color-success)" />
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-mono font-bold text-primary">
                  {monitoringData.votingRate.toFixed(1)}
                </div>
                <div className="text-sm text-primary font-caption">Votes/min</div>
              </div>
              <Icon name="TrendingUp" size={24} color="var(--color-primary)" />
            </div>
          </div>

          {systemMetrics.slice(0, 2).map((metric) => (
            <div key={metric.label} className={`bg-${getStatusColor(metric.status)}/10 border border-${getStatusColor(metric.status)}/20 rounded-lg p-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-2xl font-mono font-bold text-${getStatusColor(metric.status)}`}>
                    {metric.value.toLocaleString()}{metric.unit}
                  </div>
                  <div className={`text-sm text-${getStatusColor(metric.status)} font-caption`}>
                    {metric.label}
                  </div>
                </div>
                <Icon 
                  name={metric.icon} 
                  size={24} 
                  color={`var(--color-${getStatusColor(metric.status)})`} 
                />
              </div>
            </div>
          ))}
        </div>

        {/* Voting Activity Chart */}
        <div className="mb-6">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
            Voting Activity
          </h3>
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-end justify-between h-32 space-x-2">
              {votingActivity.map((activity, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-primary rounded-t-sm civic-transition hover:bg-primary/80"
                    style={{
                      height: `${(activity.votes / Math.max(...votingActivity.map(a => a.votes))) * 100}%`,
                      minHeight: '4px'
                    }}
                  ></div>
                  <div className="text-xs text-text-secondary font-mono mt-2">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Health */}
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
            System Health
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemMetrics.map((metric) => (
              <div key={metric.label} className="flex items-center justify-between p-4 border civic-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-${getStatusColor(metric.status)}/10`}>
                    <Icon
                      name={metric.icon}
                      size={20}
                      color={`var(--color-${getStatusColor(metric.status)})`}
                    />
                  </div>
                  <div>
                    <div className="font-body font-semibold text-text-primary">
                      {metric.label}
                    </div>
                    <div className="text-sm text-text-secondary font-caption">
                      Current status
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-mono font-bold text-${getStatusColor(metric.status)}`}>
                    {metric.value.toLocaleString()}{metric.unit}
                  </div>
                  <div className={`text-sm text-${getStatusColor(metric.status)} font-caption`}>
                    {metric.status === 'success' ? 'Normal' : metric.status === 'warning' ? 'Warning' : 'Alert'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Last Update */}
        <div className="mt-6 pt-4 border-t civic-border">
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="RefreshCw" size={14} />
              <span className="font-caption">
                Last updated: {monitoringData.lastUpdate.toLocaleTimeString()}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="font-caption">Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitoringWidget;