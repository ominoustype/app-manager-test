import { NextFunction, Request, Response } from 'express'
import TokenatorInterface from '@context/users/domain/session/tokenator';
import { dependencies } from './application.di';
import TokenRepository from '@context/users/infrastructure/persistence/redis/tokenRedisRespository';

export interface CustomRequest extends Request {
    user: {
        permissions: {
            environmentIds: Array<string>
        },
        username: string
    }
}

/* 
    Three levels:

    I - Check if there is an Access Token in headers
   II - Check that the given token is NOT blacklisted
  III - Verify the given token is valid

*/
export async function auth(req: Request, res: Response, next: NextFunction) {
    const tokenator = dependencies.get('tokenGenerator') as TokenatorInterface;
    const redisClient = dependencies.get('tokenRepository') as TokenRepository;

    try {
        const accessToken = req.header('Authorization')?.replace('Bearer ', '');

        if (!accessToken) {
            throw new Error("No token!");
        }

        const cached = await redisClient.find(accessToken);

        if(cached){
            throw new Error("Blacklisted token")
        }
        else {
            console.log("Auth: AccessToken OK (not blacklisted)");
        }

        const { payload, isValid } = tokenator.verify(accessToken);

        if(isValid){
            console.log(JSON.stringify(payload));
   
            const user: CustomRequest["user"] = {
                permissions: {
                    environmentIds:  payload!.permissions.environmentIds
                },
                username: payload!.username
            };

            (req as CustomRequest).user = user;
        }
        else 
            throw new Error("Invalid token");

        next();
    }
    catch (e) {
        console.log(e);
        res.status(401).send({ error: e });
    }
}
