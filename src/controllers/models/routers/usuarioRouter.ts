// cleinte
import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../../../middelwares/validar-campos";
import { crearUsuario, deleteUsuarios, getUnUsuarios, getUsuarios, updateusuarios } from "../../usuarioController";
import validateJWT from "../../../middelwares/validateJwt";


// path : "/"= esto es ruta del path
const router = Router();
//aca esta ruta iria al controlador de cliente 
router.post("/",
    // validateJWT,  si se coloca no se puede registrar el usuario
    [
        check("nombre","el nombre es obligatorio").not().isEmpty(),
        check("email", " el email es obligatorio ").not().isEmpty().isEmail(),
        check("tipoDocumento", " el tipo documento es obligatorio ").not().isEmpty(),
        check("numeroDocumento", " el numero docuemnto es obligatorio ").not().isEmpty(),
        check("login", " el login es obligatorio").not().isEmpty(),
        check("password", " el pasword es obligatorio ").not().isEmpty(),

        validateFields,
    ],
    crearUsuario
);
//se llama el metodo get  del archivo controller
router.get("/",getUsuarios);

// filtar uno a uno
router.get("/:id",validateJWT,getUnUsuarios);

//llamar al id para actualizar
router.put("/:id",validateJWT,updateusuarios);

router.delete("/:id",validateJWT,deleteUsuarios);
export default router;