import type { DbAdapter } from "./adapter";

let adapter: DbAdapter | null = null;

export function getAdapter(): DbAdapter {
  if (adapter) return adapter;

  const useSupabase =
    process.env.DATABASE_PROVIDER === "supabase" ||
    Boolean(process.env.SUPABASE_DB_URL) ||
    Boolean(process.env.POSTGRES_URL) ||
    Boolean(process.env.DATABASE_URL);

  if (useSupabase) {
    const { PostgresAdapter } = require("./postgres-adapter");
    adapter = new PostgresAdapter();
  } else {
    const { SqliteAdapter } = require("./sqlite-adapter");
    adapter = new SqliteAdapter();
  }

  return adapter!;
}
