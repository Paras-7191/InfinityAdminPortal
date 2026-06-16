import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthGuard } from '../components/AuthGuard';
import MainLayout from '../layouts/MainLayout';
import LoginPage from '../pages/auth/LoginPage';
import VerifyOtpPage from '../pages/auth/VerifyOtpPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import AdminsPage from '../pages/admins/AdminsPage';
import AgentsPage from '../pages/agents/AgentsPage';
import ClientsPage from '../pages/clients/ClientsPage';
import ClientDetailsPage from '../pages/clients/ClientDetailsPage';
import SoftwarePage from '../pages/software/SoftwarePage';
import AssignmentsPage from '../pages/assignments/AssignmentsPage';
import SystemLogsPage from '../pages/logs/SystemLogsPage';
import SecurityLogsPage from '../pages/logs/SecurityLogsPage';
import RuntimeLogsPage from '../pages/logs/RuntimeLogsPage';
import SettingsPage from '../pages/settings/SettingsPage';
import NotFoundPage from '../pages/NotFoundPage';
import RoutePermissionGuard from '../components/RoutePermissionGuard';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/verify-otp',
    element: <VerifyOtpPage />,
  },
  {
    path: '/',
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'admins',
        element:
          <RoutePermissionGuard permission="USER_VIEW">
          <AdminsPage />
          </RoutePermissionGuard>,
      },
      {
        path: 'agents',
        element: 
          <RoutePermissionGuard permission="USER_VIEW">
          <AgentsPage />
          </RoutePermissionGuard>,
      },
      {
        path: 'clients',
        children: [
          {
            index: true,
            element: 
              <RoutePermissionGuard permission="CLIENT_VIEW">
              <ClientsPage />
              </RoutePermissionGuard>,
          },
          {
            path: ':clientId',
            element:
              <RoutePermissionGuard permission="CLIENT_VIEW">
              <ClientDetailsPage />
             </RoutePermissionGuard>,
          },
        ],
      },
      {
        path: 'software',
        element: 
          <RoutePermissionGuard permission="SOFTWARE_VIEW">
          <SoftwarePage />
          </RoutePermissionGuard>,
      },
      {
        path: 'assignments',
        element: 
        <RoutePermissionGuard permission="ASSIGNMENT_VIEW">
        <AssignmentsPage />
        </RoutePermissionGuard>,
      },
      {
        path: 'logs',
        children: [
          {
            path: 'system',
            element:
            <RoutePermissionGuard permission="SYSTEM_LOG_VIEW">
            <SystemLogsPage />
            </RoutePermissionGuard>,
          },
          {
            path: 'security',
            element:
            <RoutePermissionGuard permission="SECURITY_LOG_VIEW">
            <SecurityLogsPage />
            </RoutePermissionGuard>,
          },
          {
            path: 'runtime',
            element:
            <RoutePermissionGuard permission="RUNTIME_LOG_VIEW">
            <RuntimeLogsPage />
            </RoutePermissionGuard>,
          },
        ],
      },
      {
        path: 'settings',
        element:
          <RoutePermissionGuard permission="SETTINGS_VIEW">
          <SettingsPage />
          </RoutePermissionGuard>,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
