# 📋 Task Manager API

> Uma API RESTful moderna e robusta para gerenciamento de tarefas, construída com as melhores práticas de desenvolvimento e arquitetura limpa! 🚀

## 📖 Índice

- [🎯 Sobre o Projeto](#-sobre-o-projeto)
- [🛠 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [🏗 Arquitetura e Organização](#-arquitetura-e-organização)
- [📁 Estrutura de Pastas](#-estrutura-de-pastas)
- [🚀 Instalação e Configuração](#-instalação-e-configuração)
- [🔧 Scripts Disponíveis](#-scripts-disponíveis)
- [📚 Documentação da API](#-documentação-da-api)
- [🧪 Testes](#-testes)
- [🎨 Boas Práticas](#-boas-práticas)
- [🐛 Debug e Monitoramento](#-debug-e-monitoramento)

## 🎯 Sobre o Projeto

A **Task Manager API** é uma aplicação backend moderna que permite gerenciar tarefas de forma eficiente. O projeto foi desenvolvido seguindo os princípios de **Clean Architecture**, **SOLID** e **Domain-Driven Design (DDD)**, garantindo:

- ✅ **Escalabilidade**: Arquitetura modular e bem organizada
- ✅ **Testabilidade**: Cobertura de testes abrangente
- ✅ **Maintibilidade**: Código limpo e bem documentado
- ✅ **Performance**: Otimizações e boas práticas aplicadas
- ✅ **Type Safety**: TypeScript em todo o projeto

## 🛠 Tecnologias Utilizadas

### 🚀 **Core Technologies**
- **[Node.js](https://nodejs.org/)** - Runtime JavaScript/TypeScript
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[Fastify](https://fastify.dev/)** - Framework web rápido e eficiente
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional robusto

### 🗃 **Database & ORM**
- **[Drizzle ORM](https://orm.drizzle.team/)** - ORM type-safe moderno
- **[Drizzle Kit](https://orm.drizzle.team/kit-docs/overview)** - Ferramentas CLI para migrations
- **[pg](https://node-postgres.com/)** - Driver PostgreSQL para Node.js

### � **Development Tools**
- **[Biome](https://biomejs.dev/)** - Linter e formatter ultra-rápido
- **[Vitest](https://vitest.dev/)** - Framework de testes moderno
- **[TSX](https://github.com/esbuild-kit/tsx)** - TypeScript executor para desenvolvimento
- **[TSUP](https://tsup.egoist.dev/)** - Build tool TypeScript zero-config

### 📖 **API Documentation**
- **[@fastify/swagger](https://github.com/fastify/fastify-swagger)** - Geração automática de documentação OpenAPI
- **[@scalar/fastify-api-reference](https://github.com/scalar/scalar)** - Interface moderna para documentação da API
- **[@fastify/cors](https://github.com/fastify/fastify-cors)** - Middleware CORS para Fastify

### 📝 **Validation & Types**
- **[Zod](https://zod.dev/)** - Schema validation com inferência de tipos
- **[fastify-type-provider-zod](https://github.com/turkerdev/fastify-type-provider-zod)** - Integração Fastify + Zod

### 🐳 **Infrastructure**
- **[Docker Compose](https://docs.docker.com/compose/)** - Orquestração de containers
- **[Bitnami PostgreSQL](https://hub.docker.com/r/bitnami/postgresql)** - Imagem PostgreSQL otimizada

### 🔑 **Utilities**
- **[UUIDv7](https://www.npmjs.com/package/uuidv7)** - Geração de IDs únicos e ordenáveis
- **[http-status-codes](https://www.npmjs.com/package/http-status-codes)** - Constantes HTTP status
- **[dotenv](https://www.npmjs.com/package/dotenv)** - Gerenciamento de variáveis de ambiente

## 🏗 Arquitetura e Organização

O projeto segue os princípios da **Clean Architecture** com uma abordagem hexagonal, promovendo:

### 🎯 **Camadas da Aplicação**

```
┌─────────────────────────────────────┐
│           🌐 HTTP Layer             │
│        (Routes & Controllers)       │
├─────────────────────────────────────┤
│          💼 Use Cases Layer         │
│      (Business Logic & Rules)       │
├─────────────────────────────────────┤
│         🏪 Repository Layer         │
│     (Data Access Abstraction)       │
├─────────────────────────────────────┤
│          💾 Database Layer          │
│        (PostgreSQL & Drizzle)       │
└─────────────────────────────────────┘
```

### 🔄 **Padrões Implementados**

- **🏭 Factory Pattern**: Criação de instâncias de use cases
- **🔌 Dependency Injection**: Inversão de dependências
- **📦 Repository Pattern**: Abstração do acesso a dados
- **🎯 Use Case Pattern**: Encapsulamento da lógica de negócio
- **🛡 Type Provider Pattern**: Validação e tipagem automática

## 📁 Estrutura de Pastas

```
📦 task-manager-api/
├── 📁 src/                          # Código fonte principal
│   ├── 📄 app.ts                    # Configuração do Fastify
│   ├── 📄 server.ts                 # Inicialização do servidor
│   ├── 📄 env.ts                    # Configuração de ambiente
│   │
│   ├── 📁 @types/                   # Definições de tipos TypeScript
│   │   └── 📁 domain/               # Types do domínio da aplicação
│   │
│   ├── 📁 db/                       # Configuração do banco de dados
│   │   ├── 📄 schema.ts             # Exportação dos schemas
│   │   ├── 📄 tasks-table.ts        # Schema da tabela tasks
│   │   ├── 📁 migrations/           # Arquivos de migração
│   │   └── 📁 seed/                 # Scripts de seed
│   │
│   ├── 📁 lib/                      # Bibliotecas e utilitários
│   │   └── 📄 drizzle.ts            # Configuração do Drizzle ORM
│   │
│   ├── 📁 repositories/             # Camada de acesso a dados
│   │   ├── 📁 drizzle/              # Implementação com Drizzle
│   │   ├── 📁 in-memory/            # Implementação em memória (testes)
│   │   └── 📁 interfaces/           # Contratos dos repositórios
│   │
│   ├── 📁 routes/                   # Rotas HTTP da aplicação
│   │   ├── 📁 health/               # Rotas de health check
│   │   │   └── 📁 check/            # GET /health/check
│   │   └── 📁 tasks/                # Rotas de tarefas
│   │       ├── 📁 create/           # POST /tasks
│   │       ├── 📁 list/             # GET /tasks
│   │       ├── 📁 load/             # GET /tasks/:id
│   │       ├── 📁 update/           # PUT /tasks/:id
│   │       ├── 📁 delete/           # DELETE /tasks/:id
│   │       └── 📁 complete/         # PATCH /tasks/:id
│   │
│   └── 📁 use-cases/                # Lógica de negócio
│       ├── 📁 errors/               # Erros customizados
│       ├── 📁 factory/              # Factory de use cases
│       └── 📁 tasks/                # Use cases de tarefas
│
├── 📁 coverage/                     # Relatórios de cobertura de testes
├── 📁 data/                         # Dados persistentes do PostgreSQL
├── 📄 docker-compose.yml            # Configuração do Docker
├── 📄 drizzle.config.ts             # Configuração do Drizzle Kit
├── 📄 package.json                  # Dependências e scripts
├── 📄 tsconfig.json                 # Configuração do TypeScript
├── 📄 vitest.config.ts              # Configuração do Vitest
├── 📄 vitest.setup.ts               # Setup dos testes
└── 📄 biome.json                    # Configuração do Biome
```

### 🎨 **Convenções de Nomenclatura**

Cada rota segue uma estrutura padronizada:
```
📁 route-name/
├── 📄 route-name.route.ts           # Implementação da rota
├── 📄 route-name.schemas.ts         # Schemas de validação (Zod)
├── 📄 route-name.types.ts           # Tipos TypeScript
└── 📄 index.ts                      # Exportação da rota
```

## 🚀 Instalação e Configuração

### 📋 **Pré-requisitos**

- **Node.js** ≥ 18.0.0
- **npm** ou **yarn** ou **pnpm**
- **Docker** e **Docker Compose** (para o banco de dados)

### 🔧 **Passo a Passo**

1. **Clone o repositório:**
```bash
git clone <repository-url>
cd task-manager-api
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure o ambiente:**
```bash
# Crie um arquivo .env baseado no .env.example
cp .env.example .env

# Exemplo de configuração:
# PORT=3000
# PERSISTENCE_TYPE=database
# DATABASE_URL=postgresql://postgres:postgres@localhost:5432/task_manager
```

4. **Inicie o ambiente completo (recomendado):**
```bash
# Sobe o banco, aplica migrações e popula com dados de exemplo
npm run environment:up
```

**OU configure manualmente:**

4a. **Inicie o banco de dados:**
```bash
# Sobe o PostgreSQL via Docker
docker-compose up -d
```

4b. **Execute as migrações:**
```bash
# Gera e aplica as migrações
npm run db:generate
npm run db:migrate
```

4c. **Popule com dados de exemplo (opcional):**
```bash
npm run db:seed
```

5. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

🎉 **Pronto!** A API estará rodando em `http://localhost:3000`

### 📖 **Acesse a documentação interativa:**
- **Scalar API Docs**: `http://localhost:3000/docs`

### 🔧 **Variáveis de Ambiente**

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Porta do servidor
PORT=3000

# Tipo de persistência: 'database' ou 'in-memory'
PERSISTENCE_TYPE=database

# URL de conexão com PostgreSQL
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/task_manager
```

**Tipos de Persistência:**
- `database`: Usa PostgreSQL com Drizzle ORM (recomendado para produção)
- `in-memory`: Usa repositório em memória (ideal para testes e desenvolvimento rápido)

### 🔍 **Verificação da Instalação**

Teste se tudo está funcionando:
```bash
curl http://localhost:3000/health/check
```

Resposta esperada:
```json
{
  "status": "ok"
}
```

### 🌱 **Dados de Exemplo**

O projeto inclui um sistema de seed que popula o banco com 20 tarefas de exemplo:
- 10 tarefas **não completadas** (IDs ímpares)
- 10 tarefas **completadas** (IDs pares)

Para popular o banco:
```bash
npm run db:seed
```

Exemplo de tarefa criada:
- **Título**: "Task #1", "Task #2", etc.
- **Descrição**: "Description Task #1", "Description Task #2", etc.
- **Status**: Alternado entre completo/incompleto

## 🔧 Scripts Disponíveis

### 🏃‍♂️ **Desenvolvimento**
```bash
npm run dev          # Inicia o servidor em modo desenvolvimento (watch)
npm run build        # Compila o projeto para produção (usando TSUP)
npm run start        # Inicia o servidor compilado
```

### 🗃 **Database**
```bash
npm run db:generate      # Gera migrações baseadas no schema
npm run db:migrate       # Aplica migrações pendentes
npm run db:studio        # Abre o Drizzle Studio (GUI do banco)
npm run db:seed          # Popula o banco com dados de exemplo
```

### 🐳 **Environment**
```bash
npm run environment:up   # Sobe ambiente completo (DB + migrations + seed)
npm run environment:down # Derruba o ambiente Docker
```

### 🧪 **Testes**
```bash
npm run test         # Executa todos os testes
npm run test:ui      # Interface gráfica dos testes
npm run test:watch   # Executa testes em modo watch
npm run test:coverage # Gera relatório de cobertura
```

### 🎨 **Qualidade de Código**
```bash
npm run lint         # Executa o linter
npm run lint:fix     # Corrige problemas de lint automaticamente
npm run format       # Verifica formatação
npm run format:fix   # Formata o código
npm run check        # Executa lint + format
npm run check:fix    # Corrige lint + format
```

## 📚 Documentação da API

### 🌐 **Base URL**
```
http://localhost:3000
```

### 📖 **Documentação Interativa**
- **Scalar API Reference**: `http://localhost:3000/docs`
- **Swagger JSON**: `http://localhost:3000/documentation/json`

A documentação é gerada automaticamente usando **OpenAPI 3.0** com schemas **Zod** integrados!

### 🏥 **Health Check**

#### `GET /health/check`
Verifica se a API está funcionando.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 📋 **Tasks Endpoints**

#### `GET /tasks`
Lista todas as tarefas com paginação e filtros opcionais.

**Query Parameters:**
- `title` (string, opcional): Filtro por título
- `description` (string, opcional): Filtro por descrição
- `page` (number, opcional): Página atual (padrão: 1)
- `itemsPerPage` (number, opcional): Items por página (padrão: 10)

**Response:**
```json
{
  "data": [
    {
      "id": "01HZ1234567890ABCDEFGHIJKL",
      "title": "Minha tarefa",
      "description": "Descrição da tarefa",
      "completedAt": null
    }
  ]
}
```

#### `POST /tasks`
Cria uma nova tarefa.

**Body:**
```json
{
  "title": "Nova tarefa",
  "description": "Descrição da nova tarefa"
}
```

**Response (201):**
```json
{
  "id": "01HZ1234567890ABCDEFGHIJKL",
  "title": "Nova tarefa",
  "description": "Descrição da nova tarefa",
  "completedAt": null
}
```

#### `GET /tasks/:id`
Busca uma tarefa específica pelo ID.

**Response (200):**
```json
{
  "id": "01HZ1234567890ABCDEFGHIJKL",
  "title": "Minha tarefa",
  "description": "Descrição da tarefa",
  "completedAt": null
}
```

**Response (404):**
```json
{
  "error": "Task not found"
}
```

#### `PUT /tasks/:id`
Atualiza uma tarefa existente.

**Body:**
```json
{
  "title": "Título atualizado",
  "description": "Descrição atualizada"
}
```

**Response (204):** *(No Content)*

#### `PATCH /tasks/:id`
Marca uma tarefa como completada.

**Response (204):** *(No Content)*

#### `DELETE /tasks/:id`
Remove uma tarefa.

**Response (200):**
```json
{
  "id": "01HZ1234567890ABCDEFGHIJKL",
  "title": "Tarefa removida",
  "description": "Descrição da tarefa removida",
  "completedAt": null
}
```

### 📊 **Códigos de Status HTTP**

- `200` - OK (sucesso)
- `201` - Created (recurso criado)
- `204` - No Content (sucesso sem conteúdo)
- `400` - Bad Request (dados inválidos)
- `404` - Not Found (recurso não encontrado)
- `422` - Unprocessable Entity (validação falhou)
- `500` - Internal Server Error (erro interno)

## 🧪 Testes

O projeto possui uma suite de testes abrangente usando **Vitest**:

### 🎯 **Tipos de Testes**

- **Unit Tests**: Testam componentes isolados
- **Integration Tests**: Testam a integração entre camadas
- **E2E Tests**: Testam fluxos completos da API

### 📊 **Cobertura de Testes**

```bash
npm run test:coverage
```

Os relatórios são gerados em `coverage/index.html` e podem ser visualizados no navegador.

### 🔧 **Configuração de Testes**

- **In-memory database**: Testes isolados sem dependência do PostgreSQL
- **Mock factories**: Criação de dados de teste consistentes
- **Setup automático**: Configuração automática do ambiente de teste (vitest.setup.ts)
- **Path mapping**: Suporte a imports absolutos com `@/` nos testes
- **Coverage exclusions**: Arquivos de configuração e interfaces excluídos da cobertura

### 🎨 **Boas Práticas**

### ✅ **Code Quality**

- **TypeScript Strict Mode**: Tipagem rigorosa em todo o projeto
- **Biome Linting**: Linter e formatter ultra-rápido (substitui ESLint + Prettier)
- **Conventional Commits**: Commits padronizados e semânticos
- **Path Mapping**: Imports absolutos com `@/` para melhor organização
- **Schema-First Design**: Validação de dados com schemas Zod tipados

### 🛡 **Security**

- **Input Validation**: Validação rigorosa com Zod e schemas tipados
- **SQL Injection Protection**: ORM type-safe (Drizzle) com queries preparadas
- **CORS Configuration**: Configuração adequada para diferentes ambientes
- **UUIDv7 Validation**: Validação específica de IDs usando UUIDv7
- **Error Handling**: Tratamento adequado de erros sem vazamento de informações

### 🚀 **Performance**

- **Connection Pooling**: Pool de conexões nativo do PostgreSQL
- **Query Optimization**: Queries otimizadas com Drizzle ORM
- **Pagination**: Paginação eficiente com LIMIT/OFFSET
- **UUIDv7**: IDs ordenáveis por timestamp para melhor performance de consultas
- **Fastify Framework**: Framework web de alta performance para Node.js
- **Build Optimization**: Build otimizado com TSUP para produção

### 📚 **Documentation**

- **OpenAPI 3.0**: Documentação automática gerada pelos schemas Zod
- **Scalar UI**: Interface moderna e interativa para testar a API
- **JSDoc Comments**: Comentários estruturados em pontos críticos
- **Type Definitions**: Tipos bem definidos e documentados
- **Schema Descriptions**: Descrições detalhadas em todos os campos da API
- **README Detalhado**: Documentação completa do projeto

## 🐛 Debug e Monitoramento

### 🔍 **Ferramentas de Debug**

1. **Drizzle Studio**: Interface visual do banco de dados
```bash
npm run db:studio
```

2. **Vitest UI**: Interface gráfica dos testes
```bash
npm run test:ui
```

3. **Scalar API Documentation**: Documentação interativa da API
```bash
# Acesse: http://localhost:3000/docs
```

4. **Logs Estruturados**: Sistema de logs do Fastify com queries SQL visíveis

### 📊 **Monitoramento**

- **Health Check Endpoint**: Verificação básica de saúde da API (`/health/check`)
- **Database Connection**: Verificação da conectividade com o banco via Drizzle
- **OpenAPI Documentation**: Documentação completa e testável da API
- **Query Logging**: Logs detalhados das queries SQL executadas
- **CORS Configuration**: Configuração flexível para desenvolvimento e produção

## 🚀 **Recursos Extras**

### 🎯 **Features Implementadas**

- ✅ **Documentação Interativa**: Interface Scalar para testar todos os endpoints
- ✅ **Dual Persistence**: Suporte a banco PostgreSQL e repositório em memória
- ✅ **Data Seeding**: Sistema automático de população do banco com dados de exemplo
- ✅ **Environment Scripts**: Scripts para gerenciar todo o ambiente de desenvolvimento
- ✅ **Comprehensive Testing**: Testes unitários para todos os use cases
- ✅ **Type Safety**: Validação completa com Zod e tipagem TypeScript
- ✅ **Modern Tooling**: Biome para linting/formatting, Vitest para testes
- ✅ **Production Ready**: Build otimizado com TSUP e configurações de produção

### 🎮 **Comandos Úteis**

```bash
# Setup completo do ambiente
npm run environment:up

# Testar a API rapidamente
curl http://localhost:3000/health/check

# Ver dados no banco
npm run db:studio

# Executar testes com interface
npm run test:ui

# Ver documentação interativa
# Abra: http://localhost:3000/docs
```

---

## 🤝 Contribuição

Contribuições são sempre bem-vindas! 

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'Add some amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

---

<div align="center">

**Feito com ❤️ e muito ☕ por desenvolvedores apaixonados por código limpo!**

🚀 **Happy Coding!** 🚀

</div>