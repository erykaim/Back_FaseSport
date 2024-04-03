import { Request, Response, request } from "express";
import ServicioModel from "./models/servicioModel";
import { CustomRequest } from "../middelwares/validateJwt";

export const crearServicios = async (req: CustomRequest , res:Response) => {
    const { body } = req;
    const id = req._id;
    console.log (" id del usuario registardo",id);
    try {
        //console.log(req);
        //console.log(body)lll;

        const servicioNuevo = new ServicioModel({usuario: id, ...body});
        const servicioCreado = await servicioNuevo.save();

        res.status(200).json({
        ok: true,
        msg: "servicio registrado",
        servicioCreado,
        });
   
    } catch (error){
    console.log(error);
    res.status(400).json({
        ok: false,
        msg: `eror al crear servicio  $error`,

    });
   }
};
export  const getServicios = async (req: Request, res: Response)=>{
    try {
        //devuelve todo la informacion de servicio con el ucuario que lo creo
        const servicios = await ServicioModel.find().populate({
            path: "usuario", 
            select: "nombre numeroDocumento email"
        });
        res.json({
            ok: true,
            servicios
        });

    }catch(error){
    res.status(400).json({
        ok: false,
        error,
        });

    }

    
};
//servicio uno solo 
export const getUnServicio = async (req: Request, res: Response)=> {
  
    try {
        
        const id = req.params.id;
       
        // buscar los servicios uno solo con id
        const servicios = await ServicioModel.findById({ _id: id});
        res.json({
            ok:true,
            servicios,
        });

    } catch (error){
        res.status(400).json({
            ok:false,
            msg: 'error consultar los servicios',
        });
    }
};

//usuarios actualizar
export const updateServicios = async (req: Request, res: Response)=> {
  
    try {
        // el id del usuario para filtrar y actualizar
        const id = req.params.id;

        //const body = req.body;//forma una de hacerlo

        const {body} = req // forma de estructuracion
       
        // buscar los usuarios uno solo con id
        const servicioActualizado = await ServicioModel.findByIdAndUpdate(id, body, { new: true,});
        res.json({
            ok:true,
            servivico:servicioActualizado,
        });

    } catch (error){
        res.status(400).json({
            ok:false,
            msg: 'error consultar los servicios',
        });
    }
};

//usuarios eliminar
export const deleteServicios = async (req: Request, res: Response)=> {
  
    try {
        // el id del usuario para filtrar y eliminar
        const id = req.params.id;

        //const body = req.body;//forma una de hacerlo

       
        // buscar los clientes uno solo con id
        const serviciosDelete = await ServicioModel.findByIdAndDelete( { _id:id});
        res.json({
            ok:true,
            msg: 'servicio eliminado',
            serviciosDelete

        });

    } catch (error){
        res.status(400).json({
            ok:false,
            msg: 'error consultar los servicios',
        });
    }
};

//servicios actualizar estado
export const updateEstadoServicio = async (req: Request, res: Response)=> {
  
    try {
        // el id del cliente para filtrar y actualizar
        const id = req.params.id;

    
        // buscar los clientes uno solo con id
        const servicioEstadoActualizado = await ServicioModel.findByIdAndUpdate(id, {estado:false}, { new: true,}); // el estado false todos los id se pasaran a false
        //const clienteestadoActualizado = await ClienteModel.findByIdAndUpdate(id); // el estado se pasara a false o true

        res.json({
            ok:true,
            servicios: servicioEstadoActualizado,
        });

    } catch (error){
        res.status(400).json({
            ok:false,
            msg: 'error consultar los servicios',
        });
    }
};



