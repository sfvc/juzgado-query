import { useCrudMutations } from '../../../../shared/hooks/useCrudMutations'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { provinciaActions } from '..'
import type { IProvincia } from '../interfaces/localizacion'
import { useFilter } from '../../../../shared/hooks/useFilter'

interface FilterParams {
  query: string,
  page: number
}

const initialValues = {
  query: '',
  page: 1
}

export const useProvincia = () => {
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: provincias, pagination, isFetching } = usePagination<IProvincia, FilterParams>({
    queryKey: ['provincias', filterParams],
    fetchData: () => provinciaActions.getProvincias(filterParams),
    filterParams
  })

  /* Mutations */
  const {
    create: createProvincia,
    update: updateProvincia,
    remove: deleteProvincia
  } = useCrudMutations({
    actions: { create: provinciaActions.createProvincia, update: provinciaActions.updateProvincia, remove: provinciaActions.deleteProvincia },
    group: 'localizacion',
    entity: 'provincia',
    label: 'Provincia',
    feminine: true
  })

  return {
    provincias,
    pagination,
    isFetching,
    filterParams,
    updateFilter,

    // Mutations
    createProvincia,
    updateProvincia,
    deleteProvincia
  }
}
