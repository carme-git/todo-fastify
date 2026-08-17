// On importe Fastify pour créer notre serveur.
import Fastify from "fastify";

// On importe notre connexion à SQLite.
import db from "./database.js";

// On crée l'application Fastify.
const app = Fastify({
  // Active les logs dans le terminal.
  logger: true
});

// Route de test.
app.get("/", async () => {
  return {
    message: "Todo API fonctionne bien !"
  };
});

// Route pour lire les tâches.
app.get("/read", async () => {
  // On récupère toutes les tâches dans SQLite.
  const todos = db.prepare("SELECT * FROM todos").all();
  
  // On renvoie les tâches au client.
  return {
    todos: todos
  };
});

// Route pour créer une tâche.
app.post("/write", async (request, reply) => {
  // On récupère les données envoyées par le client.
  const body = request.body as { title?: string };

  // Validation : title doit exister et ne pas être vide.
  if (!body.title || body.title.trim() === "") {
    reply.code(400);
    return {
      error: "Le champ 'title' est requis et ne peut pas être vide."
    };
  }

  try {
    // On enregistre la tâche dans SQLite.
    const stmt = db.prepare(
      "INSERT INTO todos (title) VALUES (?)"
    );

    stmt.run(body.title);

    // On confirme l'enregistrement.
    return {
      message: "Tâche enregistrée",
      received: body
    };
  } catch (err) {
    // Si l'insertion échoue pour une autre raison.
    reply.code(500);
    return {
      error: "Erreur lors de l'enregistrement de la tâche."
    };
  }
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.listen({ port, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Serveur démarré sur ${address}`);
});