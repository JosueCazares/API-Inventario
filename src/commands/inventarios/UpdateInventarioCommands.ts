import {type Inventario} from '@prisma/client'
import type {UpdateInventarioDto} from '@/dtos/InventarioDto'
import {ZodInventarioObjUpdate} from '@/validation/ZodInventario'
import {z, type ZodIssue} from 'zod'
import {PrismaInventarioDao} from '@/dao/PrismaInventarioDao'
import {CustomError} from '@/errors/CustomError'


const inventarioDao = new PrismaInventarioDao()

export class updateInventarioCommand{
    async execute(data: UpdateInventarioDto): Promise<Inventario>{
        const dataValidate = ZodInventarioObjUpdate.parse(data)

        const findProduct =  await inventarioDao.getByIdProducto(dataValidate.idInventario);
        if(!findProduct){
            throw new CustomError(`Producto con id:${dataValidate.idInventario} no encontrado`, 404)
        }

        return await inventarioDao.update(dataValidate.idInventario,dataValidate.cantidad)

    }
}