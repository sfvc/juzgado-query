import { useCrudMutations } from '../../../shared/hooks/useCrudMutations'
import { usePagination, useFilter } from '../../../shared'
import { IPersona } from '../interfaces'
import { personaActions } from '..'

interface FilterParams {
  query: string
  page: number
}

const initialValues = {
  query: '',
  page: 1
}

export const usePersona = () => {
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: personas, pagination, isFetching } = usePagination<IPersona, FilterParams>({
    queryKey: ['personas', filterParams],
    fetchData: () => personaActions.getPersonas(filterParams),
    filterParams
  })

  /* Mutations */
  const {
    create: createPersona,
    update: updatePersona,
    remove: deletePersona
  } = useCrudMutations({
    actions: { create: personaActions.createPersona, update: personaActions.updatePersona, remove: personaActions.deletePersona },
    group: 'personas',
    entity: 'persona',
    label: 'Persona',
    feminine: true,
    validate: true
  })

  return {
    personas,
    pagination,
    isFetching,
    filterParams,
    updateFilter,

    // Mutations
    createPersona,
    updatePersona,
    deletePersona
  }
}

