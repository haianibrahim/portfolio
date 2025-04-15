'use client';

import { useRef } from 'react';

export function useAnime() {
  const animeRef = useRef<HTMLButtonElement>(null);

  const animate = () => {
    if (animeRef.current) {
      const node = animeRef.current;
      node.classList.add('animate-wiggle');
      
      const handleAnimationEnd = () => {
        node.classList.remove('animate-wiggle');
        node.removeEventListener('animationend', handleAnimationEnd);
      };
      
      node.addEventListener('animationend', handleAnimationEnd);
    }
  };

  return { animeRef, animate };
} 