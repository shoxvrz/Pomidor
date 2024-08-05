import axios from 'axios';

const API_URL = '	https://api.mocki.io/v2/apfsstns/users';

const login = async (credentials) => {
  const response = await axios.get(`${API_URL}`, {
    params: {
      email: credentials.email,
      password: credentials.password,
    },
  });

  if (response.data.length) {
    const user = response.data[0];
    localStorage.setItem('user', JSON.stringify(user));
    return { user };
  } else {
    throw new Error('Invalid credentials');
  }
};

const signup = async (userData) => {
  const existingUserResponse = await axios.get(`${API_URL}`, {
    params: { email: userData.email },
  });

  if (existingUserResponse.data.length) {
    throw new Error('User already exists');
  }

  const response = await axios.post(`${API_URL}`, userData);
  const user = response.data;
  localStorage.setItem('user', JSON.stringify(user));
  return { user };
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  login,
  signup,
  logout,
};

export default authService;
