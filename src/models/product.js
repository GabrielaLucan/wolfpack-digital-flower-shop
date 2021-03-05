import mongoose from 'mongoose';

const OCCASIONS = ['wedding', 'graduation', 'anniversary', 'valentine\'s day', 'proposal', 'funeral'];
const COLORS = ['aqua', 'beige', 'blue', 'brown', 'coral', 'gray', 'green', 'hotpink', 'ivory', 'olive', 'orange', 'pink', 'purple', 'red', 'salmon', 'violet', 'white', 'yellow'];

const ProductInfoSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            validate: {
                validator: q => q > 0
            }
        },
        available: {
            type: Boolean,
            default: true
        },
        pictures: [String],
        colors: [{
            type: String,
            enum: COLORS
        }],
        occasions: [{
            type: String,
            enum: OCCASIONS
        }],
    },
    { versionKey: false }

);
ProductInfoSchema.statics.findByAvailability = async function (availability) {
    const products = await this.find({
        available: availability,
    });
    return products;
};
const Product = mongoose.model('Product', ProductInfoSchema);
export const ProductInfo = mongoose.model('ProductInfo', ProductInfoSchema);

export default Product;