import { Response } from "@context/shared/domain/queryBus/response";
import { TokenPayload } from "@src/domain/session/tokenator";

export default class AuthUserResponse implements Response {
    readonly environmentIds: Array<string>;
    readonly username: string;

    constructor(tokenPayload: TokenPayload) {
        this.environmentIds = tokenPayload.permissions.environmentIds
        this.username = tokenPayload.username;
    }
}