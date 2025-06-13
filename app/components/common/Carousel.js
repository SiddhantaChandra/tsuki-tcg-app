'use client'

import { useCallback, useEffect, useState } from 'react'
import { NavArrowLeft, NavArrowRight } from 'iconoir-react'
import useEmblaCarousel from 'embla-carousel-react'

export default function Carousel({ 
  children, 
  className = "",
  buttonColor = "gray" // gray, red, orange, purple, green
}) {
  // Simple responsive items per view
  const getItemsPerView = () => {
    if (typeof window === 'undefined') return 6
    const width = window.innerWidth
    if (width < 640) return 4      // mobile
    if (width < 768) return 4      // tablet
    if (width < 1024) return 4     // small desktop
    if (width < 1280) return 5     // medium desktop
    return 6                       // large desktop
  }

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView)

  // Update items per view on resize
  useEffect(() => {
    const handleResize = () => setItemsPerView(getItemsPerView())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Embla setup - simple configuration
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: Math.max(1, Math.floor(itemsPerView / 2))
  })

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [snapCount, setSnapCount] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index) => emblaApi?.scrollTo(index), [emblaApi])

  const updateState = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setSnapCount(emblaApi.scrollSnapList().length)
    updateState()
    emblaApi.on('select', updateState)
    emblaApi.on('reInit', updateState)
  }, [emblaApi, updateState])

  // Simple button colors
  const buttonColors = {
    gray: 'border-gray-300 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700',
    red: 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white',
    orange: 'border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white',
    purple: 'border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white',
    green: 'border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
  }

  // Simple indicator colors
  const indicatorColors = {
    gray: 'bg-gray-600',
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500'
  }

  const buttonStyle = buttonColors[buttonColor] || buttonColors.gray
  const activeIndicatorColor = indicatorColors[buttonColor] || indicatorColors.gray

  return (
    <div className={`relative ${className}`}>
      {/* Carousel */}
      <div ref={emblaRef} className="embla__viewport overflow-hidden">
        <div className="embla__container flex">
          {children.map((child, index) => (
            <div key={index} className="embla__slide flex-shrink-0">
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {canScrollPrev && (
        <button
          onClick={scrollPrev}
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full mr-4 z-10
                     w-12 h-12 rounded-full border-2 flex items-center justify-center
                     transition-all duration-200 bg-white dark:bg-neutral-800 shadow-lg
                     hidden xl:flex hover:scale-105 ${buttonStyle}`}
        >
          <NavArrowLeft className="w-5 h-5" />
        </button>
      )}
      
      {canScrollNext && (
        <button
          onClick={scrollNext}
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-full ml-4 z-10
                     w-12 h-12 rounded-full border-2 flex items-center justify-center
                     transition-all duration-200 bg-white dark:bg-neutral-800 shadow-lg
                     hidden xl:flex hover:scale-105 ${buttonStyle}`}
        >
          <NavArrowRight className="w-5 h-5" />
        </button>
      )}

      {/* Position Indicators */}
      {snapCount > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          {Array.from({ length: snapCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 
                         ${index === selectedIndex 
                           ? `${activeIndicatorColor} scale-125` 
                           : 'bg-gray-300 dark:bg-neutral-600 hover:bg-gray-400 dark:hover:bg-neutral-500'
                         }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
} 