import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.url(),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
});

/** Validated environment, injectable anywhere. Fails fast at boot when misconfigured. */
export class AppConfig {
  readonly nodeEnv: z.infer<typeof envSchema>["NODE_ENV"];
  readonly port: number;
  readonly databaseUrl: string;
  readonly corsOrigins: string[];

  constructor(source: NodeJS.ProcessEnv = process.env) {
    const parsed = envSchema.safeParse(source);
    if (!parsed.success) {
      throw new Error(`Invalid environment:\n${z.prettifyError(parsed.error)}`);
    }
    this.nodeEnv = parsed.data.NODE_ENV;
    this.port = parsed.data.PORT;
    this.databaseUrl = parsed.data.DATABASE_URL;
    this.corsOrigins = parsed.data.CORS_ORIGIN.split(",").map((origin) => origin.trim());
  }
}
