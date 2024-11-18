import { NextFunction, Request, Response } from 'express'
import TokenatorInterface, { TokenPayload } from '@context/users/domain/session/tokenator';
import { dependencies } from './application.di';
import RedisService from '@context/shared/infrastructure/redis/redis';

export interface CustomRequest extends Request {
    payload: TokenPayload
}

/* 
    Three levels:

    I - Check if there is an Access Token in headers
   II - Check that the given token is NOT blacklisted
  III - Verify the given token is valid

*/
export async function auth(req: Request, res: Response, next: NextFunction) {
    const tokenator = dependencies.get('tokenGenerator') as TokenatorInterface;
    const redis = dependencies.get('repositories') as RedisService;

    try {
        const accessToken = req.header('Authorization')?.replace('Bearer ', '');

        if (!accessToken) {
            throw new Error("No token!");
        }

        const cached = await redis.get(accessToken);

        if(cached){
            throw new Error("Blacklisted token")
        }
        else {
            console.log("Auth: AccessToken OK (not blacklisted)");
        }

        const { payload, isValid } = tokenator.verify(accessToken);

        if(isValid)
            (req as CustomRequest).payload = payload!;
        else 
            throw new Error("Invalid token");

        next();
    }
    catch (e) {
        res.status(401).send({ error: e });
    }
}
