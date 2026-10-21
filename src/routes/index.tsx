import { createFileRoute, Link } from "@tanstack/react-router";
import { APPS, useApp } from "@/lib/app-ctx";
import { AppCard, AppIcon } from "@/components/ui-kit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TechnoSteak SoftHub — свободный софт и официальные релизы" },
      { name: "description", content: "Каталог проверенных open-source приложений для Windows, Android и Linux с загрузкой официальных релизов с GitHub." },
      { property: "og:title", content: "TechnoSteak SoftHub" },
      { property: "og:description", content: "Свободный софт. Официальные релизы с GitHub." },
    ],
  }),
  component: Index,
});

function Index() {
  const { t, lang } = useApp();
  return (
    <>
      <section className="hero-bg relative mt-3 overflow-hidden rounded-3xl border p-6">
        <h1 className="font-display text-2xl font-bold leading-tight md:text-4xl">{t("heroT")}</h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">{t("heroS")}</p>
      </section>

      <h2 className="mb-3 mt-6 font-display text-lg font-bold">{t("top")}</h2>
      <div className="-mx-3 flex snap-x gap-4 overflow-x-auto px-3 pb-2">
        {APPS.filter((a) => a.top).concat(APPS.filter((a) => !a.top)).map((a) => (
          <Link key={a.slug} to="/app/$slug" params={{ slug: a.slug }} className="w-24 shrink-0 snap-start">
            <AppIcon app={a} size={96} badge />
            <p className="mt-2 truncate text-sm font-semibold">{a.name}</p>
            <p className="text-[11px] text-primary">{t(a.category as "network")}</p>
          </Link>
        ))}
      </div>

      <h2 className="mb-3 mt-6 font-display text-lg font-bold">{t("all")}</h2>
      <div className="grid gap-3 md:grid-cols-2">{APPS.map((a) => <AppCard key={a.slug + lang} app={a} />)}</div>
    </>
  );
}
