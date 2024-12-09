import Customer from "./customer";
import CustomerId from "./customerId";
import CustomerRepository from "./customerRepository";
import CustomerNotFoundError from "./errors/customerNotFound";

export default class CustomerFinder {
    private readonly repository: CustomerRepository;

    constructor(repository: CustomerRepository) {
        this.repository = repository;
    }

    async find(id: string): Promise<Customer> {
        const customer = await this.repository.find(new CustomerId(id));

        if(!customer)
            throw new CustomerNotFoundError(id);

        return customer;
    }
}