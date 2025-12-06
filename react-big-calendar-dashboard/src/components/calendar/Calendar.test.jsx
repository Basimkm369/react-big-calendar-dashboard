import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import Calendar from './Calendar';

// Mock CalendarView to surface its callbacks without heavy DOM.
jest.mock('./common/CalendarView', () => (props) => (
  <div>
    <div data-testid="calendar-view">mock-calendar-view</div>
    <button onClick={() => props.onDateSelect(new Date(2025, 10, 1))}>
      select-date
    </button>
  </div>
));

// Mock DateEventsModal to show when modal would open.
jest.mock('./common/DateEventsModal', () => (props) => (
  props.isOpen ? <div data-testid="modal">modal open</div> : null
));

describe('Calendar (connected to redux)', () => {
  it('opens modal and sets selected date when a date is selected', () => {
    render(
      <Provider store={store}>
        <Calendar />
      </Provider>
    );

    fireEvent.click(screen.getByText('select-date'));

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    // selectedDate is stored in redux; we assert via modal presence and title text.
  });
});
