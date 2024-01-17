export function retrieveAndCountAmountFromRange(type, list, year, month, day) {
  let amount = 0;

  for (const item of list) {
    const retrievedYear = Number(item.ymd.split("").slice(0, 4).join(""));
    const retrievedMonth = item.ymd.split("").slice(4, 6).join("");
    const retrievedDay = item.ymd.split("").slice(6, 8).join("");

    if (type === 'Months') {
      if (year === retrievedYear && retrievedMonth.search(month) !== -1) {
        amount += Number(item.amount);
      }
    }

    if (type === 'Days') {
      if (year === retrievedYear && retrievedMonth.search(month) !== -1 && retrievedDay.search(day) !== -1) {
        amount += Number(item.amount);
      }
    }
  }

  return amount;
}
