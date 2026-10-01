import { getDb } from "./client";
import { ensureMonth } from "./months";
import { currentMonth } from "../lib/month";
import type { Item, NewItem } from "./types";

export async function addItem({ name, tag = null, link = null, price, priority = 0 }: NewItem): Promise<void> {
  const db = await getDb();
  await db.execute(
    "INSERT INTO items (name, tag, link, price, priority) VALUES ($1, $2, $3, $4, $5)",
    [name, tag, link, price, priority],
  );
}

export async function updateItem(id: number, { name, tag = null, link = null, price, priority = 0 }: NewItem): Promise<void> {
  const db = await getDb();
  await db.execute(
    "UPDATE items SET name = $1, tag = $2, link = $3, price = $4, priority = $5 WHERE id = $6",
    [name, tag, link, price, priority, id],
  );
}

export async function deleteItem(id: number): Promise<void> {
  const db = await getDb();
  await db.execute("DELETE FROM items WHERE id = $1", [id]);
}

export async function listWishlist(): Promise<Item[]> {
  const db = await getDb();
  return db.select<Item[]>(
    "SELECT * FROM items WHERE bought_month IS NULL ORDER BY priority DESC, created_at",
  );
}

export async function listBought(month?: string): Promise<Item[]> {
  const db = await getDb();
  return month
    ? db.select<Item[]>("SELECT * FROM items WHERE bought_month = $1 ORDER BY id", [month])
    : db.select<Item[]>("SELECT * FROM items WHERE bought_month IS NOT NULL ORDER BY bought_month DESC, id");
}

export async function buyItem(id: number, price?: number, month = currentMonth()): Promise<void> {
  await ensureMonth(month);
  const db = await getDb();
  await db.execute(
    "UPDATE items SET bought_month = $1, bought_price = COALESCE($2, price) WHERE id = $3",
    [month, price ?? null, id],
  );
}

export async function unbuyItem(id: number): Promise<void> {
  const db = await getDb();
  await db.execute("UPDATE items SET bought_month = NULL, bought_price = NULL WHERE id = $1", [id]);
}
