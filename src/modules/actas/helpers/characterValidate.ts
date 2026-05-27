import { ACTAS } from '../../../shared/constants'

const lettersTransito = /^[abcdgsp\d]*$/i
const lettersInspeccion = /^[i\d]*$/i
const lettersBromatologia = /^[b\d]*$/i
const lettersObras = /^[op\d]*$/i
const lettersPoliciaAmbiental = /^[pa\d]*$/i

export const characterValidate = (tipoActa: string, value: string) => {
  let numeroActa = ''

  switch (tipoActa) {
  case ACTAS.TRANSITO:
    numeroActa = lettersTransito.test(value) ? value : ''
    break

  case ACTAS.INSPECCION:
    numeroActa = lettersInspeccion.test(value) ? value : ''
    break

  case ACTAS.BROMATOLOGIA:
    numeroActa = lettersBromatologia.test(value) ? value : ''
    break

  case ACTAS.OBRAS_PARTICULARES:
    numeroActa = lettersObras.test(value) ? value : ''
    break

  case ACTAS.POLICIA_AMBIENTAL:
    numeroActa = lettersPoliciaAmbiental.test(value) ? value : ''
    break
  }

  return numeroActa
}
