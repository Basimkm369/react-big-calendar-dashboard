import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from '../redux/calendarSlice';

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Allow Date objects in actions/state to avoid serializable warnings.
      serializableCheck: false,
    }),
});
