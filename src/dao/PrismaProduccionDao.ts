import {prisma} from '@/db/index'
import type {Produccion} from '@/lib/types'

export class PrismaProduccionDao {
  async getAllProduccion(): Promise<Produccion[]> {
    return await prisma.produccion.findMany()
  }

  async create(produccionData: Omit<Produccion, 'id' | 'createdAt' | 'updatedAt'>): Promise<Produccion> {
    return await prisma.produccion.create({
      data: produccionData
    })
  }
  
}