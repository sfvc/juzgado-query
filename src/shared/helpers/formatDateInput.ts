export const formatDateInput  = (date: string | undefined) => {
  if(!date) return ''
  const [day, month, year] = date.split('/')
  return `${year}-${month}-${day}`
}