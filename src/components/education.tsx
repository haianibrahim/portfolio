"use client"

import React, { useRef, useEffect, useState } from "react"
import { animate } from "animejs"
import { useLanguage } from "@/contexts/language-context"

export function Education() {
  const { t, language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [activeTab, setActiveTab] = useState<'education' | 'experience' | 'languages'>('education')
  const tabIndicatorRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<Record<string, HTMLButtonElement | null>>({
    education: null,
    experience: null,
    languages: null,
  })
  
  useEffect(() => {
    if (!headingRef.current) return
    
    animate(headingRef.current, {
      translateY: [30, 0],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 800,
      delay: 100
    })
  }, [])
  
  useEffect(() => {
    if (!sectionRef.current) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(".tab-content-active", {
              translateY: [20, 0],
              opacity: [0, 1],
              easing: "easeOutExpo",
              duration: 800,
            })
            
            animate(".active-indicator", {
              scaleX: [0, 1],
              easing: "easeInOutQuad",
              duration: 500
            })
            
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )
    
    observer.observe(sectionRef.current)
    
    return () => {
      observer.disconnect()
    }
  }, [])

  // Animation when changing tabs
  useEffect(() => {
    animate(".tab-content-active", {
      translateY: [20, 0],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 400,
    })
    
    // Target the active indicator element specifically
    animate(".active-indicator", {
      scaleX: [0, 1],
      easing: "easeInOutQuad",
      duration: 300
    })
  }, [activeTab])

  // Update tab indicator position when tab changes
  useEffect(() => {
    const updateIndicator = () => {
      const activeTabElement = tabsRef.current[activeTab]
      const indicator = tabIndicatorRef.current
      
      if (activeTabElement && indicator) {
        const tabRect = activeTabElement.getBoundingClientRect()
        indicator.style.width = `${tabRect.width}px`
        indicator.style.transform = `translateX(${activeTabElement.offsetLeft}px)`
      }
    }

    updateIndicator()
    window.addEventListener("resize", updateIndicator)
    return () => window.removeEventListener("resize", updateIndicator)
  }, [activeTab])

  return (
    <section id="education" ref={sectionRef} className="py-12 md:py-16 lg:py-20 bg-muted/30">
      <div className="container">
        <h2 
          ref={headingRef}
          className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl"
        >
          {t('education')} & {t('experience')}
        </h2>
        
        {/* Tab navigation */}
        <div className="mx-auto max-w-3xl mb-8">
          <div className="relative flex justify-center space-x-4 border-b pb-[2px]">
            <button
              ref={el => { tabsRef.current.education = el; }}
              onClick={() => setActiveTab("education")}
              className={`flex cursor-pointer items-center gap-2 px-4 py-2 text-sm font-medium transition-colors sm:text-base ${
                activeTab === "education"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
              </svg>
              {t("tabs.education")}
            </button>
            <button
              ref={el => { tabsRef.current.experience = el; }}
              onClick={() => setActiveTab("experience")}
              className={`flex cursor-pointer items-center gap-2 px-4 py-2 text-sm font-medium transition-colors sm:text-base ${
                activeTab === "experience"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
              {t("tabs.experience")}
            </button>
            <button
              ref={el => { tabsRef.current.languages = el; }}
              onClick={() => setActiveTab("languages")}
              className={`flex cursor-pointer items-center gap-2 px-4 py-2 text-sm font-medium transition-colors sm:text-base ${
                activeTab === "languages"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 8l6 6"/>
                <path d="M4 14l6-6 2-3"/>
                <path d="M2 5h12"/>
                <path d="M7 2h1"/>
                <path d="M22 22l-5-10-5 10"/>
                <path d="M14 18h6"/>
              </svg>
              {t("tabs.languages")}
            </button>
            <div
              ref={tabIndicatorRef}
              className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-in-out"
            />
          </div>
        </div>
        
        {/* Education Tab Content */}
        <div className={`mx-auto max-w-3xl ${activeTab === 'education' ? 'block tab-content-active' : 'hidden'}`}>
          <div className="rounded-lg border shadow-sm overflow-hidden" style={{ backgroundColor: 'hsl(var(--card))' }}>
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full" style={{ backgroundColor: 'hsl(var(--primary) / 0.1)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'hsl(var(--primary))' }}>
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">
                  <span className={language === 'ar' ? 'arabic-text' : ''}>
                    {t('edu.degree')}
                  </span>
                </h3>
              </div>
              <div className="ps-13 ms-7 border-s-2 border-primary/20 py-1">
                <p className="text-base mb-2" style={{ color: 'hsl(var(--foreground))' }}>
                  <span className={language === 'ar' ? 'arabic-text' : ''}>
                    {t('edu.department')}
                  </span>
                </p>
                <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  <span className={language === 'ar' ? 'arabic-text' : ''}>
                    {t('edu.location')}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Experience Tab Content */}
        <div className={`mx-auto max-w-3xl ${activeTab === 'experience' ? 'block tab-content-active' : 'hidden'}`}>
          <div className="rounded-lg border shadow-sm overflow-hidden" style={{ backgroundColor: 'hsl(var(--card))' }}>
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full" style={{ backgroundColor: 'hsl(var(--primary) / 0.1)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'hsl(var(--primary))' }}>
                    <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    <span className={language === 'ar' ? 'arabic-text' : ''}>
                      {t('exp.position')}
                    </span>
                  </h3>
                  <p className="text-sm font-medium mt-1" style={{ color: 'hsl(var(--primary))' }}>
                    <span className={language === 'ar' ? 'arabic-text' : ''}>
                      {t('exp.years')}
                    </span>
                  </p>
                </div>
              </div>
              <div className="ps-13 ms-7 border-s-2 border-primary/20 py-1">
                <p className="text-base mb-2" style={{ color: 'hsl(var(--foreground))' }}>
                  <span className={language === 'ar' ? 'arabic-text' : ''}>
                    {t('exp.specialization')}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Languages Tab Content */}
        <div className={`mx-auto max-w-3xl ${activeTab === 'languages' ? 'block tab-content-active' : 'hidden'}`}>
          <div className="rounded-lg border shadow-sm overflow-hidden" style={{ backgroundColor: 'hsl(var(--card))' }}>
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full" style={{ backgroundColor: 'hsl(var(--primary) / 0.1)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'hsl(var(--primary))' }}>
                    <path d="M5 8l6 6"/>
                    <path d="M4 14l6-6 2-3"/>
                    <path d="M2 5h12"/>
                    <path d="M7 2h1"/>
                    <path d="M22 22l-5-10-5 10"/>
                    <path d="M14 18h6"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">
                  <span className={language === 'ar' ? 'arabic-text' : ''}>
                    {t('lang.title')}
                  </span>
                </h3>
              </div>
              
              <div className="space-y-6">
                {/* English */}
                <div className="ps-13 ms-7 border-s-2 border-primary/20 py-1">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">
                      <span className={language === 'ar' ? 'arabic-text' : ''}>
                        {t('lang.english')}
                      </span>
                    </h4>
                    <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}>
                      {language === 'en' ? t('lang.fluent') : 
                       <span className="arabic-text">{t('lang.fluent')}</span>}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[90%] bg-primary/80 rounded-full"></div>
                  </div>
                </div>
                
                {/* Arabic */}
                <div className="ps-13 ms-7 border-s-2 border-primary/20 py-1">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">
                      <span className={language === 'ar' ? 'arabic-text' : ''}>
                        {t('lang.arabic')}
                      </span>
                    </h4>
                    <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}>
                      {language === 'en' ? t('lang.native') : 
                       <span className="arabic-text">{t('lang.native')}</span>}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-full bg-primary/80 rounded-full"></div>
                  </div>
                </div>
                
                {/* German */}
                <div className="ps-13 ms-7 border-s-2 border-primary/20 py-1">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">
                      <span className={language === 'ar' ? 'arabic-text' : ''}>
                        {t('lang.german')}
                      </span>
                    </h4>
                    <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}>
                      {language === 'en' ? t('lang.a1') : 
                       <span className="arabic-text">{t('lang.a1')}</span>}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[20%] bg-primary/80 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 