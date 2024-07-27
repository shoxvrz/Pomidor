// src/features/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the base URL for your mock API
const API_URL = 'http://localhost:3000';

// Async thunk for login
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      params: {
        email: credentials.email,
        password: credentials.password
      }
    });

    if (response.data.length) {
      return {
        user: response.data[0],
        token: 'mock-token' // Simulate a token
      };
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Async thunk for signup
export const signup = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
  try {
    // Check if user already exists
    const existingUserResponse = await axios.get(`${API_URL}/users`, {
      params: { email: userData.email }
    });

    if (existingUserResponse.data.length) {
      throw new Error('User already exists');
    }

    // Create new user
    const response = await axios.post(`${API_URL}/users`, userData);
    return {
      user: response.data,
      token: 'mock-token' // Simulate a token
    };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle', // 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
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
