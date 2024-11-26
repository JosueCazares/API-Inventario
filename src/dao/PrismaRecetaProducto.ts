import {prisma} from '@/db/index'
import type {RecetaProducto} from '@/lib/types'

export class PrismaRecetaProductoDao {
  async getAllRecetaProd(): Promise<RecetaProducto[]> {
    return await prisma.recetaProducto.findMany()
  }
}