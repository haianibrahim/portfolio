"use client"

import React, { useRef, useEffect, useState } from "react"
import { animate } from "animejs"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function Education() {
  const { t, language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [activeTab, setActiveTab] = useState<'education' | 'experience' | 'languages'>('education')
  
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
          <div className="mb-6 flex w-full justify-center border-b">
            <button
              onClick={() => setActiveTab("education")}
              className={cn(
                "relative pb-2 text-sm font-medium transition-colors focus-visible:outline-none",
                activeTab === "education"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-current={activeTab === "education" ? "page" : undefined}
            >
              {t("tabs.education")}
              {activeTab === "education" && (
                <motion.span
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("experience")}
              className={cn(
                "relative mx-8 pb-2 text-sm font-medium transition-colors focus-visible:outline-none",
                activeTab === "experience"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-current={activeTab === "experience" ? "page" : undefined}
            >
              {t("tabs.experience")}
              {activeTab === "experience" && (
                <motion.span
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("languages")}
              className={cn(
                "relative pb-2 text-sm font-medium transition-colors focus-visible:outline-none",
                activeTab === "languages"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-current={activeTab === "languages" ? "page" : undefined}
            >
              {t("tabs.languages")}
              {activeTab === "languages" && (
                <motion.span
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </button>
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
                      {language === 'en' ? 'Fluent' : 
                       <span className="arabic-text">طلاقة</span>}
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
                      {language === 'en' ? 'Native' : 
                       <span className="arabic-text">اللغة الأم</span>}
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
                      {language === 'en' ? 'A1' : 
                       <span className="arabic-text">مستوى A1</span>}
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