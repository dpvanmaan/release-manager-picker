import type { DbAdapter } from "./adapter";

let adapter: DbAdapter | null = null;

export function getAdapter(): DbAdapter {
  if (adapter) return adapter;

  const usePostgres =
    process.env.DATABASE_PROVIDER === "postgres" ||
    Boolean(process.env.POSTGRES_URL);

  if (usePostgres) {
    const { PostgresAdapter } = require("./postgres-adapter");
    adapter = new PostgresAdapter();
  } else {
    const { SqliteAdapter } = require("./sqlite-adapter");
    adapter = new SqliteAdapter();
  }

  return adapter!;
}
