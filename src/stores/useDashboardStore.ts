import { create } from 'zustand';
import * as dashboardService from '../services/dashboard';

interface DashboardState {
  runtimeStatus: any[];
  otpQueue: any[];
  activationQueue: any[];
  liveActivity: any[];
  systemLogs: any[];
  securityLogs: any[];
  runtimeLogs: any[];
  isLoading: boolean;
  error: string | null;

  fetchRuntimeStatus: () => Promise<void>;
  fetchOtpQueue: () => Promise<void>;
  fetchActivationQueue: () => Promise<void>;
  fetchLiveActivity: () => Promise<void>;
  fetchSystemLogs: () => Promise<void>;
  fetchSecurityLogs: () => Promise<void>;
  fetchRuntimeLogs: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  runtimeStatus: [],
  otpQueue: [],
  activationQueue: [],
  liveActivity: [],
  systemLogs: [],
  securityLogs: [],
  runtimeLogs: [],
  isLoading: false,
  error: null,

  fetchRuntimeStatus: async () => {
    try {
      const data = await dashboardService.getRuntimeStatus();
      set({ runtimeStatus: data });
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  fetchOtpQueue: async () => {
    try {
      const data = await dashboardService.getOtpQueue();
      set({ otpQueue: data });
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  fetchActivationQueue: async () => {
    try {
      const data = await dashboardService.getActivationQueue();
      set({ activationQueue: data });
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  fetchLiveActivity: async () => {
    try {
      const data = await dashboardService.getLiveActivity();
      set({ liveActivity: data });
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  fetchSystemLogs: async () => {
    try {
      const data = await dashboardService.getSystemLogs();
      set({ systemLogs: data });
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  fetchSecurityLogs: async () => {
    try {
      const data = await dashboardService.getSecurityLogs();
      set({ securityLogs: data });
    } catch (err: any) {
      set({ error: err.message });
    }
  },

  fetchRuntimeLogs: async () => {
    try {
      const data = await dashboardService.getRuntimeLogs();
      set({ runtimeLogs: data });
    } catch (err: any) {
      set({ error: err.message });
    }
  },
}));
