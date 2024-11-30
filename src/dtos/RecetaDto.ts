
export interface CreateRecetaDto {
    nombre: string,
    descripcion: string | null,
    cantidad: number,
    productos: RecetaProductoDto[]
}

export interface RecetaProductoDto {
    producto_Id: number,
    cantidad: number,
    receta_Id: number
}
export type RecetaProductoCreateDto ={
    producto_Id: number,
    cantidad: number
}

