import { ReactNode } from 'react'
import { Badge, Drawer } from 'flowbite-react'
import { useActaById } from '../hooks/useActaById'
import { usePrioridad } from '../hooks/usePrioridad'
import { clearNames } from '../../../shared'
import { SkeletonDrawer } from './SkeletonDrawer'
import { formatDate } from '../../../shared/helpers/formatDate'
import { DEFAULT_COLOR } from '../../../shared/constants'
import { TipoPersona } from '../../personas/forms/helpers'
import type { InfractorActa } from '../interfaces'

interface Props {
  id: string
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

const Dato = ({ label, children }: { label: string, children: ReactNode }) => (
  <div className='text-base font-semibold text-gray-900 dark:text-white'>
    <strong>{label}:</strong> {children}
  </div>
)

const Seccion = ({ titulo, children }: { titulo: string, children: ReactNode }) => (
  <div>
    <h4 className='text-xl font-semibold text-blue-500 mb-4'>{titulo}</h4>
    {children}
  </div>
)

// Los datos sin cargar vienen en ceros (ej: CUIT 00000000000000)
const hasValue = (value?: string | number | null) => !!value && !/^0+$/.test(String(value))

const formatMonto = (monto?: string | number | null) =>
  Number(monto || 0).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })

// Avisos que conviene ver antes de resolver el acta
const alertasInfractor = (infractor: InfractorActa) => [
  infractor.antecedentes ? 'Con antecedentes' : null,
  infractor.inhabilitado ? 'Inhabilitado' : null,
  infractor.cuota_alimentaria ? 'Cuota alimentaria' : null
].filter((alerta): alerta is string => !!alerta)

