import "dotenv/config";
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { AppConfig } from "./config/app-config.js";

const app = await NestFactory.create(AppModule);
const config = app.get(AppConfig);

app.enableCors({ origin: config.corsOrigins, methods: ["GET", "POST"] });
app.enableShutdownHooks();

await app.listen(config.port);
