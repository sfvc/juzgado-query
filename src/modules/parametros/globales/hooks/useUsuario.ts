import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { usePagination } from '../../../../shared/hooks/usePagination'
import { useFilter } from '../../../../shared/hooks/useFilter'
import { FormUsuario, IUsuario } from '../interfaces'
import { usuarioActions } from '..'

interface FilterParams {
  search: string
  page: number
}

const initialValues = {
  search: '',
  page: 1
}

export const useUsuario = () => {
  const queryClient = useQueryClient()
  const { filterParams, updateFilter } = useFilter<FilterParams>(initialValues)

  const { data: usuarios, pagination, isLoading } = usePagination<IUsuario, FilterParams>({
    queryKey: ['usuarios', filterParams],
    fetchData: () => usuarioActions.getUsuarios(filterParams),
    filterParams
  })

  /* Mutations */
  const createUsuario = useMutation({
    mutationFn: usuarioActions.createUsuario,
    onSuccess: () => {
      toast.success('Usuario creado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear el usuario')
      console.log(error)
    }
  })

  const updateUsuario = useMutation({
    mutationFn: ({ id, usuario }: { id: number, usuario: FormUsuario }) => usuarioActions.updateUsuario(id, usuario),
    onSuccess: () => {
      toast.success('Usuario creado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear el usuario')
      console.log(error)
    }
  })

  const deleteUsuario = useMutation({
    mutationFn: (id: number) => usuarioActions.deleteUsuario(id),
    onSuccess: () => {
      toast.success('Usuario creado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al crear el usuario')
      console.log(error)
    }
  })

  return {
    usuarios,
    pagination,
    isLoading,
    filterParams,
    updateFilter,

    // Mutations
    createUsuario,
    updateUsuario,
    deleteUsuario
  }
}
