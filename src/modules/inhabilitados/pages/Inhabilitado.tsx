import React, { useState } from 'react'
import { Button, Modal, Pagination, Table, Tooltip } from 'flowbite-react'
import { ToastContainer } from 'react-toastify'
import { useInhabilitado } from '../hooks/useInhabilitado'
import { TableSkeleton } from '../../../shared/components/TableSkeleton'
import { clearNames, DeleteModal, icons, InputTable } from '../../../shared'
import InhabilitadoForm from '../forms/InhabilitadoForm'
import { InhabilitadoHistory } from '../components/InhabilitadoHistory'
import { ShowInhabilitado } from '../components/ShowInhabilitado'
import { RoleGuard, UserRole } from '../../../auth'
import { useModals } from '../../../shared/hooks/useModals'
import type { Column } from '../../../shared/interfaces'
import type { IInhabilitado } from '../interfaces'

const colums: Column[] = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'documento', label: 'Dni' },
  { key: 'numero_acta', label: 'Número de Acta' },
  { key: 'retencion_licencia', label: '¿Se retuvo licencia?' },
  { key: 'fecha_desde', label: 'Fecha de Inhabilitación' },
  { key: 'periodo_inhabilitacion', label: 'Periodo de inhabilitación' },
  { key: 'tiempo_tanscurrido', label: 'Tiempo transcurrido' },
  { key: 'estado', label: 'Estado' },
  { key: 'organismo', label: 'Organismo' },
  { key: 'acciones', label: 'Acciones' },
]

