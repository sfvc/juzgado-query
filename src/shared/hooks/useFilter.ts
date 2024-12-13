import { useState } from 'react'
import { setKeyParams } from '../helpers/setKeyParams'

export const useFilter =  <T>(initialValues: T) => {
  const [filterParams, setFilterParams] = useState<T>(initialValues)

  // Filtro para inputs
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

  // Filtro para formularios
  const formFilter =  <T>(form: T) => {
    const data = setKeyParams<T>(form)

    setFilterParams(data)

    // setFilterParams( prev => {
    //   console.log({...prev,...data })
    //   return {...prev,...data }
    // })
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
