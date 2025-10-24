import { PostgresDatabase } from '@/infra/db/pg/connection'
import { env } from '@/infra/env'

async function seed() {
  await PostgresDatabase.connect(env.DATABASE_URL)
  const client = await PostgresDatabase.getClient()

  const queries = [
    {
      description: 'Inserindo grupos',
      sql: `
        INSERT INTO groups (id, group_name, id_pai) VALUES
            (1, 'N2', 4),
            (2, 'N1', 1),
            (3, 'Produto', 2),
            (4, 'Admin', NULL)
      `,
    },
    {
      description: 'Inserindo usuários',
      sql: `
        INSERT INTO users
          (uuid, name, username, password, active, created_at, updated_at, deleted_at, force_reset_pwd, type_auth, role_id)
        VALUES
          ('f72d57c6-4eef-4940-b215-d03d47efd429', 'Jonathan Santos', 'jonathan@smartpay.com.vc', crypt('1234567', gen_salt('bf')), false, '2024-11-08T22:39:16.988Z', '2024-12-20T00:35:14.905Z', NULL, false, 'ADMIN', 1),
          ('1f17746c-894e-45d8-8042-df7799c7f25b', 'Caroline De Melo Cardoso', 'carol_cardoso@smartpay.com.vc', crypt('1234567', gen_salt('bf')), true, '2024-01-02T19:10:42.705Z', '2024-01-02T19:10:42.705Z', NULL, true, 'ADMIN', 2),
          ('23a64a43-8b22-459f-b8bc-cff756dd72a2', 'Gustavo Lopes', 'gustavo_lopes@smartpay.com.vc', crypt('1234567', gen_salt('bf')), true, '2024-01-02T19:16:53.508Z', '2025-01-30T23:38:09.740Z', NULL, false, 'ADMIN', 3),
          ('f6963179-5917-4700-aa0c-4deaad28fba6', 'Gustavo Linhares', 'gustavo@digitalhorizon.sv', crypt('1234567', gen_salt('bf')), true, '2024-02-26T21:08:00.935Z', '2024-02-26T21:08:00.935Z', NULL, true, 'ADMIN', 6'Admin')
      `
    },
    {
      description: 'Inserindo items',
      sql: `
        INSERT INTO items (group_id, title, description) VALUES
          (1, 'Item 1', 'Description 1'),
          (1, 'Item 2', 'Description 2'),
          (2, 'Item 3', 'Description 3'),
          (2, 'Item 4', 'Description 4'),
          (3, 'Item 5', 'Description 5'),
          (3, 'Item 6', 'Description 6'),
          (4, 'Item 7', 'Description 7'),
          (4, 'Item 8', 'Description 8'),
          (2, 'Item 9', 'Description 9'),
          (1, 'Item 10', 'Description 10')
      `,
    },
    {
      description: 'Inserindo user-groups',
      sql: `
       INSERT INTO user_groups (user_id, group_id, is_main) VALUES
        (1, 1, FALSE),
        (1, 2, TRUE),
        (2, 2, TRUE),
        (3, 1, FALSE)
      `,
    },
    {
      description: "Inserindo userinfo",
      sql: `
        INSERT INTO userinfo (
          id, user_id, name, document, document_type, email, phone, nationality, cep, city, state, neighborhood, street, location, flags, created_at, updated_at, house_number, mothers_name, birthday, active, uuid
        ) VALUES
          ('6750', 17482, 'Claudine Thais Moreira Da Fonseca', '33531523856', 'cpf', 'thais.moreh@gmail.com', '48999271397', 'BR', '88058210', 'Florianopolis', 'Sc', 'Centro', 'Travessa Dos Lambaris', '-27.4413733 / -48.4093517', NULL, '2025-05-26T19:05:54.941Z', '2025-05-26T19:05:54.941Z', '77', 'Maria da Conceição Costa Gonçalves', '1985-01-30', 'ACTIVE', '5e452ba7-3dcf-424e-8eec-ef10cd380683'),
          ('6749', 17483, 'Matheus Aurelius Da Silva', '53327376883', 'cpf', 'zika.nem@gmail.com', '11937123456', 'BR', '08180250', 'Sao Paulo', 'Sp', 'Centro', 'Rua Arvore De Neve', '-23.49057656961775 / -46.4124775256075', NULL, '2025-05-26T18:59:27.710Z', '2025-05-26T18:59:27.710Z', '310', 'maria socorro ferreira da silva', '1999-12-19', 'ACTIVE', '8cb55029-4043-4d7c-80fa-1e1ccaedde00'),
          ('6748', 17481, 'Marcos Vinicius Leite Da Silva', '10152803742', 'cpf', 'marcos.kichort@gmail.com', '21971524446', 'BR', '21930010', 'Rio De Janeiro', 'Rj', 'Centro', 'Praia Do Jequia', '-22.871965982976853 / -43.239382454813985', NULL, '2025-05-26T18:53:18.290Z', '2025-05-26T18:53:18.290Z', '102', 'maria nazareth leite da rocha', '1991-09-14', 'ACTIVE', 'c05952d4-26d6-4399-8d02-e7a35a0fd164'),
          ('6747', 17480, 'Cleber Frutuoso Pereira Da Silva', '79490530115', 'cpf', 'prone.sis@hotmail.com', '31993941853', 'BR', '35412000', 'Ouro Preto', 'Mg', 'Centro', 'Alameda Marilia De Dirceu Condominio Paragem Do Tripui ', '-20.349226905983265 / -43.668692596297404', NULL, '2025-05-26T18:38:05.424Z', '2025-05-26T18:38:05.424Z', '270', 'Divina Frutuoso da Silva', '1975-06-27', 'ACTIVE', '397c10b1-6260-4576-8464-4a8da60f7e35'),
          ('6746', 17479, 'Yuri Dos Santos De Siqueira', '35961334830', 'cpf', 'yuriih.boyln@hotmail.com', '12974012734', 'BR', '11669470', 'Caraguatatuba', 'Sp', 'Centro', 'Rua Jose Geraldo Fernandes Da Silva Filho', '-23.7122043979532 / -45.441427196808455', NULL, '2025-05-26T17:53:49.029Z', '2025-05-26T17:53:49.029Z', '380', 'Cristiane aparecida dos santos', '1996-07-16', 'ACTIVE', 'af35dc74-5982-40d7-b016-35df421e9b2d'),
          ('6745', 17477, 'Ralder Willian Teixeira', '07651590902', 'cpf', 'ralderwillian3377@outlook.com', '11962079261', 'BR', '01507000', 'Sao Paulo', 'Sp', 'Centro', 'Rua Barao De Iguape', '-23.6537576 / -46.7033868', NULL, '2025-05-26T17:43:55.634Z', '2025-05-26T17:43:55.634Z', '310', 'maria aparecida teixeira', '1989-03-14', 'ACTIVE', 'd2437e99-639f-4990-9017-b270398460b3'),
          ('6744', 17466, 'Ademilton Do Amparo Sousa', '04050450500', 'cpf', 'dedelgatinho75983685090@gmail.com', '75983685090', 'BR', '45400000', 'Valenca', 'Ba', 'Centro', 'Rua Gentil Paraiso Martin', '-13.3817082 / -39.0642581', NULL, '2025-05-26T15:30:07.604Z', '2025-05-26T15:30:07.604Z', '285', 'Maria José de Jesus do Amparo', '1983-10-23', 'ACTIVE', 'ba47e551-eacc-49a2-86ce-5ea7893185e6'),
          ('6743', 17473, 'Celso Ribeiro Da Silva', '70455724172', 'cpf', 'celsoribeirosilva@hotmail.com', '62982242828', 'BR', '74340270', 'Goiania', 'Go', 'Centro', 'Rua Cora Coralina', '-16.723412271749975 / -49.30884426433532', NULL, '2025-05-26T14:24:58.300Z', '2025-05-26T14:24:58.300Z', '0001', 'cleusa helena alves da silva', '1978-01-03', 'ACTIVE', '334b62ae-c971-4376-bec3-114f1d476f60'),
          ('6742', 17471, 'Paulo Henrique Candido Barbosa', '01453042130', 'cpf', 'paulohenriquecbarbosa@gmail.com', '62992297025', 'BR', '74810908', 'Goiania', 'Go', 'Centro', 'Avenida E', '-16.702020115084263 / -49.242015983632925', NULL, '2025-05-26T13:06:15.323Z', '2025-05-26T13:06:15.323Z', '1000', 'daniela siqueira barbosa', '1992-05-04', 'ACTIVE', 'aa43c0e6-924d-4f3d-b031-dd949c524274'),
          ('6741', 17470, 'Ivanilson Junio Soares Gomes', '08120267214', 'cpf', 'jrsoarez4@gmail.com', '92993181821', 'BR', '69035190', 'Manaus', 'Am', 'Centro', 'Rua Jose Vieira', '-3.0813299748874083 / -60.05372394411386', NULL, '2025-05-26T12:56:42.491Z', '2025-05-26T12:56:42.491Z', '343', 'franciane fernandes soares', '2005-07-25', 'ACTIVE', '99b2a79c-bc52-4b38-b7a4-bcbb1fc1efff'),
          ('6740', 17469, 'Felipe Massami Goncalves Yamauchi', '02929760117', 'cpf', 'aapplemi@gmail.com', '67982030471', 'BR', '79008800', 'Campo Grande', 'Ms', 'Centro', 'Rua Quatorze De Julho', '-20.4335972 / -54.6173302', NULL, '2025-05-26T06:53:29.968Z', '2025-05-26T06:53:29.968Z', '5147', 'Ana Maria Gonçalves', '1987-04-08', 'ACTIVE', '40c0af8c-7d99-4109-accd-90167282e919'),
          ('6739', 17464, 'Gabriel Rocha Rostin', '52282095812', 'cpf', 'gabrielrocha_rostin1@outlook.com', '17996171510', 'BR', '15775000', 'Santa Fe Do Sul', 'Sp', 'Centro', 'Alameda Das Amoreiras', '-19.701255989794323 / -51.16070798794732', NULL, '2025-05-25T19:49:52.286Z', '2025-05-25T19:49:52.286Z', '101', 'viviane dos santos rocha', '2003-01-16', 'ACTIVE', '43f79b1d-5cfb-47f3-aa4d-6c7949a4129b'),
          ('6738', 17463, 'Noel Rocha Morais', '34129897896', 'cpf', 'noelrocha@gmail.com', '11976432882', 'BR', '04567003', 'Sao Paulo', 'Sp', 'Centro', 'Rua Arizona', '-23.61196376917639 / -46.69167432183854', NULL, '2025-05-25T18:30:21.486Z', '2025-05-25T18:30:21.486Z', '1051', 'Conceicao Aparecida dos Santos Freitas', '1986-01-05', 'ACTIVE', '1785c487-206e-4c14-bdc1-a2b398379dfc'),
          ('6737', 6567, 'Hugo Leonardo Marinho Pinto', '62724819349', 'cpf', 'hugopintoinvest@gmail.com', '98981546677', 'BR', '65075390', 'Sao Luis', 'Ma', 'Centro', 'Rua Das Siriemas', '-2.5067988655116706 / -44.300778995642204', NULL, '2025-05-25T13:34:43.258Z', '2025-05-25T13:34:43.258Z', '16', 'Rita cassia m pinto', '1987-08-20', 'ACTIVE', 'a66feac2-f2e0-4476-8878-524abfff8dc5'),
          ('6736', 17458, 'Flavia Karoliny Gomes Pereira Romagna', '01001250184', 'cpf', 'flaviaromagna@gmail.com', '69999789781', 'BR', '31330294', 'Belo Horizonte', 'Mg', 'Centro', 'Rua Radialista Ubaldo Ferreira', '-19.877337320598347 / -43.99357043256915', NULL, '2025-05-25T13:15:08.098Z', '2025-05-25T13:15:08.098Z', '17', 'Nilva Gomes Pereira', '1986-01-20', 'ACTIVE', '264cb987-6401-4dcd-8270-35fcd1990e40'),
          ('6735', 17457, 'Cristiano Da Silva De Sousa', '05772703382', 'national_identity_card', 'f131101aa@gmail.com', '66999831344', 'BR', '78888000', 'Nova Ubirata', 'Mt', 'Jv', 'Rua Das Papoulas', '-13.017188129836061 / -55.265774301104905', NULL, '2025-05-25T12:50:52.201Z', '2025-05-25T12:50:52.201Z', '828', 'Francisca Patricia Oliveira da Silva', '2006-10-04', 'ACTIVE', 'd793b332-2002-4f7a-bba1-fb5ead999171'),
          ('6734', 11418, 'Christopher Silva Condack', '12871018790', 'cpf', 'chrisedai@hotmail.com', '22992237642', 'BR', '28620000', 'Nova Friburgo', 'Rj', 'Centro', 'Avenida Julio Antonio Thurler', '-22.2759884 / -42.6014396', NULL, '2025-05-25T12:40:10.750Z', '2025-05-25T12:40:10.750Z', '62', 'Margareth de Fátima silva condack', '1988-05-30', 'ACTIVE', '95530842-f0bd-4724-bdaa-8ac9b68ce40a'),
          ('6733', 17456, 'Danilo Soares De Sousa', '42185559826', 'cpf', 'danilo.damy@outlook.com', '11956658064', 'BR', '37705612', 'Pocos De Caldas', 'Mg', 'Centro', 'Rua Lucia Saccoman Junqueira', '52.6657647 / -2.4658195', NULL, '2025-05-25T02:56:15.193Z', '2025-05-25T02:56:15.193Z', '92', 'Angela Soares da silva sousa', '1993-03-09', 'ACTIVE', 'a47664dd-4606-43d7-ac77-18b17621a2ce'),
          ('6732', 17454, 'Ronald Luiz Soares', '07487008703', 'cpf', 'ronaldlsoares@gmail.com', '48996772815', 'BR', '88113827', 'Sao Jose', 'Sc', 'Centro', 'Avenida Jaime Estefano Becker', '-27.5572825 / -48.6369728', NULL, '2025-05-25T01:51:08.892Z', '2025-05-25T01:51:08.892Z', '561', 'Marcia da Silva Sergio Soares', '1977-10-24', 'ACTIVE', '7ab9cced-8a07-4bc8-8367-c5e3b6e6570b'),
          ('6731', 17452, 'Vanusia Ribeiro Castelo Branco', '95649980349', 'cpf', 'profsurv10@gmail.com', '85998127853', 'BR', '60110540', 'Fortaleza', 'Ce', 'Centro', 'Rua Henrique Rabelo', '-3.74191 / -38.5216441', NULL, '2025-05-24T22:00:34.509Z', '2025-05-24T22:00:34.509Z', '1269', 'Maria José Ribeiro Castelo branco', '1984-01-01', 'ACTIVE', '4f4b1f7f-730a-448c-a76e-769df637f6e4')
      `
    },
    {
      description: "Inserindo clients",
      sql: `
        INSERT INTO clients (
          id, name, role, is_verified, can_transact, status, fee_level_id, created_at, updated_at, flags, expo_id, kyc_approved, kyc_risk, banking_enable, disinterest, register_txid, called_attempts_guenno, stage_kyc, comment_kyc, provider_kyc, attempts_kyc, password, ip_create, error, restrict, override_instant_pay, uuid, last_login, last_ip_login, retry_kyc, regenerate_kyc, master_instant_pay
        ) VALUES
          (17484, NULL, 'MOBILE_USER', FALSE, FALSE, 'NEW', 2, '2025-05-26T19:30:06.298Z', '2025-05-26T19:30:06.298Z', NULL, NULL, FALSE, 'NORISK', FALSE, FALSE, NULL, 0, 0, NULL, 'GUENO', 0, NULL, '2804:214:85eb:2f7e:5a:e269:97dc:89c7', '{}', FALSE, FALSE, '2fe5fbc6-3b43-4463-90e5-e0c65334011c', NULL, NULL, 0, FALSE, FALSE),
          (17483, 'Matheus Aurelius Da Silva', 'MOBILE_USER', FALSE, FALSE, 'NEW', 2, '2025-05-26T18:54:18.391Z', '2025-05-26T19:10:01.971Z', '"CP"', NULL, TRUE, 'NORISK', TRUE, FALSE, '', 0, 2, 'Kyc automatically approved.', 'CELCOIN', 1, '$2b$10$z/alSEyiDP/cbauGlesM6OPmkLqq5jkBZuZnM9w9kyyeIDNDmmpmW', '2804:18:8c8:955e:b98f:80d:16c0:1275', '{}', FALSE, FALSE, '17eda864-3e16-4220-8401-af5af84aea37', NULL, NULL, 0, FALSE, FALSE),
          (17482, 'Claudine Thais Moreira Da Fonseca', 'MOBILE_USER', FALSE, FALSE, 'NEW', 2, '2025-05-26T18:51:07.721Z', '2025-05-26T19:40:02.358Z', '"CP"', NULL, TRUE, 'NORISK', TRUE, FALSE, '', 0, 2, 'Kyc automatically approved.', 'CELCOIN', 1, '$2b$10$C5bAZdT21pQ.gmtw3BpE7eWNE1BXAxWy4fcIjGL9LxqFQgBlUq05q', '2804:214:85ff:f507:1:0:13:6f46', '{}', FALSE, FALSE, '303a4dc6-0ea7-46c1-87ae-1b0f92fec6f5', NULL, NULL, 0, FALSE, FALSE),
          (17481, 'Marcos Vinicius Leite Da Silva', 'MOBILE_USER', FALSE, FALSE, 'NEW', 2, '2025-05-26T18:45:44.915Z', '2025-05-26T19:00:02.694Z', '"CP"', NULL, TRUE, 'NORISK', TRUE, FALSE, '', 0, 2, 'Kyc automatically approved.', 'CELCOIN', 1, '$2b$10$fDeiZi1Vn05H/lIpgSOCTeXkHdDDKtPCfr8fzWqk/8I6OO/DxoZG6', '149.102.233.215', '{}', FALSE, FALSE, 'ead04a9e-92f5-4767-953b-3c43611e557e', NULL, NULL, 0, FALSE, FALSE),
          (17480, 'Cleber Frutuoso Pereira Da Silva', 'MOBILE_USER', FALSE, FALSE, 'NEW', 2, '2025-05-26T18:31:15.198Z', '2025-05-26T19:50:01.991Z', '"CP"', NULL, TRUE, 'NORISK', TRUE, FALSE, '', 0, 2, 'Kyc automatically approved.', 'CELCOIN', 1, '$2b$10$ISK/ptHJiwzR3ih97YBOIuSpA.koQEl4/zYTLdGvPyK75ykwlgwzS', '2804:214:8186:bce8:e9f3:e892:ca50:b5fe', '{}', FALSE, FALSE, 'b74f4981-f715-4e6c-8991-bc9e407766d3', NULL, NULL, 0, FALSE, FALSE),
          (17479, 'Yuri Dos Santos De Siqueira', 'MOBILE_USER', FALSE, FALSE, 'NEW', 2, '2025-05-26T17:49:56.126Z', '2025-05-26T17:55:01.522Z', '"CP"', NULL, FALSE, 'NORISK', FALSE, FALSE, '', 0, 1, '', 'CELCOIN', 1, '$2b$10$lmyh2woP9PTJu8RNpMS5keECD7jEskcJmzTwYgXoym9oqYZW2m1k6', '2804:14d:7e2f:81bd:c8db:6276:83eb:ac91', '{}', FALSE, FALSE, '6871faad-a873-4725-8a78-d253e3890513', NULL, NULL, 0, FALSE, FALSE),
          (17478, NULL, 'MOBILE_USER', FALSE, FALSE, 'NEW', 2, '2025-05-26T17:42:01.746Z', '2025-05-26T17:42:01.746Z', NULL, NULL, FALSE, 'NORISK', FALSE, FALSE, NULL, 0, 0, NULL, 'GUENO', 0, NULL, '2804:214:8639:5811:1:0:fefb:be35', '{}', FALSE, FALSE, '175628f9-ed7d-41e8-9118-fa289d42477d', NULL, NULL, 0, FALSE, FALSE),
          (17477, 'Ralder Willian Teixeira', 'MOBILE_USER', FALSE, FALSE, 'NEW', 2, '2025-05-26T17:38:27.016Z', '2025-05-26T17:45:01.713Z', '"CP"', NULL, FALSE, 'NORISK', FALSE, FALSE, '', 0, 1, '', 'CELCOIN', 1, '$2b$10$gBrhm0lVFYwEVlehYuuDcOEv69J2IulWW.57jS6phR8AwID3MPPLy', '2804:214:82a1:6820:1:2:e13e:1fcf', '{}', FALSE, FALSE, '76847f31-64a6-43f0-8b4b-ca08c43e580d', NULL, NULL, 0, FALSE, FALSE),
          (17476, NULL, 'MOBILE_USER', FALSE, FALSE, 'NEW', 2, '2025-05-26T15:37:14.605Z', '2025-05-26T15:40:59.867Z', NULL, NULL, FALSE, 'NORISK', FALSE, FALSE, NULL, 0, 0, NULL, 'GUENO', 0, '$2b$10$ddH2YXY1/bJjPhDGNM6tPOjb6wbDfD0ycK16VCZ6PbCaEf67LvtGm', '2804:14c:65a1:80ad:3ec4:2499:ad8c:c3de', '{}', FALSE, FALSE, '41110b02-ef33-4a0b-b62f-4d61f97cb72a', NULL, NULL, 0, FALSE, FALSE),
          (17475, NULL, 'MOBILE_USER', FALSE, FALSE, 'NEW', 2, '2025-05-26T14:12:46.264Z', '2025-05-26T14:16:57.496Z', NULL, NULL, FALSE, 'NORISK', FALSE, FALSE, NULL, 0, 0, NULL, 'GUENO', 0, '$2b$10$1WrbnI84UtUGm3cwv8iVV.pjXRQdoooNFLNvshDZGf.lZDnZw2Sym', '177.12.17.173', '{}', FALSE, FALSE, '90014566-abfc-40f5-87ed-68651c96219a', NULL, NULL, 0, FALSE, FALSE),
          (17474, NULL, 'MOBILE_USER', FALSE, FALSE, 'NEW', 2, '2025-05-26T13:55:32.843Z', '2025-05-26T14:08:49.364Z', NULL, NULL, FALSE, 'NORISK', FALSE, FALSE, NULL, 0, 0, NULL, 'GUENO', 0, '$2b$10$o4OFUoqwOfBQWs0ixWWDRu55s1u5XtZKIYEKcvT1Fct4dqO/fBKOO', '2804:6a38:1a06:df00:b164:d9f6:7ffe:8473', '{}', FALSE, FALSE, '5fde5167-3625-474a-9a66-b138a9881f96', NULL, NULL, 0, FALSE, FALSE),
          (17473, 'Celso Ribeiro Da Silva', 'MOBILE_USER', FALSE, FALSE, 'NEW', 2, '2025-05-26T13:31:08.116Z', '2025-05-26T14:40:02.082Z', '"CP"', NULL, TRUE, 'NORISK', TRUE, FALSE, '', 0, 2, 'Kyc automatically approved.', 'CELCOIN', 1, '$2b$10$7QaaFpGq81aNB/GGaSOHNOwgdJzhphnAsozWijpQeHAB1qGNT9dYS', '2804:14c:bb8c:523b:a148:d449:946a:889a', '{}', FALSE, FALSE, 'a2a06b99-9d1c-4b2f-b83a-fb3b6e12bc0c', NULL, NULL, 0, FALSE, FALSE),
          (17472, NULL, 'MOBILE_USER', FALSE, FALSE, 'NEW', 2, '2025-05-26T13:30:16.195Z', '2025-05-26T13:30:16.195Z', NULL, NULL, FALSE, 'NORISK', FALSE, FALSE, NULL, 0, 0, NULL, 'GUENO', 0, NULL, '2804:7f0:b800:db58:55cf:d38b:2e34:8937', '{}', FALSE, FALSE, '30ec2fed-c0bd-4752-921c-0d702a07628a', NULL, NULL, 0, FALSE, FALSE),
          (17471, 'Paulo Henrique Candido Barbosa', 'MOBILE_USER', FALSE, FALSE, 'NEW', 2, '2025-05-26T13:00:05.779Z', '2025-05-26T13:20:02.061Z', '"CP"', NULL, TRUE, 'NORISK', TRUE, FALSE, '', 0, 2, 'Kyc automatically approved.', 'CELCOIN', 1, '$2b$10$pjE9eoBPm47sZ1VgCcDUOejCRpIR93HLjdrMP7TTLT28UQk84WtgC', '2804:3d90:802e:e601:843f:5cf4:52e8:6c90', '{}', FALSE, FALSE, '938e0697-ed1a-4d36-a365-228eae4d3112', NULL, NULL, 0, FALSE, FALSE),
          (17470, 'Ivanilson Junio Soares Gomes', 'MOBILE_USER', FALSE, FALSE, 'NEW', 2, '2025-05-26T12:52:17.628Z', '2025-05-26T12:58:01.405Z', '"CP"', NULL, FALSE, 'NORISK', FALSE, FALSE, '', 0, 1, '', 'CELCOIN', 1, '$2b$10$BQR20n9XXb7tvHN37RAyF.ZS3ydWA7Qcv48JHRjA5WVgbu8WjCIn.', '2804:14d:1481:9135:a8cb:7c7e:941f:3820', '{}', FALSE, FALSE, '9e3742c5-7a9b-4eba-84df-380125f86ba9', NULL, NULL, 0, FALSE, FALSE),
          (17469, 'Felipe Massami Goncalves Yamauchi', 'MOBILE_USER', FALSE, FALSE, 'NEW', 2, '2025-05-26T06:48:04.396Z', '2025-05-26T06:55:01.514Z', '"CP"', NULL, FALSE, 'NORISK', FALSE, FALSE, '', 0, 1, '', 'CELCOIN', 1, '$2b$10$tJbGjXehRFbRkVs6wxyS5eh4g3ABlPX1l3H.dv1wIR4yVz4IznxD2', '2804:ebc:9043:100:e519:5f6e:c63d:4674', '{}', FALSE, FALSE, '081629e3-0a7a-4067-b7de-9dc92545fa57', NULL, NULL, 0, FALSE, FALSE),
          (17468, NULL, 'MOBILE_USER', FALSE, FALSE, 'NEW', 2, '2025-05-26T01:54:09.591Z', '2025-05-26T01:56:59.009Z', NULL, NULL, FALSE, 'NORISK', FALSE, FALSE, NULL, 0, 0, NULL, 'GUENO', 0, '$2b$10$1NvbHmPR0w/dOMd0fH2/M.kZTuy4aI4InG./2pZrsWdrqt77470hi', '2804:14d:5cef:b45e:95f8:e73d:713c:88', '{}', FALSE, FALSE, 'cf85177c-0996-4758-aa6a-cf66c4cd8fe8', NULL, NULL, 0, FALSE, FALSE),
          (17467, NULL, 'MOBILE_USER', FALSE, FALSE, 'NEW', 2, '2025-05-26T01:34:56.010Z', '2025-05-26T01:34:56.010Z', NULL, NULL, FALSE, 'NORISK', FALSE, FALSE, NULL, 0, 0, NULL, 'GUENO', 0, NULL, '2804:14d:bac2:8711:55f5:8b2:6ac7:f226', '{}', FALSE, FALSE, 'bae2aa60-65ca-4d5d-b40d-f7bedef5c039', NULL, NULL, 0, FALSE, FALSE),
          (17466, 'Ademilton Do Amparo Sousa', 'MOBILE_USER', FALSE, FALSE, 'NEW', 2, '2025-05-26T01:15:09.460Z', '2025-05-26T15:50:01.970Z', '"CP"', NULL, TRUE, 'NORISK', TRUE, FALSE, '', 0, 2, 'Kyc automatically approved.', 'CELCOIN', 1, '$2b$10$amX.YjytYaPWjxVHcXQxF.bKfZASwy4VQz1HBC635yYvLaXkxM/qS', '2804:2f4c:1000:544:29dc:171:c5f6:3ffa', '{}', FALSE, FALSE, '5b047ff1-aa04-4735-aead-cff32dc3544d', NULL, NULL, 0, FALSE, FALSE);
      `
    }
  ]

  for (const { sql, description } of queries) {
    try {
      await client.query(sql)
      console.log(`✅ ${description} realizado com sucesso`)
    } catch (error) {
      console.error(`❌ Erro ao executar "${description}":`, error)
    }
  }

  client.release()
  process.exit(0)
}

seed()
