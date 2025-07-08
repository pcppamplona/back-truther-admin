
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  document TEXT,
  id_truther TEXT
);

-- Tabela de grupos com herança hierárquica
CREATE TABLE groups (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  parent_id INTEGER REFERENCES groups(id) ON DELETE SET NULL
);

-- Relação entre usuários e grupos (inclui grupo primário)
CREATE TABLE user_groups (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  group_id INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT false
);

-- Tabela de itens
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

-- Relação entre itens e grupos (visibilidade)
CREATE TABLE item_groups (
  item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  group_id INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  PRIMARY KEY (item_id, group_id)
);
