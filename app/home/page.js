'use client'

import HeroBanner from '@/app/components/home/hero/HeroBanner'
import Navbar from '@/app/components/common/navbar/Navbar'
import RecentlyAddedSection from '@/app/components/home/sections/RecentlyAddedSection'
import FeaturedSection from '@/app/components/home/sections/FeaturedSection'
import OnePieceSection from '@/app/components/home/sections/OnePieceSection'
import SlabsSection from '@/app/components/home/sections/SlabsSection'
import RecommendedSection from '@/app/components/home/sections/RecommendedSection'
import Footer from '@/app/components/common/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 transition-colors duration-300">
      <Navbar />
      <HeroBanner />
      <RecentlyAddedSection />
      <FeaturedSection />
      <OnePieceSection />
      <SlabsSection />
      <RecommendedSection />
      <Footer />
    </div>
  )
} 