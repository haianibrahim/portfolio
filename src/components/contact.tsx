"use client"

import React, { useRef, useEffect } from "react"
import { animate } from "animejs"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { ContactForm } from "./contact-form"

const contactInfo = [
  {
    platform: "Address",
    link: "https://maps.google.com/?q=Eschenburgstr.,23568,Lübeck,Germany",
    display: "Eschenburgstr., 23568 Lübeck, Germany",
    displayAr: "شارع إيشنبورغ، ليوبيك، ألمانيا",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
  },
  {
    platform: "Website",
    platformAr: "الموقع",
    link: "https://haian.me",
    display: "haian.me",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    platform: "Email",
    platformAr: "البريد الإلكتروني",
    link: "mailto:contact@haian.me",
    display: "contact@haian.me",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    platform: "GitHub",
    link: "https://github.com/hki98",
    display: "github.com/hki98",
    icon: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    platform: "LinkedIn",
    platformAr: "لينكد إن",
    link: "https://linkedin.com/in/haian-k-ibrahim",
    display: "linkedin.com/in/haian-k-ibrahim",
    icon: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    platform: "Telegram",
    platformAr: "تيليجرام",
    link: "https://t.me/hki98",
    display: "t.me/hki98",
    icon: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.5 6.604-.743 8.801-.08.75-.45 1.012-.83 1.17-.75.324-1.32.144-2.043-.223-1.134-.592-1.77-1.016-2.93-1.603-1.3-.664-1.004-1.019.06-1.86.284-.224 3.613-3.543 4.088-4.118.474-.575.596-.653.595-.943-.001-.157-.136-.369-.463-.371-.193 0-.398.1-.568.275-1.097 1.203-3.188 3.383-4.866 5.193-.57.476-1.143.713-1.769.713-.531 0-1.04-.142-1.568-.419-.996-.525-1.794-1-2.703-1.475-.93-.494-.764-.993-.228-1.325 1.157-.71 2.43-1.494 3.63-2.21.82-.494 1.91-1.18 3.339-2.123 1.813-1.205 3.193-1.906 3.734-2.197a.8.8 0 0 1 .327-.072z" />
      </svg>
    ),
  },
];

export function Contact() {
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
            animate(".contact-item", {
              scale: [0.9, 1],
              opacity: [0, 1],
              translateY: [20, 0],
              easing: "easeOutExpo",
              duration: 800,
              delay: function(_el: any, i: number) { return i * 100 }
            })
            
            // Also animate the divider elements when they come into view
            animate(".divider-icon", {
              scale: [0.8, 1],
              opacity: [0, 1],
              easing: "easeOutExpo",
              duration: 800,
              delay: 300
            })
            
            animate(".divider-line", {
              width: [0, '33%'],
              opacity: [0, 1],
              easing: "easeOutExpo",
              duration: 1000,
              delay: 450
            })
            
            animate(".divider-text", {
              opacity: [0, 1],
              translateY: [10, 0],
              easing: "easeOutExpo",
              duration: 800,
              delay: 650
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
  
  // Hover animation for contact items
  useEffect(() => {
    const handleMouseEnter = (event: Event) => {
      const item = (event.target as HTMLElement).closest(".contact-item")
      if (!item) return
      
      animate(item, {
        scale: 1.05,
        duration: 300,
        easing: "easeOutQuad"
      })
    }
    
    const handleMouseLeave = (event: Event) => {
      const item = (event.target as HTMLElement).closest(".contact-item")
      if (!item) return
      
      animate(item, {
        scale: 1,
        duration: 300,
        easing: "easeOutQuad"
      })
    }
    
    const contactContainer = document.querySelector(".contact-container")
    if (contactContainer) {
      contactContainer.addEventListener("mouseenter", handleMouseEnter, true)
      contactContainer.addEventListener("mouseleave", handleMouseLeave, true)
    }
    
    return () => {
      if (contactContainer) {
        contactContainer.removeEventListener("mouseenter", handleMouseEnter, true)
        contactContainer.removeEventListener("mouseleave", handleMouseLeave, true)
      }
    }
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="py-12 md:py-16 lg:py-20">
      <div className="container">
        <h2 
          ref={headingRef}
          className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl"
        >
          {t('contact.title')}
        </h2>
        
        <div className="mx-auto max-w-3xl">
          {/* Contact information cards */}
          <div className="contact-container grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {contactInfo.map((info) => (
              <Link 
                key={info.platform}
                href={info.link}
                target="_blank"
                className="contact-item flex flex-col items-center rounded-lg border p-6 text-center shadow-sm opacity-0 transition-colors hover:bg-[hsl(var(--card)/0.8)]"
                style={{ backgroundColor: 'hsl(var(--card))' }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full text-[hsl(var(--primary))]"
                  style={{ backgroundColor: 'hsl(var(--primary) / 0.1)' }}
                >
                  {info.icon}
                </div>
                <h3 className="text-lg font-medium">
                  {language === 'en' ? info.platform : info.platformAr || info.platform}
                </h3>
                <p className="mt-1 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {language === 'en' 
                    ? (info.display || info.link.replace(/(mailto:|https?:\/\/)/g, ''))
                    : (info.displayAr || info.display || info.link.replace(/(mailto:|https?:\/\/)/g, ''))}
                </p>
              </Link>
            ))}
          </div>
          
          {/* Contact form divider - enhanced visual treatment */}
          <div className="my-16 text-center">
            <div className="relative flex items-center justify-center mb-4">
              <div className="divider-line absolute left-0 w-1/3 h-px bg-gradient-to-r from-transparent to-primary/30 opacity-0"></div>
              <div className="divider-icon z-10 flex items-center justify-center w-12 h-12 rounded-full shadow-sm opacity-0" style={{ 
                backgroundColor: 'hsl(var(--card))',
                boxShadow: '0 0 20px rgba(var(--primary), 0.1)'
              }}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={1.5} 
                  stroke="currentColor" 
                  className="w-6 h-6 text-primary"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                </svg>
              </div>
              <div className="divider-line absolute right-0 w-1/3 h-px bg-gradient-to-l from-transparent to-primary/30 opacity-0"></div>
            </div>
            <h3 className="divider-text font-medium tracking-wide mb-4 opacity-0" style={{ color: 'hsl(var(--primary))' }}>
              {language === 'en' ? 'Or send me a message' : <span className="arabic-text">أو أرسل لي رسالة</span>}
            </h3>
            <p className="divider-text text-sm max-w-md mx-auto mb-8 opacity-0" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {language === 'en' 
                ? "Have a question or want to work together? Drop me a message using the form below."
                : <span className="arabic-text">هل لديك سؤال أو ترغب في العمل معًا؟ أرسل لي رسالة باستخدام النموذج أدناه.</span>
              }
            </p>
          </div>
          
          {/* Formspree contact form */}
          <div className="contact-form">
            <ContactForm />
          </div>
          
          <div className="mt-12 text-center">
            <p style={{ color: 'hsl(var(--muted-foreground))' }}>
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 