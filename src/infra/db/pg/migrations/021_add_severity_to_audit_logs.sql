CREATE TYPE severity_type AS ENUM ('low', 'medium', 'high');

ALTER TABLE audit_logs 
  ADD COLUMN IF NOT EXISTS severity severity_type NOT NULL DEFAULT 'low';

ALTER TYPE action_type ADD VALUE IF NOT EXISTS 'export';
