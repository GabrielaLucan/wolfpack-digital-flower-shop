import app from "./server.js"
import http from "http"

import { connectDb } from './models/index.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8000;

connectDb().then(async () => {
    http.createServer(app).listen(PORT, () =>
        console.log(`App listening on port ${PORT}!`),
    );
});

