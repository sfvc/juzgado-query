import { useCrudMutations } from '../../../../shared/hooks/useCrudMutations'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { useFilter } from '../../../../shared/hooks/useFilter'
import { juzgadoActions } from '..'
import { IJuzgado } from '../interfaces'

interface FilterParams {
  page: number
}

const initialValues = {
  page: 1
}

export const useJuzgado = () => {
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: juzgados, pagination, isFetching } = usePagination<IJuzgado, FilterParams>({
    queryKey: ['juzgados', filterParams],
    fetchData: () => juzgadoActions.getJuzgados(filterParams),
    filterParams
  })

  /* Mutations */
  const {
    create: createJuzgado,
    update: updateJuzgado,
    remove: deleteJuzgado
  } = useCrudMutations({
    actions: { create: juzgadoActions.createJuzgado, update: juzgadoActions.updateJuzgado, remove: juzgadoActions.deleteJuzgado },
    group: 'juzgados',
    entity: 'juzgado',
    label: 'Juzgado'
  })

  return {
    juzgados,
    pagination,
    isFetching,
    filterParams,
    updateFilter,

    // Mutations
    createJuzgado,
    updateJuzgado,
    deleteJuzgado
  }
}
