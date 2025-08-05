const Database = require('better-sqlite3');
const db = new Database('./db/database.db');

db.prepare(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        idade INTEGER,
        email TEXT,
        telefone TEXT
    )
`).run();

const usuarios = [
    { nome: "Ana Silva", idade: 28, email: "ana.silva@email.com", telefone: "(11) 91234-5678" },
    { nome: "Bruno Souza", idade: 34, email: "bruno.souza@email.com", telefone: "(21) 99876-5432" },
    { nome: "Carla Oliveira", idade: 22, email: "carla.oliveira@email.com", telefone: "(31) 98765-4321" },
    { nome: "Diego Santos", idade: 40, email: "diego.santos@email.com", telefone: "(41) 97654-3210" },
    { nome: "Eduarda Lima", idade: 30, email: "eduarda.lima@email.com", telefone: "(51) 96543-2109" }
];

const insert = db.prepare(`
    INSERT INTO usuarios (nome, idade, email, telefone)
    VALUES (@nome, @idade, @email, @telefone)
`);

for (const usuario of usuarios) {
    insert.run(usuario);
}

console.log("Banco criado com sucesso!");