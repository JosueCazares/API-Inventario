import {prisma} from '@/db/index'
import type {Producto} from '@/lib/types'
import {ProductoViewModel} from '@/viewModel/ProductoViewModel'

export class PrismaProductoDao {
  async getAllProducto(): Promise<Producto[]> {
    return await prisma.producto.findMany()
  }

  async getAllProductoTerminado(): Promise<Producto[]> {
    return await prisma.producto.findMany({
      where:{
        tipo:'PRODUCTO_TERMINADO'
      }
    })
  }
  async getAllPublic(): Promise<ProductoViewModel[]> {
    let producto = await prisma.producto.findMany()
    const productoToDto = producto.map((producto) => ProductoViewModel.toDto(producto))
    return productoToDto;
  }

  //SE PUSO EL ID COMO STRING POR QUE EN EL POSTMAN NO ME DEJABA MANDAR COMO NUMERO SOLO CADENA
  async getById(id:number): Promise<Producto | null> {
    return await prisma.producto.findFirst({
        where:{
            id: id
        }
    })
  }

    async getProductByIdProduccion(id:number): Promise<Producto | null> {
      return await prisma.producto.findFirst({
          where:{
              id: id,
              tipo:'PRODUCTO_TERMINADO'
          }
      })
    }

  async create(productoData: Omit<Producto, 'id' | 'createdAt' | 'updatedAt'>): Promise<Producto> {
    return await prisma.producto.create({
      data: productoData
    })
  }

  async update(id:string,productoData: Omit<Producto, 'id' | 'createdAt' | 'updatedAt'>): Promise<Producto> {
    let newId = parseInt(id)
    return await prisma.producto.update({
        where:{id:newId},
      data: productoData
    })
  }
  //METODO QUEDARA OBSOLETO POR QUE SE CAMBIARA A ELIMINACION DE PRODUCTO
  async reduceProducto(id: number, cantidad: number) {
    return  await prisma.producto.updateMany({
     where: {id: id},
     data:{
        cantidad:{
          decrement: cantidad
        }
     }
    })
  }

    async delete(id:number){
      return await prisma.producto.delete({
        where:{
          id:id
      }})
    }

}