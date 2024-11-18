import { Response } from '@context/shared/domain/queryBus/response';
import Token from '@src/domain/session/token';

export default class LogInUserResponse implements Response {
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly username: string

    constructor(token: Token, username: string) {
        this.accessToken = token.token;
        this.refreshToken = token.refreshToken;
        this.username = username;
    }
}
