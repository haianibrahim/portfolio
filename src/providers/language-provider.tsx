'use client';

import React from 'react';
import { LanguageProvider as LangProvider } from '@/contexts/language-context';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return <LangProvider>{children}</LangProvider>;
} 