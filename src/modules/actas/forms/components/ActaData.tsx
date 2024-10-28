import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import { Label, Select, TextInput } from 'flowbite-react'
import { CustomSelect } from './CustomSelect'
import { formatDate } from '../../helpers/formatDate'
import { actaActions } from '../..'
import { Prioridad } from '../../interfaces'
import { ITransitoForm } from '../../interfaces/form-interfaces'
import { INSPECCION_PREVENTIVAS, PRIORIDAD_URGENTE } from '../../../../shared/constants'

export const ActaData = () => {
  const { register, formState: { errors }, setValue } = useFormContext<ITransitoForm>()
  const [preventiva, setPreventiva] = useState<boolean>(false)
  //TODO: Agregar preventiva de acuerdo al tipo de acta

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

        <div className='grid grid-cols-3 gap-8'>
          <CustomSelect label='¿Se retuvo el vehículo?' register={register('retencion_vehiculo')} />
          <CustomSelect label='¿Se retuvo la licencia?' register={register('retencion_licencia')} />
          <CustomSelect label='¿Fue notificado?' register={register('notificado')} />
        </div>

        {/* Medidas Preventivas */}
        <div className={`grid gap-4 ${preventiva ? 'md:grid-cols-2' : 'grid-cols-1'} `}>
          <div>
            <div className='mb-2 block'>
              <Label
                htmlFor='prioridad_id'
                value='Prioridad'
              />
              <strong className='obligatorio'>(*)</strong>
            </div>
            <Select
              {...register('prioridad_id', { valueAsNumber: true })}
              helperText={errors?.prioridad_id?.message}
              color={errors?.prioridad_id && 'failure'}
              disabled={isLoading}
              onChange={(e) => {
                if (e.target.value === PRIORIDAD_URGENTE)
                  setPreventiva(true)
                else 
                  setPreventiva(false)
              }}
            >
              <option value='' hidden>Seleccione una prioridad</option>
              {
                (prioridades?.length > 0) && prioridades.map((prioridad: Prioridad) => (
                  <option key={prioridad.id} value={prioridad.id}>{prioridad.nombre}</option>
                ))
              }
            </Select>
          </div>

          {
            // preventiva && tipo_acta === 'INSPECCION' || tipo_acta === 'OBRAS_PARTICULARES'
            preventiva &&
            <div>
              <div className='mb-2 block'>
                <Label
                  htmlFor='preventiva'
                  value='Preventiva'
                />
                <strong className='obligatorio'>(*)</strong>
              </div>
              <Select
                {...register('preventiva')}
                helperText={errors?.preventiva?.message}
                color={errors?.preventiva && 'failure'}
                disabled={isLoading}
              >
                <option value='' hidden>Seleccione una prioridad</option>
                {
                  INSPECCION_PREVENTIVAS.map((preventiva, index: number) => (
                    <option key={index} value={preventiva.value}>{preventiva.label}</option>
                  ))
                }
              </Select>
            </div>
          }
        </div>
      </div>
    </React.Fragment>

  )
}
