CREATE TABLE IF NOT EXISTS user_permissions (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    permission_id INT NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    UNIQUE (user_id, permission_id)
);

INSERT INTO user_permissions (user_id, permission_id) VALUES
(1, 3),
(2, 4),
(3, 5),
(3, 6)
ON CONFLICT (user_id, permission_id) DO NOTHING;
