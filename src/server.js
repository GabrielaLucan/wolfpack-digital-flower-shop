import express from "express"
import bodyParser from "body-parser"
import yamljs from "yamljs";
import orders from "./api/orders.route.js";
import products from "./api/products.route.js";
import recommendations from "./api/recommendations.route.js"
import path from 'path';
import cors from 'cors';

const app = express()
const __dirname = path.resolve();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// Register api routes
app.use("/api/v1/orders", orders)
app.use("/api/v1/products", products)
app.use("/api/v1/recommendations", recommendations)

// // Make openapi definition available
const swaggerDoc = yamljs.load(__dirname + '/src/swagger/index.yaml');
const swaggerJson = JSON.stringify(swaggerDoc);

app.get('/api/v1/openapi', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerJson);
});


app.use("*", (req, res) => res.status(404).json({ error: "not found" }))


export default app