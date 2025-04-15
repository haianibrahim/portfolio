import { Language } from '@/contexts/language-context';

export type TranslationKeys = 
  | 'home'
  | 'about'
  | 'projects'
  | 'contact'
  | 'skills'
  | 'experience'
  | 'education'
  | 'download_cv'
  | 'name'
  | 'email'
  | 'message'
  | 'send'
  | 'welcome'
  | 'welcome_description'
  | 'about_me'
  | 'about_description'
  | 'view_project'
  | 'get_in_touch'
  | 'hero.title'
  | 'hero.subtitle'
  | 'hero.contact_me'
  | 'hero.view_projects'
  | 'skills.title'
  | 'skills.subtitle'
  | 'projects.title'
  | 'projects.subtitle'
  | 'projects.view'
  | 'projects.github'
  | 'contact.title'
  | 'contact.subtitle'
  | 'contact.submit';

export type Translations = Record<TranslationKeys, string>;

export const translations: Record<Language, Translations> = {
  en: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    contact: 'Contact',
    skills: 'Skills',
    experience: 'Experience',
    education: 'Education',
    download_cv: 'Download CV',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send',
    welcome: 'Welcome to my portfolio',
    welcome_description: 'I build responsive and accessible web applications',
    about_me: 'About Me',
    about_description: 'I am a passionate developer focused on creating beautiful, functional websites and applications.',
    view_project: 'View Project',
    get_in_touch: 'Get in touch',
    'hero.title': 'Full Stack Developer',
    'hero.subtitle': 'With 8 years of experience in web and mobile development, I specialize in creating performant, accessible, and user-friendly applications.',
    'hero.contact_me': 'Contact Me',
    'hero.view_projects': 'View Projects',
    'skills.title': 'Technical Skills',
    'skills.subtitle': 'Technologies I work with',
    'projects.title': 'Projects',
    'projects.subtitle': 'Some of my recent work',
    'projects.view': 'View Project',
    'projects.github': 'GitHub',
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'I\'m currently available for freelance work. Feel free to reach out if you have a project in mind!',
    'contact.submit': 'Send Message'
  },
  ar: {
    home: 'الرئيسية',
    about: 'نبذة عني',
    projects: 'المشاريع',
    contact: 'اتصل بي',
    skills: 'المهارات',
    experience: 'الخبرة',
    education: 'التعليم',
    download_cv: 'تحميل السيرة الذاتية',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    message: 'الرسالة',
    send: 'إرسال',
    welcome: 'مرحبا بك في ملف أعمالي',
    welcome_description: 'أقوم ببناء تطبيقات ويب متجاوبة وسهلة الوصول',
    about_me: 'نبذة عني',
    about_description: 'أنا مطور متحمس يركز على إنشاء مواقع وتطبيقات جميلة وعملية.',
    view_project: 'عرض المشروع',
    get_in_touch: 'تواصل معي',
    'hero.title': 'مطور ويب متكامل',
    'hero.subtitle': 'مع 8 سنوات من الخبرة في تطوير الويب والموبايل، أنا متخصص في إنشاء تطبيقات سريعة وسهلة الاستخدام.',
    'hero.contact_me': 'اتصل بي',
    'hero.view_projects': 'عرض المشاريع',
    'skills.title': 'المهارات التقنية',
    'skills.subtitle': 'التقنيات التي أعمل بها',
    'projects.title': 'المشاريع',
    'projects.subtitle': 'بعض أعمالي الحديثة',
    'projects.view': 'عرض المشروع',
    'projects.github': 'Github',
    'contact.title': 'تواصل معي',
    'contact.subtitle': 'أنا متاح حاليًا للعمل الحر. لا تتردد في التواصل إذا كان لديك مشروع في ذهنك!',
    'contact.submit': 'إرسال الرسالة'
  }
}; 