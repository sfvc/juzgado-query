export const clearNames = (apellido: string | undefined, nombre: string| undefined ) => {
  let string: string = ''
  
  if(!apellido && !nombre) return 'SIN DATOS'

  if (nombre === apellido) string = apellido!
  else string = `${apellido} ${nombre}`

  return string
}
  