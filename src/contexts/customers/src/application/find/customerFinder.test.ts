import CustomerRepositoryMock from "@src/__mock__/customerRepositoryMock";
import FindCustomerQueryHandler from "./findCustomerQueryHandler";
import CustomerFinder from "./customerFinder";
import FindCustomerQueryMother from "./findCustomerQuery.mother";
import FindCustomerResponseMother from "./findCustomerResponse.mother";
import CustomerNotFoundError from "@src/domain/errors/customerNotFound";
import Uuid from "@context/shared/domain/uuid";

describe('customerFinder', () => {
    it('should call the repository with the id', async () => {
        expect.hasAssertions();

        const repository = new CustomerRepositoryMock(),
            handler = new FindCustomerQueryHandler(
                new CustomerFinder(repository)
            ),
            query = FindCustomerQueryMother.random(),
            customer = FindCustomerQueryMother.randomCustomer(query);

        repository.whenFindThenReturn(customer);

        await handler.handle(query);

        repository.assertFindHasBeenCalledWith(new Uuid(query.id));
    });

    it('should find a customer', async () => {
        expect.hasAssertions();

        const repository = new CustomerRepositoryMock(),
            handler = new FindCustomerQueryHandler(
                new CustomerFinder(repository)
            ),
            query = FindCustomerQueryMother.random(),
            customer = FindCustomerQueryMother.randomCustomer(query),
            expected = FindCustomerResponseMother.create(customer.toPrimitives());


        repository.whenFindThenReturn(customer);

        const response = await handler.handle(query);

        expect(response).toStrictEqual(expected);
    });

    it('should throw a CustomerNotFoundError when the customer does not exist', async () => {
        expect.hasAssertions();

        const repository = new CustomerRepositoryMock(),
            handler = new FindCustomerQueryHandler(
                new CustomerFinder(repository)
            ),
            query = FindCustomerQueryMother.random();

        try {
            repository.whenFindThenReturn(null);

            await handler.handle(query);
        } catch (e) {
            expect(e).toBeInstanceOf(CustomerNotFoundError);
        }
    });
})