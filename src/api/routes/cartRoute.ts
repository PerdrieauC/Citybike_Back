import express, {Request, Response} from "express";
import {cartController} from "../controllers/cartController";

const _cartRoutes = express.Router();

_cartRoutes.get('/cart/:user_id', async (req: Request, res: Response) => {
    await cartController.getCarts(req, res);
});

_cartRoutes.post('/cart/create', async (req: Request, res: Response) => {
    await cartController.postCart(req, res);
});

_cartRoutes.get('/cart/delete/:cart_id', async (req: Request, res: Response) => {
    await cartController.deleteCart(req, res);
});

_cartRoutes.post('/cart/update/:cart_id', async (req: Request, res: Response) => {
    await cartController.updateCart(req, res);
});

