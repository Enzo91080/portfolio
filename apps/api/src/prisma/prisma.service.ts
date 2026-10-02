import { Inject, Injectable, type OnModuleDestroy } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { AppConfig } from "../config/app-config.js";
import { PrismaClient } from "../generated/prisma/client.js";

/** Prisma client over the pg driver adapter; connects lazily on first query. */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  constructor(@Inject(AppConfig) config: AppConfig) {
    super({ adapter: new PrismaPg({ connectionString: config.databaseUrl }) });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
