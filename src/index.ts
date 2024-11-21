import { app } from './serve';
import {env} from './env'
//routes register




app.listen(env.PORT, () => {
    console.log(`API-Invetario  started on port ${env.PORT}`);
})