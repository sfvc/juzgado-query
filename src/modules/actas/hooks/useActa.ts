import { useFilter, usePagination } from '../../../shared'
import { actaActions } from '..'
import { ActaFilterForm, IActa } from '../interfaces'
import { initialValues } from '../constants'

export const useActa = () => {
  const { filterParams, formFilter, resetFilter } = useFilter<ActaFilterForm>(initialValues)

  const { data: actas, pagination, isLoading } = usePagination<IActa, ActaFilterForm>({
    queryKey: ['actas', filterParams],
    fetchData: () => actaActions.getActas( filterParams ),
    filterParams
  })

  return {
    actas,
    pagination,
    isLoading,
    filterParams,
    formFilter,
    resetFilter
  }
}
