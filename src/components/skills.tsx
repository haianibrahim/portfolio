"use client"

import * as React from "react"
import { useAnime } from "@/hooks/use-anime"
import { useLanguage } from "@/contexts/language-context"
import { animate } from "animejs"

type SkillType = "backend" | "frontend" | "mobile" | "database" | "tools" | "others"

interface Skill {
  name: string
  type: SkillType
}

export function Skills() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const titleRef = React.useRef<HTMLDivElement>(null)
  const cardsRef = React.useRef<HTMLDivElement>(null)
  const { t, language } = useLanguage()

  useAnime({
    targets: titleRef.current,
    translateY: [50, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeOutExpo',
  })

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && cardsRef.current) {
          // Animate each card with staggered timing
          animate('.skill-card', {
            translateY: [50, 0],
            opacity: [0, 1],
            delay: (_el, i) => i * 100,
            duration: 800,
            easing: 'easeOutCubic',
          })
          // Disconnect after triggering the animation
          observer.disconnect()
        }
      })
    }, { threshold: 0.1 })

    if (cardsRef.current) {
      observer.observe(cardsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const skills: Skill[] = [
    // Backend
    { name: "PHP", type: "backend" },
    { name: "Node.js", type: "backend" },
    { name: "Express.js", type: "backend" },
    { name: "Laravel", type: "backend" },
    { name: "Next.js", type: "backend" },
    
    // Frontend
    { name: "React", type: "frontend" },
    { name: "JavaScript", type: "frontend" },
    { name: "TypeScript", type: "frontend" },
    { name: "HTML/CSS", type: "frontend" },
    { name: "Tailwind CSS", type: "frontend" },
    { name: "SCSS/SASS", type: "frontend" },
    
    // Mobile
    { name: "Java", type: "mobile" },
    { name: "Android Native", type: "mobile" },
    
    // Database
    { name: "MySQL", type: "database" },
    { name: "MongoDB", type: "database" },
    { name: "PostgreSQL", type: "database" },
    { name: "Firebase", type: "database" },
    { name: "Redis", type: "database" },
    { name: "Supabase", type: "database" },
    { name: "GraphQL", type: "database" },
    
    // Tools
    { name: "Git", type: "tools" },
    { name: "Docker", type: "tools" },
    { name: "AWS", type: "tools" },
    { name: "CI/CD", type: "tools" },
    { name: "Webpack", type: "tools" },
    { name: "Vite", type: "tools" },
    
    // Others
    { name: "REST API", type: "others" },
    { name: "WebSockets", type: "others" },
    { name: "JWT", type: "others" },
    { name: "OAuth", type: "others" },
  ]

  const getSkillsByType = (type: SkillType) => {
    return skills.filter(skill => skill.type === type)
  }

  const SkillCard = ({ title, skills }: { title: string, skills: Skill[] }) => (
    <div className="skill-card w-full md:w-[calc(50%-0.5rem)] p-4 border rounded-lg bg-card transition-all duration-300 hover:shadow-md hover:border-primary/30 cursor-pointer">
      <h3 className="text-lg font-medium mb-3">
        <span className={language === 'ar' ? 'arabic-text' : ''}>
          {title}
        </span>
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <span 
            key={skill.name} 
            className="px-2 py-1 text-sm bg-primary/10 text-primary rounded-md transition-all duration-300 hover:bg-primary/20 cursor-default"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  )

  return (
    <section id="skills" className="py-16 container">
      <div ref={containerRef} className="max-w-4xl mx-auto">
        <div ref={titleRef} className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            {language === 'ar' ? (
              <span className="arabic-text">{t('skills')}</span>
            ) : t('skills')}
          </h2>
          <p className="mt-2 text-muted-foreground max-w-md mx-auto">
            {language === 'ar' ? (
              <span className="arabic-text">{t('skillsDescription')}</span>
            ) : t('skillsDescription')}
          </p>
        </div>
        
        <div ref={cardsRef} className="flex flex-wrap gap-4">
          <SkillCard 
            title={t('backend')} 
            skills={getSkillsByType('backend')} 
          />
          <SkillCard 
            title={t('frontend')} 
            skills={getSkillsByType('frontend')} 
          />
          <SkillCard 
            title={t('mobile')} 
            skills={getSkillsByType('mobile')} 
          />
          <SkillCard 
            title={t('database')} 
            skills={getSkillsByType('database')} 
          />
          <SkillCard 
            title={t('tools')} 
            skills={getSkillsByType('tools')} 
          />
          <SkillCard 
            title={t('others')} 
            skills={getSkillsByType('others')} 
          />
        </div>
      </div>
    </section>
  )
} 