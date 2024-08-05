import Query from "@context/shared/domain/queryBus/query";

export type FindEnvironmentQueryParams = {
    id: string;
};

export default class FindEnvironmentQuery extends Query{
    readonly id: string;

    constructor(params: FindEnvironmentQueryParams) {
        super();
        this.id = params.id;
    }
}