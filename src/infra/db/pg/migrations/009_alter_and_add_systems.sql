ALTER TABLE systems
    ADD CONSTRAINT systems_name_unique UNIQUE (name);

INSERT INTO systems (name, description)
VALUES ('Admin', 'Sistema de Admin da Truther')
ON CONFLICT (name) DO NOTHING;