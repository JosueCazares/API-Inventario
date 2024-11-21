import type { Inventario } from "@prisma/client";

export class InventarioViewModel {
    static toDto(inventario: Partial<Inventario>): InventarioViewModel  {
        return{
            id: inventario.id,
            fecha_Creacion: inventario.createdAt,
            cantidad: inventario.cantidad,            
            prducto_Id: inventario.producto_Id
        }
    }
}