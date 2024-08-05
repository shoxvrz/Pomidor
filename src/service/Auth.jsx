import axios from 'axios';

const API_URL = 'https://api.mocki.io/v2/apfsstns/users';

const login = async (credentials) => {
  const response = await axios.get(API_URL);

  const users = response.data.users;
  const user = users.find(
    (u) => u.email === credentials.email && u.password === credentials.password
  );

  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
    return { user };
  } else {
    throw new Error('Invalid credentials');
  }
};

const signup = async (userData) => {
  const response = await axios.get(API_URL);

  const users = response.data.users;
  const existingUser = users.find((u) => u.email === userData.email);

  if (existingUser) {
    throw new Error('User already exists');
  }

  const newUser = { ...userData, createdAt: new Date().toISOString() };
  // Note: In a real scenario, you would send a POST request to add the new user
  // Since Mocki doesn't support dynamic changes, this step is illustrative
  users.push(newUser);
  localStorage.setItem('user', JSON.stringify(newUser));
  return { user: newUser };
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
