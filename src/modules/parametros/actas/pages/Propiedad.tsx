import React, { useState } from 'react'
import { Button, Modal, Pagination, Table, TextInput, Tooltip } from 'flowbite-react'
import { DeleteModal, Loading, icons } from '../../../../shared'
import { usePropiedad } from '../hooks/usePropiedad'
import { IPropiedad } from '../interfaces'
import PropiedadForm from '../forms/PropiedadForm'

interface Column {
  key: string
  label: string
}

const colums: Column[] = [
  { key: 'id', label: 'Id' },
  { key: 'matricula_catastral', label: 'Matricula' },
  { key: 'domicilio', label: 'domicilio' },
  { key: 'propietario', label: 'Propietario' },
  { key: 'acciones', label: 'Acciones' },
]

export const Propiedad = () => {
  const [openModal, setOpenModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [activeItem, setActiveItem] = useState<IPropiedad | null>(null)

  const { 
    propiedades,
    pagination,
    isLoading,
    filterParams,
    updateFilter,
    deletePropiedad 
  } = usePropiedad()

  /* Modal crear/editar */
  const onOpenModal = (propiedad: IPropiedad) => {
    setActiveItem(propiedad)
    setOpenModal(true)
  }

  const onCloseModal = async () => {
    setActiveItem(null)
    setOpenModal(false)
  }

  /* Modal eliminar */
  const openDelteModal = (propiedad: IPropiedad) => {
    setActiveItem(propiedad)
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
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de Propiedades</h1>
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
            (propiedades.length > 0)
              ? (propiedades.map((propiedad: IPropiedad) => (
                <Table.Row key={propiedad.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell className='text-center dark:text-white'>{propiedad.id}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{propiedad.matricula_catastral}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{propiedad.domicilio}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{propiedad.propietario}</Table.Cell>
                  <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                    <Tooltip content='Editar'>
                      <Button color='success' onClick={() => onOpenModal(propiedad)} className='w-8 h-8 flex items-center justify-center'>
                        <icons.Pencil />
                      </Button>
                    </Tooltip>

                    <Tooltip content='Eliminar'>
                      <Button color='failure' onClick={() => openDelteModal(propiedad)} className='w-8 h-8 flex items-center justify-center'>
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
      <Modal show={openModal} onClose={onCloseModal}>
        <Modal.Header>{!activeItem ? 'Agregar Propiedad' : 'Editar Propiedad'}</Modal.Header>
        <Modal.Body>
          <PropiedadForm
            propiedad={activeItem} 
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
          onDelete={(id) => deletePropiedad.mutateAsync(id)}
          isLoading={deletePropiedad.isPending}
          onClose={closeDeleteModal}
        />
      }
    </React.Fragment>
  )
}
