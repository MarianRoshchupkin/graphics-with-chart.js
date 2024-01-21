import stats from '../../assets/stats.json' assert { type: 'json' };
import { convertNumberToMonths } from './convertNumberToMonths.js';
import { retrieveAndCountAmountFromRange } from './retrieveAndCountAmountFromRange.js';
import { defineDaysInEachMonth } from './defineDaysInEachMonth.js';

export function defineGraphicSettings(type, rangeFrom, rangeTo) {
  const range = retrieveDataFromRange(type, rangeFrom, rangeTo);
  const graphicsSettings = {
    type: 'line',
    data: {
      labels: range.map((item) => item.date),
      datasets: [{
        label: type,
        data: range.map((item) => item.amount),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }

  return graphicsSettings;
}

function retrieveDataFromRange(type, rangeFrom, rangeTo) {
  const list = stats.deposits.list.slice(2);
  const yearFromNumber = Number(rangeFrom.split("-")[0]);
  const yearToNumber = Number(rangeTo.split("-")[0]);
  const yearRange = yearToNumber - yearFromNumber;
  const limitedRange = [];
  const daysRange = [];
  let yearCounter = 0;

  while (yearCounter <= yearRange) {
    const year = Number(yearFromNumber) + yearCounter;
    const MONTHS_PER_YEAR = 12;
    const FIRST_MONTH = 1
    const monthFromNumber = rangeFrom.split("-")[1].split("")[0].search('0') !== -1
      ? Number(rangeFrom.split("-")[1].split("")[1])
      : Number(rangeFrom.split("-")[1]);
    const monthToNumber = rangeTo.split("-")[1].split("")[0].search('0') !== -1
      ? Number(rangeTo.split("-")[1].split("")[1])
      : Number(rangeTo.split("-")[1]);
    const monthRange = yearFromNumber === yearToNumber
      ? monthToNumber - monthFromNumber
      : MONTHS_PER_YEAR - monthFromNumber;
    let monthCounter = 0;

    if (year === yearFromNumber) {
      while (monthCounter <= monthRange) {
        const month = monthFromNumber + monthCounter < 10
          ? `0${monthFromNumber + monthCounter}`
          : monthFromNumber + monthCounter;
        const currentMonth = monthFromNumber + monthCounter;
        const convertedMonth = convertNumberToMonths(String(month)); 

        if (type === 'Months') {
          const amount = retrieveAndCountAmountFromRange(type, list, year, month, null, null);

          limitedRange.push({ date: `${convertedMonth} ${yearFromNumber}`, amount: amount });
          monthCounter++;
        }

        if (type === 'Weeks' || type === 'Days' || type === 'Hours') {
          const dayFromNumber = rangeFrom.split("-")[2].split("")[0].search('0') !== -1
            ? Number(rangeFrom.split("-")[2].split("")[1])
            : Number(rangeFrom.split("-")[2]);
          const dayToNumber = rangeTo.split("-")[2].split("")[0].search('0') !== -1
            ? Number(rangeTo.split("-")[2].split("")[1])
            : Number(rangeTo.split("-")[2]);
          const dayRange = dayToNumber - dayFromNumber;
          const FIRST_DAY = 1;
          let dayCounter = 0;

          if (currentMonth === monthFromNumber && monthRange === 0) {
            while (dayCounter <= dayRange) {
              const day = dayFromNumber + dayCounter < 10
                ? `0${dayFromNumber + dayCounter}`
                : dayFromNumber + dayCounter;

              if (type === 'Weeks') {
                const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, null);

                daysRange.push({ date: `${day} ${convertedMonth}`, amount: amount });
                dayCounter++;
              }

              if (type === 'Days') {
                const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, null);

                limitedRange.push({ date: `${day} ${convertedMonth}`, amount: amount });
                dayCounter++;
              }

              if (type === 'Hours') {
                const HOURS_PER_DAY = 24;
                let hourCounter = 0;

                while (hourCounter < HOURS_PER_DAY) {
                  const hour = hourCounter < 10
                    ? `0${hourCounter}:00`
                    : `${hourCounter}:00`;
                  const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, hour);

                  limitedRange.push({ date: `${hour}`, amount: amount });
                  hourCounter++;
                }

                dayCounter++;
              }
            }
          }

          if (( currentMonth === monthFromNumber || currentMonth !== monthFromNumber) && currentMonth !== monthToNumber) {
            const monthRange = defineDaysInEachMonth(year, month);

            while (dayCounter < monthRange) {
              const day = FIRST_DAY + dayCounter < 10
                ? `0${FIRST_DAY + dayCounter}`
                : FIRST_DAY + dayCounter;

              if (type === 'Weeks') {
                const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, null);

                daysRange.push({ date: `${day} ${convertedMonth}`, amount: amount });
                dayCounter++;
              }

              if (type === 'Days') {
                const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, null);

                limitedRange.push({ date: `${day} ${convertedMonth}`, amount: amount });
                dayCounter++;
              }

              if (type === 'Hours') {
                const HOURS_PER_DAY = 24;
                let hourCounter = 0;

                while (hourCounter < HOURS_PER_DAY) {
                  const hour = hourCounter < 10
                    ? `0${hourCounter}:00`
                    : `${hourCounter}:00`;
                  const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, hour);

                  limitedRange.push({ date: `${hour}`, amount: amount });
                  hourCounter++;
                }

                dayCounter++;
              }
            }
          }

          if (currentMonth !== monthFromNumber && currentMonth === monthToNumber) {
            while (dayCounter < dayToNumber) {
              const day = FIRST_DAY + dayCounter < 10
                ? `0${FIRST_DAY + dayCounter}`
                : FIRST_DAY + dayCounter;

              if (type === 'Weeks') {
                const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, null);

                daysRange.push({ date: `${day} ${convertedMonth}`, amount: amount });
                dayCounter++;
              }

              if (type === 'Days') {
                const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, null);

                limitedRange.push({ date: `${day} ${convertedMonth}`, amount: amount });
                dayCounter++;
              }

              if (type === 'Hours') {
                const HOURS_PER_DAY = 24;
                let hourCounter = 0

                while (hourCounter < HOURS_PER_DAY) {
                  const hour = hourCounter < 10
                    ? `0${hourCounter}:00`
                    : `${hourCounter}:00`;
                  const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, hour);

                  limitedRange.push({ date: `${hour}`, amount: amount });
                  hourCounter++;
                }

                dayCounter++;
              }
            }
          }

          monthCounter++;
        }
      }
    }

    if (year !== yearFromNumber && year !== yearToNumber) {
      while (monthCounter < MONTHS_PER_YEAR) {
        const month = FIRST_MONTH + monthCounter < 10
          ? `0${FIRST_MONTH + monthCounter}`
          : FIRST_MONTH + monthCounter;
        const currentMonth = FIRST_MONTH + monthCounter;
        const convertedMonth = convertNumberToMonths(String(month));

        if (type === 'Months') {
          const amount = retrieveAndCountAmountFromRange(type, list, year, month, null, null);

          limitedRange.push({ date: `${convertedMonth} ${yearFromNumber}`, amount: amount });
          monthCounter++;
        }

        if (type === 'Weeks' || type === 'Days' || type === 'Hours') {
          const dayFromNumber = rangeFrom.split("-")[2].split("")[0].search('0') !== -1
            ? Number(rangeFrom.split("-")[2].split("")[1])
            : Number(rangeFrom.split("-")[2]);
          const dayToNumber = rangeTo.split("-")[2].split("")[0].search('0') !== -1
            ? Number(rangeTo.split("-")[2].split("")[1])
            : Number(rangeTo.split("-")[2]);
          const dayRange = dayToNumber - dayFromNumber;
          const FIRST_DAY = 1;
          let dayCounter = 0;

          if (currentMonth === monthFromNumber && monthRange === 0) {
            while (dayCounter <= dayRange) {
              const day = dayFromNumber + dayCounter < 10
                ? `0${dayFromNumber + dayCounter}`
                : dayFromNumber + dayCounter;

              if (type === 'Weeks') {
                const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, null);

                daysRange.push({ date: `${day} ${convertedMonth}`, amount: amount });
                dayCounter++;
              }

              if (type === 'Days') {
                const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, null);

                limitedRange.push({ date: `${day} ${convertedMonth}`, amount: amount });
                dayCounter++;
              }

              if (type === 'Hours') {
                const HOURS_PER_DAY = 24;
                let hourCounter = 0;

                while (hourCounter < HOURS_PER_DAY) {
                  const hour = hourCounter < 10
                    ? `0${hourCounter}:00`
                    : `${hourCounter}:00`;
                  const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, hour);

                  limitedRange.push({ date: `${hour}`, amount: amount });
                  hourCounter++;
                }

                dayCounter++;
              }
            }
          }

          if ((currentMonth === monthFromNumber || currentMonth !== monthFromNumber) && currentMonth !== monthToNumber) {
            const monthRange = defineDaysInEachMonth(year, month);

            while (dayCounter < monthRange) {
              const day = FIRST_DAY + dayCounter < 10
                ? `0${FIRST_DAY + dayCounter}`
                : FIRST_DAY + dayCounter;

              if (type === 'Weeks') {
                const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, null);

                daysRange.push({ date: `${day} ${convertedMonth}`, amount: amount });
                dayCounter++;
              }

              if (type === 'Days') {
                const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, null);

                limitedRange.push({ date: `${day} ${convertedMonth}`, amount: amount });
                dayCounter++;
              }

              if (type === 'Hours') {
                const HOURS_PER_DAY = 24;
                let hourCounter = 0;

                while (hourCounter < HOURS_PER_DAY) {
                  const hour = hourCounter < 10
                    ? `0${hourCounter}:00`
                    : `${hourCounter}:00`;
                  const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, hour);

                  limitedRange.push({ date: `${hour}`, amount: amount });
                  hourCounter++;
                }

                dayCounter++;
              }
            }
          }

          if (currentMonth !== monthFromNumber && currentMonth === monthToNumber) {
            while (dayCounter < dayToNumber) {
              const day = FIRST_DAY + dayCounter < 10
                ? `0${FIRST_DAY + dayCounter}`
                : FIRST_DAY + dayCounter;

              if (type === 'Weeks') {
                const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, null);

                daysRange.push({ date: `${day} ${convertedMonth}`, amount: amount });
                dayCounter++;
              }

              if (type === 'Days') {
                const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, null);

                limitedRange.push({ date: `${day} ${convertedMonth}`, amount: amount });
                dayCounter++;
              }

              if (type === 'Hours') {
                const HOURS_PER_DAY = 24;
                let hourCounter = 0;

                while (hourCounter < HOURS_PER_DAY) {
                  const hour = hourCounter < 10
                    ? `0${hourCounter}:00`
                    : `${hourCounter}:00`;
                  const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, hour);

                  limitedRange.push({ date: `${hour}`, amount: amount });
                  hourCounter++;
                }

                dayCounter++;
              }
            }
          }

          monthCounter++;
        }
      }
    }

    if (year !== yearFromNumber && year === yearToNumber) {
      while (monthCounter < monthToNumber) {
        const month = FIRST_MONTH + monthCounter < 10
          ? `0${FIRST_MONTH + monthCounter}`
          : FIRST_MONTH + monthCounter;
        const currentMonth = FIRST_MONTH + monthCounter;
        const convertedMonth = convertNumberToMonths(String(month));

        if (type === 'Months') {
          const amount = retrieveAndCountAmountFromRange(type, list, year, month, null, null);

          limitedRange.push({ date: `${convertedMonth} ${yearToNumber}`, amount: amount });
          monthCounter++;
        }

        if (type === 'Weeks' || type === 'Days' || type === 'Hours') {
          const dayFromNumber = rangeFrom.split("-")[2].split("")[0].search('0') !== -1
            ? Number(rangeFrom.split("-")[2].split("")[1])
            : Number(rangeFrom.split("-")[2]);
          const dayToNumber = rangeTo.split("-")[2].split("")[0].search('0') !== -1
            ? Number(rangeTo.split("-")[2].split("")[1])
            : Number(rangeTo.split("-")[2]);
          const dayRange = dayToNumber - dayFromNumber;
          const FIRST_DAY = 1;
          let dayCounter = 0;

          if (currentMonth === monthFromNumber && monthRange === 0) {
            while (dayCounter <= dayRange) {
              const day = Number(dayFromNumber) + dayCounter < 10
                ? `0${Number(dayFromNumber) + dayCounter}`
                : Number(dayFromNumber) + dayCounter;

              if (type === 'Weeks') {
                const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, null);

                daysRange.push({ date: `${day} ${convertedMonth}`, amount: amount });
                dayCounter++;
              }

              if (type === 'Days') {
                const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, null);

                limitedRange.push({ date: `${day} ${convertedMonth}`, amount: amount });
                dayCounter++;
              }

              if (type === 'Hours') {
                const HOURS_PER_DAY = 24;
                let hourCounter = 0;

                while (hourCounter < HOURS_PER_DAY) {
                  const hour = hourCounter < 10
                    ? `0${hourCounter}:00`
                    : `${hourCounter}:00`;
                  const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, hour);

                  limitedRange.push({ date: `${hour}`, amount: amount });
                  hourCounter++;
                }

                dayCounter++;
              }
            }
          }

          if ((currentMonth === monthFromNumber || currentMonth !== monthFromNumber) && currentMonth !== monthToNumber) {
            const monthRange = defineDaysInEachMonth(year, month);

            while (dayCounter < monthRange) {
              const day = FIRST_DAY + dayCounter < 10
                ? `0${FIRST_DAY + dayCounter}`
                : FIRST_DAY + dayCounter;

              if (type === 'Weeks') {
                const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, null);

                daysRange.push({ date: `${day} ${convertedMonth}`, amount: amount });
                dayCounter++;
              }

              if (type === 'Days') {
                const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, null);

                limitedRange.push({ date: `${day} ${convertedMonth}`, amount: amount });
                dayCounter++;
              }

              if (type === 'Hours') {
                const HOURS_PER_DAY = 24;
                let hourCounter = 0;

                while (hourCounter < HOURS_PER_DAY) {
                  const hour = hourCounter < 10
                    ? `0${hourCounter}:00`
                    : `${hourCounter}:00`;
                  const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, hour);

                  limitedRange.push({ date: `${hour}`, amount: amount });
                  hourCounter++;
                }

                dayCounter++;
              }
            }
          }

          if (currentMonth !== monthFromNumber && currentMonth === monthToNumber) {
            while (dayCounter < dayToNumber) {
              const day = FIRST_DAY + dayCounter < 10
                ? `0${FIRST_DAY + dayCounter}`
                : FIRST_DAY + dayCounter;

              if (type === 'Weeks') {
                const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, null);

                daysRange.push({ date: `${day} ${convertedMonth}`, amount: amount });
                dayCounter++;
              }

              if (type === 'Days') {
                const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, null);

                limitedRange.push({ date: `${day} ${convertedMonth}`, amount: amount });
                dayCounter++;
              }

              if (type === 'Hours') {
                const HOURS_PER_DAY = 24;
                let hourCounter = 0;

                while (hourCounter < HOURS_PER_DAY) {
                  const hour = hourCounter < 10
                    ? `0${hourCounter}:00`
                    : `${hourCounter}:00`;
                  const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, hour);

                  limitedRange.push({ date: `${hour}`, amount: amount });
                  hourCounter++;
                }

                dayCounter++;
              }
            }
          }

          monthCounter++;
        }
      }
    }

    yearCounter++;
  }

  if (type === 'Weeks') {
    if (daysRange.length !== 0) {
      let weekCounter = 0;

      while (weekCounter < daysRange.length) {
        const weekRange = daysRange.slice(0 + weekCounter, 7 + weekCounter);
        const beginningOfWeek = weekRange[0].date;
        const endOfWeek = weekRange[weekRange.length - 1].date;
        let amount = 0;

        for (const day of weekRange) {
          amount += day.amount;
        }

        limitedRange.push({ date: `${beginningOfWeek} - ${endOfWeek}`, amount: amount });
        weekCounter += 7;
      }
    }
  }

  return limitedRange;
}
