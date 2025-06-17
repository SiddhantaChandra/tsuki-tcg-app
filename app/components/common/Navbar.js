'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Search, Cart, Menu, Xmark, NavArrowDown } from 'iconoir-react'
import DarkModeToggle from './DarkModeToggle'
import { getSetsByCategory, getGradeCompanies, getSubsetsBySetId, getAllSubsets } from '../../../lib/database'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [pokemonSets, setPokemonSets] = useState([])
  const [onePieceSets, setOnePieceSets] = useState([])
  const [gradeCompanies, setGradeCompanies] = useState([])
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredSet, setHoveredSet] = useState(null)
  const [subsetsBySetId, setSubsetsBySetId] = useState({})
  const [subsetsLoaded, setSubsetsLoaded] = useState(false)

  // Fetch sets data on component mount
  useEffect(() => {
    const fetchSets = async () => {
      try {
        const [pokemon, onePiece, companies, allSubsets] = await Promise.all([
          getSetsByCategory('poke'),
          getSetsByCategory('op'),
          getGradeCompanies(),
          getAllSubsets()
        ])
        console.log('Fetched Pokemon sets:', pokemon) // Debug log
        console.log('Fetched One Piece sets:', onePiece) // Debug log
        console.log('Fetched all subsets:', allSubsets) // Debug log
        
        setPokemonSets(pokemon)
        setOnePieceSets(onePiece)
        setGradeCompanies(companies)
        
        // Organize subsets by set_id for instant access
        const subsetsMap = {}
        allSubsets.forEach(subset => {
          if (!subsetsMap[subset.set_id]) {
            subsetsMap[subset.set_id] = []
          }
          subsetsMap[subset.set_id].push(subset)
        })
        console.log('Organized subsets by set ID:', subsetsMap) // Debug log
        setSubsetsBySetId(subsetsMap)
        setSubsetsLoaded(true)
      } catch (error) {
        console.error('Error fetching sets:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSets()
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    setActiveDropdown(null) // Close any open dropdowns
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
  }

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const handleSetHover = (set) => {
    console.log('Hovering over set:', set) // Debug log
    console.log('Available subsets for this set:', subsetsBySetId[set.id] || []) // Debug log
    setHoveredSet(set)
  }

  const handleSetLeave = () => {
    // Add a small delay before clearing to prevent flickering
    setTimeout(() => {
      setHoveredSet(null)
    }, 150)
  }

  const renderDropdown = (sets, category) => {
    const getImageSrc = () => {
      if (category === 'poke') return '/assets/images/navbar/Poke-nav.webp'
      if (category === 'op') return '/assets/images/navbar/OP-nav.webp'
      return null
    }

    const getCategoryName = () => {
      if (category === 'poke') return 'Pokemon'
      if (category === 'op') return 'One Piece'
      return ''
    }

    // Pokemon dropdown with subsets functionality
    if (category === 'poke') {
      return (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-lg min-w-[750px] z-50 overflow-hidden">
          <div className="grid grid-cols-12 gap-0">
            {/* Image Column */}
            <div className="col-span-4 relative h-full">
              <Image
                src={getImageSrc()}
                alt={`${getCategoryName()} Cards`}
                width={350}
                height={210}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white font-bold text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{getCategoryName()}</h3>
                <p className="text-white/90 text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">Trading Cards Collection</p>
              </div>
            </div>

            {/* Sets Column */}
            <div className="col-span-4 py-5 px-4 border-r border-gray-200 dark:border-neutral-700">
              <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Available Sets</h4>
              <div className="space-y-1" onMouseLeave={handleSetLeave}>
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

            {/* Subsets Column */}
            <div className="col-span-4 py-5 px-4">
              <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
                {hoveredSet ? `${hoveredSet.name} Subsets` : 'Subsets'}
              </h4>
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
                      className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded transition-colors"
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
          
          {/* View All Link */}
          <div className="border-t border-gray-200 dark:border-neutral-700 px-5 py-2 text-right">
            <a
              href={`/category/${category}`}
              className="inline-block text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
              onClick={() => setActiveDropdown(null)}
            >
              View All {getCategoryName()} Cards →
            </a>
          </div>
        </div>
      )
    }

    // One Piece dropdown (original layout)
    return (
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-lg min-w-[550px] z-50 overflow-hidden">
        <div className="grid grid-cols-7 gap-0">
          {/* Image Column */}
          <div className="col-span-4 relative h-full">
            <Image
              src={getImageSrc()}
              alt={`${getCategoryName()} Cards`}
              width={350}
              height={210}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <h3 className="text-white font-bold text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{getCategoryName()}</h3>
              <p className="text-white/90 text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">Trading Cards Collection</p>
            </div>
          </div>

          {/* Sets Column */}
          <div className="col-span-3 py-5 px-5">
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
            href={`/category/${category}`}
            className="inline-block text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
            onClick={() => setActiveDropdown(null)}
          >
            View All {getCategoryName()} Cards →
          </a>
        </div>
      </div>
    )
  }

  const renderSlabsDropdown = () => (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-lg min-w-[700px] z-50 overflow-hidden">
      <div className="grid grid-cols-10 gap-0">
        {/* Image Column */}
        <div className="col-span-5 relative h-full">
          <Image
            src="/assets/images/navbar/Slabs-nav.webp"
            alt="Graded Card Slabs"
            width={400}
            height={240}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 to-transparent"></div>
          <div className="absolute bottom-4 left-4">
            <h3 className="text-white font-bold text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Graded Slabs</h3>
            <p className="text-white/90 text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">Professional Authentication</p>
          </div>
        </div>

        {/* Categories Column */}
        <div className="col-span-3 py-5 px-5 border-r border-gray-200 dark:border-neutral-700">
          <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Categories</h4>
          <div className="space-y-2">
            <a
              href="/slabs/category/poke"
              className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded transition-colors"
              onClick={() => setActiveDropdown(null)}
            >
              Pokemon Slabs
            </a>
            <a
              href="/slabs/category/op"
              className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded transition-colors"
              onClick={() => setActiveDropdown(null)}
            >
              One Piece Slabs
            </a>
          </div>
        </div>

        {/* Grade Companies Column */}
        <div className="col-span-2 py-5 px-4">
          <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Companies</h4>
          <div className="space-y-1">
            {isLoading ? (
              <div className="py-2 text-gray-500 dark:text-gray-400 text-sm">Loading...</div>
            ) : gradeCompanies.length > 0 ? (
              gradeCompanies.map((company) => (
                <a
                  key={company.id}
                  href={`/slabs/company/${company.slug}`}
                  className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded transition-colors"
                  onClick={() => setActiveDropdown(null)}
                >
                  {company.name}
                </a>
              ))
            ) : (
              <div className="py-2 text-gray-500 dark:text-gray-400 text-sm">No companies available</div>
            )}
          </div>
        </div>
      </div>
      
      {/* View All Slabs Link */}
      <div className="border-t border-gray-200 dark:border-neutral-700 px-5 py-2 text-right">
        <a
          href="/slabs"
          className="inline-block text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          onClick={() => setActiveDropdown(null)}
        >
          View All Slabs →
        </a>
      </div>
    </div>
  )

  return (
    <header className="bg-white dark:bg-neutral-900 shadow-sm dark:shadow-neutral-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Image 
              src="/logo-1.webp" 
              alt="Tsuki Cards Logo" 
              width={32} 
              height={32}
              className="rounded-lg sm:w-10 sm:h-10"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Tsuki Cards
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-xs transition-colors duration-300 hidden md:block">
                Premium Trading Card Collection
              </p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Tsuki
              </h1>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Pokemon Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('pokemon')}
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
              >
                <span>Pokemon</span>
                <NavArrowDown className={`w-4 h-4 transition-transform ${activeDropdown === 'pokemon' ? 'rotate-180' : ''}`} />
              </button>
                             {activeDropdown === 'pokemon' && renderDropdown(pokemonSets, 'poke')}
            </div>

            {/* One Piece Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('onepiece')}
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
              >
                <span>One Piece</span>
                <NavArrowDown className={`w-4 h-4 transition-transform ${activeDropdown === 'onepiece' ? 'rotate-180' : ''}`} />
              </button>
                             {activeDropdown === 'onepiece' && renderDropdown(onePieceSets, 'op')}
            </div>

            {/* Slabs Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('slabs')}
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
              >
                <span>Slabs</span>
                <NavArrowDown className={`w-4 h-4 transition-transform ${activeDropdown === 'slabs' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'slabs' && renderSlabsDropdown()}
            </div>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">
              New Arrivals
            </a>
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center space-x-2 lg:space-x-4">
            <DarkModeToggle />
            <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors touch-manipulation">
              <Search className="w-5 h-5" />
            </button>
            <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors touch-manipulation">
              <Cart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </button>
            <button className="px-3 py-2 lg:px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all touch-manipulation">
              Sign In
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex sm:hidden items-center space-x-2">
            <DarkModeToggle />
            <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors touch-manipulation">
              <Search className="w-5 h-5" />
            </button>
            <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors touch-manipulation">
              <Cart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors touch-manipulation"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <Xmark className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-neutral-900 border-t border-gray-100 dark:border-neutral-800">
              {/* Pokemon Mobile Section */}
              <div>
                <button 
                  onClick={() => handleDropdownToggle('pokemon-mobile')}
                  className="flex items-center justify-between w-full px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-md transition-colors touch-manipulation"
                >
                  <span>Pokemon</span>
                  <NavArrowDown className={`w-4 h-4 transition-transform ${activeDropdown === 'pokemon-mobile' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'pokemon-mobile' && (
                  <div className="ml-4 mt-1 space-y-1">
                    {isLoading ? (
                      <div className="px-3 py-2 text-gray-500 dark:text-gray-400">Loading...</div>
                    ) : pokemonSets.length > 0 ? (
                      pokemonSets.map((set) => (
                        <a
                          key={set.id}
                          href={`/sets/${set.slug}`}
                          onClick={closeMobileMenu}
                          className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-md transition-colors touch-manipulation"
                        >
                          {set.name}
                        </a>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-gray-500 dark:text-gray-400">No sets available</div>
                    )}
                                         <a
                       href="/category/poke"
                       onClick={closeMobileMenu}
                       className="block px-3 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-md transition-colors touch-manipulation"
                     >
                       View All Pokemon Cards
                     </a>
                  </div>
                )}
              </div>

              {/* One Piece Mobile Section */}
              <div>
                <button 
                  onClick={() => handleDropdownToggle('onepiece-mobile')}
                  className="flex items-center justify-between w-full px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-md transition-colors touch-manipulation"
                >
                  <span>One Piece</span>
                  <NavArrowDown className={`w-4 h-4 transition-transform ${activeDropdown === 'onepiece-mobile' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'onepiece-mobile' && (
                  <div className="ml-4 mt-1 space-y-1">
                    {isLoading ? (
                      <div className="px-3 py-2 text-gray-500 dark:text-gray-400">Loading...</div>
                    ) : onePieceSets.length > 0 ? (
                      onePieceSets.map((set) => (
                        <a
                          key={set.id}
                          href={`/sets/${set.slug}`}
                          onClick={closeMobileMenu}
                          className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-md transition-colors touch-manipulation"
                        >
                          {set.name}
                        </a>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-gray-500 dark:text-gray-400">No sets available</div>
                    )}
                                         <a
                       href="/category/op"
                       onClick={closeMobileMenu}
                       className="block px-3 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-md transition-colors touch-manipulation"
                     >
                       View All One Piece Cards
                     </a>
                  </div>
                )}
              </div>

              {/* Slabs Mobile Section */}
              <div>
                <button 
                  onClick={() => handleDropdownToggle('slabs-mobile')}
                  className="flex items-center justify-between w-full px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-md transition-colors touch-manipulation"
                >
                  <span>Slabs</span>
                  <NavArrowDown className={`w-4 h-4 transition-transform ${activeDropdown === 'slabs-mobile' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'slabs-mobile' && (
                  <div className="ml-4 mt-1 space-y-1">
                    {/* Categories */}
                    <div className="px-3 py-2">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Categories</div>
                      <div className="space-y-1">
                        <a
                          href="/slabs/category/poke"
                onClick={closeMobileMenu}
                          className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-md transition-colors touch-manipulation"
              >
                          Pokemon Slabs
              </a>
              <a 
                          href="/slabs/category/op"
                onClick={closeMobileMenu}
                          className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-md transition-colors touch-manipulation"
                        >
                          One Piece Slabs
                        </a>
                      </div>
                    </div>

                    {/* Grade Companies */}
                    <div className="px-3 py-2">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Grade Companies</div>
                      <div className="space-y-1">
                        {isLoading ? (
                          <div className="px-3 py-2 text-gray-500 dark:text-gray-400">Loading...</div>
                        ) : gradeCompanies.length > 0 ? (
                          gradeCompanies.map((company) => (
                            <a
                              key={company.id}
                              href={`/slabs/company/${company.slug}`}
                onClick={closeMobileMenu}
                              className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-md transition-colors touch-manipulation"
                            >
                              {company.name}
                            </a>
                          ))
                        ) : (
                          <div className="px-3 py-2 text-gray-500 dark:text-gray-400">No companies available</div>
                        )}
                      </div>
                    </div>

                    <a
                      href="/slabs"
                onClick={closeMobileMenu}
                      className="block px-3 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-md transition-colors touch-manipulation"
              >
                      View All Slabs
              </a>
                  </div>
                )}
              </div>
              <a 
                href="#" 
                onClick={closeMobileMenu}
                className="block px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-md transition-colors touch-manipulation"
              >
                New Arrivals
              </a>
              
              {/* Mobile Sign In Button */}
              <div className="pt-2">
                <button 
                  onClick={closeMobileMenu}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-base font-medium hover:from-purple-700 hover:to-pink-700 transition-all touch-manipulation"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Overlay to close dropdowns when clicking outside */}
        {activeDropdown && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setActiveDropdown(null)}
          />
        )}
      </div>
    </header>
  )
} 