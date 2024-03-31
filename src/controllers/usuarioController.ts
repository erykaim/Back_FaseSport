import { Request, Response } from "express";
import UsuarioModel from "./models/usuarioModel";
import bcrypt from "bcryptjs";

//get 
export const getUsuarios= async (req: Request, res: Response)=> {
    try {
        // buscar los usuarios
        const usuarios = await UsuarioModel.find();
        res.json({
            ok:true,
            usuarios,
        });

    } catch (error){
        res.status(400).json({
            ok:false,
            msg: 'error consultar los clientes',
        });
    }
};

//usuario uno solo 
export const getUnUsuarios = async (req: Request, res: Response)=> {
  
    try {
        
        const id = req.params.id;
       
        // buscar los usuarios uno solo con id
        const usuarios = await UsuarioModel.findById({ _id: id});
        res.json({
            ok:true,
            usuarios,
        });

    } catch (error){
        res.status(400).json({
            ok:false,
            msg: 'error consultar los usuarios',
        });
    }
};

//usuarios actualizar
export const updateusuarios = async (req: Request, res: Response)=> {
  
    try {
        // el id del usuario para filtrar y actualizar
        const id = req.params.id;

        //const body = req.body;//forma una de hacerlo

        const {body} = req // forma de estructuracion
       
        // buscar los usuarios uno solo con id
        const usuarioActualizado = await UsuarioModel.findByIdAndUpdate(id, body, { new: true,});
        res.json({
            ok:true,
            usuario: usuarioActualizado,
        });

    } catch (error){
        res.status(400).json({
            ok:false,
            msg: 'error consultar los usuarios',
        });
    }
};

//usuarios eliminar
export const deleteUsuarios = async (req: Request, res: Response)=> {
  
    try {
        // el id del usuario para filtrar y eliminar
        const id = req.params.id;

        //const body = req.body;//forma una de hacerlo

       
        // buscar los clientes uno solo con id
        const usuariodelete = await UsuarioModel.findByIdAndDelete( { _id:id});
        res.json({
            ok:true,
            msg: 'usuario eliminado',
            usuariodelete

        });

    } catch (error){
        res.status(400).json({
            ok:false,
            msg: 'error consultar los usuarios',
        });
    }
};

//usuarios actualizar estado
export const updateEstadoUsuario = async (req: Request, res: Response)=> {
  
    try {
        // el id del cliente para filtrar y actualizar
        const id = req.params.id;

    
        // buscar los clientes uno solo con id
        const usuarioEstadoActualizado = await UsuarioModel.findByIdAndUpdate(id, {estado:false}, { new: true,}); // el estado false todos los id se pasaran a false
        //const clienteestadoActualizado = await ClienteModel.findByIdAndUpdate(id); // el estado se pasara a false o true

        res.json({
            ok:true,
            usuarios: usuarioEstadoActualizado,
        });

    } catch (error){
        res.status(400).json({
            ok:false,
            msg: 'error consultar los usuarios',
        });
    }
};


export const crearUsuario = async(req:Request,res:Response) =>{
    const { body } = req;
    const { login,password,numeroDocumento } = body;
    
    try {
        const existeLogin = await UsuarioModel.findOne({
            login : login,
        });

        if(existeLogin){
            return res.status(400).json({
                ok: false,
                msg: `ya existe el login ${login} creado`,
            });

        }

        const existeDocumento = await UsuarioModel.findOne({
            numeroDocumento : numeroDocumento,
        });

        if(existeDocumento){
            return res.status(400).json({
                ok: false,
                msg: `ya existe el documento ${numeroDocumento} creado`,
            });

        }
        const newUsuario = new UsuarioModel({
            ...body,
        });

        //gestionar el password 
        //hacer diez saltos con la funcion gensaltsync
        const salt = bcrypt.genSaltSync(10);
        newUsuario.password = bcrypt.hashSync(password, salt);
        
        console.log("contrasena", newUsuario.password );

        const usuarioCreado = await newUsuario.save();

        res.status(200).json({
            ok: true,
            msg: "usuario creado correctamente",
            usuarioCreado,
        });


    } catch (error){
        console.error(error);
        res.status(400).json({
            ok: false,
            error,
            msg : "error al crear usuario comuniquese con el administrador"
        });
    }

    
};