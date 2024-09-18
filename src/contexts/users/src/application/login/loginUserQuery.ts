import Query from '@context/shared/domain/queryBus/query';

export type LogInUserQueryParams = {
    username: string;
};

export default class LogInUserQuery extends Query {
    readonly username: string;

    constructor(params: LogInUserQueryParams) {
        super();
        this.username = params.username;
    }
}
