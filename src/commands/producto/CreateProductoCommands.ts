import type{ Producto,Inventario} from '@prisma/client'
import type {CreateProductoDto} from '@/dtos/ProductoDtos'
import {ZodProductoObj} from '@/validation/ZodProducto'
import {z, type ZodIssue} from 'zod'
import {PrismaProductoDao} from '@/dao/PrismaProductoDao'
import {PrismaInventarioDao} from '@/dao/PrismaInventarioDao'

const productoDao = new PrismaProductoDao()
const inventarioDao = new PrismaInventarioDao()

export class createProductoCommand{
    async execute(data: CreateProductoDto): Promise<{producto:Producto,inventario:Inventario}>{
        const dataValidate = ZodProductoObj.parse(data)

        if(!dataValidate){
            throw new z.ZodError(dataValidate)
        }

        const newPorduct =  await productoDao.create({
            nombre: dataValidate.nombre,
            descripcion: dataValidate.descripcion,
            unidadMedida: dataValidate.unidadMedida,
            precio: dataValidate.precio,
            cantidad: dataValidate.cantidad,
            sucursal: dataValidate.sucursal,
            estatus: dataValidate.estatus,
            tipo: dataValidate.tipo
        })

        const newInventario = await inventarioDao.create({
            producto_Id: newPorduct.id,
            cantidad: newPorduct.cantidad,
        })

        return {producto: newPorduct, inventario: newInventario}

    }
}