export const ActaDrawer = ({ id, isOpen, setIsOpen }: Props) => {
  const { acta, isLoading } = useActaById(id)
  const { prioridades } = usePrioridad()

  const handleClose = () => setIsOpen(false)

  const estadoActual = acta?.estados?.[0]
  const prioridad = prioridades?.find((p: { id: number, nombre: string }) => p.id === acta?.prioridad_id)
  const montoTotal = acta?.infracciones_cometidas?.reduce((total, infraccion) => total + Number(infraccion.pivot?.monto || 0), 0) || 0
  const mostrarAlcohol = acta?.tipo_acta === 'TRANSITO' && Number(acta?.grado_alcohol) > 0

  return (
    <>
      <Drawer open={isOpen} onClose={handleClose} position="right" className="w-full sm:w-1/2 transition-all duration-300 ease-in-out">
        <Drawer.Header title="Información del Acta" className=" text-white shadow-lg rounded-t-lg" />

        <Drawer.Items className="relative px-6 py-4 bg-gray-50 dark:bg-gray-800">
          {isLoading ? (
            <SkeletonDrawer />
          ) : (
            <div className="space-y-6">
              {/* Resumen */}
              <div className='flex flex-wrap items-center gap-2'>
                <span
                  className='px-3 py-1 rounded-lg text-white text-sm font-semibold'
                  style={{ backgroundColor: estadoActual?.color || DEFAULT_COLOR }}
                >
                  {estadoActual?.nombre?.toUpperCase() || 'SIN ESTADO'}
                </span>
                {prioridad && (
                  <Badge color={prioridad.nombre === 'URGENTE' ? 'failure' : 'gray'} size='sm'>
                    Prioridad: {prioridad.nombre}
                  </Badge>
                )}
                {acta?.juzgado_id && <Badge color='info' size='sm'>Juzgado N°{acta.juzgado_id}</Badge>}
                <Badge color='purple' size='sm'>{acta?.tipo_acta}</Badge>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-2 gap-2">
                  <Dato label='Numero de acta'>{acta?.numero_acta}</Dato>
                  <Dato label='Numero de causa'>{acta?.numero_causa}</Dato>
                  <Dato label='Hora de infracción'>{acta?.hora}</Dato>
                  <Dato label='Fecha de infracción'>{formatDate(acta?.fecha || '-')}</Dato>
                  <Dato label='Fecha de prescripción'>{formatDate(acta?.fecha_prescripcion || '-')}</Dato>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Dato label='Retención de Vehiculo'>{acta?.retencion_vehiculo ? 'Sí' : 'No'}</Dato>
                <Dato label='Retención de Licencia'>{acta?.retencion_licencia ? 'Sí' : 'No'}</Dato>
                <Dato label='Notificado'>{acta?.notificado ? 'Sí' : 'No'}</Dato>
                {!!acta?.destino_vehiculo && <Dato label='Destino del vehículo'>{acta.destino_vehiculo}</Dato>}
                {mostrarAlcohol && <Dato label='Grado de alcohol'>{acta?.grado_alcohol} g/l</Dato>}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Dato label='Calle'>{acta?.calle}</Dato>
                <Dato label='Observaciones'>{acta?.observaciones}</Dato>
                {!!acta?.preventiva && <Dato label='Preventiva'>{acta.preventiva}</Dato>}
              </div>

              {/* Infractor */}
              <Seccion titulo='Infractor'>
                <div className='space-y-4'>
                  {acta?.infractores.map((infractor, index) => (
                    <div key={index} className='space-y-2'>
                      {infractor.tipo_persona === TipoPersona.FISICA
                        ? (
                          <div className="grid grid-cols-3 gap-1">
                            <Dato label='Nombre y apellido'>{clearNames(infractor.apellido, infractor.nombre)}</Dato>
                            <Dato label='Responsable'>{infractor.responsable === 1 ? 'Sí' : 'No'}</Dato>
                            <Dato label='Documento'>{infractor.documento}</Dato>
                          </div>
                        )
                        : (
                          <div className="grid grid-cols-2 gap-2">
                            <Dato label='Razon social'>{infractor.razon_social || infractor.nombre}</Dato>
                            <Dato label='Cuit'>{infractor.cuit}</Dato>
                          </div>
                        )}

                      {(hasValue(infractor.telefono) || hasValue(infractor.email) || hasValue(infractor.cuil)) && (
                        <div className="grid grid-cols-3 gap-1">
                          {hasValue(infractor.telefono) && <Dato label='Teléfono'>{infractor.telefono}</Dato>}
                          {hasValue(infractor.email) && <Dato label='Email'>{infractor.email}</Dato>}
                          {infractor.tipo_persona === TipoPersona.FISICA && hasValue(infractor.cuil) && <Dato label='CUIL'>{infractor.cuil}</Dato>}
                        </div>
                      )}

                      {alertasInfractor(infractor).length > 0 && (
                        <div className='flex flex-wrap gap-2'>
                          {alertasInfractor(infractor).map((alerta) => (
                            <Badge key={alerta} color='warning' size='sm'>{alerta}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Seccion>

              {/* Infracciones */}
              <Seccion titulo='Infracciones Cometidas'>
                <div className='space-y-5'>
                  {acta?.infracciones_cometidas.map((infraccion, index) => (
                    <div key={index} className="space-y-2">
                      <Dato label='Articulo'>
                        {infraccion.numero}{infraccion.inciso ? ` inc. ${infraccion.inciso}` : ''} - {infraccion.detalle}
                      </Dato>

                      <div className='grid grid-cols-2 gap-2'>
                        {infraccion.norma_legal && <Dato label='Norma legal'>{infraccion.norma_legal}</Dato>}
                        {infraccion.tipo_infraccion && <Dato label='Tipo de infracción'>{infraccion.tipo_infraccion}</Dato>}
                        <Dato label='Multa'>
                          {infraccion.valor_desde === infraccion.valor_hasta || !infraccion.valor_hasta
                            ? `${infraccion.valor_desde} UM`
                            : `de ${infraccion.valor_desde} a ${infraccion.valor_hasta} UM`}
                        </Dato>
                        <Dato label='Recibe descuento'>{infraccion.descuento ? 'Sí' : 'No'}</Dato>
                        {infraccion.pivot?.monto && <Dato label='Monto aplicado'>{formatMonto(infraccion.pivot.monto)}</Dato>}
                      </div>
                    </div>
                  ))}

                  {(acta?.infracciones_cometidas?.length ?? 0) > 1 && montoTotal > 0 && (
                    <Dato label='Total de multas'>{formatMonto(montoTotal)}</Dato>
                  )}
                </div>
              </Seccion>

              {acta?.tipo_acta === 'TRANSITO' && (
                <Seccion titulo='Vehículo'>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Dato label='Titular'>{clearNames(acta?.vehiculo?.titular?.apellido, acta?.vehiculo?.titular?.nombre)}</Dato>
                    <Dato label='Dominio'>{acta?.vehiculo?.dominio || '-'}</Dato>
                    <Dato label='Marca'>{acta?.vehiculo?.marca?.nombre || '-'}</Dato>
                    <Dato label='Modelo'>{acta?.vehiculo?.modelo || '-'}</Dato>
                    <Dato label='Tipo'>{acta?.vehiculo?.tipo?.nombre || '-'}</Dato>
                    <Dato label='Color'>{acta?.vehiculo?.color?.nombre || '-'}</Dato>
                    {hasValue(acta?.vehiculo?.numero_chasis) && <Dato label='Nº de chasis'>{acta?.vehiculo?.numero_chasis}</Dato>}
                    {hasValue(acta?.vehiculo?.numero_motor) && <Dato label='Nº de motor'>{acta?.vehiculo?.numero_motor}</Dato>}
                    {hasValue(acta?.vehiculo?.numero_taxi_remis) && <Dato label='Nº de taxi/remis'>{acta?.vehiculo?.numero_taxi_remis}</Dato>}
                  </div>
                </Seccion>
              )}

              {(acta?.tipo_acta === 'BROMATOLOGIA' || acta?.tipo_acta === 'INSPECCION') && (
                <Seccion titulo='Comercio'>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Dato label='Nombre de Fantasia'>{acta?.comercio?.nombre_fantasia || '-'}</Dato>
                    <Dato label='Rubros'>
                      {acta?.comercio?.rubros?.length > 0
                        ? acta.comercio.rubros.map((rubro) => rubro.nombre).join(', ')
                        : '-'}
                    </Dato>
                  </div>
                </Seccion>
              )}

              {(acta?.tipo_acta === 'INSPECCION' || acta?.tipo_acta === 'OBRAS PARTICULARES') && (
                <Seccion titulo='Propiedad o Inmueble'>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Dato label='Matrícula Catastral'>{acta?.propiedades?.[0]?.matricula_catastral || '-'}</Dato>
                    <Dato label='Propietario'>{acta?.propiedades?.[0]?.propietario || '-'}</Dato>
                    <Dato label='Domicilio'>{acta?.propiedades?.[0]?.domicilio || '-'}</Dato>
                  </div>
                </Seccion>
              )}

              {/* Testigos */}
              {!!acta?.testigos?.length && (
                <Seccion titulo='Testigos'>
                  <div className='space-y-2'>
                    {acta.testigos.map((testigo, index) => (
                      <Dato key={testigo.id ?? index} label={`Testigo ${index + 1}`}>
                        {clearNames(testigo.apellido, testigo.nombre)}{testigo.documento ? ` - DNI ${testigo.documento}` : ''}
                      </Dato>
                    ))}
                  </div>
                </Seccion>
              )}

              {/* Archivos adjuntos */}
              {!!acta?.adjuntos?.length && (
                <Seccion titulo={`Archivos Adjuntos (${acta.adjuntos.length})`}>
                  <ul className='list-disc ps-5 space-y-1'>
                    {acta.adjuntos.map((url, index) => (
                      <li key={url}>
                        <a href={url} target='_blank' rel='noreferrer' className='text-blue-500 hover:underline'>
                          Archivo {index + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Seccion>
              )}
            </div>
          )}
        </Drawer.Items>
      </Drawer>
    </>
  )
}
