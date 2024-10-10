import { useQuery } from '@tanstack/react-query'
import { Button, Label, Select, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { departamentoActions, localidadActions, paisActions, provinciaActions } from '../../parametros/localizacion'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { IDomicilio, PersonaHumana } from '../interfaces'
import { IBarrio, IDepartamento, ILocalidad, IPais, IProvincia } from '../../parametros/localizacion/interfaces/localizacion'
import { SearchInput } from '../../../shared/components/SearchInput'

export interface Props {
    register: UseFormRegister<PersonaHumana>
    errors: FieldErrors<PersonaHumana>
    showDomicilio: boolean
    setShowDomicilio: (show: boolean) => void
    selectLocalidad: (localidad: ILocalidad) => void
    domicilio: IDomicilio | null
  }

export const DomicilioForm = ({ register, errors, showDomicilio, setShowDomicilio, selectLocalidad, domicilio }: Props) => {
  const [provincias, setProvincias] = useState<IProvincia[]>([])
  const [departamentos, setDepartamentos] = useState<IDepartamento[]>([])
  const [barrios, setBarrios] = useState<IBarrio[]>([])

  const { data: paises } = useQuery({
    queryKey: ['paises', 'all'], 
    queryFn: paisActions.getAllPaises,  
    staleTime: 1000 * 60 * 5, 
  })

  const getProvinciasByPais = async (id: number) => {
    if (!id) return 
    const data: IProvincia[] = await provinciaActions.getProvinciasByPais(id)
    setProvincias(data)
  }

  const getDepartamentosByProvincia = async (id: number) => {
    if(!id) return 
    const data: IDepartamento[] = await departamentoActions.getDepartamentosByProvincia(id)
    setDepartamentos(data)
  }

  // Buscardor de localidades
  const handleSearch = async (query: string) => localidadActions.getLocalidadesByFilter(query)

  useEffect(() => {
    if(domicilio) {
      getDepartamentosByProvincia(domicilio.provincia_id!)
    }
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
                    {...register('domicilio.pais_id')}
                    helperText={errors?.domicilio?.pais_id && errors?.domicilio?.pais_id?.message} 
                    color={errors?.domicilio?.pais_id && 'failure'}
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
                    {...register('domicilio.provincia_id')}
                    helperText={errors?.domicilio?.provincia_id && errors?.domicilio?.provincia_id?.message} 
                    color={errors?.domicilio?.provincia_id && 'failure'}
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
                    {...register('domicilio.departamento_id')}
                    helperText={errors?.domicilio?.departamento_id && errors?.domicilio?.departamento_id?.message} 
                    color={errors?.domicilio?.departamento_id && 'failure'}
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
                  onSelect={selectLocalidad}
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
                    {...register('domicilio.barrio_id')}
                    helperText={errors?.domicilio?.barrio_id && errors?.domicilio?.barrio_id?.message} 
                    color={errors?.domicilio?.barrio_id && 'failure'}
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
                    {...register('domicilio.calle')}
                    helperText={errors?.domicilio?.calle && errors?.domicilio?.calle?.message} 
                    color={errors?.domicilio?.calle && 'failure'}
                    placeholder='Calle'
                  />
                </div>

                <div className='mb-4'>
                  <div className='mb-2 block dark:text-white'>
                    <Label htmlFor='numero' value='Número' />
                  </div>
                  <TextInput
                    {...register('domicilio.numero')}
                    helperText={errors?.domicilio?.numero && errors?.domicilio?.numero?.message} 
                    color={errors?.domicilio?.numero && 'failure'}
                    type='number'
                    placeholder='Numero'
                  />
                </div>

                <div className='mb-4'>
                  <div className='mb-2 block dark:text-white'>
                    <Label htmlFor='lote_dpto' value='Lote/Departamento' />
                  </div>
                  <TextInput
                    {...register('domicilio.lote_dpto')}
                    helperText={errors?.domicilio?.lote_dpto && errors?.domicilio?.lote_dpto?.message} 
                    color={errors?.domicilio?.lote_dpto && 'failure'}
                    placeholder='Departamento'
                  />
                </div>

                <div className='mb-4'>
                  <div className='mb-2 block dark:text-white'>
                    <Label htmlFor='manzana_piso' value='Manzana' />
                  </div>
                  <TextInput
                    {...register('domicilio.manzana_piso')}
                    helperText={errors?.domicilio?.manzana_piso && errors?.domicilio?.manzana_piso?.message} 
                    color={errors?.domicilio?.manzana_piso && 'failure'}
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
