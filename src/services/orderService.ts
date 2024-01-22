import {Logger} from "tslog";
import {ts_logconfig} from "../config/logger";
import CityBikeSource from "../core/datastores/typeorm_datastores";
import {Order} from "../entities/order";

const logger = new Logger({ ...ts_logconfig, name: 'OrderService' });
export const orderRepository = CityBikeSource.manager.getRepository(Order);

export class OrderService {
    static async createOrder(order: Order): Promise<Order | null> {
        let createdOrder: Order | null = null;
        await orderRepository.save(order)
            .then((response) => {
                createdOrder = response;
            }). catch((error) => {
                logger.error(`Error: ${error}`);
            });
        return createdOrder;
    }

    static async getOrderById(id: string): Promise<Order | null> {
        let order: Order | null = null
        await orderRepository.findOne({
            where: [{
                order_id: id
            }]
        }).then((response) =>{
            order = response
        }).catch((error) => {
            logger.error(`Error: ${error}`);
        });
        return order;
    }

    static async getOrders(): Promise<Order[] | null> {
        let orders: Order [] = []
        await orderRepository.find().then((response) => {
            orders = response
        }).catch((error) => {
            logger.error(`Error: ${error}`);
        });
        return orders;
    }

    static async deleteOrder (id: string): Promise<boolean | null> {
        let result: Boolean | null = null
        await orderRepository.findOne({
            where: { order_id: id},
        }).then((order?) => {
            if(order) {
                orderRepository.remove(order).then((response) => {
                    result = true;
                }).catch((error) => {
                    logger.error(`Error: ${error}`);
                });
            }
            result = false
        }).catch((error) => {
            logger.error(`Error: ${error}`);
        });
        return result
    }

    static async updateOrder (order: Order): Promise<boolean | null> {
        let result: Boolean | null = null
        await orderRepository.update({product_id: order.product_id}, order)
            .then((response) => {
                if(response?.affected && response?.affected >= 1) {
                    result = true;
                }
                result = false
            })
            .catch((error) => {
                logger.error(`Error: ${error}`)
            })
        return result
    }
}
