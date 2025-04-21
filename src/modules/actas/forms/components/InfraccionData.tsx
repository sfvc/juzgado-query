import React from 'react'
import { Label, Textarea, TextInput } from 'flowbite-react'
import { useFormContext } from 'react-hook-form'
import type { IActaForm } from '../../interfaces/form-interfaces'

export const InfraccionData = () => {
  const { register, formState: { errors } } = useFormContext<IActaForm>()
  
  return (
    <React.Fragment>
      <div className='titulos rounded-md py-2 text-center'>
        <h3 className='text-xl font-semibold text-white'>Datos del Lugar de la Infracción</h3>
      </div>

      <div className='grid md:grid-cols-2 gap-4 grid-cols-1'>
        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label
              color='gray'
              htmlFor='calle'
              value='Calle'
            />
            <strong className='obligatorio'>(*)</strong>
          </div>
          <TextInput
            {...register('calle')}
            id='calle'
            placeholder='Ingrese la calle donde se realizó la infracción'
            helperText={errors?.calle?.message}
            color={errors?.calle && 'failure'}
          />
        </div>

        <div className='w-full' id='textarea'>
          <div className='mb-2 block'>
            <Label
              htmlFor='observaciones'
              value='Observaciones'
            />
            <strong className='obligatorio'>(*)</strong>
          </div>
          <Textarea
            {...register('observaciones')}
            id='observaciones'
            placeholder='Describe la infraccion aqui'
            rows={3}
            helperText={errors?.observaciones?.message}
            color={errors?.observaciones && 'failure'}
            className='p-2.5'
          />
        </div>
      </div>
    </React.Fragment>
  )
}
