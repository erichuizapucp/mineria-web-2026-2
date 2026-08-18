import sqlite3 from "sqlite3";
import { open } from "sqlite";
import type { SQLiteDb } from "@/lib/db/types";
import { initializeDatabase } from "@/lib/db/seed";

declare global {
  var __sqliteDbPromise: Promise<SQLiteDb> | undefined;
}

export async function getDb(): Promise<SQLiteDb> {
  if (!globalThis.__sqliteDbPromise) {
    globalThis.__sqliteDbPromise = open({
      filename: ":memory:",
      driver: sqlite3.Database,
    }).then(async (db) => {
      await db.exec("PRAGMA foreign_keys = ON;");
      await initializeDatabase(db);
      return db;
    });
  }

  return globalThis.__sqliteDbPromise;
}
