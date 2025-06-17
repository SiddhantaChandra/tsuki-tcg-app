import { useState } from 'react'
import { NavArrowDown, ArrowLeft, Xmark } from 'iconoir-react'

export default function MobileMenu({
  isMobileMenuOpen,
  activeDropdown,
  handleDropdownToggle,
  closeMobileMenu,
  pokemonSets,
  onePieceSets,
  gradeCompanies,
  isLoading,
  companiesLoaded,
  subsetsBySetId,
  subsetsLoaded
}) {
  const [selectedSet, setSelectedSet] = useState(null)
  const [showSubsets, setShowSubsets] = useState(false)

  // Debug logging
  console.log('MobileMenu props:', {
    pokemonSets: pokemonSets.length,
    subsetsBySetId: Object.keys(subsetsBySetId).length,
    subsetsLoaded,
    subsetsBySetId
  })
  
  console.log('MobileMenu state:', {
    showSubsets,
    selectedSet: selectedSet?.name || 'none',
    isMobileMenuOpen,
    hasSubsetsOverlay: showSubsets && selectedSet
  })

  if (!isMobileMenuOpen) return null

  const handleSetClick = (set) => {
    console.log('handleSetClick called with set:', set)
    console.log('Subsets for this set:', subsetsBySetId[set.id] || [])
    console.log('subsetsLoaded:', subsetsLoaded)
    
    if ((subsetsBySetId[set.id] || []).length > 0) {
      console.log('Setting selected set and showing subsets')
      setSelectedSet(set)
      setShowSubsets(true)
    } else {
      console.log('No subsets found for this set')
    }
  }

  const handleBackToMenu = () => {
    console.log('Going back to main menu')
    setShowSubsets(false)
    setSelectedSet(null)
  }

  // Handle set button click with event prevention
  const handleSetButtonClick = (e, set) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Set button clicked:', set.name)
    handleSetClick(set)
  }

  return (
    <>
      {/* Full Screen Overlay - Main Menu */}
      <div className={`fixed inset-0 z-50 sm:hidden transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen && !showSubsets ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="bg-white dark:bg-neutral-900 h-full w-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-neutral-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
            <button
              onClick={closeMobileMenu}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              <Xmark className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Content */}
          <div className="p-4 space-y-2">
            {/* Pokemon Mobile Section */}
            <div>
              <button 
                onClick={() => handleDropdownToggle('pokemon-mobile')}
                className="flex items-center justify-between w-full px-4 py-4 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <span>Pokemon</span>
                <NavArrowDown className={`w-5 h-5 transition-transform ${activeDropdown === 'pokemon-mobile' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'pokemon-mobile' && (
                <div className="mt-2 space-y-1">
                  {isLoading ? (
                    <div className="px-4 py-3 text-gray-500 dark:text-gray-400">Loading...</div>
                  ) : pokemonSets.length > 0 ? (
                    pokemonSets.map((set) => {
                      const hasSubsets = (subsetsBySetId[set.id] || []).length > 0
                      console.log(`Set "${set.name}" (ID: ${set.id}) has subsets:`, hasSubsets, 'Subsets:', subsetsBySetId[set.id] || [])
                      
                      return (
                        <div key={set.id} className="space-y-1">
                          <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-3">
                            {/* If set has subsets, make it clickable to show subsets, otherwise link to set page */}
                            {hasSubsets ? (
                              <button
                                onClick={(e) => handleSetButtonClick(e, set)}
                                className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                              >
                                <span>{set.name}</span>
                                <NavArrowDown className="w-4 h-4 -rotate-90 ml-3 text-gray-500 dark:text-gray-400" />
                              </button>
                            ) : (
                              <a
                                href={`/sets/${set.slug}`}
                                onClick={closeMobileMenu}
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                              >
                                {set.name}
                              </a>
                            )}
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="px-4 py-3 text-gray-500 dark:text-gray-400">No sets available</div>
                  )}
                  <a
                    href="/category/poke"
                    onClick={closeMobileMenu}
                    className="block px-4 py-3 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg transition-colors"
                  >
                    View All Pokemon Cards →
                  </a>
                </div>
              )}
            </div>

            {/* One Piece Mobile Section */}
            <div>
              <button 
                onClick={() => handleDropdownToggle('onepiece-mobile')}
                className="flex items-center justify-between w-full px-4 py-4 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <span>One Piece</span>
                <NavArrowDown className={`w-5 h-5 transition-transform ${activeDropdown === 'onepiece-mobile' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'onepiece-mobile' && (
                <div className="mt-2 space-y-1">
                  {isLoading ? (
                    <div className="px-4 py-3 text-gray-500 dark:text-gray-400">Loading...</div>
                  ) : onePieceSets.length > 0 ? (
                    onePieceSets.map((set) => (
                      <div key={set.id} className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-3">
                        <a
                          href={`/sets/${set.slug}`}
                          onClick={closeMobileMenu}
                          className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        >
                          {set.name}
                        </a>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 dark:text-gray-400">No sets available</div>
                  )}
                  <a
                    href="/category/op"
                    onClick={closeMobileMenu}
                    className="block px-4 py-3 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg transition-colors"
                  >
                    View All One Piece Cards →
                  </a>
                </div>
              )}
            </div>

            {/* Slabs Mobile Section */}
            <div>
              <button 
                onClick={() => handleDropdownToggle('slabs-mobile')}
                className="flex items-center justify-between w-full px-4 py-4 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <span>Slabs</span>
                <NavArrowDown className={`w-5 h-5 transition-transform ${activeDropdown === 'slabs-mobile' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'slabs-mobile' && (
                <div className="mt-2 space-y-2">
                  {/* Categories */}
                  <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-3">
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Categories</div>
                    <div className="space-y-1">
                      <a
                        href="/slabs/category/poke"
                        onClick={closeMobileMenu}
                        className="block text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      >
                        Pokemon Slabs
                      </a>
                      <a 
                        href="/slabs/category/op"
                        onClick={closeMobileMenu}
                        className="block text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      >
                        One Piece Slabs
                      </a>
                    </div>
                  </div>

                  {/* Grade Companies */}
                  <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-3">
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Grade Companies</div>
                    <div className="space-y-1">
                      {!companiesLoaded ? (
                        <div className="text-sm text-gray-500 dark:text-gray-400">Loading...</div>
                      ) : gradeCompanies.length > 0 ? (
                        gradeCompanies.map((company) => (
                          <a
                            key={company.id}
                            href={`/slabs/company/${company.slug}`}
                            onClick={closeMobileMenu}
                            className="block text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                          >
                            {company.name}
                          </a>
                        ))
                      ) : (
                        <div className="text-sm text-gray-500 dark:text-gray-400">No companies available</div>
                      )}
                    </div>
                  </div>

                  <a
                    href="/slabs"
                    onClick={closeMobileMenu}
                    className="block px-4 py-3 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg transition-colors"
                  >
                    View All Slabs →
                  </a>
                </div>
              )}
            </div>
            
            <a 
              href="#" 
              onClick={closeMobileMenu}
              className="block px-4 py-4 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            >
              New Arrivals
            </a>
            
            {/* Mobile Sign In Button */}
            <div className="pt-4">
              <button 
                onClick={closeMobileMenu}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subsets Overlay */}
      {showSubsets && selectedSet && (
        <div className="fixed inset-0 z-[60] sm:hidden">
          <div className="bg-white dark:bg-neutral-900 h-full w-full overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-neutral-700">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleBackToMenu}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedSet.name} Subsets
                </h2>
              </div>
              <button
                onClick={() => {
                  setShowSubsets(false)
                  setSelectedSet(null)
                  closeMobileMenu()
                }}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                <Xmark className="w-6 h-6" />
              </button>
            </div>

            {/* Subsets Content */}
            <div className="p-4">
              {/* Set Info */}
              <div className="mb-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{selectedSet.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Choose from available subsets</p>
              </div>

              {/* Subsets List */}
              <div className="space-y-2">
                {(subsetsBySetId[selectedSet.id] || []).map((subset) => (
                  <a
                    key={subset.id}
                    href={`/subsets/${subset.slug}`}
                    onClick={closeMobileMenu}
                    className="block p-4 bg-gray-50 dark:bg-neutral-800 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{subset.name}</div>
                  </a>
                ))}
              </div>

              {/* View Set Link */}
              <div className="mt-6">
                <a
                  href={`/sets/${selectedSet.slug}`}
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 text-center text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg transition-colors"
                >
                  View Full {selectedSet.name} Set →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 