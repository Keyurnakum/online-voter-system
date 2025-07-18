import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const VoterManagementWidget = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const voterStats = {
    totalRegistered: 67834,
    pendingApproval: 234,
    activeVoters: 67600,
    suspendedAccounts: 0,
    duplicatesPrevented: 12
  };

  const recentRegistrations = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      registrationDate: "2024-07-18T10:30:00",
      status: "pending",
      verificationMethod: "ID Upload",
      district: "District 3"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@email.com",
      registrationDate: "2024-07-18T09:15:00",
      status: "approved",
      verificationMethod: "SSN Verification",
      district: "District 1"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@email.com",
      registrationDate: "2024-07-18T08:45:00",
      status: "pending",
      verificationMethod: "ID Upload",
      district: "District 2"
    },
    {
      id: 4,
      name: "David Thompson",
      email: "d.thompson@email.com",
      registrationDate: "2024-07-17T16:20:00",
      status: "approved",
      verificationMethod: "Address Verification",
      district: "District 4"
    },
    {
      id: 5,
      name: "Lisa Wang",
      email: "lisa.wang@email.com",
      registrationDate: "2024-07-17T14:10:00",
      status: "review",
      verificationMethod: "Manual Review",
      district: "District 1"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'review':
        return 'error';
      case 'suspended':
        return 'muted';
      default:
        return 'muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'review':
        return 'AlertCircle';
      case 'suspended':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleApproveVoter = (voterId) => {
    console.log('Approving voter:', voterId);
  };

  const handleRejectVoter = (voterId) => {
    console.log('Rejecting voter:', voterId);
  };

  const handleViewDetails = (voterId) => {
    console.log('Viewing voter details:', voterId);
  };

  const filteredRegistrations = recentRegistrations.filter(voter => {
    const matchesSearch = voter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         voter.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || voter.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const filterOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'review', label: 'Under Review' }
  ];

  return (
    <div className="bg-surface border civic-border rounded-lg civic-shadow-sm">
      <div className="p-6 border-b civic-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-heading font-bold text-text-primary">Voter Management</h2>
            <p className="text-sm text-text-secondary font-caption mt-1">
              Registration oversight and verification
            </p>
          </div>
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={() => console.log('Export voter data')}
          >
            Export Data
          </Button>
        </div>
      </div>

      <div className="p-6">
        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          <div className="text-center p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="text-2xl font-mono font-bold text-primary">
              {voterStats.totalRegistered.toLocaleString()}
            </div>
            <div className="text-sm text-primary font-caption">Total Registered</div>
          </div>

          <div className="text-center p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="text-2xl font-mono font-bold text-warning">
              {voterStats.pendingApproval.toLocaleString()}
            </div>
            <div className="text-sm text-warning font-caption">Pending Approval</div>
          </div>

          <div className="text-center p-4 bg-success/10 border border-success/20 rounded-lg">
            <div className="text-2xl font-mono font-bold text-success">
              {voterStats.activeVoters.toLocaleString()}
            </div>
            <div className="text-sm text-success font-caption">Active Voters</div>
          </div>

          <div className="text-center p-4 bg-muted/10 border border-muted/20 rounded-lg">
            <div className="text-2xl font-mono font-bold text-text-primary">
              {voterStats.suspendedAccounts}
            </div>
            <div className="text-sm text-text-secondary font-caption">Suspended</div>
          </div>

          <div className="text-center p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <div className="text-2xl font-mono font-bold text-accent">
              {voterStats.duplicatesPrevented}
            </div>
            <div className="text-sm text-accent font-caption">Duplicates Prevented</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex space-x-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedFilter(option.value)}
                className={`px-4 py-2 text-sm font-caption rounded-md civic-transition ${
                  selectedFilter === option.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Registrations */}
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
            Recent Registrations
          </h3>
          
          <div className="space-y-3">
            {filteredRegistrations.map((voter) => (
              <div
                key={voter.id}
                className="flex items-center justify-between p-4 border civic-border rounded-lg hover:bg-muted/30 civic-transition"
              >
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-${getStatusColor(voter.status)}/10`}>
                    <Icon
                      name={getStatusIcon(voter.status)}
                      size={20}
                      color={`var(--color-${getStatusColor(voter.status)})`}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-body font-semibold text-text-primary">
                      {voter.name}
                    </h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-text-secondary font-caption">
                        {voter.email}
                      </span>
                      <span className="text-sm text-text-secondary font-caption">
                        {voter.district}
                      </span>
                      <span className="text-sm text-text-secondary font-caption">
                        {formatDate(voter.registrationDate)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className={`text-sm font-semibold text-${getStatusColor(voter.status)}`}>
                      {voter.status.charAt(0).toUpperCase() + voter.status.slice(1)}
                    </div>
                    <div className="text-xs text-text-secondary font-caption">
                      {voter.verificationMethod}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => handleViewDetails(voter.id)}
                    >
                      View
                    </Button>
                    
                    {voter.status === 'pending' && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Check"
                          onClick={() => handleApproveVoter(voter.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="X"
                          onClick={() => handleRejectVoter(voter.id)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredRegistrations.length === 0 && (
            <div className="text-center py-8">
              <Icon name="Users" size={48} className="mx-auto text-text-secondary mb-4" />
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                No registrations found
              </h3>
              <p className="text-text-secondary font-caption">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoterManagementWidget;