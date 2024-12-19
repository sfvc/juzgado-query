import { useState } from 'react'
import { Label, Select } from 'flowbite-react'
import { useFormContext } from 'react-hook-form'
import type { IActaForm } from '../../interfaces/form-interfaces'
import type { Prioridad } from '../../interfaces'
import { 
  ACTAS, 
  INSPECCION_PREVENTIVAS, 
  OBRAS_PREVENTIVAS, 
  PRIORIDAD_URGENTE
} from '../../../../shared/constants'

export const PreventivaData = ({ tipoActa, prioridades }: { tipoActa: string, prioridades: Prioridad[] }) => {
  const { register, setValue, formState: { errors } } = useFormContext<IActaForm>()
  const [showPreventiva, setShowPreventiva] = useState<boolean>(false)
    
  const preventivas = 
    tipoActa === ACTAS.INSPECCION 
      ? INSPECCION_PREVENTIVAS 
      :  tipoActa === ACTAS.OBRAS_PARTICULARES
        ? OBRAS_PREVENTIVAS
        : []
        
  return (
    <div className={`grid gap-4 ${showPreventiva ? 'md:grid-cols-2' : 'grid-cols-1'} `}>
      <div>
        <div className='mb-2 block'>
          <Label htmlFor='prioridad_id' value='Prioridad' /><strong className='obligatorio'>(*)</strong>
        </div>
        <Select
          {...register('prioridad_id')}
          helperText={errors?.prioridad_id?.message}
          color={errors?.prioridad_id && 'failure'}
          onChange={(e) => {
            if (e.target.value === PRIORIDAD_URGENTE)
              setShowPreventiva(true)
            else 
              setShowPreventiva(false)

            setValue('prioridad_id', +e.target.value)
          }}
        >
          <option value='' hidden>Seleccione una prioridad</option>
          {
            prioridades?.length && prioridades.map((prioridad: Prioridad) => (
              <option key={prioridad.id} value={prioridad.id}>{prioridad.nombre}</option>
            ))
          }
        </Select>
      </div>

      {
        showPreventiva &&
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='preventiva' value='Preventiva' /><strong className='obligatorio'>(*)</strong>
            </div>
            <Select {...register('preventiva')}>
              <option value='' hidden>Seleccione una medida</option>
              {
                preventivas.map((preventiva, index: number) => (
                  <option key={index} value={preventiva.value}>{preventiva.label}</option>
                ))
              }
            </Select>
          </div>
      }

      {/* <span>{JSON.stringify(errors?.prioridad_id?.message)}</span> */}
    </div>
  )
}
