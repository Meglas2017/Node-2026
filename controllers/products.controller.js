import {
    getAllService,
    getByIdService,
    saveService,
    deleteService,
    updateService

} from "../services/products.service.js"

/* Funcion para obtener todos los productos */
const getAll = async (req, res) => { 
    console.log("GET ALL")
    try {
        const allProducts = await getAllService()
        
        res.status(200).json(allProducts)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

/* Funcion para obtener un producto por ID */
const byId = async (req, res) => { 
    const id = req.params.id //Recupero el ID de parametros para utilizarlo en la busqueda
    if(!id) { //Verifico que exista un ID para consulta
        res.status(400).json({message: "Falta ID"})
        return
    }
    console.log("GET by ID: ",id) //Debug 
    try {
        const product = await getByIdService(id)
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

/* Funcion para crear un nuevo producto en la BBDD */
const addItem = async (req, res) => { 
    const product = req.body
    if(!product) { //Verifico que exista un producto para agregar
        res.status(400).json({message: "Falta producto a agregar"})
        return
    }
    console.log("Agregar producto nuevo:", product) //Debug 
    try {
        const idRef = await saveService(product)
        res.status(201).json(idRef)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

/* Funcion para eliminar producto por ID */
const deleteID = async (req, res) => { 
    const dID = req.params.id //Recupero ID para eliminar
    if(!dID) { //Verifico que exista un ID para consulta
        res.status(400).json({message: "Falta ID"})
        return
    }
    console.log("Eliminar producto por ID",dID) //Debug 
    try {
        await deleteService(dID)
        
        res.status(200).json({ message: `${dID} eliminado`})
        

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

/* Funcion para actualizar un producto, solo los campos que se cambiaron */
const updateProducts = async (req,res) => {
    const id = req.params.id
    const product = req.body
    if(!id) { //Verifico que exista un ID para consulta
        res.status(400).json({message: "Falta ID"})
        return
    }
    if(!product) { //Verifico que exista un producto para actualizar
        res.status(400).json({message: "Falta producto a actualizar"})
        return
    }
    console.log("Actualizar producto", id, product)

    try {
        await updateService(id, product)
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