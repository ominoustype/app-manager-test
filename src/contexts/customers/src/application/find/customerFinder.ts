import DomainCustomerFinder from '@src/domain/customerFinder';
import FindCustomerQuery from './findCustomerQuery';
import FindCustomerResponse from './findCustomerResponse';
import CustomerRepository from '@src/domain/customerRepository';
import logger from '@context/shared/infrastructure/logger';

export default class CustomerFinder {
    private readonly finder: DomainCustomerFinder;

    constructor(repository: CustomerRepository) {
        this.finder = new DomainCustomerFinder(repository);
    }

    async run(query: FindCustomerQuery): Promise<FindCustomerResponse>{
        const { id } = query;

        logger.info("Finding customer with ", { id });

        return new FindCustomerResponse(await this.finder.find(query.id));
    }
}