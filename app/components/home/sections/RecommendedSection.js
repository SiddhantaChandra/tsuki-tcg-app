'use client'

import { useState, useEffect } from 'react'
import DatabaseCard from '../../cards/DatabaseCard'
import Carousel from '../../common/Carousel'
import { getMixedProducts } from '../../../../lib/database'

export default function RecommendedSection() {
  const [recommendedCards, setRecommendedCards] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadRecommendedCards() {
      try {
        const products = await getMixedProducts('featured', 12)
        setRecommendedCards(products)
      } catch (error) {
        console.error('Error loading recommended products:', error)
      } finally {
        setLoading(false)
      }
    }

    loadRecommendedCards()
  }, [])

  if (loading) {
    return (
      <section id="recommended" className="py-12 sm:py-20 px-4 sm:px-6 bg-gray-100 dark:bg-neutral-800 transition-colors duration-300">
        <div className="container mx-auto xl:max-w-6xl 2xl:max-w-7xl">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-900 dark:text-white text-lg">Loading recommended products...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="recommended" className="py-12 sm:py-20 px-4 sm:px-6 bg-gray-100 dark:bg-neutral-800 transition-colors duration-300">
      <div className="container mx-auto xl:max-w-6xl 2xl:max-w-7xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Recommended Cards</h2>
            <div className="flex items-center space-x-2 px-3 py-1 bg-purple-500 text-white rounded-lg text-sm font-medium">
              <span>🎯</span>
              <span>FOR YOU</span>
            </div>
          </div>
          <button className="px-6 py-2 border-0 sm:border sm:border-purple-600 text-purple-600 dark:text-purple-400 font-medium rounded-lg hover:bg-purple-600 hover:text-white transition-all text-sm bg-purple-100 dark:bg-purple-900/20 sm:bg-transparent">
            View All
          </button>
        </div>
        
        <Carousel buttonColor="purple">
          {recommendedCards.map((item) => (
            <DatabaseCard key={item.id} item={item} />
          ))}
        </Carousel>
      </div>
    </section>
  )
} 