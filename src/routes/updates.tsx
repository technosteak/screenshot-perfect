import { createFileRoute } from "@tanstack/react-router";
import { APPS, useApp } from "@/lib/app-ctx";
import { AppCard } from "@/components/ui-kit";

export const Route = createFileRoute("/updates")({
  head: () => ({
    meta: [
      { title: "Последние обновления — TechnoSteak SoftHub" },
      { name: "description", content: "Свежие релизы open-source приложений." },
      { property: "og:title", content: "Обновления — TechnoSteak SoftHub" },
      { property: "og:description", content: "Свежие релизы open-source приложений." },
    ],
  }),
  component: () => {
    const { t } = useApp();
    const list = [...APPS].sort((a, b) => b.updated.localeCompare(a.updated));
    return (
      <>
        <h1 className="my-4 font-display text-2xl font-bold">{t("updates")}</h1>
        <div className="space-y-3">
          {list.map((a) => (
            <div key={a.slug}>
              <p className="mb-1 text-xs text-muted-foreground">{t("updated")}: {a.updated}</p>
              <AppCard app={a} />
            </div>
          ))}
        </div>
      </>
    );
  },
});
