CREATE TABLE IF NOT EXISTS permissions (
    id SERIAL PRIMARY KEY,
    key_name TEXT NOT NULL UNIQUE,
    description TEXT
);

-- Inserts iniciais
INSERT INTO permissions (key_name, description) VALUES
('tickets:create', 'Criar tickets'),
('tickets:read', 'Ler tickets'),
('tickets:update', 'Atualizar tickets'),
('tickets:delete', 'Excluir tickets'),
('tickets:assign', 'Atribuir ticket'),
('comments:create', 'Criar comentário'),
('users:read', 'Ler usuários'),
('users:update', 'Atualizar usuário'),
('admin:manage', 'Gerenciar sistema')
ON CONFLICT (key_name) DO NOTHING;
