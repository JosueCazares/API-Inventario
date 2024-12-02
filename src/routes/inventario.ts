import {Router} from 'express'
import {getAllInvetario,createInventario,getInvetarioById,updateInventario} from '@/controller/InventarioController'
export const router = Router()
//ENDPOINT QUE OBTIENE TODO EL INVENTARIO
router.get('/',getAllInvetario)

router.post('/',createInventario)

router.post('/ById',getInvetarioById)

router.put('/',updateInventario)