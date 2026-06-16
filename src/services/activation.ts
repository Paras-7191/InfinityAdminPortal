import api from './api';

export const createActivationRequest = async (client_id: string, software_id: string) => {
  const response = await api.post('/activation/request', { client_id, software_id });
  return response.data;
};

export const verifyActivation = async (request_id: string, otp: string) => {
  const response = await api.post('/activation/verify', { request_id, otp });
  return response.data;
};
