import { Response } from "@context/shared/domain/queryBus/response";
export default class RefreshTokenResponse implements Response {
    readonly accessToken: string;

    constructor(token: string) {
        this.accessToken = token;
    }
}
