/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { carboneActions } from '..'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { AuthContext } from '../../../context/Auth/AuthContext'

export const useUploadFile = () => {
  const { user } = useContext(AuthContext)
  const queryClient = useQueryClient()

  /* Descargar archivo word desde carbone */
  const downloadWord = useMutation({
    mutationFn: ({ item, acta, tipo }: { item: any, acta: any, tipo: string }) => 
      carboneActions.downloadWordFile(item, acta, tipo),
    onError: (error) => {
      toast.error('Error al descargar el archivo')
      console.log(error)
    }
  })
    
  /* Subir archivo a s3 con gotenberg */
  const uploadFile = useMutation({
    mutationFn: ({ file, item, property }: { file: File, item: any, property: string, queryKey?: any[] }) => 
      carboneActions.uploadFilePDF(file, item, property, user!.id),
    onSuccess: (_, __, context: any) => {
      toast.success('Archivo subido exitosamente')

      queryClient.invalidateQueries({ queryKey: context?.queryKey })
    },
    onError: (error) => {
      toast.error('Error al subir el archivo')
      console.log(error)
    }
  })
  
  return {
    downloadWord,
    uploadFile
  }
}
