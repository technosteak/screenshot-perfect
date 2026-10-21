import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import apps from "@/data/apps.json";

export type Lang = "ru" | "en";
export type AppItem = (typeof apps)[number];
export const APPS: AppItem[] = apps;
export const CATEGORIES = ["network", "media", "tools", "security"] as const;

const dict = {
  ru: { home: "Главная", apps: "Приложения", updates: "Обновления", cats: "Категории", top: "Топ приложений", all: "Все приложения", download: "Скачать", search: "Поиск приложений…", heroT: "Свободный софт. Официальные релизы.", heroS: "Проверенные open-source приложения для Windows, Android и Linux — напрямую с GitHub.", network: "Сеть", media: "Медиа", tools: "Инструменты", security: "Безопасность", review: "Обзор", notes: "Что нового", shots: "Скриншоты", faq: "Частые вопросы", bigCta: "Скачать официальный релиз (.exe / .apk)", license: "Лицензия", os: "Платформы", updated: "Обновлено", nothing: "Ничего не найдено" },
  en: { home: "Home", apps: "Apps", updates: "Updates", cats: "Categories", top: "Top apps", all: "All apps", download: "Download", search: "Search apps…", heroT: "Free software. Official releases.", heroS: "Verified open-source apps for Windows, Android and Linux — straight from GitHub.", network: "Network", media: "Media", tools: "Tools", security: "Security", review: "Review", notes: "Release notes", shots: "Screenshots", faq: "FAQ", bigCta: "Download official release (.exe / .apk)", license: "License", os: "Platforms", updated: "Updated", nothing: "Nothing found" },
};
export type Key = keyof typeof dict.ru;

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string; dark: boolean; toggleDark: () => void }>(null!);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ru");
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const l = localStorage.getItem("lang") as Lang | null;
    if (l) setLang(l);
    const d = localStorage.getItem("dark");
    if (d) setDark(d === "1");
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.lang = lang;
  }, [dark, lang]);
  return (
    <Ctx.Provider
      value={{
        lang,
        setLang: (l) => { setLang(l); localStorage.setItem("lang", l); },
        t: (k) => dict[lang][k],
        dark,
        toggleDark: () => setDark((d) => { localStorage.setItem("dark", d ? "0" : "1"); return !d; }),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
export const useApp = () => useContext(Ctx);
