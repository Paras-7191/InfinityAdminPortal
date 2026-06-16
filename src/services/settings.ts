import api from './api';

export const getSettings = async () => {
  const response = await api.get('/management/settings');
  return response.data;
};

export const getSettingDetail = async (setting_key: string) => {
  const response = await api.get(`/management/settings/${setting_key}`);
  return response.data;
};

export const updateSetting = async (setting_key: string, value: any) => {
  const response = await api.put(`/management/settings/${setting_key}`, { value });
  return response.data;
};
