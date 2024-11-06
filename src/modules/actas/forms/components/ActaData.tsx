import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import { Label, TextInput } from 'flowbite-react'
import { CustomSelect } from './CustomSelect'
import { formatDate } from '../../helpers/formatDate'
import { actaActions } from '../..'
import type { IActaForm } from '../../interfaces/form-interfaces'
import { PreventivaData } from './PreventivaData'
import { ACTAS } from '../../../../shared/constants'

export const ActaData = ({ tipoActa }: { tipoActa: string }) => {
  const { register, formState: { errors }, setValue } = useFormContext<IActaForm>()

  const { data: prioridades , isLoading } = useQuery({
    queryKey: ['prioridades'],
    queryFn: actaActions.getPrioridades,
    staleTime: 1000 * 60 * 5 //TODO: Agregar mas tiempo en cache para prioridades
  })

  return (
    <React.Fragment>
      <div className='titulos rounded-md py-2 text-center'>
        <h3 className='text-xl font-semibold text-white'>Datos de Acta</h3>
      </div>
    
      <div className='grid md:grid-cols-2 gap-4 grid-cols-1'>
        <div className='mb-4'>
          <div className='mb-2 block'>
            <Label
              htmlFor='numero_acta'
              value='Número de acta'
            />
            <strong className='obligatorio'>(*)</strong>
          </div>
          <TextInput
            {...register('numero_acta')}
            id='numero_acta'
            placeholder='Ingrese el número de acta'
            helperText={errors?.numero_acta?.message}
            color={errors?.numero_acta && 'failure'}
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block'>
            <Label
              htmlFor='hora'
              value='Hora de la infraccion'
            />
            <strong className='obligatorio'>(*)</strong>
          </div>
          <TextInput
            {...register('hora')}
            id='hora'
            placeholder='Ingrese la hora de la infraccion'
            type='time'
            helperText={errors?.hora?.message}
            color={errors?.hora && 'failure'}
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block'>
            <Label
              htmlFor='fecha'
              value='Fecha de la infraccion'
            />
            <strong className='obligatorio'>(*)</strong>
          </div>
          <TextInput
            {...register('fecha')}
            id='fecha'
            placeholder='Ingrese la fecha de la infraccion'
            type='date'
            onChange={(e) => formatDate(e.target.value, setValue)}
            helperText={errors?.fecha?.message}
            color={errors?.fecha && 'failure'}
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block'>
            <Label
              htmlFor='fecha_prescripcion'
              value='Fecha de prescripción'
            />
          </div>
          <TextInput
            {...register('fecha_prescripcion')}
            placeholder='Ingrese la fecha de prescripción'
            type='date'
            disabled
          />
        </div>

        <div className='flex gap-6'>
          {
            tipoActa === ACTAS.TRANSITO &&
            <div className='flex justify-between w-2/3 gap-6'>
              <CustomSelect label='¿Se retuvo el vehículo?' register={register('retencion_vehiculo')} />
              <CustomSelect label='¿Se retuvo la licencia?' register={register('retencion_licencia')} />
            </div>
          }
          <div className={`${ tipoActa !== ACTAS.TRANSITO ? 'w-full' : 'w-1/3' }`}>
            <CustomSelect label='¿Fue notificado?' register={register('notificado')} />
          </div>
        </div>

        {/* Medidas Preventivas */}
        <PreventivaData tipoActa={tipoActa} prioridades={prioridades}/>
      </div>
    </React.Fragment>
  )
}
