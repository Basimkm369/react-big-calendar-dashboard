// Converts a "dd-MM-yyyy" string into a Date (used by calendar rendering).
export const parseDateKey = (key) => {
  const [day, month, year] = key.split('-').map(Number);
  return new Date(year, month - 1, day);
};
