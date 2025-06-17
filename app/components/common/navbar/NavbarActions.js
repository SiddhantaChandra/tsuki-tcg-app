import { Search, Cart, Menu, Xmark } from 'iconoir-react'
import DarkModeToggle from '../DarkModeToggle'

export default function NavbarActions({ 
  isMobileMenuOpen, 
  toggleMobileMenu 
}) {
  return (
    <>
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
    </>
  )
} 