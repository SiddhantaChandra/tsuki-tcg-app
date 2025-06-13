'use client'

import Card1 from '../../cards/card-1'
import Carousel from '../../common/Carousel'
import { getOnePieceCards } from '../../common/card-data'

export default function OnePieceSection() {
  const onePieceCards = getOnePieceCards()

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
            <Card1 key={card.id} {...card} />
          ))}
        </Carousel>
      </div>
    </section>
  )
} 