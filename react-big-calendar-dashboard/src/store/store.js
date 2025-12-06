import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from '../redux/calendarSlice';

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
});
