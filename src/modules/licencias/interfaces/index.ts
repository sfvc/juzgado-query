export interface ILicencia {
    id:              number;
    categoria:       string;
    fecha_retencion: string;
    fecha_entrega:   string;
    observaciones:   string;
    persona:         Persona;
    user:            User | null;
}

export interface Persona {
    id:                     number;
    nombre:                 string;
    apellido:               string;
    numero_documento:       number;
}

export interface User {
    id: number,
    username: string
}

export interface FormLicencia {
    categoria:       string;
    fecha_retencion: string;
    fecha_entrega:   string;
    observaciones:   string;
    persona_id:      number;
}

