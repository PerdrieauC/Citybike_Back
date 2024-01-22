import {Logger} from "tslog";
import {ts_logconfig} from "../config/logger";
import CityBikeSource from "../core/datastores/typeorm_datastores";
import {Product} from "../entities/product";

const logger = new Logger({ ...ts_logconfig, name: 'ProductService' });
export const productRepository = CityBikeSource.manager.getRepository(Product);

export class ProductService {
    static async createProduct(product: Product): Promise<Product | null> {
        let createdproduct: Product | null = null;
        await productRepository.save(product)
            .then((response) => {
                createdproduct = response;
            }). catch((error) => {
                logger.error(`Error: ${error}`);
            });
        return createdproduct;
    }

    static async getProductById(id: string): Promise<Product | null> {
        let product: Product | null = null
        await productRepository.findOne({
            where: [{
                product_id: id
            }]
        }).then((response) =>{
            product = response
        }).catch((error) => {
            logger.error(`Error: ${error}`);
        });
        return product;
    }

    static async getProducts(): Promise<Product[] | null> {
        let products: Product [] = []
        await productRepository.find().then((response) => {
            products = response
        }).catch((error) => {
            logger.error(`Error: ${error}`);
        });
        return products;
    }

    static async deleteProduct (id: string): Promise<boolean | null> {
        let result: Boolean | null = null
        await productRepository.findOne({
            where: { product_id: id},
        }).then((product?) => {
            if(product) {
                productRepository.remove(product).then((response) => {
                    result = true;
                }).catch((error) => {
                    logger.error(`Error: ${error}`);
                });
            } else result = false;
        }).catch((error) => {
            logger.error(`Error: ${error}`);
        });
        return result
    }

    static async updateProduct (product: Product): Promise<boolean | null> {
        let result: Boolean | null = null
        await productRepository.update({product_id: product.product_id}, product)
            .then((response) => {
                if(response.affected && response.affected >= 1) {
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
