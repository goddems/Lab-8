# Lab 8 — TypeORM + NestJS

This project implements Laboratory Work #8 requirements (TypeORM integration for NestJS).

Prerequisites
- Node.js 18+
- npm
- PostgreSQL running locally

Quick start

1. Copy `.env.example` to `.env` and set DB credentials.
2. Install dependencies:

```bash
npm install
```

3. Generate migration (optional) and run migrations:

```bash
npm run migration:generate -- -n Init
npm run migration:run
```

4. Start development server:

```bash
npm run start:dev
```

Endpoints
- `GET /tasks`
- `GET /tasks/:id`
- `GET /tasks/search?status=...`
- `POST /tasks` (accepts optional `tagIds: number[]`)
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`
- `POST /tags`
- `GET /tags`
- `PATCH /tags/:id`
- `DELETE /tags/:id`

See lab instructions for full requirements.
