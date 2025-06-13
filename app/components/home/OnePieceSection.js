'use client'

import Image from 'next/image'
import { getRarityColor } from './utils'

export default function OnePieceSection() {
  // One Piece Collection (6 cards)
  const onePieceCards = [
    { 
      id: 13, 
      src: '/4.jpg', 
      title: 'Monkey D. Luffy Gear 5', 
      price: 249.99, 
      character: 'Luffy',
      rarity: 'Leader Rare',
      condition: 'Mint',
      ability: 'Gum-Gum Liberation'
    },
    { 
      id: 14, 
      src: '/3.jpg', 
      title: 'Roronoa Zoro Three-Sword', 
      price: 179.99, 
      character: 'Zoro',
      rarity: 'Super Rare',
      condition: 'Near Mint',
      ability: 'Santoryu Ogi'
    },
    { 
      id: 15, 
      src: '/2.png', 
      title: 'Nami Thunder Clima', 
      price: 99.99, 
      character: 'Nami',
      rarity: 'Rare',
      condition: 'Mint',
      ability: 'Weather Control'
    },
    { 
      id: 16, 
      src: '/1.png', 
      title: 'Sanji Diable Jambe', 
      price: 139.99, 
      character: 'Sanji',
      rarity: 'Super Rare',
      condition: 'Excellent',
      ability: 'Fire Leg Technique'
    },
    { 
      id: 17, 
      src: '/16.jpg', 
      title: 'Tony Tony Chopper Monster', 
      price: 119.99, 
      character: 'Chopper',
      rarity: 'Rare',
      condition: 'Mint',
      ability: 'Monster Point'
    },
    { 
      id: 18, 
      src: '/15.jpg', 
      title: 'Nico Robin Devil Child', 
      price: 159.99, 
      character: 'Robin',
      rarity: 'Super Rare',
      condition: 'Near Mint',
      ability: 'Flower-Flower Power'
    }
  ]

  return (
    <section id="onepiece" className="py-20 px-6 bg-gradient-to-br from-blue-50 via-orange-50 to-red-50">
      <div className="container mx-auto">
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {onePieceCards.map((card) => (
            <div key={card.id} className="bg-white border-2 border-orange-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-orange-400 transition-all group">
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
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors text-sm">
                  {card.title}
                </h3>
                <p className="text-blue-600 font-medium text-xs mb-2">{card.character}</p>
                
                <p className="text-gray-600 text-xs mb-3">{card.ability}</p>
                
                <div className="space-y-1 mb-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Condition:</span>
                    <span className="font-medium">{card.condition}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-orange-600">${card.price}</span>
                  <button className="px-3 py-1 bg-gradient-to-r from-blue-500 to-orange-500 text-white text-xs rounded-lg hover:from-blue-600 hover:to-orange-600 transition-colors">
                    Set Sail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 