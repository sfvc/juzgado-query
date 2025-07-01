import { recaudacionActions } from '..'
import { useFilter, usePagination } from '../../../shared'
import { IRecaudacion } from '../interfaces'

interface FilterParams {
  query: string
  page: number
  user_id?: number | null
  start_date?: string
  end_date?: string
}

const initialValues: FilterParams = {
  query: '',
  page: 1,
  user_id: null,
  start_date: '',
  end_date: ''
}

export const useRecaudacion = () => {
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const isFilteringByDate = !!filterParams.start_date && !!filterParams.end_date

  const { data: recaudacionFiltrada, pagination, isFetching } = usePagination<IRecaudacion, FilterParams>({
    queryKey: ['recaudacion', filterParams],
    fetchData: () =>
      isFilteringByDate
        ? recaudacionActions.getRecaudacionFiltrada({
          'fecha_desde': filterParams.start_date,
          'fecha_hasta': filterParams.end_date,
          ...filterParams
        })
        : recaudacionActions.getRecaudacionDiaria(filterParams),
    filterParams
  })

  return {
    recaudacionFiltrada,
    filterParams,
    updateFilter,
    pagination,
    isFetching
  }
}
