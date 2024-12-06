import { Button, Label, Select, Table, Tooltip } from 'flowbite-react'
import React, { useState } from 'react'
import { IPersona } from '../../../personas/interfaces'
import { useFormContext } from 'react-hook-form'
import { SearchInput, icons } from '../../../../shared'
import { personaActions } from '../../../personas'
import { formatPersona } from '../../helpers/formatPersona'
import { CreatePersona } from '../integrations/CreatePersona'
import type { InfractorActa } from '../../interfaces'
import type { IActaForm } from '../../interfaces/form-interfaces'
import type { Column } from '../../../../shared/interfaces'
import { AntecedentesList } from '../integrations/AntecedentesList'
import { RESPONSABLE } from '../../../../shared/constants'

const columns: Column[] = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'numero_documento', label: 'Documento' },
  { key: 'responsable', label: 'Responsable' },
  { key: 'antecedentes', label: 'Antecedentes' },
  { key: 'actions', label: 'Acciones' }
]

interface Props {
  data: InfractorActa[] | undefined
}

export const InfractorData = ({ data }: Props) => {
  const { setValue, getValues } = useFormContext<IActaForm>() 

  const [infractores, setInfractores] = useState<InfractorActa[]>(data || [])
  const [responsable, setResponsable] = useState<number>(RESPONSABLE.SI)
  const [persona, setPersonaSelected] = useState<IPersona | null>(null) // Item seleccionado de la busqueda

  // Modal de antecedentes
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<number | null>(null) 

  const toggleModal = (id?: number) => {
    setIsOpen(!isOpen)

    if (id) setActiveItem(id)
    else setActiveItem(null)

  }
  
  // Agregar persona al listado de infractores
  const addInfractor = () => {
    if(!persona) return
    const newPersona = formatPersona(persona, responsable)

    setInfractores((prev) => [...prev, newPersona])
    setValue('infractores', [...getValues('infractores') || [], newPersona]) // Actualizar estado del formulario
    setPersonaSelected(null)
  }

  const removeInfractor = (id: number) => {
    const updateInfractores = infractores.filter((infractor: InfractorActa) => infractor.id !== id)
    
    setInfractores(updateInfractores)
    setValue('infractores', updateInfractores)
  }

  // Seleccionar infractor del listado
  const itemSelected = (persona: IPersona) => setPersonaSelected(persona)

  // Buscardor de personas
  const handleSearch = async (query: string) => personaActions.getPersonasByFilter(query)
  const handleSelect = (persona: IPersona) => itemSelected(persona)
    
  return (
    <React.Fragment>
      <div className='titulos rounded-md py-2 text-center'>
        <h3 className='text-xl font-semibold text-white'>Datos de Infractores</h3>
      </div>

      <div className='grid md:grid-cols-2 gap-4 grid-cols-1'>
        <SearchInput<IPersona>
          label="Persona"
          placeholder="Ingrese en apellido o dni de la persona"
          onSearch={handleSearch}
          onSelect={handleSelect}
          renderItem={(item) => (
            <div><strong>{item.apellido}</strong> - {item.numero_documento || 'SIN DOCUMENTO'}</div>
          )}
          renderInput={(item) => { return `${item.apellido} - ${item.numero_documento || 'SIN DOCUMENTO'}`} }
        />

        <div className='grid sm:grid-cols-2 gap-4 grid-cols-1'>
          <div className='flex justify-between gap-4 dark:text-white'>
            <div className='block w-full'>
              <div className='mb-2'>
                <Label color='gray' htmlFor='responsable'>Responsable</Label>
              </div>
              <Select id='responsable' name='responsable' onChange={(e) => setResponsable(+e.target.value)} >
                <option value={RESPONSABLE.SI}>Sí</option>
                <option value={RESPONSABLE.NO}>No</option>
              </Select>
            </div>
          </div>

          <div className='flex items-start mt-8 gap-4'>
            <Button type='button' color='success' className='h-10' onClick={addInfractor}>Agregar</Button>

            <CreatePersona />
          </div>
        </div>
      </div>

      {/* Tabla de infractores */}
      {(infractores?.length > 0) && (
        <div className='overflow-x-auto'>
          <Table hoverable>
            <Table.Head>
              {columns.map((column: Column ) => (
                <Table.HeadCell key={column.key} className='text-center bg-gray-300'>{column.label}</Table.HeadCell>
              ))}
            </Table.Head>
            <Table.Body className='divide-y'>
              {infractores.map((infractor: InfractorActa) => (
                <Table.Row key={infractor.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white text-center'>
                    {infractor.nombre}
                  </Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{infractor?.documento || infractor.cuit}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{infractor?.responsable ? 'Si' : 'No' }
                  </Table.Cell>
                  <Table.Cell className='text-center dark:text-white p-0 m-0'>
                    <div className='flex items-center justify-center '>
                      <div className='flex justify-center items-center'>
                        <Tooltip content='Ver Antecedentes'>
                          <button 
                            type='button' 
                            className='rounded-md border border-gray-300 w-8 h-8 hover:bg-gray-200 hover:border-gray-200 dark:hover:bg-gray-500'
                            onClick={() => toggleModal(infractor.id)}
                          >
                            <icons.Antecedente />
                          </button>
                        </Tooltip>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell className='text-center flex items-center justify-center'>
                    <Tooltip content='Eliminar'>
                      <Button color='failure' onClick={() => removeInfractor(infractor.id)} className='w-8 h-8 flex items-center justify-center'>
                        <icons.Trash />
                      </Button>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}

      <AntecedentesList 
        id={activeItem}
        isOpen={isOpen}
        toggleModal={toggleModal}
      />
    </React.Fragment>
  )
}
