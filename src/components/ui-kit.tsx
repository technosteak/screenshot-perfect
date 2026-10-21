import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, Search, Sun, Moon, Home, LayoutGrid, RefreshCw, Shapes, Download, X } from "lucide-react";
import { useApp, APPS, CATEGORIES, type AppItem } from "@/lib/app-ctx";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <svg viewBox="0 0 64 64" className="h-7 w-7 text-foreground" fill="none" aria-hidden>
        <path d="M14 22 6 32l8 10M50 22l8 10-8 10" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M36 8 20 36h11l-4 20 17-30H33l3-18Z" fill="currentColor" />
      </svg>
      <span className="font-display text-base font-bold tracking-tight">TechnoSteak</span>
      <span className="rounded-md bg-primary px-1.5 py-0.5 text-[10px] font-bold leading-none text-primary-foreground">FOSS</span>
    </Link>
  );
}

export function AppIcon({ app, size = 64, badge }: { app: AppItem; size?: number; badge?: boolean }) {
  return (
    <div className="relative shrink-0 overflow-hidden rounded-2xl border bg-card" style={{ width: size, height: size }}>
      <img src={app.icon} alt={app.name} loading="lazy" className="h-full w-full object-cover" />
      {badge && app.top && (
        <span className="absolute right-1 top-1 rounded-md bg-primary px-1.5 py-0.5 text-[9px] font-bold leading-none text-primary-foreground shadow">Top</span>
      )}
    </div>
  );
}

export function AdBox({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center rounded-xl border border-dashed bg-muted/50 text-xs uppercase tracking-widest text-muted-foreground ${className}`}>
      {label}
    </div>
  );
}

export function AppCard({ app }: { app: AppItem }) {
  const { lang, t } = useApp();
  return (
    <div className="flex gap-3 rounded-2xl border bg-card p-3 transition hover:border-primary/60">
      <Link to="/app/$slug" params={{ slug: app.slug }}><AppIcon app={app} badge /></Link>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Link to="/app/$slug" params={{ slug: app.slug }} className="truncate font-semibold">{app.name}</Link>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-secondary-foreground">v{app.version}</span>
        </div>
        <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{app.desc[lang]}</p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {app.platforms.map((p) => <span key={p} className="rounded border px-1.5 py-0.5 text-[10px] text-muted-foreground">{p}</span>)}
          </div>
          <a href={`${app.github}/releases/latest`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            <Download className="h-3 w-3" />{t("download")}
          </a>
        </div>
      </div>
    </div>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const { t, lang, setLang, dark, toggleDark } = useApp();
  const [drawer, setDrawer] = useState(false);
  const [q, setQ] = useState<string | null>(null);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const results = q ? APPS.filter((a) => a.name.toLowerCase().includes(q.toLowerCase())) : [];
  const nav = [
    { to: "/", icon: Home, k: "home" },
    { to: "/apps", icon: LayoutGrid, k: "apps" },
    { to: "/updates", icon: RefreshCw, k: "updates" },
    { to: "/categories", icon: Shapes, k: "cats" },
  ] as const;

  return (
    <div className="min-h-screen pb-36 md:pb-10">
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-2 px-3">
          <button aria-label="Menu" onClick={() => setDrawer(true)} className="rounded-lg p-2 hover:bg-muted"><Menu className="h-5 w-5" /></button>
          <Logo />
          <div className="ml-auto flex items-center gap-1">
            <button aria-label="Search" onClick={() => setQ(q === null ? "" : null)} className="rounded-lg p-2 hover:bg-muted"><Search className="h-5 w-5" /></button>
            <button aria-label="Theme" onClick={toggleDark} className="rounded-lg p-2 hover:bg-muted">{dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}</button>
            <div className="flex rounded-lg border text-[11px] font-semibold">
              {(["ru", "en"] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)} className={`px-1.5 py-1 uppercase ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground"} rounded-md`}>{l}</button>
              ))}
            </div>
          </div>
        </div>
        {q !== null && (
          <div className="mx-auto max-w-5xl px-3 pb-3">
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("search")} className="w-full rounded-xl border bg-card px-3 py-2 text-sm outline-none focus:border-primary" />
            {q && (
              <div className="mt-2 space-y-1">
                {results.length ? results.map((a) => (
                  <Link key={a.slug} to="/app/$slug" params={{ slug: a.slug }} onClick={() => setQ(null)} className="flex items-center gap-2 rounded-lg p-2 hover:bg-muted">
                    <AppIcon app={a} size={32} /><span className="text-sm">{a.name}</span>
                  </Link>
                )) : <p className="p-2 text-sm text-muted-foreground">{t("nothing")}</p>}
              </div>
            )}
          </div>
        )}
      </header>

      <div className="mx-auto max-w-5xl px-3 pt-3"><AdBox label="Header Ad Space" className="h-16" /></div>

      {drawer && <div className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm" onClick={() => setDrawer(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 border-r bg-card p-4 transition-transform duration-300 ${drawer ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-6 flex items-center justify-between"><Logo /><button aria-label="Close" onClick={() => setDrawer(false)}><X className="h-5 w-5" /></button></div>
        <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">{t("cats")}</p>
        {CATEGORIES.map((c) => (
          <Link key={c} to="/categories" hash={c} onClick={() => setDrawer(false)} className="block rounded-lg px-3 py-2 hover:bg-muted">{t(c)}</Link>
        ))}
      </aside>

      <main className="mx-auto max-w-5xl px-3">{children}</main>

      <div className="fixed inset-x-0 bottom-16 z-30 px-3 md:hidden"><AdBox label="Sticky Bottom Ad" className="h-12 bg-card" /></div>
      <nav className="fixed inset-x-0 bottom-0 z-40 grid h-16 grid-cols-4 border-t bg-background/95 backdrop-blur md:hidden">
        {nav.map(({ to, icon: I, k }) => {
          const active = to === "/" ? path === "/" : path.startsWith(to);
          return (
            <Link key={to} to={to} className={`flex flex-col items-center justify-center gap-1 text-[11px] ${active ? "text-primary" : "text-muted-foreground"}`}>
              <span className={`rounded-full px-4 py-1 ${active ? "bg-primary/15" : ""}`}><I className="h-5 w-5" /></span>{t(k)}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
