//* Saludo inicial con información del programa: comisión y estudiante
console.log("Talento Tech\nComisión 26132\nMarcos E. Gerje\n\n") 


const argumento = process.argv[2] //* Guardo comando GET, POST o DELETE
let id = null //* Inicio variable id para busqueda de producto


switch (argumento) { //* Estructura de switch para determinar verbo
    //---------------------------------------------------------
    case "GET":  //* Ejemplo de comando: npm run start GET products/15 o npm run start GET products

        if (process.argv[3]) {
            const ruta = process.argv[3]
            const corte = ruta.split("/")
            id = corte[1]
            console.log(id);
            
        }
        //*Busqueda de producto por ID
        if (id){
            console.log("Buscando producto por ID");
            //*SOlicitud de producto por ID a FakeApi
            async function getProductById (id) {
                try {
                    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
                    if (!response.status == 200) {throw new Error("Algo salio mal en la solicitud")}
                    const data = await response.json()
                    console.log(data);
                    
                } catch (error) {
                    console.log("Error en la solicitud de producto por ID: ",error);
                    
                }
            }
            getProductById(id) //* Ejecuto la funcion
            break
        }
        //*Solicitud de productos a FakeApi
        console.log("Buscando productos")
        async function getProducts() {
            try {
                const response = await fetch('https://fakestoreapi.com/products')
                if (!response.status == 200) {throw new Error("Algo salio mal en la solicitud")}
                const data = await response.json()
                console.log(data)
                
                
            } catch (error) {
                console.log("Error en la solicitud de productos: ", error)
                
            }
        }
        getProducts()
        break

    //---------------------------------------------------------
    case "POST": //* Ejemplo de comando: npm run start POST products T-Shirt-Rex 300 remeras
            let product = null

            //*Primero verifico comando y guardo datos title, price, category
            if (process.argv[4]) { //*Solo si existe el titulo del producto procede
                const [, , , , title, price, category] = process.argv;
                product = { //* Creo objeto producto con datos del producto a cargar en la BBDD
                    title : title ?? null, 
                    price : price ?? null, 
                    category : category ?? null } 
                console.log(`Producto a cargar: `, product);
                
            } else { //* Si no hay producto pasado por consola detiene la ejecucion
                console.log("No ha introducido ningun producto");
                break
            }

            //*ENvio producto a FakeApi
            async function postProduct (product) {
                try {
                    const response = await fetch('https://fakestoreapi.com/products',{
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(product)
                    })
                    if (!response.status == 200) {throw new Error("Algo salio mal en la carga del producto")}
                    const data = await response.json()
                    console.log(`Producto cargado exitosamente con el id: ${data.id}\nTitulo: ${data.title}\nPrecio: ${data.price}\nCategoria: ${data.category}`);
                    
                } catch (error) {
                    console.log(error);
                    
                }

            }
        console.log("Cargando producto nuevo")
        postProduct(product)
        break

    //---------------------------------------------------------
    case "DELETE": //* Ejemplo de comando: npm run start DELETE products/7
    let id = null
        if (process.argv[3]){//*Compruebo si existe la ruta products
            const ruta = process.argv[3].split("/")
            if (ruta[1]) {//* Compruebo si existe el ID
                id = ruta[1]
            } else {//* SI no existe el ID a eliminar
                console.log("No existe ID\nEjemplo de comando para eliminar:\nnpm run start DELETE products/7\n");
                break
            }
            
        } else {//* Si no existe ruta
            console.log("No existe ruta\nEjemplo de comando para eliminar:\nnpm run start DELETE products/7\n");
            break
        }
        console.log(`Se eliminara el producto con id: ${id}`)
        //* Funcion para mandar eliminar producto por ID a FakeApi
        async function deleteProductById (id) {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`,{
                    method: "DELETE"
                })
                const data = await response.json()
                console.log(`Producto con ID ${id} eliminado\n`);
                
            } catch (error) {
                console.log(error);
                
            }
        }
        deleteProductById(id)
        break
    //*--------------------------------------------------------
    //* En caso de haber ingresado erroneamente un comando o ningun comando
    default:
        console.log("¡Comando no reconocido!")
        break
}