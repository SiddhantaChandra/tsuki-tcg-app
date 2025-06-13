'use client'

import HeroBanner from '@/app/components/home/hero/HeroBanner'
import Navbar from '@/app/components/common/Navbar'
import RecentlyAddedSection from '@/app/components/home/sections/RecentlyAddedSection'
import FeaturedSection from '@/app/components/home/sections/FeaturedSection'
import OnePieceSection from '@/app/components/home/sections/OnePieceSection'
import RecommendedSection from '@/app/components/home/sections/RecommendedSection'
import Footer from '@/app/components/common/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroBanner />
      <RecentlyAddedSection />
      <FeaturedSection />
      <OnePieceSection />
      <RecommendedSection />
      <Footer />
    </div>
  )
} 