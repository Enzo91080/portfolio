import { Inject, Injectable } from "@nestjs/common";
import type { ContactMessage, ContactMessageResponse } from "@portfolio/contracts";
import { PrismaService } from "../prisma/prisma.service.js";

@Injectable()
export class ContactService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async create({ name, email, message, locale }: ContactMessage): Promise<ContactMessageResponse> {
    const saved = await this.prisma.contactMessage.create({
      data: { name, email, message, locale },
      select: { id: true, createdAt: true },
    });
    return { id: saved.id, createdAt: saved.createdAt.toISOString() };
  }
}
