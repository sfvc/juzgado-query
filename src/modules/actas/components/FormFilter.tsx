import { useState } from 'react'
import { Label, Select, TextInput } from 'flowbite-react'
import { UseFormRegister } from 'react-hook-form'
import { SearchInput } from '../../../shared'
import { vehiculoActions } from '../../vehiculos'
import { personaActions } from '../../personas'
import { clearNames } from '../../../shared'
import type { ActaFilterForm, DataFilters, EstadoActa } from '../interfaces'
import type { IPersona } from '../../personas/interfaces'
import type { IVehiculo } from '../../vehiculos/interfaces'

interface Props {
    register: UseFormRegister<ActaFilterForm>,
    setValue: (key: keyof ActaFilterForm, value: string) => void ,
    filterParams: ActaFilterForm,
    data: DataFilters
}

export const FormFilter = ({ register, setValue, filterParams, data }: Props) => {
  const [personaStorage, setPersonaStorage] = useState<string>(localStorage.getItem('infractor') || '')
  const [vehiculoStorage, setVehiculoStorage] = useState<string>(localStorage.getItem('vehiculo') || '')

  const onFocusPersonaInput = () => {
    localStorage.removeItem('infractor')
    setPersonaStorage('')
    setValue('persona_id', '')
  }

  const onFocusVehiculoInput = () => {
    localStorage.removeItem('vehiculo')
    setVehiculoStorage('')
    setValue('vehiculo_id', '')
  }

  // Buscardor de Personas
  const searchPersona = async (query: string) => personaActions.getPersonasByFilter(query)
  const selectPersona = (persona: IPersona) => {
    setValue('persona_id', persona.id.toString())
    localStorage.setItem('infractor', `${clearNames(persona.apellido, persona.nombre)} - DNI. ${persona?.numero_documento || 'NO REGISTRADO'}`)
  }

  // Buscardor de Vehiculos
  const searchVehiculo = async (query: string) => vehiculoActions.getVehiculosByFilter(query)
  const selectVehiculo = (vehiculo: IVehiculo) => {
    setValue('vehiculo_id', vehiculo.id.toString())
    localStorage.setItem('vehiculo', `${vehiculo.dominio} - ${clearNames(vehiculo?.titular?.apellido, vehiculo?.titular?.nombre) || 'SIN TITULAR'}`)
  }

  return (
    <div className='grid md:grid-cols-2 gap-4 grid-cols-1 mt-2'>
      {
        personaStorage
          ? 
          <div className='mb-4'>
            <div className='mb-2 block'>
              <Label htmlFor='infractor' value='Persona' />
            </div>
            <TextInput 
              id='infractor' 
              readOnly 
              value={personaStorage} 
              onFocus={onFocusPersonaInput}
            />
          </div> 
          : 
          <SearchInput<IPersona>
            label="Persona"
            placeholder="Buscar persona"
            onSearch={searchPersona}
            onSelect={selectPersona}
            renderItem={(item) => (
              <div><strong>{clearNames(item.apellido, item.nombre)}</strong> - DNI. {item?.numero_documento || 'NO REGISTRADO'}</div>
            )}
            renderInput={(item) => { return `${clearNames(item.apellido, item.nombre)} - DNI. ${item?.numero_documento || 'NO REGISTRADO'}`} }
            resetInput={onFocusPersonaInput}
          />
      }

      <div className='mb-4 relative'>
        <div className='mb-2 block'>
          <Label htmlFor='numero_acta' value='Número de Acta' />
        </div>
        <TextInput
          {...register('numero_acta')}
          id='numero_acta'
          placeholder='Filtrar por número de acta'
        />
      </div>
        
      <div className='mb-4'>
        <div className='mb-2 block'>
          <Label htmlFor='estado_id' value='Estados' />
        </div>
        <Select {...register('estado_id')} value={filterParams?.estado_id} >
          <option value='' hidden>Filtrar por estado</option>
          {
            data?.estadosActa?.map((estado: EstadoActa) => (
              <option key={estado.id} value={estado.id} >{estado.nombre}</option>
            ))
          }
        </Select>
      </div>

      <div className='mb-4'>
        <div className='mb-2 block'>
          <Label htmlFor='tipo_acta_id' value='Tipo de Acta'/>
        </div>
        <Select {...register('tipo_acta_id')} disabled={!data?.tiposActa?.length}>
          <option value='' hidden>Filtrar por tipo de acta</option>
          {
            data?.tiposActa?.map((tipoActa: string, index: number) => (
              <option key={index} value={tipoActa}>{tipoActa}</option>
            ))
          }
        </Select>
      </div>

      <div className='mb-4'>
        <div className='mb-2 block'>
          <Label htmlFor='fecha_desde' value='Fecha Desde' />
        </div>
        <TextInput
          {...register('fecha_desde')}
          name='fecha_desde'
          placeholder='Ingrese la fecha de acta'
          type='date'
        />
      </div>

      <div className='mb-4'>
        <div className='mb-2 block'>
          <Label htmlFor='fecha_hasta' value='Fecha Hasta' />
        </div>
        <TextInput
          {...register('fecha_hasta')}
          placeholder='Ingrese la fecha de acta'
          type='date'
        />
      </div>

      <div className='mb-4 relative'>
        <div className='mb-2 block'>
          <Label htmlFor='numero_causa'value='Número de Causa' />
        </div>
        <TextInput
          {...register('numero_causa')}
          id='numero_causa'
          placeholder='Filtrar por número de causa'
        />
      </div>

      {
        vehiculoStorage
          ? 
          <div className='mb-4'>
            <div className='mb-2 block'>
              <Label htmlFor='vehiculo' value='Patente' />
            </div>
            <TextInput
              id='vehiculo'
              value={vehiculoStorage}
              onFocus={onFocusVehiculoInput}
              readOnly
            />
          </div> 
          : 
          <SearchInput<IVehiculo>
            label="Patente"
            placeholder="Buscar vehiculo"
            onSearch={searchVehiculo}
            onSelect={selectVehiculo}
            renderItem={(item) => (
              <div><strong>{item.dominio}</strong> - {clearNames(item?.titular?.apellido, item?.titular?.nombre) || 'SIN TITULAR'}</div>
            )}
            renderInput={(item) => { return `${item.dominio} - ${clearNames(item?.titular?.apellido, item?.titular?.nombre) || 'SIN TITULAR'}`} }
            resetInput={onFocusVehiculoInput}
          />
      }
    </div>
  )
}
