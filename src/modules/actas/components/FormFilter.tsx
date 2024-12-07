import { Label, Select, TextInput } from 'flowbite-react'
import { UseFormRegister } from 'react-hook-form'
import { SearchInput } from '../../../shared'
import { vehiculoActions } from '../../vehiculos'
import { personaActions } from '../../personas'
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

  // Buscardor de Personas
  const searchPersona = async (query: string) => personaActions.getPersonasByFilter(query)
  const selectPersona = (persona: IPersona) => {
    setValue('infractor_id', persona.id.toString())
    localStorage.setItem('infractor', `${persona.apellido} - DNI. ${persona?.numero_documento || 'NO REGISTRADO'}`)
  }

  // Buscardor de Vehiculos
  const searchVehiculo = async (query: string) => vehiculoActions.getVehiculosByFilter(query)
  const selectVehiculo = (vehiculo: IVehiculo) => {
    setValue('vehiculo_id', vehiculo.id.toString())
    localStorage.setItem('vehiculo', `${vehiculo.dominio} - ${vehiculo?.titular?.apellido || 'SIN TITULAR'}`)
  }

  return (
    <div className='grid md:grid-cols-2 gap-4 grid-cols-1 mt-2'>
      {
        localStorage.getItem('infractor') 
          ? 
          <div className='mb-4'>
            <div className='mb-2 block'>
              <Label htmlFor='infractor' value='Infractor' />
            </div>
            <TextInput id='infractor' readOnly value={localStorage.getItem('infractor') || ''} />
          </div> 
          : 
          <SearchInput<IPersona>
            label="Infractor"
            placeholder="Buscar persona"
            onSearch={searchPersona}
            onSelect={selectPersona}
            renderItem={(item) => (
              <div><strong>{item.apellido}</strong> - DNI. {item?.numero_documento || 'NO REGISTRADO'}</div>
            )}
            renderInput={(item) => { return `${item.apellido} - DNI. ${item?.numero_documento || 'NO REGISTRADO'}`} }
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
        localStorage.getItem('vehiculo') 
          ? 
          <div className='mb-4'>
            <div className='mb-2 block'>
              <Label htmlFor='vehiculo' value='Patente' />
            </div>
            <TextInput
              id='vehiculo'
              value={localStorage.getItem('vehiculo') || ''}
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
              <div><strong>{item.dominio}</strong> - {item?.titular?.apellido || 'SIN TITULAR'}</div>
            )}
            renderInput={(item) => { return `${item.dominio} - ${item?.titular?.apellido || 'SIN TITULAR'}`} }
          />
      }
    </div>
  )
}
