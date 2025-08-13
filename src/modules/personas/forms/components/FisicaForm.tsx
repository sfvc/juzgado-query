import { Label, Select, TextInput } from 'flowbite-react'
import { useFormContext } from 'react-hook-form'
import { DataPersona, INacionalidad, PersonaFisica } from '../../interfaces'
import { CustomSelect } from '../../../actas/forms/components/CustomSelect'

interface Props {
  data: DataPersona
}

export const FisicaForm = ({ data }: Props) => {
  const { register, formState: { errors } } = useFormContext<PersonaFisica>()

  const soloNumeros = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    input.value = input.value.replace(/[^\d]/g, '')
  }

  return (
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
          onInput={soloNumeros}
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
          <Label htmlFor='cuil' value='C.U.I.L' />
        </div>
        <TextInput
          {...register('cuil')}
          type='text'
          placeholder='C.U.I.L'
          onInput={soloNumeros}
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

      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label htmlFor='telefono' value='Telefono' />
        </div>
        <TextInput
          {...register('telefono')}
          type='text'
          placeholder='Telefono'
          helperText={errors?.telefono && errors?.telefono?.message}
          color={errors?.telefono && 'failure'}
        />
      </div>

      <div className='mb-4'>
        <CustomSelect label='¿Debe cuota alimentaria?' register={register('cuota_alimentaria')} />
      </div>
    </div>
  )
}
