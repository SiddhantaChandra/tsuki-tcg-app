'use client'

import Image from 'next/image'
import { getRarityColor } from './utils'

export default function TeamRocketSection() {
  // Team Rocket Collection (6 cards)
  const teamRocketCards = [
    { 
      id: 7, 
      src: '/10.png', 
      title: 'Dark Charizard', 
      price: 299.99, 
      series: 'Team Rocket Returns',
      rarity: 'Holo Rare',
      condition: 'Mint',
      description: 'The legendary dark evolution'
    },
    { 
      id: 8, 
      src: '/9.png', 
      title: 'Rocket\'s Mewtwo EX', 
      price: 189.99, 
      series: 'Team Rocket Returns',
      rarity: 'Ultra Rare',
      condition: 'Near Mint',
      description: 'Psychic power unleashed'
    },
    { 
      id: 9, 
      src: '/8.jpg', 
      title: 'Dark Blastoise', 
      price: 159.99, 
      series: 'Team Rocket Returns',
      rarity: 'Holo Rare',
      condition: 'Mint',
      description: 'Water cannons of darkness'
    },
    { 
      id: 10, 
      src: '/7.jpg', 
      title: 'Giovanni\'s Machamp', 
      price: 129.99, 
      series: 'Team Rocket Returns',
      rarity: 'Rare',
      condition: 'Excellent',
      description: 'The boss\'s fighting champion'
    },
    { 
      id: 11, 
      src: '/6.jpg', 
      title: 'Dark Gyarados', 
      price: 219.99, 
      series: 'Team Rocket Returns',
      rarity: 'Holo Rare',
      condition: 'Mint',
      description: 'Rage of the dark seas'
    },
    { 
      id: 12, 
      src: '/5.jpg', 
      title: 'Team Rocket\'s Scyther', 
      price: 99.99, 
      series: 'Team Rocket Returns',
      rarity: 'Rare',
      condition: 'Near Mint',
      description: 'Swift blade of evil'
    }
  ]

  return (
    <section id="teamrocket" className="py-20 px-6 bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h2 className="text-3xl font-bold text-white">Return of Team Rocket</h2>
            <div className="flex items-center space-x-2 px-3 py-1 bg-red-600 text-white rounded-lg text-sm font-medium">
              <span>🚀</span>
              <span>VILLAINS</span>
            </div>
          </div>
          <button className="px-6 py-2 border border-red-600 text-red-400 font-medium rounded-lg hover:bg-red-600 hover:text-white transition-all text-sm">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {teamRocketCards.map((card) => (
            <div key={card.id} className="bg-gray-800 border border-purple-500 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all group">
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
                <h3 className="font-bold text-white mb-1 group-hover:text-red-400 transition-colors text-sm">
                  {card.title}
                </h3>
                
                <p className="text-gray-300 text-xs mb-3">{card.description}</p>
                
                <div className="space-y-1 mb-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Series:</span>
                    <span className="text-purple-300 font-medium text-xs">Team Rocket</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Condition:</span>
                    <span className="text-white font-medium">{card.condition}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-red-400">${card.price}</span>
                  <button className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition-colors">
                    Acquire
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