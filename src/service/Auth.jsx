import axios from 'axios';

const API_URL = 'https://66adf655b18f3614e3b65836.mockapi.io/pomidor/users';


const login = async (credentials) => {
  const response = await axios.get(API_URL, {
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
    throw new Error("Nimadir notog'ri");
  }
};

const signup = async (userData) => {
  const getUsersData = await axios.get(API_URL)

  console.log(getUsersData);
  
  const existingUser = getUsersData.data.find(user => user.email === userData.email);

  if (existingUser) {
    throw new Error('Foydalanuvchi mavjud');
  }

  const response = await axios.post(API_URL, userData);
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
