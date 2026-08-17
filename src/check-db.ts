// On importe notre connexion SQLite.
import db from "./database.js";

// On récupère toutes les tâches.
const todos = db.prepare("SELECT * FROM todos").all();

// On affiche les tâches.
console.log(todos);