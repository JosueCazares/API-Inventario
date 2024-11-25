import {type Producto} from '@prisma/client'
import type {CreateProductoDto} from '@/dtos/ProductoDtos'
import {ZodProductoObj} from '@/validation/ZodProducto'
import {z, type ZodIssue} from 'zod'
import {PrismaProductoDao} from '@/dao/PrismaProductoDao'

const productoDao = new PrismaProductoDao()

export class createProductoCommand{
    async execute(data: CreateProductoDto): Promise<Producto>{
        const dataValidate = ZodProductoObj.parse(data)

        if(!dataValidate){
            throw new z.ZodError(dataValidate)
        }

        return await productoDao.create({
            nombre: data.nombre,
            descripcion: data.descripcion,
            unidadMedida: data.unidadMedida,
            precio: data.precio,
            cantidad: data.cantidad,
            sucursal: data.sucursal,
            estatus: data.estatus
        })

    }
}