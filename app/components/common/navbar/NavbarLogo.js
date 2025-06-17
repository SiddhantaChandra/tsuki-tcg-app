import Image from 'next/image'

export default function NavbarLogo() {
  return (
    <div className="flex items-center space-x-3 sm:space-x-4">
      <Image 
        src="/assets/images/logo-1.webp" 
        alt="Tsuki Cards Logo" 
        width={32} 
        height={32}
        className="rounded-lg sm:w-10 sm:h-10"
      />
      <div className="hidden sm:block">
        <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Tsuki Cards
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-xs transition-colors duration-300 hidden md:block">
          Premium Trading Card Collection
        </p>
      </div>
      <div className="sm:hidden">
        <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Tsuki
        </h1>
      </div>
    </div>
  )
} 