'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Search, Cart, Menu, Xmark } from 'iconoir-react'
import DarkModeToggle from './DarkModeToggle'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="bg-white dark:bg-neutral-900 shadow-sm dark:shadow-neutral-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Image 
              src="/logo-1.webp" 
              alt="Tsuki Cards Logo" 
              width={32} 
              height={32}
              className="rounded-lg sm:w-10 sm:h-10"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Tsuki Cards
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-xs transition-colors duration-300 hidden md:block">
                Premium Trading Card Collection
              </p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Tsuki
              </h1>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#recent" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">
              New Arrivals
            </a>
            <a href="#teamrocket" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">
              Team Rocket
            </a>
            <a href="#onepiece" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">
              One Piece
            </a>
            <a href="#recommended" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">
              Recommended
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">
              Collections
            </a>
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center space-x-2 lg:space-x-4">
            <DarkModeToggle />
            <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors touch-manipulation">
              <Search className="w-5 h-5" />
            </button>
            <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors touch-manipulation">
              <Cart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </button>
            <button className="px-3 py-2 lg:px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all touch-manipulation">
              Sign In
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex sm:hidden items-center space-x-2">
            <DarkModeToggle />
            <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors touch-manipulation">
              <Search className="w-5 h-5" />
            </button>
            <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors touch-manipulation">
              <Cart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors touch-manipulation"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <Xmark className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-neutral-900 border-t border-gray-100 dark:border-neutral-800">
              <a 
                href="#recent" 
                onClick={closeMobileMenu}
                className="block px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-md transition-colors touch-manipulation"
              >
                New Arrivals
              </a>
              <a 
                href="#teamrocket" 
                onClick={closeMobileMenu}
                className="block px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-md transition-colors touch-manipulation"
              >
                Team Rocket
              </a>
              <a 
                href="#onepiece" 
                onClick={closeMobileMenu}
                className="block px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-md transition-colors touch-manipulation"
              >
                One Piece
              </a>
              <a 
                href="#recommended" 
                onClick={closeMobileMenu}
                className="block px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-md transition-colors touch-manipulation"
              >
                Recommended
              </a>
              <a 
                href="#" 
                onClick={closeMobileMenu}
                className="block px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-md transition-colors touch-manipulation"
              >
                Collections
              </a>
              
              {/* Mobile Sign In Button */}
              <div className="pt-2">
                <button 
                  onClick={closeMobileMenu}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-base font-medium hover:from-purple-700 hover:to-pink-700 transition-all touch-manipulation"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 