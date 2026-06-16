import { type ReactNode } from 'react';
import { useAuthStore } from '../stores/useAuthStore';

interface PermissionGuardProps {
  children: ReactNode;
  permission: string;
  fallback?: ReactNode;
}

export const PermissionGuard = ({ children, permission, fallback = null }: PermissionGuardProps) => {
  const { permissions, user } = useAuthStore();

  const hasPermission = user?.role === 'SUPER_ADMIN' || permissions.includes(permission);

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
