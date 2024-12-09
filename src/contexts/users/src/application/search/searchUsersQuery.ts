import Query from '@context/shared/domain/queryBus/query';

export type SearchUsersQueryParams = {
    page_size?: number;
    page?: number;
    search?: string;
    order?: string;
};

export default class SearchUsersQuery extends Query {
    readonly params: SearchUsersQueryParams;

    constructor(params: SearchUsersQueryParams) {
        super();
        this.params = params;
    }
}
