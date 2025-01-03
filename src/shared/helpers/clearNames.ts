export const clearNames = (apellido: string | undefined, nombre: string| undefined, blank?: boolean) => {
  let string: string = ''
  
  if(!apellido && !nombre) return blank ? '' : 'SIN DATOS'

  if (nombre === apellido) string = apellido!
  else string = `${apellido ? apellido : ''} ${nombre ? nombre : ''}`

  return string
}
  