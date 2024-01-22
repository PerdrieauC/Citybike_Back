import 'reflect-metadata';
import {DataSource} from "typeorm";
import {dataSource} from "../../config/data-source";
import {environnement} from "../../config/environnement";
import {User} from "../../entities/user";
import {Product} from "../../entities/product";
import {Order} from "../../entities/order";
import {Cart} from "../../entities/cart";
import {Favorite} from "../../entities/favorite";

const CityBikeSource = new DataSource({
    type: 'postgres',
    host: environnement.database.host,
    port: environnement.database.port,
    username: environnement.database.username,
    password: environnement.database.password,
    database: environnement.database.citybike_service_database,
    logging: environnement.database.logging,
    synchronize: environnement.database.synchronize,
    entities: [User, Product, Order, Cart, Favorite],
    migrations: ['src/core/migrations/*ts']
});

export default CityBikeSource;
