import { useEffect } from 'react'
import { Accordion, Label, Select, TextInput } from 'flowbite-react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { ActaFilterForm, DataFilters, Prioridad, EstadoActa } from '../interfaces'
import { SearchInput } from '../../../shared'
import { IArticulo, } from '../../parametros/actas/interfaces'
import { articuloActions } from '../../parametros/actas'
import { useStorageFilter } from '../hooks/useStorageFilter'

interface Props {
  register: UseFormRegister<ActaFilterForm>
  data: DataFilters
  setValue: UseFormSetValue<ActaFilterForm>
  resetForm: boolean
}

export const AdvanceFilter = ({ register, setValue, resetForm, data }: Props) => {
  const { infraccionStorage, setInfraccionStorage } = useStorageFilter()

  const onFocusInfraccionInput = () => {
    localStorage.removeItem('infraccion')
    setInfraccionStorage('')
    setValue('articulo_id', '')
  }

  // Buscardor de Articulos
  const searchArticulo = async (query: string) => articuloActions.getArticulosByFilter(query)
  const selectArticulo = (articulo: IArticulo) => {
    setValue('articulo_id', articulo.id.toString())
    localStorage.setItem('infraccion', `${articulo.numero}`)
  }

  useEffect(() => {
    if(!resetForm) return
      
    onFocusInfraccionInput()
  }, [resetForm])

  return (
    <Accordion className='my-4' collapseAll>
      <Accordion.Panel>
        <Accordion.Title className='dark:text-white'>Filtros Avanzados</Accordion.Title>
        <Accordion.Content className='dark:bg-gray-800'>
          <div className='grid md:grid-cols-2 gap-4 grid-cols-1 mt-2 dark:bg-gray-800'>
            <div className='mb-4'>
              <div className='mb-2 block'>
                <Label
                  htmlFor='prioridad_id'
                  value='Prioridad'
                />
              </div>
              <Select {...register('prioridad_id')} disabled={!data?.prioridades?.length}>
                <option value='' hidden>Filtrar por prioridad</option>
                {
                  data?.prioridades?.map((prioridad: Prioridad) => (
                    <option key={prioridad.id} value={prioridad.id}>{prioridad.nombre}</option>
                  ))
                }
              </Select>
            </div>

            <div className='mb-4'>
              <div className='mb-2 block'>
                <Label htmlFor='estado_id' value='Estados' />
              </div>
              <Select {...register('estado_id')}>
                <option value='' hidden>Filtrar por estado</option>
                {
                  data?.estadosActa?.map((estado: EstadoActa) => (
                    <option key={estado.id} value={estado.id} >{estado.nombre}</option>
                  ))
                }
              </Select>
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

            {/* Buscar por codigo de articulo  */}
            {
              infraccionStorage 
                ? 
                <div className='mb-4'>
                  <div className='mb-2 block'>
                    <Label htmlFor='infraccion' value='Articulo' />
                  </div>
                  <TextInput
                    id='infraccion'
                    value={infraccionStorage}
                    readOnly
                    onFocus={onFocusInfraccionInput}
                  />
                </div> 
                : 
                <SearchInput<IArticulo>
                  label="Articulo"
                  placeholder="Buscar articulo"
                  onSearch={searchArticulo}
                  onSelect={selectArticulo}
                  renderItem={(item) => (
                    <div><strong>{item.numero}</strong> - {item?.detalle || 'SIN DETALLE'}</div>
                  )}
                  renderInput={(item) => { return `${item.numero}`} }
                  resetInput={onFocusInfraccionInput}
                  resetForm={resetForm}
                />
            }

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
          </div>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  )
}
