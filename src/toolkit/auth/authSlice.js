import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      params: {
        email: credentials.email,
        password: credentials.password
      }
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
  } catch (error) {
    return rejectWithValue(error.message);
  }
});


export const signup = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
  try {

    const existingUserResponse = await axios.get(`${API_URL}/users`, {
      params: { email: userData.email }
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
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    status: 'idle', 
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
