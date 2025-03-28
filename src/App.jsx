import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Loader from './components/common/Loader';

// Import all your page components as before
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import Dashboard from './pages/dashboard/Dashboard';
import Overview from './pages/dashboard/Overview';
import Notifications from './pages/dashboard/Notifications';
// Add this to your existing imports in App.jsx
import DocumentList from './pages/documents/DocumentList';
import UploadDocument from './pages/documents/UploadDocument';
import DocumentDetail from './pages/documents/DocumentDetail';
import VersionCompare from './pages/documents/VersionCompare';
// ... import all other page components ...

import DrawingList from './pages/drawings/DrawingList.jsx'
import DrawingDetail from './pages/drawings/DrawingDetail.jsx'

import DCIManagement from './pages/dci/DCIManagement.jsx'
import DCIUpload from './pages/dci/DCIUpload.jsx'


import TransmittalList from './components/transmittals/TransmittalList.jsx'
import CreateTransmittal from  './pages/transmittals/CreateTransmittal.jsx'
import TransmittalDetail from  './pages/transmittals/TransmittalDetail.jsx'

import ProjectList from  './pages/projects/ProjectList.jsx'
import ProjectDetail from  './pages/projects/ProjectDetail.jsx'
import ProjectSettings from  './pages/projects/ProjectSettings.jsx'

import SubmissionSchedule from  './pages/schedule/SubmissionSchedule.jsx'
import DeadlineTracker from  './pages/schedule/DeadlineTracker.jsx'

import StatusReports from './pages/reports/StatusReports.jsx'
import ProgressReports from './pages/reports/ProgressReports.jsx'
import AuditTrail from './pages/reports/AuditTrail.jsx'

import UserManagement from './pages/admin/UserManagement.jsx'
import RoleManagement from './pages/admin/RoleManagement.jsx'
import SystemSettings from './pages/admin/SystemSettings.jsx'


import LandingPage from './pages/landing/LandingPage.jsx'

import Error404 from './pages/Error404.jsx'

// Protected Route Component
const ProtectedRoute = ({ requiredRoles = [] }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <Loader fullScreen />;
  }

  // if (!currentUser) {
  //   return <Navigate to="/auth/login" replace />;
  // }

  if (requiredRoles.length > 0 && !requiredRoles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes - Authentication */}
          <Route path="/auth">
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route index element={<Navigate to="login" replace />} />
          </Route>

          {/* Protected Main Application Routes */}
          <Route element={<ProtectedRoute />}>
            {/* Dashboard */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/notifications" element={<Notifications />} />

            {/* Document Management */}
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

          {/* Error Routes */}
          <Route path="/unauthorized" element={<Error404 unauthorized />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;