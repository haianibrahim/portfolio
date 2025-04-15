'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { translations, Translations } from '@/i18n/translations';

export type Language = 'en' | 'ar';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: string) => void;
  t: (key: keyof Translations) => string;
  dir: 'ltr' | 'rtl';
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with English as default
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  // Only run once on mount to set initial language
  useEffect(() => {
    // Check for saved language preference in localStorage
    const savedLang = localStorage.getItem('language') as Language;
    console.log('Initial language from localStorage:', savedLang);
    
    if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
      setLanguage(savedLang);
      console.log('Setting initial language to:', savedLang);
    } else {
      // Explicitly set to English if no saved preference
      localStorage.setItem('language', 'en');
      console.log('No saved language, defaulting to English');
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('language', language);
      
      // Fix: Set document direction for RTL support - Arabic uses RTL, English uses LTR
      const dir = language === 'ar' ? 'rtl' : 'ltr';
      console.log(`Setting direction to ${dir} for language ${language}`);
      document.documentElement.dir = dir;
      
      // Add appropriate lang attribute
      document.documentElement.lang = language;
      console.log('Language updated to:', language);
    }
  }, [language, mounted]);

  const handleSetLanguage = (lang: string) => {
    console.log('Language switch requested to:', lang);
    if (lang === 'en' || lang === 'ar') {
      setLanguage(lang as Language);
    }
  };

  // Translation function
  const t = (key: keyof Translations): string => {
    const translatedText = translations[language][key] || key;
    // console.log(`Translating ${key} to: ${translatedText} (${language})`);
    return translatedText;
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t,
    dir: language === 'ar' ? 'rtl' : 'ltr' as 'ltr' | 'rtl',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 