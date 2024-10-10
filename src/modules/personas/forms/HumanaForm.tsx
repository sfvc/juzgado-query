import { Button, Label, Select, Spinner, TextInput } from 'flowbite-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { usePersona } from '../hooks/usePersona'
import { DataPersona, INacionalidad, IPersona, PersonaHumana } from '../interfaces'
import { DomicilioForm } from './DomicilioForm'
import { useState } from 'react'
import { ILocalidad } from '../../parametros/localizacion/interfaces/localizacion'

const validationSchema = yup.object().shape({
  apellido: yup.string().required('El apellido es requerido'),
  nombre: yup.string().required('El nombre es requerido'),
  tipo_documento: yup.string().required('El tipo de documento es requerido'),
  numero_documento: yup.string().required('El número de documento es requerido'),
  fecha_nacimiento: yup.string().notRequired(),
  estado_civil:  yup.string().notRequired(),
  cuil: yup.string().required('El cuil es requerido'),
  sexo: yup.string().required('El sexo es requerido'),
  email: yup.string().email('Email no válido').notRequired(),
  nacionalidad_id: yup.number()
    .transform((value) => (isNaN(value) ? null : value))
    .required('La nacionalidad es requerida'),
  tipo_persona: yup.string().required('El tipo de persona es requerido'),

  // Domicilio
  domicilio: yup.object().shape({
    pais_id: yup.string()
      .when('$showDomicilio', {
        is: true,
        then: (schema) => schema.required('El país es requerido'),
        otherwise: (schema) => schema.notRequired(),
      }),
    provincia_id: yup.string()
      .when('$showDomicilio', {
        is: true,
        then: (schema) => schema.required('La provincia es requerida'),
        otherwise: (schema) => schema.notRequired(),
      }),
    departamento_id: yup.number()
      .transform((value) => (isNaN(value) ? null : value))
      .notRequired(),
    barrio_id: yup.number()
      .transform((value) => (isNaN(value) ? null : value))
      .notRequired(),
    calle: yup.string()
      .when('$showDomicilio', {
        is: true,
        then: (schema) => schema.required('La calle es requerida'),
        otherwise: (schema) => schema.notRequired(),
      }),
    numero: yup.number()
      .transform((value) => (isNaN(value) ? null : value))
      .notRequired(),
    lote_dpto: yup.string().notRequired(),
    manzana_piso: yup.string().notRequired()
  }).notRequired()
})

interface Props {
    persona: IPersona | null
    onSucces: () => void
    tipoPersona: string
    data: DataPersona
    isLoading: boolean
}

