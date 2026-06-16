import api from './api';

export const loginAdmin = async (admin_id: string, password: string) => {
  const response = await api.post('/auth/admin/login', { admin_id, password });
  return response.data;
};

export const loginAgent = async (mobile_number: string) => {
  const response = await api.post('/auth/agent/login', { mobile_number });
  return response.data;
};

export const verifyOtp = async (user_id: string, otp: string) => {
  const response = await api.post('/auth/verify-otp', { user_id, otp });
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/session/logout');
  return response.data;
};

export const heartbeat = async () => {
  const response = await api.post('/session/heartbeat');
  return response.data;
};
