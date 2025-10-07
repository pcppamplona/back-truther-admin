CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS reply_reasons (
  id SERIAL PRIMARY KEY,
  reason_id INTEGER NOT NULL,
  reply VARCHAR(255) NOT NULL,
  comment BOOLEAN NOT NULL DEFAULT FALSE,
  CONSTRAINT reply_reasons_reason_id_fkey 
    FOREIGN KEY (reason_id) 
    REFERENCES ticket_reasons (id) 
    ON UPDATE NO ACTION 
    ON DELETE CASCADE
);
