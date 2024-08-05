import axios from 'axios';

const API_URL = 'https://66adf655b18f3614e3b65836.mockapi.io/pomidor/users';

const login = async (credentials) => {
  const response = await axios.get(`${API_URL}`, {
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
  try {

    // const existingUserResponse = await axios.get(`${API_URL}`, {
    //   params: { email: userData.email },
    // });

    // if (existingUserResponse.data.length) {
    //   throw new Error('User already exists');
    // }


    const response = await axios.post(`${API_URL}`, userData);
    const user = response.data;
    const token = 'mock-token';

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);

    return { user, token };
  } catch (error) {
    console.error('Error during signup:', error.response ? error.response.data : error.message);
    throw new Error('Signup failed. Please try again later.');
  }
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
