// Converts a "dd-MM-yyyy" string into a Date (used by calendar rendering).
export const parseDateKey = (key) => {
  const [day, month, year] = key.split('-').map(Number);
  return new Date(year, month - 1, day);
};

// Totals numeric values for a date's metric list (drives calendar event titles).
export const getDateTotal = (items) =>
  (items || []).reduce((sum, item) => {
    if (item?.value !== undefined) {
      return sum + Number(item.value || 0);
    }
    const firstValue = Object.values(item || {})[0];
    return sum + Number(firstValue || 0);
  }, 0);
