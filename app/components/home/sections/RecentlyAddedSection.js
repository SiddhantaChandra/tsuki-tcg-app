'use client'

import Card1 from '../../cards/card-1'
import Carousel from '../../common/Carousel'
import { getRecentCards } from '../../common/card-data'

export default function RecentlyAddedSection() {
  const recentlyAdded = getRecentCards()

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
            <Card1 key={card.id} src={card.src} title={card.title} price={card.price} rarity={card.rarity} condition={card.condition} />
          ))}
        </Carousel>
      </div>
    </section>
  )
} 