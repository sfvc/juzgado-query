import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Modal, Table, Tooltip } from 'flowbite-react'
import { icons, SearchInput } from '../../../shared'
import { Column } from '../../../shared/interfaces'
import { articuloActions } from '../../parametros/actas'
import { UnidadForm } from '../forms/UnidadForm'
import { TotalForm } from '../forms/TotalForm'
import type { IArticulo } from '../../parametros/actas/interfaces'
import type { InfraccionesCometida } from '../interfaces'
import type { IUnidadMulta } from '../interfaces/sentencia'

const colums: Column[] = [
  { key: 'numero', label: 'Nro. Acta' },
  { key: 'detalle', label: 'Detalle' },
  { key: 'articulo', label: 'Articulo' },
  { key: 'importe', label: 'importe' },
  { key: 'acciones', label: 'Acciones' }
]

export const Sentencia = () => {
  const { state: { acta, plantillaId } } = useLocation()
  const [openModal, setOpenModal] = useState({ create: false, delete: false })
  const [activeItem, setActiveItem] = useState<InfraccionesCometida | null>(null)

  const [infracciones, setInfracciones] = useState<InfraccionesCometida[]>(() => {
    if (acta?.infracciones_cometidas) {
      return acta.infracciones_cometidas.map((infraccion: InfraccionesCometida) => ({
        ...infraccion,
        importe: infraccion.valor_desde * +acta.unidadMulta,
        unidad: infraccion.valor_desde
      }))
    } else return []
  })

  // Buscardor de Articulos
  const searchArticulo = async (query: string) => articuloActions.getArticulosByFilter(query)
  const selectArticulo = (articulo: InfraccionesCometida) => {
    const existeItem = infracciones.find((infraccion) => infraccion.id === articulo.id)
    if (existeItem) return

    setInfracciones([
      ...infracciones,
      {
        ...articulo,
        importe: articulo.valor_desde * +acta.unidadMulta,
        unidad: articulo.valor_desde
      }
    ])
  }

  const editUnidad = (id: number) => {
    const infraccion = infracciones.find((inf: InfraccionesCometida) => inf.id === id)
    if(!infraccion) return

    setActiveItem(infraccion)
    onOpenModal('create', infraccion)
  }

  const handleDelete = () => {
    if(!activeItem) return 
    const updateInfracciones = infracciones.filter((inf: InfraccionesCometida) => inf.id !== activeItem.id)
    setInfracciones(updateInfracciones)
    onCloseModal('delete')
  }

  const updateImporte = (data: IUnidadMulta) => {
    setInfracciones((prev) => {
      const infracciones = prev.map((inf: InfraccionesCometida) => {
        if (inf.id === activeItem?.id) {
          return {
            ...inf,
            unidad: data.unidad,
            importe: data.unidad * +acta.unidadMulta
          }
        }
        return inf
      })

      return infracciones
    })
  }

  const onCloseModal = (action: string) => {
    setOpenModal((prev) => { return {...prev, [action]: false} })
    setActiveItem(null)
  }

  const onOpenModal = (action: string, item: InfraccionesCometida) => {
    setOpenModal((prev) => { return {...prev, [action]: true} })
    setActiveItem(item)
  }
  
  return (
    <React.Fragment>
      <div className='titulos rounded-md py-2 text-center mb-6'>
        <h3 className='text-xl font-semibold text-white'>Agregar Resolución</h3>
      </div>

      <div className='grid md:grid-cols-2 gap-4 grid-cols-1 mt-2 mb-4 '>
        {/* Resultados de busqueda de articulos */}
        <SearchInput<IArticulo>
          label="Articulo"
          placeholder="Buscar articulo"
          onSearch={searchArticulo}
          onSelect={selectArticulo}
          renderItem={(item) => (
            <div><strong>{item.numero}</strong> - {item?.detalle || 'SIN DETALLE'}</div>
          )}
          renderInput={(item) => { return `${item.numero} - ${item?.detalle || 'SIN DETALLE'}`} }
        />
      </div>

      <div className='overflow-x-auto'>
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
              infracciones.length
                ? infracciones.map((infraccion: InfraccionesCometida) => (
                  <Table.Row key={infraccion.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell className='text-center dark:text-white'>{acta.numero_acta || '-'}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>
                      <div className='truncate w-[40rem]'>
                        {infraccion.detalle}
                      </div>
                    </Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{infraccion.numero}</Table.Cell>
                    <Table.Cell className='text-center  dark:text-white'>$ {infraccion.importe}</Table.Cell>
                    <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                      <Tooltip content='Editar'>
                        <Button 
                          color='success' 
                          className='w-8 h-8 flex items-center justify-center'
                          onClick={() => editUnidad(infraccion.id)}
                        >
                          <icons.Pencil />
                        </Button>
                      </Tooltip>

                      <Tooltip content='Eliminar'>
                        <Button color='failure' className='w-8 h-8 flex items-center justify-center'
                          onClick={() => onOpenModal('delete', infraccion)}
                        >
                          <icons.Trash />
                        </Button>
                      </Tooltip>
                    </Table.Cell>
                  </Table.Row>
                ))
                : <tr><td colSpan={colums.length} className='text-center py-4 dark:bg-gray-800'>No se encontraron resultados</td></tr>
            }
          </Table.Body>
        </Table>
      </div>

      {/* Sección de importe total */}
      <TotalForm infracciones={infracciones} plantillaId={plantillaId} />

      {/* Modal para editar unidad tributaria de articulo */}
      <Modal show={openModal.create} onClose={() => onCloseModal('create')}>
        <Modal.Header>Editar importe</Modal.Header>
        <Modal.Body>
          <UnidadForm 
            activeItem={activeItem}
            onCloseModal= {() => onCloseModal('create')}
            updateImporte={updateImporte}
          />
        </Modal.Body>
      </Modal>

      {/* Modal para eliminar articulo de listado */}
      { activeItem && 
        <Modal show={openModal.delete} onClose={() => onCloseModal('delete')}>
          <Modal.Header>Eliminar articulo</Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <icons.Warning />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                ¿Estás seguro de que deseas eliminar el articulos del listado?
              </h3>
          
              <div className="flex justify-center gap-4">
                <Button color="gray" onClick={() => onCloseModal('delete')}>Cancelar</Button>
                <Button 
                  color="failure" 
                  onClick={handleDelete}
                >
                  Sí, eliminar
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      }
    </React.Fragment>
  )
}
