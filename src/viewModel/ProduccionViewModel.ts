import type {Produccion} from '@prisma/client'

export class ProduccionViewModel{
    static toDto(produccion: Partial<Produccion> &{receta?:{nombre:string}}): ProduccionViewModel{
        return{
            folio:produccion.id,
            fecha:produccion.fecha_fin,
            estado:produccion.estado,
            nombre:produccion.receta?.nombre || null
        }
    }
}