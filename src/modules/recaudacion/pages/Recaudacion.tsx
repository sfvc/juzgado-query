/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Pagination, Table } from 'flowbite-react'
import { useRecaudacion } from '../hooks/useRecaudacion'
import type { Column } from '../../../shared/interfaces'
import { icons, useLoading } from '../../../shared'
import { formatReport } from '../helpers/formatReport'
import { formatEstadisticas } from '../helpers/formatEstadistics'
import { carboneActions } from '../../carbone'
import { useContext } from 'react'
import { AuthContext } from '../../../context/Auth/AuthContext'
import { IRecaudacion }
  from '../interfaces'
import { useEffect, useState } from 'react'
import { formatDatos } from '../helpers/formatDatos'

const columns: Column[] = [
  { key: 'nro_comprobante_rentas', label: 'NÚMERO DE COMPROBANTE' },
  { key: 'numero_acta', label: 'NÚMERO DE ACTA' },
  { key: 'tipo_acta', label: 'TIPO DE ACTA' },
  { key: 'monto_multa_original', label: 'MONTO ORIGINAL' },
  { key: 'monto_conceptos_original', label: 'MONTO CONCEPTOS' },
  { key: 'monto_abonado', label: 'MONTO ABONADO' },
  { key: 'fecha_pago', label: 'FECHA DE PAGO' },
  { key: 'juzgado', label: 'JUZGADO N°' },
  { key: 'estado', label: 'ESTADO' },
]

export const Recaudacion = () => {
  const useAction = useLoading()
  const { user } = useContext(AuthContext)
  const { recaudacionFiltrada, estadisticas, isFetching, pagination, updateFilter } = useRecaudacion()
  const [fecha, setFecha] = useState('')

  const RECAUDACION_TEMPLATE: string = 'recaudacion.xlsx'

  const renderRecaudacion = async () => {
    useAction.actionFn(async () => {
      const form = formatReport(recaudacionFiltrada)
      const resumen = formatEstadisticas(estadisticas)
      const datos = formatDatos(recaudacionFiltrada, user)

      const data = {
        convertTo: 'pdf',
        data: {
          lista: form,
          resumen: resumen,
          datos: datos
        },
        template: RECAUDACION_TEMPLATE
      }

      await carboneActions.showFilePDF(data)
    })
  }

  const handleFilter = () => {
    if (fecha && user?.juzgado?.id) {
      updateFilter('fecha', fecha)
      updateFilter('juzgado_id', user?.juzgado?.id)
      updateFilter('page', 1)
    }
  }

  const formatDateTime = (dateTimeString: string) => {
    try {
      const [datePart, timePart] = dateTimeString.split(' ')
      const [year, month, day] = datePart.split('-').map(Number)
      const [hour, minute, second] = timePart.split(':').map(Number)
      const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute, second))

      return utcDate.toLocaleString('es-AR', {
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch (e) {
      return dateTimeString
    }
  }

  const formatMonto = (valor: string | number | null | undefined) => {
    const numero = Number(valor)
    if (isNaN(numero)) return ''
    return numero.toLocaleString('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  useEffect(() => {
    const ayer = new Date()
    ayer.setDate(ayer.getDate() - 1)
    const fechaAyer = ayer.toISOString().split('T')[0]
    setFecha(fechaAyer)
  }, [])

  return (
    <>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4'>
        <h1 className='text-2xl font-semibold dark:text-white'>Listado de Recaudación</h1>

        <Button color='warning' onClick={renderRecaudacion} isProcessing={useAction.loading} disabled={useAction.loading}>
          <icons.Print />&#160; Imprimir
        </Button>

        <div className='flex items-center gap-2'>
          <input
            type='date'
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className='rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all'
          />
          <Button onClick={handleFilter} size='sm'>
            Filtrar
          </Button>
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
            ) : recaudacionFiltrada && recaudacionFiltrada.length > 0 ? (
              recaudacionFiltrada.map((recaudacionItems: IRecaudacion) => (
                <Table.Row key={recaudacionItems.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell className='text-center dark:text-white'>{recaudacionItems?.nro_comprobante_rentas || ''}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{recaudacionItems?.numero_acta || ''}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{recaudacionItems?.tipo_acta || ''}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>$ {formatMonto(recaudacionItems?.monto_multa_original)}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>$ {formatMonto(recaudacionItems?.monto_conceptos_original)}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>$ {formatMonto(recaudacionItems?.monto_abonado)}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{formatDateTime(recaudacionItems?.fecha_pago || '')}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{recaudacionItems?.juzgado?.nombre || ''}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{recaudacionItems?.estado || ''}</Table.Cell>
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

      {pagination && pagination.total > 1 && (
        <div className='flex overflow-x-auto sm:justify-center mt-4'>
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.lastPage}
            onPageChange={(page) => updateFilter('page', page)}
            previousLabel='Anterior'
            nextLabel='Siguiente'
            showIcons
          />
        </div>
      )}
    </>
  )
}
