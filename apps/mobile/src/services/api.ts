import axios from 'axios';

const API_URL =
  process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export const createHabit = async (token: string, data: any) => {
  return axios.post(`${API_URL}/habits`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getHabits = async (token: string) => {
  return axios.get(`${API_URL}/habits`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateHabit = async (token: string, id: string, data: any) => {
  return axios.put(`${API_URL}/habits/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteHabit = async (token: string, id: string) => {
  return axios.delete(`${API_URL}/habits/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
