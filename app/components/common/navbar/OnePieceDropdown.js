import Image from 'next/image'

export default function OnePieceDropdown({
  sets,
  isLoading,
  setActiveDropdown
}) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-lg min-w-[550px] z-50 overflow-hidden">
      <div className="grid grid-cols-7 gap-0">
        {/* Image Column */}
        <div className="col-span-4 relative h-full">
          <Image
            src="/assets/images/navbar/OP-nav.webp"
            alt="One Piece Cards"
            width={350}
            height={210}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-transparent"></div>
          <div className="absolute bottom-4 left-4">
            <h3 className="text-white font-bold text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">One Piece</h3>
            <p className="text-white/90 text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">Trading Cards Collection</p>
          </div>
        </div>

        {/* Sets Column */}
        <div className="col-span-3 py-5 px-4">
          <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Available Sets</h4>
          <div className="space-y-1">
            {isLoading ? (
              <div className="py-2 text-gray-500 dark:text-gray-400 text-sm">Loading...</div>
            ) : sets.length > 0 ? (
              sets.map((set) => (
                <a
                  key={set.id}
                  href={`/sets/${set.slug}`}
                  className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded transition-colors"
                  onClick={() => setActiveDropdown(null)}
                >
                  {set.name}
                </a>
              ))
            ) : (
              <div className="py-2 text-gray-500 dark:text-gray-400 text-sm">No sets available</div>
            )}
          </div>
        </div>
      </div>
      
      {/* View All Link */}
      <div className="border-t border-gray-200 dark:border-neutral-700 px-5 py-2 text-right">
        <a
          href="/category/op"
          className="inline-block text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          onClick={() => setActiveDropdown(null)}
        >
          View All One Piece Cards →
        </a>
      </div>
    </div>
  )
} 