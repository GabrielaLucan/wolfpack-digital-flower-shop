import { Product } from '../models/index.js';
import handleError from '../api/handleErrors.js';

export default class ProductController {

    static async listProducts(req, res) {
        const { available } = req.query;
        try {
            let products;
            products = typeof available !== 'undefined'
                ? await Product.findByAvailability(available) || []
                : await Product.find();
            return res.status(200).json({ products })
        } catch (e) {
            const { statusCode, errMessage } = handleError(e);
            res.status(statusCode).send(errMessage);
        }
    }

    static async createProduct(req, res) {
        try {
            const product = new Product(req.body);
            await product.save();
            res.status(200).send(product);
        } catch (e) {
            const { statusCode, errMessage } = handleError(e);
            res.status(statusCode).send(errMessage);;
        }
    }

    static async updateProduct(req, res) {
        const { productId } = req.params;
        try {
            const updatedProduct = await Product.findByIdAndUpdate(productId, req.body,
                { useFindAndModify: false, runValidators: true }
            );
            if (updatedProduct === null) {
                return res.status(404).send(`Product with id: ${productId} not found`);
            }
            res.send('Product successfully updated');
        } catch (e) {
            const { statusCode, errMessage } = handleError(e);
            res.status(statusCode).send(errMessage);
        }
    }

    static async deleteProduct(req, res) {
        const { productId } = req.params;
        try {
            const deletedProduct = await Product.findByIdAndDelete(productId, { useFindAndModify: true });
            if (deletedProduct === null) {
                return res.status(404).send(`Product with id: ${productId} not found`);
            }
            res.send('Product successfully deleted');
        } catch (e) {
            const { statusCode, errMessage } = handleError(e);
            res.status(statusCode).send(errMessage);
        }
    }
}
