import { Inject, Injectable } from "@nestjs/common";
import type { ContactMessage, ContactMessageResponse } from "@portfolio/contracts";
import { MailService } from "../mail/mail.service.js";
import { PrismaService } from "../prisma/prisma.service.js";

@Injectable()
export class ContactService {
  constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService,
    @Inject(MailService) private readonly mail: MailService,
  ) {}

  /** Stores the message first, then notifies the owner by email. */
  async create(input: ContactMessage): Promise<ContactMessageResponse> {
    const { name, email, message, locale } = input;
    const saved = await this.prisma.contactMessage.create({
      data: { name, email, message, locale },
      select: { id: true, createdAt: true },
    });
    await this.mail.notifyContact(input);
    return { id: saved.id, createdAt: saved.createdAt.toISOString() };
  }
}
