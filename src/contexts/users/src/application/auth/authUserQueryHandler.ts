import { QueryHandler } from "@context/shared/domain/queryBus/queryHandler";
import AuthUserQuery from "./authUserQuery";
import AuthUserResponse from "./authUserResponse";
import Query from "@context/shared/domain/queryBus/query";
import UserAuth from "./userAuth";

export default class AuthUserQueryHandler implements QueryHandler<AuthUserQuery, AuthUserResponse> {

    private readonly userAuth: UserAuth;

    constructor(userAuth: UserAuth) {
        this.userAuth = userAuth;
    }
    
    subscribedTo(): Query {
        return AuthUserQuery;
    }
    
    handle(query: AuthUserQuery): Promise<AuthUserResponse> {
        return this.userAuth.run(query);
    }
}