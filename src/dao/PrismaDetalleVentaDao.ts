import {prisma} from '@/db/index'
import type {DetalleVenta} from '@/lib/types'

export class PrismaDetalleVentaDao {
  async getAllDetalleVenta(): Promise<DetalleVenta[]> {
    return await prisma.detalleVenta.findMany()
  }
}