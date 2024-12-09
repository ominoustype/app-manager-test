import Query from '@context/shared/domain/queryBus/query';

export type FindUserQueryParams = {
    username: string;
};

export default class FindUserQuery extends Query {
    readonly username: string;

    constructor(params: FindUserQueryParams) {
        super();
        this.username = params.username;
    }
}
