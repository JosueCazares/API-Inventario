import {prisma} from '@/db/index'
import type {Inventario} from '@/lib/types'
import {InventarioViewModel} from '@/viewModel/InventarioViewModel'

export class PrismaInventarioDao {
  async getAllInventario(): Promise<Inventario[]> {
    return await prisma.inventario.findMany()
  }
  async getAllPublic(): Promise<InventarioViewModel[]> {
    let inventario = await prisma.inventario.findMany()
    const inventarioToDto = inventario.map((inventario) => InventarioViewModel.toDto(inventario))
    return inventarioToDto;
  }

  //SE PUSO EL ID COMO STRING POR QUE EN EL POSTMAN NO ME DEJABA MANDAR COMO NUMERO SOLO CADENA
  async getById(id:string): Promise<Inventario | null> {
    let newId = parseInt(id)
    return await prisma.inventario.findUnique({
        where:{
            id: newId
        }
    })
  }
}