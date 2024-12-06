import React, { useState } from 'react'
import { Button, Modal, Pagination, Table, TextInput, Tooltip } from 'flowbite-react'
import { Column } from '../../../shared/interfaces'
import { DeleteModal, useLoading } from '../../../shared'
import { icons } from '../../../shared'
import { usePlantilla } from '../hooks/usePlantilla'
import { IPlantilla } from '../interfaces'
import PlantillaForm from '../forms/PlantillaForm'
import { LoadingOverlay } from '../../../layout'
import { carboneActions } from '../../carbone'
import { TableSkeleton } from '../../../shared/components/TableSkeleton'

const colums: Column[] = [
  { key: 'id', label: 'Id' },
  { key: 'denominacion', label: 'Denominación' },
  { key: 'juzgado', label: 'Juzgado' },
  { key: 'tipo_actuacion', label: 'Tipo de Actuacion' },
  { key: 'acciones', label: 'Acciones' },
]

export const Plantilla = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<IPlantilla | null>(null)
  const useAction = useLoading()

  const { 
    plantillas,
    pagination,
    isFetching,
    filterParams,
    updateFilter,
    deletePlantilla 
  } = usePlantilla()

  /* Modal crear */
  const onCloseModal = async () => {
    setActiveItem(null)
    setOpenModal(false)
  }

  /* Modal eliminar */
  const openDelteModal = (plantilla: IPlantilla) => {
    setActiveItem(plantilla)
    setOpenDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setActiveItem(null)
    setOpenDeleteModal(false)
  }

  /* Acciones sobre carbon */
  const dowloadPlantilla = (path: string) => {
    useAction.actionFn(async () => {
      await carboneActions.downloadPlantilla(path)
    })
  }

  const showPlantilla = (path: string) => {
    useAction.actionFn(async () => {
      await carboneActions.showPlantilla(path)
    })
  }

  return (
    <React.Fragment>
      <div className='md:flex md:justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de Plantillas</h1>
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
          {colums.map((column: Column) => (
            <Table.HeadCell key={column.key} className='text-center bg-gray-300'>{column.label}</Table.HeadCell>
          ))}
        </Table.Head>

        <Table.Body className='divide-y'>
          {
            isFetching
              ? <TableSkeleton colums={colums.length} />
              : (plantillas.length > 0)
                ? (plantillas.map((plantilla: IPlantilla) => (
                  <Table.Row key={plantilla.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell className='text-center dark:text-white'>{plantilla.id}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{plantilla.denominacion}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{plantilla.juzgado.nombre}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{plantilla.tipo_actuacion}</Table.Cell>
                    <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                      <Tooltip content='Descargar'>
                        <Button color='warning' onClick={() => dowloadPlantilla(plantilla.path)} className='w-8 h-8 flex items-center justify-center'>
                          <icons.Dowloand />
                        </Button>
                      </Tooltip>

                      <Tooltip content='Ver'>
                        <Button color='blue' onClick={() => showPlantilla(plantilla.path)} className='w-8 h-8 flex items-center justify-center'>
                          <icons.Show />
                        </Button>
                      </Tooltip>

                      <Tooltip content='Eliminar'>
                        <Button color='failure' onClick={() => openDelteModal(plantilla)} className='w-8 h-8 flex items-center justify-center'>
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
      <Modal show={openModal} onClose={onCloseModal} size='4xl'>
        <Modal.Header>{!activeItem ? 'Agregar Plantilla' : 'Editar Plantilla'}</Modal.Header>
        <Modal.Body>
          <PlantillaForm 
            plantilla={activeItem} 
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
          onDelete={(id) => deletePlantilla.mutateAsync(id)}
          isLoading={deletePlantilla.isPending}
          onClose={closeDeleteModal}
        />
      }

      { useAction.loading && <LoadingOverlay /> }
    </React.Fragment>
  )
}
