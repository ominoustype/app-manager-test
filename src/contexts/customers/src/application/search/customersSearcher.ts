import CustomerRepository from "@src/domain/customerRepository";
import SearchCustomersQuery from "./searchCustomersQuery";
import SearchCustomersResponse from "./searchCustomersResponse";

export default class CustomersSearcher {
    private readonly repository: CustomerRepository;

    constructor(repository: CustomerRepository) {
        this.repository = repository;
    }

    async run(query: SearchCustomersQuery): Promise<SearchCustomersResponse> {
        return new SearchCustomersResponse(await this.repository.search(query.params));
    }
}