'use client';

import { useRef } from 'react';
import { useAnime as useAnimeOriginal } from './use-anime';

/**
 * Adapter hook that provides button animation functionality
 * Compatible with the language-toggle component
 */
export function useAnime() {
  const refs = useRef<HTMLButtonElement>(null);
  
  // Use the original hook but don't rely on its return value
  useAnimeOriginal({
    targets: refs.current,
    scale: [0.8, 1],
    opacity: [0, 1],
    duration: 300
  });
  
  const animate = () => {
    if (refs.current) {
      refs.current.classList.add('animate-wiggle');
      
      const handleAnimationEnd = () => {
        refs.current?.classList.remove('animate-wiggle');
        refs.current?.removeEventListener('animationend', handleAnimationEnd);
      };
      
      refs.current.addEventListener('animationend', handleAnimationEnd);
    }
  };

  // For backwards compatibility with existing language-toggle
  return { 
    animeRef: refs,
    refs,
    animeInstance: null,
    animate 
  };
} 