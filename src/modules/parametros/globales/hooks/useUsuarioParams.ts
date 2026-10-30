import { useQuery } from '@tanstack/react-query'
import { usuarioActions } from '..'

const fetchRolesAndJuzgados = async () => {
  const data = await Promise.all([
    usuarioActions.getRoles(),
    usuarioActions.getJuzgados()
  ])

  return {
    roles : data[0],
    juzgados: data[1]
  }
}

export const useUsuarioParams = () => {

  const { data, isLoading } = useQuery({
    queryKey: ['usuarios-data'],
    queryFn: fetchRolesAndJuzgados,
  })

  return {
    data,
    isLoading
  }
}
