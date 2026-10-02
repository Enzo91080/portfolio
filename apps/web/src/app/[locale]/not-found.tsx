import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <main className="container-site grid min-h-screen content-center gap-6 py-24">
      <div className="font-mono text-[12px] text-muted">404</div>
      <h1 className="font-display text-[length:clamp(44px,7vw,112px)] font-bold leading-[0.95] tracking-[-0.05em]">
        Page introuvable
        <span className="mt-3 block text-[0.4em] font-medium tracking-[-0.02em] text-muted">
          Page not found
        </span>
      </h1>
      <Link href="/" className="text-[15px] text-muted">
        ← Accueil / Home
      </Link>
    </main>
  );
}
