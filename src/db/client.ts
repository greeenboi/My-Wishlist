import Database from "@tauri-apps/plugin-sql";

let db: Promise<Database> | null = null;

export function getDb(): Promise<Database> {
  return (db ??= Database.load("sqlite:wishlist.db"));
}
