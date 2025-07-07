CREATE TYPE group_level AS ENUM ('N1', 'N2', 'N3', 'PRODUTO', 'MKT', 'ADMIN');

CREATE TABLE authentication (
    id SERIAL PRIMARY KEY,
    uuid UUID NOT NULL UNIQUE,
    name TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ DEFAULT NULL,
    force_reset_pwd BOOLEAN NOT NULL DEFAULT FALSE,
    type_auth TEXT NOT NULL,
    group_level group_level NOT NULL
);

CREATE INDEX idx_authentication_username ON authentication(username);
