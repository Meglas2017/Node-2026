import dotenv from "dotenv"//Importo dotenv para trabajar con variables de entorno
import express from "express"//Requiero express
dotenv.config() //Configuro para trabajar con el archivo ENV
import cors from "cors"//CORS para permitir intercambio de recursos entre dominios
import bodyParser from "body-parser"

import authRoutes from "./routes/auth.routes.js"
import {authentication} from "./middlewares/authentication.js"
import productsRoutes from "./routes/products.routes.js"

const app = express()//creo instancia de express para configurar los middlewares, rutas, etc
app.use(cors())//Configuracion de CORS que permite cualquier origen (solo para desarrollo por seguridad)

app.use(bodyParser.json())//Middleware que analiza body entrante con encabezado Content-Type: application/json y poder leerlo
app.use(bodyParser.urlencoded({ extended: true }))//Middleware procesa los datos enviados desde formularios HTML - Extended true permite estructuras mas complejas en la URL

app.use("/login", authRoutes)
app.use("/api/products", authentication, productsRoutes)




/* Middleware por si ninguna ruta coincide, caigo en la siguiente respuesta */
app.use((req, res) => { 
  console.log("Se hizo una peticion de una ruta inexistente")//Debug por consola
  res.status(404).json({ message: "Ruta no encontrada" })//Respuesta con codigo de estado 404 y mensaje en json 
  });






//---Establezco servidor en puerto libre y sincronizacion con la base de datos
const PORT = process.env.PORT || 3000; //Verifico si hay un puerto definido, sino utilizo el 3000

app.listen(PORT, async () => {
    
    console.log("Servidor corriendo en http://localhost:" + PORT);
});
//----------------------------------------------------------------------------
