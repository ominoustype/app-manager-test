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

export type SearchDocumentQueryPermissions = {
    environmentIds: Array<string>
};

export default class SearchDocumentsQuery extends Query {
    readonly params: SearchDocumentsQueryParams;
    readonly environmentIds: Array<string>;

    constructor(params: SearchDocumentsQueryParams, permissions: SearchDocumentQueryPermissions) {
        super();
        this.params = params;
        this.environmentIds = permissions.environmentIds;
    }
}
