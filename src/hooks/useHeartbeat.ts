import { useEffect } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import { heartbeat } from '../services/auth';

export const useHeartbeat = () => {
  const { isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    let interval: number;

    const performHeartbeat = async () => {
      try {
        await heartbeat();
      } catch (error) {
        // Retry logic as per Endpoints.md: "Retry once, Logout on repeated failure"
        try {
          await heartbeat();
        } catch (retryError) {
          logout();
        }
      }
    };

    if (isAuthenticated) {
      interval = window.setInterval(performHeartbeat, 60000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAuthenticated, logout]);
};
