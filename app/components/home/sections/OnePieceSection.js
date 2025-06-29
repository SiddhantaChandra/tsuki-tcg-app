'use client'

import { useState, useEffect } from 'react'
import DatabaseCard from '../../cards/DatabaseCard'
import Carousel from '../../common/Carousel'
import { getCardsByCategory } from '../../../../lib/database'

export default function OnePieceSection() {
  const [onePieceCards, setOnePieceCards] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadOnePieceCards() {
      try {
        const cards = await getCardsByCategory('op')
        // Add type identifier for the DatabaseCard component
        const cardsWithType = cards.map(card => ({ ...card, type: 'card' }))
        setOnePieceCards(cardsWithType)
      } catch (error) {
        console.error('Error loading One Piece cards:', error)
      } finally {
        setLoading(false)
      }
    }

    loadOnePieceCards()
  }, [])

  if (loading) {
    return (
      <section id="onepiece" className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-blue-50 via-orange-50 to-red-50 dark:from-cyan-900/30 dark:via-amber-900/25 dark:to-orange-900/25 transition-colors duration-300">
        <div className="container mx-auto xl:max-w-6xl 2xl:max-w-7xl">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-900 dark:text-white text-lg">Loading One Piece cards...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="onepiece" className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-blue-50 via-orange-50 to-red-50 dark:from-cyan-900/30 dark:via-amber-900/25 dark:to-orange-900/25 transition-colors duration-300">
      <div className="container mx-auto xl:max-w-6xl 2xl:max-w-7xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">One Piece Collection</h2>
            <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-lg text-sm font-medium">
              <span>⚓</span>
              <span>ADVENTURE</span>
            </div>
          </div>
          <button className="px-6 py-2 border-0 sm:border sm:border-orange-500 text-orange-600 dark:text-orange-400 font-medium rounded-lg hover:bg-orange-500 hover:text-white transition-all text-sm bg-orange-100 dark:bg-orange-900/20 sm:bg-transparent">
            View All
          </button>
        </div>
        
        <Carousel buttonColor="orange">
          {onePieceCards.map((card) => (
            <DatabaseCard key={card.id} item={card} />
          ))}
        </Carousel>
      </div>
    </section>
  )
} 