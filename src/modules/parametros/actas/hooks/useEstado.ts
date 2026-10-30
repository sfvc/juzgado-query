import { useCrudMutations } from '../../../../shared/hooks/useCrudMutations'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { useFilter } from '../../../../shared/hooks/useFilter'
import { IEstado } from '../interfaces'
import { estadoActions } from '..'

interface FilterParams {
  query: string, 
  page: number
}

const initialValues = {
  query: '', 
  page: 1
}

export const useEstado = () => {

  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: estados, pagination, isFetching } = usePagination<IEstado, FilterParams>({
    queryKey: ['estados', filterParams],
    fetchData: () => estadoActions.getEstados(filterParams),
    filterParams
  })

  /* Mutations */
  const {
    create: createEstado,
    update: updateEstado,
    remove: deleteEstado
  } = useCrudMutations({
    actions: { create: estadoActions.createEstado, update: estadoActions.updateEstado, remove: estadoActions.deleteEstado },
    group: 'estados',
    entity: 'estado',
    label: 'Estado'
  })

  return {
    estados,
    pagination,
    isFetching,
    filterParams,
    updateFilter,

    // Mutations
    createEstado,
    updateEstado,
    deleteEstado
  }
}
