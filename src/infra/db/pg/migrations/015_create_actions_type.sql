CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS actions_type (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  description_action VARCHAR(255) NOT NULL
);

ALTER TABLE IF EXISTS reply_actions
  ADD CONSTRAINT reply_actions_action_type_id_fkey
    FOREIGN KEY (action_type_id)
    REFERENCES actions_type (id)
    ON UPDATE NO ACTION
    ON DELETE CASCADE;