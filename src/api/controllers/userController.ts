import { UserService } from '../../services/userService'
import {Request, response, Response} from "express";
import {User} from "../../entities/user";

export class UserController {
    static async getUser(req: Request, res: Response) {
        await UserService.getUserById(req.params.user_id)
            .then((response) => {
                if (response === null) {
                    res.status(404).json({ message: 'User not found' });
                }
                res.status(200).json(response);
            })
            .catch((error) => {
                res.status(404).json(error);
            });
    }

    static async login(req: Request, res: Response) {
        await UserService.login(req.body.username, req.body.password)
            .then((response) => {
                if (response === null) {
                    res.status(404).json({ message: 'User not found' });
                }
                res.status(200).json(response);
            })
            .catch((error) => {
                res.status(404).json(error);
            });
    }

    static async getAllUser(req: Request, res: Response) {
        await UserService.getUsers()
        .then((response) => {
            if(response === null) {
                res.status(404).json({message: 'User not found'});
            }
            res.status(200).json(response)
        })
        .catch((error) => {
            res.status(404).json(error);
        });
    }

    static async postUser(req: Request, res: Response) {
        if (await UserService.userExist(req.body.email, req.body.nom_utilisateur)) {
            res.status(409).json({ message: 'User already exists' });
            return;
        }

        const user = new User();
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;

        await UserService.createUser(user).then((response) => {
            res.status(200).json(response);
        }).catch((error) => {
            res.status(500).json(error);
        })
    }
}
