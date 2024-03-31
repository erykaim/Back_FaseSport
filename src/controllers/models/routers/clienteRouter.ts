// cleinte
import { Router } from "express";
import { crearClientes, deleteCliente, getClientes, getUnCliente, updateCliente, updateEstadoCliente } from "../../clienteController";
import { check } from "express-validator";
import { validateFields } from "../../../middelwares/validar-campos";
import validateJWT from "../../../middelwares/validateJwt";


// path : "/"= esto es ruta del path
const router = Router();
//aca esta ruta iria al controlador de cliente 
router.post("/",
    validateJWT,
    [
        check("nombre","el nombre es obligatorio").not().isEmpty(),
        check("email", " el email es obligatorio ").not().isEmpty().isEmail(),
        check("telefono", " el telefono es obligatorio ").not().isEmpty(),
        check("tipoDocumento", " el tipo documento es obligatorio ").not().isEmpty(),
        check("numeroDocumento", " el numero docuemnto es obligatorio ").not().isEmpty(),
        
        validateFields,
    ],
    crearClientes
);

// se llama el metodo get  del archivo controller
router.get("/",getClientes);

// filtar uno a uno
router.get("/:id",validateJWT,getUnCliente);

//llamar al id para actualizar
router.put("/:id",validateJWT,updateCliente);
router.put("/estado/:id",validateJWT,updateEstadoCliente);

router.delete("/:id",validateJWT,deleteCliente);

export default router;