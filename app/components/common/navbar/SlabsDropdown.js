import Image from 'next/image'

export default function SlabsDropdown({
  gradeCompanies,
  companiesLoaded,
  setActiveDropdown
}) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-lg min-w-[700px] z-50 overflow-hidden">
      <div className="grid grid-cols-10 gap-0">
        {/* Image Column */}
        <div className="col-span-5 relative h-full">
          <Image
            src="/assets/images/navbar/Slabs-nav.webp"
            alt="Graded Card Slabs"
            width={400}
            height={240}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 to-transparent"></div>
          <div className="absolute bottom-4 left-4">
            <h3 className="text-white font-bold text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Graded Slabs</h3>
            <p className="text-white/90 text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">Professional Authentication</p>
          </div>
        </div>

        {/* Categories Column */}
        <div className="col-span-3 py-5 px-5 border-r border-gray-200 dark:border-neutral-700">
          <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Categories</h4>
          <div className="space-y-2">
            <a
              href="/slabs/category/poke"
              className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded transition-colors"
              onClick={() => setActiveDropdown(null)}
            >
              Pokemon Slabs
            </a>
            <a
              href="/slabs/category/op"
              className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded transition-colors"
              onClick={() => setActiveDropdown(null)}
            >
              One Piece Slabs
            </a>
          </div>
        </div>

        {/* Grade Companies Column */}
        <div className="col-span-2 py-5 px-4">
          <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Companies</h4>
          <div className="space-y-1">
            {!companiesLoaded ? (
              <div className="py-2 text-gray-500 dark:text-gray-400 text-sm">Loading...</div>
            ) : gradeCompanies.length > 0 ? (
              gradeCompanies.map((company) => (
                <a
                  key={company.id}
                  href={`/slabs/company/${company.slug}`}
                  className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded transition-colors"
                  onClick={() => setActiveDropdown(null)}
                >
                  {company.name}
                </a>
              ))
            ) : (
              <div className="py-2 text-gray-500 dark:text-gray-400 text-sm">No companies available</div>
            )}
          </div>
        </div>
      </div>
      
      {/* View All Slabs Link */}
      <div className="border-t border-gray-200 dark:border-neutral-700 px-5 py-2 text-right">
        <a
          href="/slabs"
          className="inline-block text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          onClick={() => setActiveDropdown(null)}
        >
          View All Slabs →
        </a>
      </div>
    </div>
  )
} 