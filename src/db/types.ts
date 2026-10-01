export interface Item {
  id: number;
  name: string;
  tag: string | null;
  link: string | null;
  price: number;
  priority: number;
  bought_month: string | null;
  bought_price: number | null;
  created_at: string;
}

export interface NewItem {
  name: string;
  tag?: string | null;
  link?: string | null;
  price: number;
  priority?: number;
}

export interface Month {
  month: string;
  salary: number;
  budget: number;
}

export interface MonthSummary extends Month {
  carry_in: number;
  available: number;
  spent: number;
  remaining: number;
}

export interface PlannedItem {
  item: Item;
  monthsAway: number | null;
  targetMonth: string | null;
}
