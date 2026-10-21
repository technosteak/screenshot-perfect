import { createFileRoute } from "@tanstack/react-router";
import { APPS, useApp } from "@/lib/app-ctx";
import { AppCard } from "@/components/ui-kit";

export const Route = createFileRoute("/apps")({
  head: () => ({
    meta: [
      { title: "Все приложения — TechnoSteak SoftHub" },
      { name: "description", content: "Полный каталог open-source приложений TechnoSteak SoftHub." },
      { property: "og:title", content: "Все приложения — TechnoSteak SoftHub" },
      { property: "og:description", content: "Полный каталог open-source приложений." },
    ],
  }),
  component: () => {
    const { t } = useApp();
    return (
      <>
        <h1 className="my-4 font-display text-2xl font-bold">{t("apps")}</h1>
        <div className="grid gap-3 md:grid-cols-2">{APPS.map((a) => <AppCard key={a.slug} app={a} />)}</div>
      </>
    );
  },
});
