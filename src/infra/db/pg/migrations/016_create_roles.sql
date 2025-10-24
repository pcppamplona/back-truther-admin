CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT
);

-- Inserts iniciais
INSERT INTO roles (name, description) VALUES
('N1', 'Atendimento nível 1'),
('N2', 'Atendimento nível 2'),
('N3', 'Atendimento nível 3'),
('PRODUTO', 'Equipe de produto'),
('MKT', 'Equipe de marketing'),
('ADMIN', 'Administrador do sistema')
ON CONFLICT (name) DO NOTHING;
