import { useState } from 'react'
import { setKeyParams } from '../helpers/setKeyParams'

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

  const formFilter = (form: T) => {
    const data = setKeyParams(form)

    setFilterParams(data as T)
  }

  const resetFilter = (params: T) => {
    setFilterParams(params)
  }

  return {
    filterParams,
    updateFilter,
    formFilter,
    resetFilter
  }
}
