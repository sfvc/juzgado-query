import { Alert, Button, Label, Select, Spinner, Textarea, TextInput } from 'flowbite-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useInhabilitado } from '../hooks/useInhabilitado'
import { useJuzgado } from '../../parametros/globales/hooks/useJuzgado'
import { PersonaInput } from '../components/PersonaInput'
import { icons } from '../../../shared'
import type { IJuzgado } from '../../parametros/globales/interfaces'
import type { FormInhabilitado, IInhabilitado } from '../interfaces'
import { CreatePersona } from '../../actas/forms/integrations/CreatePersona'
import { useEffect, useState } from 'react'
import { CustomSelect } from '../../actas/forms/components/CustomSelect'


const validationSchema = yup.object().shape({
  persona_id: yup.number().transform(value => (isNaN(value) || !value) ? null : value).required('La persona es requerida.'),
  juzgado_id: yup.mixed().required('El juzgado es requerido'),
  entidad: yup.string().when('juzgado_id', {
    is: '3',
    then: (schema) => schema.required('Debe ingresar la entidad'),
    otherwise: (schema) => schema.notRequired()
  }),
  fecha_desde: yup.string().required('La fecha de inhabilitación es requerida'),
  fecha_hasta: yup.string().required('La fecha de vencimiento requerida'),
  numero_acta: yup.string().when('juzgado_id', {
    is: (val: string) => val !== '3',
    then: (schema) => schema.required('El número del acta es requerido'),
    otherwise: (schema) => schema.notRequired()
  }),
  instrumento: yup.string(),
  causa: yup.string().when('juzgado_id', {
    is: (val: string) => val !== '3',
    then: (schema) => schema.required('La causa es requerida'),
    otherwise: (schema) => schema.notRequired()
  })
})

interface Props {
  inhabilitado: IInhabilitado | null
  onSucces: () => void
}

const InhabilitadoForm = ({ inhabilitado, onSucces }: Props) => {
  const { juzgados, isFetching } = useJuzgado()
  const { createInhabilitado, updateInhabilitado } = useInhabilitado()
  const [mostrarEntidad, setMostrarEntidad] = useState(false)
  const [mostrarCausa, setMostrarCausa] = useState(true)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormInhabilitado>({
    defaultValues: {
      persona_id: inhabilitado?.persona.id,
      juzgado_id: inhabilitado?.juzgado.id,
      entidad: inhabilitado?.entidad,
      fecha_desde: inhabilitado?.fecha_desde || '',
      fecha_hasta: inhabilitado?.fecha_hasta || '',
      numero_acta: inhabilitado?.acta?.numero_acta || '',
      instrumento: inhabilitado?.instrumento || '',
      causa: inhabilitado?.causa || ''
    },
    resolver: yupResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<FormInhabilitado> = async (data: FormInhabilitado) => {
    if (inhabilitado) await updateInhabilitado.mutateAsync({ id: inhabilitado.id, inhabilitado: data })
    else await createInhabilitado.mutateAsync(data)
    onSucces()
  }

  useEffect(() => {
    if (inhabilitado?.juzgado.id === 3) {
      setMostrarEntidad(true)
      setMostrarCausa(false)
    } else {
      setMostrarEntidad(false)
      setMostrarCausa(true)
    }
  }, [inhabilitado?.juzgado.id])

  if (isFetching) return <div className='flex justify-center'><Spinner size='lg'/></div>

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid md:grid-cols-2 gap-4 grid-cols-1'>
        <div className='mb-4'>
          <div className='flex gap-2'>
            <div className='flex-grow'>
              <PersonaInput setValue={setValue} persona={inhabilitado?.persona} />
            </div>
            <div className='mt-8'>
              <CreatePersona />
            </div>
          </div>
        </div>

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
            {...register('juzgado_id')}
            onChange={(e) => {
              const value = e.target.value
              setValue('juzgado_id', value)
              setMostrarEntidad(value === '3')
              setMostrarCausa(value !== '3')
            }}
            helperText={errors?.juzgado_id?.message}
            color={errors?.juzgado_id && 'failure'}
          >
            <option value='' hidden>Seleccione el juzgado</option>
            {juzgados?.map((juzgado: IJuzgado) => (
              <option key={juzgado.id} value={juzgado.id}>{juzgado.nombre}</option>
            ))}
            <option value='3'>Otros</option>
          </Select>
        </div>

        {mostrarEntidad && (
          <div className='mb-4'>
            <div className='mb-2 block'>
              <Label htmlFor='entidad' value='Nombre de la entidad' /><strong className='obligatorio'>(*)</strong>
            </div>
            <TextInput
              {...register('entidad')}
              type='text'
              placeholder='Ingrese el nombre de la entidad'
              helperText={errors?.entidad?.message}
              color={errors?.entidad && 'failure'}
            />
          </div>
        )}

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='numero_acta' value='Nro. de Acta' />
            {!mostrarEntidad && <strong className='obligatorio'>(*)</strong>}
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

        {mostrarCausa && (
          <div className='mb-4'>
            <div className='mb-2 block dark:text-white'>
              <Label color='gray' htmlFor='causa' value='Causa de inhabilitación' />
              <strong className='obligatorio'>(*)</strong>
            </div>
            <Textarea
              {...register('causa')}
              placeholder='Ingrese la causa'
              helperText={errors?.causa && errors?.causa?.message}
              color={errors?.causa && 'failure'}
            />
          </div>
        )}

        <CustomSelect label='¿Se retuvo la licencia?' register={register('retencion_licencia')} />
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
