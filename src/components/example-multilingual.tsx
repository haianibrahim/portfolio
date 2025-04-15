'use client';

import React from 'react';
import { useLanguage } from '@/contexts/language-context';
import { useDirectionalClass } from '@/lib/rtl-utils';
import { LanguageToggle } from './language-toggle';
import { cn } from '@/lib/utils';

export function ExampleMultilingual() {
  const { t, dir, language } = useLanguage();
  
  // Example of using directional classes
  const titleMargin = useDirectionalClass('ml-2', 'mr-2');
  
  return (
    <div className={cn(
      "p-4 rounded-lg bg-card", 
      dir === "rtl" ? "text-right" : "text-left"
    )}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{t('welcome')}</h2>
        <div className="flex items-center">
          <span className="mr-2">Language: {language}</span>
          <span className="mr-2">Direction: {dir}</span>
          <LanguageToggle />
        </div>
      </div>
      
      <p className="mb-4">{t('welcome_description')}</p>
      
      <div className="mt-4">
        <h3 className={cn("text-lg font-semibold", titleMargin)}>{t('about_me')}</h3>
        <p>{t('about_description')}</p>
      </div>
      
      <div className="mt-4 flex flex-col space-y-2">
        <div className="flex items-center">
          <span className="font-medium">{t('home')}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium">{t('about')}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium">{t('projects')}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium">{t('contact')}</span>
        </div>
      </div>
      
      <button 
        className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        {t('get_in_touch')}
      </button>
    </div>
  );
} 