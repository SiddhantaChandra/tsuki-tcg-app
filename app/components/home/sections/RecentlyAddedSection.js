'use client'

import Card1 from '../../cards/card-1'
import Carousel from '../../common/Carousel'
import { getRecentCards } from '../../common/card-data'

export default function RecentlyAddedSection() {
  const recentlyAdded = getRecentCards()

  return (
    <section id="recent" className="py-20 px-6 bg-white">
      <div className="container mx-auto xl:max-w-6xl 2xl:max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h2 className="text-3xl font-bold text-gray-900">Recently Added</h2>
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-500 text-white rounded-lg text-sm font-medium">
              <span>🆕</span>
              <span>NEW</span>
            </div>
          </div>
          <button className="px-6 py-2 border border-gray-300 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-all text-sm">
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