import Image from 'next/image'

export default function SlabsDropdown({
  gradeCompanies,
  companiesLoaded,
  setActiveDropdown
}) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-7 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-lg min-w-[320px] sm:min-w-[750px] w-[95vw] sm:w-auto max-w-[750px] h-80 z-50 overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-0 h-80">
        {/* Image Column - Fixed dimensions, hidden on mobile */}
        <div className="hidden sm:block sm:col-span-4 relative h-80">
          <Image
            src="/assets/images/navbar/Slabs-nav.webp"
            alt="Graded Card Slabs"
            width={350}
            height={320}
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 to-transparent"></div>
          <div className="absolute bottom-4 left-4">
            <h3 className="text-white font-bold text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Graded Slabs</h3>
            <p className="text-white/90 text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">Professional Authentication</p>
          </div>
        </div>

        {/* Categories Column with View All at bottom */}
        <div className="col-span-1 sm:col-span-4 h-80 flex flex-col border-r border-gray-200 dark:border-neutral-700">
          <div className="flex-1 py-5 px-4 overflow-y-auto">
            <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Categories</h4>
            <div className="space-y-1">
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
          
          {/* View All Link - At bottom of categories column */}
          <div className="border-t border-gray-200 dark:border-neutral-700 px-5 py-2 text-right flex-shrink-0">
            <a
              href="/slabs"
              className="inline-block text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
              onClick={() => setActiveDropdown(null)}
            >
              View All Slabs →
            </a>
          </div>
        </div>

        {/* Grade Companies Column - Full Height */}
        <div className="col-span-1 sm:col-span-4 h-80 py-5 px-4 border-l border-gray-200 dark:border-neutral-700 flex flex-col">
          <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex-shrink-0">Grade Companies</h4>
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-1">
              {!companiesLoaded ? (
                <div className="py-2 text-gray-500 dark:text-gray-400 text-sm">Loading...</div>
              ) : gradeCompanies.length > 0 ? (
                gradeCompanies.map((company) => (
                  <a
                    key={company.id}
                    href={`/slabs/company/${company.slug}`}
                    className="block px-3 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded transition-colors"
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
      </div>
    </div>
  )
} 