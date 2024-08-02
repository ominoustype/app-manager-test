import Query from "@context/shared/domain/queryBus/query";

export type FindEnviromentQueryParams = {
    id: string;
};

export default class FindEnviromentQuery extends Query{
    readonly id: string;

    constructor(params: FindEnviromentQueryParams) {
        super();
        this.id = params.id;
    }
}