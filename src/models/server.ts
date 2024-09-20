import express, { Application, Request, Response } from 'express';
import routesProducto from '../routes/producto';
import db from '../db/connection';
import cors from 'cors';
class server{
    private app: express.Application;
    private port:string;
    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midleWares();
        this.routes();
        this.dbConnection();
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Aplicación corriendo en el puerto ${this.port}` )
        });
    }

    routes(){
        this.app.get('/',(req: Request, res: Response) =>{
            res.json({
                msg: 'API working'
            })
        });

        this.app.use('/api/productos', routesProducto);
    }

    midleWares(){
        //parseamos el body
        this.app.use(express.json());

        //cors
        this.app.use(cors());
    }

    async dbConnection(){
        try{
            await db.authenticate();
            console.log('Base de datos conectada');
        }catch(error){
            console.log(error);
            console.log('Error al conectarse a la base de datos');
        }
    }
}

export default server;