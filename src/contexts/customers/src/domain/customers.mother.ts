import Customer from "./customer";
import CustomerMother from "./customer.mother";
import Customers, { CustomersPrimitives } from "./customers";

export default class CustomersMother {
    static create(customers: CustomersPrimitives): Customers {
        return new Customers(customers);
    }

    static empty(): Customers {
        return CustomersMother.create([]);
    }

    static random(): Customers {
        return CustomersMother.create(
            CustomerMother.randomList().map((d: Customer) => d.toPrimitives())
        );
    }

    static randomWithSize(size:number): Customers {
        return CustomersMother.create(
            CustomerMother.randomListWithSize(size).map((d: Customer) => d.toPrimitives())
        );
    }
}
