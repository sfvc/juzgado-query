import { Checkbox, Table } from 'flowbite-react'
import { ActasInfractor, ActuacionActa } from '../interfaces'
import { Column } from '../../../shared/interfaces'
import { useContext, useEffect } from 'react'
import { ActuacionContext, IActuacionContext } from '../../../context/Actuacion/ActuacionContext'

const colums: Column[] = [
  // { key: 'seleccionar', label: 'Seleccionar' },
  { key: 'numero_causa', label: 'Nro. Causa' },
  { key: 'numero_acta', label: 'Nro. de acta' },
  { key: 'fecha', label: 'Fecha' }
]
  
export const RelatedActas = ({acta}: {acta: ActuacionActa}) => {
  const { checkingActa, tipoActuacion, selectedActas, setDefalutSeleted } = useContext<IActuacionContext>(ActuacionContext)

  const actasRelacionadas: ActasInfractor[] = acta.actas_infractores
    .filter((actaRelacionada: ActasInfractor) =>  acta.id !== actaRelacionada.id)

  useEffect(() => {
    if (!selectedActas.length) {
      setDefalutSeleted(acta.id)
    }
  }, [])

  return (
    <div className='my-8'>
      <div className='titulos rounded-md py-2 text-center mb-6'>
        <h3 className='text-xl font-semibold text-white'>Actas Relacionadas</h3>
      </div>

      <div className='overflow-x-auto'>
        <Table>
          <Table.Head>
            {
              colums.map((colum: Column) => (
                <Table.HeadCell key={colum.key} className='text-center bg-gray-300'>{colum.label}</Table.HeadCell>
              ))
            }
          </Table.Head>
          <Table.Body className='divide-y'>
            {
              actasRelacionadas.length
                ? actasRelacionadas.map((acta, index) => (
                  <Table.Row key={index} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    {/* <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white text-center'>
                      <Checkbox
                        id={`${acta.id}`}
                        name='acta'
                        value={acta.id}
                        onChange={(e) => checkingActa(e, acta.id)}
                        className='h-5 w-5 rounded border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 
                        dark:focus:ring-blue-400 text-blue-600 dark:checked:bg-blue-600 dark:checked:border-blue-600 dark:hover:border-blue-400 
                        hover:border-blue-500 transition-colors duration-200 disabled:bg-slate-400/40 disabled:dark:bg-white/40 disabled:cursor-not-allowed'
                        disabled={tipoActuacion === 'SENTENCIA'}
                      />
                    </Table.Cell> */}
                    <Table.Cell className='text-center dark:text-white'>{acta.numero_acta}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{acta.numero_causa}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{acta.fecha}</Table.Cell>
                  </Table.Row>
                ))
                : <tr><td colSpan={colums.length} className='text-center py-4 dark:bg-gray-800'>No se encontraron resultados</td></tr>
            }
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}
