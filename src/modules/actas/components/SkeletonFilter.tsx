export const SkeletonFilter = () => {
  const array = Array.from({ length: 8 })

  return (
    <>
      <div className='grid md:grid-cols-2 gap-4 grid-cols-1 mt-4'>
        {
          array.map((_, index) => (
            <div key={index} className="flex flex-col gap-0.5">
              <span className="animate-pulse bg-gray-200 dark:bg-gray-700 w-1/2 h-3 rounded-lg"></span>
              <div className='animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-10 my-2'></div>
            </div>

          ))
        }
      </div>

      <div className='grid md:grid-cols-2 gap-4 grid-cols-1 my-6 py-4 px-4 border rounded-lg '>
        <div className='animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-10 my-2'></div>
        <div className='animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-10 my-2'></div>
      </div>
    </>
  )
}
