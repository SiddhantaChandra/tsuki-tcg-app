'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCategories, getSetsByCategory } from '../../lib/database'

export default function SetsPage() {
  const [categories, setCategories] = useState([])
  const [setsByCategory, setSetsByCategory] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSetsData() {
      try {
        const categoriesData = await getCategories()
        setCategories(categoriesData)
        
        // Get sets for each category
        const setsData = {}
        for (const category of categoriesData) {
          const sets = await getSetsByCategory(category.slug)
          setsData[category.slug] = sets
        }
        setSetsByCategory(setsData)
      } catch (error) {
        console.error('Error loading sets data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadSetsData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 transition-colors duration-300 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-900 dark:text-white text-lg">Loading sets...</div>
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
          <span className="text-gray-900 dark:text-white">All Sets</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trading Card Sets
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Browse our complete collection of trading card sets organized by category
          </p>
        </div>

        {/* Sets by Category */}
        <div className="space-y-12">
          {categories.map((category) => {
            const sets = setsByCategory[category.slug] || []
            
            if (sets.length === 0) return null

            return (
              <div key={category.id} className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {category.name}
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {sets.length} set{sets.length !== 1 ? 's' : ''}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {sets.map((set) => (
                    <Link 
                      key={set.id} 
                      href={`/sets/${set.slug}`}
                      className="group block p-4 bg-gray-50 dark:bg-neutral-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {set.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Click to view cards
                          </p>
                        </div>
                        <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {categories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              No sets found
            </div>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Check back later for new sets
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 