// Lightweight bilingual support (Docs/10 & 11: EN default, FA with RTL).
// Content itself lives in *En/*Fa columns in the DB (see prisma schema);
// this file only covers static UI chrome strings (nav, buttons, labels).
import { cookies } from "next/headers";

export type Locale = "en" | "fa";

export const LOCALE_COOKIE = "iust_locale";
export const defaultLocale: Locale = "en";

export async function getLocaleFromCookies(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  return value === "fa" ? "fa" : "en";
}

export function dirFor(locale: Locale) {
  return locale === "fa" ? "rtl" : "ltr";
}

// Docs/10_INFORMATION_ARCHITECTURE.md #1: primary nav = WORK / TEAM /
// COMPETITIONS / JOURNAL / ABOUT, with a JOIN THE TEAM CTA.
export const dictionary = {
  en: {
    nav: {
      work: "Work",
      team: "Team",
      competitions: "Competitions",
      journal: "Journal",
      about: "About",
      join: "Join the Team",
      contact: "Contact",
    },
    common: {
      readMore: "Read more",
      viewAll: "View all",
      current: "Current Members",
      alumni: "Alumni",
      github: "GitHub",
      empty: "Nothing published here yet.",
    },
  },
  fa: {
    nav: {
      work: "پروژه‌ها",
      team: "تیم",
      competitions: "مسابقات",
      journal: "مجله",
      about: "درباره",
      join: "به تیم بپیوندید",
      contact: "تماس",
    },
    common: {
      readMore: "بیشتر بخوانید",
      viewAll: "مشاهده همه",
      current: "اعضای فعلی",
      alumni: "دانش‌آموختگان",
      github: "گیت‌هاب",
      empty: "هنوز محتوایی منتشر نشده است.",
    },
  },
} satisfies Record<Locale, Record<string, Record<string, string>>>;

export function t(locale: Locale) {
  return dictionary[locale];
}
