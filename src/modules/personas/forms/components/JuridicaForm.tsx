import { Label, Select, TextInput } from 'flowbite-react'
import { useFormContext } from 'react-hook-form'
import { DataPersona, ITipoSociedad, PersonaJuridica } from '../../interfaces'

interface Props {
  data: DataPersona
}

export const JuridicaForm = ({ data }: Props) => {
  const { register, formState: { errors } } = useFormContext<PersonaJuridica>()
    
  return (
    <div className='grid md:grid-cols-2 gap-4 grid-cols-1'>
      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label htmlFor='razon_social' value='Razon Social' /><strong className='obligatorio'>(*)</strong>
        </div>
        <TextInput
          {...register('razon_social')}
          type='text'
          placeholder='Razon Social'
          helperText={errors?.razon_social && errors?.razon_social?.message} 
          color={errors?.razon_social && 'failure'}
        />
      </div>

      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label color='gray' htmlFor='nombre' value='Nombre' />
        </div>
        <TextInput
          {...register('nombre')}
          type='text'
          placeholder='Nombre'
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
          <Label htmlFor='cuit' value='C.U.I.T' /> <strong className='obligatorio'>(*)</strong>
        </div>
        <TextInput
          {...register('cuit')}
          type='number'
          placeholder='C.U.I.T'
          helperText={errors?.cuit && errors?.cuit?.message} 
          color={errors?.cuit && 'failure'}
        />
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
        <div className='mb-2 block dark:text-white'>
          <Label htmlFor='numero_inscripcion' value='Numero de inscripcion'/>
        </div>
        <TextInput
          {...register('numero_inscripcion')}
          type='text'
          placeholder='Numero de inscripcion'
          helperText={errors?.numero_inscripcion && errors?.numero_inscripcion?.message} 
          color={errors?.numero_inscripcion && 'failure'}
        />
      </div>

      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label htmlFor='tipo_sociedad_id' value='Tipo de Sociedad' />
        </div>
        <Select
          {...register('tipo_sociedad_id', { valueAsNumber: true })}
          helperText={errors?.tipo_sociedad_id && errors?.tipo_sociedad_id.message}
          color={errors?.tipo_sociedad_id && 'failure'}
        >
          <option value='' hidden>Seleccione un tipo de sociedad</option>
          {
            data?.tipoSociedad?.map((tipo: ITipoSociedad) => (
              <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
            ))
          }
        </Select>
      </div>
    </div>
  )
}
