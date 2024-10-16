 
import { useEffect } from 'react'
import { Button, Label, Select, TextInput } from 'flowbite-react'
import { Domicilio, IDomicilio } from '../../interfaces'
import { IBarrio, IDepartamento, ILocalidad, IPais, IProvincia } from '../../../parametros/localizacion/interfaces/localizacion'
import { useDomicilio } from '../../hooks/useDomicilio'
import { SearchInput } from '../../../../shared/components/SearchInput'
import { useFormContext } from 'react-hook-form'

export interface Props {
  showDomicilio: boolean
  setShowDomicilio: (show: boolean) => void
  domicilio: IDomicilio | null
}

export const DomicilioForm = ({ showDomicilio, setShowDomicilio, domicilio }: Props) => {
  const { register, setValue, formState: { errors } } = useFormContext<Domicilio>()

  const selectLocalidad = (localidad: ILocalidad) => setValue('localidad_id', localidad.id)

  const { 
    paises,
    provincias,
    departamentos,
    barrios,
    handleSearch,
    getProvinciasByPais,
    getDepartamentosByProvincia,
    getBarriosByDepartamento
  } = useDomicilio({ selectLocalidad })

  const initLoading = async () => {
    if(!domicilio) return
    await getProvinciasByPais(domicilio?.pais_id)
    await getDepartamentosByProvincia(domicilio?.provincia_id)
    await getBarriosByDepartamento(domicilio?.localidad)
  }

  useEffect(() => {
    initLoading()
  }, [])
  
  return (
    <>
      {
        !showDomicilio 
          ? <Button className='my-2' type='button' color="gray" onClick={() => setShowDomicilio(!showDomicilio)} >Mostrar Domicilio</Button>
          : (
            <div>
              <div className='my-4 titulos rounded-md py-2 text-center'>
                <h3 className='text-xl font-semibold text-white'>
                    Datos de Domicilio
                </h3>
              </div>

              <div className='grid md:grid-cols-2 gap-4 grid-cols-1'>
                <div className='mb-4'>
                  <div className='mb-2 block dark:text-white'>
                    <Label htmlFor='pais_id' value='Pais' /><strong className='obligatorio'>(*)</strong>
                  </div>

                  <Select 
                    {...register('pais_id')}
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
                    <Label htmlFor='provincia_id' value='Provincia' /><strong className='obligatorio'>(*)</strong>
                  </div>

                  <Select 
                    {...register('provincia_id')}
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
                    {...register('departamento_id')}
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

                <SearchInput<ILocalidad>
                  label="Localidad"
                  placeholder="Buscar localidad"
                  onSearch={handleSearch}
                  onSelect={(item: ILocalidad) => getBarriosByDepartamento(item)}
                  renderItem={(item) => (
                    <div><strong>{item.nombre}</strong> - CP. {item.codigo_postal}</div>
                  )}
                  renderInput={(item) => { return `${item.nombre} - CP. ${item.codigo_postal}`} }
                />

                <div className='mb-4'>
                  <div className='mb-2 block dark:text-white'>
                    <Label htmlFor='barrio_id' value='Barrio' />
                  </div>

                  <Select 
                    {...register('barrio_id')}
                    helperText={errors?.barrio_id && errors?.barrio_id?.message} 
                    color={errors?.barrio_id && 'failure'}
                  >
                    <option value=''>Seleccione un barrio</option>
                    {barrios?.map((barrio: IBarrio) => (
                      <option key={barrio.id} value={barrio.id}>
                        {barrio.nombre}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className='mb-4'>
                  <div className='mb-2 block dark:text-white'>
                    <Label color='gray' htmlFor='calle' value='Calle' /><strong className='obligatorio'>(*)</strong>
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
            </div>
          )
      }
    </>
  )
}
