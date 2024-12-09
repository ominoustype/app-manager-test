import { RolePrimitives } from '@context/roles/domain/role';
import InterfaceTokenator, { TokenPayload } from '@src/domain/session/tokenator';
import { UserPrimitives } from '@src/domain/user';
import { JwtPayload, Secret, sign, TokenExpiredError, verify } from 'jsonwebtoken';

export const SECRET_KEY: Secret = 'appmanager';
export const ACCESS_EXPIRES_IN = 300;
export const REFRESH_EXPIRES_IN = '14 days';

export default class Tokenator implements InterfaceTokenator {

    constructor() {
    }

    generateAccessToken(user: Partial<UserPrimitives>, role: Partial<RolePrimitives>): string {
        const accessToken = sign({
            id: user.id, 
            username: user.username,
            //source: 'ADMIN_UI_WEB', //? 
            permissions: {
                id: user.role?.name,
                environmentIds: [role.environmentIds]
            }
        },
            SECRET_KEY,
        { 
            expiresIn: ACCESS_EXPIRES_IN
        });

        return accessToken;
    }

    generateRefreshToken(user: Partial<UserPrimitives>): string {
        const refreshToken = sign({ 
            id: user.id, 
            username: user.username 
        },
            SECRET_KEY,
        {
            expiresIn: REFRESH_EXPIRES_IN
        });

        return refreshToken;
    }

    /* The verify() function fails if the given token is not valid. Otherwise it returns the already 
    verified token as a decoded legible token (aka payload) */
    verify(token: string): { payload: TokenPayload | null, isValid: boolean } {
        try{
            const payload = verify(
                token, 
                SECRET_KEY
            ) as TokenPayload;

            return { payload: payload, isValid: true };
        }
        catch(e){
            if (e instanceof TokenExpiredError) { 
                console.log("Expired Token!");
            }
            return { payload: null, isValid: false };
        }
    }

    isValid(token: string): boolean {
        try{
            verify(token, SECRET_KEY);
            return true;
        }
        catch(e) {
            if (e instanceof TokenExpiredError) { 
                console.log("Expired Token!");
            }
            return false;
        }
    }

    timeToLife(token: JwtPayload): number {
        const currentTime = Math.floor(Date.now() / 1000);

        const timeToLife = token.exp! - currentTime;

        return timeToLife;
    }
}