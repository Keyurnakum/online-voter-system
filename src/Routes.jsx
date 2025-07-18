import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import VoterRegistrationLogin from "pages/voter-registration-login";
import VoterDashboard from "pages/voter-dashboard";
import ElectionResultsAnalytics from "pages/election-results-analytics";
import ElectionAdministrationDashboard from "pages/election-administration-dashboard";
import BallotDesignConfiguration from "pages/ballot-design-configuration";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<VoterRegistrationLogin />} />
        <Route path="/voter-registration-login" element={<VoterRegistrationLogin />} />
        <Route path="/voter-dashboard" element={<VoterDashboard />} />
        <Route path="/election-results-analytics" element={<ElectionResultsAnalytics />} />
        <Route path="/election-administration-dashboard" element={<ElectionAdministrationDashboard />} />
        <Route path="/ballot-design-configuration" element={<BallotDesignConfiguration />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;