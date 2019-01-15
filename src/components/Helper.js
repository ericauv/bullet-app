export function daysInMonth(
  month = new Date().getMonth(),
  year = new Date().getFullYear()
) {
  // Input month is 0-based (i.e. is same as output from a .getMonth())
  return new Date(year, month + 1, 0).getDate();
}

export function dateDiff(datepart, fromdate, todate) {
  // datepart: 'y', 'm', 'w', 'd', 'h', 'n', 's'
  datepart = datepart.toLowerCase();
  var diff = todate - fromdate;
  var divideBy = { w: 604800000, d: 86400000, h: 3600000, n: 60000, s: 1000 };

  return Math.floor(diff / divideBy[datepart]);
}

export function sortedDaysArrayFromObjectKeys(keys) {
  const sorted = keys.sort((a, b) => (new Date(a) > new Date(b) ? 1 : -1));
  return sorted;
}
