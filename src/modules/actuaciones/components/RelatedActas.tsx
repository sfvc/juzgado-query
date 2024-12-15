import { Table } from 'flowbite-react'
import { ActasInfractor, ActuacionActa } from '../interfaces'
import { Column } from '../../../shared/interfaces'
import { useContext, useEffect } from 'react'
import { ActuacionContext, IActuacionContext } from '../../../context/Actuacion/ActuacionContext'

const colums: Column[] = [
  { key: 'numero_causa', label: 'Nro. Causa' },
  { key: 'numero_acta', label: 'Nro. de acta' },
  { key: 'fecha', label: 'Fecha' }
]
  
export const RelatedActas = ({acta}: {acta: ActuacionActa}) => {
  const { selectedActas, setDefalutSeleted } = useContext<IActuacionContext>(ActuacionContext)

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
