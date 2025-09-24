import axios from 'axios';

const API_URL = '/api';

// Register a new user
export const registerUser = async (name, email, password, phone) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      password,
      phone
    });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data.user;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Login user
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data.user;
  } catch (error) {
    console.error('Login error:', error.response?.data || error);
    throw error.response?.data || error;
  }
};

// Logout user
export const logoutUser = async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return true;
};

// Get current user
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  return JSON.parse(userStr);
};

// Get auth token
export const getToken = () => {
  return localStorage.getItem('token');
};