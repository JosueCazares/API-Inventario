import {prisma} from '@/db/index'
import type {Produccion} from '@/lib/types'

export class PrismaProduccionDao {
  async getAllProduccion(): Promise<Produccion[]> {
    return await prisma.produccion.findMany()
  }

  async getById(id:number): Promise<Produccion | null> {
    return await prisma.produccion.findUnique({
      where:{
        id:id
      }
    })
  }
  


  async getAllProReceta(): Promise<Produccion[]> {
    return await prisma.produccion.findMany({
      include:{
        receta:{
          select:{
            nombre:true,
            
          }
        }
      }
    })
  }
  

  async create(produccionData: Omit<Produccion, 'id' | 'createdAt' | 'updatedAt'>): Promise<Produccion> {
    return await prisma.produccion.create({
      data: produccionData
    })
  }

  async update(id:number,produccionData: Omit<Produccion, 'id' | 'createdAt' | 'updatedAt' | 'fecha_inicio' | 'receta_Id'>): Promise<Produccion> {
    return await prisma.produccion.update({
      where:{
        id:id
      },
      data: produccionData
    })
  }
  
}