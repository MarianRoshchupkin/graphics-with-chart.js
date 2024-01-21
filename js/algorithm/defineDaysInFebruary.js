export function defineDaysInFebruary(year) {
  const ENTRY_YEAR = 2020;
  const yearDifference = year - ENTRY_YEAR;
  const daysInFebruary = yearDifference % 4 === 0 ? 29 : 28;

  return daysInFebruary;
}
