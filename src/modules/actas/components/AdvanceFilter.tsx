import { useEffect } from 'react'
import { Accordion, Label, Select, TextInput } from 'flowbite-react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { ActaFilterForm, Prioridad } from '../interfaces'
import { SearchInput } from '../../../shared'
import { IArticulo } from '../../parametros/actas/interfaces'
import { articuloActions } from '../../parametros/actas'
import { useStorageFilter } from '../hooks/useStorageFilter'

interface Props {
  register: UseFormRegister<ActaFilterForm>
  prioridades: Prioridad[] | undefined
  setValue: UseFormSetValue<ActaFilterForm>
  resetForm: boolean
}

export const AdvanceFilter = ({ register, prioridades, setValue, resetForm }: Props) => {
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
              <Select {...register('prioridad_id')} disabled={!prioridades?.length}>
                <option value='' hidden>Filtrar por prioridad</option>
                {
                  prioridades?.map((prioridad: Prioridad) => (
                    <option key={prioridad.id} value={prioridad.id}>{prioridad.nombre}</option>
                  ))
                }
              </Select>
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
          </div>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  )
}
