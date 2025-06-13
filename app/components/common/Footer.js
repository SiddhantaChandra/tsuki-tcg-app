'use client'

import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pb-4 pt-8 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Image 
                src="/logo-1.webp" 
                alt="Tsuki Cards Logo" 
                width={30} 
                height={30}
                className="rounded"
              />
              <span className="text-lg font-bold">Tsuki Cards</span>
            </div>
            <p className="text-gray-400">
              Premium trading cards from across the multiverse. Authentic, verified, and delivered with care.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Collections</h4>
            <div className="space-y-2 text-gray-400">
              <a href="#" className="block hover:text-white transition-colors">New Arrivals</a>
              <a href="#" className="block hover:text-white transition-colors">Team Rocket</a>
              <a href="#" className="block hover:text-white transition-colors">One Piece</a>
              <a href="#" className="block hover:text-white transition-colors">Recommended</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <div className="space-y-2 text-gray-400">
              <a href="#" className="block hover:text-white transition-colors">Help Center</a>
              <a href="#" className="block hover:text-white transition-colors">Authentication</a>
              <a href="#" className="block hover:text-white transition-colors">Shipping Info</a>
              <a href="#" className="block hover:text-white transition-colors">Returns</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Account</h4>
            <div className="space-y-2 text-gray-400">
              <a href="#" className="block hover:text-white transition-colors">My Orders</a>
              <a href="#" className="block hover:text-white transition-colors">Wishlist</a>
              <a href="#" className="block hover:text-white transition-colors">Profile</a>
              <a href="#" className="block hover:text-white transition-colors">Settings</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Tsuki Cards. All rights reserved. • Authentic Cards • Secure Trading
          </p>
        </div>
      </div>
    </footer>
  )
} 