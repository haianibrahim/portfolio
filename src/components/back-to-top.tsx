"use client"

import React, { useState, useEffect } from "react"
import { useAnime } from "@/hooks/use-anime"

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  
  useAnime({
    targets: buttonRef.current,
    scale: [0.8, 1],
    opacity: [0, 1],
    rotate: [45, 0],
    duration: 400,
    easing: 'easeOutElastic(1, .6)',
    autoplay: false,
  })
  
  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true)
        if (buttonRef.current) {
          buttonRef.current.style.opacity = "1"
          buttonRef.current.style.transform = "scale(1) rotate(0deg)"
        }
      } else {
        setIsVisible(false)
        if (buttonRef.current) {
          buttonRef.current.style.opacity = "0"
          buttonRef.current.style.transform = "scale(0.8) rotate(45deg)"
        }
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    
    // Clean up
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 flex size-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 md:bottom-10 md:right-10 md:size-14 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ 
        backgroundColor: 'hsl(var(--primary))', 
        color: 'hsl(var(--primary-foreground))',
        transform: 'scale(0.8) rotate(45deg)'
      }}
      aria-label="Back to top"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={2} 
        stroke="currentColor" 
        className="size-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  )
} 