'use client'

import { useState, useEffect } from 'react'
import { NavArrowDown } from 'iconoir-react'
import { getSetsByCategory, getGradeCompanies, getAllSubsets } from '../../../../lib/database'

import NavbarLogo from './NavbarLogo'
import NavbarActions from './NavbarActions'
import PokemonDropdown from './PokemonDropdown'
import OnePieceDropdown from './OnePieceDropdown'
import SlabsDropdown from './SlabsDropdown'
import MobileMenu from './MobileMenu'

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
  const [companiesLoaded, setCompaniesLoaded] = useState(false)

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
        setCompaniesLoaded(true)
      } catch (error) {
        console.error('Error fetching sets:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSets()
  }, [])

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Disable scroll
      document.body.style.overflow = 'hidden'
    } else {
      // Re-enable scroll
      document.body.style.overflow = 'unset'
    }

    // Cleanup function to ensure scroll is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

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
    // Add a delay before clearing to allow users to move to subsets area
    setTimeout(() => {
      setHoveredSet(null)
    }, 300)
  }

  return (
    <header className="bg-white dark:bg-neutral-900 shadow-sm dark:shadow-neutral-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Section */}
          <NavbarLogo />
          
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
              {activeDropdown === 'pokemon' && (
                <PokemonDropdown
                  sets={pokemonSets}
                  isLoading={isLoading}
                  hoveredSet={hoveredSet}
                  subsetsBySetId={subsetsBySetId}
                  subsetsLoaded={subsetsLoaded}
                  handleSetHover={handleSetHover}
                  handleSetLeave={handleSetLeave}
                  setActiveDropdown={setActiveDropdown}
                />
              )}
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
              {activeDropdown === 'onepiece' && (
                <OnePieceDropdown
                  sets={onePieceSets}
                  isLoading={isLoading}
                  hoveredSet={hoveredSet}
                  subsetsBySetId={subsetsBySetId}
                  subsetsLoaded={subsetsLoaded}
                  handleSetHover={handleSetHover}
                  handleSetLeave={handleSetLeave}
                  setActiveDropdown={setActiveDropdown}
                />
              )}
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
              {activeDropdown === 'slabs' && (
                <SlabsDropdown
                  gradeCompanies={gradeCompanies}
                  companiesLoaded={companiesLoaded}
                  setActiveDropdown={setActiveDropdown}
                />
              )}
            </div>
            
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">
              New Arrivals
            </a>
          </nav>
          
          {/* Actions */}
          <NavbarActions 
            isMobileMenuOpen={isMobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
          />
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isMobileMenuOpen={isMobileMenuOpen}
          activeDropdown={activeDropdown}
          handleDropdownToggle={handleDropdownToggle}
          closeMobileMenu={closeMobileMenu}
          pokemonSets={pokemonSets}
          onePieceSets={onePieceSets}
          gradeCompanies={gradeCompanies}
          isLoading={isLoading}
          companiesLoaded={companiesLoaded}
          subsetsBySetId={subsetsBySetId}
          subsetsLoaded={subsetsLoaded}
        />

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