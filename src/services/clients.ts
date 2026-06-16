import api from './api';

export const getClients = async () => {
  const response = await api.get('/management/clients');
  return response.data;
};

export const getClientDetails = async (client_id: string) => {
  const response = await api.get(`/management/clients/${client_id}`);
  return response.data;
};

export const createClient = async (data: any) => {
  const response = await api.post('/management/clients', data);
  return response.data;
};

export const updateClient = async (client_id: string, data: any) => {
  const response = await api.put(`/management/clients/${client_id}`, data);
  return response.data;
};
