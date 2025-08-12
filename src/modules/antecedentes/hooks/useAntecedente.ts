import { antecedenteActions } from '..'
import { useFilter, usePagination } from '../../../shared'
import { IAntecedente } from '../interfaces'

interface FilterParams {
  query: string
  page: number
}

const initialValues: FilterParams = {
  query: '',
  page: 1
}

export const useAntecedente = () => {
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: antecedente, isFetching, isLoading } =
    usePagination<IAntecedente, FilterParams>({
      queryKey: ['antecedente', filterParams],
      fetchData: () =>
        antecedenteActions.getAntecedentes(filterParams),
      filterParams: filterParams
    })

  return {
    antecedente,
    filterParams,
    updateFilter,
    isFetching,
    isLoading
  }
}
