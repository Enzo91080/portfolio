# syntax=docker/dockerfile:1
# Build context: repository root.

FROM node:24-alpine AS base
RUN corepack enable
WORKDIR /repo

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/config/package.json packages/config/
COPY packages/contracts/package.json packages/contracts/
COPY apps/api/package.json apps/api/
RUN pnpm install --frozen-lockfile --filter "@portfolio/api..."

FROM deps AS build
COPY packages packages
COPY apps/api apps/api
RUN pnpm --filter "@portfolio/api..." run build

# Keeps the workspace node_modules: the Prisma CLI is needed to apply migrations at boot.
FROM node:24-alpine AS runner
ENV NODE_ENV=production
WORKDIR /repo
COPY --from=build --chown=node:node /repo ./
WORKDIR /repo/apps/api
USER node
EXPOSE 4000
CMD ["sh", "-c", "node node_modules/prisma/build/index.js migrate deploy && node dist/main.js"]
