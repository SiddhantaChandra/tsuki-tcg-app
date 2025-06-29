import Image from 'next/image'
import Link from 'next/link'
import { getRarityColor } from '../common/utils'

export default function Card1({ id, src, title, price, rarity, condition }) {
  return (
    <Link href={`/cards/${id}`} className="flex-shrink-0 w-[150px] sm:w-32 md:w-52 lg:w-52 2xl:w-48 h-full flex flex-col transition-colors duration-300 shadow-md dark:shadow-neutral-900/50 rounded-lg overflow-hidden hover:shadow-lg dark:hover:shadow-neutral-900/70 cursor-pointer">
      <div className="relative aspect-[3/4] w-full p-4 sm:p-6 bg-white dark:bg-neutral-800 transition-colors duration-300">
        <Image
          src={src}
          alt={title}
          width={150}
          height={200}
          className="w-full h-full object-fill group-hover:scale-105 transition-transform rounded-sm lg:rounded-md"
        />
        <div className="absolute bottom-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(rarity)} bg-black/50 backdrop-blur-sm`}>
            {rarity}
          </span>
        </div>
      </div>
      <div className="p-3 flex-1 flex flex-col justify-between bg-white dark:bg-neutral-800 transition-colors duration-300">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate transition-colors duration-300">{title}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-xs mb-2 transition-colors duration-300">Condition: {condition}</p>
        </div>
        <div className="flex flex-col justify-between gap-2 mt-auto">
          <span className="font-bold text-gray-900 dark:text-white transition-colors duration-300">${price}</span>
          <button 
            onClick={(e) => e.preventDefault()}
            className="px-3 py-2 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  )
} 