import Database from "better-sqlite3";

const db = new Database('../../db/database.db', { verbose: console.log });
export default db;