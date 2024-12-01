import {prisma} from '@/db/index'
import type {Venta} from '@/lib/types'

export class PrismaVentaDao {
  async getAllVenta(): Promise<Venta[]> {
    return await prisma.venta.findMany()
  }

  async create(data: Omit<Venta, 'id'|'createdAt'|'updatedAt'>): Promise<Venta> {
    return await prisma.venta.create({
      data: data
    })
  }

}