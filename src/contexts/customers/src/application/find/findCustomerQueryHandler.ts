import { QueryHandler } from '@context/shared/domain/queryBus/queryHandler';
import FindCustomerQuery from "./findCustomerQuery";
import FindCustomerResponse from './findCustomerResponse';
import Query from '@context/shared/domain/queryBus/query';
import CustomerFinder from './customerFinder';

export default class FindCustomerQueryHandler implements QueryHandler<FindCustomerQuery,FindCustomerResponse> {
    private readonly finder: CustomerFinder;

    constructor(finder: CustomerFinder) {
        this.finder = finder;
    }
    subscribedTo(): Query {
        return FindCustomerQuery;
    }
    handle(query: FindCustomerQuery): Promise<FindCustomerResponse> {
        return this.finder.run(query);
    }
    
}