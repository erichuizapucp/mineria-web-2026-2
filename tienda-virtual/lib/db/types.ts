import type sqlite3 from "sqlite3";
import type { Database } from "sqlite";

export type SQLiteDb = Database<sqlite3.Database, sqlite3.Statement>;
