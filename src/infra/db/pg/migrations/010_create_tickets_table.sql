 CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS tickets (
  id SERIAL PRIMARY KEY,
  created_by INTEGER NOT NULL,
  client_id INTEGER,
  assigned_group TEXT,
  assigned_user INTEGER,
  reason_id INTEGER NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'PENDENTE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  finalizate_reply INTEGER
);