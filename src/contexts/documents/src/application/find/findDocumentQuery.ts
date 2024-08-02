import Query from '@context/shared/domain/queryBus/query';

export type FindDocumentQueryParams = {
    id: string;
};

export default class FindDocumentQuery extends Query {
    readonly id: string;

    constructor(params: FindDocumentQueryParams) {
        super();
        this.id = params.id;
    }
}
