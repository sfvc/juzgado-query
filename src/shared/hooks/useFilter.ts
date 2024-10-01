import { useState } from 'react'

export const useFilter =  <T>(initialValues: T) => {
  const [filterParams, setFilterParams] = useState<T>(initialValues)

  const updateFilter = (key: string, value: string | number) => {
    setFilterParams(prev => {
      if (key === 'page') {
        return {
          ...prev,
          [key]: Number(value)
        }
      }
      else {
        return {
          ...prev,
          [key]: value,
          page: 1
        } 
      }
    })
  }

  return {
    filterParams,
    updateFilter
  }
}
