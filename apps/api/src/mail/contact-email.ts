import type { ContactMessage } from "@portfolio/contracts";

/**
 * Owner notification for a new contact message, in the portfolio's light
 * theme ("encre sur papier"). Email clients ignore <style> blocks and modern
 * layout, so the markup is table-based with inline styles only.
 */

const COLOR = {
  bg: "#F7F8FA",
  surface: "#FFFFFF",
  ink: "#111318",
  muted: "#68707D",
  accent: "#315FEA",
  line: "#E4E6EA",
};

const FONT_SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Roboto,Helvetica,Arial,sans-serif";
const FONT_MONO = "'SFMono-Regular',Menlo,Consolas,'Liberation Mono',monospace";

const LANGUAGE = { fr: "Français", en: "English" } as const;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Paris",
  }).format(date);
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

export function renderContactEmail(message: ContactMessage, receivedAt: Date): RenderedEmail {
  const name = message.name.replace(/[\r\n]+/g, " ");
  const date = formatDate(receivedAt);
  const language = LANGUAGE[message.locale];
  const firstName = name.split(" ")[0] ?? name;
  const replyHref = `mailto:${encodeURIComponent(message.email)}?subject=${encodeURIComponent(
    "Re: votre message sur mon portfolio",
  )}`;
  const preview = message.message.replace(/\s+/g, " ").slice(0, 110);

  const subject = `Nouveau message de ${name} — Portfolio`;

  const text = [
    `Nouveau message de ${name}`,
    "",
    message.message,
    "",
    `Email : ${message.email}`,
    `Langue : ${language}`,
    `Reçu le : ${date}`,
    "",
    "Répondre à cet email écrit directement à l'expéditeur.",
  ].join("\n");

  const label = (value: string) =>
    `<div style="font-family:${FONT_MONO};font-size:11px;line-height:1.6;color:${COLOR.muted};">${value}</div>`;

  const metaRow = (term: string, value: string, last = false) => `
    <tr>
      <td style="padding:12px 0;border-top:1px solid ${COLOR.line};${last ? `border-bottom:1px solid ${COLOR.line};` : ""}width:110px;vertical-align:top;font-family:${FONT_MONO};font-size:11px;line-height:1.6;color:${COLOR.muted};">${term}</td>
      <td style="padding:12px 0;border-top:1px solid ${COLOR.line};${last ? `border-bottom:1px solid ${COLOR.line};` : ""}vertical-align:top;font-family:${FONT_SANS};font-size:14px;line-height:1.6;color:${COLOR.ink};">${value}</td>
    </tr>`;

  const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:${COLOR.bg};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preview)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLOR.bg};">
  <tr>
    <td align="center" style="padding:40px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
        <tr>
          <td style="padding:0 4px 20px;">
            <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${COLOR.accent};vertical-align:middle;"></span>
            <span style="font-family:${FONT_MONO};font-size:12px;color:${COLOR.muted};vertical-align:middle;padding-left:8px;">Portfolio — formulaire de contact</span>
          </td>
        </tr>
        <tr>
          <td style="background:${COLOR.surface};border:1px solid ${COLOR.line};border-radius:12px;padding:36px 32px;">
            ${label("Nouveau message de")}
            <div style="margin-top:6px;font-family:${FONT_SANS};font-size:30px;line-height:1.1;font-weight:700;letter-spacing:-0.03em;color:${COLOR.ink};">${escapeHtml(name)}</div>
            <div style="margin-top:6px;font-family:${FONT_SANS};font-size:15px;line-height:1.6;">
              <a href="mailto:${escapeHtml(message.email)}" style="color:${COLOR.accent};text-decoration:none;">${escapeHtml(message.email)}</a>
            </div>

            <div style="margin-top:28px;padding:4px 0 4px 18px;border-left:2px solid ${COLOR.accent};font-family:${FONT_SANS};font-size:16px;line-height:1.65;color:${COLOR.ink};">
              ${escapeHtml(message.message).replace(/\r?\n/g, "<br>")}
            </div>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
              ${metaRow("Reçu le", escapeHtml(date))}
              ${metaRow("Langue", language, true)}
            </table>

            <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;">
              <tr>
                <td style="border-radius:999px;background:${COLOR.ink};">
                  <a href="${replyHref}" style="display:inline-block;padding:13px 24px;font-family:${FONT_SANS};font-size:15px;font-weight:600;color:#FFFFFF;text-decoration:none;border-radius:999px;">Répondre à ${escapeHtml(firstName)} &rarr;</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 4px 0;font-family:${FONT_SANS};font-size:12px;line-height:1.6;color:${COLOR.muted};">
            Répondre à cet email écrit directement à ${escapeHtml(message.email)}.
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  return { subject, html, text };
}
