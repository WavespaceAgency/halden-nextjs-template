/** "8 min read" → "8 min read" with a non-breaking space after the number, so it never wraps between number and unit. */
export function nbsp(text: string) {
  return text.replace(/(\d)\s+/g, "$1 ");
}
