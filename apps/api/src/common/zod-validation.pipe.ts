import { BadRequestException, Injectable, type PipeTransform } from "@nestjs/common";
import type { ApiErrorResponse } from "@portfolio/contracts";
import type { z } from "zod";

/** Validates a payload against a shared contract; issues carry error codes, not prose. */
@Injectable()
export class ZodValidationPipe<TSchema extends z.ZodType> implements PipeTransform {
  constructor(private readonly schema: TSchema) {}

  transform(value: unknown): z.output<TSchema> {
    const result = this.schema.safeParse(value);
    if (result.success) return result.data;

    const body: ApiErrorResponse = {
      statusCode: 400,
      error: "Bad Request",
      message: "Validation failed",
      issues: result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        code: issue.message,
      })),
    };
    throw new BadRequestException(body);
  }
}
