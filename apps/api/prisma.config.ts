import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: {
    // `prisma generate` never connects, so it may run without a database (CI, Docker build).
    url: process.env.DATABASE_URL ?? "postgresql://unused@localhost:5432/unused",
  },
});
