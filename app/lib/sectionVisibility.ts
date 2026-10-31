// Content stays in the repository. Remove a path here to reopen its section.
export const hiddenSections = [
  '/tours/eucharistic-miracles',
  '/tours/marian-apparitions',
  '/stations-of-the-cross',
  '/biblical-timeline',
  '/jesus-in-ot',
  '/memory-verses',
];
export const showTodaysPromise = false;
export function isSectionVisible(path: string) {
  return !hiddenSections.some(hidden => path === hidden || path.startsWith(hidden + '/'));
}
