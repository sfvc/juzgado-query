export interface IConducta {
    id?: number
    conducta: string
    valor_desde: number
    valor_hasta: number
}

export interface IArticulo {
    id: number
    numero: number
    detalle: string
    conducta: string
    conductas?: IConducta[]
    inciso: string | null
    tipo_acta: string
    tipo_infraccion: string
    norma_legal: string
    descuento: number
    valor_desde: number
    valor_hasta: number
}

export interface FormArticulo {
    numero?: string
    detalle: string
    conductas?: IConducta[]
    inciso?: string
    tipo_acta?: string
    tipo_infraccion?: string
    norma_legal?: string
    descuento?: number
    valor_desde?: number
    valor_hasta?: number
}

export interface IPropiedad {
    id: number
    matricula_catastral: string
    domicilio: string
    propietario: string
}

export interface FormPropiedad {
    matricula_catastral: string
    domicilio: string
    propietario: string
}

export interface IRubro {
    id: number
    nombre: string
}

export interface FormRubro {
    nombre: string
}

export interface IEstado {
    id: number
    nombre: string
    color: string
    descripcion: string
}

export interface FormEstado {
    nombre: string,
    color?: string
}
