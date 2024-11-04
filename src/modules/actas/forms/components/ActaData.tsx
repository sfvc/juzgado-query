import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import { Label, Select, TextInput } from 'flowbite-react'
import { CustomSelect } from './CustomSelect'
import { formatDate } from '../../helpers/formatDate'
import { actaActions } from '../..'
import type { Prioridad } from '../../interfaces'
import type { IActaForm } from '../../interfaces/form-interfaces'
import { ACTAS, PRIORIDAD_URGENTE } from '../../../../shared/constants'
import { PreventivaData } from './PreventivaData'

export const ActaData = ({ tipoActa }: { tipoActa: string }) => {
  const { register, formState: { errors }, setValue } = useFormContext<IActaForm>()
  const [showPreventiva, setShowPreventiva] = useState<boolean>(false)

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

        <div className='flex justify-between gap-8'>
          {
            tipoActa === ACTAS.TRANSITO &&
            <div>
              <CustomSelect label='¿Se retuvo el vehículo?' register={register('retencion_vehiculo')} />
              <CustomSelect label='¿Se retuvo la licencia?' register={register('retencion_licencia')} />
            </div>
          }
          <CustomSelect label='¿Fue notificado?' register={register('notificado')} />
        </div>

        {/* <div className={`grid gap-4 ${showPreventiva ? 'md:grid-cols-2' : 'grid-cols-1'} `}>
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
                  setShowPreventiva(true)
                else 
                  setShowPreventiva(false)
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

        </div> */}
        {/* Medidas Preventivas */}
        <PreventivaData tipoActa={tipoActa} prioridades={prioridades}/>
      </div>
    </React.Fragment>
  )
}
