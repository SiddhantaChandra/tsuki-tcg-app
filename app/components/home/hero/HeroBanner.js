'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HeroBanner() {
  // Animation variants for cards
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 100, 
      rotate: 0,
      scale: 0.8
    },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      rotate: custom.rotate,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: custom.delay,
        ease: "easeOut"
      }
    })
  }

  // Animation variants for text content
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  }

  // Animation variants for background shapes
  const shapeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (delay) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        delay: delay,
        ease: "easeOut"
      }
    })
  }

  return (
    <section className="mt-8 sm:mt-16 container mx-auto rounded-xl relative bg-gradient-to-br from-purple-200 via-pink-50 to-orange-100 dark:from-purple-900/40 dark:via-cyan-900/20 dark:to-amber-900/30 py-8 sm:py-12 px-4 sm:px-6 overflow-hidden transition-colors duration-300">
      {/* Background decorative shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse"
          variants={shapeVariants}
          initial="hidden"
          animate="visible"
          custom={0.1}
        />
        <motion.div 
          className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"
          variants={shapeVariants}
          initial="hidden"
          animate="visible"
          custom={0.2}
        />
        <motion.div 
          className="absolute bottom-10 left-1/4 w-24 h-24 bg-gradient-to-br from-orange-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse delay-2000"
          variants={shapeVariants}
          initial="hidden"
          animate="visible"
          custom={0.3}
        />
        <motion.div 
          className="absolute bottom-20 right-1/3 w-36 h-36 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse delay-500"
          variants={shapeVariants}
          initial="hidden"
          animate="visible"
          custom={0.4}
        />
        
        {/* Floating geometric shapes */}
        <motion.div 
          className="absolute top-1/4 left-1/5 w-6 h-6 bg-purple-300/40 rotate-45 animate-bounce delay-300"
          variants={shapeVariants}
          initial="hidden"
          animate="visible"
          custom={0.5}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-4 h-4 bg-pink-300/40 rounded-full animate-bounce delay-700"
          variants={shapeVariants}
          initial="hidden"
          animate="visible"
          custom={0.6}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/3 w-5 h-5 bg-orange-300/40 rotate-12 animate-bounce delay-1200"
          variants={shapeVariants}
          initial="hidden"
          animate="visible"
          custom={0.7}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Left Cards Fan - Hidden on Mobile */}
          <div className="relative h-80 hidden lg:block">
            {/* Far left card */}
            <motion.div 
              className="flex justify-center items-center flex-col gap-2 absolute top-12 left-8 px-6 py-4 bg-white dark:bg-neutral-800 rounded-xl shadow-lg dark:shadow-neutral-900/50 transition-colors duration-300"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={{ rotate: -12, delay: 0.2 }}
            >
              <Image 
                src="/assets/images/10.png" 
                alt="Card" 
                width={100} 
                height={126}
                className="rounded-lg mx-auto 2xl:w-28"
              />
              <div className="text-center mt-1">
                <div className="text-purple-600 font-bold text-xs">$299.99</div>
              </div>
            </motion.div>
            
            {/* Center left card */}
            <motion.div 
              className="flex justify-center items-center flex-col gap-2 absolute top-8 left-40 px-6 py-4 bg-white dark:bg-neutral-800 rounded-xl shadow-lg dark:shadow-neutral-900/50 transition-colors duration-300"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={{ rotate: 0, delay: 0.4 }}
            >
              <Image 
                src="/assets/images/16.jpg" 
                alt="Card" 
                width={100} 
                height={126}
                className="rounded-lg mx-auto 2xl:w-28"
              />
              <div className="text-center mt-1">
                <div className="text-purple-600 font-bold text-xs">$149.99</div>
              </div>
            </motion.div>
            
            {/* Right card */}
            <motion.div 
              className="flex justify-center items-center flex-col gap-2 absolute top-12 -right-8 px-6 py-4 bg-white dark:bg-neutral-800 rounded-xl shadow-lg dark:shadow-neutral-900/50 transition-colors duration-300"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={{ rotate: 12, delay: 0.6 }}
            >
              <Image 
                src="/assets/images/15.jpg" 
                alt="Card" 
                width={100} 
                height={126}
                className="rounded-lg mx-auto 2xl:w-28"
              />
              <div className="text-center mt-1">
                <div className="text-purple-600 font-bold text-xs">$89.99</div>
              </div>
            </motion.div>
          </div>

          {/* Center Text */}
          <motion.div 
            className="space-y-4 sm:space-y-6 text-center lg:col-span-1 col-span-full"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-4">
              <motion.div 
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <span>✨</span>
                <span className="font-medium">NEW CARDS DAILY</span>
              </motion.div>
              
              <motion.h1 
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight transition-colors duration-300 px-4 sm:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                Discover
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent"> Legendary</span>
                {' '}Trading Cards
              </motion.h1>
              
              <motion.p 
                className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto transition-colors duration-300 px-4 sm:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                From Team Rocket&apos;s dark power to One Piece adventures, explore our premium collection 
                of authentic trading cards.
              </motion.p>
            </div>
          </motion.div>
          
          {/* Right Cards Fan - Hidden on Mobile */}
          <div className="relative h-80 hidden lg:block">
            {/* Far left card */}
            <motion.div 
              className="flex justify-center items-center flex-col gap-2 absolute top-12 -left-4 px-6 py-4 bg-white dark:bg-neutral-800 rounded-xl shadow-lg dark:shadow-neutral-900/50 transition-colors duration-300"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={{ rotate: -12, delay: 0.8 }}
            >
              <Image 
                src="/assets/images/13.jpg" 
                alt="Card" 
                width={100} 
                height={126}
                className="rounded-lg mx-auto 2xl:w-28"
              />
              <div className="text-center mt-1">
                <div className="text-purple-600 font-bold text-xs">$199.99</div>
              </div>
            </motion.div>
            
            {/* Center card */}
            <motion.div 
              className="flex justify-center items-center flex-col gap-2 absolute top-8 left-24 px-6 py-4 bg-white dark:bg-neutral-800 rounded-xl shadow-lg dark:shadow-neutral-900/50 transition-colors duration-300"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={{ rotate: 0, delay: 1.0 }}
            >
              <Image 
                src="/assets/images/4.jpg" 
                alt="Card" 
                width={100} 
                height={126}
                className="rounded-lg mx-auto 2xl:w-28"
              />
              <div className="text-center mt-1">
                <div className="text-purple-600 font-bold text-xs">$249.99</div>
              </div>
            </motion.div>
            
            {/* Far right card */}
            <motion.div 
              className="flex justify-center items-center flex-col gap-2 absolute top-12 right-12 px-6 py-4 bg-white dark:bg-neutral-800 rounded-xl shadow-lg dark:shadow-neutral-900/50 2xl:right-12 transition-colors duration-300"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={{ rotate: 12, delay: 1.2 }}
            >
              <Image 
                src="/assets/images/12.jpg" 
                alt="Card" 
                width={100} 
                height={126}
                className="rounded-lg mx-auto 2xl:w-28"
              />
              <div className="text-center mt-1">
                <div className="text-purple-600 font-bold text-xs">$179.99</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
} 