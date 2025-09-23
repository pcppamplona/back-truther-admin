CREATE TYPE action_type AS ENUM ('security', 'listing', 'alter', 'crm');
CREATE TYPE system_type AS ENUM ('USER', 'GUENO', 'ADMIN', 'USER_CLIENT', 'CLIENT');

CREATE TABLE IF NOT EXISTS audit_logs (
  id SERIAL PRIMARY KEY,
  method TEXT NOT NULL,
  action action_type NOT NULL,
  message TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sender_type system_type NOT NULL,
  sender_id TEXT NOT NULL,
  target_type system_type NOT NULL,
  target_id TEXT NOT NULL,
  target_external_id TEXT
);