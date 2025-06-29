'use client'

import Image from 'next/image'
import Link from 'next/link'
import { getConditionText, getRarityText, formatPrice } from '../../../lib/database'

export default function DatabaseCard({ item, variant = 'default' }) {
  if (!item) return null

  // Determine the route based on item type
  const getRoute = () => {
    switch (item.type) {
      case 'card':
        return `/cards/${item.id}`
      case 'slab':
        return `/slabs/${item.id}`
      case 'accessory':
        return `/accessories/${item.id}`
      default:
        return `/cards/${item.id}` // Default fallback
    }
  }

  // Get the main image URL
  const getImageUrl = () => {
    if (item.thumbnail_url) return item.thumbnail_url
    if (item.image_urls && item.image_urls.length > 0) return item.image_urls[0]
    return '/assets/images/placeholder.jpg' // Fallback image
  }

  // Get the display condition
  const getCondition = () => {
    if (item.type === 'slab') return item.condition || 'Graded'
    if (typeof item.condition === 'number') return getConditionText(item.condition)
    return item.condition || 'Good'
  }

  // Get the rarity/type display
  const getRarity = () => {
    if (item.type === 'slab') {
      return `${item.grade_companies?.name || 'Graded'} ${item.grade_score || ''}`
    }
    if (item.type === 'accessory') {
      return item.accessory_type || 'Accessory'
    }
    return item.sets?.name || 'Trading Card'
  }

  // Featured variant (dark theme)
  if (variant === 'featured') {
    return (
      <Link href={getRoute()} className="flex-shrink-0 w-[150px] sm:w-32 md:w-52 lg:w-52 2xl:w-48 h-full flex flex-col shadow-md shadow-gray-900/50 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-gray-900/70 cursor-pointer transition-all duration-300">
        <div className="relative aspect-[3/4] w-full p-4 sm:p-6 bg-gray-800 dark:bg-neutral-900">
          <Image
            src={getImageUrl()}
            alt={item.name}
            width={150}
            height={200}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform rounded-sm lg:rounded-md"
          />
          <div className="absolute bottom-2 right-2">
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-600 text-white bg-black/50 backdrop-blur-sm">
              {item.type === 'slab' ? 'PSA' : 'RARE'}
            </span>
          </div>
        </div>
        <div className="p-3 flex-1 flex flex-col justify-between bg-gray-800 dark:bg-neutral-900">
          <div>
            <h3 className="font-medium text-white text-sm truncate">{item.name}</h3>
            <p className="text-gray-400 text-xs mb-2">Condition: {getCondition()}</p>
          </div>
          <div className="flex flex-col justify-between gap-2 mt-auto">
            <span className="font-bold text-red-400">{formatPrice(item.price)}</span>
            <button 
              onClick={(e) => e.preventDefault()}
              className="px-3 py-2 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
            >
              {item.type === 'accessory' ? 'Add to Cart' : 'Acquire'}
            </button>
          </div>
        </div>
      </Link>
    )
  }

  // Default variant (light theme)
  return (
    <Link href={getRoute()} className="flex-shrink-0 w-[150px] sm:w-32 md:w-52 lg:w-52 2xl:w-48 h-full flex flex-col transition-colors duration-300 shadow-md dark:shadow-neutral-900/50 rounded-lg overflow-hidden hover:shadow-lg dark:hover:shadow-neutral-900/70 cursor-pointer">
      <div className="relative aspect-[3/4] w-full p-4 sm:p-6 bg-white dark:bg-neutral-800 transition-colors duration-300">
        <Image
          src={getImageUrl()}
          alt={item.name}
          width={150}
          height={200}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform rounded-sm lg:rounded-md"
        />
        <div className="absolute bottom-2 right-2">
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-600 text-white bg-black/50 backdrop-blur-sm">
            {item.type === 'slab' ? 'GRADED' : 'CARD'}
          </span>
        </div>
      </div>
      <div className="p-3 flex-1 flex flex-col justify-between bg-white dark:bg-neutral-800 transition-colors duration-300">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate transition-colors duration-300">
            {item.name}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-xs mb-2 transition-colors duration-300">
            Condition: {getCondition()}
          </p>
        </div>
        <div className="flex flex-col justify-between gap-2 mt-auto">
          <span className="font-bold text-gray-900 dark:text-white transition-colors duration-300">
            {formatPrice(item.price)}
          </span>
          <button 
            onClick={(e) => e.preventDefault()}
            className="px-3 py-2 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
          >
            {item.type === 'accessory' ? 'Add to Cart' : 'View Details'}
          </button>
        </div>
      </div>
    </Link>
  )
} 