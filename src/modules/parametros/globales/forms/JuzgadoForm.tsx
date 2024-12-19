import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Label, TextInput } from 'flowbite-react'
import { FormJuzgado, IJuzgado } from '../interfaces'
import { useJuzgado } from '../hooks/useJuzgado'

const validationSchema = yup.object().shape({
  nombre: yup.string().required('El pais es requerido'),
  juez: yup.string().required('El juez es requerido'),
  secretario: yup.string().required('El secretario es requerido'),
  direccion: yup.string().required('La direccion es requerida'),
  telefono: yup.string()
})

interface Props {
    juzgado: IJuzgado | null
    onSucces: () => void
  }
  
const JuzgadoForm = ({ juzgado, onSucces }: Props) => {
  const { createJuzgado, updateJuzgado } = useJuzgado()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { 
      nombre: juzgado?.nombre || '',
      juez: juzgado?.juez || '',
      secretario: juzgado?.secretario || '',
      direccion: juzgado?.direccion || '',
      telefono: juzgado?.telefono || '',
    },
    resolver: yupResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<FormJuzgado> = async (data: FormJuzgado) => {
    if (juzgado) await updateJuzgado.mutateAsync({id: juzgado.id, juzgado: data})
    else await createJuzgado.mutateAsync(data)
  
    onSucces()
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label color='gray' htmlFor='nombre' value='Nombre de Juzgado' /><strong className='obligatorio'>(*)</strong>
        </div>
        <TextInput
          {...register('nombre')}
          placeholder='Nombre'
          helperText={errors?.nombre && errors?.nombre?.message} 
          color={errors?.nombre && 'failure'}
        />
      </div>

      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label color='gray' htmlFor='juez' value='Juez'/><strong className='obligatorio'>(*)</strong>
        </div>
        <TextInput
          {...register('juez')}
          placeholder='Juez'
          helperText={errors?.juez && errors?.juez?.message} 
          color={errors?.juez && 'failure'}
        />
      </div>

      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label color='gray' htmlFor='secretario' value='Secretario' /><strong className='obligatorio'>(*)</strong>
        </div>
        <TextInput
          {...register('secretario')}
          placeholder='Secretario'
          helperText={errors?.secretario && errors?.secretario?.message} 
          color={errors?.secretario && 'failure'}
        />
      </div>

      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label color='gray' htmlFor='direccion' value='Direccion' /><strong className='obligatorio'>(*)</strong>
        </div>
        <TextInput
          {...register('direccion')}
          placeholder='Direccion'
          helperText={errors?.direccion && errors?.direccion?.message} 
          color={errors?.direccion && 'failure'}
        />
      </div>

      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label
            color='gray'
            htmlFor='telefono'
            value='Telefono'
          />
        </div>
        <TextInput
          {...register('telefono')}
          placeholder='Telefono'
          helperText={errors?.telefono && errors?.telefono?.message} 
          color={errors?.telefono && 'failure'}
        />
      </div>

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

export default JuzgadoForm
