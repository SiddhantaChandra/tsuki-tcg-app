'use client'

import { useState, useEffect, use } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getSlabById, formatPrice } from '../../../lib/database'

export default function SlabDetailPage({ params }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [slab, setSlab] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // Unwrap the params Promise
  const unwrappedParams = use(params)
  
  useEffect(() => {
    async function loadSlab() {
      try {
        const slabData = await getSlabById(unwrappedParams.id)
        if (!slabData) {
          notFound()
        }
        setSlab(slabData)
      } catch (error) {
        console.error('Error loading slab:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    loadSlab()
  }, [unwrappedParams.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 transition-colors duration-300 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-900 dark:text-white text-lg">Loading slab details...</div>
          </div>
        </div>
      </div>
    )
  }

  if (!slab) {
    notFound()
  }

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change))
  }

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${slab.name} to cart`)
  }

  // Get images from database or use fallback
  const images = slab.image_urls && slab.image_urls.length > 0 
    ? slab.image_urls 
    : [slab.thumbnail_url || '/assets/images/placeholder.jpg']

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 transition-colors duration-300 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm">
          <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            Home
          </Link>
          <span className="mx-2 text-gray-400">&gt;</span>
          <Link href="/slabs" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            All slabs
          </Link>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span className="text-gray-900 dark:text-white">{slab.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-[3/4] bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={images[selectedImage]}
                alt={slab.name}
                width={500}
                height={667}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex space-x-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-26 rounded-md overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${slab.name} view ${index + 1}`}
                    width={80}
                    height={107}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {slab.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                  {slab.grade_companies?.name || 'Graded'} {slab.grade_score}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Condition: {slab.condition}
                </span>
              </div>
              <div className="text-4xl font-bold text-orange-500 mb-2">
                {formatPrice(slab.price)}
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Stock:</span>
              <span className="text-sm text-red-600 dark:text-red-400 font-medium">
                ● The remaining one.
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity:</span>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="px-4 py-2 text-gray-900 dark:text-white font-medium min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
              >
                Add to Cart
              </button>
              
              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2">
                <span>PayPal</span>
                <span>で支払う</span>
              </button>
              
              <div className="text-center">
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  Another payment method
                </button>
              </div>
            </div>

            {/* Shipping Notice */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                ★ Order until 1pm and ship on the day!
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                Please check before purchasing.
              </p>
            </div>

            {/* Product Links */}
            <div className="space-y-2">
              <Link href="#" className="block text-sm text-orange-500 hover:text-orange-600 hover:underline">
                User's Guide
              </Link>
              <Link href="#" className="block text-sm text-orange-500 hover:text-orange-600 hover:underline">
                About delivery
              </Link>
              <Link href="#" className="block text-sm text-orange-500 hover:text-orange-600 hover:underline">
                About refund
              </Link>
            </div>

            {/* Slab Details */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Slab Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {slab.categories && (
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Category:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{slab.categories.name}</span>
                  </div>
                )}
                {slab.sets && (
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Set:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{slab.sets.name}</span>
                  </div>
                )}
                {slab.subsets && (
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Subset:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{slab.subsets.name}</span>
                  </div>
                )}
                {slab.grade_companies && (
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Grading Company:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{slab.grade_companies.name}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Grade:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{slab.grade_score}</span>
                </div>
                {slab.language && (
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Language:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{slab.language}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Added:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {new Date(slab.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 