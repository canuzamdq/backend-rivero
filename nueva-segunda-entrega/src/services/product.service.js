import {productModel} from "../models/products.model.js";

class ProductService {
    constructor() {
        this.model = productModel;
    }

    async getAllProducts(limit = 10, page = 1, status = false, category = false) {
        let filter = {};

        if (status) {
            filter = {
                status
            };
        }

        if (category) {
            filter = {
                category
            };
        }

        return await this.model.paginate(filter, {
            lean: true,
            page,
            limit
        });
    }

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
