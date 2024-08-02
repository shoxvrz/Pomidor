import axios from 'axios';

const API_URL = 'http://localhost:3000';

const login = async (credentials) => {
  const response = await axios.get(`${API_URL}/users`, {
    params: {
      email: credentials.email,
      password: credentials.password,
    },
  });

  if (response.data.length) {
    const user = response.data[0];
    const token = 'mock-token';
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    return { user, token };
  } else {
    throw new Error('Invalid credentials');
  }
};

const signup = async (userData) => {
  const existingUserResponse = await axios.get(`${API_URL}/users`, {
    params: { email: userData.email },
  });

  if (existingUserResponse.data.length) {
    throw new Error('User already exists');
  }

  const response = await axios.post(`${API_URL}/users`, userData);
  const user = response.data;
  const token = 'mock-token';
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
  return { user, token };
};

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

const authService = {
  login,
  signup,
  logout,
};

export default authService;
