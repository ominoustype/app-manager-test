import Query from '@context/shared/domain/queryBus/query';

export type FindDocumentQueryParams = {
    id: string;
};

export type FindDocumentQueryPermissions = {
    environmentIds: Array<string>
};

export default class FindDocumentQuery extends Query {
    readonly id: string;
    readonly environmentIds: Array<string>;

    constructor(params: FindDocumentQueryParams, permissions: FindDocumentQueryPermissions) {
        super();
        this.id = params.id;
        this.environmentIds = permissions.environmentIds;
    }
}
