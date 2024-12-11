/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { carboneActions } from '..'
import { toast } from 'react-toastify'
import { User } from '../../../auth/interfaces/auth'
import { useContext } from 'react'
import { AuthContext } from '../../../context/Auth/AuthContext'

export const useUploadFile = () => {
  const queryClient = useQueryClient()
  const { user } = useContext(AuthContext)

  /* Descargar archivo word desde carbone */
  const downloadWord = useMutation({
    mutationFn: ({ item, acta, user }: { item: any, acta: any, user: User }) => 
      carboneActions.downloadWordFile(item, acta, user),
    onError: (error) => {
      toast.error('Error al descargar el archivo')
      console.log(error)
    }
  })
    
  /* Subir archivo a s3 con gotenberg */
  const uploadFile = useMutation({
    mutationFn: ({ file, item, property }: { file: File, item: any, property: string }) => 
      carboneActions.uploadFilePDF(file, item, property, user!.id),
    onSuccess: () => {
      toast.success('Archivo subido exitosamente')
      queryClient.clear()
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
