import '@testing-library/jest-dom';

// Basic mock for ResizeObserver used by some chart/calendar libs in jsdom.
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver = ResizeObserver;
