import {
    getAllProducts,
    getProductById,
    saveProduct,
    deleteProduct,
    updateProduct
    } from "../models/products.model.js"

/* Funcion para obtener todos los productos */
const getAll = async (req, res) => { 
    console.log("GET ALL")
    try {
        const allProducts = await getAllProducts()
        
        res.status(200).json(allProducts)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

/* Funcion para obtener un producto por ID */
const byId = async (req, res) => { 
    const id = req.params.id //Recupero el ID de parametros para utilizarlo en la busqueda
    console.log("GET by ID: ",id) //Debug 
    try {
        const product = await getProductById(id)
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

/* Funcion para crear un nuevo producto en la BBDD */
const addItem = async (req, res) => { 
    const product = req.body
    console.log("Agregar producto nuevo:", product) //Debug 
    try {
        const idRef = await saveProduct(product)
        res.status(201).json(idRef)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

/* Funcion para eliminar producto por ID */
const deleteID = async (req, res) => { 
    const dID = req.params.id //Recupero ID para eliminar
    console.log("Eliminar producto por ID",dID) //Debug 
    try {
        await deleteProduct(dID)
        res.status(204).json({ message: `ID:${dID} eliminado`})
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

/* Funcion para actualizar un producto, solo los campos que se cambiaron */
const updateProducts = async (req,res) => {
    const id = req.params.id
    const product = req.body
    console.log("Actualizar producto", id, product)

    try {
        await updateProduct(id, product)
        res.status(200).json({message:`${id} actualizado`})
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
    
} 



/* Exporto las funciones */
export default {
    getAll,
    byId,
    addItem,
    deleteID,
    updateProducts
}