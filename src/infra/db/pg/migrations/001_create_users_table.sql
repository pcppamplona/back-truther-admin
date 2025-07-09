CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- CREATE TABLE IF NOT EXISTS users (
--   id SERIAL PRIMARY KEY,
--   name TEXT NOT NULL,
--   password_hash TEXT NOT NULL,
--   created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
-- );

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid() NOT NULL,
  name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ,
  force_reset_pwd BOOLEAN DEFAULT false NOT NULL,
  type_auth TEXT DEFAULT 'local' NOT NULL
);