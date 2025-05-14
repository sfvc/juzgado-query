import React, { useState } from 'react'
import { Button, Modal, Pagination, Table, Tooltip } from 'flowbite-react'
import { ToastContainer } from 'react-toastify'
import { TableSkeleton } from '../../../shared/components/TableSkeleton'
import { clearNames, icons, InputTable } from '../../../shared'
import { useModals } from '../../../shared/hooks/useModals'
import type { Column } from '../../../shared/interfaces'
import { useLibreDeuda } from '../hooks/useLibreDeuda'
import { ILibreDeuda } from '../interfaces'
import { ShowLibreDeuda } from '../components/ShowLibreDeuda'

const colums: Column[] = [
  { key: 'id', label: 'ID libre deuda' },
  { key: 'nombre', label: 'Apellido y Nombre' },
  { key: 'dni', label: 'DNI' },
  { key: 'dominio', label: 'Patente' },
  { key: 'fecha', label: 'Fecha' },
  { key: 'verificado', label: 'Estado' },
  { key: 'acciones', label: 'Acciones' },
]

export const LibreDeuda = () => {
  const {
    isOpen,
    openModal,
    closeModal
  } = useModals()
  const [activeItem, setActiveItem] = useState<ILibreDeuda | null>(null)

  const {
    libreDeuda,
    pagination,
    isFetching,
    updateFilter,
    confirmLibreDeuda
  } = useLibreDeuda()

  const onOpenShowModal = (libreDeuda: ILibreDeuda) => {
    setActiveItem(libreDeuda)
    openModal('show')
  }

  const onCloseShowModal = () => {
    setActiveItem(null)
    closeModal('show')
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)

    const padZero = (num: number) => String(num).padStart(2, '0')

    const day = padZero(date.getDate())
    const month = padZero(date.getMonth() + 1)
    const year = date.getFullYear()
    const hours = padZero(date.getHours())
    const minutes = padZero(date.getMinutes())

    return `${day}/${month}/${year}, ${hours}:${minutes}`
  }

  return (
    <React.Fragment>
      <div className='md:flex md:justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de Libre Deuda</h1>
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
                      <Table.Cell className='text-center dark:text-white'>{libreDeuda?.numero_libre_deuda || '-'}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{clearNames(libreDeuda?.persona_apellido, libreDeuda?.persona_nombre) || '-'}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{libreDeuda?.persona_numero_documento || '-'}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{libreDeuda?.vehiculo_dominio || '-'}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{formatDate(libreDeuda?.fecha || '-')}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>
                        <span
                          className={`max-w-40 truncate px-2 py-1 border-none rounded-lg inline-block text-white
                          ${libreDeuda.verificado ? 'bg-green-500' : 'bg-red-500'}
                        `}
                        >
                          {libreDeuda.verificado ? 'CHEQUEADO' : 'INCHEQUEADO'}
                        </span>
                      </Table.Cell>
                      <Table.Cell className='flex gap-2 text-center items-center justify-center'>

                        {libreDeuda.vehiculo_dominio && (
                          <Tooltip content='Ver Documentación'>
                            <Button onClick={() => onOpenShowModal(libreDeuda)} className='w-8 h-8 flex items-center justify-center'>
                              <icons.Show />
                            </Button>
                          </Tooltip>
                        )}

                        <Tooltip content='Ver Libre Deuda'>
                          <Button
                            onClick={() => libreDeuda.path_file && window.open(libreDeuda.path_file, '_blank')}
                            className='w-8 h-8 flex items-center justify-center'
                            color='warning'
                          >
                            <icons.World />
                          </Button>
                        </Tooltip>

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

      {activeItem && (
        <Modal show={isOpen.show} onClose={onCloseShowModal} size='5xl'>
          <Modal.Header>Verificación de Libre Deuda</Modal.Header>
          <Modal.Body>
            <ShowLibreDeuda
              libreDeuda={activeItem}
              closeModal={onCloseShowModal}
              onConfirm={() => confirmLibreDeuda.mutateAsync({
                libre_deuda_id: activeItem.id,
                persona_id: activeItem.persona_id,
                vehiculo_id: activeItem.vehiculo_id
              })}
            />
          </Modal.Body>
        </Modal>
      )}

      <ToastContainer containerId="custom" className="custom-toast-container" />
    </React.Fragment>
  )
}
