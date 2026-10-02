import { Controller, Get } from "@nestjs/common";
import { SkipThrottle } from "@nestjs/throttler";
import type { HealthResponse } from "@portfolio/contracts";

@Controller("health")
@SkipThrottle()
export class HealthController {
  @Get()
  check(): HealthResponse {
    return { status: "ok", uptime: process.uptime(), timestamp: new Date().toISOString() };
  }
}
