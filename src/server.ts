import express, { Application, Request, Response } from "express";
import { dbConection } from "./database/conection";
import clienteRouter from "./controllers/models/routers/clienteRouter";
import usuarioRouter from "./controllers/models/routers/usuarioRouter";
import autenRouter from "./controllers/models/routers/autenRouter";
import servicioRouter from "./controllers/models/routers/servicioRouter";
import cors from "cors";


class Server {
    private app: Application;
    private port: string;
    private apiPaths ={
        cliente: "/api/v1/cliente",
        usuario: "/api/v1/usuario",
        auten: "/api/v1/auten",
        servicio: "/api/v1/servicio",

    };


    constructor(){
        this.app = express();
        this.port = process.env.PORT || "3000";
        dbConection();
        this.miPriemeraApi();
        this.middlewares();
        this.routers();

    }
    //metodo 
    miPriemeraApi(){
        this.app.get("/",(req:Request, res:Response)=>
        res.status(200).json({msg: "informacion"})
        );

    }
    
    middlewares(){
        //dar permisos para que cualquier dominio use la api
        this.app.use(cors())
        //lectura del body lo q=combierta en body
        this.app.use(express.json());

        this.miPriemeraApi();
    }
    routers(): void{
        this.app.use(this.apiPaths.cliente, clienteRouter)
        this.app.use(this.apiPaths.usuario, usuarioRouter)
        this.app.use(this.apiPaths.auten, autenRouter)
        this.app.use(this.apiPaths.servicio, servicioRouter)


    }

    //fuction
    listen(): void{
        this.app.listen(this.port,() =>{
            console.log("servidor corriendo en el puerto",this.port)
        })

    }
}
export default Server;