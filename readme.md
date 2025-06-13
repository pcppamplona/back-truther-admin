# Arquitetura do Projeto (Boilerplate)

Este projeto segue alguns dos princípios de **Clean Architecture** adaptados para o ecossistema Node.js com TypeScript, visando **manutenibilidade, escalabilidade e isolamento de responsabilidades**.

A estrutura é dividida em camadas principais:

---

## src/

### `application/`

Contém a **lógica de orquestração do negócio**: é onde os **casos de uso (use cases)** são implementados. Essa camada coordena interações entre domínios, repositórios e serviços externos.

- `use-cases/`: cada use case representa uma ação atômica do negócio.
- `factories/`: função responsável por instanciar os use cases com suas dependências (D.I.P).

> 📌 Não conhece HTTP, banco ou lib externa.

---

### `domain/`

Responsável por declarar o **modelo de negócio puro**: entidades, contratos e repositórios.

- `user/model/`: interfaces como `User`, `CreateUser`.
- `user/repositories/`: interfaces dos repositórios, como `UsersRepository`.

> 📌 Sem lógica de infra, sem dependência de libs.

---

### `infra/`

Contém a **implementação técnica** das dependências do sistema: banco de dados, log, serviços externos, etc.

#### `db/pg/`

- `connection.ts`: setup manual do pool de conexão PostgreSQL.
- `migrate.ts`: scripts de migrations "on hands" (sem ORM).
- `migrations/`: scripts SQL ou TS para criação/alteração de tabelas.

#### `repositories/pg/`

- Implementações concretas dos repositórios (ex: `PgUsersRepository`), usando SQL puro.

#### `repositories/in-memory/`

- Repositórios simulados para testes ou ambiente de dev.

#### `schemas/`

- Schemas Zod usados internamente na infra (ex: parse de dados do banco), sem vazar para o domínio.

#### `adapters/`

- Integrações externas (ex: APIs como Celcoin, ou qualquer "external integration").

#### `env/`

- Validação do `.env` com `zod`.

#### `logger/`

- Setup e singleton de logger (`winston`, `pino`...).

#### `plugins/`

- Plugins Fastify (ex: JWT, Swagger, CORS, multipart, etc).

---

### `presentation/`

Contém os **pontos de entrada da aplicação** — pode ser REST, GraphQL, filas, WebSocket, CLI, etc.

#### `http/`

- `controllers/`: lógica que lida com as requisições e chama os use cases.
- `routes/`: organização por rota.
- `schemas/`: validação Zod das entradas/saídas HTTP (ex: `AuthenticateDTO`, `UserResponseDTO`).
- `middlewares/`, `interceptors/`, `cron/`, `server.ts`, `create-app.ts`: organização padrão da interface Fastify.

#### `broker/`

Organização de mensageria baseada em `Kafka`, `RabbitMQ`, etc.

- `consumers/`: handlers de mensagens recebidas (workers, event handlers).
- `producers/`: emissores de mensagens/eventos.
- `kafka/`, `rabbitmq/`: configuração e setup por tecnologia.

> 📌 Essa pasta define **interfaces de entrada/saída** assíncronas.

#### `graphql/` *(futuro uso)*

Preparado para futura interface GraphQL (resolvers, schemas, loaders).

#### `websocket/` *(futuro uso)*

Preparado para entrada em tempo real via socket.

---

### `validators/`

Contém funções e serviços genéricos de validação, como:

- `error-mapper-service.ts`: adapta erros para retorno HTTP.
- `validation-error-formatter.ts`: formatação de erros Zod/Fastify.

---

### `shared/`

Funções utilitárias puras e reutilizáveis (sem dependência de domínio ou infraestrutura):

- `utils.ts`: helpers genéricos (ex: `generateUUID`, `safeParse`, etc).

---

## 🎯 Padrões adotados

- **Responsabilidade única** por pasta
- **DTOs apenas em `presentation/schemas`**
- **Zod apenas nas bordas (entrada e saída)**
- **Use cases puros e testáveis**
- **Repositórios implementados manualmente com SQL**
- **Plugins, logger, env e adapters separados**

---

## 🧩 Estratégia de Tratamento Global de Erros

Este projeto **não utiliza `try/catch` manualmente** nos controllers ou use cases.  
Toda a tratativa de erros é feita de forma **centralizada via o `errorHandler` do Fastify**, mantendo a lógica de negócios limpa e separada de preocupações com resposta HTTP.

### ✅ Benefícios da abordagem

- **Clean code**: os use cases e controllers se concentram apenas na lógica principal.
- **Menos boilerplate**: sem repetição de `try/catch` em todos os endpoints.
- **Logging unificado**: todos os erros passam por uma camada comum de logging com contexto da requisição.
- **Padronização**: retorno consistente de mensagens e status codes para o cliente.

---

### 🧠 Implementação

O `errorHandler` verifica diferentes tipos de erro e responde adequadamente:

| Tipo de erro                      | Status | Ação                                                             |
|-----------------------------------|--------|------------------------------------------------------------------|
| `ZodError`                        | 400    | Validação de schema manual (ex: Zod em body/query)              |
| `FST_ERR_VALIDATION`             | 400    | Validação automática da rota via Fastify                        |
| Erros de autenticação do Swagger | 401    | Tratativa de header de auth ausente/mal formado                 |
| Erros conhecidos mapeados        | custom | Usando `ErrorMapperService` para definir status e mensagem      |
| Erros inesperados                | 500    | Resposta genérica com log completo                              |

---

## 🔐 Geração de Token JWT com RS256

Para gerar e validar tokens JWT com segurança, crie uma pasta `keys/` na raiz do projeto contendo:

- `private.pem`: chave privada RSA para assinar o token.
- `public.pem`: chave pública RSA para verificar a assinatura.

- Explicação da autenticação -> <https://docs.google.com/document/d/1S7xKoTjIrGW5gSe0NazAXE0g6wyEuKJ3cVw9BjR0vfs/edit?tab=t.0#heading=h.n53xlpft78h3>

---

## ✅ Exemplo de fluxo

1. **Requisição HTTP** → `controller` recebe e valida com `zod`
2. **Use Case é chamado** com dados tipados
3. **Use Case** usa repositório (`domain`) injetado via factory
4. **Repositório (`infra`)** executa SQL puro (via `pg`)
5. **Resposta** é convertida para DTO (`schemas/`) e retornada ao cliente

---

## 📌 Observações

- O projeto **não utiliza ORM**.
- Todas as queries são feitas **manualmente com `pg`** (SQL puro).
- Essa abordagem privilegia **controle total, performance e clareza**.

---

## 🚀 Pronto para escalar

Essa estrutura permite adicionar novos módulos (`auth/`, `wallet/`, `analytics/`) sem comprometer a clareza.

Basta replicar o padrão:

```bash
domain/
└── wallet/
application/
└── use-cases/
presentation/
└── http/routes/wallet.ts
