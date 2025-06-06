"use client"

import { useEffect, useState } from "react"

/**
 * Custom hook to detect if the current viewport is mobile-sized
 * @param breakpoint - The width in pixels below which the viewport is considered mobile (default: 768px)
 * @returns boolean indicating if the viewport is mobile-sized
 */
export function useMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Check on mount
    checkMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [breakpoint])

  return isMobile
} 