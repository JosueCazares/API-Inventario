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
  //ENDPOINT PARA BUSQUEDA DE INVENTARIO POR POR ID DEL PRODUCTO
  async getById(id:number): Promise<Inventario | null> {
    //let newId = parseInt(id)
    return await prisma.inventario.findFirst({
        where:{
            producto_Id: id
        }
    })
  }

  async getByIdProducto(id: number): Promise<Inventario | null> {
    return await prisma.inventario.findFirst({
      where:{
        producto_Id:id
      }
    })
  }

  async getByProductoId(id: number): Promise<Inventario | null> {
    return await prisma.inventario.findFirst({
      where:{
        producto:{
          id: id
        }
      }
    })
  }
  //METODO PARA REDUCRI EL INVENATIO, QUEDADRA OBSOLETOPOR QUE SE CAMBIARA A ELIMINACION DE INVENTARIO
  async reduceInventario(id: number, cantidad: number) {
    return  await prisma.inventario.updateMany({
     where: {producto_Id: id},
     data:{
        cantidad:{
          decrement: cantidad
        }
     }
    })
  }

  async delete(id:number){
    return await prisma.inventario.delete({
      where:{
        id:id
      }
    })
  }
  
  async create(inventarioData: Omit<Inventario, 'id' | 'createdAt' | 'updatedAt'>): Promise<Inventario> {
    return await prisma.inventario.create({
      data: inventarioData
    })
  }

  async update(id:number,cantidad:number): Promise<Inventario> {
    return await prisma.inventario.update({
     where:{
      id: id
     },
     data:{
      cantidad:{
        increment: cantidad
      }
     } 
    })
  }
}