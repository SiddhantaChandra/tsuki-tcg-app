'use client'

import Image from 'next/image'
import { getRarityColor } from './utils'

export default function RecommendedSection() {
  // Recommended Cards (6 cards)
  const recommendedCards = [
    { 
      id: 19, 
      src: '/14.jpg', 
      title: 'Elemental Storm Wizard', 
      price: 89.99, 
      rarity: 'Ultra Rare',
      condition: 'Mint',
      reason: 'Popular this week',
      rating: 4.8,
      reviews: 156
    },
    { 
      id: 20, 
      src: '/13.jpg', 
      title: 'Ancient Dragon Lord', 
      price: 199.99, 
      rarity: 'Secret Rare',
      condition: 'Near Mint',
      reason: 'Similar to viewed',
      rating: 4.9,
      reviews: 89
    },
    { 
      id: 21, 
      src: '/12.jpg', 
      title: 'Crystal Heart Maiden', 
      price: 119.99, 
      rarity: 'Super Rare',
      condition: 'Mint',
      reason: 'Trending now',
      rating: 4.7,
      reviews: 234
    },
    { 
      id: 22, 
      src: '/11.jpg', 
      title: 'Golden Phoenix Rising', 
      price: 159.99, 
      rarity: 'Ultra Rare',
      condition: 'Excellent',
      reason: 'Collectors favorite',
      rating: 5.0,
      reviews: 67
    },
    { 
      id: 23, 
      src: '/10.png', 
      title: 'Mystic Forest Guardian', 
      price: 139.99, 
      rarity: 'Super Rare',
      condition: 'Mint',
      reason: 'Highly rated',
      rating: 4.9,
      reviews: 142
    },
    { 
      id: 24, 
      src: '/9.png', 
      title: 'Cosmic Star Destroyer', 
      price: 189.99, 
      rarity: 'Ultra Rare',
      condition: 'Near Mint',
      reason: 'Staff pick',
      rating: 4.8,
      reviews: 98
    }
  ]

  return (
    <section id="recommended" className="py-20 px-6 bg-gray-100">
      <div className="container mx-auto">
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {recommendedCards.map((card) => (
            <div key={card.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all group">
              <div className="relative">
                <Image 
                  src={card.src} 
                  alt={card.title} 
                  width={300} 
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute bottom-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(card.rarity)} bg-black/50 backdrop-blur-sm`}>
                    {card.rarity}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors text-sm">
                  {card.title}
                </h3>
                
                <div className="flex items-center space-x-1 mb-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-3 h-3 ${i < Math.floor(card.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-500 text-xs">({card.reviews})</span>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-2 mb-3">
                  <div className="text-purple-700 text-xs font-medium">{card.reason}</div>
                </div>
                
                <div className="space-y-1 mb-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Condition:</span>
                    <span className="font-medium">{card.condition}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-purple-600">${card.price}</span>
                  <div className="flex space-x-1">
                    <button className="p-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="px-3 py-1 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700 transition-colors">
                      Quick Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 