import Query from "@context/shared/domain/queryBus/query"

export type FindByCustomerAndNameRoleQueryParams = {
    name: string,
    customerId: string
};

export default class FindByCustomerAndNameRoleQuery extends Query {
    readonly name: string;
    readonly customerId: string;

    constructor(params: FindByCustomerAndNameRoleQueryParams) {
        super();
        this.name = params.name;
        this.customerId = params.customerId;
    }
}