'use client'

import { useState, useEffect } from 'react'
import SignInModal from './SignInModal'
import SignUpModal from './SignUpModal'
import SignInModalMobile from './SignInModalMobile'
import SignUpModalMobile from './SignUpModalMobile'

export default function AuthModals() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }

    // Check initial screen size
    checkScreenSize()

    // Listen for window resize
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <>
      {isMobile ? (
        // Mobile: Show both modals without fade transitions
        <>
          <SignInModalMobile />
          <SignUpModalMobile />
        </>
      ) : (
        // Desktop: Keep existing behavior
        <>
          <SignInModal />
          <SignUpModal />
        </>
      )}
    </>
  )
} 