CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS reply_actions (
     id SERIAL PRIMARY KEY,
     reply_id INTEGER NOT NULL,
     action_type_id INTEGER NOT NULL,
     data_email VARCHAR,
     data_new_ticket_reason_id INTEGER,
     data_new_ticket_assign_role INTEGER,
     CONSTRAINT reply_actions_reply_id_fkey
         FOREIGN KEY (reply_id)
             REFERENCES reply_reasons (id)
             ON UPDATE NO ACTION
             ON DELETE CASCADE
);