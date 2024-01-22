import {Request, Response} from "express";
import {CartService} from "../../services/cartService";
import {Cart} from "../../entities/cart";

export class cartController {
    static async getCarts(req: Request, res: Response) {
        await CartService.getCartsById(req.params.user_id)
            .then((response) => {
                if (response === null) {
                    res.status(404).json({ message: 'Cart not found' });
                }
                res.status(200).json(response);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    static async getAllCart(req: Request, res: Response) {
        await CartService.getCarts()
            .then((response) => {
                if(response === null) {
                    res.status(404).json({message: 'Cart not found'});
                }
                res.status(200).json(response)
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    static async postCart(req: Request, res: Response) {
        const cart = new Cart();
        cart.user_id = req.body.user_id;
        cart.product_id = req.body.product_id;
        cart.quantity = req.body.quantity;

        await CartService.createCart(cart).then((response) => {
            res.status(200).json(response);
        }).catch((error) => {
            res.status(500).json(error);
        })
    }

    static async updateCart(req: Request, res: Response) {
        await CartService.getCart(req.params.user_id, req.params.product_id)
            .then(async (response) => {
                if (response) {
                    response.user_id = req.body.user_id;
                    response.product_id = req.body.product_id;
                    response.quantity = req.body.quantity;
                    await CartService.updateCart(response).then((updated) => {
                        if (updated) res.status(200).json(response)
                        else res.status(404).json({message: 'Cart not found'});
                    })
                }
                res.status(404).json({message: 'Cart not found'});
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    static async deleteCart(req: Request, res: Response) {
        await CartService.deleteCart(req.params.cart_id).then((response) => {
            if(response) {
                res.status(200).json(response);
            }
            res.status(404).json({message: 'Cart not found'});
        }).catch((error) => {
            res.status(500).json(error);
        });
    }
}
