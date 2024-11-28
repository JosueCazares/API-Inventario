import type{ Receta} from '@prisma/client'
import type {CreateRecetaDto,RecetaProductoDto} from '@/dtos/RecetaDto'
import {ZodRecetaObj} from '@/validation/ZodReceta'
import {z, type ZodIssue} from 'zod'
import {PrismaRecetaDao} from '@/dao/PrismaRecetaDao'
import {PrismaRecetaProductoDao} from '@/dao/PrismaRecetaProducto'
import {PrismaProductoDao} from '@/dao/PrismaProductoDao'
import {CustomError} from '@/errors/CustomError'

const recetaDao = new PrismaRecetaDao()
const recetaProductoDao = new PrismaRecetaProductoDao()
const productoDao = new PrismaProductoDao()

export class createProductoCommand{
    async execute(data: CreateRecetaDto): Promise<Receta>{
        const dataValidate = ZodRecetaObj.parse(data)

        if(!dataValidate){
            throw new z.ZodError(dataValidate)
        }

        const productosId = dataValidate.productos.map((producto) => producto.producto_Id);
        for(const productoId of productosId){
            const producto = await productoDao.getById(productoId)
            if(!producto){
                throw new CustomError(`Producto con id ${productoId} no encontrado`, 404)
            }
        }

        const newReceta = await recetaDao.create({
            nombre: dataValidate.nombre,
            descripcion: dataValidate.descripcion,
            cantidad: dataValidate.cantidad,
        })

        const productosToCreate: RecetaProductoDto[] = dataValidate.productos.map((producto) => ({
            receta_Id: newReceta.id,
            producto_Id: producto.producto_Id,
            cantidad: producto.cantidad,
          }));

        await recetaProductoDao.createMany(productosToCreate)

      return newReceta

    }
}