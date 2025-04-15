"use client"

import { useEffect, useRef } from "react"
import { animate } from "animejs"

// Define our own AnimeInstance type until type definitions are updated for v4
interface AnimeInstance {
  play: () => AnimeInstance
  pause: () => AnimeInstance
  restart: () => AnimeInstance
}

interface UseAnimeProps {
  targets?: any
  ref?: React.RefObject<HTMLElement>
  eventName?: string
  scale?: any
  rotate?: any
  translateX?: any
  translateY?: any
  opacity?: any
  duration?: number
  delay?: number
  endDelay?: number
  easing?: string
  direction?: 'normal' | 'reverse' | 'alternate'
  loop?: boolean | number
  autoplay?: boolean
  begin?: () => void
  complete?: () => void
  [key: string]: any // Allow for other anime.js properties
}

export function useAnime({
  ref,
  eventName,
  targets,
  ...animeParams
}: UseAnimeProps): AnimeInstance | null {
  const animeRef = useRef<AnimeInstance | null>(null)

  useEffect(() => {
    const targetElement = targets || (ref?.current ? ref.current : null)
    if (!targetElement) return

    try {
      // Create animation instance with the animate function from v4
      animeRef.current = animate(targetElement, {
        ...animeParams,
      }) as AnimeInstance
    } catch (error) {
      console.error("Anime.js animation error:", error)
      return
    }

    if (eventName && ref?.current) {
      const element = ref.current
      const handler = () => {
        if (animeRef.current) {
          animeRef.current.restart()
        }
      }

      element.addEventListener(eventName, handler)

      return () => {
        element.removeEventListener(eventName, handler)
        if (animeRef.current) {
          animeRef.current.pause()
        }
      }
    }
    
    return () => {
      if (animeRef.current) {
        animeRef.current.pause()
      }
    }
  }, [ref, targets, eventName, ...Object.values(animeParams)])

  return animeRef.current
} 