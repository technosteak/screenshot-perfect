import { createFileRoute } from "@tanstack/react-router";
import { APPS, CATEGORIES, useApp } from "@/lib/app-ctx";
import { AppCard } from "@/components/ui-kit";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Категории — TechnoSteak SoftHub" },
      { name: "description", content: "Приложения по категориям: сеть, медиа, инструменты, безопасность." },
      { property: "og:title", content: "Категории — TechnoSteak SoftHub" },
      { property: "og:description", content: "Open-source приложения по категориям." },
    ],
  }),
  component: () => {
    const { t } = useApp();
    return (
      <>
        <h1 className="my-4 font-display text-2xl font-bold">{t("cats")}</h1>
        {CATEGORIES.map((c) => (
          <section key={c} id={c} className="mb-6 scroll-mt-20">
            <h2 className="mb-2 font-display text-lg font-bold text-primary">{t(c)}</h2>
            <div className="grid gap-3 md:grid-cols-2">{APPS.filter((a) => a.category === c).map((a) => <AppCard key={a.slug} app={a} />)}</div>
          </section>
        ))}
      </>
    );
  },
});
