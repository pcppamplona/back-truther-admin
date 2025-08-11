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
        INSERT INTO users
          (uuid, name, username, password, active, created_at, updated_at, deleted_at, force_reset_pwd, type_auth, group_level)
        VALUES
          ('f72d57c6-4eef-4940-b215-d03d47efd429', 'Jonathan Santos', 'jonathan@smartpay.com.vc', crypt('1234567', gen_salt('bf')), false, '2024-11-08T22:39:16.988Z', '2024-12-20T00:35:14.905Z', NULL, false, 'ADMIN', 'N1'),
          ('1f17746c-894e-45d8-8042-df7799c7f25b', 'Caroline De Melo Cardoso', 'carol_cardoso@smartpay.com.vc', crypt('1234567', gen_salt('bf')), true, '2024-01-02T19:10:42.705Z', '2024-01-02T19:10:42.705Z', NULL, true, 'ADMIN', 'N2'),
          ('23a64a43-8b22-459f-b8bc-cff756dd72a2', 'Gustavo Lopes', 'gustavo_lopes@smartpay.com.vc', crypt('1234567', gen_salt('bf')), true, '2024-01-02T19:16:53.508Z', '2025-01-30T23:38:09.740Z', NULL, false, 'ADMIN', 'Produto'),
          ('f6963179-5917-4700-aa0c-4deaad28fba6', 'Gustavo Linhares', 'gustavo@digitalhorizon.sv', crypt('1234567', gen_salt('bf')), true, '2024-02-26T21:08:00.935Z', '2024-02-26T21:08:00.935Z', NULL, true, 'ADMIN', 'Admin')
      `
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
