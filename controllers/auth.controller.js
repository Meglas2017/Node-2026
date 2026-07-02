import {generateToken} from "../utils/token-generator.js"
import { verifyUser } from "../services/auth.service.js"


const auth = async (req, res) => {
    const { email, password } = req.body
    

    try {
        console.log("Autorizando:", email, password)
        const user = await verifyUser(email, password)
        console.log("Usuario verificado:", user)
        const token = generateToken(user)

        res.status(202).json({message:"Autorizando", token:token})

    } catch (error) {
        console.log("Error en auth.controller: ", error);
        res.status(401).json({message:"Error en la autenticacion"})
    }    
}

export default {
    auth,

}