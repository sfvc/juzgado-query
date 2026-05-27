export const clearNames = (
  apellidoOrFullName: string | undefined,
  nombre?: string | undefined,
  blank?: boolean
): string => {

  // Si no viene nada, devolvemos el fallback clásico
  if (!apellidoOrFullName && !nombre) return blank ? '' : '-'

  // CASO NUEVO: Viene un solo string largo con una coma (ej: "NAHUEL SORIA PARODI, NAHUEL SORIA PARODI")
  if (apellidoOrFullName && !nombre) {
    const parts = apellidoOrFullName.split(',').map(part => part.trim())

    // Si la primera mitad es exactamente igual a la segunda mitad, recortamos a la mitad
    if (parts.length === 2 && parts[0] === parts[1]) {
      return parts[0]
    }

    return apellidoOrFullName.trim()
  }

  // CASO ANTERIOR: Vienen apellido y nombre por separado
  let string: string = ''
  if (nombre === apellidoOrFullName) {
    string = apellidoOrFullName!
  } else {
    string = `${apellidoOrFullName ? apellidoOrFullName : ''} ${nombre ? nombre : ''}`
  }

  return string.trim()
}