export const HumanaForm = ({ persona, onSucces, tipoPersona, data, isLoading }: Props) => {
  const [showDomicilio, setShowDomicilio] = useState<boolean>(false)
  const { createPersona, updatePersona } = usePersona()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PersonaHumana>({
    defaultValues: { 
      apellido: persona?.apellido || '',
      nombre: persona?.nombre || '',
      tipo_documento: persona?.tipo_documento || '',
      numero_documento: persona?.numero_documento || '',
      estado_civil: persona?.estado_civil || '',
      fecha_nacimiento: persona?.fecha_nacimiento || '',
      cuil: persona?.cuil || '',
      sexo: persona?.sexo || '',
      email: persona?.email || '',
      nacionalidad_id: persona?.nacionalidad?.id || null,
      tipo_persona: persona?.tipo_persona || tipoPersona,

      domicilio: {
        pais_id: persona?.domicilio?.pais_id || null,
        provincia_id: persona?.domicilio?.provincia_id || null,
        departamento_id: persona?.domicilio?.departamento_id || null,
        barrio_id: persona?.domicilio?.barrio_id || null,
        calle: persona?.domicilio?.calle || '',
        numero: persona?.domicilio?.numero || null,
        lote_dpto: persona?.domicilio?.lote_dpto || null,
        manzana_piso: persona?.domicilio?.manzana_piso || null,
      }
    },
    context: { showDomicilio },
    resolver: yupResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<PersonaHumana> = async (form: PersonaHumana) => {
    // if (persona) await updatePersona.mutateAsync({id: persona.id, persona: form})
    // else await createPersona.mutateAsync(form)
      
    console.log(form)
    onSucces()
  }

  const selectLocalidad = (localidad: ILocalidad) => setValue('domicilio.localidad_id', localidad.id)

  if (isLoading) return <div className='flex justify-center'><Spinner size='lg'/></div>
      
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid md:grid-cols-2 gap-4 grid-cols-1'>
        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label htmlFor='apellido' value='Apellido' /><strong className='obligatorio'>(*)</strong>
          </div>
          <TextInput
            {...register('apellido')}
            placeholder='Apellido'
            helperText={errors?.apellido && errors?.apellido?.message} 
            color={errors?.apellido && 'failure'}
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='nombre' value='Nombre' /><strong className='obligatorio'>(*)</strong>
          </div>
          <TextInput
            {...register('nombre')}
            type='text'
            placeholder='Nombre'
            helperText={errors?.nombre && errors?.nombre?.message} 
            color={errors?.nombre && 'failure'}
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label htmlFor='tipo_documento' value='Tipo de Documento' /><strong className='obligatorio'>(*)</strong>
          </div>
          <Select
            {...register('tipo_documento')}
            helperText={errors?.tipo_documento && errors?.tipo_documento.message}
            color={errors?.tipo_documento && 'failure'}
          >
            <option value='' hidden>Seleccione un tipo de documento</option>
            {
              data?.tipoDocumento.map((tipo: string) => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))
            }
          </Select>
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label htmlFor='numero_documento' value='Documento' /><strong className='obligatorio'>(*)</strong>
          </div>
          <TextInput
            {...register('numero_documento')}
            type='text'
            placeholder='Numero de Documento'
            helperText={errors?.numero_documento && errors?.numero_documento?.message} 
            color={errors?.numero_documento && 'failure'}
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label htmlFor='estado_civil' value='Estado Civil' />
          </div>
          <Select
            {...register('estado_civil')}
            helperText={errors?.estado_civil && errors?.estado_civil.message}
            color={errors?.estado_civil && 'failure'}
          >
            <option value='' hidden>Seleccione un estado civil</option>
            {
              data?.estadoCivil?.map((estado: string) => (
                <option key={estado} value={estado}>{estado}</option>
              ))
            }
          </Select>
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label htmlFor='fecha_nacimiento' value='Fecha de Nacimiento' />
          </div>
          <TextInput
            {...register('fecha_nacimiento')}
            type='date'
            placeholder='Fecha de Nacimiento'
            helperText={errors?.fecha_nacimiento && errors?.fecha_nacimiento?.message} 
            color={errors?.fecha_nacimiento && 'failure'}
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label htmlFor='cuil' value='C.U.I.L' /> <strong className='obligatorio'>(*)</strong>
          </div>
          <TextInput
            {...register('cuil')}
            type='text'
            placeholder='C.U.I.L'
            helperText={errors?.cuil && errors?.cuil?.message} 
            color={errors?.cuil && 'failure'}
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label htmlFor='sexo' value='Sexo' /><strong className='obligatorio'>(*)</strong>
          </div>
          <Select
            {...register('sexo')}
            helperText={errors?.sexo && errors?.sexo?.message} 
            color={errors?.sexo && 'failure'}
          >
            <option value='' hidden>Seleccione el sexo</option>
            {
              data?.sexo?.map((sex: string) => (
                <option key={sex} value={sex}>{sex}</option>
              ))
            }
          </Select>
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label htmlFor='nacionalidad_id' value='Nacionalidad' />
            <strong className='obligatorio'>(*)</strong>
          </div>
          <Select
            {...register('nacionalidad_id', { valueAsNumber: true })}
            helperText={errors?.nacionalidad_id && errors?.nacionalidad_id?.message} 
            color={errors?.nacionalidad_id && 'failure'}
          >
            <option value='' hidden>Seleccione la nacionalidad</option>
            {
              data?.nacionalidades?.map((nacionalidad: INacionalidad) => (
                <option key={nacionalidad.id} value={nacionalidad.id}>{nacionalidad.nombre}</option>
              ))
            }
          </Select>
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label htmlFor='email' value='Email'/>
          </div>
          <TextInput
            {...register('email')}
            type='email'
            placeholder='Email'
            helperText={errors?.email && errors?.email?.message} 
            color={errors?.email && 'failure'}
          />
        </div>
      </div>

      {/* Domicilio */}
      <DomicilioForm 
        register={register} 
        errors={errors} 
        showDomicilio={showDomicilio} 
        setShowDomicilio={setShowDomicilio}
        selectLocalidad={selectLocalidad}
        domicilio= {persona?.domicilio || null}
      />

      {/* Buttons */}
      <div className='flex justify-end gap-2'>
        <Button color="failure" onClick={onSucces}>Cancelar</Button>

        <Button color='gray' type='submit' disabled={isSubmitting} isProcessing={isSubmitting}>
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </form>
  )
}
