/**
 * Headlines count the collection in words — "Four objects." reads better than
 * "4 objects." in display type. Both call sites used to hardcode "Three", and
 * both were already wrong at four, so the number is derived and spelled here.
 */
const WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];

export function countWord(n: number) {
  return WORDS[n] ?? String(n);
}
