import Query from '@context/shared/domain/queryBus/query';

export type SearchDocumentsQueryParams = {
    page_size?: number;
    page?: number;
    search?: string;
    order?: string;
    environment?: string;
    customer?: string;
    count?: boolean;
};

export default class SearchDocumentsQuery extends Query {
    readonly params: SearchDocumentsQueryParams;

    constructor(params: SearchDocumentsQueryParams) {
        super();
        this.params = params;
    }
}
