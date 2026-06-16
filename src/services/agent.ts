import api from './api';

export const getMyClients = async () => {
  const response = await api.get('/agent/my-clients');
  return response.data;
};

export const getMySoftware = async () => {
  const response = await api.get('/agent/my-software');
  return response.data;
};
