export interface IArticulo {
    id: number
    numero: number
    detalle: string
    inciso: string | null
    tipo_acta: string
    tipo_infraccion: string
    norma_legal: string
    descuento: number
    valor_desde: number
    valor_hasta: number
}

export interface FormArticulo {
    numero: number
    detalle: string
    inciso: string
    tipo_acta: string
    tipo_infraccion: string
    norma_legal: string
    descuento: number
    valor_desde: number
    valor_hasta: number
}