import { configureStore } from '@reduxjs/toolkit';
import userSettingsReducer from './userSettingsSlice';
import productsReducer from './productsSlice';
import dailyMealsReducer from './dailyMealsSlice';
import authReducer from './authSlice';

// Здесь будут добавлены редьюсеры
export const store = configureStore({
  reducer: {
    userSettings: userSettingsReducer,
    products: productsReducer,
    dailyMeals: dailyMealsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 