import { useCallback, useEffect, useState } from "react";
import { listBought } from "../db/items";
import { getMonthSummary } from "../db/months";
import { getPlan } from "../lib/plan";
import { currentMonth } from "../lib/month";
import type { Item, MonthSummary, PlannedItem } from "../db/types";

export function useWishlist() {
  const [plan, setPlan] = useState<PlannedItem[]>([]);
  const [summary, setSummary] = useState<MonthSummary | null>(null);
  const [bought, setBought] = useState<Item[]>([]);

  const refresh = useCallback(async () => {
    const month = currentMonth();
    setSummary(await getMonthSummary(month));
    setPlan(await getPlan(month));
    setBought(await listBought(month));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { plan, summary, bought, refresh };
}
