import express from 'express';
import type { Express, Response } from 'express';
import cors from 'cors';
import { env } from './env';


export const app: Express = express();

app.use(express.json())

//use cors
// define whitelist from env
const whitelist = env.DOMAIN_WHITELIST.split(',');
//loop to whitelist to ensure request domain is on whitelist
app.use(cors({
    origin: function (origin, callback) {
        // !origin when origin is undefined (ie. browser, same origin, server to server or REST Tools) please remove it in production depending on use case
        if (whitelist.indexOf(origin as string) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    
    }
}));

//health check
app.get('/', (_, res: Response) => {
    res.json({
        status: 'ok',
        message: 'API-USER is up and running!'
    });
});