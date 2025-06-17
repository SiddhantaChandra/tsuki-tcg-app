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
      <div className={`fixed inset-0 z-50 sm:hidden transition-all duration-500 ease-in-out ${
        isMobileMenuOpen && !showSubsets ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        <div className="bg-white dark:bg-neutral-900 h-full w-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-neutral-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
            <button
              onClick={closeMobileMenu}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-200 hover:scale-110"
            >
              <Xmark className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Content */}
          <div className="p-4 space-y-2">
            {/* Pokemon Mobile Section */}
            <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <button 
                onClick={() => handleDropdownToggle('pokemon-mobile')}
                className="flex items-center justify-between w-full px-4 py-4 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Pokemon</span>
                <NavArrowDown className={`w-5 h-5 transition-all duration-300 ${activeDropdown === 'pokemon-mobile' ? 'rotate-180 text-purple-600 dark:text-purple-400' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeDropdown === 'pokemon-mobile' 
                  ? 'max-h-[1000px] opacity-100 transform translate-y-0' 
                  : 'max-h-0 opacity-0 transform -translate-y-2'
              }`}>
                <div className="mt-2 space-y-1">
                  {isLoading ? (
                    <div className="px-4 py-3 text-gray-500 dark:text-gray-400 animate-pulse">Loading...</div>
                  ) : pokemonSets.length > 0 ? (
                    pokemonSets.map((set, index) => {
                      const hasSubsets = (subsetsBySetId[set.id] || []).length > 0
                      console.log(`Set "${set.name}" (ID: ${set.id}) has subsets:`, hasSubsets, 'Subsets:', subsetsBySetId[set.id] || [])
                      
                      return (
                        <div 
                          key={set.id} 
                          className="space-y-1 animate-slideInLeft"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-3 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-neutral-700 hover:scale-[1.01]">
                            {/* If set has subsets, make it clickable to show subsets, otherwise link to set page */}
                            {hasSubsets ? (
                              <button
                                onClick={(e) => handleSetButtonClick(e, set)}
                                className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200"
                              >
                                <span>{set.name}</span>
                                <NavArrowDown className="w-4 h-4 -rotate-90 ml-3 text-gray-500 dark:text-gray-400 transition-all duration-200 group-hover:text-purple-600" />
                              </button>
                            ) : (
                              <a
                                href={`/sets/${set.slug}`}
                                onClick={closeMobileMenu}
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200"
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
                    className="block px-4 py-3 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg transition-all duration-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:scale-[1.02] hover:shadow-md"
                  >
                    View All Pokemon Cards →
                  </a>
                </div>
              </div>
            </div>

            {/* One Piece Mobile Section */}
            <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <button 
                onClick={() => handleDropdownToggle('onepiece-mobile')}
                className="flex items-center justify-between w-full px-4 py-4 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <span>One Piece</span>
                <NavArrowDown className={`w-5 h-5 transition-all duration-300 ${activeDropdown === 'onepiece-mobile' ? 'rotate-180 text-purple-600 dark:text-purple-400' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeDropdown === 'onepiece-mobile' 
                  ? 'max-h-[1000px] opacity-100 transform translate-y-0' 
                  : 'max-h-0 opacity-0 transform -translate-y-2'
              }`}>
                <div className="mt-2 space-y-1">
                  {isLoading ? (
                    <div className="px-4 py-3 text-gray-500 dark:text-gray-400 animate-pulse">Loading...</div>
                  ) : onePieceSets.length > 0 ? (
                    onePieceSets.map((set, index) => {
                      const hasSubsets = (subsetsBySetId[set.id] || []).length > 0
                      console.log(`Set "${set.name}" (ID: ${set.id}) has subsets:`, hasSubsets, 'Subsets:', subsetsBySetId[set.id] || [])
                      
                      return (
                        <div 
                          key={set.id} 
                          className="space-y-1 animate-slideInLeft"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-3 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-neutral-700 hover:scale-[1.01]">
                            {/* If set has subsets, make it clickable to show subsets, otherwise link to set page */}
                            {hasSubsets ? (
                              <button
                                onClick={(e) => handleSetButtonClick(e, set)}
                                className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200"
                              >
                                <span>{set.name}</span>
                                <NavArrowDown className="w-4 h-4 -rotate-90 ml-3 text-gray-500 dark:text-gray-400 transition-all duration-200 group-hover:text-purple-600" />
                              </button>
                            ) : (
                              <a
                                href={`/sets/${set.slug}`}
                                onClick={closeMobileMenu}
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200"
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
                    href="/category/op"
                    onClick={closeMobileMenu}
                    className="block px-4 py-3 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg transition-all duration-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:scale-[1.02] hover:shadow-md"
                  >
                    View All One Piece Cards →
                  </a>
                </div>
              </div>
            </div>

            {/* Slabs Mobile Section */}
            <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <button 
                onClick={() => handleDropdownToggle('slabs-mobile')}
                className="flex items-center justify-between w-full px-4 py-4 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Slabs</span>
                <NavArrowDown className={`w-5 h-5 transition-all duration-300 ${activeDropdown === 'slabs-mobile' ? 'rotate-180 text-purple-600 dark:text-purple-400' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeDropdown === 'slabs-mobile' 
                  ? 'max-h-[800px] opacity-100 transform translate-y-0' 
                  : 'max-h-0 opacity-0 transform -translate-y-2'
              }`}>
                <div className="mt-2 space-y-3 px-2">
                  {/* Categories Section */}
                  <div className="space-y-1">
                    <div className="px-2 mb-2">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Categories</div>
                    </div>
                    <div className="space-y-1 animate-slideInLeft" style={{ animationDelay: '0.1s' }}>
                      <a
                        href="/slabs/category/poke"
                        onClick={closeMobileMenu}
                        className="block px-4 py-3 bg-gray-50 dark:bg-neutral-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-all duration-300 hover:scale-[1.01] hover:translate-x-1"
                      >
                        Pokemon Slabs
                      </a>
                      <a 
                        href="/slabs/category/op"
                        onClick={closeMobileMenu}
                        className="block px-4 py-3 bg-gray-50 dark:bg-neutral-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-all duration-300 hover:scale-[1.01] hover:translate-x-1"
                      >
                        One Piece Slabs
                      </a>
                    </div>
                  </div>

                  {/* Grade Companies Section */}
                  <div className="space-y-1">
                    <div className="px-2 mb-2">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Grade Companies</div>
                    </div>
                    <div className="space-y-1 animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
                      {!companiesLoaded ? (
                        <div className="px-4 py-3 bg-gray-50 dark:bg-neutral-800 rounded-lg text-sm text-gray-500 dark:text-gray-400 animate-pulse">Loading...</div>
                      ) : gradeCompanies.length > 0 ? (
                        gradeCompanies.slice(0, 4).map((company, index) => (
                          <a
                            key={company.id}
                            href={`/slabs/company/${company.slug}`}
                            onClick={closeMobileMenu}
                            className="block px-4 py-3 bg-gray-50 dark:bg-neutral-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-all duration-300 hover:scale-[1.01] hover:translate-x-1"
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            {company.name}
                          </a>
                        ))
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 dark:bg-neutral-800 rounded-lg text-sm text-gray-500 dark:text-gray-400">No companies available</div>
                      )}
                      {gradeCompanies.length > 4 && (
                        <a
                          href="/slabs"
                          onClick={closeMobileMenu}
                          className="block px-4 py-2 text-center text-xs font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                        >
                          +{gradeCompanies.length - 4} more companies
                        </a>
                      )}
                    </div>
                  </div>

                  {/* View All Link */}
                  <div className="pt-2 animate-slideInLeft" style={{ animationDelay: '0.3s' }}>
                    <a
                      href="/slabs"
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg transition-all duration-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:scale-[1.02] hover:shadow-md"
                    >
                      View All Slabs →
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <a 
              href="#" 
              onClick={closeMobileMenu}
              className="block px-4 py-4 text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-lg transition-all duration-300 hover:scale-[1.02] animate-fadeInUp"
              style={{ animationDelay: '0.4s' }}
            >
              New Arrivals
            </a>
            
            {/* Mobile Sign In Button */}
            <div className="pt-4 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <button 
                onClick={closeMobileMenu}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg transform"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subsets Overlay */}
      {showSubsets && selectedSet && (
        <div className={`fixed inset-0 z-[60] sm:hidden transition-all duration-500 ease-in-out ${
          showSubsets ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}>
          <div className="bg-white dark:bg-neutral-900 h-full w-full overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-neutral-700 animate-slideInDown">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleBackToMenu}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-200 hover:scale-110 hover:-translate-x-1"
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
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-200 hover:scale-110"
              >
                <Xmark className="w-6 h-6" />
              </button>
            </div>

            {/* Subsets Content */}
            <div className="p-4">
              {/* Set Info */}
              <div className="mb-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{selectedSet.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Choose from available subsets</p>
              </div>

              {/* Subsets List */}
              <div className="space-y-2">
                {(subsetsBySetId[selectedSet.id] || []).map((subset, index) => (
                  <a
                    key={subset.id}
                    href={`/subsets/${subset.slug}`}
                    onClick={closeMobileMenu}
                    className="block p-4 bg-gray-50 dark:bg-neutral-800 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-md transform animate-slideInLeft"
                    style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                  >
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{subset.name}</div>
                  </a>
                ))}
              </div>

              {/* View Set Link */}
              <div className="mt-6 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                <a
                  href={`/sets/${selectedSet.slug}`}
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 text-center text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg transition-all duration-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:scale-[1.02] hover:shadow-md"
                >
                  View Full {selectedSet.name} Set →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add custom CSS animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-slideInDown {
          animation: slideInDown 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  )
} 