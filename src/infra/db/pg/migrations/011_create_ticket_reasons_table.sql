CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS ticket_reasons (
  id SERIAL PRIMARY KEY,
  category_id VARCHAR(50) NOT NULL,
  type VARCHAR(100) NOT NULL,
  reason VARCHAR(255) NOT NULL,
  expired_at INTEGER NOT NULL,
  description TEXT NOT NULL,
  type_recipient VARCHAR(10) NOT NULL,
  recipient VARCHAR(50) NOT NULL,
  CONSTRAINT ticket_reasons_type_recipient_check 
    CHECK (type_recipient IN ('GROUP', 'USER', 'ALL'))
);
