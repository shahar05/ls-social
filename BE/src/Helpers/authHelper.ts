import jwt, { VerifyErrors } from 'jsonwebtoken';
import { User } from '../models';

const env = { secret: 'this is my sercet shhh...' }

export abstract class Authenticate {

    static  createToken(user: User) {
        const token = jwt.sign({
            user,
        }, env.secret, { expiresIn: '3h' });
        return token;
    }

    static deserializeObject(token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, env.secret, (err: VerifyErrors, decodedObj: any) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(decodedObj);
            });
        });
    }


}