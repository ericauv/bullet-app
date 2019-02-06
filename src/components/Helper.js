export function daysInMonth(
  month = new Date().getMonth(),
  year = new Date().getFullYear()
) {
  // Input month is 0-based (i.e. is same as output from a .getMonth())
  return new Date(year, month + 1, 0).getDate();
}

export function dateAdd(datePart, dateFrom, addValue) {
  // datepart: 'y', 'm', 'w', 'd', 'h', 'n', 's'
  datePart = datePart.toLowerCase();
  const multiplyBy = {
    w: 604800000,
    d: 86400000,
    h: 3600000,
    n: 60000,
    s: 1000
  };
  const newTime = Math.floor(
    new Date(dateFrom).getTime() + addValue * multiplyBy[datePart]
  );
  return new Date(newTime);
}
export function dateDiff(datepart, fromdate, todate) {
  // datepart: 'y', 'm', 'w', 'd', 'h', 'n', 's'
  datepart = datepart.toLowerCase();
  const diff = new Date(todate) - new Date(fromdate);
  const divideBy = { w: 604800000, d: 86400000, h: 3600000, n: 60000, s: 1000 };

  return Math.floor(diff / divideBy[datepart]);
}

export function sortedDaysArrayFromDaysKeys(keys) {
  const sorted = keys.sort((a, b) => (new Date(a) > new Date(b) ? 1 : -1));
  return sorted;
}

export function isSameMonthAndYear(aDate, bDate) {
  // returns true if the passed date strings are in the same month (and year)

  const [aNewDate, bNewDate] = [new Date(aDate), new Date(bDate)];
  const [aMonth, bMonth] = [aNewDate.getMonth(), bNewDate.getMonth()];
  const [aYear, bYear] = [aNewDate.getFullYear(), bNewDate.getFullYear()];
  return aMonth === bMonth && aYear === bYear;
}

export function compareMonthsTrinary(startDate, endDate) {
  const [startNewDate, endNewDate] = [new Date(startDate), new Date(endDate)];
  const [startMonth, endMonth] = [
    startNewDate.getMonth(),
    endNewDate.getMonth()
  ];
  const [startYear, endYear] = [
    startNewDate.getFullYear(),
    endNewDate.getFullYear()
  ];

  if (startYear < endYear) {
    // previous year
    return -1;
  } else if (startYear > endYear) {
    // later year
    return 1;
  } else if (startYear === endYear) {
    // same year
    if (startMonth < endMonth) {
      // previous month
      return -1;
    } else if (startMonth === endMonth) {
      // same month
      return 0;
    } else if (startMonth > endMonth) {
      // later month
      return 1;
    }
  }
}
