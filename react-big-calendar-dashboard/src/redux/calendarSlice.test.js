import reducer, {
  setSelectedDate,
  openModal,
  closeModal,
} from './calendarSlice';
import { dummyData } from '../utils/dummyData';

describe('calendarSlice', () => {
  it('should return the initial state by default', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
      eventsByDate: dummyData,
      selectedDate: null,
      isModalOpen: false,
    });
  });

  it('should set selected date', () => {
    const date = new Date(2025, 10, 1);
    const state = reducer(undefined, setSelectedDate(date));
    expect(state.selectedDate).toEqual(date);
  });

  it('should open and close modal', () => {
    const opened = reducer(undefined, openModal());
    expect(opened.isModalOpen).toBe(true);

    const closed = reducer(opened, closeModal());
    expect(closed.isModalOpen).toBe(false);
  });

  it('should preserve events when selecting date and opening modal', () => {
    const date = new Date(2025, 10, 2);
    const nextState = reducer(
      reducer(undefined, setSelectedDate(date)),
      openModal()
    );

    expect(nextState.eventsByDate).toBe(dummyData);
    expect(nextState.selectedDate).toEqual(date);
    expect(nextState.isModalOpen).toBe(true);
  });
});
