 import type{
    Inventario,
    Producto,
    UNIDADMEDIDA,
    Receta,
    RecetaProducto,
    Produccion,
    Venta,
    DetalleVenta,
    ESTADOPROD
} from '@prisma/client'; 

export type APIResponse<T> = {
    status: 'success' | 'error',
    data?: T,
    jwt?: string,
    error?: unknown
}

/* export interface LoginResponseData {
    rol: string;
    id: string;
    username: string;
} */

export type{
    Inventario,
    Producto,
    UNIDADMEDIDA,
    Receta,
    RecetaProducto,
    Produccion,
    Venta,
    DetalleVenta,
    ESTADOPROD
}