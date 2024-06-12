export function formatDate(d: Date | string | undefined | null) {
  if (!d) return '';
  const s = useDateFormat(d, 'YYYY.MM.DD');
  return s.value;
}

export function formatDateTime(d: Date | string | undefined | null) {
  if (!d) return '';
  const s = useDateFormat(d, 'YYYY.MM.DD HH:mm:ss');
  return s.value;
}

export function convertMonthString(year: string, month: number) {
  let valueStr = month.toString();
  if (valueStr.length < 2) valueStr = '0' + valueStr;
  return year + '-' + valueStr;
}

export function getLastDay(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

export function getMonday(date: Date) {
  date = new Date(date);
  const day = date.getDay();
  const diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(date.setDate(diff));
}

export function getWeekCount(year: number, month_number: number) {
  const firstOfMonth = new Date(year, month_number - 1, 1);
  const lastOfMonth = new Date(year, month_number, 0);
  const used = firstOfMonth.getDay() + lastOfMonth.getDate();
  return Math.ceil(used / 7);
}

export function getWeekOfMonth(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const offsetDate = date.getDate() + firstWeekday - 1;
  return Math.floor(offsetDate / 7);
}
