"use client"

import React, { useRef, useEffect, useState } from "react"
import { animate } from "animejs"
import { useLanguage } from "@/contexts/language-context"
import { ContactForm } from "./contact-form"

export function Contact() {
  const { t, language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [showModal, setShowModal] = useState(false)
  
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
              delay: (_el, i: number) => i * 100
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

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <section id="contact" ref={sectionRef} className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: "hsl(var(--muted))" }}>
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-8 max-w-xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            {t('contact.title')}
          </h2>
          <p className="text-muted-foreground">{t('contact.subtitle')}</p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {/* GitHub */}
          <a
            href="https://github.com/haianibrahim"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center rounded-lg border p-6 text-center shadow-sm transition-all hover:shadow-md cursor-pointer"
            style={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
            }}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: "hsl(var(--primary) / 0.1)" }}>
              <svg
                className="size-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: "hsl(var(--primary))" }}
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" 
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium">GitHub</h3>
            <p className="text-muted-foreground">@haianibrahim</p>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/haian-k-Ibrahim/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center rounded-lg border p-6 text-center shadow-sm transition-all hover:shadow-md cursor-pointer"
            style={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
            }}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: "hsl(var(--primary) / 0.1)" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "hsl(var(--primary))" }}
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium">
              <span className={language === 'ar' ? 'arabic-text' : ''}>
                {t('contact.linkedin')}
              </span>
            </h3>
            <p className="text-muted-foreground">{t('contact.connect')}</p>
          </a>

          {/* Contact Form */}
          <div
            onClick={openModal}
            className="flex flex-col items-center justify-center rounded-lg border p-6 text-center shadow-sm transition-all hover:shadow-md cursor-pointer"
            style={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
            }}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: "hsl(var(--primary) / 0.1)" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "hsl(var(--primary))" }}
              >
                <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium">{t('contact.contact_form')}</h3>
            <p className="text-muted-foreground">{t('contact.send_message')}</p>
          </div>
        </div>

        <div className="mx-auto mt-6 grid max-w-4xl">
          {/* Address */}
          <a
            href="https://maps.google.com/?q=Lübeck,Germany"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center rounded-lg border p-6 text-center shadow-sm transition-all hover:shadow-md cursor-pointer"
            style={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
            }}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: "hsl(var(--primary) / 0.1)" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "hsl(var(--primary))" }}
              >
                <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium">
              <span className={language === 'ar' ? 'arabic-text' : ''}>
                {t('contact.address')}
              </span>
            </h3>
            <p className="text-muted-foreground">
              {language === 'ar' ? (
                <span className="arabic-text">ليوبيك، ألمانيا</span>
              ) : (
                "Lübeck, Germany"
              )}
            </p>
          </a>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div
              className="relative mx-4 max-h-[90vh] w-full max-w-md overflow-auto rounded-lg p-6"
              style={{ backgroundColor: "hsl(var(--background))" }}
            >
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 cursor-pointer rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
              <h3 className="mb-4 text-xl font-bold">
                {t('contact.send_message')}
              </h3>
              <ContactForm closeModal={closeModal} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
} 