import { Request, Response, request } from "express";
import ClienteModel from "./models/clienteModel";

export const crearClientes = async (req: Request, res:Response) => {
    const { body } = req;
    try {
        console.log(req);
        console.log(body);

        const clienteNuevo = new ClienteModel(body);
        const clienteCreado = await clienteNuevo.save();

        res.status(200).json({
        ok: true,
        msg: "Usuario registrado",
        cliente: clienteCreado,
        });
   
    } catch (error){
    console.log(error);
    res.status(400).json({
        ok: false,
        msg: `eror al crear cliente $error`,

    });
   }
};

//get 
export const getClientes = async (req: Request, res: Response)=> {
    try {
        // buscar los clientes
        const clientes = await ClienteModel.find();
        res.json({
            ok:true,
            clientes,
        });

    } catch (error){
        res.status(400).json({
            ok:false,
            msg: 'error consultar los clientes',
        });
    }
};

//cleintes uno solo 
export const getUnCliente = async (req: Request, res: Response)=> {
  
    try {
        
        const id = req.params.id;
       
        // buscar los clientes uno solo con id
        const clientes = await ClienteModel.findById({ _id: id});
        res.json({
            ok:true,
            clientes,
        });

    } catch (error){
        res.status(400).json({
            ok:false,
            msg: 'error consultar los clientes',
        });
    }
};

//cleintes actualizar
export const updateCliente = async (req: Request, res: Response)=> {
  
    try {
        // el id del cliente para filtrar y actualizar
        const id = req.params.id;

        //const body = req.body;//forma una de hacerlo

        const {body} = req // forma de estructuracion
       
        // buscar los clientes uno solo con id
        const clienteActualizado = await ClienteModel.findByIdAndUpdate(id, body, { new: true,});
        res.json({
            ok:true,
            clientes: clienteActualizado,
        });

    } catch (error){
        res.status(400).json({
            ok:false,
            msg: 'error consultar los clientes',
        });
    }
};
//cleintes eliminar
export const deleteCliente = async (req: Request, res: Response)=> {
  
    try {
        // el id del cliente para filtrar y eliminar
        const id = req.params.id;

        //const body = req.body;//forma una de hacerlo

       
        // buscar los clientes uno solo con id
        const clientedelete = await ClienteModel.findByIdAndDelete( { _id:id});
        res.json({
            ok:true,
            //clientes: clientedelete,
            msg: 'cliente eliminado',
            clientedelete

        });

    } catch (error){
        res.status(400).json({
            ok:false,
            msg: 'error consultar los clientes',
        });
    }
};

//cleintes actualizar estado
export const updateEstadoCliente = async (req: Request, res: Response)=> {
  
    try {
        // el id del cliente para filtrar y actualizar
        const id = req.params.id;

    
        // buscar los clientes uno solo con id
        const clienteestadoActualizado = await ClienteModel.findByIdAndUpdate(id, {estado:false}, { new: true,}); // el estado false todos los id se pasaran a false
        //const clienteestadoActualizado = await ClienteModel.findByIdAndUpdate(id); // el estado se pasara a false o true

        res.json({
            ok:true,
            clientes: clienteestadoActualizado,
        });

    } catch (error){
        res.status(400).json({
            ok:false,
            msg: 'error consultar los clientes',
        });
    }
};