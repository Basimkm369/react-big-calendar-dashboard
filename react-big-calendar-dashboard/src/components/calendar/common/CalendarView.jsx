import { useMemo } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import {
  addDays,
  format,
  getDay,
  isSameDay,
  parse,
  startOfDay,
  startOfWeek,
} from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getDateTotal, parseDateKey } from '../../../utils/helpers';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales,
});

const CalendarView = ({
  eventsByDate,
  selectedDate,
  onDateSelect,
  currentView,
  currentDate,
  onViewChange,
  onNavigate,
}) => {
  const normalizedSelectedDate = selectedDate ? startOfDay(selectedDate) : null;

  const events = useMemo(() => {
    const entries = Object.entries(eventsByDate || {});
    return entries.map(([dateKey, items]) => {
      const parsed = parseDateKey(dateKey);
      const start = startOfDay(parsed);
      const end = addDays(start, 1);
      const total = getDateTotal(items);

      return {
        title: `${total} data points`,
        start,
        end,
        allDay: true,
        dateKey,
      };
    });
  }, [eventsByDate]);

  const handleSelectSlot = ({ start }) => {
    onDateSelect(startOfDay(start));
  };

  const handleSelectEvent = (event) => {
    onDateSelect(startOfDay(event.start));
  };

  const dayPropGetter = (date) => {
    const dateKey = format(date, 'dd-MM-yyyy');
    const hasData = !!eventsByDate?.[dateKey];
    const isSelected =
      normalizedSelectedDate && isSameDay(normalizedSelectedDate, date);

    let className = '';
    if (hasData) className += ' rbc-day-has-data';
    if (isSelected) className += ' rbc-day-selected';

    return { className };
  };

  return (
    <div className="calendar-view-wrapper">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={currentView}
        onView={onViewChange}
        date={currentDate}
        onNavigate={onNavigate}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        dayPropGetter={dayPropGetter}
        eventPropGetter={() => ({ className: 'calendar-event' })}
        views={['month', 'week', 'day']}
        defaultView="month"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default CalendarView;
