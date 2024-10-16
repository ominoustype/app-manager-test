import Query from '@context/shared/domain/queryBus/query';

export type SearchByEnvironmentDocumentsQueryParams = {
    environment: string;
};

export default class SearchByEnvironmentDocumentsQuery extends Query {
    readonly params: SearchByEnvironmentDocumentsQueryParams;

    constructor(params: SearchByEnvironmentDocumentsQueryParams) {
        super();
        this.params = params;
    }
}
