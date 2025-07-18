import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import ActiveElectionCard from './components/ActiveElectionCard';
import UpcomingElectionCard from './components/UpcomingElectionCard';
import VotingHistoryCard from './components/VotingHistoryCard';
import QuickStatsWidget from './components/QuickStatsWidget';
import NotificationCenter from './components/NotificationCenter';
import SearchAndFilter from './components/SearchAndFilter';
import QuickActionsPanel from './components/QuickActionsPanel';
import Icon from '../../components/AppIcon';

const VoterDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCriteria, setFilterCriteria] = useState({ type: 'all' });
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Check for saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock data for active elections
  const activeElections = [
    {
      id: 1,
      title: "2024 Presidential Election",
      description: "Choose the next President and Vice President of the United States",
      status: "active",
      startDate: "2024-11-01T08:00:00Z",
      deadline: "2024-11-05T20:00:00Z",
      ballotType: "Federal Election",
      hasVoted: false,
      candidates: [
        {
          name: "Sarah Johnson",
          party: "Democratic Party",
          photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
        },
        {
          name: "Michael Chen",
          party: "Republican Party", 
          photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        },
        {
          name: "Emily Rodriguez",
          party: "Independent",
          photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        }
      ]
    },
    {
      id: 2,
      title: "State Governor Election",
      description: "Select your state\'s next governor and lieutenant governor",
      status: "closing-soon",
      startDate: "2024-10-15T08:00:00Z",
      deadline: "2024-11-03T20:00:00Z",
      ballotType: "State Election",
      hasVoted: true,
      candidates: [
        {
          name: "David Thompson",
          party: "Democratic Party",
          photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        },
        {
          name: "Lisa Martinez",
          party: "Republican Party",
          photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
        }
      ]
    }
  ];

  // Mock data for upcoming elections
  const upcomingElections = [
    {
      id: 3,
      title: "City Council Election",
      description: "Choose your local city council representatives",
      startDate: "2024-12-01T08:00:00Z",
      registrationDeadline: "2024-11-15T23:59:59Z",
      candidates: [
        {
          name: "Robert Wilson",
          photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
        },
        {
          name: "Jennifer Adams",
          photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
        },
        {
          name: "Carlos Mendez",
          photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
        }
      ]
    },
    {
      id: 4,
      title: "School Board Election",
      description: "Select members for the local school board",
      startDate: "2024-12-15T08:00:00Z",
      registrationDeadline: "2024-11-30T23:59:59Z",
      candidates: [
        {
          name: "Amanda Foster",
          photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
        },
        {
          name: "James Parker",
          photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face"
        }
      ]
    }
  ];

  // Mock data for voting history
  const votingHistory = [
    {
      id: 5,
      title: "2022 Midterm Elections",
      electionDate: "2022-11-08T00:00:00Z",
      votedDate: "2022-11-08T14:30:00Z",
      resultStatus: "certified",
      winner: {
        name: "Patricia Williams",
        party: "Democratic Party",
        votes: 125847,
        percentage: 52.3
      }
    },
    {
      id: 6,
      title: "2022 State Referendum",
      electionDate: "2022-06-15T00:00:00Z",
      votedDate: "2022-06-15T10:15:00Z",
      resultStatus: "completed",
      winner: {
        name: "Proposition A - Education Funding",
        party: "Yes Vote",
        votes: 89234,
        percentage: 67.8
      }
    },
    {
      id: 7,
      title: "2021 Local Elections",
      electionDate: "2021-11-02T00:00:00Z",
      votedDate: "2021-11-02T16:45:00Z",
      resultStatus: "completed",
      winner: {
        name: "Thomas Anderson",
        party: "Independent",
        votes: 45623,
        percentage: 48.9
      }
    }
  ];

  // Mock data for notifications
  const notifications = [
    {
      id: 1,
      type: "election-reminder",
      priority: "high",
      title: "Presidential Election Reminder",
      message: "Don\'t forget to vote in the 2024 Presidential Election. Voting closes in 2 days.",
      timestamp: "2024-11-03T09:00:00Z",
      read: false
    },
    {
      id: 2,
      type: "results-available",
      priority: "normal",
      title: "Governor Election Results",
      message: "Results are now available for the State Governor Election you participated in.",
      timestamp: "2024-11-02T20:30:00Z",
      read: false
    },
    {
      id: 3,
      type: "election-start",
      priority: "normal",
      title: "New Election Available",
      message: "City Council Election voting has begun. You can now cast your ballot.",
      timestamp: "2024-11-01T08:00:00Z",
      read: true
    },
    {
      id: 4,
      type: "system-update",
      priority: "low",
      title: "System Maintenance Complete",
      message: "Scheduled maintenance has been completed. All systems are operational.",
      timestamp: "2024-10-31T02:00:00Z",
      read: true
    }
  ];

  // Mock data for quick stats
  const quickStats = {
    totalParticipated: 15,
    activeElections: 2,
    upcomingElections: 2,
    participationRate: 87,
    nextDeadline: "2 days"
  };

  // Filter and search functionality
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (criteria) => {
    setFilterCriteria(criteria);
  };

  // Filter elections based on search and filter criteria
  const filterElections = (elections, type) => {
    let filtered = elections;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(election =>
        election.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        election.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (election.candidates && election.candidates.some(candidate =>
          candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }

    // Apply status filter
    if (filterCriteria.type === 'status' && filterCriteria.value !== 'all') {
      switch (filterCriteria.value) {
        case 'not-voted':
          filtered = filtered.filter(election => !election.hasVoted);
          break;
        case 'voted':
          filtered = filtered.filter(election => election.hasVoted);
          break;
        case 'active':
          filtered = filtered.filter(election => election.status === 'active');
          break;
        default:
          break;
      }
    }

    return filtered;
  };

  const filteredActiveElections = filterElections(activeElections, 'active');
  const filteredUpcomingElections = filterElections(upcomingElections, 'upcoming');
  const filteredVotingHistory = filterElections(votingHistory, 'history');

  return (
    <>
      <Helmet>
        <title>Voter Dashboard - VoteSecure</title>
        <meta name="description" content="Access your elections, view voting history, and manage your electoral participation securely." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <AuthenticatedHeader />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name="Vote" size={28} color="var(--color-primary)" />
                <h1 className="text-3xl font-heading font-bold text-text-primary">
                  Voter Dashboard
                </h1>
              </div>
              <p className="text-lg text-text-secondary font-caption">
                Manage your electoral participation and stay informed about elections
              </p>
            </div>

            {/* Search and Filter */}
            <div className="mb-8">
              <SearchAndFilter onSearch={handleSearch} onFilter={handleFilter} />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content - Left Side */}
              <div className="lg:col-span-3 space-y-8">
                {/* Quick Stats */}
                <QuickStatsWidget stats={quickStats} />

                {/* Active Elections */}
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <Icon name="Play" size={24} color="var(--color-success)" />
                      <h2 className="text-2xl font-heading font-bold text-text-primary">
                        Active Elections
                      </h2>
                      <span className="bg-success text-success-foreground text-sm px-3 py-1 rounded-full font-caption">
                        {filteredActiveElections.length}
                      </span>
                    </div>
                  </div>

                  {filteredActiveElections.length === 0 ? (
                    <div className="bg-card border civic-border rounded-lg civic-shadow-sm p-8 text-center">
                      <Icon name="Vote" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4 opacity-50" />
                      <h3 className="font-heading font-semibold text-text-primary mb-2">
                        No Active Elections
                      </h3>
                      <p className="text-text-secondary font-caption">
                        There are currently no elections open for voting.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                      {filteredActiveElections.map((election) => (
                        <ActiveElectionCard key={election.id} election={election} />
                      ))}
                    </div>
                  )}
                </section>

                {/* Upcoming Elections */}
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={24} color="var(--color-warning)" />
                      <h2 className="text-2xl font-heading font-bold text-text-primary">
                        Upcoming Elections
                      </h2>
                      <span className="bg-warning text-warning-foreground text-sm px-3 py-1 rounded-full font-caption">
                        {filteredUpcomingElections.length}
                      </span>
                    </div>
                  </div>

                  {filteredUpcomingElections.length === 0 ? (
                    <div className="bg-card border civic-border rounded-lg civic-shadow-sm p-8 text-center">
                      <Icon name="Calendar" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4 opacity-50" />
                      <h3 className="font-heading font-semibold text-text-primary mb-2">
                        No Upcoming Elections
                      </h3>
                      <p className="text-text-secondary font-caption">
                        No elections are currently scheduled.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredUpcomingElections.map((election) => (
                        <UpcomingElectionCard key={election.id} election={election} />
                      ))}
                    </div>
                  )}
                </section>

                {/* Voting History */}
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <Icon name="History" size={24} color="var(--color-secondary)" />
                      <h2 className="text-2xl font-heading font-bold text-text-primary">
                        Voting History
                      </h2>
                      <span className="bg-secondary text-secondary-foreground text-sm px-3 py-1 rounded-full font-caption">
                        {filteredVotingHistory.length}
                      </span>
                    </div>
                  </div>

                  {filteredVotingHistory.length === 0 ? (
                    <div className="bg-card border civic-border rounded-lg civic-shadow-sm p-8 text-center">
                      <Icon name="History" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4 opacity-50" />
                      <h3 className="font-heading font-semibold text-text-primary mb-2">
                        No Voting History
                      </h3>
                      <p className="text-text-secondary font-caption">
                        Your voting history will appear here after you participate in elections.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredVotingHistory.map((election) => (
                        <VotingHistoryCard key={election.id} election={election} />
                      ))}
                    </div>
                  )}
                </section>
              </div>

              {/* Sidebar - Right Side */}
              <div className="lg:col-span-1 space-y-6">
                {/* Notifications */}
                <NotificationCenter notifications={notifications} />

                {/* Quick Actions */}
                <QuickActionsPanel />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default VoterDashboard;