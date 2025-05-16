/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pagination, Select, Table } from 'flowbite-react'
import { useAuditoria } from '../hooks/useAuditoria'
import type { Column } from '../../../shared/interfaces'
import { IAuditoria }
  from '../interfaces'
import { useQuery } from '@tanstack/react-query'
import { IUsuario } from '../../parametros/globales/interfaces'
import { getUsuariosSinPaginar } from '../../parametros/globales/services/usuario-actions'

const columns: Column[] = [
  { key: 'usuario_nombre', label: 'Nombre y Apellido' },
  { key: 'dni', label: 'DNI' },
  { key: 'usuario_username', label: 'Username' },
  { key: 'juzgado_id', label: 'Juzgado' },
  { key: 'fecha', label: 'Fecha' },
  { key: 'evento', label: 'Acción' },
  { key: 'entidad_tipo', label: 'Tipo Entidad' },
  { key: 'entidad_id', label: 'ID Entidad' },
  { key: 'old_values', label: 'Valores Anteriores' },
  { key: 'new_values', label: 'Nuevos Valores' },
]

export const Auditoria = () => {
  const { auditoriaFiltrada, isFetching, pagination, updateFilter } = useAuditoria()

  const { data: usuariosSinPaginar } = useQuery<IUsuario[]>({
    queryKey: ['usuarios-sin-paginar'],
    queryFn: () => getUsuariosSinPaginar()
  })

  const formatAuditableType = (type: string | null) => {
    if (!type) return 'N/A'
    return type.startsWith('App\\Models\\') ? type.substring('App\\Models\\'.length) : type
  }

  const formatDateTime = (dateTimeString: string) => {
    try {
      return new Date(dateTimeString).toLocaleString('es-AR')
    } catch (e) {
      return dateTimeString
    }
  }

  const formatEvent = (event: string | null): string => {
    if (!event) return 'N/A'
    switch (event) {
    case 'login':
      return 'Inicio de sesión'
    case 'created':
      return 'Creación'
    case 'updated':
      return 'Actualización'
    case 'deleted':
      return 'Eliminación'
    default:
      return event
    }
  }

  const renderKeyValueJson = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString)
      if (Array.isArray(parsed)) {
        return parsed.length ? (
          <ul className='list-disc list-inside'>
            {parsed.map((item, idx) => (
              <li key={idx}>{JSON.stringify(item)}</li>
            ))}
          </ul>
        ) : (
          <span className='italic text-gray-500'>Sin datos</span>
        )
      }

      return Object.entries(parsed).length ? (
        <ul className='list-disc list-inside'>
          {Object.entries(parsed).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {String(value)}
            </li>
          ))}
        </ul>
      ) : (
        <span className='italic text-gray-500'>Sin datos</span>
      )
    } catch (e) {
      return <span className='italic text-red-500'>Error de formato</span>
    }
  }

  return (
    <>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-semibold dark:text-white'>Listado de Auditoría</h1>
        <div className='flex items-center gap-2'>
          <Select
            id='userSelect'
            className=''
            onChange={(e) => {
              const value = e.target.value || null
              updateFilter('user_id', value)
              updateFilter('page', 1)
            }}
            defaultValue=''
          >
            <option value=''>Todos</option>
            {usuariosSinPaginar?.sort((a, b) => a.nombre.localeCompare(b.nombre)).map((user) => (
              <option key={user.id} value={user.id}>
                {user.nombre} ({user.username})
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <Table hoverable>
          <Table.Head>
            {columns.map((column: Column) => (
              <Table.HeadCell key={column.key} className='text-center bg-gray-300'>
                {column.label}
              </Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className='divide-y'>
            {isFetching ? (
              <Table.Row>
                <Table.Cell colSpan={columns.length} className='text-center py-6 dark:bg-gray-800 dark:text-white'>
                  <span className='animate-pulse'>Cargando datos...</span>
                </Table.Cell>
              </Table.Row>
            ) : auditoriaFiltrada && auditoriaFiltrada.length > 0 ? (
              auditoriaFiltrada.map((auditItem: IAuditoria) => (
                <Table.Row key={auditItem.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell className='text-center dark:text-white'>{auditItem.user?.nombre ?? 'N/A'}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{auditItem.user?.dni ?? 'N/A'}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{auditItem.user?.username ?? 'N/A'}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>
                    {auditItem.user?.juzgado_id ? `N° ${auditItem.user.juzgado_id}` : 'N/A'}
                  </Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{formatDateTime(auditItem.created_at || 'N/A')}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{formatEvent(auditItem.event)}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{formatAuditableType(auditItem.auditable_type || 'N/A')}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{auditItem.auditable_id || 'N/A'}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{renderKeyValueJson(auditItem.old_values)}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{renderKeyValueJson(auditItem.new_values)}</Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan={columns.length} className='text-center py-4 dark:bg-gray-800 dark:text-white'>
                  No se encontraron resultados
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>

      <div className='flex overflow-x-auto sm:justify-center mt-4'>
        <Pagination
          currentPage={pagination.currentPage || 1}
          totalPages={pagination.lastPage || 1}
          onPageChange={(page: number) => updateFilter('page', page)}
          previousLabel='Anterior'
          nextLabel='Siguiente'
          showIcons
        />
      </div>
    </>
  )
}
