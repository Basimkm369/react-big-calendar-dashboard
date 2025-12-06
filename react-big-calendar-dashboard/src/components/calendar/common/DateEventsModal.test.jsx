import { render, screen } from '@testing-library/react';
import DateEventsModal from './DateEventsModal';

const baseProps = {
  isOpen: true,
  selectedDate: new Date(2025, 10, 1),
  onClose: jest.fn(),
};

describe('DateEventsModal', () => {
  it('returns null when not open or no date selected', () => {
    const { container } = render(
      <DateEventsModal
        {...baseProps}
        isOpen={false}
        selectedDate={null}
        eventsByDate={{}}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('shows warning when no data for date', () => {
    render(
      <DateEventsModal {...baseProps} eventsByDate={{}} />
    );

    expect(
      screen.getByText(/No data found for the selected date/i)
    ).toBeInTheDocument();
    expect(screen.getByText('01-11-2025')).toBeInTheDocument();
  });

  it('shows bar chart when data exists', () => {
    const eventsByDate = {
      '01-11-2025': [{ user_1: 1 }, { user_2: 2 }],
    };

    render(
      <DateEventsModal {...baseProps} eventsByDate={eventsByDate} />
    );

    expect(screen.getByText(/Showing 2 sample metrics/i)).toBeInTheDocument();
    expect(screen.getByText(/Data for 01-11-2025/i)).toBeInTheDocument();
  });
});
