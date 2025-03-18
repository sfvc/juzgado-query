import { useEffect } from 'react'
import { Label, Select, TextInput } from 'flowbite-react'
import { UseFormRegister } from 'react-hook-form'
import { SearchInput } from '../../../shared'
import { vehiculoActions } from '../../vehiculos'
import { personaActions } from '../../personas'
import { clearNames } from '../../../shared'
import { useStorageFilter } from '../hooks/useStorageFilter'
import { TipoPersona } from '../../personas/forms/helpers'
import type { ActaFilterForm, DataFilters } from '../interfaces'
import type { IPersona } from '../../personas/interfaces'
import type { IVehiculo } from '../../vehiculos/interfaces'

interface Props {
    register: UseFormRegister<ActaFilterForm>,
    setValue: (key: keyof ActaFilterForm, value: string) => void,
    data: DataFilters
    resetForm: boolean
}

export const FormFilter = ({ register, setValue, resetForm, data }: Props) => {
  const { personaStorage, setPersonaStorage, vehiculoStorage, setVehiculoStorage } = useStorageFilter()

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

  useEffect(() => {
    if(!resetForm) return
    
    onFocusPersonaInput()
    onFocusVehiculoInput()
  }, [resetForm])

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
              <div>
                {
                  (item.tipo_persona === TipoPersona.FISICA) 
                    ? <span><strong>{clearNames(item.apellido, item.nombre)}</strong> - {item.numero_documento || 'SIN DNI'}</span>
                    : <span><strong>{item?.razon_social || item?.nombre}</strong> - {item.cuit || 'SIN CUIT'}</span>
                }
              </div>
            )}
            renderInput={(item) => { 
              return (item.tipo_persona === TipoPersona.FISICA)
                ? `${clearNames(item.apellido, item.nombre)} - ${item.numero_documento || 'SIN DOCUMENTO'}`
                : `${item?.razon_social || item?.nombre} - ${item.cuit || 'SIN CUIT'}` }
            }
            resetInput={onFocusPersonaInput}
            resetForm={resetForm}
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
            resetForm={resetForm}
          />
      }

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
    </div>
  )
}
