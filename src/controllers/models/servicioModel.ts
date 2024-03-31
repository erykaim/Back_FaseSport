import {  Model, Schema, Types, model } from "mongoose"



interface ServicioInterface {
    nombre: string;
    descripcion: string;
    precio:number;
    categoria: string;
    createdAT: Date;
    estado:boolean;
    acciones: string;//entregado//cancelado//terminado//incompleto //front 
    usuario: Types.ObjectId; //usuario que registra el servicio ///relacion modelo usuario

}

const ServicioSchema = new Schema<ServicioInterface>({ //llamamos lainterface general 
    nombre: { type: String, required:true},
    descripcion: {type: String  },
    precio: {type: Number, required: true},
    categoria: {type: String, required: true},
    createdAT: {
        type:Date,
        default: Date.now(),
    },
    estado: { type: Boolean, required : true, default:true},
    acciones: {type:String, required: true},
    usuario : {type: Schema.Types.ObjectId, ref:"usuario", required: true} // aca traemos el model usuario

});
const ServicioModel :Model <any>= model("servicio",ServicioSchema);

export default ServicioModel;
