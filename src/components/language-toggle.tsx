"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { useAnime } from "@/hooks/use-anime"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

interface LanguageToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export function LanguageToggle({ className, ...props }: LanguageToggleProps) {
  const [mounted, setMounted] = useState(false)
  const { language, setLanguage } = useLanguage()
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  // Animation for the toggle button
  useAnime({
    ref: buttonRef as React.RefObject<HTMLElement>,
    eventName: "click",
    scale: [0.95, 1],
    duration: 150,
    easing: "easeInOutQuad"
  })

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  if (!mounted) {
    return null
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={language === "en" ? "Switch to Arabic" : "Switch to English"}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-lg bg-muted p-1.5 text-foreground transition-colors hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
      onClick={toggleLanguage}
      {...props}
    >
      <div className="relative text-lg">
        {language === "en" ? "AR" : "EN"}
      </div>
    </button>
  )
} 