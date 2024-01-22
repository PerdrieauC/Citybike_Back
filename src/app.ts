import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import {userRoutes} from "./api/routes/userRoute";
import { cors_config } from "./config/cors";
import {apiConfig} from "./config/api_config";
import "reflect-metadata";
import {productRoutes} from "./api/routes/productRoute";

const app = express();
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.raw({ limit: '50mb' }));
app.use(cors(cors_config));

app.use(apiConfig.base_path, userRoutes);
app.use(apiConfig.base_path, productRoutes);

export default app;
