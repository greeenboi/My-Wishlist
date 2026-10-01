import { listWishlist } from "../db/items";
import { getMonthSummary } from "../db/months";
import { addMonths, currentMonth } from "./month";
import type { Item, PlannedItem } from "../db/types";

export async function getPlan(month = currentMonth()): Promise<PlannedItem[]> {
  const [summary, wishlist] = await Promise.all([getMonthSummary(month), listWishlist()]);
  if (!summary) return wishlist.map((item) => ({ item, monthsAway: null, targetMonth: null }));
  return planPurchases(wishlist, summary.remaining, summary.budget, month);
}

// Items are bought in order; each one waits until the running total is covered.
export function planPurchases(items: Item[], remaining: number, monthlyBudget: number, month: string): PlannedItem[] {
  let total = 0;
  return items.map((item) => {
    total += item.price;
    const shortfall = total - remaining;

    if (shortfall <= 0) return { item, monthsAway: 0, targetMonth: month };
    if (monthlyBudget <= 0) return { item, monthsAway: null, targetMonth: null };

    const monthsAway = Math.ceil(shortfall / monthlyBudget);
    return { item, monthsAway, targetMonth: addMonths(month, monthsAway) };
  });
}
