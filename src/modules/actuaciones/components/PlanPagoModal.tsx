import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Button, Modal } from 'flowbite-react'
import { icons } from '../../../shared'
import { soloNumeros } from '../../../shared/helpers/formatNumber'
import { formatDate } from '../../../shared/helpers/formatDate'
import { useActuacion } from '../hooks/useActuacion'
import type { Actuacion, Cuota } from '../interfaces'

const ENTREGA_MINIMA = 50000

interface ActaActuacionResponse {
  actuaciones: Actuacion[]
}

interface Props {
  show: boolean
  onClose: () => void
  actaId: number
  actuacion: Actuacion
  /** Reemplaza la actuacion activa por la version actualizada del servidor */
  onActuacionChange: (actuacion: Actuacion) => void
  /** Se eligio una cuota para enviarla a caja */
  onSelectCuota: (cuota: Cuota) => void
  /** Hay que abrir la confirmacion de la bandeja de cobro */
  onOpenComprobante: () => void
}

export const PlanPagoModal = ({ show, onClose, actaId, actuacion, onActuacionChange, onSelectCuota, onOpenComprobante }: Props) => {
  const queryClient = useQueryClient()
  const { createCuota } = useActuacion()

  const [entrega, setEntrega] = useState('')
  const [cantidadCuotas, setCantidadCuotas] = useState(2)

  const planPago = actuacion.planPago

  // Vuelve a pedir la actuacion al servidor y devuelve su version actualizada
  const refreshActuacion = async () => {
    const updated = await queryClient.fetchQuery<ActaActuacionResponse>({
      queryKey: ['acta-actuacion', { id: String(actaId) }]
    })
    return updated?.actuaciones?.find((a: Actuacion) => a.id === actuacion.id)
  }

  const handleSaveCuotas = async () => {
    try {
      await createCuota.mutateAsync({ actuacionId: actuacion.id, entrega, cuotas: cantidadCuotas })

      const refreshed = await refreshActuacion()
      if (refreshed) onActuacionChange(refreshed)

      setEntrega('')
      setCantidadCuotas(2)
    } catch (error) {
      console.error('Error al guardar cuotas:', error)
    }
  }

  const handleCuota = async (cuota: Cuota) => {
    onSelectCuota(cuota)

    if (cuota.caja) {
      const refreshed = await refreshActuacion()
      if (refreshed) onActuacionChange(refreshed)
    } else {
      onOpenComprobante()
    }
  }

  const entregaNumber = Number(entrega || 0)
  const saldo = Math.max(Number(actuacion.total) - entregaNumber, 0)

  return (
    <Modal show={show} onClose={onClose} size='xl'>
      <Modal.Header>Plan de Pago</Modal.Header>
      <Modal.Body>
        {planPago ? (
          <div className='space-y-4'>
            <div className='p-4 bg-gray-100 dark:bg-gray-800 shadow-sm'>
              <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2'>Resumen</h3>
              <div className='grid grid-cols-2 gap-2 text-sm'>
                <p className='text-gray-700 dark:text-gray-300'>
                  <span className='font-medium'>Total:</span> ${planPago.total}
                </p>
                <p className='text-gray-700 dark:text-gray-300'>
                  <span className='font-medium'>Entrega:</span> ${planPago.entrega}
                </p>
                <p className='text-gray-700 dark:text-gray-300'>
                  <span className='font-medium'>Restante:</span>{' '}
                  ${Number(planPago.total) - Number(planPago.entrega)}
                </p>
                <p className='text-gray-700 dark:text-gray-300'>
                  <span className='font-medium'>Cuotas:</span> {planPago.cuotas}
                </p>
              </div>
            </div>

            <div>
              <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3'>Detalle de Cuotas</h3>
              <div className='grid gap-3 md:grid-cols-2'>
                {planPago.detalle_cuotas?.map((cuota, index) => (
                  <div
                    key={cuota.id}
                    className={`p-3 rounded-xl shadow-sm border text-sm ${cuota.pagado
                      ? 'bg-green-100 border-green-300 dark:bg-green-800/40 dark:border-green-600'
                      : 'bg-yellow-100 border-yellow-300 dark:bg-yellow-800/40 dark:border-yellow-600'
                    }`}
                  >
                    <p className='font-medium text-gray-800 dark:text-gray-100'>
                      Cuota {index + 1}: ${cuota.importe}
                    </p>
                    <p className='text-gray-600 dark:text-gray-300'>
                      Vencimiento:{' '}
                      <span className='font-medium'>{formatDate(cuota.fecha_vencimiento ?? '')}</span>
                    </p>
                    <p className='text-gray-600 dark:text-gray-300'>
                      Estado:{' '}
                      <span className={cuota.pagado ? 'text-green-600 dark:text-green-400' : 'text-yellow-700 dark:text-yellow-300'}>
                        {cuota.pagado ? 'Pagado' : 'Pendiente'}
                      </span>
                    </p>

                    {cuota?.path_comprobante && (
                      <div className='mt-3 flex justify-end'>
                        <Button color='blue' size='xs' onClick={() => window.open(cuota.path_comprobante, '_blank')}>
                          <icons.World /> <span className='mt-1 ml-1'>Comprobante</span>
                        </Button>
                      </div>
                    )}

                    {!cuota.pagado && (
                      <div className='mt-3 flex justify-end'>
                        <Button
                          color={cuota.caja ? 'failure' : 'purple'}
                          size='xs'
                          onClick={() => handleCuota(cuota)}
                          disabled={planPago.detalle_cuotas?.some((c) => !c.pagado && (c.id ?? 0) < (cuota.id ?? 0))}
                        >
                          <icons.ReportMoney />{' '}
                          <span className='mt-1'>{cuota.caja ? 'Retirar de caja' : 'Enviar a caja'}</span>
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <form
            className='flex flex-col gap-4'
            onSubmit={(e) => {
              e.preventDefault()
              handleSaveCuotas()
            }}
          >
            {actuacion.total && (
              <div className='p-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm shadow-sm'>
                <p className='text-gray-700 dark:text-gray-200'>
                  <span className='font-medium'>Monto total:</span> ${actuacion.total}
                </p>
                <p className='text-gray-700 dark:text-gray-200'>
                  <span className='font-medium'>Entrega:</span> ${entrega || 0}
                </p>
                {entregaNumber > Number(actuacion.total) && (
                  <p className='text-red-600 font-medium'>La entrega no puede superar el monto total</p>
                )}
                {entregaNumber < ENTREGA_MINIMA && (
                  <p className='text-red-600 font-medium'>La entrega mínima es de $50.000</p>
                )}
                <p className='text-gray-700 dark:text-gray-200'>
                  <span className='font-medium'>Saldo:</span> ${saldo}
                </p>
                <p className='text-gray-700 dark:text-gray-200'>
                  <span className='font-medium'>Valor de cada cuota:</span>{' '}
                  {cantidadCuotas > 0 ? (saldo / cantidadCuotas).toFixed(2) : 0}
                </p>
              </div>
            )}

            <div>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Entrega</label>
              <input
                type='text'
                placeholder='Ingrese entrega'
                value={entrega}
                onChange={(e) => setEntrega(e.target.value)}
                onInput={soloNumeros}
                className='w-full rounded-lg border border-gray-300 p-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Cantidad de Cuotas</label>
              <select
                value={cantidadCuotas}
                onChange={(e) => setCantidadCuotas(Number(e.target.value))}
                className='w-full rounded-lg border border-gray-300 p-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500'
              >
                {[1, 2, 3, 4].map((cuotas) => (
                  <option key={cuotas} value={cuotas}>{cuotas}</option>
                ))}
              </select>
            </div>

            <div className='flex justify-end gap-4 mt-4'>
              <Button color='gray' onClick={onClose}>Cancelar</Button>
              <Button
                color='success'
                type='submit'
                isProcessing={createCuota.isPending}
                disabled={createCuota.isPending || entregaNumber > Number(actuacion.total) || entregaNumber < ENTREGA_MINIMA}
              >
                Guardar
              </Button>
            </div>
          </form>
        )}
      </Modal.Body>
    </Modal>
  )
}
