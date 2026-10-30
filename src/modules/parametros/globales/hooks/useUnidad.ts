import { useCrudMutations } from '../../../../shared/hooks/useCrudMutations'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { useFilter } from '../../../../shared/hooks/useFilter'
import { IUnidad } from '../interfaces'
import { unidadActions } from '..'

interface FilterParams {
  search: string
  page: number
}

const initialValues = {
  search: '',
  page: 1
}

export const useUnidad = () => {
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: unidades, pagination, isFetching } = usePagination<IUnidad, FilterParams>({
    queryKey: ['unidades', filterParams],
    fetchData: () => unidadActions.getUnidades(filterParams),
    filterParams
  })

  /* Mutations */
  const {
    create: createUnidad,
    update: updateUnidad,
    remove: deleteUnidad
  } = useCrudMutations({
    actions: { create: unidadActions.createUnidad, update: unidadActions.updateUnidad, remove: unidadActions.deleteUnidad },
    group: 'unidades',
    entity: 'unidad',
    label: 'Unidad',
    feminine: true
  })

  return {
    unidades,
    pagination,
    isFetching,
    filterParams,
    updateFilter,

    // Mutations
    createUnidad,
    updateUnidad,
    deleteUnidad
  }
}
