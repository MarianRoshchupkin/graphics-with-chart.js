import stats from '../../assets/stats.json' assert { type: 'json' };
import { convertNumberToMonths } from './convertNumberToMonths.js';
import { retrieveAndCountAmountFromRange } from './retrieveAndCountAmountFromRange.js';

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
        const month = Number(monthFromNumber) + monthCounter < 10
          ? `0${Number(monthFromNumber) + monthCounter}`
          : Number(monthFromNumber) + monthCounter;
        const convertedMonth = convertNumberToMonths(String(month));

        if (type === 'Months') {
          const amount = retrieveAndCountAmountFromRange(type, list, year, month, null, null);

          limitedRange.push({ date: `${convertedMonth} ${yearFromNumber}`, amount: amount });
          monthCounter++;
        }

        if (type === 'Days') {
          const dayFromNumber = rangeFrom.split("-")[2].split("")[0].search('0') !== -1
            ? Number(rangeFrom.split("-")[2].split("")[1])
            : Number(rangeFrom.split("-")[2]);
          const dayToNumber = rangeTo.split("-")[2].split("")[0].search('0') !== -1
            ? Number(rangeTo.split("-")[2].split("")[1])
            : Number(rangeTo.split("-")[2]);
          const dayRange = dayToNumber - dayFromNumber;
          const FIRST_DAY = 1;
          let dayCounter = 0;

          if (month === monthFromNumber) {
            while (dayCounter <= dayRange) {
              const day = Number(dayFromNumber) + dayCounter < 10
                ? `0${Number(dayFromNumber) + dayCounter}`
                : Number(dayFromNumber) + dayCounter;
              const HOURS_PER_DAY = 24;
              let hourCounter = 0

              if (type === 'Days') {
                const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, null);

                limitedRange.push({ date: `${day} ${convertedMonth}`, amount: amount });
                dayCounter++;
              }

              if (type === 'Hours') {
                while (hourCounter < HOURS_PER_DAY) {
                  const hour = hourCounter < 10
                    ? `0${hourCounter}:00`
                    : `${hourCounter}:00`;
                  const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, hourCounter);

                  limitedRange.push({ date: `${hour} ${day}`, amount: amount });
                  hourCounter++;
                }

                dayCounter++;
              }
            }
          }

          if (month !== monthFromNumber && month !== monthToNumber) {
            const DAYS_PER_MONTH_MAX = 31;

            while (dayCounter <= DAYS_PER_MONTH_MAX) {
              const day = FIRST_DAY + dayCounter < 10
                ? `0${FIRST_DAY + dayCounter}`
                : FIRST_DAY + dayCounter;
              const HOURS_PER_DAY = 24;
              let hourCounter = 0

              if (type === 'Days') {
                const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, null);

                limitedRange.push({ date: `${day} ${convertedMonth}`, amount: amount });
                dayCounter++;
              }

              if (type === 'Hours') {
                while (hourCounter < HOURS_PER_DAY) {
                  const hour = hourCounter < 10
                    ? `0${hourCounter}:00`
                    : `${hourCounter}:00`;
                  const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, hourCounter);

                  limitedRange.push({ date: `${hour} ${day}`, amount: amount });
                  hourCounter++;
                }

                dayCounter++;
              }
            }
          }

          if (month !== monthFromNumber && month === monthToNumber) {
            while (dayCounter <= dayToNumber) {
              const day = FIRST_DAY + dayCounter < 10
                ? `0${FIRST_DAY + dayCounter}`
                : FIRST_DAY + dayCounter;
              const HOURS_PER_DAY = 24;
              let hourCounter = 0

              if (type === 'Days') {
                const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, null);

                limitedRange.push({ date: `${day} ${convertedMonth}`, amount: amount });
                dayCounter++;
              }

              if (type === 'Hours') {
                while (hourCounter < HOURS_PER_DAY) {
                  const hour = hourCounter < 10
                    ? `0${hourCounter}:00`
                    : `${hourCounter}:00`;
                  const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, hourCounter);

                  limitedRange.push({ date: `${hour} ${day}`, amount: amount });
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
        const convertedMonth = convertNumberToMonths(String(month));

        if (type === 'Months') {
          const amount = retrieveAndCountAmountFromRange(type, list, year, month, null, null);

          limitedRange.push({ date: `${convertedMonth} ${yearFromNumber}`, amount: amount });
          monthCounter++;
        }

        if (type === 'Days') {
          const dayFromNumber = rangeFrom.split("-")[2].split("")[0].search('0') !== -1
            ? Number(rangeFrom.split("-")[2].split("")[1])
            : Number(rangeFrom.split("-")[2]);
          const dayToNumber = rangeTo.split("-")[2].split("")[0].search('0') !== -1
            ? Number(rangeTo.split("-")[2].split("")[1])
            : Number(rangeTo.split("-")[2]);
          const dayRange = dayToNumber - dayFromNumber;
          const FIRST_DAY = 1;
          let dayCounter = 0;

          if (month === monthFromNumber) {
            while (dayCounter <= dayRange) {
              const day = Number(dayFromNumber) + dayCounter < 10
                ? `0${Number(dayFromNumber) + dayCounter}`
                : Number(dayFromNumber) + dayCounter;
              const HOURS_PER_DAY = 24;
              let hourCounter = 0

              if (type === 'Days') {
                const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, null);

                limitedRange.push({ date: `${day} ${convertedMonth}`, amount: amount });
                dayCounter++;
              }

              if (type === 'Hours') {
                while (hourCounter < HOURS_PER_DAY) {
                  const hour = hourCounter < 10
                    ? `0${hourCounter}:00`
                    : `${hourCounter}:00`;
                  const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, hourCounter);

                  limitedRange.push({ date: `${hour} ${day}`, amount: amount });
                  hourCounter++;
                }

                dayCounter++;
              }
            }
          }

          if (month !== monthFromNumber && month !== monthToNumber) {
            const DAYS_PER_MONTH_MAX = 31;

            while (dayCounter <= DAYS_PER_MONTH_MAX) {
              const day = FIRST_DAY + dayCounter < 10
                ? `0${FIRST_DAY + dayCounter}`
                : FIRST_DAY + dayCounter;
              const HOURS_PER_DAY = 24;
              let hourCounter = 0

              if (type === 'Days') {
                const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, null);

                limitedRange.push({ date: `${day} ${convertedMonth}`, amount: amount });
                dayCounter++;
              }

              if (type === 'Hours') {
                while (hourCounter < HOURS_PER_DAY) {
                  const hour = hourCounter < 10
                    ? `0${hourCounter}:00`
                    : `${hourCounter}:00`;
                  const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, hourCounter);

                  limitedRange.push({ date: `${hour} ${day}`, amount: amount });
                  hourCounter++;
                }

                dayCounter++;
              }
            }
          }

          if (month !== monthFromNumber && month === monthToNumber) {
            while (dayCounter <= dayToNumber) {
              const day = FIRST_DAY + dayCounter < 10
                ? `0${FIRST_DAY + dayCounter}`
                : FIRST_DAY + dayCounter;
              const HOURS_PER_DAY = 24;
              let hourCounter = 0

              if (type === 'Days') {
                const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, null);

                limitedRange.push({ date: `${day} ${convertedMonth}`, amount: amount });
                dayCounter++;
              }

              if (type === 'Hours') {
                while (hourCounter < HOURS_PER_DAY) {
                  const hour = hourCounter < 10
                    ? `0${hourCounter}:00`
                    : `${hourCounter}:00`;
                  const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, hourCounter);

                  limitedRange.push({ date: `${hour} ${day}`, amount: amount });
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
      const monthToNumber = rangeTo.split("-")[1].split("")[0].search('0') !== -1
        ? Number(rangeTo.split("-")[1].split("")[1])
        : Number(rangeTo.split("-")[1]);

      while (monthCounter < monthToNumber) {
        const month = FIRST_MONTH + monthCounter < 10
          ? `0${FIRST_MONTH + monthCounter}`
          : FIRST_MONTH + monthCounter;
        const convertedMonth = convertNumberToMonths(String(month));

        if (type === 'Months') {
          const amount = retrieveAndCountAmountFromRange(type, list, year, month, null, null);

          limitedRange.push({ date: `${convertedMonth} ${yearToNumber}`, amount: amount });
          monthCounter++;
        }

        if (type === 'Days') {
          const dayFromNumber = rangeFrom.split("-")[2].split("")[0].search('0') !== -1
            ? Number(rangeFrom.split("-")[2].split("")[1])
            : Number(rangeFrom.split("-")[2]);
          const dayToNumber = rangeTo.split("-")[2].split("")[0].search('0') !== -1
            ? Number(rangeTo.split("-")[2].split("")[1])
            : Number(rangeTo.split("-")[2]);
          const dayRange = dayToNumber - dayFromNumber;
          const FIRST_DAY = 1;
          let dayCounter = 0;

          if (month === monthFromNumber) {
            while (dayCounter <= dayRange) {
              const day = Number(dayFromNumber) + dayCounter < 10
                ? `0${Number(dayFromNumber) + dayCounter}`
                : Number(dayFromNumber) + dayCounter;
              const HOURS_PER_DAY = 24;
              let hourCounter = 0

              if (type === 'Days') {
                const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, null);

                limitedRange.push({ date: `${day} ${convertedMonth}`, amount: amount });
                dayCounter++;
              }

              if (type === 'Hours') {
                while (hourCounter < HOURS_PER_DAY) {
                  const hour = hourCounter < 10
                    ? `0${hourCounter}:00`
                    : `${hourCounter}:00`;
                  const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, hourCounter);

                  limitedRange.push({ date: `${hour} ${day}`, amount: amount });
                  hourCounter++;
                }

                dayCounter++;
              }
            }
          }

          if (month !== monthFromNumber && month !== monthToNumber) {
            const DAYS_PER_MONTH_MAX = 31;

            while (dayCounter <= DAYS_PER_MONTH_MAX) {
              const day = FIRST_DAY + dayCounter < 10
                ? `0${FIRST_DAY + dayCounter}`
                : FIRST_DAY + dayCounter;
              const HOURS_PER_DAY = 24;
              let hourCounter = 0

              if (type === 'Days') {
                const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, null);

                limitedRange.push({ date: `${day} ${convertedMonth}`, amount: amount });
                dayCounter++;
              }

              if (type === 'Hours') {
                while (hourCounter < HOURS_PER_DAY) {
                  const hour = hourCounter < 10
                    ? `0${hourCounter}:00`
                    : `${hourCounter}:00`;
                  const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, hourCounter);

                  limitedRange.push({ date: `${hour} ${day}`, amount: amount });
                  hourCounter++;
                }

                dayCounter++;
              }
            }
          }

          if (month !== monthFromNumber && month === monthToNumber) {
            while (dayCounter <= dayToNumber) {
              const day = FIRST_DAY + dayCounter < 10
                ? `0${FIRST_DAY + dayCounter}`
                : FIRST_DAY + dayCounter;
              const HOURS_PER_DAY = 24;
              let hourCounter = 0

              if (type === 'Days') {
                const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, null);

                limitedRange.push({ date: `${day} ${convertedMonth}`, amount: amount });
                dayCounter++;
              }

              if (type === 'Hours') {
                while (hourCounter < HOURS_PER_DAY) {
                  const hour = hourCounter < 10
                    ? `0${hourCounter}:00`
                    : `${hourCounter}:00`;
                  const amount = retrieveAndCountAmountFromRange(type, list, year, month, day, hourCounter);

                  limitedRange.push({ date: `${hour} ${day}`, amount: amount });
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

  return limitedRange;
}
