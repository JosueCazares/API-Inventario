import type {DetalleVenta} from '@prisma/client'
import type{CreateVentaDto} from '@/dtos/VentaDto'
import type{CreateDetalleVentaDto} from '@/dtos/DetalleVentaDto'
import {ZodDetalleVentaObj} from '@/validation/ZodDetalleVenta'
import {z, type ZodIssue} from 'zod'
import {PrismaProductoDao} from '@/dao/PrismaProductoDao'
import {PrismaInventarioDao} from '@/dao/PrismaInventarioDao'
import {PrismaDetalleVentaDao} from '@/dao/PrismaDetalleVentaDao'
import {PrismaVentaDao} from '@/dao/PrismaVentaDao'
import {CustomError} from '@/errors/CustomError'


const productoDao = new PrismaProductoDao()
const invetarioDao = new PrismaInventarioDao()
const ventaDao = new PrismaVentaDao()
const detalleVentaDao = new PrismaDetalleVentaDao()


export class CreateDetalleVentaCommands {
    async execute(data: CreateDetalleVentaDto): Promise<DetalleVenta> {
        const dataValidate = ZodDetalleVentaObj.parse(data)

        //VERIFICACION DE EXISTENCIA DEL PRODUCTO
        const productFind = await productoDao.getById(dataValidate.producto_Id)

        if(!productFind){
            throw new CustomError('Producto no encontrado',404)
        }

        //VERIFICACION DE EXISTENCIA DE STOCK
        const productStock = await invetarioDao.getByIdProducto(dataValidate.producto_Id)
        if(!productStock || productStock.cantidad < dataValidate.cantidad){
            throw new CustomError('Producto sin existencias suficeintes',404)
        }

        //CREACION DE NUEVA VENTA
        const venta:CreateVentaDto={
            sucursal: dataValidate.sucursal,
            estado:dataValidate.estado,
            metodoPago:dataValidate.metodoPago,
        }
        const newVenta = await ventaDao.create(venta)
        //CREACION DE NUEVO DETALLE DE VENTA
        const detalleVenta:CreateDetalleVentaDto={
            producto_Id: dataValidate.producto_Id,
            venta_Id: newVenta.id,
            cantidad: dataValidate.cantidad,
            precio: dataValidate.precio
            
        }
        const newDetalleVenta = await detalleVentaDao.create(detalleVenta)
        //ACTUALIZACION DE STOCK
        await invetarioDao.reduceInventario(dataValidate.producto_Id,dataValidate.cantidad)

        return newDetalleVenta


    }
}