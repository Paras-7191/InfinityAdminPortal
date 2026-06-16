import api from './api';

export const getUsers = async (role?: string) => {
  const response = await api.get('/management/users', { params: { role } });
  return response.data;
};

export const createUser = async (data: any) => {
  const response = await api.post('/management/users', data);
  return response.data;
};

export const updateUser = async (user_id: string, data: any) => {
  const response = await api.put(`/management/users/${user_id}`, data);
  return response.data;
};

export const deleteUser = async (user_id: string) => {
  const response = await api.delete(`/management/users/${user_id}`);
  return response.data;
};

export const forceLogout = async (user_id: string) => {
  const response = await api.post(`/session/force-logout/${user_id}`);
  return response.data;
};
