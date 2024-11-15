import React from 'react'

export const TableSkeleton = ({colums}: {colums: number}) => {
  return (
    <React.Fragment>
      {
        Array.from({ length: 10 }).map((_, index) => (
          <tr key={index} className="bg-gray-100 animate-pulse border-y border-gray-300 dark:border-gray-600">
            <td colSpan={colums} className='text-center py-6 dark:bg-gray-800'>
              <div role="status" className="flex justify-between gap-4 animate-pulse mx-4">
                <div className="h-3.5 flex-1 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="h-3.5 flex-1 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="h-3.5 flex-1 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
            </td>
          </tr>
        ))
      }
    </React.Fragment>
  )
}