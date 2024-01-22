import {Request, Response} from "express";
import {OrderService} from "../../services/orderService";
import {Order} from "../../entities/order";

export class orderController {
    static async getOrder(req: Request, res: Response) {
        await OrderService.getOrderById(req.params.order_id)
            .then((response) => {
                if (response === null) {
                    res.status(404).json({ message: 'Order not found' });
                }
                res.status(200).json(response);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    static async getAllOrder(req: Request, res: Response) {
        await OrderService.getOrders()
            .then((response) => {
                if(response === null) {
                    res.status(404).json({message: 'Order not found'});
                }
                res.status(200).json(response)
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    static async postOrder(req: Request, res: Response) {
        const order = new Order();
        order.buyer_id = req.body.buyer_id;
        order.product_id = req.body.product_id;
        order.quantity_ordered = req.body.quantity_ordered;
        order.total_price = req.body.total_price;

        await OrderService.createOrder(order).then((response) => {
            res.status(200).json(response);
        }).catch((error) => {
            res.status(500).json(error);
        })
    }

    static async updateOrder(req: Request, res: Response) {
        await OrderService.getOrderById(req.params.order_id)
            .then(async (response) => {
                if (!response) {
                    res.status(404).json({message: 'Order not found'});
                } else {
                    response.buyer_id = req.body.buyer_id;
                    response.product_id = req.body.product_id;
                    response.quantity_ordered = req.body.quantity_ordered;
                    response.total_price = req.body.total_price;
                    await OrderService.updateOrder(response).then((updated) => {
                        if (updated) res.status(200).json(response)
                        else res.status(404).json({message: 'Order not found'});
                    })
                }
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    static async deleteOrder(req: Request, res: Response) {
        await OrderService.deleteOrder(req.params.product_id).then((response) => {
            if(response) {
                res.status(200).json(response);
            } else {
                res.status(404).json({message: 'Order not found'});
            }
        }).catch((error) => {
            res.status(500).json(error);
        });
    }
}
