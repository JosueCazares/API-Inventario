import type {Producto} from '@prisma/client'

export class ProductoViewModel {
    static toDto(producto: Partial<Producto>): ProductoViewModel  {
        return{
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            unidadMedida: producto.unidadMedida,
            precio: producto.precio,
            cantidad: producto.cantidad,
            sucursal: producto.sucursal,
            estatus: producto.estatus,
            tipo: producto.tipo
        }
    }
}