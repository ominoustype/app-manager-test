import DomainCustomerFinder from '@src/domain/customerFinder';
import FindCustomerQuery from './findCustomerQuery';
import FindCustomerResponse from './findCustomerResponse';
import CustomerRepository from '@src/domain/customerRepository';

export default class CustomerFinder {
    private readonly finder: DomainCustomerFinder;

    constructor(repository: CustomerRepository) {
        this.finder = new DomainCustomerFinder(repository);
    }

    async run(query: FindCustomerQuery): Promise<FindCustomerResponse>{
        return new FindCustomerResponse(await this.finder.find(query.id));
    }
}