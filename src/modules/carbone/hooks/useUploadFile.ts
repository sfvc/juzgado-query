import { useMutation } from '@tanstack/react-query'
import { useInvalidate } from '../../../shared/hooks/useInvalidate'
import { carboneActions } from '..'
import type { ActaRef, PlantillaItem } from '../interfaces'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { AuthContext } from '../../../context/Auth/AuthContext'

export const useUploadFile = () => {
  const { user } = useContext(AuthContext)
  const invalidate = useInvalidate()

  /* Descargar archivo word desde carbone */
  const downloadWord = useMutation({
    mutationFn: ({ item, acta, tipo }: { item: PlantillaItem, acta: ActaRef, tipo: string }) =>
      carboneActions.downloadWordFile(item, acta, tipo),
    onError: () => {
      toast.error('Error al descargar el archivo')
    }
  })

  /* Subir archivo a s3 con gotenberg */
  const uploadFile = useMutation({
    mutationFn: ({ file, item, property }: { file: File, item: PlantillaItem & ActaRef, property: string }) =>
      carboneActions.uploadFilePDF(file, item, property, user!.id),
    onSuccess: () => {
      toast.success('Archivo subido exitosamente')
      invalidate('all')
    },
    onError: () => {
      toast.error('Error al subir el archivo')
    }
  })

  return {
    downloadWord,
    uploadFile
  }
}
