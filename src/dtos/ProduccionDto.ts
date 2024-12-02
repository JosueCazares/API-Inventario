import type {ESTADOPROD} from '@/lib/types'

export interface CreateProduccionDto {
    fecha_Inicio: Date,
    fecha_Fin: Date,
    estado: ESTADOPROD,
    receta_Id: number,
}

export interface UpdateProduccionDto {
    fecha_Inicio: Date,
    fecha_Fin: Date,
    estado: ESTADOPROD,
    receta_Id: number,
}

