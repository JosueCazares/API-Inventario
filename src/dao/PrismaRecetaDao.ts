import {prisma} from '@/db/index'
import type {Receta} from '@/lib/types'

interface Producto {
  id: number;
}

interface RecetaWithProducto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  nombre: string;
  descripcion: string | null;
  cantidad: number;
  producto: Producto[];
}

export class PrismaRecetaDao {
  async getAllReceta(): Promise<Receta[]> {
    return await prisma.receta.findMany()
  }

  async getById(id: number): Promise<RecetaWithProducto | null> {
    return await prisma.receta.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        nombre: true,
        descripcion: true,
        cantidad: true,
        producto: {
          select: {
            id: true
          }
        }
      }
    });
  }

  async create(recetaData:Omit<Receta, 'id' | 'createdAt' | 'updatedAt'>): Promise<Receta> {
    return await prisma.receta.create({
      data: recetaData
    })
  }
}