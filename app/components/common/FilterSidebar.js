'use client'

import { useState } from 'react'

export default function FilterSidebar({ onFiltersChange, maxPrice = 10000 }) {
  const [inStock, setInStock] = useState(false)
  const [priceRange, setPriceRange] = useState([0, maxPrice])
  const [sortBy, setSortBy] = useState('newest')

  const handleInStockChange = (checked) => {
    setInStock(checked)
    onFiltersChange({
      inStock: checked,
      priceRange,
      sortBy
    })
  }

  const handlePriceRangeChange = (index, value) => {
    const newRange = [...priceRange]
    newRange[index] = parseInt(value) || 0
    setPriceRange(newRange)
    onFiltersChange({
      inStock,
      priceRange: newRange,
      sortBy
    })
  }

  const handleSortChange = (value) => {
    setSortBy(value)
    onFiltersChange({
      inStock,
      priceRange,
      sortBy: value
    })
  }

  const resetFilters = () => {
    setInStock(false)
    setPriceRange([0, maxPrice])
    setSortBy('newest')
    onFiltersChange({
      inStock: false,
      priceRange: [0, maxPrice],
      sortBy: 'newest'
    })
  }

  return (
    <div className="w-64 bg-white dark:bg-neutral-800 p-6 border-r border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
        <button
          onClick={resetFilters}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Stock Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Availability</h4>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => handleInStockChange(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">In Stock Only</span>
        </label>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Price Range</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Min Price</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500 dark:text-gray-400">₹</span>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Max Price</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500 dark:text-gray-400">₹</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={maxPrice.toString()}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Sort By</h4>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>

      {/* Active Filters Summary */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Active Filters</h4>
        <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
          {inStock && (
            <div className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
              In Stock Only
            </div>
          )}
          {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
            <div className="bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
              ₹{priceRange[0]} - ₹{priceRange[1]}
            </div>
          )}
          {sortBy !== 'newest' && (
            <div className="bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded">
              Sort: {sortBy.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 