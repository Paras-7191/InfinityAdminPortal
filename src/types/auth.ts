export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'AGENT';

export interface User {
  id: string;
  fullName: string;
  role: Role;
  adminId?: string;
  mobileNumber?: string;
}

export interface SessionInfo {
  token: string;
  user: User;
  permissions: string[];
}

export interface AuthState {
  token: string | null;
  user: User | null;
  permissions: string[];
  isAuthenticated: boolean;
  isLoading: boolean;
  setSession: (session: SessionInfo) => void;
  logout: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}
