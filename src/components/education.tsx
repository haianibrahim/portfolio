"use client"

import React, { useRef, useEffect, useState } from "react"
import { animate } from "animejs"
import { useLanguage } from "@/contexts/language-context"

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

  const handleTabChange = (tab: 'education' | 'experience' | 'languages') => {
    setActiveTab(tab)
  }

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
          <div className="flex flex-wrap justify-center border-b">
            <button 
              onClick={() => handleTabChange('education')}
              className={`relative px-6 py-3 font-medium text-sm md:text-base transition-all ${
                activeTab === 'education' 
                  ? 'text-primary font-semibold bg-primary/5' 
                  : 'hover:text-primary/70 hover:bg-primary/5'
              }`}
              aria-selected={activeTab === 'education'}
            >
              {t('education')}
              {/* Always show indicator, but style it differently based on active state */}
              <div className={`absolute bottom-0 left-0 w-full h-1 ${
                activeTab === 'education' 
                  ? 'bg-primary active-indicator' 
                  : 'bg-transparent'
              }`} style={{ 
                transform: activeTab === 'education' ? 'none' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'background-color 0.2s ease'
              }}></div>
            </button>
            <button 
              onClick={() => handleTabChange('experience')}
              className={`relative px-6 py-3 font-medium text-sm md:text-base transition-all ${
                activeTab === 'experience' 
                  ? 'text-primary font-semibold bg-primary/5' 
                  : 'hover:text-primary/70 hover:bg-primary/5'
              }`}
              aria-selected={activeTab === 'experience'}
            >
              {t('experience')}
              {/* Always show indicator, but style it differently based on active state */}
              <div className={`absolute bottom-0 left-0 w-full h-1 ${
                activeTab === 'experience' 
                  ? 'bg-primary active-indicator' 
                  : 'bg-transparent'
              }`} style={{ 
                transform: activeTab === 'experience' ? 'none' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'background-color 0.2s ease'
              }}></div>
            </button>
            <button 
              onClick={() => handleTabChange('languages')}
              className={`relative px-6 py-3 font-medium text-sm md:text-base transition-all ${
                activeTab === 'languages' 
                  ? 'text-primary font-semibold bg-primary/5' 
                  : 'hover:text-primary/70 hover:bg-primary/5'
              }`}
              aria-selected={activeTab === 'languages'}
            >
              {language === 'en' ? 'Languages' : language === 'de' ? 'Sprachen' : <span className="arabic-text">اللغات</span>}
              {/* Always show indicator, but style it differently based on active state */}
              <div className={`absolute bottom-0 left-0 w-full h-1 ${
                activeTab === 'languages' 
                  ? 'bg-primary active-indicator' 
                  : 'bg-transparent'
              }`} style={{ 
                transform: activeTab === 'languages' ? 'none' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'background-color 0.2s ease'
              }}></div>
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
                  {language === 'en' ? 'Bachelor of Applied Science' : 
                   language === 'de' ? 'Bachelor of Applied Science' : 
                   <span className="arabic-text">بكالوريوس في العلوم التطبيقية</span>}
                </h3>
              </div>
              <div className="pl-13 ml-7 border-l-2 border-primary/20 py-1">
                <p className="text-base mb-2" style={{ color: 'hsl(var(--foreground))' }}>
                  {language === 'en' ? 'Computer Technology Department, Tishreen University' : 
                   language === 'de' ? 'Abteilung für Computertechnologie, Tishreen-Universität' : 
                   <span className="arabic-text">قسم تكنولوجيا المعلومات، جامعة تشرين</span>}
                </p>
                <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {language === 'en' ? 'Latakia, Syria' : 
                   language === 'de' ? 'Latakia, Syrien' : 
                   <span className="arabic-text">اللاذقية، سوريا</span>}
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
                    {language === 'en' ? 'Freelance Full Stack Developer' : 
                     language === 'de' ? 'Freiberuflicher Full-Stack-Entwickler' : 
                     <span className="arabic-text">مطور ويب متكامل - عمل حر</span>}
                  </h3>
                  <p className="text-sm font-medium mt-1" style={{ color: 'hsl(var(--primary))' }}>
                    {language === 'en' ? '8+ years of experience' : 
                     language === 'de' ? '8+ Jahre Erfahrung' : 
                     <span className="arabic-text">+8 سنوات من الخبرة</span>}
                  </p>
                </div>
              </div>
              <div className="pl-13 ml-7 border-l-2 border-primary/20 py-1">
                <p className="text-base mb-2" style={{ color: 'hsl(var(--foreground))' }}>
                  {language === 'en' 
                    ? 'Specialized in building web and mobile applications using modern technologies like ReactJS, NextJS, Laravel, and more.'
                    : language === 'de'
                    ? 'Spezialisiert auf die Entwicklung von Web- und Mobilanwendungen mit modernen Technologien wie ReactJS, NextJS, Laravel und mehr.'
                    : (
                      <span className="arabic-text">متخصص في بناء تطبيقات الويب والهاتف المحمول باستخدام التقنيات الحديثة مثل ReactJS وNextJS وLaravel وغيرها.</span>
                    )}
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
                  {language === 'en' ? 'Language Proficiency' : 
                   language === 'de' ? 'Sprachkenntnisse' : 
                   <span className="arabic-text">إتقان اللغات</span>}
                </h3>
              </div>
              
              <div className="space-y-6">
                {/* English */}
                <div className="pl-13 ml-7">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">
                      {language === 'en' ? 'English' : 
                       language === 'de' ? 'Englisch' : 
                       <span className="arabic-text">الإنجليزية</span>}
                    </h4>
                    <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}>
                      {language === 'en' ? 'Fluent' : 
                       language === 'de' ? 'Fließend' : 
                       <span className="arabic-text">طلاقة</span>}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[90%] bg-primary/80 rounded-full"></div>
                  </div>
                </div>
                
                {/* Arabic */}
                <div className="pl-13 ml-7">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">
                      {language === 'en' ? 'Arabic' : 
                       language === 'de' ? 'Arabisch' : 
                       <span className="arabic-text">العربية</span>}
                    </h4>
                    <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}>
                      {language === 'en' ? 'Native' : 
                       language === 'de' ? 'Muttersprache' : 
                       <span className="arabic-text">اللغة الأم</span>}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-full bg-primary/80 rounded-full"></div>
                  </div>
                </div>
                
                {/* German */}
                <div className="pl-13 ml-7">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">
                      {language === 'en' ? 'German' : 
                       language === 'de' ? 'Deutsch' : 
                       <span className="arabic-text">الألمانية</span>}
                    </h4>
                    <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}>
                      {language === 'en' ? 'A1' : 
                       language === 'de' ? 'A1' : 
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