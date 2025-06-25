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
  | 'skillsDescription'
  | 'backend'
  | 'frontend'
  | 'mobile'
  | 'database'
  | 'tools'
  | 'others'
  | 'projects.title'
  | 'projects.subtitle'
  | 'projects.view'
  | 'projects.github'
  | 'projects.working_on'
  | 'projects.open_source'
  | 'contact.title'
  | 'contact.subtitle'
  | 'contact.submit'
  | 'contact.email'
  | 'contact.contact_form'
  | 'contact.connect'
  | 'contact.send_message'
  | 'contact.linkedin'
  | 'contact.address'
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
  | 'lang.fluent'
  | 'lang.native'
  | 'lang.a1'
  | 'tabs.education'
  | 'tabs.experience'
  | 'tabs.languages'
  | 'nav.logo'
  | 'nav.about'
  | 'nav.education'
  | 'nav.projects'
  | 'nav.contact';

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
    'skillsDescription': 'Technologies and tools I use in my projects',
    'backend': 'Backend',
    'frontend': 'Frontend',
    'mobile': 'Mobile',
    'database': 'Database',
    'tools': 'Tools',
    'others': 'Others',
    'projects.title': 'Projects',
    'projects.subtitle': 'Some of my recent work',
    'projects.view': 'View Project',
    'projects.github': 'GitHub',
    'projects.working_on': 'Working On',
    'projects.open_source': 'Open Source, Educational and Side Projects',
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'I\'m currently available for freelance work. Feel free to reach out if you have a project in mind!',
    'contact.submit': 'Send Message',
    'contact.email': 'Email',
    'contact.contact_form': 'Contact Form',
    'contact.connect': 'Connect with me',
    'contact.send_message': 'Send me a message',
    'contact.linkedin': 'LinkedIn',
    'contact.address': 'Address',
    'edu.title': 'Education',
    'edu.degree': 'Bachelor of Applied Science',
    'edu.department': 'Faculty of Applied Science, Computer Technology Department, Tishreen University',
    'edu.location': 'Latakia, Syria',
    'exp.title': 'Experience',
    'exp.position': 'Freelance Full Stack Developer',
    'exp.years': '8+ years of experience',
    'exp.specialization': 'Specialized in developing web applications using JavaScript, Node.js, React.js, and various databases.',
    'lang.title': 'Languages',
    'lang.english': 'English',
    'lang.arabic': 'Arabic',
    'lang.german': 'German',
    'lang.fluent': 'Fluent',
    'lang.native': 'Native',
    'lang.a1': 'A1',
    'tabs.education': 'Education',
    'tabs.experience': 'Experience',
    'tabs.languages': 'Languages',
    'nav.logo': 'Ahmad',
    'nav.about': 'About',
    'nav.education': 'Education',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
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
    'skillsDescription': 'التقنيات والأدوات التي أستخدمها في مشاريعي',
    'backend': 'الواجهة الخلفية',
    'frontend': 'الواجهة الأمامية',
    'mobile': 'الجوال',
    'database': 'قواعد البيانات',
    'tools': 'الأدوات',
    'others': 'أخرى',
    'projects.title': 'المشاريع',
    'projects.subtitle': 'بعض أعمالي الحديثة',
    'projects.view': 'عرض المشروع',
    'projects.github': 'Github',
    'projects.working_on': 'أعمل عليها حاليًا',
    'projects.open_source': 'مشاريع مفتوحة المصدر وتعليمية وجانبية',
    'contact.title': 'تواصل معي',
    'contact.subtitle': 'أنا متاح حاليًا للعمل الحر. لا تتردد في التواصل إذا كان لديك مشروع في ذهنك!',
    'contact.submit': 'إرسال الرسالة',
    'contact.email': 'البريد الإلكتروني',
    'contact.contact_form': 'نموذج الاتصال',
    'contact.connect': 'تواصل معي',
    'contact.send_message': 'أرسل لي رسالة',
    'contact.linkedin': 'لينكد إن',
    'contact.address': 'العنوان',
    'edu.title': 'التعليم',
    'edu.degree': 'بكالوريوس في العلوم التطبيقية',
    'edu.department': 'كلية العلوم التطبيقية، قسم تقنيات الحاسوب، جامعة تشرين',
    'edu.location': 'اللاذقية، سوريا',
    'exp.title': 'الخبرة',
    'exp.position': 'مطور ويب متكامل - عمل حر',
    'exp.years': '+8 سنوات من الخبرة',
    'exp.specialization': 'متخصص في تطوير تطبيقات الويب باستخدام جافاسكريبت، نود جي إس، رياكت، وقواعد بيانات متنوعة.',
    'lang.title': 'اللغات',
    'lang.english': 'الإنجليزية',
    'lang.arabic': 'العربية',
    'lang.german': 'الألمانية',
    'lang.fluent': 'طلاقة',
    'lang.native': 'اللغة الأم',
    'lang.a1': 'مستوى A1',
    'tabs.education': 'التعليم',
    'tabs.experience': 'الخبرة',
    'tabs.languages': 'اللغات',
    'nav.logo': 'أحمد',
    'nav.about': 'نبذة عني',
    'nav.education': 'التعليم',
    'nav.projects': 'المشاريع',
    'nav.contact': 'اتصل بي',
  }
}; 