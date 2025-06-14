'use client'

import CardFeatured from '../../cards/card-featured'
import Carousel from '../../common/Carousel'
import { getFeaturedCards } from '../../common/card-data'

export default function FeaturedSection() {
  const featuredCards = getFeaturedCards()

  return (
    <section id="featured" className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <div className="container mx-auto xl:max-w-6xl 2xl:max-w-7xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Featured Cards</h2>
            <div className="flex items-center space-x-2 px-3 py-1 bg-red-600 text-white rounded-lg text-sm font-medium">
              <span>🚀</span>
              <span>VILLAINS</span>
            </div>
          </div>
          <button className="px-6 py-2 border-0 sm:border sm:border-red-600 text-red-400 font-medium rounded-lg hover:bg-red-600 hover:text-white transition-all text-sm bg-red-900/20 sm:bg-transparent">
            View All
          </button>
        </div>
        
        <Carousel buttonColor="red">
          {featuredCards.map((card) => (
            <CardFeatured 
              key={card.id} 
              src={card.src} 
              title={card.title} 
              price={card.price} 
              rarity={card.rarity} 
              condition={card.condition}
              description={card.description}
              series={card.series}
            />
          ))}
        </Carousel>
      </div>
    </section>
  )
} 