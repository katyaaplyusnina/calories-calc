import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IDailyMeal } from '../types/DailyMeal';
import DailyMealsService from '../services/daily-meals.service';

interface DailyMealsState {
  items: IDailyMeal[];
  loading: boolean;
  error: string | null;
}

const initialState: DailyMealsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchDailyMeals = createAsyncThunk(
  'dailyMeals/fetch',
  async (date: string, { rejectWithValue }) => {
    try {
      const data = await DailyMealsService.getByDate(date);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка загрузки приёмов пищи');
    }
  }
);

export const addDailyMeal = createAsyncThunk(
  'dailyMeals/add',
  async (meal: Omit<IDailyMeal, 'id'>, { rejectWithValue }) => {
    try {
      const data = await DailyMealsService.create(meal);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка добавления приёма пищи');
    }
  }
);

export const deleteDailyMeal = createAsyncThunk(
  'dailyMeals/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await DailyMealsService.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка удаления приёма пищи');
    }
  }
);

const dailyMealsSlice = createSlice({
  name: 'dailyMeals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailyMeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyMeals.fulfilled, (state, action: PayloadAction<IDailyMeal[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDailyMeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addDailyMeal.fulfilled, (state, action: PayloadAction<IDailyMeal>) => {
        state.items.push(action.payload);
      })
      .addCase(deleteDailyMeal.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(m => m.id !== action.payload);
      });
  },
});

export default dailyMealsSlice.reducer; 