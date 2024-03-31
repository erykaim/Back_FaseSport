import mongoose from "mongoose"

export const dbConection = async() => {
    try {
        const dbUrl = process.env.DB_CONECTION
        if (!dbUrl){
            throw new Error("error en la conexion de base de datos")
        } 

        await mongoose.connect(dbUrl);
        console.log("conexion exitosa")
    }catch (error){
        console.log(error);
        console.log("erorr en la conexion de base de datos");

    }
};