import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IAuthData, IAuthResponse } from '../types/user';
import { login as loginService, logout as logoutService } from '../services/auth.service';

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialToken = localStorage.getItem('authToken');

const initialState: AuthState = {
  token: initialToken,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (data: IAuthData, { rejectWithValue }) => {
    try {
      const response: IAuthResponse = await loginService(data);
      localStorage.setItem('authToken', response.token);
      return response.token;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка авторизации');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    logoutService();
    return null;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
      });
  },
});

export default authSlice.reducer; 