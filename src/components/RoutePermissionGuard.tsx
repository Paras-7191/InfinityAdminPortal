import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

interface RoutePermissionGuardProps {
  permission?: string;
  permissions?: string[];
  children: React.ReactNode;
}

export default function RoutePermissionGuard({
  permission,
  permissions: permissionList,
  children,
}: RoutePermissionGuardProps) {
  const { permissions, user } = useAuthStore();

  const requiredPermissions = permissionList ?? (permission ? [permission] : []);

  const hasPermission =
    user?.role === 'SUPER_ADMIN' ||
    requiredPermissions.length === 0 ||
    requiredPermissions.some(p => permissions.includes(p));

  if (!hasPermission) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}