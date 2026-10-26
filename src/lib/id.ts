/**
 * Single place for ids.
 * - stableId: deterministic, safe to render on the server (no hydration mismatch).
 * - uid: random, ONLY call it from event handlers / effects, never during render.
 */
export function stableId(prefix: string, index: number): string {
  return `${prefix}-${index}`;
}

export function uid(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`;
}
