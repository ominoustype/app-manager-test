import Customers, { CustomersPrimitives } from "@src/domain/customers";
import SearchCustomersResponse from "./searchCustomersResponse";
import CustomersMother from "@src/domain/customers.mother";

export default class SearchCustomersResponseMother {
    static create(customers: CustomersPrimitives): SearchCustomersResponse {
        return new SearchCustomersResponse(new Customers(customers));
    }

    static fromCustomers(Customers: Customers) {
        return SearchCustomersResponseMother.create(Customers.toPrimitives());
    }

    static empty() {
        return SearchCustomersResponseMother.fromCustomers(
            CustomersMother.empty()
        );
    }
}