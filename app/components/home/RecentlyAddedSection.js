'use client'

import Image from 'next/image'
import { getRarityColor } from './utils'

export default function RecentlyAddedSection() {
  // Recently Added Cards (6 cards)
  const recentlyAdded = [
    { 
      id: 1, 
      src: '/16.jpg', 
      title: 'Mystical Aurora Dragon', 
      price: 149.99, 
      rarity: 'Ultra Rare',
      condition: 'Mint',
      addedDate: '2 hours ago',
      isNew: true
    },
    { 
      id: 2, 
      src: '/15.jpg', 
      title: 'Crystal Phoenix Guardian', 
      price: 89.99, 
      rarity: 'Super Rare',
      condition: 'Near Mint',
      addedDate: '5 hours ago',
      isNew: true
    },
    { 
      id: 3, 
      src: '/14.jpg', 
      title: 'Thunder Beast Emperor', 
      price: 199.99, 
      rarity: 'Secret Rare',
      condition: 'Mint',
      addedDate: '1 day ago',
      isNew: true
    },
    { 
      id: 4, 
      src: '/13.jpg', 
      title: 'Shadow Blade Master', 
      price: 119.99, 
      rarity: 'Rare',
      condition: 'Excellent',
      addedDate: '1 day ago',
      isNew: true
    },
    { 
      id: 5, 
      src: '/12.jpg', 
      title: 'Celestial Knight', 
      price: 179.99, 
      rarity: 'Ultra Rare',
      condition: 'Mint',
      addedDate: '2 days ago',
      isNew: true
    },
    { 
      id: 6, 
      src: '/11.jpg', 
      title: 'Void Sorceress', 
      price: 129.99, 
      rarity: 'Super Rare',
      condition: 'Near Mint',
      addedDate: '2 days ago',
      isNew: true
    }
  ]

  return (
    <section id="recent" className="py-20 px-6 bg-white">
      <div className="container mx-auto">
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
        
        <div className="flex flex-wrap border-gray-200 border">
          {recentlyAdded.map((card) => (
            <div key={card.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 border-r border-gray-200 last:border-r-0">
              <div className="bg-white p-2">
                <div className="relative aspect-[3/4] w-full p-6">
                  <Image 
                    src={card.src} 
                    alt={card.title} 
                    width={300} 
                    height={400}
                    className="w-full h-full object-fill group-hover:scale-105 transition-transform rounded-md"
                  />
                  <div className="absolute bottom-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(card.rarity)} bg-black/50 backdrop-blur-sm`}>
                      {card.rarity}
                    </span>
                  </div>
                </div>
                
                <div className="p-3">
                  <h3 className="font-medium text-gray-900 text-sm truncate">
                    {card.title}
                  </h3>
                  <p className="text-gray-500 text-xs mb-2">
                    Condition: {card.condition}
                  </p>
                  <div className="flex flex-col justify-between gap-2">
                    <span className="font-bold text-gray-900">${card.price}</span>
                    <button className="px-3 py-2 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
                      Add to Cart
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