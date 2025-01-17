export const SkeletonDrawer = () => {
  return (
    <div>
      <ul className="grid grid-cols-1 gap-8">
        {[...Array(5)].map((_, index) => (
          <li key={index} className="flex items-center space-x-1 animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </li>
        ))}
    
        <div className="flex justify-between gap-2">
          {[...Array(3)].map((_, index) => (
            <li key={index} className="flex items-center space-x-1 animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </li>
          ))}
        </div>
    
        {[...Array(2)].map((_, index) => (
          <li key={index} className="flex items-center space-x-1 animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </li>
        ))}
    
        <div className="animate-pulse">
          <h4 className="h-6 bg-gray-300 rounded w-1/4 mb-4"></h4>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex justify-between gap-2">
              <li className="flex items-center space-x-1">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </li>
              <li className="flex items-center space-x-1">
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              </li>
            </div>
          ))}
        </div>
    
        <div className="grid grid-cols-2 gap-2 animate-pulse">
          {[...Array(6)].map((_, index) => (
            <li key={index} className="flex items-center space-x-1">
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  )
}
