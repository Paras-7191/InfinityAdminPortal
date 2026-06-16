import { create } from 'zustand';
import type { AuthState, SessionInfo } from '../types/auth';

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('auth_token'),
  user: null,
  permissions: [],
  isAuthenticated: !!localStorage.getItem('auth_token'),
  isLoading: true,

  setSession: (session: SessionInfo) => {
    localStorage.setItem('auth_token', session.token);
    set({
      token: session.token,
      user: session.user,
      permissions: session.permissions,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  logout: async () => {
    try {
      const { logout: apiLogout } = await import('../services/auth');
      await apiLogout();
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      localStorage.removeItem('auth_token');
      set({
        token: null,
        user: null,
        permissions: [],
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));
