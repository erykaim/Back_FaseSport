import { Request, Response } from "express";
import UsuarioModel from "./models/usuarioModel";
import bcrypt from "bcryptjs";
import generarJWT from "../helpers/jwt";
import { CustomRequest } from "../middelwares/validateJwt";

export const login = async (req: Request, res: Response) => {
    const { login: loginUser, password } = req.body;

    try {
        //verificar el login
        const usuario = await UsuarioModel.findOne({ login: loginUser });

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: " las credenciales correono son validas",
            });
        }

        //verificar el paswword
        const validarPassword = bcrypt.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(401).json({
                ok: false,
                msg: "las credenciales password no son validas",
            });
        }
        // generar el token lo que hacemos es dar un tiempo al inicio de sesion 
        const token = await generarJWT(usuario._id, usuario.login);


        res.status(200).json({
            ok: true,
            usuario: usuario,
            token,
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            error,
            msg: "comuniquese con el administrador",
        });
    }
};

//renovar un token 
export const renewToken = async (req: CustomRequest, res: Response) => {
    const id = req._id;
    //validamos si el id esta vacio o indefinido
    try {

        if (typeof id === "undefined") {
            throw new Error("no existe un id");
        }

        const usuario = await UsuarioModel.findById(id);

        //generar el token
        const token = await generarJWT(id.toString());

        res.json({
            ok: true,
            token,
            usuario,
        });
    } catch (error) {
        console.error(error);
        res.status(401).json({
            ok: false,
            error,
            msg: "hable con el administrador"
        });
    }
};

// funcion para renovar la contrasena

export const olvidoContrasena = async ( req : Request, res: Response)=>{
    const { login,numeroDocumento} = req.body;    
    //const { body} = req;
    try {
        //verificar documento y gmail
        const usuarioinicio = await UsuarioModel.findOne({ login: login, numeroDocumento:numeroDocumento});

        if (!usuarioinicio) { //negacion de si existemn
            
            res.status(400).json({
                ok: false,
                msg: "no coinciden sus credenciales",
            });
 
        }  
        const id = usuarioinicio?._id;
        //si existe el usuario genere otro nuevo token  
        if (id){

        const token = await generarJWT( id,login,"1H",process.env.JWT_SECRET_PASS);
        // mensaje existoso 
        res.status(200).json({
            ok: true,
            msg:"proceso con exito",
            usuario:usuarioinicio,
            token,
        });
        }
        
            

    }catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "no se logro validar su acceso con exito, por favor comuniquese con el administrador"
        });

    }
};
///funcion cambio de coontrasena
export const cambioContrasena = async (req:CustomRequest, res: Response)=>{
    const id = req._id;
    const {password} = req.body;

    try {
        if(!password){
            res.status(400).json({
                ok: false,
                msg: "por favor digite una contrasena valida",
            });
        }
        //encriptamos nuesrtra contrasenaa
        const newPassword = bcrypt.hashSync(password, 10);
        //axctualizar la contrasena
        const updatePassword = await UsuarioModel.findByIdAndUpdate({
            _id: id,
            password: newPassword,
        });

        if (!updatePassword){
            res.status(400).json({
                ok:false,
                msg: "error al actualizar la contrasena" 
            });
        }
        res.status(200).json({
            ok: true, 
            msg:" contrasena actualizada",
            usuario: updatePassword,
        });
    }catch (error){
        console.error(error)
        res.status(400).json({
            ok: false,
            msg: "eeror al actualizar la contrasena, hable con el administrador"
        });
    }
};


