import { useState } from 'react';
import CalendarView from './common/CalendarView';
import DateEventsModal from './common/DateEventsModal';
import { dummyData } from '../../utils/dummyData';
import '../../styles/calendar.css';

const Calendar = () => {
  const [eventsByDate] = useState(dummyData);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="calendar-page">
      <h1 className="calendar-title">Calendar Insights Dashboard</h1>
      <p className="calendar-subtitle">
        Switch between month, week, or day views. Highlighted days have sample
        data you can explore.
      </p>

      <div className="calendar-card">
        <CalendarView
          eventsByDate={eventsByDate}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />
      </div>

      <DateEventsModal
        isOpen={isModalOpen}
        selectedDate={selectedDate}
        eventsByDate={eventsByDate}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Calendar;
