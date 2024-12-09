import Query from "@context/shared/domain/queryBus/query";

export type RefreshTokenQueryParams = {
    refreshToken: string
}

export default class RefreshTokenQuery extends Query {
    readonly refreshToken: string;

    constructor(params: RefreshTokenQueryParams) {
        super();
        this.refreshToken = params.refreshToken;
    }
}