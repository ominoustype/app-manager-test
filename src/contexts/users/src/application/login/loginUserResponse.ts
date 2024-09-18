import { Response } from '@context/shared/domain/queryBus/response';
import Token from '@src/domain/session/token';
import User from '@src/domain/user';

export default class LogInUserResponse implements Response {
    readonly token: string;
    readonly refreshToken: string;
    readonly username: string;
    readonly email: string;
    readonly name: string;
    readonly role: string;
    
    constructor(token: Token, user: User) {
        this.refreshToken = token.refreshToken;
        this.token = token.token;
        const {username,email,name,role} = user.getLoginResponse();
        this.username = username!;
        this.email = email!;
        this.name = name!;
        this.role = role!.id;
    }
}
