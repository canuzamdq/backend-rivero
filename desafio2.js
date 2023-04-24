const fs = require('fs');

class ProductManager {
  constructor() {
    this.path = './productos.json';
    this.products = [];
  }

  // Función asincrónica para verificar si el archivo existe. Si no existe, lo crea.
  async init() {
    try {
      await fs.promises.access(this.path, fs.constants.F_OK);
      console.log('El archivo JSON existe.');
    } catch (err) {
      console.log('El archivo JSON no existe. Creando archivo...');
      await fs.promises.writeFile(this.path, JSON.stringify([]));
      console.log('El archivo JSON ha sido creado.');
    }
  }

  async getProducts() {
    try {
      const fileContents = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(fileContents);
    } catch (err) {
      return err;
    }
  }

  async addProduct(product) {
    try {
      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
        return 'Verifique que todos los datos estén completos';
      } else {
        const products = await this.getProducts();
        for (let i = 0; i < products.length; i++) {
          if (product.code === products[i].code) {
            return `El producto con el código ${products[i].code} ya existe. No se agregó el producto`
          }
        }
        const lastProduct = products[products.length - 1];
        const id = lastProduct ? lastProduct.id + 1 : 1;
        const newProduct = { id, ...product };
        products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
        return newProduct;
      }
    } catch(err) {
      console.log(err);
    }  
  }
  


  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const product = await products.find((product) => product.id === id);
      return product
        ? product
        : '*** No se ha encontrado un producto con el ID indicado';
    } catch (err) {
      return err;
    }
  }

  async updateProduct(id, update) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex(
      (product) => product.id === id
    );
    if (productIndex !== -1) {
      products[productIndex] = { id, ...update };
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return products[productIndex];
    }
    return 'No se puede actualizar. No se encuentra el producto con el ID indicado.';
    }catch(err) {
      console.log(err)
    }
    
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const deletedProduct = products.filter((product) => product.id === id);
      const productIndex = products.findIndex((product) => product.id === id);
      if (productIndex !== -1) {
        const newProducts = products.filter((product) => product.id !== id);
        console.log('Se ha eliminado el siguiente producto:');
        console.log(deletedProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
        return newProducts;
      }
      return '** No se ha podido borrar. No se encuentra producto con el ID indicado.';
    }catch(err) {
      console.log(err)
    }
    
  }
}

/* FIN DEL CODIGO */

const productManager = new ProductManager();


const test = async () => {
  try {
    await productManager.init(); // Veridica que el archivo json exista, sino lo crea.

    // Agregar un nuevo producto
    const newProduct = await productManager.addProduct({
      title: 'Camisazaa',
      description: 'Camisa de algodón',
      price: 29.99,
      thumbnail: 'https://example.com/camisa.jpg',
      code: 'C009',
      stock: 50,
    });
    console.log(newProduct);

   // Obtener un prodcto por su ID
    const getProductById = await productManager.getProductById(5);
    console.log(getProductById);


    // Actualizar un producto por su ID. Recibe como parámetro un objeto.
    const updatedProduct = await productManager.updateProduct(2, {
      title: 'Pantalon',
      description: 'Pantalón de gabardina negro',
      price: 35.99
    });
    console.log(updatedProduct);


    // Eliminar un producto por su ID
    const deletedProduct = await productManager.deleteProduct(99);
    console.log(deletedProduct);


    /*Obtener todos los productos
    const allProducts = await productManager.getProducts();
    console.log(allProducts);*/
    
  } catch (err) {
    console.log(err);
  }
};

test();
