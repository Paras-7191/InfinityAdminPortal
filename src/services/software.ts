import api from './api';

export const getSoftware = async () => {
  const response = await api.get('/management/software');
  return response.data;
};

export const createSoftware = async (data: any) => {
  const response = await api.post('/management/software', data);
  return response.data;
};

export const updateSoftware = async (software_id: string, data: any) => {
  const response = await api.put(`/management/software/${software_id}`, data);
  return response.data;
};
