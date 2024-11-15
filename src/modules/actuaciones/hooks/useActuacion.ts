import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { actuacionActions } from '..'
import { useContext } from 'react'
import { ActuacionContext } from '../../../context/Actuacion/ActuacionContext'

export const useActuacion= () => {
  const { resetProvider } = useContext(ActuacionContext)
  const queryClient = useQueryClient()

  /* Mutations */
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

  const createActuacion = useMutation({
    mutationFn: ({ selectedActas, plantillaId, tipoActuacion }: { selectedActas: number[], plantillaId: number | null, tipoActuacion: string }) => 
      actuacionActions.createActuacion(selectedActas, plantillaId, tipoActuacion),
    onSuccess: () => {
      toast.success('Notificación creada exitosamente')
      queryClient.clear()
      resetProvider()
    },
    onError: (error) => {
      toast.error('Error crear la notificación')
      console.log(error)
    }
  })
  
  return { 
    deleteActuacion, 
    createActuacion 
  }
}
