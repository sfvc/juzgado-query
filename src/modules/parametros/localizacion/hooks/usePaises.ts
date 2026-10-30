import { useCrudMutations } from '../../../../shared/hooks/useCrudMutations'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { paisActions } from '..'
import type { IPais } from '../interfaces/localizacion'
import { useFilter } from '../../../../shared/hooks/useFilter'

interface FilterParams {
  query: string, 
  page: number
}

const initialValues = {
  query: '', 
  page: 1
}

export const usePaises = () => {
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: paises, pagination, isFetching } = usePagination<IPais, FilterParams>({
    queryKey: ['paises', filterParams],
    fetchData: () => paisActions.getPaises(filterParams),
    filterParams
  })

  /* Mutations */
  const {
    create: createPais,
    update: updatePais,
    remove: deletePais
  } = useCrudMutations({
    actions: { create: paisActions.createPais, update: paisActions.updatePais, remove: paisActions.deletePais },
    group: 'localizacion',
    entity: 'pais',
    label: 'Pais'
  })

  return {
    paises,
    pagination,
    isFetching,
    filterParams,
    updateFilter,

    // Mutations
    createPais,
    updatePais,
    deletePais
  }
}
