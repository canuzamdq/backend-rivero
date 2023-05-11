import fs from 'fs';
import ProductManager from './productManager.js';

const productManager = new ProductManager();

export default class CartManager {
    constructor() {
        this.path = './carts.json';
        this.carts = [];
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

    async getCarts() {
        try {
            this.init()
            const fileContents = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(fileContents);

        }catch(err) {
            console.log(err);
        }
        
    }

    async newCart() {
        try {
            const carts = await this.getCarts();
            const lastCart = carts[carts.length - 1];
            const id = lastCart  ? lastCart.id + 1 : 1;
            const newCart = { id, "products":[]};
            carts.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            return newCart;
        
        } catch(err) {
        console.log(err);
        }  
    }

    async getCartProductsByID(id) {
            try {
                const carts = await this.getCarts();
                const cart = await carts.find((cart) => cart.id === id);
                return cart ? cart : '*** No se ha encontrado un carrito con el ID indicado';
            } catch (err) {
                console.log(err);
            }
    }

    async addToCart(cartID, productID){
        try {
            const carts = await this.getCarts();
            const cart = await carts.find((cart) => cart.id === cartID);
            
            const products = await productManager.getProducts();
            const product = await products.find((product) => product.id === productID);
            const newProduct = product.id;
            const existingProduct = cart.products.find(product => product.productoID === productID);
            console.log(JSON.stringify(existingProduct.cantidad))
            if (existingProduct) {
                const quantity = existingProduct.cantidad + 1;
                cart.products.push({"cantidad":quantity})
              } else {
                cart.products.push({"productoID":newProduct, "cantidad": 1});
              }
            
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            console.log(cart)
            

        }catch(err){
            console.log(err)
        }
    }

}
  







const cartManager = new CartManager();

const test = async () => {
    try{
        await cartManager.init();
        await cartManager.newCart();
        await cartManager.addToCart(1,9)
        await cartManager.getCarts();
        
    }catch(err) {
        console.log(err);
    }
}






