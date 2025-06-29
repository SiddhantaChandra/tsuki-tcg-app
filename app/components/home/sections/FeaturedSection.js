'use client'

import { useState, useEffect } from 'react'
import DatabaseCard from '../../cards/DatabaseCard'
import Carousel from '../../common/Carousel'
import { getFeaturedCards } from '../../../../lib/database'

export default function FeaturedSection() {
  const [featuredCards, setFeaturedCards] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFeaturedCards() {
      try {
        const cards = await getFeaturedCards(12)
        // Add type identifier for the DatabaseCard component
        const cardsWithType = cards.map(card => ({ ...card, type: 'card' }))
        setFeaturedCards(cardsWithType)
      } catch (error) {
        console.error('Error loading featured cards:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedCards()
  }, [])

  if (loading) {
    return (
      <section id="featured" className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-900 via-purple-900 to-black">
        <div className="container mx-auto xl:max-w-6xl 2xl:max-w-7xl">
          <div className="flex items-center justify-center h-64">
            <div className="text-white text-lg">Loading featured cards...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="featured" className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <div className="container mx-auto xl:max-w-6xl 2xl:max-w-7xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Featured Cards</h2>
            <div className="flex items-center space-x-2 px-3 py-1 bg-red-600 text-white rounded-lg text-sm font-medium">
              <span>🚀</span>
              <span>VILLAINS</span>
            </div>
          </div>
          <button className="px-6 py-2 border-0 sm:border sm:border-red-600 text-red-400 font-medium rounded-lg hover:bg-red-600 hover:text-white transition-all text-sm bg-red-900/20 sm:bg-transparent">
            View All
          </button>
        </div>
        
        <Carousel buttonColor="red">
          {featuredCards.map((card) => (
            <DatabaseCard 
              key={card.id} 
              item={card}
              variant="featured"
            />
          ))}
        </Carousel>
      </div>
    </section>
  )
} 