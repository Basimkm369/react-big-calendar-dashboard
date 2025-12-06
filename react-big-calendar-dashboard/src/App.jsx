import { Suspense, lazy } from 'react';

const Calendar = lazy(() => import('./components/calendar/Calendar'));

function App() {
  return (
    <div className="app-root">
      <Suspense
        fallback={
          <div className="app-loading">
            <div className="spinner" aria-label="Loading calendar" />
            <span className="spinner-text">Loading calendar...</span>
          </div>
        }
      >
        <Calendar />
      </Suspense>
    </div>
  );
}

export default App;
