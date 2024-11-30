import {prisma} from '@/db/index'
import type {RecetaProducto} from '@/lib/types'

export class PrismaRecetaProductoDao {
  async getAllRecetaProd(): Promise<RecetaProducto[]> {
    return await prisma.recetaProducto.findMany()
  }
  async getRecetaById(receta_Id: number): Promise<RecetaProducto[]> {
    return await prisma.recetaProducto.findMany({
      where:{
        receta_Id: receta_Id
      }
    })

  }

  //METODO PARA OBTENER LA CANTIDA DDE PRODUCTOS DE UNA RECETA POR EL ID DEL PRODUCTO
  async getCantityByProducctId(productoId:number): Promise<RecetaProducto | null> {
    return await prisma.recetaProducto.findFirst({
      where:{
        producto_Id: productoId
      }
    })
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