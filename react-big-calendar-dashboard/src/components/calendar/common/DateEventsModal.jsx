import { format } from 'date-fns';
import BarChart from './BarChart';

const DateEventsModal = ({ isOpen, selectedDate, eventsByDate, onClose }) => {
  if (!isOpen || !selectedDate) return null;

  const dateKey = format(selectedDate, 'dd-MM-yyyy');
  const dataForDate = eventsByDate?.[dateKey];
  const hasData = !!dataForDate && dataForDate?.length > 0;
  const entryCount = dataForDate?.length ?? 0;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="modal-header">
          <h2>Data for {dateKey}</h2>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            X
          </button>
        </header>

        <div className="modal-body">
          {hasData ? (
            <>
              <p className="modal-info">
                Showing {entryCount} sample metrics for{' '}
                <strong>{dateKey}</strong>.
              </p>
              <BarChart data={dataForDate} />
            </>
          ) : (
            <p className="modal-warning">
              <strong>No data found for the selected date.</strong>{' '}
              <span className="modal-warning-date">{dateKey}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateEventsModal;
