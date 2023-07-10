import { productModel, productSchema } from '../models/product.model.js';
import mongoosePaginate from 'mongoose-paginate-v2';

class ProductService {
	constructor() {
		this.productModel = productModel;
	}

	async getAllProducts(limit=5, page=1) {
		return await this.productModel.paginate({}, { lean: true, limit, page}); //lean: transforma la respuesta bson en js plano.
	}

	async addProduct(product) {
		return await this.productModel.create(product);
	}
	async getProductById(pId) {	
		if (!pId) {
			throw new Error('Falta ID');
		}
		return await this.productModel.findById(pId);
	}

	async updateProduct(pId, product) {
		if (!pId) {
			throw new Error('Falta ID');
		}
		return await this.productModel.updateOne({ _id: pId }, product);
	}

	async deleteProduct(pId) {
		if (!pId) {
			throw new Error('Falta ID');
		}
		return await this.productModel.deleteOne({ _id: pId });
	}
}
productSchema.plugin(mongoosePaginate)
export const productService = new ProductService();
