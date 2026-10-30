import { useCrudMutations } from '../../../../shared/hooks/useCrudMutations'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { IDepartamento } from '../interfaces/localizacion'
import { departamentoActions } from '..'
import { useFilter } from '../../../../shared/hooks/useFilter'

interface FilterParams {
  query: string, 
  page: number
}

const initialValues = {
  query: '', 
  page: 1
}

export const useDepartamento = () => {
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: departamentos, pagination, isFetching } = usePagination<IDepartamento, FilterParams>({
    queryKey: ['departamentos', filterParams],
    fetchData: () => departamentoActions.getDepartamentos(filterParams),
    filterParams
  })

  /* Mutations */
  const {
    create: createDepartamento,
    update: updateDepartamento,
    remove: deleteDepartamento
  } = useCrudMutations({
    actions: { create: departamentoActions.createDepartamento, update: departamentoActions.updateDepartamento, remove: departamentoActions.deleteDepartamento },
    group: 'localizacion',
    entity: 'departamento',
    label: 'Departamento'
  })

  return {
    departamentos,
    pagination,
    isFetching,
    filterParams,
    updateFilter,

    // Mutations
    createDepartamento,
    updateDepartamento,
    deleteDepartamento
  }
}
