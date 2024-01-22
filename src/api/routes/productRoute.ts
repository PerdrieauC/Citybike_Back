import express, {Request, Response} from "express";
import {productController} from "../controllers/productController";

const _productRoutes = express.Router();

_productRoutes.get('/product/:product_id', async (req: Request, res: Response) => {
    await productController.getProduct(req, res);
});

_productRoutes.get('/products', async (req: Request, res: Response) => {
    console.log('TEST')
    await productController.getAllProduct(req, res);
});

_productRoutes.post('/product/create', async (req: Request, res: Response) => {
    await productController.postProduct(req, res);
});

export const productRoutes = _productRoutes;
