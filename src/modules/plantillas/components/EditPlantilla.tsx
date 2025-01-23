import { useRef, useState } from 'react'
import { Alert, Button, FileInput, Label } from 'flowbite-react'
import { toast } from 'react-toastify'
import { icons, useLoading } from '../../../shared'
import { LoadingOverlay } from '../../../layout'
import { carboneActions } from '../../carbone'
import { usePlantilla } from '../hooks/usePlantilla'
import type { IPlantilla } from '../interfaces'

interface Props {
  plantilla: IPlantilla | null,
  onCloseModal: () => void
}

export const EditPlantilla = ({ plantilla, onCloseModal }: Props) => {
  const { editPlantilla } = usePlantilla()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const useAction = useLoading()
  const refFile = useRef<HTMLInputElement | null>(null)

  const onUploadFile = async () => {
    const file = refFile.current?.files ? refFile.current.files[0] : null

    if(!file) return setErrorMessage('Debe seleccionar un archivo')
    
    if(!plantilla?.path) return toast.error('Error al subir el archivo')
    
    const path = await editPlantilla.mutateAsync({ file, path: plantilla?.path })
    if (path) onCloseModal()
  }

  const dowloadPlantilla = (path: string) => {
    useAction.actionFn(async () => {
      await carboneActions.downloadPlantilla(path)
    })
  }
    
  return (
    <div>
      <div className='mb-4 relative'>
        <div className='mb-2 block'>
          <Label className='text-sm font-medium' htmlFor='file'>Subir Archivo</Label>
        </div>
        <div className='flex'>
          <div className='relative w-full'>
            <FileInput
              name='file'
              placeholder='Seleccionar el archivo'
              accept='.doc,.docx'
              ref={refFile}
              helperText={errorMessage && errorMessage}
              color={errorMessage && 'failure'}
            />
          </div>
        </div>
      </div>

      <footer className='flex flex-col'>
        <Alert color='failure' className='mt-4' icon={icons.Warning}>
          <span>
            <span className='mr-1 text-blue-700 font-bold'>Instrucciones de uso: </span>   
            <span className='text-blue-600'>Descargue el archivo, modifique el contenido y luego seleccione el archivo actualizado para guardarlo.</span>
            <br />
            <span className='mr-1 text-blue-700 font-bold'>¡Importante!</span>   
            <span className='text-blue-600'>El tamaño maximo del archivo tiene que ser menor a 2MB.</span>
          </span>
        </Alert>

        <div className='flex justify-end gap-4 mt-4'>
          <Button color='gray' type='button' className='px-4' onClick={() => dowloadPlantilla(plantilla!.path)}>
            <icons.Dowloand size={18}/> 
            &#160; Descargar Plantilla
          </Button>
        
          <Button color='red' type='button' className='px-4' onClick={onCloseModal}>Cerrar</Button>

          <Button 
            type='button' 
            className='px-4' 
            onClick={onUploadFile} 
            disabled={editPlantilla.isPending} 
            isProcessing={editPlantilla.isPending}
          >
            Guardar
          </Button>
        </div>
      </footer>

      { useAction.loading && <LoadingOverlay /> }
    </div>
  )
}
