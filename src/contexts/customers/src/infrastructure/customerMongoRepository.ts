import Criteria from '@context/shared/domain/criteria/criteria';
import Cursor from '@context/shared/domain/criteria/cursor';
import Filter from '@context/shared/domain/criteria/filter';
import { FilterOperator } from '@context/shared/domain/criteria/filterOperator';
import Filters, { FilterType } from '@context/shared/domain/criteria/filters';
import Orders from '@context/shared/domain/criteria/orders';
import { Nullable } from '@context/shared/domain/nullable';
import MongoRepository from '@context/shared/infrastructure/mongo/mongoRepository';
import { SearchCustomersQueryParams } from '@src/application/search/searchCustomersQuery';
import Customer from '@src/domain/customer';
import CustomerId from '@src/domain/customerId';
import CustomerRepository from '@src/domain/customerRepository';
import Customers from '@src/domain/customers';

const TO_SEARCH_PARAMS_DICT = Object.freeze({
    search: ['name']
});

export default class CustomerMongoRepository extends MongoRepository<Customer> implements CustomerRepository{
    protected moduleName(): string {
        return 'customers';

    }
    protected getCursor(item: Customer, isBackward: boolean): Cursor {
        return Cursor.fromObject({
            _id: item.id.toString(), 
            isBackward 
        });
    }

    find(id: CustomerId): Promise<Nullable<Customer>> {
        return this.byId(id.value, Customer.fromPrimitives);
    }

    async create(customer: Customer): Promise<void> {
        await this.persist(customer.id.value, customer);
    }

    async search(params: SearchCustomersQueryParams): Promise<Customers> {
        const copyParams = { ...params };
        let find = {};

        if (copyParams.search) {
            const orFilters = new Filters(
                TO_SEARCH_PARAMS_DICT.search.map((field) =>
                    Filter.fromValues({
                        field,
                        operator: FilterOperator.Contains,
                        value: copyParams.search!
                    })
                ),
                FilterType.OR
            );

            const orConversions = super.convertCriteria(
                new Criteria(orFilters, Orders.none(), null)
            );

            find = { ...find, ...orConversions.find };

            delete copyParams.search;
        }

        const collection = await this.collection();

        const customer = collection.find(find);
        const items = (await customer.toArray()).map((customer) => 
            this.getParsed(customer)
        );

        return new Customers(
            items.length <= 0 ? [] : items.map((i) => i.toPrimitives())
        );
    }

    getParsed(customer: any): Customer{
        return Customer.fromPrimitives({
            ...customer,
            id: customer._id
        });
    }

    async dropCollection() {
        (await this.collection()).drop();
    }
}