"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { SiteContent } from "@portfolio/content";
import {
  contactErrorCodes,
  contactMessageSchema,
  type ContactErrorCode,
  type Locale,
} from "@portfolio/contracts";
import { useId, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { apiUrl } from "@/lib/env";
import { cn } from "@/lib/utils";

type ContactFormProps = {
  copy: SiteContent["contact"]["form"];
  locale: Locale;
  className?: string;
};

type Status = "idle" | "sent" | "failed";

const fieldClass =
  "w-full rounded-none border-0 border-b border-line-strong bg-transparent px-0 text-[18px] outline-none transition-[border-color,box-shadow] focus:border-accent focus:shadow-[inset_0_-1px_0_var(--accent)] aria-[invalid=true]:border-danger";

function isErrorCode(value: unknown): value is ContactErrorCode {
  return (contactErrorCodes as readonly unknown[]).includes(value);
}

export function ContactForm({ copy, locale, className }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const id = useId();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactMessageSchema),
    defaultValues: { name: "", email: "", message: "", locale, website: "" },
    mode: "onTouched",
  });

  const errorText = (message?: string) =>
    message ? (isErrorCode(message) ? copy.errors[message] : copy.errors.required) : undefined;

  const onSubmit = handleSubmit(async (values) => {
    setStatus("idle");
    try {
      const response = await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(`Contact API answered ${response.status}`);
      setStatus("sent");
    } catch (error) {
      console.error(error);
      setStatus("failed");
    }
  });

  if (status === "sent") {
    return (
      <div role="status" className={cn("border-t border-accent py-10", className)}>
        <div className="font-mono text-[12px] text-accent">{copy.sentLabel}</div>
        <p className="mt-3 font-display text-[28px] font-semibold tracking-[-0.02em]">
          {copy.sentTitle}
        </p>
      </div>
    );
  }

  const nameError = errorText(errors.name?.message);
  const emailError = errorText(errors.email?.message);
  const messageError = errorText(errors.message?.message);

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn(
        "relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] content-start gap-x-8 gap-y-2",
        className,
      )}
    >
      <Field id={`${id}-name`} label={copy.name} error={nameError} className="pt-2">
        <input
          id={`${id}-name`}
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(nameError)}
          aria-describedby={nameError ? `${id}-name-error` : undefined}
          className={cn(fieldClass, "h-[52px]")}
          {...register("name")}
        />
      </Field>
      <Field id={`${id}-email`} label={copy.email} error={emailError} className="pt-2">
        <input
          id={`${id}-email`}
          type="email"
          inputMode="email"
          autoComplete="email"
          aria-invalid={Boolean(emailError)}
          aria-describedby={emailError ? `${id}-email-error` : undefined}
          className={cn(fieldClass, "h-[52px]")}
          {...register("email")}
        />
      </Field>
      <Field
        id={`${id}-message`}
        label={copy.message}
        error={messageError}
        className="col-span-full pt-4"
      >
        <textarea
          id={`${id}-message`}
          rows={4}
          aria-invalid={Boolean(messageError)}
          aria-describedby={messageError ? `${id}-message-error` : undefined}
          className={cn(fieldClass, "resize-y py-3")}
          {...register("message")}
        />
      </Field>

      {/* Honeypot, hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      <div className="col-span-full mt-6 flex flex-wrap items-center justify-between gap-4">
        <span className="text-[13px] text-muted">{copy.privacy}</span>
        <Button
          type="submit"
          variant="accent"
          size="lg"
          disabled={isSubmitting}
          className="max-sm:w-full max-sm:justify-center"
        >
          {isSubmitting ? copy.submitting : copy.submit} <span aria-hidden="true">→</span>
        </Button>
      </div>
      {status === "failed" ? (
        <p role="alert" className="col-span-full text-[13px] text-danger">
          {copy.failure}
        </p>
      ) : null}
    </form>
  );
}

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

function Field({ id, label, error, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label htmlFor={id} className={cn("font-mono text-[11.5px] text-muted", error && "text-danger")}>
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-[13px] text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
