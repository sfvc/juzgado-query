export interface ILibreDeuda {
    id: number
    persona_nombre?: string
    persona_apellido?: string
    persona_numero_documento?: string
    vehiculo_dominio?: string
    vehiculo_cedula_frente?: string
    vehiculo_cedula_dorso?: string
    vehiculo_marbete?: string
    fecha?: string,
    verificado?: boolean
    titular?: string
    numero_libre_deuda?: string
    libre_deuda_id?: number
    persona_id?: number
    vehiculo_id?: number
    path_file?: string
}
