import React, { useState } from 'react'
import { Button, Modal, Pagination, Select, Table, TextInput, Tooltip } from 'flowbite-react'
import { DeleteModal, Loading, icons } from '../../../../shared'
import { useArticulo } from '../hooks/useArticulo'
import { IArticulo } from '../interfaces'
import ArticuloForm from '../forms/ArticuloForm'
import { useQuery } from '@tanstack/react-query'
import { articuloActions } from '..'

interface Column {
  key: string
  label: string
}

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
  const [openModal, setOpenModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [activeItem, setActiveItem] = useState<IArticulo | null>(null)
  // const [selectedItem, setSelectedItem] = useState<number | null>(null)

  const { data: tipoActas } = useQuery({
    queryKey: ['tipo-actas'], 
    queryFn: articuloActions.getAllTipoActas,  
    staleTime: 1000 * 60 * 5, 
  })

  const { 
    articulos,
    pagination,
    isLoading,
    filterKey,
    setFilterKey,
    type,
    setType,
    handlePageChange,
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterKey(e.target.value)
    handlePageChange(1)
  }

  if (isLoading) return <Loading />

  return (
    <React.Fragment>
      <div className='md:flex md:justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de Articulos</h1>
        <div className='flex flex-col justify-start'>
          <div className='flex md:justify-end gap-4'>
            <Select onChange={(e) => setType(e.target.value)} value={type}>
              <option value='' hidden>Seleccionar tipo</option>
              <option value=''>TODAS</option>
              {
                tipoActas?.map((tipoActa: string) => (
                  <option key={tipoActa} value={tipoActa}>{tipoActa}</option>
                ))
              }
            </Select>
            <div className='relative'>
              <TextInput
                name='search'
                placeholder='Buscar'
                value={filterKey}
                onChange={handleSearch}
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
            (articulos.length > 0)
              ? (articulos.map((articulo: IArticulo) => (
                <Table.Row key={articulo.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell className='text-center dark:text-white'>{articulo.numero}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{articulo.inciso}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{articulo.detalle}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{articulo.tipo_acta}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{articulo.tipo_infraccion}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>$ {articulo.valor_desde}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>$ {articulo.valor_hasta}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{articulo.norma_legal}</Table.Cell>
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

      <div className='flex overflow-x-auto sm:justify-center mt-4'>
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.lastPage}
          onPageChange={handlePageChange}
          previousLabel='Anterior'
          nextLabel='Siguiente'
          showIcons
        />
      </div>

      {/* Modal crear/editar */} 
      <Modal show={openModal} onClose={onCloseModal}>
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
