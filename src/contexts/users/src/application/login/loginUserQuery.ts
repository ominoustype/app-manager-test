import Query from '@context/shared/domain/queryBus/query';

export type LogInUserQueryParams = {
    username: string;
    password: string
};

export default class LogInUserQuery extends Query {
    readonly username: string;
    readonly password: string;

    constructor(params: LogInUserQueryParams) {
        super();
        this.username = params.username;
        this.password = params.password;
    }
}
