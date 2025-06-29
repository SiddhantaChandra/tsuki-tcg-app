'use client'

import { useState, useEffect, use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import DatabaseCard from '../../components/cards/DatabaseCard'
import FilterSidebar from '../../components/common/FilterSidebar'
import { getCardsByCategory } from '../../../lib/database'

const CATEGORY_NAMES = {
  'poke': 'Pokemon',
  'op': 'One Piece'
}

export default function CategoryPage({ params }) {
  const [cards, setCards] = useState([])
  const [filteredCards, setFilteredCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    inStock: false,
    priceRange: [0, 10000],
    sortBy: 'newest'
  })

  // Unwrap the params Promise
  const unwrappedParams = use(params)
  const categoryName = CATEGORY_NAMES[unwrappedParams.slug]

  useEffect(() => {
    async function loadCategoryData() {
      try {
        if (!categoryName) {
          notFound()
        }

        const cardsData = await getCardsByCategory(unwrappedParams.slug)
        setCards(cardsData)
        setFilteredCards(cardsData)
        
        // Set max price from actual cards
        if (cardsData.length > 0) {
          const maxPrice = Math.max(...cardsData.map(card => card.price))
          setFilters(prev => ({ ...prev, priceRange: [0, Math.ceil(maxPrice / 100) * 100] }))
        }
      } catch (error) {
        console.error('Error loading category data:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    loadCategoryData()
  }, [unwrappedParams.slug, categoryName])

  useEffect(() => {
    function applyClientFilters() {
      let filtered = [...cards]

      // Apply in stock filter
      if (filters.inStock) {
        // Assuming cards with stock_quantity > 0 or no stock_quantity field means in stock
        filtered = filtered.filter(card => !card.hasOwnProperty('stock_quantity') || card.stock_quantity > 0)
      }

      // Apply price range filter
      if (filters.priceRange) {
        filtered = filtered.filter(card => 
          card.price >= filters.priceRange[0] && card.price <= filters.priceRange[1]
        )
      }

      // Apply sorting
      switch (filters.sortBy) {
        case 'oldest':
          filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
          break
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price)
          break
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price)
          break
        case 'name-asc':
          filtered.sort((a, b) => a.name.localeCompare(b.name))
          break
        case 'name-desc':
          filtered.sort((a, b) => b.name.localeCompare(a.name))
          break
        default: // newest
          filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      }

      setFilteredCards(filtered)
    }

    applyClientFilters()
  }, [filters, cards])

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 transition-colors duration-300 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-900 dark:text-white text-lg">Loading {categoryName} cards...</div>
          </div>
        </div>
      </div>
    )
  }

  if (!categoryName) {
    notFound()
  }

  const maxPrice = cards.length > 0 ? Math.max(...cards.map(card => card.price)) : 10000

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 transition-colors duration-300 pt-24">
      <div className="max-w-full mx-auto">
        <div className="flex">
          {/* Filter Sidebar */}
          <FilterSidebar 
            onFiltersChange={handleFiltersChange}
            maxPrice={maxPrice}
          />

          {/* Main Content */}
          <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="flex mb-8 text-sm">
              <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                Home
              </Link>
              <span className="mx-2 text-gray-400">&gt;</span>
              <span className="text-gray-900 dark:text-white">{categoryName}</span>
            </nav>

            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {categoryName} Trading Cards
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{filteredCards.length} cards found</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Cards: {cards.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Showing: {filteredCards.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Cards Grid */}
            {filteredCards.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                {filteredCards.map((card) => (
                  <div key={card.id} className="w-full">
                    <DatabaseCard item={{ ...card, type: 'card' }} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                  No cards found matching your filters
                </div>
                <p className="text-gray-400 dark:text-gray-500 text-sm">
                  Try adjusting your price range or removing filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 