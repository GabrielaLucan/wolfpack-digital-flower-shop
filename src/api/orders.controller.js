import { Order, Product } from '../models/index.js';
import handleError from '../api/handleErrors.js';

export default class OrdersController {

    static async listOrders(req, res) {
        const { status } = req.query;
        try {
            let orders;
            orders = status
                ? await Order.findByStatus(status) || []
                : await Order.find();
            return res.status(200).json({ orders })
        } catch (e) {
            const { statusCode, errMessage } = handleError(e);
            res.status(statusCode).send(errMessage);
        }
    }

    static async createOrder(req, res) {
        const notAvailableProducts = [];
        let totalPrice = 0;
        const { items: requestedProducts } = req.body;
        try {
            const products = await Product.find({
                _id: {
                    $in: requestedProducts.map(item => item.productId)
                }
            });

            const isAtLeastOneProductUnavailable = requestedProducts.some((item) =>
                !products.find(product => product._id.toString() === item.productId)
            );
            if (isAtLeastOneProductUnavailable) {
                res.status(400).send(`One or more products are unavailable.`);
                return;
            }
            requestedProducts.forEach(requestedProduct => {
                const product = products.find(product => product._id.toString() === requestedProduct.productId);
                if (product.quantity < requestedProduct.quantity) {
                    notAvailableProducts.push(requestedProduct.productId)
                }
                totalPrice += product.price * requestedProduct.quantity
            });
            if (notAvailableProducts.length) {
                res.status(409).send(`Products with ids: ${notAvailableProducts.join(', ')} are not available in this quantity.`);
                return;
            }
            const order = new Order(req.body);
            order.totalPrice = totalPrice;
            await order.save();
            res.status(201).send(order);
        } catch (e) {
            const { statusCode, errMessage } = handleError(e);
            res.status(statusCode).send(errMessage);
        }
    }

    static async updateOrder(req, res) {
        const { orderId } = req.params;
        try {
            const updatedOrder = await Order.findByIdAndUpdate(orderId , req.body, {
                useFindAndModify: false, runValidators: true
            });
            if (updatedOrder === null) {
                return res.status(404).send(`Order with id: ${orderId} not found`);
            }
            res.send('Order successfully updated');
        } catch (e) {
            const { statusCode, errMessage } = handleError(e);
            res.status(statusCode).send(errMessage);
        }
    }

}