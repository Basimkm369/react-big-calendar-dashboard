import { format } from 'date-fns';
import BarChart from './BarChart';

const DateEventsModal = ({ isOpen, selectedDate, eventsByDate, onClose }) => {
  if (!isOpen || !selectedDate) return null;

  const dateKey = format(selectedDate, 'dd-MM-yyyy');
  const dataForDate = eventsByDate?.[dateKey];
  const hasData = !!dataForDate?.length;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="modal-header">
          <h2>Data for {dateKey}</h2>
          <button
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
          </button>
        </header>

        <div className="modal-body">
          {hasData ? (
            <div className="modal-data-wrapper">
              <p className="modal-info">
                We found {dataForDate?.length} items for{' '}
                <strong>{dateKey}</strong>.
              </p>
              <div className="modal-chart-slot">
                <BarChart data={dataForDate} />
              </div>
            </div>
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
