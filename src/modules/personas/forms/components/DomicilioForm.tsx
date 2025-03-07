import { useEffect } from 'react'
import { Label, Select, Spinner, TextInput } from 'flowbite-react'
import { useFormContext } from 'react-hook-form'
import { useDomicilio } from '../../hooks/useDomicilio'
import { SearchableSelect } from '../../../../shared/components/SearchableSelect'
import { useLoading } from '../../../../shared'
import type { IBarrio, IDepartamento, ILocalidad, IPais, IProvincia } from '../../../parametros/localizacion/interfaces/localizacion'
import type { Domicilio, IDomicilio } from '../../interfaces'

export interface Props {
  domicilio: IDomicilio | null
}

export const DomicilioForm = ({ domicilio }: Props) => {
  const { register, setValue, formState: { errors } } = useFormContext<Domicilio>()
  const { actionFn, loading } = useLoading()

  const { 
    paises,
    provincias,
    departamentos,
    getBarrios,
    getLocalidades,
    getProvinciasByPais,
    getDepartamentosByProvincia,
  } = useDomicilio()

  const initLoading = async () => {
    if (!domicilio) return

    actionFn(async () => {
      await getProvinciasByPais(domicilio?.pais_id)
      await getDepartamentosByProvincia(domicilio?.provincia_id)
    })
  }

  useEffect(() => {
    initLoading()
  }, [])

  return (
    <div>
      <div className='my-4 titulos rounded-md py-2 text-center'>
        <h3 className='text-xl font-semibold text-white'>
            Datos de Domicilio
        </h3>
      </div>

      {
        loading
          ? <div className='flex justify-center'><Spinner size='lg'/></div>
          : (
            <div className='grid md:grid-cols-2 gap-4 grid-cols-1'>
              <div className='mb-4'>
                <div className='mb-2 block dark:text-white'>
                  <Label htmlFor='pais_id' value='Pais' />
                </div>

                <Select 
                  {...register('pais_id', { valueAsNumber: true })}
                  helperText={errors?.pais_id && errors?.pais_id?.message} 
                  color={errors?.pais_id && 'failure'}
                  onChange={(e) => getProvinciasByPais(+e.target.value)}
                >
                  <option value=''>Seleccione un país</option>
                  {paises?.map((pais: IPais) => (
                    <option key={pais.id} value={pais.id}>
                      {pais.nombre}
                    </option>
                  ))}
                </Select>
              </div>

              <div className='mb-4'>
                <div className='mb-2 block dark:text-white'>
                  <Label htmlFor='provincia_id' value='Provincia' />
                </div>

                <Select 
                  {...register('provincia_id', { valueAsNumber: true })}
                  helperText={errors?.provincia_id && errors?.provincia_id?.message} 
                  color={errors?.provincia_id && 'failure'}
                  onChange={(e) => getDepartamentosByProvincia(+e.target.value)}
                  disabled={provincias.length === 0}
                >
                  <option value=''>Seleccione una provincia</option>
                  {provincias?.map((provincia: IProvincia) => (
                    <option key={provincia.id} value={provincia.id}>
                      {provincia.nombre}
                    </option>
                  ))}
                </Select>
              </div>

              <div className='mb-4'>
                <div className='mb-2 block dark:text-white'>
                  <Label htmlFor='departamento_id' value='Departamento' />
                </div>

                <Select 
                  {...register('departamento_id', { valueAsNumber: true })}
                  helperText={errors?.departamento_id && errors?.departamento_id?.message} 
                  color={errors?.departamento_id && 'failure'}
                  disabled={departamentos.length === 0}
                >
                  <option value=''>Seleccione un departamento</option>
                  {departamentos?.map((departamento: IDepartamento) => (
                    <option key={departamento.id} value={departamento.id}>
                      {departamento.nombre}
                    </option>
                  ))}
                </Select>
              </div>

              <SearchableSelect<ILocalidad>
                label="Localidad"
                placeholder="Buscar localidad"
                onSearch={getLocalidades}
                onSelect={(item: ILocalidad) => setValue('localidad_id', item.id)}
                renderItem={(item) => (
                  <div><strong>{item.nombre}</strong> - CP. {item.codigo_postal}</div>
                )}
                renderInput={(item) => { return `${item.nombre} - CP. ${item.codigo_postal}`}}
                defaultValue={domicilio?.localidad?.nombre}
                resetInput={() => setValue('localidad_id', null)}
              />

              <SearchableSelect<IBarrio>
                label="Barrio"
                placeholder="Buscar barrio"
                onSearch={getBarrios}
                onSelect={(item: IBarrio) => setValue('barrio_id', item.id)}
                renderItem={(item) => (
                  <div><strong>{item.nombre}</strong></div>
                )}
                renderInput={(item) => { return `${item.nombre}`} }
                defaultValue={domicilio?.barrio?.nombre}
                resetInput={() => setValue('barrio_id', null)}
              />

              <div className='mb-4'>
                <div className='mb-2 block dark:text-white'>
                  <Label color='gray' htmlFor='calle' value='Calle' />
                </div>
                <TextInput
                  {...register('calle')}
                  helperText={errors?.calle && errors?.calle?.message} 
                  color={errors?.calle && 'failure'}
                  placeholder='Calle'
                />
              </div>

              <div className='mb-4'>
                <div className='mb-2 block dark:text-white'>
                  <Label htmlFor='numero' value='Número' />
                </div>
                <TextInput
                  {...register('numero')}
                  helperText={errors?.numero && errors?.numero?.message} 
                  color={errors?.numero && 'failure'}
                  type='number'
                  placeholder='Numero'
                />
              </div>

              <div className='mb-4'>
                <div className='mb-2 block dark:text-white'>
                  <Label htmlFor='lote_dpto' value='Lote/Departamento' />
                </div>
                <TextInput
                  {...register('lote_dpto')}
                  helperText={errors?.lote_dpto && errors?.lote_dpto?.message} 
                  color={errors?.lote_dpto && 'failure'}
                  placeholder='Departamento'
                />
              </div>

              <div className='mb-4'>
                <div className='mb-2 block dark:text-white'>
                  <Label htmlFor='manzana_piso' value='Manzana' />
                </div>
                <TextInput
                  {...register('manzana_piso')}
                  helperText={errors?.manzana_piso && errors?.manzana_piso?.message} 
                  color={errors?.manzana_piso && 'failure'}
                  placeholder='Manzana'
                />
              </div>
            </div>
          )
      }
    </div>
  )
}