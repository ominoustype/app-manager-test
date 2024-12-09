import CustomerRepositoryMock from "@src/__mock__/customerRepositoryMock";
import SearchCustomersQueryHandler from "./searchCustomersQueryHandler";
import CustomersSearcher from "./customersSearcher";
import CustomersMother from "@src/domain/customers.mother";
import SearchCustomersQueryMother from "./searchCustomersQuery.mother";
import SearchCustomersResponseMother from "./searchCustomersResponse.mother";

describe('customersSearcher', () => {
    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new CustomerRepositoryMock(),
            handler = new SearchCustomersQueryHandler(
                new CustomersSearcher(repository)
            ),
            query = SearchCustomersQueryMother.random();

        repository.whenSearchThenReturn(CustomersMother.empty());

        await handler.handle(query);

        repository.assertSearchHasBeenCalledWith(query.params);
    });

    it('should return an empty response when there are no customers', async () => {
        expect.hasAssertions();

        const repository = new CustomerRepositoryMock(),
            handler = new SearchCustomersQueryHandler(
                new CustomersSearcher(repository)
            ),
            query = SearchCustomersQueryMother.random();

        repository.whenSearchThenReturn(CustomersMother.empty());

        const response = await handler.handle(query);

        expect(response).toStrictEqual(SearchCustomersResponseMother.empty());
    });
    
    it('should return a response with customers when there are customers', async () => {
        expect.hasAssertions();

        const repository = new CustomerRepositoryMock(),
            handler = new SearchCustomersQueryHandler(
                new CustomersSearcher(repository)
            ),
            query = SearchCustomersQueryMother.random(),
            customers = CustomersMother.random(),
            expected = SearchCustomersResponseMother.fromCustomers(customers);

        repository.whenSearchThenReturn(customers);

        const response = await handler.handle(query);

        expect(response).toStrictEqual(expected);
    });
});