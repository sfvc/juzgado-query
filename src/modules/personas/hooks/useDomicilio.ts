import { useState } from 'react'
import { IBarrio, IDepartamento, ILocalidad, IProvincia } from '../../parametros/localizacion/interfaces/localizacion'
import { useQuery } from '@tanstack/react-query'
import { barrioActions, departamentoActions, localidadActions, paisActions, provinciaActions } from '../../parametros/localizacion'

export interface Props {
  selectLocalidad: (localidad: ILocalidad) => void
}

export const useDomicilio = ({ selectLocalidad }: Props) => {
  const [provincias, setProvincias] = useState<IProvincia[]>([])
  const [departamentos, setDepartamentos] = useState<IDepartamento[]>([])
  const [barrios, setBarrios] = useState<IBarrio[]>([])

  const { data: paises } = useQuery({
    queryKey: ['paises', 'all'], 
    queryFn: paisActions.getAllPaises,  
    staleTime: 1000 * 60 * 5, 
  })

  const getProvinciasByPais = async (id: number | null) => {
    if (!id) return 
    const data: IProvincia[] = await provinciaActions.getProvinciasByPais(id)
    setProvincias(data)
  }

  const getDepartamentosByProvincia = async (id: number | null) => {
    if (!id) return 
    const data: IDepartamento[] = await departamentoActions.getDepartamentosByProvincia(id)
    setDepartamentos(data)
  }

  // Buscardor de localidades
  const handleSearch = async (query: string) => localidadActions.getLocalidadesByFilter(query)

  const getBarriosByDepartamento = async (localidad: ILocalidad | null) => {
    if (!localidad) return 
    
    selectLocalidad(localidad)
    const data: IBarrio[] = await barrioActions.getBarriosByLocalidades(localidad.id)
    setBarrios(data)
  }

  return {
    paises,
    provincias,
    departamentos,
    barrios,

    // Funciones
    getProvinciasByPais,
    getDepartamentosByProvincia,
    handleSearch,
    getBarriosByDepartamento
  }
}
