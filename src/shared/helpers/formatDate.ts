export const formatDate = (dateString: string): string => {
  if (!dateString) return '-'
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

const pad = (n: number | string) => String(n).padStart(2, '0')

/**
 * Devuelve cualquier fecha en formato DD/MM/YYYY (para las plantillas y reportes).
 * Acepta YYYY-MM-DD, DD-MM-YYYY, DD/MM/YYYY y fechas con hora (ISO o 'YYYY-MM-DD HH:mm:ss').
 * Si no hay fecha devuelve '' y si no la reconoce la devuelve sin cambios.
 */
export const formatDateDMY = (value?: string | null): string => {
  if (!value) return ''
  const text = value.trim()

  // DD-MM-YYYY o DD/MM/YYYY
  const dmy = text.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})/)
  if (dmy) return `${pad(dmy[1])}/${pad(dmy[2])}/${dmy[3]}`

  // YYYY-MM-DD, con o sin hora
  const ymd = text.match(/^(\d{4})-(\d{2})-(\d{2})(.*)$/)
  if (ymd) {
    // Con zona horaria (Z o +hh:mm) se pasa a la hora local para no correr el dia
    if (/[zZ]$|[+-]\d{2}:?\d{2}$/.test(ymd[4])) {
      const local = new Date(text)
      if (!isNaN(local.getTime())) return `${pad(local.getDate())}/${pad(local.getMonth() + 1)}/${local.getFullYear()}`
    }
    return `${ymd[3]}/${ymd[2]}/${ymd[1]}`
  }

  return text
}
