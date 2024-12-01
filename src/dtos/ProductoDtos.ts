import type {UNIDADMEDIDA,TIPOPRODUCTO} from '@/lib/types'
export interface CreateProductoDto {
    cantidad: number,
    sucursal: string,
    nombre: string,
    descripcion: string | null,
    unidadMedida: UNIDADMEDIDA,
    precio: number,
    estatus: boolean,
    tipo: TIPOPRODUCTO
}

export interface GetByIdProducto {
    id: number
}

