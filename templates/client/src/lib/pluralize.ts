/** pluralize(1, "click") → "1 click", pluralize(3, "click") → "3 clicks" */
export function pluralize(count: number, word: string) {
  return `${count} ${count === 1 ? word : `${word}s`}`;
}
