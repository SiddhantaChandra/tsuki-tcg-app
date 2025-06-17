'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { throttle } from './utils'

const DarkModeContext = createContext()

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Initialize theme on mount to prevent hydration mismatch
  useEffect(() => {
    const initializeTheme = () => {
      try {
        const savedTheme = localStorage.getItem('theme')
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        
        const shouldBeDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark)
        
        // Set state first
        setIsDarkMode(shouldBeDark)
        
        // Then update DOM
        if (shouldBeDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        
        // Mark as mounted after theme is set
        setMounted(true)
      } catch (error) {
        console.warn('Failed to initialize theme:', error)
        // Fallback to light mode
        setIsDarkMode(false)
        document.documentElement.classList.remove('dark')
        setMounted(true)
      }
    }

    // Use requestAnimationFrame to ensure this runs after hydration
    requestAnimationFrame(initializeTheme)
  }, [])

  // Throttled toggle function to prevent rapid successive calls
  const toggleDarkModeThrottled = useCallback(
    throttle(() => {
      // Add transition class for smooth switching
      document.documentElement.classList.add('dark-mode-transitioning')
      
      setIsDarkMode(prevMode => {
        const newDarkMode = !prevMode
        
        try {
          if (newDarkMode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
          } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
          }
        } catch (error) {
          console.warn('Failed to save theme preference:', error)
        }

        return newDarkMode
      })

      // Remove transition class after transition completes
      setTimeout(() => {
        document.documentElement.classList.remove('dark-mode-transitioning')
      }, 300)
    }, 100), // Throttle to once every 100ms
    []
  )

  const value = {
    isDarkMode,
    toggleDarkMode: toggleDarkModeThrottled,
    mounted
  }

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  )
}

export function useDarkMode() {
  const context = useContext(DarkModeContext)
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider')
  }
  return context
} 