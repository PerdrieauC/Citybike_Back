import {Logger} from "tslog";
import {ts_logconfig} from "../config/logger";
import CityBikeSource from "../core/datastores/typeorm_datastores";
import {Favorite} from "../entities/favorite";

const logger = new Logger({ ...ts_logconfig, name: 'FavoriteService' });
export const favoriteRepository = CityBikeSource.manager.getRepository(Favorite);

export class FavoriteService {
    static async createFavorite (favorite: Favorite): Promise<Favorite | null> {
        let createdFavorite: Favorite | null = null;
        await favoriteRepository.save(favorite)
            .then((response) => {
                createdFavorite = response;
            }). catch((error) => {
                logger.error(`Error: ${error}`);
            });
        return createdFavorite;
    }

    static async getFavoriteById(id: string): Promise<Favorite | null> {
        let favorite: Favorite | null = null
        await favoriteRepository.findOne({
            where: [{
                favorite_id: id
            }]
        }).then((response) =>{
            favorite = response
        }).catch((error) => {
            logger.error(`Error: ${error}`);
        });
        return favorite;
    }

    static async getFavorites(): Promise<Favorite[] | null> {
        let favorites: Favorite [] = []
        await favoriteRepository.find().then((response) => {
            favorites = response
        }).catch((error) => {
            logger.error(`Error: ${error}`);
        });
        return favorites;
    }

    static async deleteFavorite (id: string): Promise<boolean | null> {
        let result: Boolean | null = null
        await favoriteRepository.findOne({
            where: { favorite_id: id},
        }).then((favorite?) => {
            if(favorite) {
                favoriteRepository.remove(favorite).then((response) => {
                    result = true
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

    static async updateFavorite (favorite: Favorite): Promise<boolean | null> {
        let result: Boolean | null = null
        await favoriteRepository.update({favorite_id: favorite.favorite_id}, favorite)
            .then((response) => {
                if(response?.affected && response?.affected >= 1) {
                    result = true
                }
                result = false
            })
            .catch((error) => {
                logger.error(`Error: ${error}`)
            })
        return result
    }
}
