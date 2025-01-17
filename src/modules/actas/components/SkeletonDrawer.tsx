export const SkeletonDrawer = () => {
  return (
    <div className="p-4">
      <ul className="space-y-6">
        <li>
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-4 animate-pulse"></div>
          <ul className="grid grid-cols-2 gap-2">
            {[...Array(6)].map((_, index) => (
              <li key={index} className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></li>
            ))}
          </ul>
        </li>

        <li>
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-4 animate-pulse"></div>
          <ul className="grid grid-cols-2 gap-2">
            {[...Array(4)].map((_, index) => (
              <li key={index} className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></li>
            ))}
          </ul>
        </li>

        <li>
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-4 animate-pulse"></div>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse mb-2"></div>
            </div>
          ))}
        </li>

        <li>
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-4 animate-pulse"></div>
          <ul className="grid grid-cols-2 gap-2">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse mb-2"></div>
              </div>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  )
}
