import React, { useState } from 'react'
import { Button, Modal, Pagination, Table, Tooltip } from 'flowbite-react'
import { ToastContainer } from 'react-toastify'
import { TableSkeleton } from '../../../shared/components/TableSkeleton'
import { clearNames, icons, InputTable } from '../../../shared'
import { useModals } from '../../../shared/hooks/useModals'
import type { Column } from '../../../shared/interfaces'
import { useDescargo } from '../hooks/useDescargo'
import { IDescargo } from '../interfaces'
import { ShowDescargo } from '../components/ShowDescargo'

const colums: Column[] = [
  { key: 'id', label: 'ID Descargo' },
  { key: 'nombre', label: 'Apellido y Nombre' },
  { key: 'dni', label: 'DNI' },
  { key: 'dominio', label: 'Patente' },
  { key: 'fecha', label: 'Fecha' },
  { key: 'verificado', label: 'Estado' },
  { key: 'acciones', label: 'Acciones' },
]

export const Descargo = () => {
  const {
    isOpen,
    openModal,
    closeModal
  } = useModals()
  const [activeItem, setActiveItem] = useState<IDescargo | null>(null)

  const {
    descargo,
    pagination,
    isFetching,
    updateFilter,
    confirmDescargo,
    rechazarDescargo
  } = useDescargo()

  const onOpenShowModal = (descargo: IDescargo) => {
    setActiveItem(descargo)
    openModal('show')
  }

  const onCloseShowModal = () => {
    setActiveItem(null)
    closeModal('show')
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires',
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return dateString
    }
  }

  return (
    <React.Fragment>
      <div className='md:flex md:justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de Descargo</h1>
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
                : (descargo.length > 0)
                  ? (descargo.map((descargo: IDescargo) => (
                    <Table.Row key={descargo.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell className='text-center dark:text-white'>{descargo?.numero_libre_deuda || '-'}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{clearNames(descargo?.persona_apellido, descargo?.persona_nombre) || '-'}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>
                        {descargo?.persona_numero_documento || '-'}
                      </Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{descargo?.vehiculo_dominio || '-'}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{formatDate(descargo?.fecha || '-')}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>
                        <span
                          className={`max-w-40 truncate px-2 py-1 border-none rounded-lg inline-block text-white
                          ${descargo.verificado ? 'bg-green-500' : 'bg-red-500'}
                        `}
                        >
                          {descargo.verificado ? 'VALIDADO' : 'SIN VALIDAR'}
                        </span>
                      </Table.Cell>
                      <Table.Cell className='flex gap-2 text-center items-center justify-center'>

                        {descargo.vehiculo_dominio && (
                          <Tooltip content='Ver Documentación'>
                            <Button onClick={() => onOpenShowModal(descargo)} className='w-8 h-8 flex items-center justify-center'>
                              <icons.Show />
                            </Button>
                          </Tooltip>
                        )}

                        <Tooltip content='Ver Descargo'>
                          <Button
                            onClick={() => descargo.path_file && window.open(descargo.path_file, '_blank')}
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
          <Modal.Header>Verificación de Descargo</Modal.Header>
          <Modal.Body>
            <ShowDescargo
              descargo={activeItem}
              closeModal={onCloseShowModal}
              onConfirm={() =>
                confirmDescargo.mutateAsync({
                  libre_deuda_id: activeItem.id,
                  persona_id: activeItem.persona_id!,
                  id: activeItem.id,
                  cuit: activeItem.cuit!,
                  fuente: activeItem.fuente!,
                  vehiculo_id: activeItem.vehiculo_id!
                })
              }
              onReject={() =>
                rechazarDescargo.mutateAsync({
                  libre_deuda_id: activeItem.id,
                  persona_id: activeItem.persona_id!,
                  id: activeItem.id,
                  cuit: activeItem.cuit!,
                  fuente: activeItem.fuente!,
                  vehiculo_id: activeItem.vehiculo_id!
                })
              }
            />
          </Modal.Body>
        </Modal>
      )}

      <ToastContainer containerId="custom" className="custom-toast-container" />
    </React.Fragment>
  )
}
