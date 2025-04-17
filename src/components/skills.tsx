"use client"

import React, { useRef, useEffect } from "react"
import { animate } from "animejs"
import { useAnime } from "@/hooks/use-anime"
import { useLanguage } from "@/contexts/language-context"

type Skill = {
  name: string;
  category: string;
}

const skills = [
  { name: "PHP", category: "Backend" },
  { name: "JavaScript", category: "Frontend" },
  { name: "jQuery", category: "Frontend" },
  { name: "HTML5/CSS3", category: "Frontend" },
  { name: "Tailwind", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "ReactJS", category: "Frontend" },
  { name: "NextJS", category: "Frontend" },
  { name: "NodeJS", category: "Backend" },
  { name: "ExpressJS", category: "Backend" },
  { name: "Laravel", category: "Backend" },
  { name: "Symfony", category: "Backend" },
  { name: "Java", category: "Mobile" },
  { name: "Android", category: "Mobile" },
  { name: "API", category: "Backend" },
  { name: "MySQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Appwrite", category: "BaaS" },
  { name: "Firebase", category: "BaaS" },
  { name: "Supabase", category: "BaaS" },
  { name: "Unit Testing", category: "DevOps" },
  { name: "Git and GitHub", category: "DevOps" },
  { name: "AI IDEs", category: "AI" },
  { name: "AI Prompting", category: "AI" },
  { name: "AI Fundamentals", category: "AI" },
]

function SkillCard({ skill, index }: { skill: Skill, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  useAnime({
    targets: cardRef.current,
    translateY: [50, 0],
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 600,
    delay: 300 + index * 50,
  })
  
  useAnime({
    scale: [1, 1.05, 1],
    rotate: [0, 2, 0],
    duration: 400,
    easing: "easeInOutSine",
    autoplay: false,
    targets: cardRef.current,
    eventName: "mouseenter"
  })

  return (
    <div
      ref={cardRef}
      className="flex flex-col items-center rounded-lg border p-4 shadow-sm transition-colors hover:bg-[hsla(var(--card)/0.8)]"
      style={{ backgroundColor: 'hsl(var(--card))' }}
    >
      <span className="text-sm font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>{skill.category}</span>
      <h3 className="text-center text-lg font-semibold">{skill.name}</h3>
    </div>
  )
}

export function Skills() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  
  useAnime({
    targets: headingRef.current,
    translateY: [30, 0],
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 800,
    delay: 100
  })
  
  // Staggered entrance on scroll
  useEffect(() => {
    if (!sectionRef.current) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(".skill-grid .skill-card", {
              translateY: [50, 0],
              opacity: [0, 1],
              delay: (_el, i: number) => 300 + (i * 50),
              easing: "easeOutExpo",
              duration: 800,
            });
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

  return (
    <section id="skills" ref={sectionRef} className="py-12 md:py-16 lg:py-20">
      <div className="container">
        <h2 
          ref={headingRef}
          className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl"
        >
          {t('skills.title')}
        </h2>
        <div className="skill-grid grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {skills.map((skill, index) => (
            <div key={skill.name} className="skill-card opacity-0">
              <SkillCard skill={skill} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 