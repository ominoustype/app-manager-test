import AggregateRoot from "@context/shared/domain/aggregateRoot";
import CustomerId from "./customerId";
import CustomerName from "./customerName";

export type CustomerPrimitives = {
    id: string;
    name: string;
}

export default class Customer extends AggregateRoot {
    readonly id: CustomerId;
    readonly name: CustomerName;

    constructor(primitives: CustomerPrimitives) {
        super();
        this.id = new CustomerId(primitives.id);
        this.name = new CustomerName(primitives.name);
    }

    toPrimitives(): CustomerPrimitives {
        return {
            id: this.id.value,
            name: this.name.toString()
        }
    }
    
    static fromPrimitives(primitives: CustomerPrimitives): Customer {
        return new Customer(primitives);
    }

    equalsTo(other: Customer): boolean {
        return (
            (!this.id || !other.id || (this.id && other.id && this.id.equalsTo(other.id))) &&
            (!this.name || !other.name || (this.name && other.name && this.name.equalsTo(other.name)))
        ) as boolean
    }
}