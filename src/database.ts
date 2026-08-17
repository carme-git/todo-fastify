// Permet à Node.js de communiquer avec SQLite.
import Database from "better-sqlite3";

// Ouvre la base de données ou la crée si elle n'existe pas.
const db = new Database("todo.db");

// Crée la table "todos" si elle n'existe pas encore.
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL
  )
`);

// Permet à server.ts d'utiliser la base de données.
export default db;