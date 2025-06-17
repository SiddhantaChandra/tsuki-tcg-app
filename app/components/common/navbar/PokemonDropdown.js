import Image from 'next/image'

export default function PokemonDropdown({
  sets,
  isLoading,
  hoveredSet,
  subsetsBySetId,
  subsetsLoaded,
  handleSetHover,
  handleSetLeave,
  setActiveDropdown
}) {
  return (
    <div 
      className="absolute top-full left-1/2 -translate-x-1/2 mt-7 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-lg min-w-[750px] h-80 z-50 overflow-hidden"
      onMouseLeave={handleSetLeave}
    >
      <div className="grid grid-cols-12 gap-0 h-80">
        {/* Image Column - Fixed dimensions */}
        <div className="col-span-4 relative h-80">
          <Image
            src="/assets/images/navbar/Poke-nav.webp"
            alt="Pokemon Cards"
            width={350}
            height={320}
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-transparent"></div>
          <div className="absolute bottom-4 left-4">
            <h3 className="text-white font-bold text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Pokemon</h3>
            <p className="text-white/90 text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">Trading Cards Collection</p>
          </div>
        </div>

        {/* Sets Column with View All at bottom */}
        <div className="col-span-4 h-80 flex flex-col">
          <div className="flex-1 py-5 px-4 overflow-y-auto">
            <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Available Sets</h4>
            <div className="space-y-1">
              {isLoading ? (
                <div className="py-2 text-gray-500 dark:text-gray-400 text-sm">Loading...</div>
              ) : sets.length > 0 ? (
                sets.map((set) => (
                  <a
                    key={set.id}
                    href={`/sets/${set.slug}`}
                    className={`block px-3 py-2 text-sm rounded transition-colors ${
                      hoveredSet?.id === set.id 
                        ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700'
                    }`}
                    onMouseEnter={() => handleSetHover(set)}
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
          
          {/* View All Link - At bottom of sets column */}
          <div className="border-t border-gray-200 dark:border-neutral-700 px-5 py-2 text-right flex-shrink-0">
            <a
              href="/category/poke"
              className="inline-block text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
              onClick={() => setActiveDropdown(null)}
            >
              View All Pokemon Cards →
            </a>
          </div>
        </div>

        {/* Subsets Column - Full Height */}
        <div 
          className="col-span-4 h-80 py-5 px-4 border-l border-gray-200 dark:border-neutral-700 flex flex-col"
          onMouseEnter={() => hoveredSet && handleSetHover(hoveredSet)}
        >
          <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex-shrink-0">
            {hoveredSet ? `${hoveredSet.name} Subsets` : 'Subsets'}
          </h4>
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-1">
              {!hoveredSet ? (
                <div className="py-2 text-gray-500 dark:text-gray-400 text-sm italic">
                  Hover over a set to see subsets
                </div>
              ) : !subsetsLoaded ? (
                <div className="py-2 text-gray-500 dark:text-gray-400 text-sm">Loading subsets...</div>
              ) : (subsetsBySetId[hoveredSet.id] || []).length > 0 ? (
                (subsetsBySetId[hoveredSet.id] || []).map((subset) => (
                  <a
                    key={subset.id}
                    href={`/subsets/${subset.slug}`}
                    className="block px-3 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded transition-colors"
                    onClick={() => setActiveDropdown(null)}
                  >
                    {subset.name}
                  </a>
                ))
              ) : (
                <div className="py-2 text-gray-500 dark:text-gray-400 text-sm">
                  No subsets available for this set
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 