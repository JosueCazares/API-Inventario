import {type Inventario} from '@prisma/client'
import type {CreateInventarioDto} from '@/dtos/InventarioDto'
import {ZodInventarioObj} from '@/validation/ZodInventario'
import {z, type ZodIssue} from 'zod'
import {PrismaInventarioDao} from '@/dao/PrismaInventarioDao'

const inventarioDao = new PrismaInventarioDao()

export class createInventarioCommand{
    async execute(data: CreateInventarioDto): Promise<Inventario>{
        const dataValidate = ZodInventarioObj.parse(data)

        if(!dataValidate){
            throw new z.ZodError(dataValidate)
        }

        return await inventarioDao.create({
            cantidad: dataValidate.cantidad,
            producto_Id: dataValidate.producto_Id,
        })

    }
}