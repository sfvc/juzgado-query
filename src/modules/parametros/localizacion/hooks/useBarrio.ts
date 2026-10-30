import { useCrudMutations } from '../../../../shared/hooks/useCrudMutations'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { IBarrio } from '../interfaces/localizacion'
import { barrioActions } from '..'
import { useFilter } from '../../../../shared/hooks/useFilter'

interface FilterParams {
  query: string, 
  page: number
}

const initialValues = {
  query: '', 
  page: 1
}

export const useBarrio = () => {
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: barrios, pagination, isFetching } = usePagination<IBarrio, FilterParams>({
    queryKey: ['barrios', filterParams],
    fetchData: () => barrioActions.getBarrios(filterParams),
    filterParams
  })

  /* Mutations */
  const {
    create: createBarrio,
    update: updateBarrio,
    remove: deleteBarrio
  } = useCrudMutations({
    actions: { create: barrioActions.createBarrio, update: barrioActions.updateBarrio, remove: barrioActions.deleteBarrio },
    group: 'localizacion',
    entity: 'barrio',
    label: 'Barrio'
  })

  return {
    barrios,
    pagination,
    isFetching,
    filterParams,
    updateFilter,

    // Mutations
    createBarrio,
    updateBarrio,
    deleteBarrio
  }
}
