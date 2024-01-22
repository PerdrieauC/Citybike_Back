import {environnement} from "./environnement";
import {User} from "../entities/user";
import {Product} from "../entities/product";
import {Order} from "../entities/order";
import {Cart} from "../entities/cart";
import {Favorite} from "../entities/favorite";

export const dataSource = {
    type: 'postgres',
    host: environnement.database.host,
    port: environnement.database.port,
    username: environnement.database.username,
    password: environnement.database.password,
    database: environnement.database.citybike_service_database,
    logging: environnement.database.logging,
    synchronize: environnement.database.synchronize,
    entities: [User, Product, Order, Cart, Favorite],
    migrations: ['src/core/migrations/*ts'],
    cli: {
        migrationsDir: "src/core/migrations"
    }
}
