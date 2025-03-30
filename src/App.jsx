import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import { ProjectProvider } from './contexts/ProjectContext';

import { AuthProvider, useAuthContext } from './contexts/AuthContext';
import Loader from './components/common/Loader';
import Layout from './components/common/Layout'; // New layout component
import PublicLayout from './components/common/PublicLayout'; // New public layout

// Import all your page components
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import Dashboard from './pages/dashboard/Dashboard';
import Overview from './pages/dashboard/Overview';
import Notifications from './pages/dashboard/Notifications';
import DocumentList from './pages/documents/DocumentList';
import UploadDocument from './pages/documents/UploadDocument';
import DocumentDetail from './pages/documents/DocumentDetail';


import VersionCompare from './pages/documents/VersionCompare';
import DrawingList from './pages/drawings/DrawingList';
import DrawingDetail from './pages/drawings/DrawingDetail';
import DCIManagement from './pages/dci/DCIManagement';
import DCIUpload from './pages/dci/DCIUpload';
import TransmittalList from './components/transmittals/TransmittalList';
import CreateTransmittal from './pages/transmittals/CreateTransmittal';
import TransmittalDetail from './pages/transmittals/TransmittalDetail';
import ProjectList from './pages/projects/ProjectList';
import ProjectDetail from './pages/projects/ProjectDetail';
import ProjectSettings from './pages/projects/ProjectSettings';
import SubmissionSchedule from './pages/schedule/SubmissionSchedule';
import DeadlineTracker from './pages/schedule/DeadlineTracker';
import StatusReports from './pages/reports/StatusReports';
import ProgressReports from './pages/reports/ProgressReports';
import AuditTrail from './pages/reports/AuditTrail';
import UserManagement from './pages/admin/UserManagement';
import RoleManagement from './pages/admin/RoleManagement';
import SystemSettings from './pages/admin/SystemSettings';
import LandingPage from './pages/landing/LandingPage';
import Error404 from './pages/Error404';

import AboutUs from './components/common/AboutUs'
import ContactUs from './components/common/ContactUs'
import Terms from './components/common/Terms'
import Privacy from './components/common/Privacy'
import Security from './components/common/Security'
import Documentation from './components/common/Documentation'
import Cooky from './components/common/Cooky'
import Webinars from './components/common/Webinars'
import Compliance from './components/common/Compliance'
import Careers from './components/common/Careers'
import Features from './components/common/Features'

import { DocumentProvider } from './contexts/DocumentContext';
import { ScheduleProvider } from './contexts/ScheduleContext';

// Protected Route Component
const ProtectedRoute = ({ requiredRoles = [] }) => {
  const { currentUser, loading } = useAuthContext();

  if (loading) {
    return <Loader fullScreen />;
  }

  // if (!currentUser) {
  //   return <Navigate to="/login" replace />;
  // }

  // if (requiredRoles.length > 0 && !requiredRoles.includes(currentUser.role)) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  return <Outlet />;
};

// Public Route Component (for landing page and auth)
const PublicRoute = () => {
  const { currentUser } = useAuthContext();
  
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <Outlet />;
};

const App = () => {
  return (
   
    <Router>
      <AuthProvider>
      <DocumentProvider>
      <ScheduleProvider>
      <ProjectProvider>
        <Routes>
          {/* Public Routes - Landing Page and Authentication */}
          <Route element={<PublicLayout />}>
            <Route element={<PublicRoute />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/security" element={<Security />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/webinars" element={<Webinars />} />
              <Route path="/cookies" element={<Cooky />} />
              <Route path="/compliance" element={<Compliance />} />
              <Route path="/features" element={<Features />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>
          </Route>

          {/* Protected Main Application Routes */}
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute />}>
              {/* Dashboard */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/notifications" element={<Notifications />} />

              {/* Document Management */}
              {/* <Route path="/documents">
                <Route index element={<DocumentList />} />
                <Route path="upload" element={<UploadDocument />} />
                <Route path=":documentId" element={<DocumentDetail />} />
                <Route path="compare/:documentId/:version1/:version2" element={<VersionCompare />} />
              </Route> */}

            <Route path="/documents">
              <Route index element={<DocumentList />} />
              <Route path="upload" element={<UploadDocument />} />
              <Route path=":documentId" element={<DocumentDetail />} />
              <Route path="compare/:documentId/:version1/:version2" element={<VersionCompare />} />
            </Route>

              {/* Drawing Management */}
              <Route path="/drawings">
                <Route index element={<DrawingList />} />
                <Route path=":drawingId" element={<DrawingDetail />} />
              </Route>

              {/* DCI Management */}
              <Route path="/dci">
                <Route index element={<DCIManagement />} />
                <Route path="upload" element={<DCIUpload />} />
              </Route>

              {/* Transmittal Management */}
              <Route path="/transmittals">
                <Route index element={<TransmittalList />} />
                <Route path="create" element={<CreateTransmittal />} />
                <Route path=":transmittalId" element={<TransmittalDetail />} />
              </Route>

              {/* Project Management */}
              <Route path="/projects">
                <Route index element={<ProjectList />} />
                <Route path=":projectId" element={<ProjectDetail />} />
                <Route path=":projectId/settings" element={<ProjectSettings />} />
              </Route>

              {/* Schedule Management */}
              <Route path="/schedule">
                <Route index element={<SubmissionSchedule />} />
                <Route path="deadlines" element={<DeadlineTracker />} />
              </Route>

              {/* Reporting */}
              <Route path="/reports">
                <Route index element={<StatusReports />} />
                <Route path="audit-trail" element={<AuditTrail />} />
                <Route path="progress" element={<ProgressReports />} />
              </Route>

              {/* Admin Routes */}
              <Route element={<ProtectedRoute requiredRoles={['admin']} />}>
                <Route path="/admin/users" element={<UserManagement />} />
                <Route path="/admin/roles" element={<RoleManagement />} />
                <Route path="/admin/settings" element={<SystemSettings />} />
              </Route>
            </Route>
          </Route>

          {/* Error Routes */}
          <Route path="/unauthorized" element={<Error404 unauthorized />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        </ProjectProvider>
        </ScheduleProvider>
        </DocumentProvider>
      </AuthProvider>
    </Router>
    
  );
};

export default App;