import {type Inventario} from '@prisma/client'
import type {GetByIdInventario} from '@/dtos/InventarioDto'
import {ZodInventarioIdObj} from '@/validation/ZodInventario'
import {z, type ZodIssue} from 'zod'
import {PrismaInventarioDao} from '@/dao/PrismaInventarioDao'

const inventarioDao = new PrismaInventarioDao()

export class GetByIdInventarioCommand{
    async execute(data: GetByIdInventario): Promise<Inventario>{
        const dataValidate = ZodInventarioIdObj.parse(data)

        if(!dataValidate){
            throw new z.ZodError(dataValidate)
        }
        const inventario = await inventarioDao.getById(dataValidate.id)

        if(!inventario){
            throw new Error("Inventario no encontrado")
        }
        return inventario

    }
}