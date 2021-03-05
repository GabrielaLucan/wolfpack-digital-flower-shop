import express from 'express';
const { Router } = express;
import ProductController from "./products.controller.js"

const router = new Router()

router.route("/")
    .get(ProductController.listProducts)
    .post(ProductController.createProduct)
router.route("/:productId")
    .put(ProductController.updateProduct)
    .delete(ProductController.deleteProduct)

export default router
