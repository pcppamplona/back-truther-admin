CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    group_id INTEGER NOT NULL REFERENCES groups(id),
    title TEXT NOT NULL,
    description TEXT
);