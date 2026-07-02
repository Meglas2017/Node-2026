import {
    getAllProducts,
    getProductById,
    saveProduct,
    deleteProduct,
    updateProduct
    } from "../models/products.model.js"


export async function getAllService(req, res) {
    const allProducts = await getAllProducts()
    return allProducts
}

export async function getByIdService(id) {
    const product = await getProductById(id)
    return product
}

export async function saveService(product) {
    const idRef = await saveProduct(product)
    return idRef
}

export async function deleteService(id) {
    return await deleteProduct(id)

}

export async function updateService(id, product) {
    await updateProduct(id, product)
}