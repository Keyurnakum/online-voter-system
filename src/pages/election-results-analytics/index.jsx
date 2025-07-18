import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AuthenticatedHeader from '../../components/ui/AuthenticatedHeader';
import RoleBasedSidebar from '../../components/ui/RoleBasedSidebar';
import ElectionStatusIndicator from '../../components/ui/ElectionStatusIndicator';
import SecurityBadgeCluster from '../../components/ui/SecurityBadgeCluster';
import ElectionSelector from './components/ElectionSelector';
import ResultsTabNavigation from './components/ResultsTabNavigation';
import LiveResultsTab from './components/LiveResultsTab';
import TurnoutAnalyticsTab from './components/TurnoutAnalyticsTab';
import HistoricalComparisonTab from './components/HistoricalComparisonTab';
import ExportToolbar from './components/ExportToolbar';
import Icon from '../../components/AppIcon';

const ElectionResultsAnalytics = () => {
  const [selectedElection, setSelectedElection] = useState('presidential-2024');
  const [activeTab, setActiveTab] = useState('live-results');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleElectionChange = (election) => {
    setSelectedElection(election);
    setLastUpdated(new Date());
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
    setIsLoading(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'live-results':
        return <LiveResultsTab />;
      case 'turnout-analytics':
        return <TurnoutAnalyticsTab />;
      case 'historical-comparison':
        return <HistoricalComparisonTab />;
      default:
        return <LiveResultsTab />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Election Results & Analytics - VoteSecure</title>
        <meta name="description" content="Real-time election results and comprehensive voting analytics for transparent democratic processes" />
        <meta name="keywords" content="election results, voting analytics, democracy, transparency, real-time results" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <AuthenticatedHeader />
        
        {/* Sidebar */}
        <RoleBasedSidebar />
        
        {/* Main Content */}
        <main className="pt-16 lg:pl-80">
          <div className="p-4 lg:p-6 space-y-6">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl font-heading font-bold text-text-primary">
                  Election Results & Analytics
                </h1>
                <p className="text-text-secondary font-caption mt-2">
                  Real-time election results and comprehensive voting analytics for transparent democratic processes
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <SecurityBadgeCluster />
                <ElectionStatusIndicator />
              </div>
            </div>

            {/* Election Selector */}
            <ElectionSelector
              selectedElection={selectedElection}
              onElectionChange={handleElectionChange}
              onRefresh={handleRefresh}
              lastUpdated={lastUpdated}
            />

            {/* Tab Navigation */}
            <ResultsTabNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {/* Export Toolbar */}
            <ExportToolbar />

            {/* Tab Content */}
            <div className="relative">
              {isLoading && (
                <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10 rounded-lg">
                  <div className="flex items-center space-x-2 bg-surface px-4 py-2 rounded-lg civic-shadow-md">
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    <span className="text-sm font-caption text-text-secondary">Updating results...</span>
                  </div>
                </div>
              )}
              
              {renderTabContent()}
            </div>

            {/* Real-time Status Bar */}
            <div className="bg-surface border civic-border rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm font-caption text-success">Live Updates Active</span>
                  </div>
                  <div className="text-sm text-text-secondary font-caption">
                    Next update in: 30 seconds
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="Shield" size={14} />
                    <span className="font-caption">Verified Data</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span className="font-caption">
                      Updated: {lastUpdated.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Notice */}
            <div className="bg-muted border civic-border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
                <div>
                  <p className="text-sm font-caption text-text-primary">
                    <strong>Data Integrity Notice:</strong> All election results are cryptographically verified and include timestamps to ensure authenticity. Results are updated in real-time as they are certified by election officials.
                  </p>
                  <p className="text-xs text-text-secondary font-caption mt-2">
                    For questions about data accuracy or to report discrepancies, contact the Election Commission at (555) 123-4567.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ElectionResultsAnalytics;