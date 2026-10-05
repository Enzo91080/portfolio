import { Inject, Injectable, Logger } from "@nestjs/common";
import type { ContactMessage } from "@portfolio/contracts";
import { Resend } from "resend";
import { AppConfig } from "../config/app-config.js";
import { renderContactEmail } from "./contact-email.js";

/** Resend's shared sender: allowed until a domain of our own is verified. */
const SENDER = "Portfolio <onboarding@resend.dev>";

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly client: Resend | null;
  private readonly notifyTo: string | null;

  constructor(@Inject(AppConfig) config: AppConfig) {
    this.client = config.mail ? new Resend(config.mail.apiKey) : null;
    this.notifyTo = config.mail?.notifyTo ?? null;
    if (!this.client) {
      this.logger.warn("RESEND_API_KEY or CONTACT_NOTIFY_TO missing: contact emails are disabled.");
    }
  }

  /**
   * Emails the owner about a new contact message. Never throws: the message is
   * already stored, so a mail outage must not turn the request into an error.
   */
  async notifyContact(message: ContactMessage): Promise<void> {
    if (!this.client || !this.notifyTo) return;

    const { subject, html, text } = renderContactEmail(message, new Date());
    try {
      const { error } = await this.client.emails.send({
        from: SENDER,
        to: this.notifyTo,
        replyTo: message.email,
        subject,
        html,
        text,
      });
      if (error) this.logger.error(`Contact email rejected by Resend: ${error.message}`);
    } catch (error) {
      this.logger.error("Contact email could not be sent", error instanceof Error ? error.stack : error);
    }
  }
}
