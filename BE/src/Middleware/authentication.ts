import { Response, NextFunction } from "express";
import { Authenticate } from "../Helpers/authHelper";


export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const userToken = req.headers.authorization.split(' ')[1];
        Authenticate.deserializeObject(userToken).then((response: any) => {
            req['user'] = response.user;
            next();
            return;
        }).catch(() => {
            res.sendStatus(401);
        });
    }
    else {
        res.sendStatus(401);
    }
}

