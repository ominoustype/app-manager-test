import Query from '@context/shared/domain/queryBus/query';

export type SearchByEnvironmentDocumentsQueryParams = {
    environment: string;
};

export type SearchByEnvironmentDocumentQueryPermissions = {
    environmentIds: Array<string>
};

export default class SearchByEnvironmentDocumentsQuery extends Query {
    readonly params: SearchByEnvironmentDocumentsQueryParams;
    readonly permissions: SearchByEnvironmentDocumentQueryPermissions;

    constructor(params: SearchByEnvironmentDocumentsQueryParams, permissions: SearchByEnvironmentDocumentQueryPermissions) {
        super();
        this.params = params;
        this.permissions = permissions;
    }
}
