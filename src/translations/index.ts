import { Language } from "@/contexts/language-context"

type TranslationKey =
  | "navigation.home"
  | "navigation.about"
  | "navigation.projects"
  | "navigation.contact"
  | "hero.greeting"
  | "hero.title"
  | "hero.subtitle"
  | "about.title"
  | "about.description"
  | "projects.title"
  | "projects.subtitle"
  | "contact.title"
  | "contact.subtitle"
  | "contact.form.name"
  | "contact.form.email"
  | "contact.form.message"
  | "contact.form.submit"

type Translations = {
  [key in Language]: {
    [key in TranslationKey]: string
  }
}

export const translations: Translations = {
  en: {
    "navigation.home": "Home",
    "navigation.about": "About",
    "navigation.projects": "Projects",
    "navigation.contact": "Contact",
    "hero.greeting": "Hi, I'm",
    "hero.title": "Full Stack Developer",
    "hero.subtitle": "I build accessible, responsive and user-friendly web applications",
    "about.title": "About Me",
    "about.description": "I'm passionate about creating intuitive and responsive web applications that solve real-world problems.",
    "projects.title": "Projects",
    "projects.subtitle": "Some of my recent work",
    "contact.title": "Contact Me",
    "contact.subtitle": "Feel free to reach out if you have any questions or want to work together.",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.message": "Message",
    "contact.form.submit": "Send Message"
  },
  ar: {
    "navigation.home": "الرئيسية",
    "navigation.about": "عني",
    "navigation.projects": "المشاريع",
    "navigation.contact": "اتصل بي",
    "hero.greeting": "مرحباً، أنا",
    "hero.title": "مطور ويب متكامل",
    "hero.subtitle": "أبني تطبيقات ويب سهلة الوصول ومتجاوبة وسهلة الاستخدام",
    "about.title": "عني",
    "about.description": "أنا شغوف بإنشاء تطبيقات ويب بديهية وسريعة الاستجابة تحل مشكلات العالم الحقيقي.",
    "projects.title": "المشاريع",
    "projects.subtitle": "بعض أعمالي الحديثة",
    "contact.title": "اتصل بي",
    "contact.subtitle": "لا تتردد في التواصل إذا كان لديك أي أسئلة أو ترغب في العمل معًا.",
    "contact.form.name": "الاسم",
    "contact.form.email": "البريد الإلكتروني",
    "contact.form.message": "الرسالة",
    "contact.form.submit": "إرسال الرسالة"
  }
}

export function getTranslation(key: TranslationKey, language: Language): string {
  return translations[language][key]
} 