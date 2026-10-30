import { useQueryClient } from '@tanstack/react-query'

/**
 * Raices de queryKey que se deben refrescar cuando cambia un recurso.
 * Incluye las listas propias, los selects ("-data", "all") y las pantallas que
 * muestran datos del recurso embebidos (por ejemplo actas con sus articulos).
 */
export const QUERY_GROUPS = {
  articulos: ['articulos', 'articulos-data', 'actas', 'acta', 'acta-actuacion'],
  estados: ['estados', 'estados-actas', 'estados-acta', 'actas', 'acta'],
  propiedades: ['propiedades', 'actas', 'acta'],
  rubros: ['rubros', 'actas', 'acta'],
  juzgados: ['juzgados', 'usuarios', 'usuarios-data', 'usuarios-sin-paginar', 'actas', 'acta'],
  unidades: ['unidades', 'actas', 'acta', 'acta-actuacion', 'recaudacion', 'dashboard'],
  usuarios: ['usuarios', 'usuarios-data', 'usuarios-sin-paginar', 'auditoria'],
  localizacion: ['paises', 'provincias', 'departamentos', 'localidades', 'barrios', 'nacionalidades', 'personas', 'personas-data'],
  personas: ['personas', 'personas-data', 'actas', 'acta', 'acta-actuacion', 'antecedente', 'antecedentes', 'vehiculos'],
  vehiculos: ['vehiculos', 'vehiculos-data', 'actas', 'acta'],
  plantillas: ['plantillas', 'acta-actuacion', 'acta-notificacion', 'history'],
  inhabilitados: ['inhabilitados', 'inhabilitado-history']
} as const

export type QueryGroup = keyof typeof QUERY_GROUPS | 'all'

export const useInvalidate = () => {
  const queryClient = useQueryClient()

  // Marca como desactualizadas las queries del grupo. Las que estan en pantalla se refrescan
  // al instante y el resto se vuelve a pedir la proxima vez que se usen. No borra la cache.
  return (group: QueryGroup) => {
    if (group === 'all') return queryClient.invalidateQueries()

    const roots: readonly string[] = QUERY_GROUPS[group]
    return queryClient.invalidateQueries({
      predicate: (query) => roots.includes(String(query.queryKey[0]))
    })
  }
}
