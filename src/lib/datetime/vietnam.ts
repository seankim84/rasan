const timeZone = "Asia/Ho_Chi_Minh";

export function getVietnamDateKey(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

export function addDays(dateKey: string, amount: number): string {
  const date = new Date(`${dateKey}T12:00:00+07:00`);
  date.setUTCDate(date.getUTCDate() + amount);
  return getVietnamDateKey(date);
}

export function dateKeyToDate(dateKey: string): Date {
  return new Date(`${dateKey}T12:00:00+07:00`);
}
