import React, { useState } from 'react'
import { Button, Modal, Pagination, Table, TextInput, Tooltip } from 'flowbite-react'
import { Column } from '../../../shared/interfaces'
import { DeleteModal, Loading } from '../../../shared'
import { icons } from '../../../shared'
import { usePersona } from '../hooks/usePersona'
import { IPersona } from '../interfaces'
import { PersonaForm } from '../forms/PersonaForm'

const colums: Column[] = [
  { key: 'id', label: 'Id' },
  { key: 'apellido', label: 'Apellido y Nombre' },
  { key: 'razon_social', label: 'Razon Social' },
  { key: 'numero_documento', label: 'Documento' },
  { key: 'correo', label: 'Correo' },
  { key: 'tipo_persona', label: 'Tipo Persona' },
  { key: 'acciones', label: 'Acciones' },
]

export const Persona = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<IPersona | null>(null)

  const { 
    personas,
    pagination,
    isLoading,
    filterParams,
    updateFilter,
    deletePersona 
  } = usePersona()

  /* Modal crear/editar */
  const onOpenModal = (persona: IPersona) => {
    setActiveItem(persona)
    setOpenModal(true)
  }

  const onCloseModal = async () => {
    setActiveItem(null)
    setOpenModal(false)
  }

  /* Modal eliminar */
  const openDelteModal = (persona: IPersona) => {
    setActiveItem(persona)
    setOpenDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setActiveItem(null)
    setOpenDeleteModal(false)
  }

  if (isLoading) return <Loading />

  return (
    <React.Fragment>
      <div className='md:flex md:justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de Personas</h1>
        <div className='flex flex-col justify-start'>
          <div className='flex md:justify-end gap-4'>
            <div className='relative'>
              <TextInput
                name='query'
                placeholder='Buscar'
                value={filterParams.query}
                onChange={(e) => updateFilter('query', e.target.value)}
              />
              <icons.Search />
            </div>
            
            <Button 
              type='submit' 
              color="gray"
              onClick={() => setOpenModal(true)}
            >
              Crear
            </Button>
          </div>
        </div>
      </div>

      <Table>
        <Table.Head>
          {
            colums.map((column: Column) => (
              <Table.HeadCell key={column.key} className='text-center bg-gray-300'>{column.label}</Table.HeadCell>
            ))
          }
        </Table.Head>

        <Table.Body className='divide-y'>
          {
            (personas.length > 0)
              ? (personas.map((persona: IPersona) => (
                <Table.Row key={persona.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell className='text-center dark:text-white'>{persona.id}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{persona.apellido|| '-'}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{persona.razon_social|| '-'}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{persona.numero_documento|| '-'}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{persona.email|| '-'}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{persona.tipo_persona}</Table.Cell>
                  <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                    <Tooltip content='Editar'>
                      <Button color='success' onClick={() => onOpenModal(persona)} className='w-8 h-8 flex items-center justify-center'>
                        <icons.Pencil />
                      </Button>
                    </Tooltip>

                    <Tooltip content='Eliminar'>
                      <Button color='failure' onClick={() => openDelteModal(persona)} className='w-8 h-8 flex items-center justify-center'>
                        <icons.Trash />
                      </Button>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
              )))
              : (<tr><td colSpan={colums.length} className='text-center py-4 dark:bg-gray-800'>No se encontraron resultados</td></tr>)
          }
        </Table.Body>
      </Table>

      <div className='flex overflow-x-auto sm:justify-center mt-4'>
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.lastPage}
          onPageChange={(page: number) => updateFilter('page', page)}
          previousLabel='Anterior'
          nextLabel='Siguiente'
          showIcons
        />
      </div>

      {/* Modal crear/editar */} 
      <Modal show={openModal} onClose={onCloseModal} size='5xl'>
        <Modal.Header>{!activeItem ? 'Agregar Persona' : 'Editar Persona'}</Modal.Header>
        <Modal.Body>
          <PersonaForm
            persona={activeItem} 
            onSucces={onCloseModal}
          />
        </Modal.Body>
      </Modal>

      {/* Modal eliminar */} 
      {
        activeItem && 
        <DeleteModal
          item={activeItem.id}
          openModal={openDeleteModal}
          onDelete={(id) => deletePersona.mutateAsync(id)}
          isLoading={deletePersona.isPending}
          onClose={closeDeleteModal}
        />
      }
    </React.Fragment>
  )
}