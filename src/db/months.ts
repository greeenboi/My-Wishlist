import { getDb } from "./client";
import { addMonths } from "../lib/month";
import type { Month, MonthSummary } from "./types";

export async function setMonth({ month, salary, budget }: Month): Promise<void> {
  const db = await getDb();
  await db.execute(
    `INSERT INTO months (month, salary, budget) VALUES ($1, $2, $3)
     ON CONFLICT (month) DO UPDATE SET salary = excluded.salary, budget = excluded.budget`,
    [month, salary, budget],
  );
}

export async function getLatestMonth(): Promise<Month | null> {
  const db = await getDb();
  const rows = await db.select<Month[]>(
    "SELECT month, salary, budget FROM months ORDER BY month DESC LIMIT 1",
  );
  return rows[0] ?? null;
}

// Fills any missing months up to `month` using the latest known salary and budget.
export async function ensureMonth(month: string): Promise<void> {
  const latest = await getLatestMonth();
  if (!latest || latest.month >= month) return;

  for (let next = addMonths(latest.month, 1); next <= month; next = addMonths(next, 1)) {
    await setMonth({ month: next, salary: latest.salary, budget: latest.budget });
  }
}

export async function getMonthSummaries(): Promise<MonthSummary[]> {
  const db = await getDb();
  const rows = await db.select<(Month & { spent: number })[]>(
    `SELECT m.month, m.salary, m.budget, COALESCE(SUM(i.bought_price), 0) AS spent
     FROM months m
     LEFT JOIN items i ON i.bought_month = m.month
     GROUP BY m.month
     ORDER BY m.month`,
  );

  let carry = 0;
  return rows.map((row) => {
    const available = row.budget + carry;
    const remaining = available - row.spent;
    const summary = { ...row, carry_in: carry, available, remaining };
    carry = remaining;
    return summary;
  });
}

export async function getMonthSummary(month: string): Promise<MonthSummary | null> {
  await ensureMonth(month);
  const summaries = await getMonthSummaries();
  return summaries.find((s) => s.month === month) ?? null;
}
