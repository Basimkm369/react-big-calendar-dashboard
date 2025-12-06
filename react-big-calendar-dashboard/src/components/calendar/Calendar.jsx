import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CalendarView from './common/CalendarView';
import DateEventsModal from './common/DateEventsModal';
import {
  setSelectedDate,
  openModal,
  closeModal,
} from '../../redux/calendarSlice';

import '../../styles/calendar.css';

const Calendar = () => {
  const dispatch = useDispatch();
  const [currentView, setCurrentView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  const eventsByDate = useSelector((state) => state.calendar.eventsByDate);
  const selectedDate = useSelector((state) => state.calendar.selectedDate);
  const isModalOpen = useSelector((state) => state.calendar.isModalOpen);

  const handleDateSelect = (date) => {
    dispatch(setSelectedDate(date));
    dispatch(openModal());
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
          currentView={currentView}
          currentDate={currentDate}
          onViewChange={setCurrentView}
          onNavigate={setCurrentDate}
        />
      </div>

      <DateEventsModal
        isOpen={isModalOpen}
        selectedDate={selectedDate}
        eventsByDate={eventsByDate}
        onClose={() => dispatch(closeModal())}
      />
    </div>
  );
};

export default Calendar;
