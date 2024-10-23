import Query from "@context/shared/domain/queryBus/query";

export type FindCustomerQueryParams = {
    id: string;
}

export default class FindCustomerQuery extends Query {
    readonly id: string;

    constructor(params: FindCustomerQueryParams) {
        super();
        this.id = params.id;
    }
}