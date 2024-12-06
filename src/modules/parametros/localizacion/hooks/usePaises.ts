import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { paisActions } from '..'
import type { IPais, FormPais } from '../interfaces/localizacion'
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
  const queryClient = useQueryClient()
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: paises, pagination, isFetching } = usePagination<IPais, FilterParams>({
    queryKey: ['paises', filterParams],
    fetchData: () => paisActions.getPaises(filterParams),
    filterParams
  })

  /* Mutations */
  const createPais = useMutation({
    mutationFn: paisActions.createPais,
    onSuccess: () => {
      toast.success('Pais creado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear el pais')
      console.log(error)
    }
  })

  const updatePais = useMutation({
    mutationFn: ({ id, pais }: { id: number, pais: FormPais }) => paisActions.updatePais(id, pais),
    onSuccess: () => {
      toast.success('Pais creado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear el pais')
      console.log(error)
    }
  })

  const deletePais = useMutation({
    mutationFn: (id: number) => paisActions.deletePais(id),
    onSuccess: () => {
      toast.success('Pais creado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear el pais')
      console.log(error)
    }
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
