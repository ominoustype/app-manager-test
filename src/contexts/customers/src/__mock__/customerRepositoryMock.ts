import { Nullable } from "@context/shared/domain/nullable";
import Uuid from "@context/shared/domain/uuid";
import { SearchCustomersQueryParams } from "@src/application/search/searchCustomersQuery";
import Customer from "@src/domain/customer";
import CustomerId from "@src/domain/customerId";
import CustomerRepository from "@src/domain/customerRepository";
import Customers from "@src/domain/customers";

export default class CustomerRepositoryMock implements CustomerRepository {
    private mockFind = jest.fn();
    private mockSearch = jest.fn();

    async find(id: CustomerId): Promise<Nullable<Customer>> {
        return this.mockFind(id);
    }
    async search(params: SearchCustomersQueryParams): Promise<Customers> {
        return this.mockSearch(params);
    }

    async whenFindThenReturn(customer: any) {
        this.mockFind.mockReturnValue(Promise.resolve(customer));
    }

    async whenSearchThenReturn(customers: Customers): Promise<void> {
        this.mockSearch.mockReturnValue(customers);
    }

    async assertFindHasBeenCalledWith(id: Uuid): Promise<void> {
        expect(this.mockFind).toHaveBeenCalledWith(id);
    }
    
    async assertSearchHasBeenCalledWith(params: SearchCustomersQueryParams): Promise<void> {
        expect(this.mockSearch).toHaveBeenCalledWith(params);
    }
}