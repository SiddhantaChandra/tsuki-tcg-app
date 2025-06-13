import Image from 'next/image'
import { getRarityColor } from '../common/utils'

export default function CardFeatured({ src, title, price, rarity, condition, description, series }) {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2 h-full flex flex-col" style={{ boxShadow: '1px 0 0 0 #374151' }}>
      <div className="relative aspect-[3/4] w-full p-6">
        <Image 
          src={src} 
          alt={title} 
          width={300} 
          height={400}
          className="w-full h-full object-fill group-hover:scale-105 transition-transform rounded-md"
        />
        <div className="absolute bottom-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(rarity)} bg-black/50 backdrop-blur-sm`}>
            {rarity}
          </span>
        </div>
      </div>
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-medium text-white text-sm truncate">{title}</h3>
          <p className="text-gray-400 text-xs mb-2">Condition: {condition}</p>
        </div>
        <div className="flex flex-col justify-between gap-2 mt-auto">
          <span className="font-bold text-red-400">${price}</span>
          <button className="px-3 py-2 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors">
            Acquire
          </button>
        </div>
      </div>
    </div>
  )
} 