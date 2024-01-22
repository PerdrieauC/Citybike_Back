import {Request, Response} from "express";
import {FavoriteService} from "../../services/favoriteService";
import {Favorite} from "../../entities/favorite";

export class favoriteController {
    static async getFavorite(req: Request, res: Response) {
        await FavoriteService.getFavoriteById(req.params.favorite_id)
            .then((response) => {
                if (response === null) {
                    res.status(404).json({ message: 'Favorite not found' });
                }
                res.status(200).json(response);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    static async getAllFavorite(req: Request, res: Response) {
        await FavoriteService.getFavorites()
            .then((response) => {
                if(response === null) {
                    res.status(404).json({message: 'Favorite not found'});
                }
                res.status(200).json(response)
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    static async postFavorite(req: Request, res: Response) {
        const favorite = new Favorite();
        favorite.user_id = req.body.user_id;
        favorite.product_id = req.body.product_id;

        await FavoriteService.createFavorite(favorite).then((response) => {
            res.status(200).json(response);
        }).catch((error) => {
            res.status(500).json(error);
        })
    }

    static async updateFavorite(req: Request, res: Response) {
        await FavoriteService.getFavoriteById(req.params.favorite_id)
            .then(async (response) => {
                if (!response) {
                    res.status(404).json({message: 'Favorite not found'});
                } else {
                    response.user_id = req.body.user_id;
                    response.product_id = req.body.product_id;
                    await FavoriteService.updateFavorite(response).then((updated) => {
                        if (updated) res.status(200).json(response)
                        else res.status(404).json({message: 'Favorite not found'});
                    })
                }
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    static async deleteFavorite(req: Request, res: Response) {
        await FavoriteService.deleteFavorite(req.params.favorite_id).then((response) => {
            if(response) {
                res.status(200).json(response);
            } else {
                res.status(404).json({message: 'Favorite not found'});
            }
        }).catch((error) => {
            res.status(500).json(error);
        });
    }
}
