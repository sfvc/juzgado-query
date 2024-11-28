import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { actuacionActions } from '..'
import { useContext } from 'react'
import { ActuacionContext } from '../../../context/Actuacion/ActuacionContext'

export const useActuacion= () => {
  const { resetProvider } = useContext(ActuacionContext)
  const queryClient = useQueryClient()

  /* Mutations */
  const createActuacion = useMutation({
    mutationFn: actuacionActions.createActuacion,
    onSuccess: () => {
      toast.success('Actuación creada exitosamente')
      queryClient.clear()
      resetProvider()
    },
    onError: (error) => {
      toast.error('Error crear actuación')
      console.log(error)
    }
  })

  const deleteActuacion = useMutation({
    mutationFn: ({ actaId, actuacionId }: { actaId: number, actuacionId: number }) => actuacionActions.deleteActuacion(actaId, actuacionId),
    onSuccess: () => {
      toast.success('Actuación eliminada exitosamente')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al eliminar la actuación')
      console.log(error)
    }
  })
  
  return { 
    createActuacion,
    deleteActuacion 
  }
}
