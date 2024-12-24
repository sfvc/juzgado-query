import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { apiJuzgado } from '../../../api/config'
import { departamentoActions, paisActions, provinciaActions } from '../../parametros/localizacion'
import type { IBarrio, IDepartamento, ILocalidad, IProvincia } from '../../parametros/localizacion/interfaces/localizacion'


export const useDomicilio = () => {
  const [provincias, setProvincias] = useState<IProvincia[]>([])
  const [departamentos, setDepartamentos] = useState<IDepartamento[]>([])

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

  const getLocalidades = async (query: string): Promise<ILocalidad[]> => {
    const response = await apiJuzgado.get(`localidades?query=${query}`)
    const { data } = response.data
    return data
  }

  const getBarrios = async (query: string): Promise<IBarrio[]> => {
    const response = await apiJuzgado.get(`barrios?query=${query}`)
    const { data } = response.data
    return data
  }

  return {
    paises,
    provincias,
    departamentos,

    // Funciones
    getBarrios,
    getLocalidades,
    getProvinciasByPais,
    getDepartamentosByProvincia
  }
}
