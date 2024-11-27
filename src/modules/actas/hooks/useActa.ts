import { useFilter, usePagination } from '../../../shared'
import { actaActions } from '..'
import { ActaFilterForm, IActa } from '../interfaces'

export const useActa = (initialValues: ActaFilterForm) => {
  const { filterParams, formFilter, resetFilter } = useFilter<ActaFilterForm>(initialValues)

  const { data: actas, pagination, isFetching } = usePagination<IActa, ActaFilterForm>({
    queryKey: ['actas', filterParams],
    fetchData: () => actaActions.getActasFilter( filterParams ),
    filterParams,    
  })

  return {
    actas,
    pagination,
    isFetching,
    filterParams,
    formFilter,
    resetFilter
  }
}
