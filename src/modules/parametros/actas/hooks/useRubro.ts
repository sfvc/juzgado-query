import { useCrudMutations } from '../../../../shared/hooks/useCrudMutations'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { useFilter } from '../../../../shared/hooks/useFilter'
import { IRubro } from '../interfaces'
import { rubroActions } from '..'

interface FilterParams {
  query: string, 
  page: number
}

const initialValues = {
  query: '', 
  page: 1
}

export const useRubro = () => {

  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: rubros, pagination, isFetching } = usePagination<IRubro, FilterParams>({
    queryKey: ['rubros', filterParams],
    fetchData: () => rubroActions.getRubros(filterParams),
    filterParams
  })

  /* Mutations */
  const {
    create: createRubro,
    update: updateRubro,
    remove: deleteRubro
  } = useCrudMutations({
    actions: { create: rubroActions.createRubro, update: rubroActions.updateRubro, remove: rubroActions.deleteRubro },
    group: 'rubros',
    entity: 'rubro',
    label: 'Rubro'
  })

  return {
    rubros,
    pagination,
    isFetching,
    filterParams,
    updateFilter,

    // Mutations
    createRubro,
    updateRubro,
    deleteRubro
  }
}
