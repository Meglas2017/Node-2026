import jwt from "jsonwebtoken"
import "dotenv/config"
import { error } from "node:console"

const secret_key = process.env.JWT_SECRET_KEY

export const authentication = (req, res, next) => {

    const token = req.header("Authorization")//Busco el token el TOKEN en el header
    
    if(!token) return res.status(401).json({message: "No existe token, acceso denegado"})//Si no existe TOKEN en el header respondo 401

    try {
        jwt.verify(token.replace("Bearer ", ""), secret_key, (error) =>{//Leo y corroboro el token 
            if(error) return res.status(403).json({message:"Error al leer el token. Intente volver a iniciar sesion."})
            next()//Al no haber error y el TOKEN ser valido, continuo con el siguiente middleware
        })
    } catch (error) {
        console.log("Error en authentication: ", error);
        res.status(401).json({message:""})
    }
    
}