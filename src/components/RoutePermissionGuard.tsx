import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

interface RoutePermissionGuardProps {
  permission: string;
  children: React.ReactNode;
}

export default function RoutePermissionGuard({
  permission,
  children,
}: RoutePermissionGuardProps) {
  const { permissions, user } = useAuthStore();

  const hasPermission =
    user?.role === 'SUPER_ADMIN' ||
    permissions.includes(permission);

  if (!hasPermission) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}