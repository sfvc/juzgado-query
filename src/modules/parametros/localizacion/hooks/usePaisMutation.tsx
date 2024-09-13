import { useMutation } from '@tanstack/react-query'
import { type Pais, paisActions } from '../index'

export const usePaisMutation = () => {
  const paisMutation = useMutation({
    mutationFn: paisActions.createPais,
    onSuccess: () => {
      console.log('Creado con exito')
    },
    onError: () => {
      console.log('Error al crear')
    }
  })

  return paisMutation
} 