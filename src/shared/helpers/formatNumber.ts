export const soloNumeros = (e: React.FormEvent<HTMLInputElement>) => {
  const input = e.currentTarget
  input.value = input.value.replace(/[^\d]/g, '')
}
