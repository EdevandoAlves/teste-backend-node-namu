# Namu Teste Backend Node Junior

## Tecnologias

- **Node.js** + **TypeScript**
- **Express 5**
- **TypeORM** + **MySQL 8**
- **Zod** — validação de dados
- **ESLint** + **Prettier**

## Pré-requisitos

- Node.js 18+
- Docker e Docker Compose

## Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/EdevandoAlves/teste-backend-node-namu.git
cd teste-backend-node-namu
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

O arquivo `.env.example` já contém os valores padrão para desenvolvimento local:

```env
DB_HOST=127.0.0.1
DB_PORT=3307
DB_USER=root
DB_PASSWORD=root
DB_NAME=namu_wellness
PORT=3000
```

### 3. Suba o banco de dados

```bash
docker compose up -d
```

O banco já é criado com dados de exemplo automaticamente via `seed.sql`.

### 4. Instale as dependências

```bash
npm install
```

### 5. Execute as migrations

```bash
npm run migration:run
```

### 6. Inicie a aplicação

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`.

---

## Collection

A collection da API está disponível na pasta:

```bash
/docs/bruno/Namu
```

A colletion foi criada utilizando o Bruno e contém exemplos de requests para:
- Programs 
- Activities 
- Participations 
- Summary

## Endpoints

### Programas

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/programs?page=1&limit=10` | Lista programas com paginação |
| `GET` | `/programs/:id/summary` | Relatório Simples  |
| `POST` | `/programs` | Cria um programa |
| `PATCH` | `/programs/:id` | Atualiza um programa |
| `DELETE` | `/programs/:id` | Remove um programa |

**Body — POST /programs**
```json
{
  "name": "Yoga Matinal",
  "description": "Sequências de yoga para começar o dia com energia.",
  "category": "exercício",
  "duration_weeks": 8
}
```

Categorias válidas: `meditação` | `exercício` | `nutrição`

---

### Atividades

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/programs/:id/activities?page=1&limit=10` | Lista atividades de um programa |
| `POST` | `/programs/:id/activities` | Cria uma atividade no programa |
| `PATCH` | `/programs/:id/activities/:activityId` | Atualiza uma atividade |
| `DELETE` | `/programs/:id/activities/:activityId` | Remove uma atividade |

**Body — POST /programs/:id/activities**
```json
{
  "title": "Saudação ao Sol",
  "description": "Sequência clássica de yoga para aquecer o corpo.",
  "day_of_week": "terça",
  "duration_minutes": 30
}
```

Dias válidos: `segunda` | `terça` | `quarta` | `quinta` | `sexta` | `sábado` | `domingo`

---

## Estrutura do Projeto

```
docs/               # Collection com as requests
src/
├── __tests__/      # Testes unitários
├── controllers/    # Recebe a requisição, chama o service, retorna a resposta
├── services/       # Regras de negócio
├── entities/       # Modelos do TypeORM (mapeamento do banco)
├── schemas/        # Schemas de validação com Zod
├── routes/         # Definição das rotas
├── middlewares/    # Error handler global
├── errors/         # Classe AppError para erros esperados
├── database/       # Configuração do DataSource e migrations
├── app.ts          # Configuração do Express
└── server.ts       # Inicialização do servidor
```

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia em modo desenvolvimento com hot-reload |
| `npm run lint` | Verifica erros de lint |
| `npm run lint:fix` | Corrige erros de lint automaticamente |
| `npm run format` | Formata o código com Prettier |
| `npm run migration:run` | Executa as migrations pendentes |
| `npm run migration:generate` | Gera uma nova migration a partir das entidades |
| `npm run test` | Executa os testes criados |

## Tratamento de Erros

Todos os erros passam pelo middleware global `errorHandler`:

- **Erros de validação (Zod)** → `400` com detalhes por campo
- **Erros de negócio (AppError)** → status configurado (400, 404, etc.)
- **Erros inesperados** → `500`

Exemplo de resposta de erro de validação:
```json
{
  "message": "Validation error",
  "errors": {
    "fieldErrors": {
      "category": ["Invalid enum value"]
    }
  }
}
```
