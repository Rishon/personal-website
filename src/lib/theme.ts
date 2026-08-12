export const TIMEZONE = "Asia/Jerusalem";
export const NIGHT_FROM = 19;
export const NIGHT_UNTIL = 7;

// Returns the hour 0-23 in the configured timezone
export function localHour(now: Date = new Date()): number {
  return parseInt(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: TIMEZONE,
      hour: "numeric",
      hourCycle: "h23",
    }).format(now),
    10,
  );
}

// True when the local hour falls in the night window
export function isNight(now: Date = new Date()): boolean {
  const h = localHour(now);
  return h >= NIGHT_FROM || h < NIGHT_UNTIL;
}

// Applies the theme class to <html>
export function applyTheme(now: Date = new Date()): boolean {
  const night = isNight(now);
  document.documentElement.classList.toggle("night", night);
  return night;
}
