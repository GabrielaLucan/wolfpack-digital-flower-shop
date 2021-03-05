import express from 'express';
const { Router } = express;
import RecommendationController from "./recommendations.controller.js"
const router = new Router();

router.route("/")
    .get(RecommendationController.listRecommendations)

export default router

