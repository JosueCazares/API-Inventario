import {prisma} from '@/db/index'
import type {Venta} from '@/lib/types'

export class PrismaVentaDao {
  async getAllVenta(): Promise<Venta[]> {
    return await prisma.venta.findMany()
  }
}