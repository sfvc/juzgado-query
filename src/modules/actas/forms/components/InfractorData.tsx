import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Button, Label, Modal, Select, Table, Tooltip } from 'flowbite-react'
import { SearchInput, icons } from '../../../../shared'
import { personaActions } from '../../../personas'
import { formatPersona } from '../../helpers/formatPersona'
import { CreatePersona } from '../integrations/CreatePersona'
import { clearNames } from '../../../../shared'
// import { AntecedentesList } from '../integrations/AntecedentesList'
import { RESPONSABLE } from '../../../../shared/constants'
import { TipoPersona } from '../../../personas/forms/helpers'
import { PersonaForm } from '../../../personas/forms/PersonaForm'
import type { IPersona } from '../../../personas/interfaces'
import type { InfractorActa } from '../../interfaces'
import type { IActaForm } from '../../interfaces/form-interfaces'
import type { Column } from '../../../../shared/interfaces'
import { Antecedentes } from '../../../antecedentes'

const columns: Column[] = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'numero_documento', label: 'DNI' },
  { key: 'cuil', label: 'CUIL' },
  { key: 'responsable', label: 'Responsable' },
  { key: 'email', label: 'Email' },
  { key: 'telefono', label: 'Teléfono' },
  { key: 'antecedentes', label: 'Antecedentes' },
  { key: 'actions', label: 'Acciones' }
]

interface Props {
  data: InfractorActa[] | undefined
}

export const InfractorData = ({ data }: Props) => {
  const { setValue, getValues } = useFormContext<IActaForm>()

  const [infractores, setInfractores] = useState<InfractorActa[]>([])
  const [responsable, setResponsable] = useState<number>(RESPONSABLE.SI)
  const [persona, setPersonaSelected] = useState<IPersona | null>(null) // Item seleccionado de la busqueda
  const [showWarning, setShowWarning] = useState(false)

  // Modal de persona
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [editPersona, setEditPersona] = useState<IPersona | null>(null)

  // Modal de antecedentes
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<number | null>(null)

  const toggleModal = (id?: number) => {
    setIsOpen(!isOpen)

    if (id) setActiveItem(id)
    else setActiveItem(null)
  }

  const addInfractor = () => {
    if (!persona) return

    const newPersona = formatPersona(persona, responsable)

    setInfractores((prev) => [...prev, newPersona])
    setValue('infractores', [...getValues('infractores') || [], newPersona])
    setPersonaSelected(null)

    if (persona.tipo_persona === TipoPersona.FISICA && !persona.cuil) {
      setShowWarning(true)
    } else {
      setShowWarning(false)
    }
  }

  const removeInfractor = (id: number) => {
    const updateInfractores = infractores.filter((infractor: InfractorActa) => infractor.id !== id)

    setInfractores(updateInfractores)
    setValue('infractores', updateInfractores)
    setShowWarning(false)
  }

  const updateInfractores = (persona: IPersona) => {
    const infractoresUpdate = infractores.map((infractor) => {
      if (infractor.id === persona.id) {
        const personaUpdate = formatPersona(persona, infractor.responsable)

        if (personaUpdate.tipo_persona === TipoPersona.FISICA && !personaUpdate.cuil) {
          setShowWarning(true)
        } else {
          setShowWarning(false)
        }

        return personaUpdate
      } else {
        return infractor
      }
    })

    setInfractores(infractoresUpdate)
  }

  // Seleccionar infractor del listado
  const itemSelected = (persona: IPersona) => setPersonaSelected(persona)

  // Buscardor de personas
  const handleSearch = async (query: string) => personaActions.getPersonasByFilter(query)
  const handleSelect = (persona: IPersona) => itemSelected(persona)

  /* Modal crear/editar Persona */
  const onOpenModal = async (personaId: number) => {
    try {
      const persona: IPersona = await personaActions.getPersonaById(personaId)

      setEditPersona(persona)
      setOpenModal(true)
    } catch (error) {
      console.log(error)
    }
  }

  const onCloseModal = async () => {
    setEditPersona(null)
    setOpenModal(false)
  }

  useEffect(() => {
    if (data) {
      setInfractores(data)

      const hayPersonaFisicaSinCuil = data.some(
        (p) => p.tipo_persona === TipoPersona.FISICA && !p.cuil
      )

      setShowWarning(hayPersonaFisicaSinCuil)
    }
  }, [data])

  return (
    <React.Fragment>
      <div className='titulos rounded-md py-2 text-center'>
        <h3 className='text-xl font-semibold text-white'>Datos de Infractores</h3>
      </div>

      <div className='grid md:grid-cols-2 gap-4 grid-cols-1'>
        <SearchInput<IPersona>
          label="Persona"
          placeholder="Ingrese el apellido o DNI de la persona"
          onSearch={handleSearch}
          onSelect={handleSelect}
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
              : `${item?.razon_social || item?.nombre} - ${item.cuit || 'SIN CUIT'}`
          }}
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
            <Button type='button' color='success' onClick={addInfractor}>Agregar</Button>

            <CreatePersona />
          </div>
        </div>
      </div>

      {showWarning && (
        <div className="bg-red-100 text-red-600 text-lg font-semibold text-center p-4 rounded-lg shadow-md">
          La persona seleccionada no tiene CUIL. Por favor, completalo antes de continuar.
        </div>
      )}

      {(infractores?.length > 0) && (
        <div className='overflow-x-auto'>
          <Table hoverable>
            <Table.Head>
              {columns.map((column: Column) => (
                <Table.HeadCell key={column.key} className='text-center bg-gray-300'>{column.label}</Table.HeadCell>
              ))}
            </Table.Head>
            <Table.Body className='divide-y'>
              {infractores.map((infractor: InfractorActa) => (
                <Table.Row key={infractor.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white text-center'>
                    {infractor?.apellido || '-'} {infractor?.nombre || '-'}
                  </Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{infractor?.documento ? infractor.documento : infractor?.cuit ? infractor.cuit : '-'}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{infractor?.cuil || '-'}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{infractor?.responsable ? 'Si' : 'No'}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{infractor?.email || '-'}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{infractor?.telefono || '-'}</Table.Cell>
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
                  <Table.Cell className='text-center flex items-center gap-2 justify-center'>
                    <Tooltip content='Editar'>
                      <Button color='success' onClick={() => onOpenModal(infractor.id)} className='w-8 h-8 flex items-center justify-center'>
                        <icons.Pencil />
                      </Button>
                    </Tooltip>

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

      <Antecedentes
        id={activeItem}
        isOpen={isOpen}
        toggleModal={toggleModal}
      />

      {/* Modal crear/editar */}
      {
        editPersona &&
        <Modal show={openModal} onClose={onCloseModal} size='5xl'>
          <Modal.Header>Editar Persona</Modal.Header>
          <Modal.Body>
            <PersonaForm
              persona={editPersona}
              onSucces={onCloseModal}
              updateInfractores={(persona: IPersona) => updateInfractores(persona)}
            />
          </Modal.Body>
        </Modal>
      }
    </React.Fragment>
  )
}
