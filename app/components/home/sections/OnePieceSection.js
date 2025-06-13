'use client'

import Card1 from '../../cards/card-1'
import Carousel from '../../common/Carousel'
import { getOnePieceCards } from '../../common/card-data'

export default function OnePieceSection() {
  const onePieceCards = getOnePieceCards()

  return (
    <section id="onepiece" className="py-20 px-6 bg-gradient-to-br from-blue-50 via-orange-50 to-red-50">
      <div className="container mx-auto xl:max-w-6xl 2xl:max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h2 className="text-3xl font-bold text-gray-900">One Piece Collection</h2>
            <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-lg text-sm font-medium">
              <span>⚓</span>
              <span>ADVENTURE</span>
            </div>
          </div>
          <button className="px-6 py-2 border border-orange-500 text-orange-600 font-medium rounded-lg hover:bg-orange-500 hover:text-white transition-all text-sm">
            View All
          </button>
        </div>
        
        <Carousel buttonColor="orange">
          {onePieceCards.map((card) => (
            <Card1 key={card.id} {...card} />
          ))}
        </Carousel>
      </div>
    </section>
  )
} 