import { createSlice } from '@reduxjs/toolkit';
import { dummyData } from '../utils/dummyData';

const initialState = {
  eventsByDate: dummyData,
  selectedDate: null,
  isModalOpen: false,
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { setSelectedDate, openModal, closeModal } = calendarSlice.actions;
export default calendarSlice.reducer;
