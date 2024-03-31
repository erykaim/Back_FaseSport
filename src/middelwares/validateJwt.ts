// en este archivo estamos valindado el token
import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");

 export interface CustomRequest extends Request{
    _id?: number;
}

const validateJWT = ( req: CustomRequest,res:Response, next:NextFunction)=>{ //validar existencia del token
    const token = req.header("x-token");

    if ( !token){
        return res.status(401).json({
            ok: false,
            msg: "no hay token en la peticion",
        });

    }

    try {
        const{ _id } = jwt.verify(token, process.env.JWTSECRET)
        req._id = _id;
        next();
    }catch (error){
        return res.status(401).json({
            ok: false,
            msng: "token invalido",
        });
    }
};

/////////////validar el token de cambio de contraena
 export const validateJWTPass = ( req: CustomRequest,res:Response, next:NextFunction)=>{ //validar existencia del token
    const token = req.header("x-token-pass");

    if ( !token){
        return res.status(401).json({
            ok: false,
            msg: "no hay token en la peticion",
        });

    }

    try {
        const{ _id } = jwt.verify(token, process.env.JWT_SECRET_PASS)
        req._id = _id;
        next();
    }catch (error){
        return res.status(401).json({
            ok: false,
            msng: "token invalido",
        });
    }
};
export default validateJWT;