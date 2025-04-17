"use client"

import * as React from "react"
import Link from "next/link"
import { useAnime } from "@/hooks/use-anime"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"

export function Header() {
  const headerRef = React.useRef<HTMLElement>(null)
  const logoRef = React.useRef<HTMLDivElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const { t, language } = useLanguage()
  
  useAnime({
    targets: headerRef.current,
    translateY: ['-100%', '0%'],
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutExpo',
    delay: 300
  })
  
  useAnime({
    targets: logoRef.current,
    translateX: ['-50px', '0'],
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeOutElastic(1, .6)',
    delay: 800
  })

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false)
    
    // Find section element
    const section = document.getElementById(sectionId)
    if (section) {
      // Calculate header height to adjust scroll position
      const headerHeight = headerRef.current?.offsetHeight || 0
      const topPosition = section.offsetTop - headerHeight
      
      // Scroll to section with offset
      window.scrollTo({
        top: topPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <header 
      ref={headerRef}
      className="sticky top-0 z-40 border-b backdrop-blur"
      style={{ backgroundColor: 'hsl(var(--background) / 0.8)' }}
    >
      <div className="container flex h-16 items-center justify-between">
        <div ref={logoRef} className="font-medium">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold" style={{ 
              background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--primary) / 0.7))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {language === 'en' ? 'Haian Ibrahim' : (
                <span className="arabic-text">حيان ابراهيم</span>
              )}
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center cursor-pointer"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="size-6"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <button 
            onClick={() => scrollToSection('skills')}
            className="font-medium transition-colors hover:text-[hsl(var(--primary))] cursor-pointer"
          >
            {t('skills')}
          </button>
          <button 
            onClick={() => scrollToSection('education')}
            className="font-medium transition-colors hover:text-[hsl(var(--primary))] cursor-pointer"
          >
            {t('education')}
          </button>
          <button 
            onClick={() => scrollToSection('projects')}
            className="font-medium transition-colors hover:text-[hsl(var(--primary))] cursor-pointer"
          >
            {t('projects')}
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="font-medium transition-colors hover:text-[hsl(var(--primary))] cursor-pointer"
          >
            {t('contact')}
          </button>
          <div className="flex items-center gap-2 pl-2">
            <LanguageToggle className="bg-card hover:bg-accent border" />
            <ThemeToggle />
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden border-t"
          style={{ backgroundColor: 'hsl(var(--background) / 0.95)' }}
        >
          <nav className="container flex flex-col py-4">
            <button 
              className="py-3 font-medium text-left transition-colors hover:text-[hsl(var(--primary))] cursor-pointer"
              onClick={() => scrollToSection('skills')}
            >
              {t('skills')}
            </button>
            <button 
              className="py-3 font-medium text-left transition-colors hover:text-[hsl(var(--primary))] cursor-pointer"
              onClick={() => scrollToSection('education')}
            >
              {t('education')}
            </button>
            <button 
              className="py-3 font-medium text-left transition-colors hover:text-[hsl(var(--primary))] cursor-pointer"
              onClick={() => scrollToSection('projects')}
            >
              {t('projects')}
            </button>
            <button 
              className="py-3 font-medium text-left transition-colors hover:text-[hsl(var(--primary))] cursor-pointer"
              onClick={() => scrollToSection('contact')}
            >
              {t('contact')}
            </button>
            <div className="py-3 flex items-center gap-2">
              <LanguageToggle className="bg-card hover:bg-accent border" />
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
} 