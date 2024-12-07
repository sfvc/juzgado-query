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

export interface ILocalidad {
  id: number
  nombre: string
  codigo_postal: string
  departamento_id?: number | null
  provincia_id?: number | null
  departamento: IDepartamento | null
}

export interface FormLocalidad {
  nombre: string
  departamento_id: string
}

export interface IBarrio {
  id: number
  nombre: string
  localidad: ILocalidad | null
}

export interface FormBarrio {
  nombre: string
  localidad_id: string
}

export interface INacionalidad {
  id: number
  nombre: string
}

export interface FormNacionalidad {
  nombre: string
}