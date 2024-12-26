import Query from "@context/shared/domain/queryBus/query"

export type AuthUserQueryParams = {
    accessToken: string
}

export default class AuthUserQuery extends Query {
    readonly accessToken: string;

    constructor(params: AuthUserQueryParams) {
        super();
        this.accessToken = params.accessToken
    }
}