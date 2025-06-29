'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import DatabaseCard from '../components/cards/DatabaseCard'
import { getAllSlabs } from '../../lib/database'

export default function AllSlabsPage() {
  const [allSlabs, setAllSlabs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAllSlabs() {
      try {
        const slabs = await getAllSlabs()
        // Add type identifier for the DatabaseCard component
        const slabsWithType = slabs.map(slab => ({ ...slab, type: 'slab' }))
        setAllSlabs(slabsWithType)
      } catch (error) {
        console.error('Error loading all slabs:', error)
      } finally {
        setLoading(false)
      }
    }

    loadAllSlabs()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 transition-colors duration-300 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-900 dark:text-white text-lg">Loading all slabs...</div>
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
          <span className="text-gray-900 dark:text-white">All slabs</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">All Slabs</h1>
          <p className="text-gray-600 dark:text-gray-400">Browse our complete collection of graded cards</p>
        </div>

        {/* Slabs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {allSlabs.map((slab) => (
            <div key={slab.id} className="w-full">
              <DatabaseCard item={slab} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 