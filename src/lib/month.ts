export function toMonth(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function currentMonth(): string {
  return toMonth(new Date());
}

export function monthStart(month: string): Date {
  const [year, m] = month.split("-").map(Number);
  return new Date(year, m - 1, 1);
}

export function addMonths(month: string, count: number): string {
  const [year, m] = month.split("-").map(Number);
  return toMonth(new Date(year, m - 1 + count, 1));
}
