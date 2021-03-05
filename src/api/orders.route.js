import express from 'express';
const { Router } = express;
import OrdersController from "./orders.controller.js"

const router = new Router()

router.route("/")
    .get(OrdersController.listOrders)
    .post(OrdersController.createOrder)
router.route("/:orderId")
    .put(OrdersController.updateOrder)

export default router
