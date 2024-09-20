export interface IPais {
  id: number
  nombre: string
}

export interface FormPais {
  nombre: string
}

export interface IProvincia {
  id: number
  nombre: string
  pais: IPais | null
}

export interface FormProvincia {
  nombre: string
  pais_id: string
}

export interface IDepartamento {
  id: number
  nombre: string
  provincia: IProvincia | null
}

export interface FormDepartamento {
  nombre: string
  provincia_id: string
}