"use client"

import React, { useRef, useEffect } from "react"
import { animate } from "animejs"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

const projects = [
  {
    title: "WebPlayz",
    description: "Online Gaming Website",
    descriptionAr: "موقع ألعاب أون لاين",
    technologies: ["Laravel", "Tailwind CSS", "MySQL", "REST API"],
    link: "https://webplayzz.com"
  },
  {
    title: "WebPlayz API",
    description: "RESTful API for WebPlayz to integrate games in other websites, authenticated using API Key and access is only from allowed domains.",
    descriptionAr: "واجهة برمجة تطبيقات RESTful لـ WebPlayz لدمج الألعاب في مواقع أخرى، مصادقة باستخدام مفتاح API والوصول فقط من النطاقات المسموح بها.",
    technologies: ["Laravel", "Auth", "REST API"],
    link: "https://webplayzz.com/api-docs"
  },
  {
    title: "Zefoy Android App",
    description: "An app for TikTok Growth with +1M downloads",
    descriptionAr: "تطبيق لنمو متابعين تيك توك مع أكثر من مليون تحميل",
    technologies: ["Java", "JWT", "RESTful API", "Google Play In-App Billing API", "Subscriptions", "Android Studio"],
    link: "https://play.google.com/store/apps/details?id=com.hkiapps.zefoynew&utm_source=portfolio&utm_medium=haianporfolio&campaign=myprojects"
  },
  {
    title: "Zefoy App Backend",
    description: "Backend for the Zefoy Android App",
    descriptionAr: "الواجهة الخلفية لتطبيق زيفوي للأندرويد",
    technologies: ["Laravel 12", "Google Play Developer API", "JWT"],
    link: "https://play.google.com/store/apps/details?id=com.hkiapps.zefoynew&utm_source=portfolio&utm_medium=haianporfolio&campaign=myprojects"
  },
  {
    title: "TikTok PHP Scraper",
    description: "A Super Fast scraper using only PHP",
    descriptionAr: "أداة استخراج بيانات سريعة جدًا باستخدام PHP فقط",
    technologies: ["PHP", "Web Scraping", "Curl", "JSON", "DOM"],
    github: "https://github.com/hki98/tiktok-custom-php-scraper"
  },
  {
    title: "Movies Search App",
    description: "Educational project for searching movies",
    descriptionAr: "مشروع تعليمي للبحث عن الأفلام",
    technologies: ["React 19", "React Hooks", "Debouncing", "Tailwind CSS", "Appwrite", "NoSQL", "TMDB API"],
    link: "https://haian.me/demo/movies-app",
    github: "https://github.com/hki98/movies-search-app"
  }
]

export function Projects() {
  const { t, language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  
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
            animate(".project-card", {
              scale: [0.9, 1],
              opacity: [0, 1],
              translateY: [20, 0],
              easing: "easeOutExpo",
              duration: 800,
              delay: (_el, i: number) => i * 150
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
  
  // Improved hover animation using event delegation
  useEffect(() => {
    const handleMouseEnter = (event: Event) => {
      const card = (event.target as HTMLElement).closest(".project-card")
      if (!card) return
      
      // Set a data attribute to track hover state
      if (card.getAttribute('data-hovered') === 'true') return
      card.setAttribute('data-hovered', 'true')
      
      animate(card, {
        translateY: -10,
        boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
        duration: 300,
        easing: "easeOutQuad"
      })
      
      // Only animate the technologies list once per hover
      const technologiesList = card.querySelector(".technologies-list") as HTMLElement
      if (technologiesList) {
        // Make sure technologies are displayed immediately
        technologiesList.style.opacity = "1"
        technologiesList.style.transform = "translateY(0)"
      }
    }
    
    const handleMouseLeave = (event: Event) => {
      const card = (event.target as HTMLElement).closest(".project-card")
      if (!card) return
      
      // Reset hover state
      card.setAttribute('data-hovered', 'false')
      
      animate(card, {
        translateY: 0,
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        duration: 300,
        easing: "easeOutQuad"
      })
    }
    
    const projectsContainer = document.querySelector(".projects-container")
    if (projectsContainer) {
      projectsContainer.addEventListener("mouseenter", handleMouseEnter, true)
      projectsContainer.addEventListener("mouseleave", handleMouseLeave, true)
    }
    
    return () => {
      if (projectsContainer) {
        projectsContainer.removeEventListener("mouseenter", handleMouseEnter, true)
        projectsContainer.removeEventListener("mouseleave", handleMouseLeave, true)
      }
    }
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-12 md:py-16 lg:py-20">
      <div className="container">
        <h2 
          ref={headingRef}
          className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl"
        >
          {t('projects.title')}
        </h2>
        <div className="projects-container grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <div 
              key={project.title} 
              className="project-card flex flex-col rounded-xl border p-6 shadow-sm opacity-0 transition-all duration-300"
              data-hovered="false"
              style={{ backgroundColor: 'hsl(var(--card))' }}
            >
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="mt-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {language === 'ar' && project.descriptionAr ? (
                  <span className="arabic-text">{project.descriptionAr}</span>
                ) : (
                  project.description
                )}
              </p>
              
              <div className="technologies-list mt-4 flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span 
                    key={tech} 
                    className="rounded-full px-3 py-1 text-xs font-medium"
                    style={{ 
                      backgroundColor: 'hsl(var(--primary) / 0.1)', 
                      color: 'hsl(var(--primary))' 
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="rounded-full px-2 py-1 text-xs font-medium"
                    style={{ backgroundColor: 'hsl(var(--secondary))' }}
                  >
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
              
              <div className="mt-auto pt-4 flex gap-2">
                {project.link && (
                  <Link
                    href={project.link}
                    target="_blank"
                    className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium shadow transition-colors"
                    style={{ 
                      backgroundColor: 'hsl(var(--primary))', 
                      color: 'hsl(var(--primary-foreground))' 
                    }}
                  >
                    {t('projects.view')}
                  </Link>
                )}
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    className="inline-flex h-9 items-center justify-center rounded-md border px-4 text-sm font-medium shadow-sm transition-colors"
                    style={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      borderColor: 'hsl(var(--border))' 
                    }}
                  >
                    {t('projects.github')}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 