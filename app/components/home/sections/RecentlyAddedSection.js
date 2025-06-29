'use client'

import { useState, useEffect } from 'react'
import DatabaseCard from '../../cards/DatabaseCard'
import Carousel from '../../common/Carousel'
import { getRecentCards } from '../../../../lib/database'

export default function RecentlyAddedSection() {
  const [recentlyAdded, setRecentlyAdded] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadRecentCards() {
      try {
        const cards = await getRecentCards(12)
        // Add type identifier for the DatabaseCard component
        const cardsWithType = cards.map(card => ({ ...card, type: 'card' }))
        setRecentlyAdded(cardsWithType)
      } catch (error) {
        console.error('Error loading recent cards:', error)
      } finally {
        setLoading(false)
      }
    }

    loadRecentCards()
  }, [])

  if (loading) {
    return (
      <section id="recent" className="py-12 sm:py-20 px-4 sm:px-6 bg-white dark:bg-neutral-900 transition-colors duration-300">
        <div className="container mx-auto xl:max-w-6xl 2xl:max-w-7xl">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-900 dark:text-white text-lg">Loading recent cards...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="recent" className="py-12 sm:py-20 px-4 sm:px-6 bg-white dark:bg-neutral-900 transition-colors duration-300">
      <div className="container mx-auto xl:max-w-6xl 2xl:max-w-7xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Recently Added</h2>
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-500 text-white rounded-lg text-sm font-medium">
              <span>🆕</span>
              <span>NEW</span>
            </div>
          </div>
          <button className="px-6 py-2 border-0 sm:border sm:border-gray-300 sm:dark:border-gray-600 text-gray-600 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-sm bg-gray-100 dark:bg-neutral-800 sm:bg-transparent">
            View All
          </button>
        </div>
        
        <Carousel buttonColor="green">
          {recentlyAdded.map((card) => (
            <DatabaseCard key={card.id} item={card} />
          ))}
        </Carousel>
      </div>
    </section>
  )
} 