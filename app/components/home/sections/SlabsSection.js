'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import DatabaseCard from '../../cards/DatabaseCard'
import Carousel from '../../common/Carousel'
import { getAllSlabs } from '../../../../lib/database'

export default function SlabsSection() {
  const [slabs, setSlabs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSlabs() {
      try {
        const slabsData = await getAllSlabs()
        // Add type identifier for the DatabaseCard component
        const slabsWithType = slabsData.map(slab => ({ ...slab, type: 'slab' }))
        setSlabs(slabsWithType)
      } catch (error) {
        console.error('Error loading slabs:', error)
      } finally {
        setLoading(false)
      }
    }

    loadSlabs()
  }, [])

  if (loading) {
    return (
      <section id="slabs" className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-purple-900/30 dark:via-indigo-900/25 dark:to-blue-900/25 transition-colors duration-300">
        <div className="container mx-auto xl:max-w-6xl 2xl:max-w-7xl">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-900 dark:text-white text-lg">Loading slabs...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="slabs" className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-purple-900/30 dark:via-indigo-900/25 dark:to-blue-900/25 transition-colors duration-300">
      <div className="container mx-auto xl:max-w-6xl 2xl:max-w-7xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Authentic Slabs</h2>
            <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg text-sm font-medium">
              <span>🛡️</span>
              <span>GRADED</span>
            </div>
          </div>
          <Link href="/slabs" className="px-6 py-2 border-0 sm:border sm:border-purple-500 text-purple-600 dark:text-purple-400 font-medium rounded-lg hover:bg-purple-500 hover:text-white transition-all text-sm bg-purple-100 dark:bg-purple-900/20 sm:bg-transparent">
            View All
          </Link>
        </div>
        
        <Carousel buttonColor="purple">
          {slabs.map((slab) => (
            <DatabaseCard key={slab.id} item={slab} />
          ))}
        </Carousel>
      </div>
    </section>
  )
} 