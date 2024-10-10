import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { usePagination, useFilter } from '../../../shared'
import { IPersona, PersonaHumana, PersonaJuridica } from '../interfaces'
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
  const queryClient = useQueryClient()
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: personas, pagination, isLoading } = usePagination<IPersona, FilterParams>({
    queryKey: ['personas', filterParams],
    fetchData: () => personaActions.getPersonas(filterParams),
    filterParams
  })

  /* Mutations */
  const createPersona = useMutation({
    mutationFn: personaActions.createPersona,
    onSuccess: () => {
      toast.success('Persona creada con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear la persona')
      console.log(error)
    }
  })

  const updatePersona = useMutation({
    mutationFn: ({ id, persona }: { id: number, persona: PersonaHumana | PersonaJuridica }) => personaActions.updatePersona(id, persona),
    onSuccess: () => {
      toast.success('Persona actualizada con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al actualizar la persona')
      console.log(error)
    }
  })

  const deletePersona = useMutation({
    mutationFn: (id: number) => personaActions.deletePersona(id),
    onSuccess: () => {
      toast.success('Persona eliminada con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al eliminar la persona')
      console.log(error)
    }
  })

  return {
    personas,
    pagination,
    isLoading,
    filterParams,
    updateFilter,

    // Mutations
    createPersona,
    updatePersona,
    deletePersona
  }
}

