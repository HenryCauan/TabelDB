import path from "path";
import Database from "better-sqlite3";

const dbPath = path.join(process.cwd(), "db", "database.db");
const db = new Database(dbPath, { verbose: console.log });
export default db;