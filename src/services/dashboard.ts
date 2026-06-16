import api from './api';

export const getRuntimeStatus = async () => {
  const response = await api.get('/management/runtime-status');
  return response.data;
};

export const getOtpQueue = async () => {
  const response = await api.get('/management/otp-queue');
  return response.data;
};

export const getActivationQueue = async () => {
  const response = await api.get('/management/activation-queue');
  return response.data;
};

export const getLiveActivity = async () => {
  const response = await api.get('/management/live-activity');
  return response.data;
};

export const getSystemLogs = async () => {
  const response = await api.get('/management/system-logs');
  return response.data;
};

export const getSecurityLogs = async () => {
  const response = await api.get('/management/security-logs');
  return response.data;
};

export const getRuntimeLogs = async () => {
  const response = await api.get('/management/runtime-logs');
  return response.data;
};
