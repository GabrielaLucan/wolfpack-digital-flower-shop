import mongoose from 'mongoose';
import Order, { OrderInfo, OrderItem } from './order.js';
import Product, { ProductInfo } from './product.js';
import dotenv from 'dotenv';

dotenv.config();

const connectDb = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return mongoose.connection;
}
export { Order, OrderInfo, OrderItem, Product, ProductInfo };

export { connectDb };