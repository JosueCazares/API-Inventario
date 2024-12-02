import type{ Produccion} from '@prisma/client'
import type {UpdateProduccionDto} from '@/dtos/ProduccionDto'
import {ZodProduccionObjUpdate} from '@/validation/ZodProduccion'
import {PrismaProduccionDao} from '@/dao/PrismaProduccionDao'
import {CustomError} from '@/errors/CustomError'

const produccionDao = new PrismaProduccionDao()

//COMMANDS PARA LAE CRECAION DE PORUDCCION OSE A GALLETAS, SRECUARDA EL ORDEN DE CHECAR LA EXISTENCIA DE INVENRAIO
export class updateProduccionCommand{
    async execute(data: UpdateProduccionDto): Promise<Produccion>{
        const dataValidate = ZodProduccionObjUpdate.parse(data)

        //VERIFICAR EXISTENCIA DE PRODUCCION

        const findProduccion = await produccionDao.getById(dataValidate.id)
        
        if(!findProduccion){
            throw new CustomError(`Produccion con id: ${dataValidate.id} no encontrada`,404)
        }

        return await produccionDao.update(dataValidate.id,{
            estado: dataValidate.estado,
            fecha_fin: new Date(dataValidate.fechaFin),
        })
    
    }
}