import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useInvalidate } from '../../../shared/hooks/useInvalidate'
import { toast } from 'react-toastify'
import { useFilter, usePagination, validateErrors } from '../../../shared'
import { inhabilitadoActions } from '..'
import { FormInhabilitado, IInhabilitado } from '../interfaces'

interface FilterParams {
  query: string
  page: number
}

const initialValues = {
  query: '',
  page: 1
}

export const useInhabilitado = () => {
  const invalidate = useInvalidate()
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const [personaNoInhabilitada, setPersonaNoInhabilitada] = useState<{ nombre_completo: string, dni: number } | null>(null)

  const { data: inhabilitados, pagination, isFetching } = usePagination<IInhabilitado, FilterParams>({
    queryKey: ['inhabilitados', filterParams],
    fetchData: async () => {
      const res = await inhabilitadoActions.getInhabilitados(filterParams)
      setPersonaNoInhabilitada((res as { personaNoInhabilitada?: { nombre_completo: string, dni: number } })?.personaNoInhabilitada || null)
      return res
    },
    filterParams
  })

  /* Mutations */
  const createInhabilitado = useMutation({
    mutationFn: inhabilitadoActions.createInhabilitado,
    onSuccess: () => {
      toast.success('Inhabilitado creado con éxito')
      invalidate('inhabilitados')
    },
    onError: (error) => {
      validateErrors(error, 'Error al crear el registro')
    }
  })

  const updateInhabilitado = useMutation({
    mutationFn: ({ id, inhabilitado }: { id: number, inhabilitado: FormInhabilitado }) => inhabilitadoActions.updateInhabilitado(id, inhabilitado),
    onSuccess: () => {
      toast.success('Inhabilitado actualizado con éxito')
      invalidate('inhabilitados')
    },
    onError: (error) => {
      validateErrors(error, 'Error al actualizar registro')
    }
  })

  const deleteInhabilitado = useMutation({
    mutationFn: (id: number) => inhabilitadoActions.deleteInhabilitado(id),
    onSuccess: () => {
      toast.success('Inhabilitado eliminado con éxito')
      invalidate('inhabilitados')
    },
    onError: () => {
      toast.error('Error al eliminar registro')
    }
  })

  return {
    inhabilitados,
    pagination,
    isFetching,
    filterParams,
    updateFilter,
    personaNoInhabilitada,

    // Mutations
    createInhabilitado,
    updateInhabilitado,
    deleteInhabilitado
  }
}
