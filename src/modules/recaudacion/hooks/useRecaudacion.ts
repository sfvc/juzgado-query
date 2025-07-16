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
  fecha?: string
}

const initialValues: FilterParams = {
  query: '',
  page: 1,
  user_id: null,
  start_date: '',
  end_date: '',
  fecha: ''
}

export const useRecaudacion = () => {
  const { user } = useContext(AuthContext)
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const today = new Date().toISOString().split('T')[0]
  const isFilteringByDate = filterParams.fecha && filterParams.fecha !== today

  const enrichedFilterParams = {
    ...filterParams,
    juzgado_id: filterParams.juzgado_id ?? user?.juzgado?.id,
    paginate: isFilteringByDate ? 'false' : 'true'
  }

  const { data: recaudacionFiltrada, estadisticas, pagination, isFetching, isLoading } =
    usePagination<IRecaudacion, FilterParams>({
      queryKey: ['recaudacion', enrichedFilterParams],
      fetchData: () =>
        enrichedFilterParams.paginate === 'true'
          ? recaudacionActions.getRecaudacionDiaria(enrichedFilterParams)
          : recaudacionActions.getRecaudacionFiltrada(enrichedFilterParams),
      filterParams: enrichedFilterParams
    })

  return {
    recaudacionFiltrada,
    filterParams,
    updateFilter,
    pagination: enrichedFilterParams.paginate === 'true' ? pagination : null,
    isFetching,
    isLoading,
    estadisticas
  }
}
