export function minutesToHoursAndMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hoursStr = hours > 0 ? `${hours} hour(s)` : "";
  const minutesStr = remainingMinutes > 0 ? `${remainingMinutes} minute(s)` : "";
  return (hoursStr && minutesStr) ? `${hoursStr} and ${minutesStr}` : `${hoursStr}${minutesStr}`;
}