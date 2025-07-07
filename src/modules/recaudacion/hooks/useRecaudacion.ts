import { recaudacionActions } from '..'
import { useFilter, usePagination } from '../../../shared'
import { IRecaudacion } from '../interfaces'
import { useContext } from 'react'
import { AuthContext } from '../../../context/Auth/AuthContext'

interface FilterParams {
  query: string
  page: number
  user_id?: number | null
  start_date?: string
  end_date?: string
  juzgado_id?: number
}

const initialValues: FilterParams = {
  query: '',
  page: 1,
  user_id: null,
  start_date: '',
  end_date: ''
}

export const useRecaudacion = () => {
  const { user } = useContext(AuthContext)
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const isFilteringByDate = !!filterParams.start_date && !!filterParams.end_date

  const enrichedFilterParams = {
    ...filterParams,
    juzgado_id: filterParams.juzgado_id ?? user?.juzgado?.id
  }

  const { data: recaudacionFiltrada, estadisticas, pagination, isFetching, isLoading } =
    usePagination<IRecaudacion, FilterParams>({
      queryKey: ['recaudacion', enrichedFilterParams],
      fetchData: () =>
        isFilteringByDate
          ? recaudacionActions.getRecaudacionFiltrada({
            ...enrichedFilterParams,
            fecha_desde: enrichedFilterParams.start_date,
            fecha_hasta: enrichedFilterParams.end_date
          })
          : recaudacionActions.getRecaudacionDiaria(enrichedFilterParams),
      filterParams: enrichedFilterParams
    })

  return {
    recaudacionFiltrada,
    filterParams,
    updateFilter,
    pagination,
    isFetching,
    isLoading,
    estadisticas // TODO: Eliminar propiedad
  }
}
