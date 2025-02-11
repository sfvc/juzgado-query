export const numberToWords = (num: number): string => {
  if (num === 0) return 'cero'

  const units = [
    '', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'
  ]

  const teens = [
    'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'
  ]

  const tens = [
    '', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'
  ]

  const hundreds = [
    '', 'cien', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 
    'seiscientos', 'setecientos', 'ochocientos', 'novecientos'
  ]

  const getUnits = (num: number): string => {
    return units[num]
  }

  const getTens = (num: number): string => {
    if (num < 10) return getUnits(num)
    if (num < 20) return teens[num - 10]
    const ten = Math.floor(num / 10)
    const unit = num % 10
    return tens[ten] + (unit > 0 ? ' y ' + getUnits(unit) : '')
  }

  const getHundreds = (num: number): string => {
    if (num < 100) return getTens(num)
    const hundred = Math.floor(num / 100)
    const remainder = num % 100
    if (hundred === 1 && remainder === 0) return 'cien'
    return hundreds[hundred] + (remainder > 0 ? ' ' + getTens(remainder) : '')
  }

  const getThousands = (num: number): string => {
    if (num < 1000) return getHundreds(num)
    const thousand = Math.floor(num / 1000)
    const remainder = num % 1000
    const thousandText = thousand === 1 ? 'mil' : getHundreds(thousand) + ' mil'
    return thousandText + (remainder > 0 ? ' ' + getHundreds(remainder) : '')
  }

  const getMillions = (num: number): string => {
    if (num < 1000000) return getThousands(num)
    const million = Math.floor(num / 1000000)
    const remainder = num % 1000000
    const millionText = million === 1 ? 'un millón' : getThousands(million) + ' millones'
    return millionText + (remainder > 0 ? ' ' + getThousands(remainder) : '')
  }

  return getMillions(num)
}
