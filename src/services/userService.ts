import CityBikeSource from "../core/datastores/typeorm_datastores";
import {User} from "../entities/user";
import {Logger} from "tslog";
import { ts_logconfig } from '../config/logger';

const logger = new Logger({ ...ts_logconfig, name: 'UserService' });
export const userRepository = CityBikeSource.manager.getRepository(User);

export class UserService {
    static async userExist(email: string, username: string): Promise<boolean> {
        let user
        await userRepository.findOne({
            where: [{
                email: email
            },
            {
                username: username
            }]
        }).then((response) => {
            user = response
        }).catch((error) => {
            logger.error(`Error : ${error}`);
        });
        return user != null;
    }

    static async login(username: string, password: string): Promise<User | null> {
        let user: User | null = null
        await userRepository.findOne({
            where: [{
                username: username,
                password: password
            }]
        }).then((response) =>{
            user = response
        }).catch((error) => {
            logger.error(`Error: ${error}`);
        });
        return user;
    }

    static async createUser(user: User): Promise<User | null> {
        let createdUser: User | null = null;
        await userRepository.save(user)
            .then((response) => {
            createdUser = response;
            }). catch((error) => {
                logger.error(`Error: ${error}`);
            });
        return createdUser;
    }

    static async getUserById(id: string): Promise<User | null> {
        let user: User | null = null
        await userRepository.findOne({
            where: [{
                user_id: id
            }]
        }).then((response) =>{
            user = response
        }).catch((error) => {
            logger.error(`Error: ${error}`);
        });
        return user;
    }

    static async getUsers(): Promise<User[] | null> {
        let users: User [] = []
        await userRepository.find().then((response) => {
            users = response
        }).catch((error) => {
            logger.error(`Error: ${error}`);
        });
        return users;
    }

    static async deleteUser(id: string): Promise<void> {
        await userRepository.findOne({
            where: { user_id: id},
        }).then((user?) => {
            if(user) {
                userRepository.remove(user)
            }
        }).catch((error) => {
            logger.error(`Error: ${error}`);
        });
    }
}
