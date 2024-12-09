import Query from "@context/shared/domain/queryBus/query";
import RefreshTokenResponse from "./refreshTokenResponse";
import { QueryHandler } from "@context/shared/domain/queryBus/queryHandler";
import RefreshTokenQuery from "./refreshTokenQuery";
import TokenRefresher from "./tokenRefresher";

export default class RefreshTokenQueryHandler implements QueryHandler<RefreshTokenQuery, RefreshTokenResponse> {
    private readonly tokenRefresher: TokenRefresher;

    constructor(tokenRefresher: TokenRefresher) {
        this.tokenRefresher = tokenRefresher;
    }

    subscribedTo(): Query {
        return RefreshTokenQuery;
    }

    handle(query: RefreshTokenQuery): Promise<RefreshTokenResponse> {
        return this.tokenRefresher.run(query);
    }
}