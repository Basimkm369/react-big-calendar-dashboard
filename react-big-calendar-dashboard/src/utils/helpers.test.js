import { parseDateKey, getDateTotal } from './helpers';

describe('helpers', () => {
  test('parseDateKey converts dd-MM-yyyy string to Date', () => {
    const date = parseDateKey('01-11-2025');
    expect(date.getFullYear()).toBe(2025);
    expect(date.getMonth()).toBe(10); // zero-based
    expect(date.getDate()).toBe(1);
  });

  test('getDateTotal sums values from mixed item shapes', () => {
    const items = [{ user_1: 2 }, { label: 'Orders', value: 5 }, { user_3: '3' }];
    expect(getDateTotal(items)).toBe(10);
  });

  test('getDateTotal handles empty/undefined', () => {
    expect(getDateTotal()).toBe(0);
    expect(getDateTotal([])).toBe(0);
  });
});
