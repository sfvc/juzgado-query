import React, { useState } from 'react'
import { Button, Modal, Pagination, Table, TextInput, Tooltip } from 'flowbite-react'
import type { IPais } from '../interfaces/localizacion'
import { usePaises } from '../index'
import PaisForm from '../forms/PaisForm'
import { DeleteModal, Loading, icons } from '../../../../shared'
import { Column } from '../../../../shared/interfaces'

const colums: Column[] = [
  { key: 'id', label: 'Id' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'acciones', label: 'Acciones' }
]

export const Pais = () => {
  const [openModal, setOpenModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [activeItem, setActiveItem] = useState<IPais | null>(null)

  const { paises, pagination, isLoading, filterParams, updateFilter, deletePais } = usePaises()

  /* Modal crear/editar */
  const onOpenModal = (pais: IPais) => {
    setActiveItem(pais)
    setOpenModal(true)
  }

  const onCloseModal = async () => {
    setActiveItem(null)
    setOpenModal(false)
  }

  /* Modal eliminar */
  const openDelteModal = (pais: IPais) => {
    setActiveItem(pais)
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
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de Países</h1>
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
            (paises.length > 0)
              ? (paises.map((pais: IPais) => (
                <Table.Row key={pais.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white text-center'>{pais.id}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{pais.nombre}</Table.Cell>
                  <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                    <Tooltip content='Editar'>
                      <Button color='success' onClick={() => onOpenModal(pais)} className='w-8 h-8 flex items-center justify-center'>
                        <icons.Pencil />
                      </Button>
                    </Tooltip>

                    <Tooltip content='Eliminar'>
                      <Button color='failure' onClick={() => openDelteModal(pais)} className='w-8 h-8 flex items-center justify-center'>
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
        <Modal.Header>{!activeItem ? 'Agregar Pais' : 'Editar Pais'}</Modal.Header>
        <Modal.Body>
          <PaisForm 
            pais={activeItem} 
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
          onDelete={(id) => deletePais.mutateAsync(id)}
          isLoading={deletePais.isPending}
          onClose={closeDeleteModal}
        />
      }
    </React.Fragment>
  )
}
