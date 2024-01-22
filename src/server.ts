import dotenv from 'dotenv'
import http from "http";
import { Logger } from "tslog";

import app from './app'
import { ts_logconfig } from './config/logger'
import CityBikeSource from './core/datastores/typeorm_datastores'
import {DataSource} from "typeorm";

const logger = new Logger({...ts_logconfig, name:'Server'})
dotenv.config();

const normalizePort = (val: string): number | boolean => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return Number(val);
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const errorHandler = (error: { syscall: string; code: any }): void => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            logger.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(bind + ' is already in use.');
            // Sugesstion: use a different port
            logger.info('We will try to use a different port');
            port = Number(port) + 1;
            app.set('port', port);
            server.listen(port);
            break;
        default:
            throw error;
    }
};

const initializeDatabase = async (database: DataSource, name: string): Promise<any> => {
    try {
        await database.initialize();
        if (!database.isInitialized) {
            throw new Error(`Unable to connect to the database ${name}`);
        }
        logger.info(`Connection with ${name} database has been established successfully.`);
    } catch (error) {
        logger.error(`Unable to connect to the ${name} database:\n`, error);
        throw error;
    }
};

let port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

try {
    Promise.all([
        initializeDatabase(CityBikeSource, 'CityBikeSource')
    ]);

    server.on('error', errorHandler);
    server.on('listening', () => {
        const address = server.address();
        const bind = typeof address === 'string' ? `pipe ${address}` : `http://localhost:${address?.port}`;
        logger.info(`⚡️[server]: Server is running at ${bind}`);
    });
} catch (error) {
    logger.error('Unable to start the server');
}
