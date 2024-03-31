// cleinte
import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../../../middelwares/validar-campos";
import { crearServicios , deleteServicios, getServicios, getUnServicio, updateServicios} from "../../servicioController";
import validateJWT from "../../../middelwares/validateJwt";


// path : "/"= esto es ruta del path
const router = Router();
//aca esta ruta iria al controlador de cliente 
router.post("/",
    validateJWT,  //si se coloca no se puede registrar el usuario
    [
        check("nombre","el nombre es obligatorio").not().isEmpty(),
        check("descripcion","la descripcion es obligatorio").not().isEmpty(),
        check("precio","el precio es obligatorio").not().isEmpty(),
        
             ///me faltan validar los demas campos
        validateFields,
    ],
    crearServicios
);
router.get("/",validateJWT,getServicios);



// filtar uno a uno
router.get("/:id",validateJWT,getUnServicio);

//llamar al id para actualizar
router.put("/:id",validateJWT,updateServicios);

router.delete("/:id",validateJWT,deleteServicios);
export default router;