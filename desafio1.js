class ProductManager {

    // Atributos privados
    #id = 0
    #codeVerify = false;


    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    }

    addProducts(title, description, price, thumbnail, code, stock) {
        const product = {
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
        }

        // Verifica que se hayan ingreasado todos los datos requeridos. Si no se ingresó algun dato, devuelve un mensaje de error.
        if (title === undefined || description === undefined || price === undefined || thumbnail === undefined || code === undefined || stock === undefined){
            console.log("Verifique que todos los datos estén completos.")

        // Si todos los datos están ingresados continúa la ejecución del código.
        }else {

             // Recorre el array products y verifica si el codigo ingresado ya exsite.
            this.products.forEach(element => {
                if (product.code === element.code){
                this.#codeVerify = true;
                }
            });

        // Si el código existe, devuelve mensaje de error.
        if (this.#codeVerify) {
            console.log(`EL código ${code} ya existe. No se agregó el producto`)
            this.#codeVerify = false;

        // Si el codigo no existe crea el nuevo producto (product)
        }else {

            // Agrega ID al producto
            product.id = this.#getID();

            // Agrega el producto (product) a la lista de productos (products)
            this.products.push(product);

            console.log("Producto agregado.")
        }
        }

    }

    //Metodo privado para incrementar el ID + 1
    #getID() {
        this.#id++
        return this.#id
    }
}

// Pruebas 
const productManager = new ProductManager();

// ** Comentar y descomentar las siguientes líneas para probar la funcionalidad del programa ***

productManager.addProducts("Producto de prueba", "Este es un producto de prueba", 200, "Sin imagen", "abc123", 25);
// productManager.addProducts("Producto de prueba2", "Este es un producto de prueba", 200, "Sin imagen", "abc123", 25); // Producto con el mismo codigo que la linea de arriba.-
// productManager.addProducts("Producto de prueba3", "Este es un producto de prueba", 200, "Sin imagen", "abc222", 25);
console.log("A continuación se muestra la lista de productos existente:")
console.log(productManager.getProducts())