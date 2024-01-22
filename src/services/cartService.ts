import {Logger} from "tslog";
import {ts_logconfig} from "../config/logger";
import CityBikeSource from "../core/datastores/typeorm_datastores";
import {Cart} from "../entities/cart";

const logger = new Logger({ ...ts_logconfig, name: 'CartService' });
export const cartRepository = CityBikeSource.manager.getRepository(Cart);

export class CartService {
    static async createCart(cart: Cart): Promise<Cart | null> {
        let createdCart: Cart | null = null;
        await cartRepository.save(cart)
            .then((response) => {
                createdCart = response;
            }). catch((error) => {
                logger.error(`Error: ${error}`);
            });
        return createdCart;
    }

    static async getCart(user_id: string, product_id: string): Promise<Cart | null> {
        let cart: Cart | null = null;
        await cartRepository.findOne({
            where: [{
                user_id: user_id,
                product_id: product_id
            }]
        }).then((response) => {
            cart = response
        }).then((error) => {
            logger.error(`Error: ${error}`)
        })
        return cart
    }

    static async getCartsById(id: string): Promise<Cart[] | null> {
        let carts: Cart[] | null = null
        await cartRepository.find({
            where: [{
                user_id: id
            }]
        }).then((response) =>{
            carts = response
        }).catch((error) => {
            logger.error(`Error: ${error}`);
        });
        return carts;
    }

    static async getCarts(): Promise<Cart[] | null> {
        let carts: Cart [] = []
        await cartRepository.find().then((response) => {
            carts = response
        }).catch((error) => {
            logger.error(`Error: ${error}`);
        });
        return carts;
    }

    static async deleteCart (id: string): Promise<boolean | null> {
        let result: Boolean | null = null
        await cartRepository.findOne({
            where: { cart_id: id},
        }).then((cart?) => {
            if(cart) {
                cartRepository.remove(cart).then((response) => {
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

    static async updateCart (cart: Cart): Promise<boolean | null> {
        let result: Boolean | null = null
        await cartRepository.update({cart_id: cart.cart_id}, cart)
            .then((response) => {
                if(response.affected && response?.affected >= 1) {
                    result = true;
                }
                result = false
            })
            .catch((error) => {
                logger.error(`Error: ${error}`)
            });
        return result
    }
}
