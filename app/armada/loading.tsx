export default function ArmadaLoading() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16 animate-pulse">
          <div className="h-8 bg-gray-200 rounded-full w-48 mx-auto mb-4"></div>
          <div className="h-12 bg-gray-300 rounded-md w-1/2 mx-auto mb-6"></div>
          <div className="h-6 bg-gray-200 rounded-md w-2/3 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="w-full aspect-video bg-gray-200"></div>
              <div className="p-5 space-y-4">
                <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
                <div className="flex justify-center gap-4">
                  <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                  <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-10 bg-gray-300 rounded-lg w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
