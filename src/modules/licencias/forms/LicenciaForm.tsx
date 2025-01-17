import { Alert, Button, Label, Textarea, TextInput } from 'flowbite-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { icons } from '../../../shared'
import { useLicencia } from '../hooks/useLicencia'
import { PersonaInput } from '../../inhabilitados/components/PersonaInput'
import type { FormLicencia, ILicencia } from '../interfaces'


const validationSchema = yup.object().shape({
  categoria: yup.string().required('La categoria es requerida'),
  fecha_retencion: yup.string().required('La fecha de retención es requerida'),
  fecha_entrega: yup.string().required('La fecha de entrega es requerida'),
  persona_id: yup.number().transform(value => (isNaN(value) || !value) ? null : value).required('La persona es requerida.'),
  observaciones: yup.string(),
})

interface Props {
  licencia: ILicencia | null
  onSucces: () => void
}
  
const LicenciaForm = ({ licencia, onSucces }: Props) => {
  const { createLicencia, updateLicencia } = useLicencia()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormLicencia>({
    defaultValues: {
      categoria: licencia?.categoria || '',
      fecha_entrega: licencia?.fecha_entrega || '',
      fecha_retencion: licencia?.fecha_retencion || '',
      observaciones: licencia?.observaciones || '',
      persona_id: licencia?.persona.id,
    },
    resolver: yupResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<FormLicencia> = async (data: FormLicencia) => {
    if (licencia) await updateLicencia.mutateAsync({ id: licencia.id, licencia: data })
    else await createLicencia.mutateAsync(data)

    onSucces()
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid md:grid-cols-2 gap-4 grid-cols-1'>
        <PersonaInput setValue={setValue} persona={licencia?.persona}/>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='fecha_desde' value='Fecha de inhabilitación' /><strong className='obligatorio'>(*)</strong>
          </div>
          <TextInput
            {...register('fecha_retencion')}
            type='date'
            helperText={errors?.fecha_retencion && errors?.fecha_retencion?.message} 
            color={errors?.fecha_retencion && 'failure'}
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='fecha_hasta' value='Fecha de Vencimiento' /><strong className='obligatorio'>(*)</strong>
          </div>
          <TextInput
            {...register('fecha_entrega')}
            type='date'
            helperText={errors?.fecha_entrega && errors?.fecha_entrega?.message} 
            color={errors?.fecha_entrega && 'failure'}
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='categoria' value='Categoria' />
          </div>
          <TextInput
            {...register('categoria')}
            type='text'
            placeholder='Categoria'
            helperText={errors?.categoria && errors?.categoria?.message} 
            color={errors?.categoria && 'failure'}
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='observaciones' value='Observaciones' />
          </div>
          <Textarea
            {...register('observaciones')}
            placeholder='Observaciones'
            helperText={errors?.observaciones && errors?.observaciones?.message} 
            color={errors?.observaciones && 'failure'}
          />
        </div>  
      </div>

      {
        errors?.persona_id &&
        <Alert color="failure" icon={icons.Error}>
          <span className="font-medium">Error! </span>{errors?.persona_id && errors?.persona_id?.message}
        </Alert>
      }

      <div className='flex justify-end gap-2 mt-4'>
        <Button color="failure" onClick={onSucces}>Cancelar</Button>
        <Button 
          size='md'
          type='submit' 
          disabled={isSubmitting}
          isProcessing={isSubmitting}
        >
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </form>
  )
}

export default LicenciaForm
