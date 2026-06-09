import { Pool } from "pg";

const db = new Pool({
    host: process.env.DB_PG_HOST || "localhost",
    user: process.env.DB_PG_USER || "postgres",
    password: process.env.DB_PG_PASSWORD || "sua_senha",
    database: process.env.DB_PG_NAME || "servidor_local",
    port: Number(process.env.DB_PG_PORT) || 5432,
    ssl: {
        rejectUnauthorized: false
    }
});
db.connect()
    .then(() => console.log("Conexão com o banco de dados PostgreSQL estabelecida com sucesso!"))
    .catch((error) => console.error("Erro ao conectar ao banco de dados PostgreSQL:", error.stack));

export default db