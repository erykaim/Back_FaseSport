import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../../../middelwares/validar-campos";
import { cambioContrasena, login, olvidoContrasena, renewToken } from "../../autenController";
import validateJWT, { validateJWTPass } from "../../../middelwares/validateJwt";

const router = Router();

//aca esta ruta iria al controlador de cliente 
router.post("/",
    [
        
        check("login", " el login es obligatorio").not().isEmpty(),
        check("password", " el pasword es obligatorio ").not().isEmpty(),

        validateFields,
    ],
    login
);
//token
router.get("/",validateJWT, renewToken);
//post contrasena

router.post("/olvidoContrasena",
[
    check("login", "el login es obligatorio ").not().isEmpty(),
    check("numeroDocumento","el documento es obligatorio").not().isEmpty(),
    validateFields,
],
olvidoContrasena); 

//cambio contrasena
router.put("/cambioContrasena", validateJWTPass,[
    check("password","el password es obligatorio"),
    validateFields,
],
cambioContrasena);




export default router;