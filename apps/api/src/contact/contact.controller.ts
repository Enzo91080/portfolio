import { Body, Controller, HttpCode, Inject, Post } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import {
  contactMessageSchema,
  type ContactMessage,
  type ContactMessageResponse,
} from "@portfolio/contracts";
import { ZodValidationPipe } from "../common/zod-validation.pipe.js";
import { ContactService } from "./contact.service.js";

@Controller("contact")
export class ContactController {
  constructor(@Inject(ContactService) private readonly contact: ContactService) {}

  /** Public endpoint: 5 messages per minute per client. */
  @Post()
  @HttpCode(201)
  @Throttle({ default: { ttl: 60_000, limit: 5 } })
  create(
    @Body(new ZodValidationPipe(contactMessageSchema)) body: ContactMessage,
  ): Promise<ContactMessageResponse> {
    return this.contact.create(body);
  }
}
