 import type{
    Inventario,
    Producto,
    UNIDADMEDIDA
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
    UNIDADMEDIDA
}