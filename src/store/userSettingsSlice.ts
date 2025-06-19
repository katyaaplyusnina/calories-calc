import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IUserSettings } from '../types/UserSettings';
import UserSettingsService from '../services/user-settings.service';

interface UserSettingsState {
  data: IUserSettings | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserSettingsState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchUserSettings = createAsyncThunk(
  'userSettings/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const data = await UserSettingsService.get();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка загрузки настроек');
    }
  }
);

export const updateUserSettings = createAsyncThunk(
  'userSettings/update',
  async (settings: IUserSettings, { rejectWithValue }) => {
    try {
      const data = await UserSettingsService.update(settings);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка обновления настроек');
    }
  }
);

const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserSettings.fulfilled, (state, action: PayloadAction<IUserSettings>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserSettings.fulfilled, (state, action: PayloadAction<IUserSettings>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateUserSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSettingsSlice.reducer; 