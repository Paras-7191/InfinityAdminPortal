import { useEffect, type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import api from '../services/api';

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated, isLoading, setSession, logout, setLoading } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    const validateSession = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/session/validate');
        setSession({
          token,
          user: response.data.user,
          permissions: response.data.permissions,
        });
      } catch (error) {
        logout();
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && !isLoading) {
      // Already authenticated
    } else {
      validateSession();
    }
  }, []);

  if (isLoading) {
    return <div>Loading session...</div>; // TODO: Better loader
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
