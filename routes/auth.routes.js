import express from "express"//Requiero express
import { Router } from "express"//Importo Router de Express
import authController from "../controllers/auth.controller.js"

const router = Router();//Instancia de Router

router.post('/', authController.auth)



export default router


