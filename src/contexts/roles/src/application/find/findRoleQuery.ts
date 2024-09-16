import Query from "@context/shared/domain/queryBus/query"

export type FindRoleQueryParams = {
    id: string
};

export default class FindRoleQuery extends Query {
    readonly id: string;

    constructor(params: FindRoleQueryParams) {
        super();
        this.id = params.id;
    }
}