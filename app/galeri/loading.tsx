export default function GaleriLoading() {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-pulse">
          <div className="h-8 bg-purple-200 rounded-full w-48 mx-auto mb-6"></div>
          <div className="h-12 bg-gray-300 rounded-md w-1/2 mx-auto mb-6"></div>
          <div className="h-6 bg-gray-200 rounded-md w-2/3 mx-auto"></div>
        </div>

        {/* Search and Filters Skeleton */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-12 border animate-pulse">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1 h-12 bg-gray-200 rounded-md"></div>
            <div className="flex gap-2">
              <div className="h-12 w-24 bg-gray-200 rounded-md"></div>
              <div className="h-12 w-12 bg-gray-200 rounded-md"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-6 bg-gray-50 rounded-xl">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-24 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>

        {/* Gallery Grid Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="animate-pulse bg-white rounded-xl shadow-lg overflow-hidden h-full">
              <div className="w-full aspect-video bg-gray-200"></div>
              <div className="p-6">
                <div className="h-4 bg-purple-100 rounded w-24 mb-3"></div>
                <div className="h-6 bg-gray-300 rounded w-5/6 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="flex justify-between items-center text-sm">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