export const Inhabilitado = () => {
  const {
    isOpen,
    openModal,
    closeModal
  } = useModals()
  const [activeItem, setActiveItem] = useState<IInhabilitado | null>(null)

  const {
    inhabilitados,
    pagination,
    isFetching,
    updateFilter,
    deleteInhabilitado,
    personaNoInhabilitada
  } = useInhabilitado()

  /* Modal crear/editar */
  const onOpenModal = (inhabilitado: IInhabilitado | null) => {
    setActiveItem(inhabilitado)
    openModal('create')
  }

  const onCloseModal = () => {
    setActiveItem(null)
    closeModal('create')
  }

  /* Modal ver */
  const onOpenShowModal = (inhabilitado: IInhabilitado) => {
    setActiveItem(inhabilitado)
    openModal('show')
  }

  const onCloseShowModal = () => {
    setActiveItem(null)
    closeModal('show')
  }

  /* Modal eliminar */
  const onOpenDeleteModal = (inhabilitado: IInhabilitado) => {
    setActiveItem(inhabilitado)
    openModal('delete')
  }

  const onCloseDeleteModal = () => {
    setActiveItem(null)
    closeModal('delete')
  }

  /* Modal historial */
  const onOpenHistoryModal = (inhabilitado: IInhabilitado) => {
    setActiveItem(inhabilitado)
    openModal('history')
  }

  const onCloseHistoryModal = () => {
    setActiveItem(null)
    closeModal('history')
  }

  const formatDateToDDMMYYYY = (dateString?: string | null): string => {
    if (!dateString) return '-'

    const [year, month, day] = dateString.split('T')[0].split('-')
    return `${day}/${month}/${year}`
  }

  const calcularTiempoTranscurrido = (fechaDesde?: string | null) => {
    if (!fechaDesde) return '-'

    const inicio = new Date(fechaDesde)
    const hoy = new Date()

    if (hoy < inicio) return '0 días'

    let años = hoy.getFullYear() - inicio.getFullYear()
    let meses = hoy.getMonth() - inicio.getMonth()
    let dias = hoy.getDate() - inicio.getDate()

    if (dias < 0) {
      meses--
      const ultimoMes = new Date(hoy.getFullYear(), hoy.getMonth(), 0)
      dias += ultimoMes.getDate()
    }

    if (meses < 0) {
      años--
      meses += 12
    }

    let texto = ''

    if (años > 0) {
      texto += `${años} año${años > 1 ? 's ' : ' '}`
    }

    if (meses > 0) {
      texto += `${meses} mes${meses > 1 ? 'es ' : ' '}`
    }

    if (dias > 0) {
      texto += `${texto ? 'y ' : ''}${dias} día${dias > 1 ? 's' : ''}`
    }

    return texto || '0 días'
  }

  const corregirPlural = (texto?: number | null) => {
    if (!texto) return '-'

    return texto
      .toString()
      .replace(/^1 meses$/, '1 mes')
      .replace(/^1 días$/, '1 día')
      .replace(' 1 meses', ' 1 mes')
      .replace(' 1 días', ' 1 día')
  }

  return (
    <React.Fragment>
      <div className='md:flex md:justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de Inhabilitados</h1>

        <div className='flex flex-col justify-start'>
          <div className='flex md:justify-end gap-4'>
            <InputTable onSearch={(value: string) => updateFilter('query', value)} />

            <RoleGuard roles={[UserRole.ADMIN, UserRole.JEFE, UserRole.JUEZ, UserRole.SECRETARIO]}>
              <Button type='button' onClick={() => onOpenModal(null)} >Agregar</Button>
            </RoleGuard>
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
                      <Table.Cell className='text-center dark:text-white'>{clearNames(inhabilitado?.persona?.apellido, inhabilitado?.persona?.nombre) || '-'}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{inhabilitado?.persona?.numero_documento || '-'}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{inhabilitado?.acta?.numero_acta || '-'}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>
                        {inhabilitado?.acta?.retencion_licencia === 1 ? 'Sí' : 'No'}
                      </Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>
                        {formatDateToDDMMYYYY(inhabilitado?.fecha_desde)}
                      </Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>
                        {corregirPlural(inhabilitado?.periodo_inhabilitacion_dias)}
                      </Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>
                        {calcularTiempoTranscurrido(inhabilitado?.fecha_desde)}
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
                        <RoleGuard roles={[UserRole.ADMIN, UserRole.JEFE, UserRole.JUEZ, UserRole.SECRETARIO]}>
                          <Tooltip content='Editar'>
                            <Button onClick={() => onOpenModal(inhabilitado)} color='success' className='w-8 h-8 flex items-center justify-center'>
                              <icons.Pencil  />
                            </Button>
                          </Tooltip>
                        </RoleGuard>

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

                        <RoleGuard roles={[UserRole.ADMIN, UserRole.SECRETARIO, UserRole.JUEZ, UserRole.JEFE]}>
                          <Tooltip content='Eliminar'>
                            <Button color='failure' onClick={() => onOpenDeleteModal(inhabilitado)} className='w-8 h-8 flex items-center justify-center'>
                              <icons.Trash />
                            </Button>
                          </Tooltip>
                        </RoleGuard>
                      </Table.Cell>
                    </Table.Row>
                  )))
                  : personaNoInhabilitada
                    ? (
                      <Table.Row className='bg-green-50 dark:bg-green-950/30'>
                        <Table.Cell colSpan={colums.length} className='text-center py-6 text-green-800 dark:text-green-300 font-medium'>
                          <div className='flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 text-base'>
                            <span><strong>Nombre Completo:</strong> {clearNames(personaNoInhabilitada.nombre_completo)}</span>
                            <span><strong>DNI:</strong> {personaNoInhabilitada.dni}</span>
                            <span className='px-3 py-1 bg-green-600 text-white font-semibold rounded-full text-xs uppercase shadow-sm'>
                              No se encuentra inhabilitado
                            </span>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    )
                    : (
                      <Table.Row>
                        <Table.Cell colSpan={colums.length} className='text-center py-4 dark:bg-gray-800 dark:text-white'>
                          No se encontraron resultados
                        </Table.Cell>
                      </Table.Row>
                    )
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
      <Modal show={isOpen.create} onClose={onCloseModal} size='5xl'>
        <Modal.Header>Agregar Inhabilitado</Modal.Header>
        <Modal.Body>
          <InhabilitadoForm onSucces={onCloseModal} inhabilitado={activeItem} />
        </Modal.Body>
      </Modal>

      {/* Modal ver más */}
      <Modal show={isOpen.show} onClose={onCloseShowModal} size='5xl'>
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
          openModal={isOpen.delete}
          onDelete={(id) => deleteInhabilitado.mutateAsync(id)}
          isLoading={deleteInhabilitado.isPending}
          onClose={onCloseDeleteModal}
        />
      }

      {/* Modal de historial */}
      <Modal show={isOpen.history} onClose={onCloseHistoryModal} size='5xl'>
        <Modal.Header>Agregar Inhabilitado</Modal.Header>
        <Modal.Body>
          <InhabilitadoHistory
            dni={activeItem?.persona?.numero_documento}
            isOpen={isOpen.history!}
            closeModal={onCloseHistoryModal}
          />
        </Modal.Body>
      </Modal>

      <ToastContainer containerId="custom" className="custom-toast-container" />
    </React.Fragment>
  )
}
