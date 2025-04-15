"use client"

import React, { useRef } from "react"
import { useAnime } from "@/hooks/use-anime"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { language } = useLanguage()
  const footerRef = useRef<HTMLElement>(null)
  
  useAnime({
    targets: footerRef.current,
    translateY: [20, 0],
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 800,
    delay: 200
  })

  return (
    <footer 
      ref={footerRef}
      className="border-t py-6"
      style={{ backgroundColor: 'hsl(var(--background))' }}
    >
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
          &copy; {new Date().getFullYear()} {language === 'en' ? 'Haian Ibrahim. All rights reserved.' : (
            <span className="arabic-text">حيان ابراهيم. جميع الحقوق محفوظة.</span>
          )}
        </p>
        <p className="text-center text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {language === 'en' ? 'Built with NextJS and TailwindCSS' : (
            <span className="arabic-text">تم البناء باستخدام NextJS و TailwindCSS</span>
          )}
        </p>
      </div>
    </footer>
  )
} 