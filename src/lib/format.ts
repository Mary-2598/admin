const numberFormat = new Intl.NumberFormat("fa-IR");

export function formatNumber(value: number): string {
  return numberFormat.format(value);
}

export function formatDelta(percent: number): string {
  const sign = percent > 0 ? "+" : percent < 0 ? "−" : "";
  return `${sign} ${formatNumber(Math.abs(percent))}٪`;
}
