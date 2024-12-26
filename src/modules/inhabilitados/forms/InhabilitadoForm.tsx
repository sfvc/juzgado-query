import { Alert, Button, Label, Select, Spinner, Textarea, TextInput } from 'flowbite-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useInhabilitado } from '../hooks/useInhabilitado'
import { useJuzgado } from '../../parametros/globales/hooks/useJuzgado'
import { PersonaInput } from '../components/PersonaInput'
import { icons } from '../../../shared'
import type { IJuzgado } from '../../parametros/globales/interfaces'
import type { FormInhabilitado } from '../interfaces'


const validationSchema = yup.object().shape({
  persona_id: yup.number().transform(value => (isNaN(value) || !value) ? null : value).required('La persona es requerida.'),
  juzgado_id: yup.number().transform(value => isNaN(value) ? null : value).required('El juzgado es requerido'),
  fecha_desde: yup.string().required('La fecha de inhabilitación es requerida'),
  fecha_hasta: yup.string().required('La fecha de vencimiento requerida'),
  numero_acta: yup.string().required('El número del acta es requerido'),
  instrumento: yup.string().required('El instrumento es requerido'),
  causa: yup.string().required('La causa es requerida')
})

interface Props {
  onSucces: () => void
}
  
const InhabilitadoForm = ({ onSucces }: Props) => {
  const { juzgados, isFetching } = useJuzgado()
  const { createInhabilitado } = useInhabilitado()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormInhabilitado>({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<FormInhabilitado> = async (data: FormInhabilitado) => {
    await createInhabilitado.mutateAsync(data)
    onSucces()
  }

  if (isFetching) return <div className='flex justify-center'><Spinner size='lg'/></div>
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid md:grid-cols-2 gap-4 grid-cols-1'>
        <PersonaInput setValue={setValue} />

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='fecha_desde' value='Fecha de inhabilitación' /><strong className='obligatorio'>(*)</strong>
          </div>
          <TextInput
            {...register('fecha_desde')}
            type='date'
            helperText={errors?.fecha_desde && errors?.fecha_desde?.message} 
            color={errors?.fecha_desde && 'failure'}
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='fecha_hasta' value='Fecha de Vencimiento' /><strong className='obligatorio'>(*)</strong>
          </div>
          <TextInput
            {...register('fecha_hasta')}
            type='date'
            helperText={errors?.fecha_hasta && errors?.fecha_hasta?.message} 
            color={errors?.fecha_hasta && 'failure'}
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block'>
            <Label htmlFor='juzgado_id' value='Juzgado' /><strong className='obligatorio'>(*)</strong>
          </div>
          <Select
            {...register('juzgado_id', { valueAsNumber: true })}
            helperText={errors?.juzgado_id && errors.juzgado_id.message}
            color={errors?.juzgado_id && 'failure'}
          >
            <option value='' hidden>Seleccione el juzgado</option>
            {juzgados?.map((juzgado: IJuzgado) => (
              <option key={juzgado.id} value={juzgado.id}>{juzgado.nombre}</option>
            ))}
          </Select>
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='numero_acta' value='Nro. de Acta' /><strong className='obligatorio'>(*)</strong>
          </div>
          <TextInput
            {...register('numero_acta')}
            type='text'
            helperText={errors?.numero_acta && errors?.numero_acta?.message} 
            color={errors?.numero_acta && 'failure'}
            placeholder='Número de acta'
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='instrumento' value='Instrumento legal' />
          </div>
          <TextInput
            {...register('instrumento')}
            type='text'
            placeholder='Instrumento'
            helperText={errors?.instrumento && errors?.instrumento?.message} 
            color={errors?.instrumento && 'failure'}
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='causa' value='Causa de inhabilitación' /><strong className='obligatorio'>(*)</strong>
          </div>
          <Textarea
            {...register('causa')}
            placeholder='Ingrese la causa'
            helperText={errors?.causa && errors?.causa?.message} 
            color={errors?.causa && 'failure'}
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

export default InhabilitadoForm
