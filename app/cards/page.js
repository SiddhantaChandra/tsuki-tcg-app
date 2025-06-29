'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import DatabaseCard from '../components/cards/DatabaseCard'
import { getAllCards } from '../../lib/database'

export default function AllCardsPage() {
  const [allCards, setAllCards] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAllCards() {
      try {
        const cards = await getAllCards()
        // Add type identifier for the DatabaseCard component
        const cardsWithType = cards.map(card => ({ ...card, type: 'card' }))
        setAllCards(cardsWithType)
      } catch (error) {
        console.error('Error loading all cards:', error)
      } finally {
        setLoading(false)
      }
    }

    loadAllCards()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 transition-colors duration-300 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-900 dark:text-white text-lg">Loading all cards...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 transition-colors duration-300 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm">
          <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            Home
          </Link>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span className="text-gray-900 dark:text-white">All products</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">All Cards</h1>
          <p className="text-gray-600 dark:text-gray-400">Browse our complete collection of trading cards</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {allCards.map((card) => (
            <div key={card.id} className="w-full">
              <DatabaseCard item={card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 