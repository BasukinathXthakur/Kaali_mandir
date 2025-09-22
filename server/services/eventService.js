import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'https://kaali-mandir.vercel.app/api';

// Configure axios with auth token
const authAxios = () => {
  const token = getToken();
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });
};

// Get all events
export const getEvents = async (filter = 'all') => {
  try {
    const response = await axios.get(`${API_URL}/events?filter=${filter}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get event by ID
export const getEventById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/events/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Create new event (admin only)
export const createEvent = async (eventData) => {
  try {
    const response = await authAxios().post('/events', eventData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update event (admin only)
export const updateEvent = async (id, eventData) => {
  try {
    const response = await authAxios().put(`/events/${id}`, eventData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Delete event (admin only)
export const deleteEvent = async (id) => {
  try {
    const response = await authAxios().delete(`/events/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};