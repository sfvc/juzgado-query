import React, { useState } from 'react'
import { Button, Modal, Pagination, Table, Tooltip } from 'flowbite-react'
import { DeleteModal, InputTable, useLoading } from '../../../shared'
import { LoadingOverlay } from '../../../layout'
import { TableSkeleton } from '../../../shared/components/TableSkeleton'
import { RoleGuard, UserRole } from '../../../auth'
import { useModals } from '../../../shared/hooks/useModals'
import { icons } from '../../../shared'
import type { Column } from '../../../shared/interfaces'
import type { ILibreDeuda } from '../interfaces'
import { useLibreDeuda } from '../hooks/useLibreDeuda'
import { ConfirmLibreDeuda } from '../components/ConfirmLibreDeuda'
import { libreDeudaActions } from '..'

const colums: Column[] = [
  { key: 'id', label: 'Id' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'apellido', label: 'Apellido' },
  { key: 'dominio', label: 'Patente' },
  { key: 'estado', label: 'Estado' },
  { key: 'acciones', label: 'Acciones' },
]

export const LibreDeuda = () => {
  const { isOpen, openModal, closeModal } = useModals()
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<ILibreDeuda | null>(null)
  const useAction = useLoading()

  const {
    libreDeuda,
    pagination,
    isFetching,
    updateFilter,
    deleteLibreDeuda,
  } = useLibreDeuda()

  const onEditModal = (libreDeuda: ILibreDeuda) => {
    setActiveItem(libreDeuda)
    openModal('confirm')
  }

  const openDelteModal = (libreDeuda: ILibreDeuda) => {
    setActiveItem(libreDeuda)
    setOpenDeleteModal(true)
  }

  const closeConfirmModal = () => {
    setActiveItem(null)
    closeModal('confirm')
  }

  const closeDeleteModal = () => {
    setActiveItem(null)
    setOpenDeleteModal(false)
  }

  const confirmLibreDeuda = (id: number) => {
    useAction.actionFn(async () => {
      await libreDeudaActions.confirmLibreDeuda(id)
    })
  }

  return (
    <React.Fragment>
      <div className='md:flex md:justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de libre Deuda</h1>
        <div className='flex flex-col justify-start'>
          <div className='flex md:justify-end gap-4'>
            <InputTable onSearch={(value: string) => updateFilter('query', value)} />
          </div>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <Table>
          <Table.Head>
            {colums.map((column: Column) => (
              <Table.HeadCell key={column.key} className='text-center bg-gray-300'>{column.label}</Table.HeadCell>
            ))}
          </Table.Head>

          <Table.Body className='divide-y'>
            {
              isFetching
                ? <TableSkeleton colums={colums.length} />
                : (libreDeuda.length > 0)
                  ? (libreDeuda.map((libreDeuda: ILibreDeuda) => (
                    <Table.Row key={libreDeuda.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell className='text-center dark:text-white'>{libreDeuda.id}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{libreDeuda.nombre}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{libreDeuda.apellido}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{libreDeuda.dominio}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>
                        <span
                          className={`max-w-40 truncate px-2 py-1 border-none rounded-lg inline-block text-white
                                                ${libreDeuda.titular ? 'bg-green-500' : 'bg-red-500'}
                                              `}
                        >
                          {libreDeuda.titular ? 'CHEQUEADO' : 'INCHEQUEADO'}
                        </span>
                      </Table.Cell>
                      <Table.Cell className='flex gap-2 text-center items-center justify-center'>

                        <Tooltip content='Ver'>
                          <Button color='blue' onClick={() => onEditModal(libreDeuda)} className='w-8 h-8 flex items-center justify-center'>
                            <icons.Show />
                          </Button>
                        </Tooltip>

                        <Tooltip content='Confirmar'>
                          <Button color='success' onClick={() => confirmLibreDeuda(libreDeuda.id)} className='w-8 h-8 flex items-center justify-center'>
                            <icons.Check />
                          </Button>
                        </Tooltip>

                        <RoleGuard roles={[UserRole.ADMIN]}>
                          <Tooltip content='Eliminar'>
                            <Button color='failure' onClick={() => openDelteModal(libreDeuda)} className='w-8 h-8 flex items-center justify-center'>
                              <icons.Trash />
                            </Button>
                          </Tooltip>
                        </RoleGuard>
                      </Table.Cell>
                    </Table.Row>
                  )))
                  : (<tr><td colSpan={colums.length} className='text-center py-4 dark:bg-gray-800'>No se encontraron resultados</td></tr>)
            }
          </Table.Body>
        </Table>
      </div>

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

      <Modal show={isOpen.edit} onClose={() => closeModal('edit')} size='4xl'>
        <Modal.Header>Editar libre deuda</Modal.Header>
        <Modal.Body>
          <ConfirmLibreDeuda
            libreDeuda={activeItem}
            onCloseModal={closeConfirmModal}
          />
        </Modal.Body>
      </Modal>

      {
        activeItem &&
        <DeleteModal
          item={activeItem.id}
          openModal={openDeleteModal}
          onDelete={(id) => deleteLibreDeuda.mutateAsync(id)}
          isLoading={deleteLibreDeuda.isPending}
          onClose={closeDeleteModal}
        />
      }

      {useAction.loading && <LoadingOverlay />}
    </React.Fragment>
  )
}
