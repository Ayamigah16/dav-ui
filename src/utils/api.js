import axios from 'axios';

export const login = async (email, password) => {
  try {
    const response = await axios.post('/auth/login/', { email, password });
    localStorage.setItem('token', response.data.access);
    return response.data;
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
};

export const fetchAccounts = async () => {
    const token = localStorage.getItem('token');
    return axios.get('/accounts/', {
      headers: { Authorization: `Bearer ${token}` }
    });
  };
  