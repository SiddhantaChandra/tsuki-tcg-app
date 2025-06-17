'use client'

import { useDarkMode } from './DarkModeContext'
import { SunLight, HalfMoon } from 'iconoir-react'
import { useCallback } from 'react'

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode, mounted } = useDarkMode()

  // Memoize the toggle handler to prevent unnecessary re-renders
  const handleToggle = useCallback(() => {
    toggleDarkMode()
    // Remove focus after click to prevent focus ring from staying
    setTimeout(() => {
      document.activeElement?.blur()
    }, 150)
  }, [toggleDarkMode])

  // Prevent hydration mismatch with consistent fallback
  if (!mounted) {
    return (
      <div className="w-8 h-8 bg-gray-300 dark:bg-neutral-600 rounded-full flex items-center justify-center opacity-50">
        <SunLight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </div>
    )
  }

  return (
    <button
      onClick={handleToggle}
      className={`
        w-8 h-8 rounded-full flex items-center justify-center
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900
        transform hover:scale-105 active:scale-95
        ${isDarkMode 
          ? 'bg-gray-600 dark:bg-neutral-700 hover:bg-gray-500 dark:hover:bg-neutral-600 focus:ring-purple-400 dark:focus:ring-purple-300' 
          : 'bg-gray-200 hover:bg-gray-300 focus:ring-purple-500'
        }
      `}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      type="button"
    >
      <div className="transition-transform duration-300 ease-out">
        {isDarkMode ? (
          <HalfMoon className="w-4 h-4 text-yellow-300 transition-colors duration-300" />
        ) : (
          <SunLight className="w-4 h-4 text-yellow-600 transition-colors duration-300" />
        )}
      </div>
    </button>
  )
} 