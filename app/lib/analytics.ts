export function trackUmami(
  eventName: string,
  data?: Record<string, string | number | boolean>
): void {
  try {
    if (typeof window !== 'undefined') {
      const w = window as unknown as {
        umami?: { track?: (name: string, payload?: Record<string, string | number | boolean>) => void };
      };
      if (w.umami && typeof w.umami.track === 'function') {
        if (data && Object.keys(data).length > 0) {
          w.umami.track(eventName, data);
        } else {
          w.umami.track(eventName);
        }
      }
    }
  } catch {
    // Analytics must never interrupt user experience
  }
}
