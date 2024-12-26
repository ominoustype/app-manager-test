import { dependencies, HANDLERS } from './application.di';
import { NextFunction, Request, Response } from 'express'
import AuthUserQuery from '@context/users/application/auth/authUserQuery';
import AuthUserQueryHandler from '@context/users/application/auth/authUserQueryHandler';
import AuthUserResponse from '@context/users/application/auth/authUserResponse';

export interface CustomRequest extends Request {
    user: User
}

type Permissions = {
    environmentIds: Array<string>;
};

type User = {
    permissions: Permissions;
    username: string;
};

export async function auth(req: Request, res: Response, next: NextFunction) {
    console.log("Request for authUser triggered");

    const handler = dependencies.get(HANDLERS).query.get(AuthUserQuery) as
        AuthUserQueryHandler;

    const accessToken = req.header('Authorization')?.replace('Bearer ', '');

    try {
        const response = await handler.handle(new AuthUserQuery({
            accessToken: accessToken ? accessToken : ""
        })) as AuthUserResponse;

        (req as CustomRequest).user = {
            permissions: {
                environmentIds: response.environmentIds
            },
            username: response.username
        };
        
        next();
    }
    catch(e) {
        res;
        next(e);
    }
}
