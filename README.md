# Portfolio

Personal Full-Stack portfolio. Visual and UX reference: the Claude Design project
"Le portrait en couches" (homepage, Créneo and WebCMS case studies, design system).

## Stack

| Layer    | Tech                                                              |
| -------- | ----------------------------------------------------------------- |
| Frontend | Next.js 16 (App Router), TypeScript, Tailwind CSS 4, shadcn/ui, Motion |
| Backend  | NestJS 12, REST                                                   |
| Data     | PostgreSQL, Prisma 7                                              |
| Tooling  | pnpm workspaces, Turborepo, Docker                                |

## Layout

```
apps/
  web/        Next.js site — routes under src/app/[locale] (fr, en)
  api/        NestJS REST API — /health, POST /contact
packages/
  config/     Shared tsconfig, ESLint and Prettier
  contracts/  Zod schemas and types shared by web and api
  content/    FR/EN copy, typed (SiteContent)
```

- **Design tokens** live in `apps/web/src/app/globals.css` (dark default on `:root`,
  light under `[data-theme="light"]`).
- **Copy** is never hard-coded in components: edit `packages/content/src/{fr,en}.ts`.
- **Images**: set `image` on any `Media` entry in the content package; until then a
  described placeholder renders in its place.

## Getting started

```bash
corepack enable
pnpm install
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
docker compose up -d postgres
pnpm --filter @portfolio/api prisma:deploy
pnpm dev
```

Web: http://localhost:3000 — API: http://localhost:4000/health

## Scripts

```bash
pnpm build        # all packages and apps
pnpm lint
pnpm typecheck
docker compose up --build   # full stack
```
