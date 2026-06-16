import api from './api';

export const assignClient = async (agent_id: string, target_id: string) => {
  const response = await api.post('/management/assignments/client', { agent_id, target_id });
  return response.data;
};

export const unassignClient = async (agent_id: string, target_id: string) => {
  const response = await api.delete('/management/assignments/client', { data: { agent_id, target_id } });
  return response.data;
};

export const assignSoftware = async (agent_id: string, target_id: string) => {
  const response = await api.post('/management/assignments/software', { agent_id, target_id });
  return response.data;
};

export const unassignSoftware = async (agent_id: string, target_id: string) => {
  const response = await api.delete('/management/assignments/software', { data: { agent_id, target_id } });
  return response.data;
};
