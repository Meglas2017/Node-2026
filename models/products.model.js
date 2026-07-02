import {db} from "../data/data.js"
import { 
    collection,
    getDocs,
    getDoc, 
    addDoc, 
    deleteDoc,
    updateDoc, 
    doc } from "firebase/firestore"

const productsCollections = collection(db, "products")

/* Funcion para traer todos los productos */
export async function getAllProducts() {
    const consulta = await getDocs(productsCollections)
    const products = []
    consulta.forEach((doc) => {
        products.push({id:doc.id, ...doc.data()})
    })
    return products
}

/* Funcion para traer un producto por ID */
export async function getProductById(id) {
    const consulta = await getDoc(doc(productsCollections, id))
    if(consulta.exists()){
        return consulta.data()
    } else {
        return null
    }
}

/* Funcion para crear un producto */
export async function saveProduct(product) {
    const docRef = await addDoc(productsCollections, product)
    return docRef.id //Espero la referencia del documento para saber si lo guardo correctamente
}

/* Funcion para eliminar producto */
export async function deleteProduct(id) {
    const productRef = doc(productsCollections, id);
    return await deleteDoc(productRef)
}

/* Funcion para actualizar un producto */
export async function updateProduct(id, product) {
    const productRef = doc(productsCollections, id)
    await updateDoc(productRef, product)
}