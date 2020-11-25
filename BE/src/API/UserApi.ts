import { response } from "express";
import { UserBL } from "../BL/UserBL";
import { authMiddleware } from "../Middleware/authentication";
import { User } from "../models";
import { BaseClassApi } from "./BaseClassApi";


export class UserApi extends BaseClassApi {

    private userBL: UserBL = new UserBL();

    constructor() {
        super();
    }

    initRoutes(): void {

        this.router.get('/', authMiddleware, (req: any, res) => {
            this.userBL.getUser(req.user._id)
                .then(user => res.send(user))
                .catch(err => res.status(400).send(err))
        })

        this.router.post("/register", (req: any, res) => {
            this.userBL.createUser(req.body)
                .then(user => res.send(user))
                .catch(err =>{
                    console.log(err);
                    res.status(400).send(err);
                });
        });

        this.router.post("/login", (req: any, res) => {
            this.userBL.login(req.body)
                .then((loginRespone: { token: string; loggedUser: User; }) => res.json(loginRespone))
                .catch(err => {
                    console.log('err', err);
                    res.status(400).send(err)
                });
        })


    }
}



