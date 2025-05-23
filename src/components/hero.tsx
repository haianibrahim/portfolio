"use client"

import React, { useRef } from "react"
import { useAnime } from "@/hooks/use-anime"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context" 

export function Hero() {
  const { t, language } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  
  useAnime({
    targets: containerRef.current,
    opacity: [0, 1],
    duration: 1200,
    easing: 'easeInOutQuad',
    delay: 900
  })
  
  useAnime({
    targets: textRef.current,
    translateY: ['50px', '0px'],
    opacity: [0, 1],
    duration: 1200,
    easing: 'easeOutExpo',
    delay: 1100
  })
  
  useAnime({
    targets: subtitleRef.current,
    translateY: ['30px', '0px'],
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeOutExpo',
    delay: 1300
  })
  
  useAnime({
    targets: imageRef.current,
    scale: [0.8, 1],
    opacity: [0, 1],
    duration: 1600,
    easing: 'easeOutElastic(1, .6)',
    delay: 1500
  })

  useAnime({
    targets: textContainerRef.current,
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeInOutQuad',
    delay: 1000
  })

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      // Get header height to offset scrolling position
      const header = document.querySelector('header')
      const headerHeight = header?.offsetHeight || 0
      
      const topPosition = section.offsetTop - headerHeight
      
      window.scrollTo({
        top: topPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section ref={containerRef} className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto grid items-center gap-8 md:grid-cols-2">
        <div 
          ref={imageRef} 
          className="mx-auto flex items-center justify-center md:order-2 md:mx-0"
        >
          <div className="relative aspect-square h-60 w-60 overflow-hidden rounded-full border-2 md:h-80 md:w-80"
            style={{ borderColor: 'hsl(var(--primary) / 0.2)' }}
          >
            <Image
              src="/photo.jpg"
              alt={language === 'en' ? 'Haian Ibrahim' : 'حيان ابراهيم'}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div ref={textContainerRef} className="flex flex-col gap-4 md:order-1">
          <h1 
            ref={textRef} 
            className="font-heading text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl"
          >
            <span style={{ 
              background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--primary) / 0.7))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {language === 'en' ? 'Haian Ibrahim' : (
                <span className="arabic-text">حيان ابراهيم</span>
              )}
            </span>
            <br />
            {t('hero.title')}
          </h1>
          <p 
            ref={subtitleRef} 
            className="max-w-[600px] md:text-lg"
            style={{ color: 'hsl(var(--muted-foreground))' }}
          >
            {t('hero.subtitle')}
          </p>
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex h-10 items-center justify-center rounded-md px-6 text-sm font-medium shadow transition-colors cursor-pointer gap-2"
              style={{ 
                backgroundColor: 'hsl(var(--primary))', 
                color: 'hsl(var(--primary-foreground))' 
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              {t('hero.contact_me')}
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="inline-flex h-10 items-center justify-center rounded-md border px-6 text-sm font-medium shadow-sm transition-colors cursor-pointer gap-2"
              style={{ 
                backgroundColor: 'hsl(var(--background))', 
                borderColor: 'hsl(var(--border))' 
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                <path d="M9 3v6" />
                <path d="M15 3v6" />
              </svg>
              {t('hero.view_projects')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 