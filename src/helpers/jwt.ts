//token
const jwt = require("jsonwebtoken");
const generarJWT = (_id: string, login: string = "",
    //llamamos a las variables de entorno desde el archivo.env
    expiresIn = process.env.EXPIRES_IN,
    jwtSecret = process.env.JWTSECRET) => {

    return new Promise((resolve, reject) => {
        const payload = {
            _id,
            login,
        };
        jwt.sign(
            payload,
            jwtSecret,
            {
                expiresIn: expiresIn,
            },
            (error: string, token: string) => {
                if (error) {
                    console.log(error);
                    reject("no responde  el token")
                } else resolve(token);
            }
        );
    });
};
export default generarJWT;