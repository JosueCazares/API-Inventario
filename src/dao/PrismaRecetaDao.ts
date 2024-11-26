import {prisma} from '@/db/index'
import type {Receta} from '@/lib/types'

export class PrismaRecetaDao {
  async getAllReceta(): Promise<Receta[]> {
    return await prisma.receta.findMany()
  }
}