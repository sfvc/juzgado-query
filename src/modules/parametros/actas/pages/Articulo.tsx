import React, { useState } from 'react'
import { Button, Modal, Pagination, Select, Table, Tooltip } from 'flowbite-react'
import { DeleteModal, icons, InputTable } from '../../../../shared'
import { useArticulo } from '../hooks/useArticulo'
import ArticuloForm from '../forms/ArticuloForm'
import { TableSkeleton } from '../../../../shared/components/TableSkeleton'
import { TIPO_ACTAS } from '../../../../shared/constants'
import type { Column } from '../../../../shared/interfaces'
import type { IArticulo } from '../interfaces'

const colums: Column[] = [
  { key: 'articulo', label: 'Articulo' },
  { key: 'inciso', label: 'Inciso' },
  { key: 'detalle', label: 'Detalle' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'tipo_falta', label: 'Tipo Falta' },
  { key: 'valor_desde', label: 'Valor Desde' },
  { key: 'valor_hasta', label: 'Valor Hasta' },
  { key: 'norma_legal', label: 'Norma Legal' },
  { key: 'descuento', label: 'Recibe Decuento?' },
  { key: 'codigo', label: 'Codigo' },
  { key: 'acciones', label: 'Acciones' },
]

export const Articulo = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<IArticulo | null>(null)

  const { 
    articulos,
    pagination,
    isFetching,
    filterParams,
    updateFilter,
    deleteArticulo 
  } = useArticulo()

  /* Modal crear/editar */
  const onOpenModal = (articulo: IArticulo) => {
    setActiveItem(articulo)
    setOpenModal(true)
  }

  const onCloseModal = async () => {
    setActiveItem(null)
    setOpenModal(false)
  }

  /* Modal eliminar */
  const openDelteModal = (articulo: IArticulo) => {
    setActiveItem(articulo)
    setOpenDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setActiveItem(null)
    setOpenDeleteModal(false)
  }

  return (
    <React.Fragment>
      <div className='md:flex md:justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de Articulos</h1>
        <div className='flex flex-col justify-start'>
          <div className='flex md:justify-end gap-4'>
            <Select onChange={(e) => updateFilter('filter', e.target.value)} value={filterParams.filter}>
              <option value='' hidden>Seleccionar tipo</option>
              <option value=''>TODAS</option>
              {TIPO_ACTAS?.map((tipoActa: string) => (
                <option key={tipoActa} value={tipoActa}>{tipoActa}</option>
              ))}
            </Select>

            <InputTable onSearch={(value: string) => updateFilter('search', value)} />

            <Button type='button' color="gray" onClick={() => setOpenModal(true)} >Agregar</Button>
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
                : (articulos.length > 0)
                  ? (articulos.map((articulo: IArticulo) => (
                    <Table.Row key={articulo.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell className='text-center dark:text-white'>{articulo.numero}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{articulo?.inciso || '-'}</Table.Cell>
                      <Tooltip content={articulo.detalle || 'Sin datos'} className='max-w-lg'>
                        <Table.Cell className='text-center dark:text-white max-w-40 truncate'>{articulo.detalle}</Table.Cell>
                      </Tooltip>
                      <Table.Cell className='text-center dark:text-white'>{articulo.tipo_acta}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{articulo.tipo_infraccion}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>$ {articulo.valor_desde}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>$ {articulo.valor_hasta}</Table.Cell>
                      <Tooltip content={articulo?.norma_legal || 'Sin datos'} className='max-w-lg'>
                        <Table.Cell className='text-center dark:text-white max-w-40 truncate'>{articulo?.norma_legal || '-'}</Table.Cell>
                      </Tooltip>
                      <Table.Cell className='text-center dark:text-white'>{ articulo.descuento ? 'Si' : 'No' }</Table.Cell>
                      <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white text-center'>{articulo.id}</Table.Cell>
                      <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                        <Tooltip content='Editar'>
                          <Button color='success' onClick={() => onOpenModal(articulo)} className='w-8 h-8 flex items-center justify-center'>
                            <icons.Pencil />
                          </Button>
                        </Tooltip>

                        <Tooltip content='Eliminar'>
                          <Button color='failure' onClick={() => openDelteModal(articulo)} className='w-8 h-8 flex items-center justify-center'>
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

      {/* Modal crear/editar */} 
      <Modal show={openModal} onClose={onCloseModal} size='4xl'>
        <Modal.Header>{!activeItem ? 'Agregar Articulo' : 'Editar Articulo'}</Modal.Header>
        <Modal.Body>
          <ArticuloForm 
            articulo={activeItem} 
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
          onDelete={(id) => deleteArticulo.mutateAsync(id)}
          isLoading={deleteArticulo.isPending}
          onClose={closeDeleteModal}
        />
      }
    </React.Fragment>
  )
}
