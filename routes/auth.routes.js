import express from "express"//Requiero express
import { Router } from "express"//Importo Router de Express
import productsController from "../controllers/auth.controller.js"

const router = Router();//Instancia de Router

router.post('/', productsController.auth)



export default router


