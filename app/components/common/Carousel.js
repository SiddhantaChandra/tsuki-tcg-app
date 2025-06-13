'use client'

import { useState } from 'react'
import { NavArrowLeft, NavArrowRight } from 'iconoir-react'

export default function Carousel({ 
  children, 
  itemsPerPage = 6, 
  className = "",
  buttonColor = "gray", // gray, red, orange, purple, green
  borderColor = "border-gray-200" // border color for the carousel container
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalItems = children.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + itemsPerPage >= totalItems ? 0 : prevIndex + itemsPerPage
    )
  }
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, totalItems - itemsPerPage) : Math.max(0, prevIndex - itemsPerPage)
    )
  }
  
  const visibleItems = children.slice(currentIndex, currentIndex + itemsPerPage)
  
  // Button color variants
  const buttonStyles = {
    gray: {
      base: "border-gray-300 text-gray-600 hover:bg-gray-50",
      disabled: "border-gray-200 text-gray-300"
    },
    red: {
      base: "border-red-600 text-red-400 hover:bg-red-600 hover:text-white",
      disabled: "border-red-300 text-red-300"
    },
    orange: {
      base: "border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white",
      disabled: "border-orange-300 text-orange-300"
    },
    purple: {
      base: "border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white",
      disabled: "border-purple-300 text-purple-300"
    },
    green: {
      base: "border-green-500 text-green-600 hover:bg-green-500 hover:text-white",
      disabled: "border-green-300 text-green-300"
    }
  }
  
  const currentButtonStyle = buttonStyles[buttonColor] || buttonStyles.gray
  
  return (
    <div className={`relative${className}`}>
      {/* Carousel Content */}
      <div className={`flex flex-wrap ${borderColor} border border-r-0`}>
        {visibleItems}
        
        {/* Left Navigation Button - positioned at far left edge */}
        {currentIndex > 0 && (
          <button
            onClick={prevSlide}
            className={`
              absolute -left-6 top-1/2 transform -translate-y-1/2 z-10
              w-12 h-12 rounded-full border-2 flex items-center justify-center
              transition-all duration-200 bg-transparent backdrop-blur-sm shadow-lg
              ${currentButtonStyle.base}
            `}
          >
            <NavArrowLeft className="w-5 h-5" />
          </button>
        )}
        
        {/* Right Navigation Button - positioned at far right edge */}
        {currentIndex + itemsPerPage < totalItems && (
          <button
            onClick={nextSlide}
            className={`
              absolute -right-6 top-1/2 transform -translate-y-1/2 z-10
              w-12 h-12 rounded-full border-2 flex items-center justify-center
              transition-all duration-200 bg-transparent backdrop-blur-sm shadow-lg
              ${currentButtonStyle.base}
            `}
          >
            <NavArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
} 