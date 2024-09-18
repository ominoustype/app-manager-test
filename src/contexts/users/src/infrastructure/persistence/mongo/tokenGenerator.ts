import Token from '@src/domain/session/token';
import InterfaceTokenGenerator from '@src/domain/session/tokenGenerator';
import User from '@src/domain/user';
// import { sign, verify } from 'jsonwebtoken';

export type TokenValidatorConfig = {
    secret: string,
    expiresIn: number
}
export default class TokenGenerator implements InterfaceTokenGenerator {

    constructor() {
    }

    generate(user: User): Token {
        // const token = sign(
        //     {
        //         id: user.id.toString(),
        //         password: user.password?.toString(),
        //         source: 'ADMIN_UI_WEB',
        //         username: user.username.toString()
        //     },
        //     this.config.secret,
        //     { expiresIn: this.config.expiresIn }
        // );
        // const refreshToken = sign(
        //     { id: user.id.toString(), username: user.username.toString() },
        //     this.config.secret,
        //     { notBefore: this.config.expiresIn }
        // );

        // return new Token({token, refreshToken});
        return new Token({token: user.name.toString(), refreshToken: user.username.toString()});
    }

    isValid(token: Token): boolean {
        try {
            // verify(token, this.config.secret);

            return token ? true : false;
        } catch {
            return false;
        }
    }

    decode(token: Token) {
        // return verify(token, this.config.secret);
        this.isValid(token)
        return;
    }
}