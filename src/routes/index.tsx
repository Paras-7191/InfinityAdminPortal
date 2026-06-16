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
        element: <AdminsPage />,
      },
      {
        path: 'agents',
        element: <AgentsPage />,
      },
      {
        path: 'clients',
        children: [
          {
            index: true,
            element: <ClientsPage />,
          },
          {
            path: ':clientId',
            element: <ClientDetailsPage />,
          },
        ],
      },
      {
        path: 'software',
        element: <SoftwarePage />,
      },
      {
        path: 'assignments',
        element: <AssignmentsPage />,
      },
      {
        path: 'logs',
        children: [
          {
            path: 'system',
            element: <SystemLogsPage />,
          },
          {
            path: 'security',
            element: <SecurityLogsPage />,
          },
          {
            path: 'runtime',
            element: <RuntimeLogsPage />,
          },
        ],
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
