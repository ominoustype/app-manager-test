import UuidMother from "@context/shared/domain/uuid.mother";
import FindCustomerQuery, { FindCustomerQueryParams } from "./findCustomerQuery";
import CustomerMother from "@src/domain/customer.mother";
import Customer from "@src/domain/customer";

export default class FindCustomerQueryMother {
    static create(query: FindCustomerQueryParams): FindCustomerQuery {
        return new FindCustomerQuery(query);
    }

    static random() {
        return FindCustomerQueryMother.create({
            id: UuidMother.random().toString()
        });
    }

    static randomCustomer(query: FindCustomerQuery): Customer {
        const id = UuidMother.create(query.id).toString();
        return CustomerMother.random({ id });
    }
}