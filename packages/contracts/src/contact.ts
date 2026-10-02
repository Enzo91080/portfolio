import { z } from "zod";
import { localeSchema } from "./locale.js";

/**
 * Error codes rather than sentences: each client translates them,
 * the API returns them as-is.
 */
export const contactErrorCodes = ["required", "too_short", "too_long", "invalid_email"] as const;
export type ContactErrorCode = (typeof contactErrorCodes)[number];

export const CONTACT_LIMITS = {
  name: { min: 2, max: 120 },
  email: { max: 254 },
  message: { min: 10, max: 5000 },
} as const;

export const contactMessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: "required", abort: true })
    .min(CONTACT_LIMITS.name.min, { error: "too_short" })
    .max(CONTACT_LIMITS.name.max, { error: "too_long" }),
  email: z
    .string()
    .trim()
    .min(1, { error: "required", abort: true })
    .max(CONTACT_LIMITS.email.max, { error: "too_long" })
    .pipe(z.email({ error: "invalid_email" })),
  message: z
    .string()
    .trim()
    .min(1, { error: "required", abort: true })
    .min(CONTACT_LIMITS.message.min, { error: "too_short" })
    .max(CONTACT_LIMITS.message.max, { error: "too_long" }),
  locale: localeSchema,
  /** Honeypot: real visitors never see nor fill this field. */
  website: z.string().max(0).optional(),
});

export type ContactMessageInput = z.input<typeof contactMessageSchema>;
export type ContactMessage = z.output<typeof contactMessageSchema>;

export const contactMessageResponseSchema = z.object({
  id: z.string(),
  createdAt: z.iso.datetime(),
});
export type ContactMessageResponse = z.infer<typeof contactMessageResponseSchema>;
