import {productModel} from "../models/products.model.js";


class ProductService {
    constructor() {
        this.model = productModel;
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
        } else if (category === 'varios') {
            filter.category = 'varios';
        } else if (category === 'tablets') {
            filter.category === 'tablets';
        } else if (category === 'notebooks') {
            filter.category === 'notebooks';
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
        return await this.model.findOne({_id: productId});
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
