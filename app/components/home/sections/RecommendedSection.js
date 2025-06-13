'use client'

import Card1 from '../../cards/card-1'
import Carousel from '../../common/Carousel'
import { getRecommendedCards } from '../../common/card-data'

export default function RecommendedSection() {
  const recommendedCards = getRecommendedCards()

  return (
    <section id="recommended" className="py-20 px-6 bg-gray-100">
      <div className="container mx-auto xl:max-w-6xl 2xl:max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h2 className="text-3xl font-bold text-gray-900">Recommended Cards</h2>
            <div className="flex items-center space-x-2 px-3 py-1 bg-purple-500 text-white rounded-lg text-sm font-medium">
              <span>🎯</span>
              <span>FOR YOU</span>
            </div>
          </div>
          <button className="px-6 py-2 border border-purple-600 text-purple-600 font-medium rounded-lg hover:bg-purple-600 hover:text-white transition-all text-sm">
            View All
          </button>
        </div>
        
        <Carousel buttonColor="purple">
          {recommendedCards.map((card) => (
            <Card1 key={card.id} src={card.src} title={card.title} price={card.price} rarity={card.rarity} condition={card.condition} />
          ))}
        </Carousel>
      </div>
    </section>
  )
} 