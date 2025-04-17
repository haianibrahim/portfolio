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
  | 'contact.submit'
  | 'websiteMetadata.title'
  | 'websiteMetadata.description'
  | 'edu.title'
  | 'edu.degree'
  | 'edu.department'
  | 'edu.location'
  | 'exp.title'
  | 'exp.position'
  | 'exp.years'
  | 'exp.specialization'
  | 'lang.title'
  | 'lang.english'
  | 'lang.arabic'
  | 'lang.german'
  | 'tabs.education'
  | 'tabs.experience'
  | 'tabs.languages';

export type Translations = {
  [key in TranslationKeys]: string;
};

export const translations: Record<Language, Translations> = {
  en: {
    'websiteMetadata.title': 'My Portfolio',
    'websiteMetadata.description': 'My personal portfolio website',
    'home': 'Home',
    'about': 'About',
    'projects': 'Projects',
    'contact': 'Contact',
    'skills': 'Skills',
    'experience': 'Experience',
    'education': 'Education',
    'download_cv': 'Download CV',
    'name': 'Name',
    'email': 'Email',
    'message': 'Message',
    'send': 'Send',
    'welcome': 'Welcome to my portfolio',
    'welcome_description': 'I build responsive and accessible web applications',
    'about_me': 'About Me',
    'about_description': 'I am a passionate developer focused on creating beautiful, functional websites and applications.',
    'view_project': 'View Project',
    'get_in_touch': 'Get in touch',
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
    'contact.submit': 'Send Message',
    'edu.title': 'Education',
    'edu.degree': 'Bachelor of Applied Science',
    'edu.department': 'Computer Technology Department, Tishreen University',
    'edu.location': 'Latakia, Syria',
    'exp.title': 'Experience',
    'exp.position': 'Freelance Full Stack Developer',
    'exp.years': '8+ years of experience',
    'exp.specialization': 'Specialized in developing web applications using JavaScript, Node.js, React.js, and various databases.',
    'lang.title': 'Languages',
    'lang.english': 'English',
    'lang.arabic': 'Arabic',
    'lang.german': 'German',
    'tabs.education': 'Education',
    'tabs.experience': 'Experience',
    'tabs.languages': 'Languages',
  },
  ar: {
    'websiteMetadata.title': 'معرض أعمالي',
    'websiteMetadata.description': 'موقع معرض أعمالي الشخصي',
    'home': 'الرئيسية',
    'about': 'نبذة عني',
    'projects': 'المشاريع',
    'contact': 'اتصل بي',
    'skills': 'المهارات',
    'experience': 'الخبرة',
    'education': 'التعليم',
    'download_cv': 'تحميل السيرة الذاتية',
    'name': 'الاسم',
    'email': 'البريد الإلكتروني',
    'message': 'الرسالة',
    'send': 'إرسال',
    'welcome': 'مرحبا بك في ملف أعمالي',
    'welcome_description': 'أقوم ببناء تطبيقات ويب متجاوبة وسهلة الوصول',
    'about_me': 'نبذة عني',
    'about_description': 'أنا مطور متحمس يركز على إنشاء مواقع وتطبيقات جميلة وعملية.',
    'view_project': 'عرض المشروع',
    'get_in_touch': 'تواصل معي',
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
    'contact.submit': 'إرسال الرسالة',
    'edu.title': 'التعليم',
    'edu.degree': 'بكالوريوس في العلوم التطبيقية',
    'edu.department': 'الكلية التطبيقية، قسم تقنيات الحاسوب، جامعة تشرين',
    'edu.location': 'اللاذقية، سوريا',
    'exp.title': 'الخبرة',
    'exp.position': 'مطور ويب متكامل - عمل حر',
    'exp.years': '+8 سنوات من الخبرة',
    'exp.specialization': 'متخصص في تطوير تطبيقات الويب باستخدام جافاسكريبت، نود جي إس، رياكت، وقواعد بيانات متنوعة.',
    'lang.title': 'اللغات',
    'lang.english': 'الإنجليزية',
    'lang.arabic': 'العربية',
    'lang.german': 'الألمانية',
    'tabs.education': 'التعليم',
    'tabs.experience': 'الخبرة',
    'tabs.languages': 'اللغات',
  }
}; 