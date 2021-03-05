import mongoose from 'mongoose';
import { extend } from './common.js';

const STATUSES = ['created', 'confirmed', 'processing', 'completed', 'cancelled'];

const OrderItemSchema = new mongoose.Schema({
    quantity: { type: Number, min: [1, 'Order can\'t be empty'], required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product',required: true  },
});

const OrderInfoSchema = new mongoose.Schema(
    {
        shippingOptions: {
            name: { type: String, required: true },
            phoneNumber: { type: String, validate: /^\d{10}$/, required: true },
            date: { type: Date, required: true, min: new Date() },
            type: {
                type: String,
                enum: ['delivery', 'pickup'],
                default: 'pickup'
            },
            address: { type: String},
        },
        items: {
            type: [OrderItemSchema],
            required: true,
            validate: {
                validator: values => Array.isArray(values) && values.length > 0,
                message: 'Order can\'t be empty'
            },
        },
        packagingType: {
            type: String,
            enum: ['raw', 'bouquet', 'box', 'potted', 'wreath'],
            default: 'bouquet'
        }
    }
);

const OrderSchema = extend(OrderInfoSchema, {
    status: {
        type: String,
        enum: STATUSES,
        default: 'created'
    },
    totalPrice: Number
}, true);

OrderSchema.statics.findByStatus = async function (status) {
    const orders = await this.find({
        status,
    });
    return orders;
};
const Order = mongoose.model('Order', OrderSchema);
export const OrderInfo = mongoose.model('OrderInfo', OrderInfoSchema);
export const OrderItem = mongoose.model('OrderItem', OrderItemSchema);

export default Order;