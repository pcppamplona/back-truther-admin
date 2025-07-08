import { env } from "@/infra/env";
import { PostgresDatabase } from "../connection";

async function seed() {
  // Inicializa conexão
  await PostgresDatabase.connect(env.DATABASE_URL);

  const client = await PostgresDatabase.getClient();

  // Grupos (com herança)
  await client.query(`INSERT INTO groups (id, name, parent_id) VALUES
    (222, 'Admin', null),
    (1, 'N3', 222),
    (2, 'N1', 1),
    (1234, 'Produto', 2)
  `);

  // Usuários
  await client.query(`INSERT INTO users (id, name, password, document, id_truther) VALUES
    (1, 'Pampers', 'abc123', '123.456.789-01', '333'),
    (2, 'Pedrão', '123abc', '123.321.123-02', '222'),
    (3, 'Carlos', '321cba', '777.888.999-56', '111')
  `);

  // User-Groups
  await client.query(`INSERT INTO user_groups (id, user_id, is_primary, group_id) VALUES
    (1, 1, false, 1),
    (2, 1, true, 2),
    (3, 2, false, 1)
  `);

  // Items
  await client.query(`INSERT INTO items (id, name) VALUES
    (1, 'Relatório Geral'),
    (2, 'Painel Produto'),
    (3, 'Dashboard de Vendas')
  `);

  // Items visíveis para grupos
  await client.query(`INSERT INTO item_groups (item_id, group_id) VALUES
    (1, 222), -- Admin
    (2, 1234), -- Produto
    (3, 2) -- N1
  `);

  console.log("🌱 Seed realizado com sucesso");
  process.exit(0);
}

seed().catch(err => {
  console.error("❌ Erro ao rodar seed:", err);
  process.exit(1);
});
