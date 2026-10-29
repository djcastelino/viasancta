/** Calendar arithmetic uses local date fields, never elapsed local-time hours. */
export function localDateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function previousLocalDate(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1, 12);
}

export function dailyChallengeIndex(count: number, date = new Date()) {
  const dayOfYear = Math.round(
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(date.getFullYear(), 0, 0)) / 86400000,
  );
  return dayOfYear % count;
}

export function millisecondsUntilLocalMidnight(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).getTime() - date.getTime();
}

/** Refreshes exactly at midnight and catches suspended tabs or timezone changes. */
export function watchLocalDay(onDay: (key: string) => void) {
  let timer: ReturnType<typeof setTimeout>;
  const refresh = () => {
    clearTimeout(timer);
    onDay(localDateKey());
    timer = setTimeout(refresh, millisecondsUntilLocalMidnight() + 50);
  };
  const visible = () => { if (document.visibilityState === "visible") refresh(); };
  refresh();
  const interval = setInterval(refresh, 60000);
  window.addEventListener("focus", refresh);
  document.addEventListener("visibilitychange", visible);
  return () => {
    clearTimeout(timer);
    clearInterval(interval);
    window.removeEventListener("focus", refresh);
    document.removeEventListener("visibilitychange", visible);
  };
}
