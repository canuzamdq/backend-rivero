import {productModel} from "../models/products.model.js";


class ProductService {
    constructor() {
        this.model = productModel;
    }

    async getAllProductsSinPaginate() {
		return await this.productModel.find().lean();
	}


    async getAllProducts(limit = 10, page = 1, status = undefined, category = undefined, sort = undefined) {
        const filter = {};
        const orderSort = {};   
        
        if (status === 'true') {
            filter.status = true;       
        } else if (status === 'false') {
            filter.status = false;
        }

        if (category === 'monitores') {
            filter.category = 'monitores';
        } if (category === 'accesorios') {
            filter.category = 'accesorios';
        } if (category === 'tablets') {
            filter.category = 'tablets';
        } if (category === 'notebooks') {
            filter.category = 'notebooks';
        }

        if (sort === 'desc') {
            filter.sort = sort;
            orderSort = { price: - 1};
        } else if (sort === 'asc') {
            filter.sort = sort;
            orderSort = { price:  1};
        } 
        
        const queryOptions = {
            lean: true,
            page,
            limit,
            category,
            sort : orderSort
        }

       
        return await this.model.paginate(filter, queryOptions)
           
           
    };

        
    async getProductById(productId) {
        try {
          const product = await this.model.findById(productId);
          if (!product) {
            throw new Error('Producto no encontrado');
          }
          return product;
        } catch (err) {
          console.error(err);
          throw err;
        }
      }

    async addProduct(product) {
        return this.model.create(product);
    }

    async updateProduct(productId, product) {
        return await this.model.updateOne({
            _id: productId
        }, product);
    }

    async deletePruduct(productId) {
        return await this.model.deleteOne({_id: productId})
    }

}

export const productService = new ProductService;
