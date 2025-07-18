import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AuditTrailWidget = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dateRange, setDateRange] = useState('today');

  const auditLogs = [
    {
      id: 1,
      timestamp: "2024-07-18T14:45:00",
      action: "Election Created",
      category: "election",
      user: "admin@votesecure.gov",
      details: "Created new election: City Council District 3",
      ipAddress: "192.168.1.100",
      severity: "info",
      electionId: "ELC-2024-003"
    },
    {
      id: 2,
      timestamp: "2024-07-18T14:30:00",
      action: "Voter Registration Approved",
      category: "voter",
      user: "admin@votesecure.gov",
      details: "Approved voter registration for Sarah Johnson",
      ipAddress: "192.168.1.100",
      severity: "info",
      voterId: "VTR-2024-1234"
    },
    {
      id: 3,
      timestamp: "2024-07-18T14:15:00",
      action: "Ballot Configuration Updated",
      category: "ballot",
      user: "admin@votesecure.gov",
      details: "Updated ballot configuration for Presidential Election 2024",
      ipAddress: "192.168.1.100",
      severity: "info",
      electionId: "ELC-2024-001"
    },
    {
      id: 4,
      timestamp: "2024-07-18T13:45:00",
      action: "System Backup Completed",
      category: "system",
      user: "system",
      details: "Automated daily backup completed successfully",
      ipAddress: "127.0.0.1",
      severity: "info",
      backupId: "BKP-2024-0718"
    },
    {
      id: 5,
      timestamp: "2024-07-18T13:30:00",
      action: "Security Scan Completed",
      category: "security",
      user: "system",
      details: "Routine security scan completed - no threats detected",
      ipAddress: "127.0.0.1",
      severity: "info",
      scanId: "SEC-2024-0718-001"
    },
    {
      id: 6,
      timestamp: "2024-07-18T12:00:00",
      action: "Admin Login",
      category: "authentication",
      user: "admin@votesecure.gov",
      details: "Successful administrator login with MFA",
      ipAddress: "192.168.1.100",
      severity: "info",
      sessionId: "SES-2024-0718-001"
    },
    {
      id: 7,
      timestamp: "2024-07-18T11:30:00",
      action: "Election Status Changed",
      category: "election",
      user: "admin@votesecure.gov",
      details: "Changed election status from \'Draft\' to \'Active\' for Presidential Election 2024",
      ipAddress: "192.168.1.100",
      severity: "warning",
      electionId: "ELC-2024-001"
    },
    {
      id: 8,
      timestamp: "2024-07-18T10:15:00",
      action: "Voter Database Query",
      category: "voter",
      user: "admin@votesecure.gov",
      details: "Exported voter registration data for audit purposes",
      ipAddress: "192.168.1.100",
      severity: "info",
      recordCount: 15847
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', icon: 'List' },
    { value: 'election', label: 'Elections', icon: 'Vote' },
    { value: 'voter', label: 'Voters', icon: 'Users' },
    { value: 'ballot', label: 'Ballots', icon: 'FileText' },
    { value: 'system', label: 'System', icon: 'Server' },
    { value: 'security', label: 'Security', icon: 'Shield' },
    { value: 'authentication', label: 'Auth', icon: 'Key' }
  ];

  const dateRanges = [
    { value: 'today', label: 'Today' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'primary';
      default:
        return 'muted';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return 'AlertTriangle';
      case 'warning':
        return 'AlertCircle';
      case 'info':
        return 'Info';
      default:
        return 'Circle';
    }
  };

  const getCategoryIcon = (category) => {
    const categoryObj = categories.find(cat => cat.value === category);
    return categoryObj ? categoryObj.icon : 'Circle';
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || log.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleExportLogs = () => {
    console.log('Exporting audit logs...');
  };

  return (
    <div className="bg-surface border civic-border rounded-lg civic-shadow-sm">
      <div className="p-6 border-b civic-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-heading font-bold text-text-primary">Audit Trail</h2>
            <p className="text-sm text-text-secondary font-caption mt-1">
              System activity and security logs
            </p>
          </div>
          
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={handleExportLogs}
          >
            Export Logs
          </Button>
        </div>
      </div>

      <div className="p-6">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search audit logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-caption rounded-md civic-transition ${
                  selectedCategory === category.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={category.icon} size={14} />
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="flex items-center space-x-2 mb-6">
          <span className="text-sm font-caption text-text-secondary">Time range:</span>
          {dateRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setDateRange(range.value)}
              className={`px-3 py-1 text-sm font-caption rounded-md civic-transition ${
                dateRange === range.value
                  ? 'bg-secondary text-secondary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* Audit Log Entries */}
        <div className="space-y-3">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-start space-x-4 p-4 border civic-border rounded-lg hover:bg-muted/30 civic-transition"
            >
              <div className="flex items-center space-x-2 flex-shrink-0">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-${getSeverityColor(log.severity)}/10`}>
                  <Icon
                    name={getSeverityIcon(log.severity)}
                    size={16}
                    color={`var(--color-${getSeverityColor(log.severity)})`}
                  />
                </div>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted/50">
                  <Icon
                    name={getCategoryIcon(log.category)}
                    size={16}
                    className="text-text-secondary"
                  />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-body font-semibold text-text-primary">
                    {log.action}
                  </h3>
                  <span className="text-sm text-text-secondary font-mono">
                    {formatTimestamp(log.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-text-primary font-caption mt-1">
                  {log.details}
                </p>
                
                <div className="flex items-center space-x-4 mt-2 text-xs text-text-secondary">
                  <span className="font-caption">User: {log.user}</span>
                  <span className="font-mono">IP: {log.ipAddress}</span>
                  {log.electionId && (
                    <span className="font-mono">Election: {log.electionId}</span>
                  )}
                  {log.voterId && (
                    <span className="font-mono">Voter: {log.voterId}</span>
                  )}
                  {log.sessionId && (
                    <span className="font-mono">Session: {log.sessionId}</span>
                  )}
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                iconName="Eye"
                onClick={() => console.log('View log details', log.id)}
              >
                Details
              </Button>
            </div>
          ))}
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-8">
            <Icon name="FileSearch" size={48} className="mx-auto text-text-secondary mb-4" />
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
              No audit logs found
            </h3>
            <p className="text-text-secondary font-caption">
              Try adjusting your search criteria or date range.
            </p>
          </div>
        )}

        {/* Log Statistics */}
        <div className="mt-6 pt-4 border-t civic-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-mono font-bold text-text-primary">
                {filteredLogs.length}
              </div>
              <div className="text-sm text-text-secondary font-caption">
                Matching Entries
              </div>
            </div>
            <div>
              <div className="text-lg font-mono font-bold text-text-primary">
                {auditLogs.length}
              </div>
              <div className="text-sm text-text-secondary font-caption">
                Total Entries
              </div>
            </div>
            <div>
              <div className="text-lg font-mono font-bold text-text-primary">
                {new Set(auditLogs.map(log => log.user)).size}
              </div>
              <div className="text-sm text-text-secondary font-caption">
                Unique Users
              </div>
            </div>
            <div>
              <div className="text-lg font-mono font-bold text-text-primary">
                {new Set(auditLogs.map(log => log.category)).size}
              </div>
              <div className="text-sm text-text-secondary font-caption">
                Categories
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditTrailWidget;