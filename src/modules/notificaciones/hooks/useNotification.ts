import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { notificacionActions } from '..'
import { useContext } from 'react'
import { ActuacionContext } from '../../../context/Actuacion/ActuacionContext'

export const useNotification = () => {
  const { resetProvider } = useContext(ActuacionContext)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  /* Mutations */
  const createNotification = useMutation({
    mutationFn: ({ selectedActas, plantillaId }: { selectedActas: number[], plantillaId: number | null }) => 
      notificacionActions.createNotification(selectedActas, plantillaId),
    onSuccess: () => {
      toast.success('Notificación creada exitosamente')
      queryClient.clear()
      resetProvider()
      navigate('/actas')
    },
    onError: (error) => {
      toast.error('Error crear la notificación')
      console.log(error)
    }
  })

  
  return { createNotification }
}
