import {Request, Response, Router} from "express";
import {UserController} from "../controllers/userController";
import bodyParser from "body-parser";

const _userRoutes = Router();

_userRoutes.get('/user/:user_id', async (req: Request, res: Response) => {
    await UserController.getUser(req, res);
});

_userRoutes.post('/login', async (req: Request, res: Response) => {
    console.log('login')
    await UserController.login(req, res);
})

_userRoutes.get('/users', async (req: Request, res: Response) => {
    await UserController.getAllUser(req, res);
});

_userRoutes.post('/user/register', async (req: Request, res: Response) => {
    await UserController.postUser(req, res);
});


export const userRoutes = _userRoutes;
