import type {UNIDADMEDIDA} from '@/lib/types'
export interface CreateProductoDto {
    cantidad: number,
    sucursal: string,
    nombre: string,
    descripcion: string | null,
    unidadMedida: UNIDADMEDIDA,
    precio: number,
    estatus: boolean
}

export interface GetByIdProducto {
    id: number
}

