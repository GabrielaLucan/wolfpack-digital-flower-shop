import { Product } from '../models/index.js';
import handleError from '../api/handleErrors.js';

export default class RecommendationController {

    static async listRecommendations(req, res) {
        const { occasions, colors, priceRange } = req.query;
        try {
            let constraints = [];

            const addConstraints = (value, filter) => {
                const values = JSON.parse(value || '[]')
                if (values && values.length) {
                    values.forEach(item => {
                        constraints.push({ [filter]: item })
                    });
                }
            }
            addConstraints(occasions, 'occasions');
            addConstraints(colors, 'colors');
            const { min, max } = JSON.parse(priceRange || '{}')
            min ? constraints.push({ price: { $gte: min } }) : null;
            max ? constraints.push({ price: { $lte: max } }) : null;
            const products = await Product.find(
                constraints.length ? {
                    available: true,
                    $and: constraints
                } : {}
            ) || [];
            return res.status(200).json({ products })
        } catch (e) {
            const { statusCode, errMessage } = handleError(e);
            res.status(statusCode).send(errMessage);
        }
    }
}