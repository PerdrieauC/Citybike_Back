import {Request, Response} from "express";
import {ProductService} from "../../services/productService";
import {Product} from "../../entities/product";

export class productController {
    static async getProduct(req: Request, res: Response) {
        await ProductService.getProductById(req.params.product_id)
            .then((response) => {
                if (response === null) {
                    res.status(404).json({ message: 'Product not found' });
                }
                res.status(200).json(response);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    static async getAllProduct(req: Request, res: Response) {
        await ProductService.getProducts()
            .then((response) => {
                if(response === null) {
                    res.status(404).json({message: 'Product not found'});
                }
                res.status(200).json(response)
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    static async postProduct(req: Request, res: Response) {
        const product = new Product();
        product.seller_id = req.body.seller_id;
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.quantity_available = req.body.quantity_available;
        product.category = req.body.category;
        product.img = req.body.img;

        await ProductService.createProduct(product).then((response) => {
            res.status(200).json(response);
        }).catch((error) => {
            res.status(500).json(error);
        })
    }

    static async updateProduct(req: Request, res: Response) {
        await ProductService.getProductById(req.params.product_id)
            .then(async (response) => {
                if (!response) {
                    res.status(404).json({message: 'Product not found'});
                } else {
                    response.seller_id = req.body.seller_id;
                    response.name = req.body.name;
                    response.description = req.body.description;
                    response.price = req.body.price;
                    response.quantity_available = req.body.quantity_available;
                    response.category = req.body.category;
                    response.img = req.body.img;
                    await ProductService.updateProduct(response).then((updated) => {
                        if (updated) res.status(200).json(response)
                        else res.status(404).json({message: 'Product not found'});
                    })
                }
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    static async deleteProduct(req: Request, res: Response) {
        await ProductService.deleteProduct(req.params.product_id).then((response) => {
            if(response) {
                res.status(200).json(response);
            } else {
                res.status(404).json({message: 'Product not found'});
            }
        }).catch((error) => {
            res.status(500).json(error);
        });
    }
}
