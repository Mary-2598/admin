const numberFormat = new Intl.NumberFormat("fa-IR");

export function formatNumber(value: number): string {
  return numberFormat.format(value);
}

export function formatDelta(percent: number): string {
  const sign = percent > 0 ? "+" : percent < 0 ? "−" : "";
  return `${sign} ${formatNumber(Math.abs(percent))}٪`;
}


const dateTimeFormat = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  timeZone: "Asia/Tehran",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function formatDateTime(iso: string): string {
  const parts = dateTimeFormat.formatToParts(new Date(iso));
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}/${get("month")}/${get("day")} - ${get("hour")}:${get("minute")}`;
}
