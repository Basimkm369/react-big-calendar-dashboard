# Calendar Insights Dashboard

React Big Calendar dashboard that highlights dates with sample data, shows a modal with a bar chart per date, and uses Redux for state plus Jest for tests.

## Quick start
0) Enter the project folder  
`cd react-big-calendar-dashboard`

1) Install dependencies  
`npm install`

2) Run dev server (Vite)  
`npm run dev`

3) Run tests (Jest)  
`npm test`

## Features
- Month/week/day views via `react-big-calendar`, with custom highlighting for selected days and days with data.
- Date click opens a modal showing the selected date and a bar chart of metrics; warns when no data is available.
- Dummy JSON data with date keys and value arrays (`src/utils/dummyData.js`), matching the required format.
- Redux slice for calendar state (selected date, modal open/close, events by date).
- Jest/Testing Library coverage for slice and UI pieces; jsdom configured with necessary mocks.

## Project structure (key files)
- `src/App.jsx` – app shell.
- `src/components/calendar/Calendar.jsx` – wiring to Redux and calendar UI.
- `src/components/calendar/common/CalendarView.jsx` – Big Calendar wrapper (views, navigation, highlighting).
- `src/components/calendar/common/DateEventsModal.jsx` – modal with date details and empty-state warning.
- `src/components/calendar/common/BarChart.jsx` – bar chart renderer for per-date metrics.
- `src/redux/calendarSlice.js` & `src/store/store.js` – Redux state.
- `src/utils/dummyData.js` – sample date-wise data.
- `src/styles/calendar.css` – calendar, modal, and chart styles.
- Tests: `src/redux/calendarSlice.test.js`, `src/components/calendar/common/*.test.jsx`, `src/components/calendar/Calendar.test.jsx`.

## Tech stack
- React + Vite
- Redux Toolkit
- react-big-calendar + date-fns
- Recharts
- Jest + Testing Library

## Behavior notes
- Default view is month; toolbar buttons (Today/Back/Next) and view toggles (Month/Week/Day) are wired to controlled state.
- Clicking a day with data opens the modal and shows the bar chart; days without data show the required warning text with the date.
- Days with data and the selected day are visually distinguished in the calendar.
