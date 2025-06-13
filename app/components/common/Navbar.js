'use client'

import Image from 'next/image'
import { Search, Cart } from 'iconoir-react'

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image 
              src="/logo-1.webp" 
              alt="Tsuki Cards Logo" 
              width={40} 
              height={40}
              className="rounded-lg"
            />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Tsuki Cards
              </h1>
              <p className="text-gray-600 text-xs">Premium Trading Card Collection</p>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#recent" className="text-gray-700 hover:text-purple-600 transition-colors">New Arrivals</a>
            <a href="#teamrocket" className="text-gray-700 hover:text-purple-600 transition-colors">Team Rocket</a>
            <a href="#onepiece" className="text-gray-700 hover:text-purple-600 transition-colors">One Piece</a>
            <a href="#recommended" className="text-gray-700 hover:text-purple-600 transition-colors">Recommended</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">Collections</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900">
              <Search className="w-5 h-5" />
            </button>
            <button className="relative p-2 text-gray-600 hover:text-gray-900">
              <Cart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  )
} 