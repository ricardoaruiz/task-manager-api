# 📋 API Task Manager

Uma API REST completa para gerenciamento de tarefas, desenvolvida com **Node.js**, **TypeScript** e **Fastify**.

## 🚀 Tecnologias Utilizadas

### **Backend Framework & Runtime**
- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **Fastify** - Framework web rápido e eficiente
- **fastify-type-provider-zod** - Integração do Zod com Fastify para validação de tipos

### **Banco de Dados & ORM**
- **SQLite3** - Banco de dados relacional leve (desenvolvimento)
- **Knex.js** - Query builder SQL para Node.js
- **PostgreSQL** - Suporte para banco em produção

### **Validação & Schemas**
- **Zod** - Validação de schemas TypeScript-first
- **dotenv** - Gerenciamento de variáveis de ambiente

### **Desenvolvimento & Qualidade de Código**
- **TSX** - Execução de TypeScript no desenvolvimento
- **TSUP** - Bundler TypeScript super rápido
- **Biome** - Linter e formatter moderno
- **Ultracite** - Configuração de linting otimizada
- **Vitest** - Framework de testes unitários
- **Supertest** - Biblioteca para testes HTTP

### **Git Hooks & Commits**
- **Husky** - Git hooks
- **Commitizen** - Padronização de commits
- **Commitlint** - Validação de mensagens de commit
- **lint-staged** - Executa linters em arquivos staged

## 📁 Estrutura do Projeto

```
src/
├── app.ts                    # Configuração principal do Fastify
├── server.ts                 # Inicialização do servidor
├── database/
│   ├── db.ts                 # Configuração do Knex
│   └── migrations/           # Migrações do banco de dados
├── env-variables/            # Validação de variáveis de ambiente
│   ├── env-variables.ts
│   ├── env-variables.schema.ts
│   └── index.ts
├── middleware/
│   └── global-error-handler.ts  # Tratamento global de erros
└── routes/
    ├── health/               # Endpoints de health check
    └── tasks/                # Endpoints de gerenciamento de tarefas
        ├── create-task.ts
        ├── list-tasks.ts
        ├── get-task.ts
        ├── update-task.ts
        ├── complete-task.ts
        └── delete-task.ts
```

## 🛠️ Configuração do Ambiente

### **Pré-requisitos**
- Node.js >= 18.x
- npm ou yarn

### **Variáveis de Ambiente**
Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3333
DATABASE_CLIENT=sqlite3
DATABASE_URL=./database/dev.sqlite3
```

Para produção com PostgreSQL:
```env
PORT=3333
DATABASE_CLIENT=pg
DATABASE_URL=postgresql://username:password@localhost:5432/taskmanager
```

## 📦 Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd 02-api-task-manager

# Instale as dependências
npm install

# Execute as migrações do banco de dados
npm run migrate:latest

# Inicie o servidor em modo de desenvolvimento
npm run dev
```

## 🎯 Comandos Disponíveis

### **Desenvolvimento**
```bash
npm run dev          # Inicia o servidor em modo watch
npm run build        # Compila o projeto para produção
npm run start        # Executa a versão compilada
```

### **Banco de Dados**
```bash
npm run migrate:make <nome>    # Cria uma nova migração
npm run migrate:latest         # Executa migrações pendentes
npm run knex                   # Acesso direto ao CLI do Knex
```

### **Qualidade de Código**
```bash
npm run lint         # Verifica problemas no código
npm run lint:fix     # Corrige problemas automaticamente
npm run lint:doctor  # Diagnóstico detalhado do linting
```

### **Testes**
```bash
npm test            # Executa todos os testes
npm run test:watch  # Executa testes em modo watch
```

## 🌐 API Endpoints

### **Health Check**
- `GET /health` - Verifica se a API está funcionando

### **Gerenciamento de Tarefas**

#### **Listar Tarefas**
```http
GET /tasks
```

#### **Obter Tarefa Específica**
```http
GET /tasks/:id
```

#### **Criar Nova Tarefa**
```http
POST /tasks
Content-Type: application/json

{
  "title": "Título da tarefa",
  "description": "Descrição detalhada da tarefa"
}
```

#### **Atualizar Tarefa**
```http
PUT /tasks/:id
Content-Type: application/json

{
  "title": "Novo título",
  "description": "Nova descrição"
}
```

#### **Marcar Tarefa como Concluída**
```http
PATCH /tasks/:id/complete
```

#### **Deletar Tarefa**
```http
DELETE /tasks/:id
```

## 🗄️ Estrutura do Banco de Dados

### **Tabela: tasks**
| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID | Identificador único (Primary Key) |
| `title` | STRING | Título da tarefa (obrigatório) |
| `description` | TEXT | Descrição detalhada (obrigatório) |
| `completed` | BOOLEAN | Status de conclusão (padrão: false) |
| `created_at` | TIMESTAMP | Data de criação |
| `updated_at` | TIMESTAMP | Data da última atualização |

## 🔧 Como Funciona o Código

### **Arquitetura da Aplicação**

1. **`server.ts`** - Ponto de entrada que inicializa o servidor Fastify na porta configurada
2. **`app.ts`** - Configuração central do Fastify com:
   - Validação automática de schemas com Zod
   - Tratamento global de erros
   - Registro de rotas modulares

### **Validação de Dados**
- Todas as requisições são validadas usando **Zod schemas**
- O `fastify-type-provider-zod` garante type safety entre runtime e compile time
- Validação automática de parâmetros, body e query strings

### **Gerenciamento de Banco de Dados**
- **Knex.js** como query builder abstrai diferentes SGBDs
- Migrações versionam mudanças no schema
- Suporte nativo para SQLite (dev) e PostgreSQL (produção)

### **Tratamento de Erros**
- Middleware global captura e formata erros consistentemente
- Códigos HTTP apropriados usando `http-status-codes`
- Respostas de erro padronizadas

### **Variáveis de Ambiente**
- Validação rigorosa usando Zod schemas
- Falha rápida se configurações estiverem inválidas
- Suporte a diferentes ambientes (dev, test, prod)

## 🧪 Testes

O projeto usa **Vitest** para testes unitários e de integração:

```bash
# Executar todos os testes
npm test

# Testes em modo watch
npm run test:watch

# Testes com cobertura
npm run test:coverage
```

Os testes incluem:
- Validação de endpoints HTTP
- Testes de integração com banco de dados
- Validação de schemas e middlewares

## 📋 Padrões de Código

### **Commits Convencionais**
O projeto usa Commitizen para padronizar commits:

```bash
npm run commit
```

Tipos de commit suportados:
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Tarefas de manutenção

### **Linting e Formatting**
- **Biome** para linting e formatting
- **Ultracite** para configurações otimizadas
- Execução automática em pre-commit hooks

## 🚀 Deploy

### **Build para Produção**
```bash
npm run build
npm start
```

### **Variáveis de Ambiente - Produção**
```env
PORT=3333
DATABASE_CLIENT=pg
DATABASE_URL=postgresql://user:password@host:port/database
```

## 🤝 Contribuindo

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças usando Commitizen (`npm run commit`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

---

**Desenvolvido com ❤️ por Ricardo Ruiz - Dev Fullstack**