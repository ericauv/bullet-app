export function daysInMonth(month, year) {
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
