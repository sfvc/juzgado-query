
import { Drawer } from 'flowbite-react'
import { useActaById } from '../hooks/useActaById'
import { clearNames } from '../../../shared'
import { SkeletonDrawer } from './SkeletonDrawer'
import { formatDate } from '../../../shared/helpers/formatDate'

interface Props {
  id: string
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export const ActaDrawer = ({ id, isOpen, setIsOpen }: Props) => {
  const { acta, isLoading } = useActaById(id)

  const handleClose = () => setIsOpen(false)

  return (
    <>
      <Drawer open={isOpen} onClose={handleClose} position="right" className="w-full sm:w-1/2 transition-all duration-300 ease-in-out">
        <Drawer.Header title="Información del Acta" className=" text-white shadow-lg rounded-t-lg" />
  
        <Drawer.Items className="relative px-6 py-4 bg-gray-50 dark:bg-gray-800">
          {isLoading ? (
            <SkeletonDrawer />
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    <strong>Numero de acta:</strong> {acta?.numero_acta}
                  </div>
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    <strong>Numero de causa:</strong> {acta?.numero_causa}
                  </div>
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    <strong>Hora de infracción:</strong> {acta?.hora}
                  </div>
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    <strong>Fecha de infracción:</strong> {formatDate(acta?.fecha || '-')}
                  </div>
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    <strong>Fecha de prescripción:</strong> {formatDate(acta?.fecha_prescripcion || '-')}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  <strong>Retención de Vehiculo:</strong> {acta?.retencion_vehiculo ? 'Sí' : 'No'}
                </div>
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  <strong>Retención de Licencia:</strong> {acta?.retencion_licencia ? 'Sí' : 'No'}
                </div>
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  <strong>Notificado:</strong> {acta?.notificado ? 'Sí' : 'No'}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-blue-500 mb-4">Infractor</h4>
                {acta?.infractores.map((infractor, index) => (
                  <div key={index} className="grid grid-cols-2 gap-2">
                    <div className="text-base font-semibold text-gray-900 dark:text-white">
                      <strong>Nombre y apellido:</strong> {clearNames(infractor.apellido, infractor.nombre)}
                    </div>
                    <div className="text-base font-semibold text-gray-900 dark:text-white">
                      <strong>Documento:</strong> {infractor.documento}
                    </div>
                    <div className="text-base font-semibold text-gray-900 dark:text-white">
                      <strong>Calle:</strong> {acta?.calle}
                    </div>
                    <div className="text-base font-semibold text-gray-900 dark:text-white">
                      <strong>Observaciones:</strong> {acta?.observaciones}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="text-xl font-semibold text-blue-500 gap-2 mb-4">Infracciones Cometidas</h4>
                {acta?.infracciones_cometidas.map((infraccion, index) => (
                  <div key={index} className="space-y-2">
                    <div className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                      <strong>Articulo:</strong> {infraccion.numero} - {infraccion.detalle}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="text-xl font-semibold text-blue-500 mb-4">Vehículo</h4>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    <strong>Titular:</strong> {clearNames(acta?.vehiculo?.titular?.apellido, acta?.vehiculo?.titular?.nombre)}
                  </div>
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    <strong>Dominio:</strong> {acta?.vehiculo?.dominio || '-'}
                  </div>
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    <strong>Marca:</strong> {acta?.vehiculo?.marca?.nombre || '-'}
                  </div>
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    <strong>Modelo:</strong> {acta?.vehiculo?.modelo || '-'}
                  </div>
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    <strong>Tipo:</strong> {acta?.vehiculo?.tipo?.nombre || '-'}
                  </div>
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    <strong>Color:</strong> {acta?.vehiculo?.color?.nombre || '-'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Drawer.Items>
      </Drawer>

    </>
  )
}
