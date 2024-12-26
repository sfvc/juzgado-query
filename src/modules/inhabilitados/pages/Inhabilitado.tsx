import React, { useState } from 'react'
import { Button, Modal, Pagination, Table, Tooltip } from 'flowbite-react'
import { useInhabilitado } from '../hooks/useInhabilitado'
import { TableSkeleton } from '../../../shared/components/TableSkeleton'
import { clearNames, DeleteModal, icons, InputTable } from '../../../shared'
import InhabilitadoForm from '../forms/InhabilitadoForm'
import { InhabilitadoHistory } from '../components/InhabilitadoHistory'
import { ShowInhabilitado } from '../components/ShowInhabilitado'
import type { Column } from '../../../shared/interfaces'
import type { IInhabilitado } from '../interfaces'

const colums: Column[] = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'documento', label: 'Dni' },
  { key: 'periodo_inhabilitacion', label: 'Periodo de inhabilitación' },
  { key: 'tiempo_tanscurrido', label: 'Tiempo transcurrido' },
  { key: 'estado', label: 'Estado' },
  { key: 'organismo', label: 'Organismo' },
  { key: 'acciones', label: 'Acciones' },
]

export const Inhabilitado = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openShowModal, setOpenShowModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [openHistoryModal, setOpenHistoryModal] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<IInhabilitado | null>(null)

  const { 
    inhabilitados,
    pagination,
    isFetching,
    updateFilter,
    deleteInhabilitado 
  } = useInhabilitado()

  /* Modal crear */
  const onCloseModal = async () => {
    setActiveItem(null)
    setOpenModal(false)
  }

  /* Modal eliminar */
  const onOpenShowModal = (inhabilitado: IInhabilitado) => {
    setActiveItem(inhabilitado)
    setOpenShowModal(true)
  }

  const onCloseShowModal = () => {
    setActiveItem(null)
    setOpenShowModal(false)
  }

  /* Modal eliminar */
  const onOpenDeleteModal = (inhabilitado: IInhabilitado) => {
    setActiveItem(inhabilitado)
    setOpenDeleteModal(true)
  }

  const onCloseDeleteModal = () => {
    setActiveItem(null)
    setOpenDeleteModal(false)
  }

  /* Modal historial */
  const onOpenHistoryModal = (inhabilitado: IInhabilitado) => {
    setActiveItem(inhabilitado)
    setOpenHistoryModal(true)
  }

  const onCloseHistoryModal = () => {
    setActiveItem(null)
    setOpenHistoryModal(false)
  }

  return (
    <React.Fragment>
      <div className='md:flex md:justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de Inhabilitados</h1>
        <div className='flex flex-col justify-start'>
          <div className='flex md:justify-end gap-4'>
            <InputTable onSearch={(value: string) => updateFilter('query', value)} />            
            
            <Button type='button' onClick={() => setOpenModal(true)} >Agregar</Button>
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
                ? <TableSkeleton colums={colums.length}/>
                : (inhabilitados.length > 0)
                  ? (inhabilitados.map((inhabilitado: IInhabilitado) => (
                    <Table.Row key={inhabilitado.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell className='text-center dark:text-white'>{clearNames(inhabilitado?.persona?.apellido, inhabilitado?.persona?.nombre)}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{inhabilitado?.persona?.numero_documento}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{inhabilitado?.periodo_inhabilitacion_dias} Días</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>
                        {
                          inhabilitado?.tiempo_transcurrido_dias 
                            ? `${inhabilitado?.tiempo_transcurrido_dias} Días` 
                            : '-'
                        }
                      </Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>
                        <span 
                          className={`max-w-40 truncate px-2 py-1 border-none rounded-lg inline-block text-white  
                          ${ inhabilitado.tiempo_transcurrido_dias ? 'bg-green-500' : 'bg-red-500' }
                        `}
                        >
                          {inhabilitado.tiempo_transcurrido_dias ? 'HABILITADO' : 'INHABILITADO'}
                        </span>
                      </Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{inhabilitado?.juzgado?.nombre}</Table.Cell>

                      <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                        <Tooltip content='Ver más'>
                          <Button onClick={() => onOpenShowModal(inhabilitado)} className='w-8 h-8 flex items-center justify-center'>
                            <icons.Show  />
                          </Button>
                        </Tooltip>
                        
                        <Tooltip content='Historial'>
                          <Button color='purple' onClick={() => onOpenHistoryModal(inhabilitado)} className='w-8 h-8 flex items-center justify-center'>
                            <icons.History />
                          </Button>
                        </Tooltip>
                      
                        <Tooltip content='Eliminar'>
                          <Button color='failure' onClick={() => onOpenDeleteModal(inhabilitado)} className='w-8 h-8 flex items-center justify-center'>
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

      {/* Modal crear */} 
      <Modal show={openModal} onClose={onCloseModal} size='5xl'>
        <Modal.Header>Agregar Inhabilitado</Modal.Header>
        <Modal.Body>
          <InhabilitadoForm onSucces={onCloseModal} />
        </Modal.Body>
      </Modal>

      {/* Modal ver más */} 
      <Modal show={openShowModal} onClose={onCloseShowModal} size='5xl'>
        <Modal.Header>Datos de inhabilitación</Modal.Header>
        <Modal.Body>
          <ShowInhabilitado inhabilitado={activeItem!} closeModal={onCloseShowModal} />
        </Modal.Body>
      </Modal>

      {/* Modal eliminar */} 
      {
        activeItem && 
        <DeleteModal
          item={activeItem.id}
          openModal={openDeleteModal}
          onDelete={(id) => deleteInhabilitado.mutateAsync(id)}
          isLoading={deleteInhabilitado.isPending}
          onClose={onCloseDeleteModal}
        />
      }

      {/* Modal de historial */} 
      <Modal show={openHistoryModal} onClose={onCloseHistoryModal} size='5xl'>
        <Modal.Header>Agregar Inhabilitado</Modal.Header>
        <Modal.Body>
          <InhabilitadoHistory 
            dni={activeItem?.persona?.numero_documento} 
            isOpen={openHistoryModal} 
            closeModal={onCloseHistoryModal}
          />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}
