import { render, screen, fireEvent } from '@testing-library/react';
import CalendarView from './CalendarView';

// Mock react-big-calendar so we can assert props and callbacks without DOM complexity.
jest.mock('react-big-calendar', () => {
  const Actual = jest.requireActual('react-big-calendar');
  return {
    ...Actual,
    Calendar: ({ events, onSelectSlot, onSelectEvent, dayPropGetter, view, date, onView, onNavigate }) => (
      <div>
        <div data-testid="calendar-view">{view}</div>
        <div data-testid="calendar-date">{date.toISOString()}</div>
        <button onClick={() => onSelectSlot({ start: new Date(2025, 10, 1) })}>
          select-slot
        </button>
        <button onClick={() => onSelectEvent(events[0])}>select-event</button>
        <button onClick={() => onView('week')}>view-week</button>
        <button onClick={() => onNavigate(new Date(2025, 10, 2))}>nav-date</button>
        <div data-testid="day-class">
          {dayPropGetter(new Date(2025, 10, 1)).className}
        </div>
      </div>
    ),
    dateFnsLocalizer: () => ({}),
  };
});

describe('CalendarView', () => {
  const eventsByDate = { '01-11-2025': [{ user_1: 1 }] };
  const selectedDate = new Date(2025, 10, 1);

  it('highlights selected and data days via dayPropGetter', () => {
    render(
      <CalendarView
        eventsByDate={eventsByDate}
        selectedDate={selectedDate}
        onDateSelect={jest.fn()}
        currentView="month"
        currentDate={new Date(2025, 9, 31)}
        onViewChange={jest.fn()}
        onNavigate={jest.fn()}
      />
    );

    expect(screen.getByTestId('day-class').textContent).toContain('rbc-day-has-data');
    expect(screen.getByTestId('day-class').textContent).toContain('rbc-day-selected');
  });

  it('fires callbacks for slot, event, view change, and navigation', () => {
    const onDateSelect = jest.fn();
    const onViewChange = jest.fn();
    const onNavigate = jest.fn();

    render(
      <CalendarView
        eventsByDate={eventsByDate}
        selectedDate={null}
        onDateSelect={onDateSelect}
        currentView="month"
        currentDate={new Date(2025, 9, 31)}
        onViewChange={onViewChange}
        onNavigate={onNavigate}
      />
    );

    fireEvent.click(screen.getByText('select-slot'));
    fireEvent.click(screen.getByText('select-event'));
    fireEvent.click(screen.getByText('view-week'));
    fireEvent.click(screen.getByText('nav-date'));

    expect(onDateSelect).toHaveBeenCalledTimes(2); // slot + event
    expect(onViewChange).toHaveBeenCalledWith('week');
    expect(onNavigate).toHaveBeenCalled();
  });
});
