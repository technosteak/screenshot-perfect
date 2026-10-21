import { createFileRoute, notFound } from "@tanstack/react-router";
import { Github, Download } from "lucide-react";
import { APPS, useApp } from "@/lib/app-ctx";
import { AppIcon, AdBox } from "@/components/ui-kit";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/app/$slug")({
  loader: ({ params }) => {
    const app = APPS.find((a) => a.slug === params.slug);
    if (!app) throw notFound();
    return { app };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.app;
    if (!a) return { meta: [{ title: "Приложение не найдено" }, { name: "robots", content: "noindex" }] };
    const title = `Скачать ${a.name} ${a.version} — TechnoSteak SoftHub`;
    return {
      meta: [
        { title },
        { name: "description", content: a.desc.ru },
        { property: "og:title", content: title },
        { property: "og:description", content: a.desc.ru },
        { property: "og:image", content: a.icon },
        { name: "twitter:image", content: a.icon },
      ],
    };
  },
  component: Detail,
});

function Detail() {
  const { app } = Route.useLoaderData();
  const { t, lang } = useApp();
  const faq: [string, string][] = lang === "ru"
    ? [[`Безопасно ли скачивать ${app.name}?`, "Да, ссылки ведут на официальные релизы GitHub разработчика."], [`${app.name} бесплатный?`, `Да, это свободное ПО под лицензией ${app.license}.`]]
    : [[`Is ${app.name} safe to download?`, "Yes, links point to the developer's official GitHub releases."], [`Is ${app.name} free?`, `Yes, it's free software under ${app.license}.`]];
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };

  return (
    <article className="pt-4">
      <div className="flex gap-4">
        <AppIcon app={app} size={96} badge />
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-bold">{app.name} <span className="text-base text-primary">v{app.version}</span></h1>
          <a href={app.github} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"><Github className="h-4 w-4" />GitHub</a>
          <dl className="mt-2 grid grid-cols-2 gap-x-4 text-xs">
            <dt className="text-muted-foreground">{t("license")}</dt><dd>{app.license}</dd>
            <dt className="text-muted-foreground">{t("os")}</dt><dd>{app.platforms.join(", ")}</dd>
          </dl>
        </div>
      </div>

      <a href={`${app.github}/releases/latest`} target="_blank" rel="noreferrer" className="cta-glow mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-4 text-center font-bold text-primary-foreground">
        <Download className="h-5 w-5" />{t("bigCta")}
      </a>

      <AdBox label="Yandex РСЯ Ad" className="mt-5 h-28" />

      <h2 className="mt-6 font-display text-lg font-bold">{t("review")}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{app.review[lang]}</p>

      <h2 className="mt-6 font-display text-lg font-bold">{t("notes")} · v{app.version}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{app.notes[lang]}</p>

      <h2 className="mt-6 font-display text-lg font-bold">{t("shots")}</h2>
      <div className="-mx-3 mt-2 flex snap-x gap-3 overflow-x-auto px-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="hero-bg flex h-64 w-36 shrink-0 snap-start items-center justify-center rounded-2xl border">
            <AppIcon app={app} size={56} />
          </div>
        ))}
      </div>

      <h2 className="mt-6 font-display text-lg font-bold">{t("faq")}</h2>
      <Accordion type="single" collapsible className="mt-2">
        {faq.map(([q, a]) => (
          <AccordionItem key={q} value={q}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>
        ))}
      </Accordion>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </article>
  );
}
