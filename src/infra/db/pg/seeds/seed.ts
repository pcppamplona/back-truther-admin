import { PostgresDatabase } from "@/infra/db/pg/connection";
import { env } from "@/infra/env";

async function seed() {
  await PostgresDatabase.connect(env.DATABASE_URL);
  const client = await PostgresDatabase.getClient();

  const queries = [
    {
      description: "Inserindo grupos",
      sql: `
        INSERT INTO groups (id, group_name, id_pai) VALUES
            (1, 'N2', 4),
            (2, 'N1', 1),
            (3, 'Produto', 2),
            (4, 'Admin', NULL)
      `,
    },
    {
      description: "Inserindo usuários",
      sql: `
          INSERT INTO users (
           uuid, name, username, password_hash, active, force_reset_pwd, type_auth, created_at, updated_at
            )
            VALUES
              (gen_random_uuid(),'Pedro Silva','pedro.silva',crypt('senha123', gen_salt('bf')),true,false,'local',NOW(),NOW()),
              (gen_random_uuid(),'Maria Oliveira','maria.oliveira',crypt('superSenha!', gen_salt('bf')),true,false,'local',NOW(),NOW()),
              (gen_random_uuid(),'João Souza','joao.souza',crypt('outraSenha$', gen_salt('bf')),true,false,'local', NOW(),NOW())
              `,
    },
    {
      description: "Inserindo items",
      sql: `
        INSERT INTO items (group_id, title, description) VALUES
          (1, 'Item 1', 'Description 1'),
          (1, 'Item 2', 'Description 2'),
          (2, 'Item 3', 'Description 3'),
          (2, 'Item 4', 'Description 4'),
          (3, 'Item 5', 'Description 5'),
          (3, 'Item 6', 'Description 6'),
          (4, 'Item 7', 'Description 7'),
          (4, 'Item 8', 'Description 8'),
          (2, 'Item 9', 'Description 9'),
          (1, 'Item 10', 'Description 10')
      `,
    },
    {
      description: "Inserindo user-groups",
      sql: `
       INSERT INTO user_groups (user_id, group_id, is_main) VALUES
        (1, 1, FALSE),
        (1, 2, TRUE),
        (2, 2, TRUE),
        (3, 1, FALSE)
      `,
    },
  ];

  for (const { sql, description } of queries) {
    try {
      await client.query(sql);
      console.log(`✅ ${description} realizado com sucesso`);
    } catch (error) {
      console.error(`❌ Erro ao executar "${description}":`, error);
    }
  }

  client.release();
  process.exit(0);
}

seed();
