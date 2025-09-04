import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProjectManagement from './pages/project-management';
import LegalQuebecDocs from './pages/legal-quebec-docs';
import LoginPage from './pages/login';
import Dashboard from './pages/dashboard';
import ClientManagement from './pages/client-management';
import TestimonialsSection from './pages/testimonials-section';
import CollaborativeToDoManagement from './pages/collaborative-to-do-management';
import Finance from './pages/finance';
import TemplatesLibrary from './pages/templates-library';
import GlobalSearch from './pages/search';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ClientManagement />} />
        <Route path="/project-management" element={<ProjectManagement />} />
        <Route path="/legal-quebec-docs" element={<LegalQuebecDocs />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/client-management" element={<ClientManagement />} />
        <Route path="/testimonials-section" element={<TestimonialsSection />} />
        <Route path="/collaborative-to-do-management" element={<CollaborativeToDoManagement />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/templates-library" element={<TemplatesLibrary />} />
        <Route path="/search" element={<GlobalSearch />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;