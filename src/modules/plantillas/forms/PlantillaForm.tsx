import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, FileInput, Label, Select, Spinner, TextInput } from 'flowbite-react'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { IPlantilla, FormPlantilla } from '../interfaces'
import { usePlantilla } from '../hooks/usePlantilla'
import { useJuzgado } from '../../parametros/globales/hooks/useJuzgado'
import { IJuzgado } from '../../parametros/globales/interfaces'
import { carboneActions } from '../../carbone'
import { TIPO_ACTUACION } from '../../../shared/constants'

const validationSchema = yup.object().shape({
  denominacion: yup.string().required('La denominacion es requerida'),
  juzgado_id: yup.number().moreThan(0, 'Seleccione el juzgado').required('El juzgado es requerido'),
  tipo_actuacion: yup.string().required('Debe seleccionar un tipo'),
  path: yup.string(),
})

interface Props {
  plantilla: IPlantilla | null
  onSucces: () => void
}
  
const PlantillaForm = ({ plantilla, onSucces }: Props) => {
  const { createPlantilla } = usePlantilla()
  const { juzgados, isLoading } = useJuzgado()
  const [file, setFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { 
      denominacion: plantilla?.denominacion || '',
      juzgado_id: plantilla?.juzgado?.id || 0,
      tipo_actuacion: plantilla?.tipo_actuacion || '',
      path: plantilla?.path || ''
    },
    resolver: yupResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<FormPlantilla> = async (form: FormPlantilla) => {
    if (!file) return toast.error('Seleccione un archivo')
    
    const nameFile = await carboneActions.uploadFilePlantilla(file)
    if (!nameFile) return toast.error('Error al subir el archivo')
    
    setValue('path', nameFile)
    await createPlantilla.mutateAsync(form)
    onSucces()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0])
  }

  if (isLoading) return <div className='flex justify-center'><Spinner size='lg'/></div>
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label color='gray' htmlFor='denominacion' value='Denominacion' /><strong className='obligatorio'>(*)</strong>
        </div>
        <TextInput
          {...register('denominacion')}
          type='text'
          placeholder='Denominacion'
          helperText={errors?.denominacion && errors?.denominacion?.message} 
          color={errors?.denominacion && 'failure'}
        />
      </div>

      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label color='gray' htmlFor='juzgado_id' value='Juzgado' /><strong className='obligatorio'>(*)</strong>
        </div>
        <Select
          {...register('juzgado_id', { valueAsNumber: true })}
          helperText={errors?.juzgado_id && errors.juzgado_id.message}
          color={errors?.juzgado_id && 'failure'}
        >
          <option value={0} hidden>Seleccione el juzgado</option>
          { juzgados?.map((juzgado: IJuzgado) => (
            <option key={juzgado.id} value={juzgado.id}>
              {juzgado.nombre}
            </option>
          ))}
        </Select>
      </div>

      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label color='gray' htmlFor='tipo_actuacion' value='Tipo de Plantilla' /><strong className='obligatorio'>(*)</strong>
        </div>
        <Select
          {...register('tipo_actuacion')}
          helperText={errors?.tipo_actuacion && errors?.tipo_actuacion?.message}
          color={errors?.tipo_actuacion && 'failure'}
        >
          <option value='' hidden>Seleccione el tipo de actuación</option>
          {
            TIPO_ACTUACION.map((tipo: string, i: number) => (
              <option key={i} value={tipo}>{tipo}</option>
            ))
          }
        </Select>
      </div>

      <div className='mb-4'>
        <div className='mb-2 block'>
          <Label htmlFor='file-upload' value='Seleccionar Plantilla' />
        </div>
        <FileInput id='file-upload' className='mb-4' onChange={handleFileChange} accept='.doc,.docx' />
      </div>

      {/* Buttons */}
      <div className='flex justify-end gap-2'>
        <Button color="failure" onClick={onSucces}>Cancelar</Button>

        <Button 
          size='md'
          type='submit' 
          color="gray"
          disabled={isSubmitting}
          isProcessing={isSubmitting}
        >
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
      
    </form>
  )
}

export default PlantillaForm
