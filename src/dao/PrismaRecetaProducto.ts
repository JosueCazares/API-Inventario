import {prisma} from '@/db/index'
import type {RecetaProducto} from '@/lib/types'

export class PrismaRecetaProductoDao {
  async getAllRecetaProd(): Promise<RecetaProducto[]> {
    return await prisma.recetaProducto.findMany()
  }
  
  async create(recetaData:Omit<RecetaProducto, 'id' | 'createdAt' | 'updatedAt'>): Promise<RecetaProducto> {
    return await prisma.recetaProducto.create({
      data: recetaData
    })
  }

  async createMany(productos: { receta_Id: number; producto_Id: number; cantidad: number }[]) {
    return prisma.recetaProducto.createMany({
      data: productos,
    });
  }
}