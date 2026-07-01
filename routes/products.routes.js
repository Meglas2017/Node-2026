import express from "express"//Requiero express
import { Router } from "express"//Importo Router de Express
import productsController from "../controllers/products.controller.js"

const router = Router();//Instancia de Router

router.get('/', productsController.getAll);
router.get('/:id', productsController.byId);
router.post('/create', productsController.addItem);
router.delete('/:id', productsController.deleteID);
router.patch("/:id", productsController.updateProducts)


export default router


