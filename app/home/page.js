'use client'

import HeroBanner from '@/app/components/home/hero/HeroBanner'
import Navbar from '@/app/components/common/Navbar'
import RecentlyAddedSection from '@/app/components/home/RecentlyAddedSection'
import TeamRocketSection from '@/app/components/home/TeamRocketSection'
import OnePieceSection from '@/app/components/home/OnePieceSection'
import RecommendedSection from '@/app/components/home/RecommendedSection'
import Footer from '@/app/components/common/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroBanner />
      <RecentlyAddedSection />
      <TeamRocketSection />
      <OnePieceSection />
      <RecommendedSection />
      <Footer />
    </div>
  )
} 