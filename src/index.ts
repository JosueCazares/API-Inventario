import { app } from './serve';
import {env} from './env'
//routes register
import {router as invetario} from '@/routes/inventario'
import {router as producto} from '@/routes/producto'
import {router as receta} from '@/routes/receta'
import {router as recetaProd} from '@/routes/recetaProd'
import {router as produccion} from '@/routes/produccion'

app.use('/api/inventario',invetario)
app.use('/api/producto',producto)
app.use('/api/receta',receta)
app.use('/api/recetaProd',recetaProd)
app.use('/api/produccion',produccion)



app.listen(env.PORT, () => {
    console.log(`API-Invetario  started on port ${env.PORT}`);
})