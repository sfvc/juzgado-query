import { auditoriaActions } from '..'
import { useFilter, usePagination } from '../../../shared'
import { IAuditoria } from '../interfaces'

interface FilterParams {
  query: string
  page: number
  user_id?: number | null
}

const initialValues: FilterParams = {
  query: '',
  page: 1,
  user_id: null
}

export const useAuditoria = () => {

  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: auditoriaFiltrada, pagination, isFetching } = usePagination<IAuditoria, FilterParams>({
    queryKey: ['auditoria', filterParams],
    fetchData: () => auditoriaActions.getAuditoriaFiltrada(filterParams),
    filterParams
  })

  return {
    auditoriaFiltrada,
    filterParams,
    updateFilter,
    pagination,
    isFetching
  }
}
