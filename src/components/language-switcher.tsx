"use client"

import * as React from "react"
import { useLanguage } from "@/contexts/language-context"
import { useAnime } from "@/hooks/use-anime-adapter"

export function LanguageSwitcher() {
  const [mounted, setMounted] = React.useState(false)
  const { language, setLanguage } = useLanguage()
  const { refs, animate } = useAnime()

  // After mounting, we have access to the theme
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleLanguage = React.useCallback(() => {
    const newLanguage = language === "en" ? "ar" : "en"
    setLanguage(newLanguage)
    animate()
  }, [language, setLanguage, animate])

  if (!mounted) {
    return <div className="w-10 h-10" /> // Prevents layout shift
  }

  return (
    <button
      ref={refs}
      className="flex items-center justify-center w-10 h-10 border rounded-full dark:border-neutral-700 dark:text-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100"
      onClick={toggleLanguage}
      aria-label="Toggle language"
    >
      {language === "en" ? (
        <span className="text-xs font-semibold">EN</span>
      ) : (
        <span className="text-xs font-semibold">عربي</span>
      )}
    </button>
  )
} 