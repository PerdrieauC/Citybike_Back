import dotenv
    from "dotenv";

dotenv.config();

export const environnement = {
    api_name: process.env.API_NAME || 'CityBike API',
    api_version: process.env.API_VERSION || '0.1.0',
    api_description: process.env.API_DESCRIPTION || 'CityBike : Tutored project A23',
    api_port: process.env.API_PORT || 3000,
    api_host: process.env.API_HOST || 'localhost',
    api_base_path: process.env.API_BASE_PATH || '/',
    api_schemes: process.env.API_SCHEMES || 'http',
    database: {
        dialect: process.env.DATABASE_DIALECT || 'postgres',
        host: process.env.DATABASE_HOST || 'localhost',
        port: Number(process.env.DATABASE_PORT) || 5432,
        username: process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'postgres',
        citybike_service_database: process.env.DATABASE_CITY_BIKE || 'citybike',
        use_ssl: Boolean(process.env.DATABASE_USE_SSL) || false,
        logging: Boolean(process.env.DATABASE_LOGGING) || false,
        synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE) || false,
        timeout: Number(process.env.DATABASE_TIMEOUT) || 2000,
    },
}
