import {prisma} from '@/db/index'
import type {Produccion} from '@/lib/types'
import {ProduccionViewModel} from '@/viewModel/ProduccionViewModel'

export class PrismaProduccionDao {
  //metodo para retorno de produccion sin receta
  async getAllProduccion(): Promise<Produccion[]> {
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

  async getById(id:number): Promise<Produccion | null> {
    return await prisma.produccion.findUnique({
      where:{
        id:id
      }
    })
  }
  //metodo para retorno de produccion sin receta
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

  async getAllPublic(): Promise<ProduccionViewModel[]>{
    let producccion = await  prisma.produccion.findMany({
      include:{
        receta:{
          select:{
            nombre:true,
            
          }
        }
      }
    })
    const produccionDto = producccion.map((produccion)=>ProduccionViewModel.toDto(produccion))
    return produccionDto;
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